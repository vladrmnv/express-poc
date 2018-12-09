import supertest, { SuperTest, Test, Response } from 'supertest';
import { AuthenticationApp } from '../../app';
import { expect } from 'chai';
import { INwApp } from '../../../core/nw-app';
import superagent from 'superagent';
import { cleanUpMetadata } from 'inversify-express-utils';
const SET_JSON = { Accept: 'application/json' };
const SET_XFORM_URL_ENCODED = { Accept: 'application/x-www-form-urlencoded' };
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
    it('responds with the transaction id for code retrieval', async () => {
      const agent = supertest.agent(app.getApp());
      const redirectUrl = 'localhost:3000/auth/provider/callback';
      const { body, status } = await authorizeClient(agent, redirectUrl);
      expect(body).to.haveOwnProperty('transactionID');
    });
  });
  describe('/decision', async () => {
    it('redirects to client url with access code', async () => {
      const redirectUrl = 'localhost:3000/auth/provider/callback';
      const agent = supertest.agent(app.getApp());
      const authResponse = await authorizeClient(agent, redirectUrl);
      await confirmClient(agent, authResponse)
        .expect(302)
        .expect('Location', /code/);
    });
  });
  describe('/token', async () => {
    it('exchanges access code for access token', async () => {
      const redirectUrl = 'localhost:3000/auth/provider/callback';
      const agent = supertest.agent(app.getApp());
      const authResponse = await authorizeClient(agent, redirectUrl);
      const deacisionResponse = await confirmClient(agent, authResponse);
      const code = deacisionResponse.header.location.split('=').pop();
      console.log(code);
      agent
        .post('/token')
        .set(SET_XFORM_URL_ENCODED)
        .set(AUTHORIZATION)
        .send(
          `code=${code}&redirect_uri=${redirectUrl}&client_id=1&grant_type=authorization_code`
        )
        .expect(200, (err, { body }) => {
          expect(body).haveOwnProperty('access_token');
        });
    });
  });
});

function authorizeClient(agent: SuperTest<Test>, redirectUrl: string) {
  return agent
    .get('/authorize')
    .set(SET_JSON)
    .set(AUTHORIZATION)
    .query({
      client_id: 1,
      response_type: 'code',
      redirect_uri: redirectUrl,
      scope: '*',
    });
}

function confirmClient(agent: SuperTest<Test>, authResponse: Response) {
  return agent
    .post('/decision')
    .set(SET_JSON)
    .set(AUTHORIZATION)
    .send({
      transaction_id: authResponse.body.transactionID,
      client_id: 1,
    });
}
