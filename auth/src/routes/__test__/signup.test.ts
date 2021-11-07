import request from 'supertest';
import { app } from '../../app';

describe('Signup', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(201); // expect the response to be 201
  });

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'palmaonroot.io',
        password: 'password',
      })
      .expect(400); // expect the response to be 400
  });

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'p',
      })
      .expect(400); // expect the response to be 400
  });

  it('returns a 400 with missing email & password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
      })
      .expect(400); // expect the response to be 400
    return request(app)
      .post('/api/users/signup')
      .send({
        password: 'password',
      })
      .expect(400); // expect the response to be 400
  });

  it('returns a 400 with a duplicate email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(201); // expect the response to be 400
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(400); // expect the response to be 400
  });

  it('sets a cookie after a successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(201); // expect the response to be 201

    return expect(response.get('Set-Cookie')).toBeDefined();
  });
});
