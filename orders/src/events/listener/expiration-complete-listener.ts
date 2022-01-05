import { Listener, Subjects, ExpirationCompleteEvent, OrderStatus } from '@palmpass/common';
import { Message } from 'node-nats-streaming';
import { ORDER_SERVICE } from './queue-group-name';
import { Order } from '../../models/orders';
import { OrderCanceledPublisher } from '../publishers/order-canceled-publisher';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  queueGroupName = ORDER_SERVICE;
  readonly subject = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({ status: OrderStatus.Canceled });
    await order.save();
    new OrderCanceledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
