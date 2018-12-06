import {
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils';
import { Request } from 'express';
import { AccountsService, IAccountsService } from './accounts.service';

@controller('/accounts')
export class AccountsController {
  private accountsService: IAccountsService;
  constructor(accountsService: AccountsService) {
    this.accountsService = accountsService;
  } 
  @httpGet('/')
  public async getAllAccounts(): Promise<string[]> {
    return this.accountsService.getNewAccounts();
    // return Promise.resolve(['Account1', 'Account2']);
  }

  @httpPost('/')
  public async createAccount(req: Request): Promise<any> {
    const { body: account } = req;
    // console.log(req);
    return Promise.resolve(account);
  }
}
