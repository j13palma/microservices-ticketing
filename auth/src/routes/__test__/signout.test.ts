import request from 'supertest';
import { app } from '../../app';

describe('/signout', () => {
  it('returns a cookie on successful signin', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'palma@onroot.io',
        password: 'password',
      })
      .expect(201); // expect the response to be 201
    const response = await request(app).post('/api/users/signout').send({}).expect(200); // expect the response to be 200
    console.log(response.get('Set-Cookie'));
    return expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });
});
