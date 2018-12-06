import { Container } from 'inversify';
import {
  InversifyExpressServer,
  cleanUpMetadata,
} from 'inversify-express-utils';
import supertest = require('supertest');
import { expect } from 'chai';
import { Application } from 'express';
import '../../accounts.controller';
import bodyParser = require('body-parser');
import {
  IAccountsService,
  AccountsService,
} from '../../accounts.service';
import { request } from 'https';
import { ResolveTenant } from '../../../multitenancy/tenant-middleware';

describe('AccountsController', () => {
  let app: Application;
  before(async () => {
    const container = new Container();
    container.bind<IAccountsService>(AccountsService).toSelf();
    const resolveTenant = new ResolveTenant();
    const inversifyServer = new InversifyExpressServer(
      container
    );
    inversifyServer.setConfig(app => {
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(bodyParser.json());
      app.use(resolveTenant.handler)
    });
    app = inversifyServer.build();
  });
  after(async () => {
    cleanUpMetadata();
  });
  describe.only('GET /', () => {
    it('returns a list of accounts with 200', async () => {
      const { body: accounts } = await supertest(app)
        .get('/accounts')
        .query('?tenant=test')
        .set('Accept', 'application/json');
      console.log(accounts);
      expect(accounts).to.deep.eq({
        info: ['account1: $100'],
        tenant: 'test',
      });
    });
    it('matches the declared schema');
    it('throws when unauthorized');
  });
  describe('POST /', () => {
    it('returns a created account', async () => {
      const newAccount = {
        id: 'Account3',
      };
      console.log('Sending account:', newAccount);
      const res = await supertest(app)
        .post('/accounts')
        .send(newAccount)
        .set('Accept', 'application/json')
        .expect(201);

      const account = res.body;
      expect(account).to.deep.eq(newAccount);
    });
    it('matches the declared schema');
    it('throws when unauthorized');
  });
  describe('POST /cheque', () => {
    it('accepts a file', async () => {
      await supertest(app)
        .post('/accounts/cheque')
        .attach('image', `${__dirname}/test-image.png`)
        .expect(200);
    });
  });
});
