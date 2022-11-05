import { Publisher, TicketUpdatedEvent, Subjects } from '@arifdev.tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
