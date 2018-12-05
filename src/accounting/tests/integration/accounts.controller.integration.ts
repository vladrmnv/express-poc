import { Container } from 'inversify';
import { InversifyExpressServer, cleanUpMetadata } from 'inversify-express-utils';
import supertest = require('supertest');
import { expect } from 'chai';
import { Server } from 'http';
import { Application } from 'express';
import '../../accounts.controller';

const PORT = 3000;

describe('AccountsController', () => {
  let server: Server;
  let app: Application;
  before(async () => {
    const container = new Container();
    const inversifyServer = new InversifyExpressServer(container);
    app = inversifyServer.build();
    server = await app.listen(PORT);
  });
  after(async () => {
    await server.close();
    cleanUpMetadata();
  });
  describe('GET /', () => {
    it('returns a list of accounts with 200', async () => {
      const { body: accounts } = await supertest(app)
        .get('/accounts')
        .set('Accept', 'application/json');
      expect(accounts).to.deep.eq(['Account1', 'Account2']);
    });
    it('matches the declared schema');
    it('throws when unauthorized');
  });
  describe('POST /', () => {
    it('returns a created account');
    it('matches the declared schema');
    it('throws when unauthorized');
  });
});
