import {
  ClientCredentialsModel,
  Client,
  User,
  Callback,
} from 'oauth2-server';

export interface IAccessService {
  getAccessToken(): Promise<string>;
  getAuthorizationCode(): Promise<string>;
  getClient(): Promise<any>;
  getUser(): Promise<string>;
  saveAuthorizationCode(): any;
}

export class AccessService implements IAccessService {
  saveAuthorizationCode() {
    throw new Error('Method not implemented.');
  }
  async getAccessToken() {
    return 'works!';
  }

  // Or, calling a Node-style callback.
  async getAuthorizationCode() {
    return 'works!';
  }

  // Or, using generators.
  async getClient() {
    return 'client';
  }

  // Or, async/wait (using Babel).
  async getUser() {
    return 'works!';
  }
}
