import {
  ClientCredentialsModel,
  Client,
  User,
  Callback,
} from 'oauth2-server';

export interface IAccessService {
  generateAccessToken(client: any, user: any, scope: any): any;
}

export class AccessService implements IAccessService {
  async generateAccessToken(client: any, user: any, scope: any) {
    return 'token';
  }
  async getClient(clientId: any, clientSecret: any) {
    return null;
  }
  async getUserFromClient(client: any) {
    return null;
  }
  async saveToken(token: any, client: any, user: any) {
    return null;
  }
  async validateScope(user: any, client: any, scope: any) {
    return null;
  }
}
