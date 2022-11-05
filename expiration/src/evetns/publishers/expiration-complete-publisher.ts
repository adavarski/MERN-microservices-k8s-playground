import { ExpirationCompleteEvent, Publisher, Subjects } from '@arifdev.tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
