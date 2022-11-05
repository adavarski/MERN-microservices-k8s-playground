import { PaymentCreatedEvent, Publisher, Subjects } from '@arifdev.tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
