import supertest = require('supertest');
import express = require('express');
import { AccountingApp } from '../../app';
import '../../auth.controller';
import { cleanUpMetadata } from 'inversify-express-utils';

const baseUrl = '/auth';
let app: any;
before(() => {
  app = new AccountingApp().getApp();
});
after(async () => {
  cleanUpMetadata();
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
