import { Message } from 'node-nats-streaming';

import { Listener, OrderCancelledEvent, OrderStatus, QueueGroup, Subjects } from '@arifdev.tickets/common';

import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = QueueGroup.PaymentService;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const { id, version } = data;

    const order = await Order.findByEvent({ id, version });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
