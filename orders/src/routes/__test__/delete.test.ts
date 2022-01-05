import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/orders';
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

it('marks an order as canceled', async () => {
  // Create a ticket with Ticket Model
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  // Make a request to create an order
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

  // Expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Canceled);
});

it('emits an order canceled event', async () => {
  // Create a ticket with Ticket Model
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  // Make a request to create an order
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
