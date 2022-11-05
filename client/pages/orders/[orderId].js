import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import router from 'next/router';

import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
  <div>
    <h5>Time left to pay: {timeLeft}</h5>
    <br/>
    <StripeCheckout
      token={({ id }) => doRequest({ token: id })}
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      amount={order.ticket.price * 100}
      email={currentUser.email}
    />
    {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
