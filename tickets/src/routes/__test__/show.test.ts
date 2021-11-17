import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

// it('returns a 201 on successful signup', async () => {
//   return request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'palam@onroot.io',
//       password: '12345678',
//     })
//     .expect(201);
// });

// it('returns a 400 with an invalid email', async () => {
//   return request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'palam',
//       password: '12345678',
//     })
//     .expect(400);
// });

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  return request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'concert',
    price: 20,
  });

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual('concert');
  expect(ticketResponse.body.price).toEqual(20);
});
