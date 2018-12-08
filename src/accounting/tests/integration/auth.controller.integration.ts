import supertest = require('supertest');
import express = require('express');
import { AccountingApp } from '../../app';
import '../../auth.controller';

const baseUrl = '/auth';
let app: any;
before(() => {
  app = new AccountingApp().getApp();
});
describe('AuthenticationController', () => {
  describe('/provider', () => {
    it('redirects to provider website', async () => {
      await supertest(app)
        .get(`${baseUrl}/provider`)
        .expect(200);
    });
  });
  describe('/provider/callback', () => {
    it('authenticates user', async () => {
      await supertest(app)
        .get(`${baseUrl}/provider/callback`)
        .expect(200);
    });
  });
});
