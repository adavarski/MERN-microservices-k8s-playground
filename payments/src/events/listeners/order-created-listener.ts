import { Message } from 'node-nats-streaming';

import { Listener, OrderCreatedEvent, QueueGroup, Subjects } from '@arifdev.tickets/common';

import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = QueueGroup.PaymentService;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, version, userId, status, ticket } = data;

    const order = Order.build({
      id,
      version,
      userId,
      status,
      price: ticket.price,
    });
    await order.save();

    msg.ack();
  }
}