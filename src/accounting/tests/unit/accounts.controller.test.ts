import { expect } from 'chai';
import { AccountsController } from '../../accounts.controller';

describe('AccountsController', () => {
  describe('#getAllAccounts', () => {
    it('returns an array of all accounts', async () => {
      const controller = new AccountsController();
      const expected = ['Account1', 'Account2'];
      const result = await controller.getAllAccounts();
      expect(result).to.deep.eq(expected);
    });
  });
});
