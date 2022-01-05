import mongoose from 'mongoose';
import { OrderCanceledListener } from '../order-canceled-listener';
import { OrderCanceledEvent } from '@palmpass/common';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCanceledListener(natsWrapper.client);

  // Create and save a ticket
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  ticket.set({ orderId });
  await ticket.save();

  // Create a fake data event
  const data: OrderCanceledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it('updates the ticket, publishes an event, and acks the message', async () => {
  const { listener, ticket, data, msg, orderId } = await setup();

  // Call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // Find the ticket
  const updatedTicket = await Ticket.findById(ticket.id);

  // Make sure the ticket was updated
  expect(updatedTicket!.orderId).not.toBeDefined();

  // Make sure the ack function is called
  expect(msg.ack).toHaveBeenCalled();

  // Make sure the event is published
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
