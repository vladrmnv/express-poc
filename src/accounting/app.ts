import { INwApp } from '../core/nw-app';
import { Application } from 'express';
import { Server } from 'http';
import { Container } from 'inversify';
import { IAccountsService, AccountsService } from './accounts.service';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser = require('body-parser');

/**
 * Accounting server
 */
export class AccountingApp implements INwApp {
  private app: Application;
  private server: Server;
  constructor() {
    this.app = this.createApp();
  }
  async start(port: number = 3001) {
    this.server = await this.app.listen(port);
  }
  async stop() {
    return this.server.close();
  }
  getApp() {
    return this.app;
  }

  private createApp() {
    const container = new Container();
    container.bind<IAccountsService>(AccountsService).toSelf();
    const inversifyServer = new InversifyExpressServer(container);
    inversifyServer.setConfig(app => {
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(bodyParser.json());
    });
    return inversifyServer.build();
  }
}
