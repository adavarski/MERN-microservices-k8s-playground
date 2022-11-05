import { OrderCreatedEvent, Publisher, Subjects } from '@arifdev.tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
