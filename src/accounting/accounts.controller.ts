import {
  controller,
  httpGet,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import multer, { memoryStorage } from 'multer';

import {
  AccountsService,
  IAccountsService,
} from './accounts.service';
import express = require('express');

@controller('/accounts')
export class AccountsController {
  private accountsService: IAccountsService;
  constructor(accountsService: AccountsService) {
    this.accountsService = accountsService;
  }
  @httpGet('/')
  public async getAllAccounts(): Promise<string[]> {
    return this.accountsService.getNewAccounts();
  }

  @httpPost('/')
  public async createAccount(@requestBody() account: any) {
    return account;
  }

  @httpPost('/cheque', multer().single('image'))
  public async uploadCheque(req: express.Request) {
    try {
      return 200;
    } catch (e) {
      console.log(e);
    }
  }
}
