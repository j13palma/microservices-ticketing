import request from 'supertest';
import { app } from '../../app';

describe('/signin', () => {
  it('returns a 400 on unsuccessful signin', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(400); // expect the response to be 400
  });
  it('returns a 400 on incorrect password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(201); // expect the response to be 201
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'palma@onroot.io',
        password: 'password1',
      })
      .expect(400); // expect the response to be 400
  });
  it('returns a cookie on successful signin', async () => {
    await global.signin(); // expect the response to be 201
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(200); // expect the response to be 200
    return expect(response.get('Set-Cookie')).toBeDefined();
  });
});
