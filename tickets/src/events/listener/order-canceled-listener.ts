import { Listener, OrderCanceledEvent, Subjects } from '@palmpass/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { QUEUE_GROUP_NAME } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publisher/ticket-updated-publisher';

export class OrderCanceledListener extends Listener<OrderCanceledEvent> {
  readonly subject = Subjects.OrderCanceled;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCanceledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    msg.ack();
  }
}
