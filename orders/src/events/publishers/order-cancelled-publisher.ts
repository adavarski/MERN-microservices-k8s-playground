import { OrderCancelledEvent, Publisher, Subjects } from '@arifdev.tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
