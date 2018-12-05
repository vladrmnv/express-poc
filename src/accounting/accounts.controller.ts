import { controller, httpGet } from "inversify-express-utils";


@controller('/accounts')
export class AccountsController {
  @httpGet('/')
  getAllAccounts(): Promise<string[]> {
    return Promise.resolve(['Account1', 'Account2']);
  }
}
