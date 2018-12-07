import supertest = require('supertest');
import express = require('express');



const baseUrl = '/auth';
let app: any;
before(() => {
  app = express();
});
describe('AuthenticationController', () => {
  describe('/provider', () => {
    it('redirects to provider website', async () => {
      await supertest(app)
        .get(`${baseUrl}/prov`)
        .expect(200);
    });
  });
  // describe('/provider/callback');
});
