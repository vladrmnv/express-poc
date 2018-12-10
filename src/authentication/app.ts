import oauth2orize, { OAuth2Server } from 'oauth2orize';
import bodyParser = require('body-parser');
import { Server } from 'http';
import express = require('express');
import { Application } from 'express';
import session from 'express-session';

import { INwApp } from '../core/nw-app';
import { UnauthorizedError } from './errors';
/**
 * OAuth2 server
 */
export class AuthenticationApp implements INwApp {
  private app: Application;
  private server: Server;
  private client = {
    id: 1,
    redirectURI: 'localhost:3000/auth/provider/callback',
  };
  constructor() {
    this.app = this.createApp();
  }
  private createApp(): Application {
    const app = express();
    let authServer = oauth2orize.createServer();
    authServer = this.setupServer(authServer);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
      session({ secret: 'authSecret', resave: false, saveUninitialized: false })
    );

    app.get('/', (req, res) => {
      res.json('OAuth 2.0 Server');
    });

    app.post('/login', (req, res) => {
      res.json({
        token: 'userToken',
      });
    });

    app.use(authorization);
    app.get(
      '/authorize',
      authServer.authorize((clientId, redirectURI, done) => {
        // verify that client id and redirectURI match
        return done(null, this.client, this.client.redirectURI);
      }),
      (req: any, res) => {
        res.json({
          transactionID: req.oauth2.transactionID,
          user: req.user,
          client: req.oauth2.client,
        });
      }
    );
    app.post('/decision', authServer.decision());
    app.post('/token', authServer.token(), authServer.errorHandler());
    app.all('*', (req, res) => res.sendStatus(404));
    app.use(errorHandler);

    return app;
  }

  private setupServer(server: OAuth2Server): oauth2orize.OAuth2Server {
    server.serializeClient((client, done) => done(null, client.id));
    server.deserializeClient((id, done) => {
      done(null, this.client);
    });
    server.grant(
      oauth2orize.grant.code((_client, _redirectUri, _user, _ares, done) => {
        const code = '1234';
        done(null, code);
      })
    );
    server.exchange(
      oauth2orize.exchange.code((client, code, redirectUrl, done) => {
        return done(null, 'someToken');
      })
    );

    return server;
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
}

function authorization(req: any, res: any, next: any) {
  const token = req.header('Authorization');
  if (!token) {
    next(new UnauthorizedError());
  }
  next();
}

function errorHandler(err: any, req: any, res: express.Response) {
  res.status(err.status).json(err);
}
