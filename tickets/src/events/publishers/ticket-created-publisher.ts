import { Publisher, TicketCreatedEvent, Subjects } from "@arifdev.tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}