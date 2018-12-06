import { expect } from 'chai';
import { AccountsService } from '../../accounts.service';

describe('AccountsService', () => {
  describe('#getNewAccounts', () => {
    it('returns a list of new accounts', async () => {
      const service = new AccountsService();
      const result = await service.getNewAccounts();
      const expected = ['account1: $100'];
      expect(result).to.deep.eq(expected);
    });
  });
});
