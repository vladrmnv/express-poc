import supertest from 'supertest';

import { AuthenticationApp } from '../../app';
import { expect } from 'chai';
import { INwApp } from '../../../core/nw-app';
const SET_JSON = {'Accept' : 'application/json'};
const AUTHORIZATION = {'Authorization': 'userToken'};

let app: INwApp;
before(async () => {
  app = new AuthenticationApp();
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
    it('responds with token to correct credentials', async () => {
      const credentials = { email: 'test@mail.com', password: '1234' };
      const { body } = await supertest(app.getApp())
        .post('/login')
        .set(SET_JSON)
        .send(credentials)
      expect(body.token).to.eq('userToken');
    });
  });
  describe('/auth/authorize', () => {
    it('returns 403 when anauthenticated', async () => {
      await supertest(app.getApp())
        .get('/authorize')
        .set(SET_JSON)
        .expect(403);
    });
    it('sends info needed to authorze client app', async () => {
      const { body, status } = await supertest(app.getApp())
        .get('/authorize')
        .set(SET_JSON)
        .set(AUTHORIZATION)
        .query({
          client_id: 1,
          response_type: 'code',
          redirect_url: 'localhost:3000/auth/provider/callback',
          scope: '*',
        });
      expect(body).to.haveOwnProperty('transactionID');
    });
  });
});
