import { expect } from 'chai';
import { Request } from 'express';
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
      const expected = ['account1: $100', 'account2: $200'];
      const result = await controller.getAllAccounts();
      expect(result).to.deep.eq(expected);
    });
  });
});
