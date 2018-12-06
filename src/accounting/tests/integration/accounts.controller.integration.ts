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

describe('AccountsController', () => {
  let app: Application;
  before(async () => {
    const container = new Container();
    container.bind<IAccountsService>(AccountsService).toSelf();
    const inversifyServer = new InversifyExpressServer(
      container
    );
    app = inversifyServer.build();
    app.use(bodyParser());
  });
  after(async () => {
    cleanUpMetadata();
  });
  describe('GET /', () => {
    it('returns a list of accounts with 200', async () => {
      const { body: accounts } = await supertest(app)
        .get('/accounts')
        .set('Accept', 'application/json');
      console.log(accounts);
      expect(accounts).to.deep.eq([
        'account1: $100',
        'account2: $200',
      ]);
    });
    it('matches the declared schema');
    it('throws when unauthorized');
  });
  describe('POST /', () => {
    it('returns a created account', async () => {
      const newAccount = {
        id: 'Account3',
      };
      const res = await supertest(app)
        .post('/accounts')
        .send({name: 'dsfasd'})
        .set('Accept', 'application/json')
        // .expect(201);

      const account = res.body;
      expect(account).to.deep.eq(newAccount);
    });
    it('matches the declared schema');
    it('throws when unauthorized');
  });
});
