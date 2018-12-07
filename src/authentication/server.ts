import { Express } from 'express';
import express from 'express';
import OAuthServer from 'express-oauth-server';

interface AuthenticationServer extends Express {
  oauth: any;
}

export interface AuthenticationApp {
  app: AuthenticationServer;
  start(): void;
}

export class AuthenticationAppImpl implements AuthenticationApp {
  app: AuthenticationServer;
  constructor() {}
  private createApp(): AuthenticationServer {
    const expressApp = express();
    const app = <AuthenticationServer>expressApp;
    const oauth = new OAuthServer({
      model: {}, // See https://github.com/oauthjs/node-oauth2-server for specification
    });
    
    return app;
  }
  start(): void {}
}
