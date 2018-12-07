import {
  controller,
  httpGet,
  BaseHttpController,
} from 'inversify-express-utils';

import {
  AccountsService,
  IAccountsService,
} from './accounts.service';

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
