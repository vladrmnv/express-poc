import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
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
}
