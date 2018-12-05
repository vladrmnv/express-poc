export class AccountsController {
  getAllAccounts(): Promise<string[]> {
    return Promise.resolve(['Account1', 'Account2']);
  }
}
