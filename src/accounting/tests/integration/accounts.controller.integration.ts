import { cleanUpMetadata } from 'inversify-express-utils';
import supertest = require('supertest');
import { expect } from 'chai';
import { Application } from 'express';
import { AccountingApp } from '../../app';
import '../../accounts.controller';

describe('AccountsController', () => {
  let app: Application;
  before(async () => {
    app = new AccountingApp().getApp();
  });
  after(async () => {
    cleanUpMetadata();
  });
  describe('GET /', () => {
    it('returns a list of accounts with 200', async () => {
      const { body: accounts } = await supertest(app)
        .get('/accounts')
        .query('?tenant=test')
        .set('Accept', 'application/json');
      expect(accounts).to.deep.eq(['account1: $100']);
    });
    it('matches the declared schema');
    it('throws when unauthorized');
  });
});
