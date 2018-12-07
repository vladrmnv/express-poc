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
});
