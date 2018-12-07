import supertest from 'supertest';

import {
  AuthenticationApp,
  AuthenticationAppImpl,
} from '../../server';
import { expect } from 'chai';
const SET_JSON = ['Accept', 'application/json'];

let app: AuthenticationApp;
before(async () => {
  app = new AuthenticationAppImpl();
});
describe('Authentication server', () => {
  describe('core', () => {
    it('authenticates user', async () => {
      const { body } = await supertest(app.getApp())
        .post('/login')
        .query({ client_id: 1 })
        .set(SET_JSON);
      console.log(body);
      expect(body).to.be.not.null;
    });
  });
});
