import supertest from 'supertest';

import { AuthenticationAppImpl } from '../../app';
import { expect } from 'chai';
import { INwApp } from '../../../core/nw-app';
const SET_JSON = ['Accept', 'application/json'];

let app: INwApp;
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
  describe('/authorize', () => {
    it('sends info needed to authorze client app', async () => {
      const expected = {
        transactionID: 1,
      };
      const { body, status } = await supertest(app.getApp())
        .get('/authorize')
        .set(SET_JSON)
        .query({
          client_id: 1,
          response_type: 'code',
          redirect_url: 'localhost:3000/auth/provider/callback',
        });
      // expect(body).to.eq(expected);
      expect(status).to.eq(200);
    });
  });
});
