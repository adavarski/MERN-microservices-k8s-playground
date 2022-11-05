import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { OrderStatus, PaymentCreatedEvent } from '@arifdev.tickets/common';

import { Order } from '../../../models/order';
import { natsWrapper } from '../../../nats-wrapper';
import { PaymentCreatedListener } from '../payment-created-listener';

const setup = async () => {
  const listener = new PaymentCreatedListener(natsWrapper.client);

  const ticket = await global.createTicket();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'asdf',
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: PaymentCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    orderId: order.id,
    stripeId: 'stripeId',
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, order, ticket, data, msg };
};

it('updates the order status to complete', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Complete);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});