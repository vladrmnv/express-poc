import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  BaseHttpController,
} from 'inversify-express-utils';
import multer, { memoryStorage } from 'multer';

import {
  AccountsService,
  IAccountsService,
} from './accounts.service';
import express = require('express');
import { ResolveTenant } from '../multitenancy/tenant-middleware';

@controller('/accounts')
export class AccountsController extends BaseHttpController {
  private accountsService: IAccountsService;
  constructor(accountsService: AccountsService) {
    super();
    this.accountsService = accountsService;
  }
  @httpGet('/')
  public async getAllAccounts(): Promise<any> {
    return this.accountsService.getNewAccounts();
  }

  @httpPost('/')
  public async createAccount(@requestBody() account: any) {
    return this.json(account, 201);
  }

  @httpPost('/cheque', multer().single('image'))
  public async uploadCheque() {
    try {
      return 200;
    } catch (e) {
      console.log(e);
    }
  }
}
