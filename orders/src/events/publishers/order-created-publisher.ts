import { Publisher, OrderCreatedEvent, Subjects } from '@palmpass/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
