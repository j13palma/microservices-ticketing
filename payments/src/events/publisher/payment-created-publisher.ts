import { Subjects, Publisher, PaymentCreatedEvent } from '@palmpass/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
