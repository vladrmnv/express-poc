import supertest from 'supertest';
import { AuthenticationApp } from '../../app';
import { expect } from 'chai';
import { INwApp } from '../../../core/nw-app';
import superagent from 'superagent';
import { cleanUpMetadata } from 'inversify-express-utils';
const SET_JSON = { Accept: 'application/json' };
const AUTHORIZATION = { Authorization: 'userToken' };

let app: INwApp;
beforeEach(async () => {
  app = new AuthenticationApp();
});
after(async () => {
  cleanUpMetadata();
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
        .send(credentials);
      expect(body.token).to.eq('userToken');
    });
  });
  describe('/authorize', () => {
    // it('returns 403 when anauthenticated', () => {
    //   supertest(app.getApp())
    //     .get('/authorize')
    //     .set(SET_JSON)
    //     .expect(403);
    // });
    it('sends info needed to authorize client app', async () => {
      const { body, status } = await supertest(app.getApp())
        .get('/authorize')
        .set(SET_JSON)
        .set(AUTHORIZATION)
        .query({
          client_id: 1,
          response_type: 'code',
          redirect_uri: 'localhost:3000/auth/provider/callback',
          scope: '*',
        });
      expect(body).to.haveOwnProperty('transactionID');
    });
  });
  describe.only('/decision', async () => {
    it('redirects to client url with code query', async () => {
      const agent = supertest.agent(app.getApp());
      const authResponse = await agent
        .get('/authorize')
        .set(SET_JSON)
        .set(AUTHORIZATION)
        .query({
          client_id: 1,
          response_type: 'code',
          redirect_uri: 'localhost:3000/auth/provider/callback',
          scope: '*',
        })
        .expect('set-cookie', /connect/);
      const cookies = authResponse.header['set-cookie'];
      await agent
        .post('/decision')
        .set({ 'set-cookie': cookies })
        .set(SET_JSON)
        .set(AUTHORIZATION)
        .send({
          transaction_id: authResponse.body.transactionID,
          client_id: 1,
        })
        .expect(302);
    });
  });
});
