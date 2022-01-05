import { Publisher, Subjects, TicketCreatedEvent } from '@palmpass/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
