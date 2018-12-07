import supertest from 'supertest';

import {
  AuthenticationApp,
  AuthenticationAppImpl,
} from '../../server';
const SET_JSON = ['Accept', 'application/json'];

let app: AuthenticationApp;
before(async () => {
  app = new AuthenticationAppImpl();
  await app.start();
});
describe('Authentication server', () => {
  describe('core', () => {
    it('authenticates user', async () => {
      const { body } = await supertest(app)
        .get('/authenticate')
        .set(SET_JSON)
        .expect(200);
      console.log(body);
    });
  });
});
