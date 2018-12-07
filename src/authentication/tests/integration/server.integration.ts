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
  await app.start();
});
after(async () => {
  app.stop();
});
describe('Authentication server', () => {
  describe('core', () => {
    it('authenticates user', async () => {
      const { body } = await supertest(app.getApp())
        .get('/authenticate')
        .set(SET_JSON)
      console.log(body);
      expect(body).to.be.not.null;
    });
  });
});
