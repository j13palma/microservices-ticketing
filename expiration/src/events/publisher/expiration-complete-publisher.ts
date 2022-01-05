import { Subjects, Publisher, ExpirationCompleteEvent } from '@palmpass/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
