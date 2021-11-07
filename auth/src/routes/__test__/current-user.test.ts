import request from 'supertest';
import { app } from '../../app';
describe('current user route', () => {
  it('returns a current user', async () => {
    const cookie = await global.signin();
    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);
    return expect(response.body.currentUser.email).toEqual('palma@onroot.io');
  });

  it('returns null if not authenticated', async () => {
    const response = await request(app).get('/api/users/currentuser').send().expect(200);
    return expect(response.body.currentUser).toBeNull();
  });
});
