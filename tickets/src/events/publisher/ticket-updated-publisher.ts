import { Publisher, TicketUpdatedEvent, Subjects } from '@palmpass/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
