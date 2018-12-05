import { injectable } from "inversify";

export interface IAccountsService {
  getNewAccounts(): Promise<string[]>;
}

@injectable()
export class AccountsService implements IAccountsService {
  public getNewAccounts() {
    return Promise.resolve(["account1: $100", "account2: $200"]);
  }
}