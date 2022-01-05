import { Order } from '../../models/orders';
import { Message } from 'node-nats-streaming';
import { QUEUE_GROUP_NAME } from './queue-group-name';
import { Listener, OrderCanceledEvent, OrderStatus, Subjects } from '@palmpass/common';

export class OrderCanceledListener extends Listener<OrderCanceledEvent> {
  readonly subject = Subjects.OrderCanceled;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCanceledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Canceled });
    await order.save();

    msg.ack();
  }
}
