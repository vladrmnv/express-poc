import { expect } from "chai";
import { AccountsService } from "../../accounting/accounts.service";

describe("AccountsService", () => {
  describe("#getNewAccounts", () => {
    it("returns a list of new accounts", async () => {
      const service = new AccountsService();
      const result = await service.getNewAccounts();
      const expected = ["account1: $100", "account2: $200"];
      expect(result).to.deep.eq(expected);
    });
  });
});
