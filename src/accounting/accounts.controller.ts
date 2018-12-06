import {
  controller,
  httpGet,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import {
  AccountsService,
  IAccountsService,
} from './accounts.service';

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
    @requestBody() account: any,
  ) {
    return account;
  }
}
