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
}
