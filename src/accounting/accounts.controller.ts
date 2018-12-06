import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { Request } from 'express';
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
  public async createAccount(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    return res.status(201).json({ id: 'Account3' });
  }
}
