import supertest from 'supertest';

import { AuthenticationApp, AuthenticationAppImpl } from '../../server';
import { expect } from 'chai';
const SET_JSON = ['Accept', 'application/json'];

let app: AuthenticationApp;
before(async () => {
  app = new AuthenticationAppImpl();
});
describe('Authentication server', () => {
  describe('/', () => {
    it('sends index page', async () => {
      const { body } = await supertest(app.getApp())
        .get('/')
        .set(SET_JSON);
      expect(body).to.eq('OAuth 2.0 Server');
    });
  });
  describe('/login', () => {
    it('authenticates user', async () => {
      const credentials = {
        username: 'test@mail.com',
        password: 1234,
      };
      const expected = {
        id: 1,
        username: credentials.username
      }
      const { body } = await supertest(app.getApp())
        .post('/login')
        .send(credentials)
        .set(SET_JSON);
      console.log(body);
      expect(body).to.deep.eq(expected);
    });
  });
});
