import { expect } from 'chai';
import { AccountsController } from '../../accounts.controller';
import { AccountsService } from '../../accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;
  beforeEach(() => {
    const accountsService = new AccountsService();
    controller = new AccountsController(accountsService);
  });
  describe('#getAllAccounts', () => {
    it('returns an array of all accounts', async () => {
      const expected = {
        info: ['account1: $100'],
        tenant: 'test',
      };
      (<any>controller).httpContext = {
        tenant: 'test',
      };
      const result = await controller.getAllAccounts();
      expect(result).to.deep.eq(expected);
    });
  });
  describe('#createAccount', () => {
    it('returns new account', async () => {
      const expected = { id: 'Account3' };
      const result: any = await controller.createAccount(
        expected
      );
      expect(result.json).to.deep.eq(expected);
    });
  });
});
