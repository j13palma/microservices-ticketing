import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/tickets';
import { Subjects, Listener, TicketCreatedEvent } from '@palmpass/common';
import { ORDER_SERVICE } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = ORDER_SERVICE;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
