import { Express } from 'express';
import express from 'express';
import OAuthServer from 'express-oauth-server';
import { ClientCredentialsModel } from 'oauth2-server';
import { AccessService } from './access.service';
import bodyParser = require('body-parser');
import { Server } from 'http';

export interface AuthenticationServer extends Express {
  oauth: any;
}

export interface AuthenticationApp {
  start(): void;
  stop(): void;
  getApp(): AuthenticationServer;
}

export class AuthenticationAppImpl implements AuthenticationApp {
  private app: AuthenticationServer;
  private server: Server;
  constructor() {
    this.app = this.createApp();
  }
  private createApp(): AuthenticationServer {
    const expressApp = express();
    const app = <AuthenticationServer>expressApp;
    const model: any = new AccessService();
    app.oauth = new OAuthServer({
      model, // See https://github.com/oauthjs/node-oauth2-server for specification
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(app.oauth.authorize());

    app.use(function(req, res) {
      res.send('Secret area');
    });

    app.get('/authenticate', (req, res) => {
      res.status(200);
    });

    return app;
  }
  async start() {
    this.server = await this.app.listen(3000);
  }
  async stop() {
    await this.server.close();
  }
  getApp() {
    return this.app;
  }
}
