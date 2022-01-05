import { Subjects, Publisher, OrderCanceledEvent } from '@palmpass/common';

export class OrderCanceledPublisher extends Publisher<OrderCanceledEvent> {
  readonly subject = Subjects.OrderCanceled;
}
