import { expect } from 'chai';
import { AccessService } from '../../access.service';

describe('Client Credentials Grant Service', () => {
  let service: any;
  before(() => {
    service = new AccessService();
  });
  it('generateAccessToken', async () => {
    const token = await service.generateAccessToken();
    expect(token).to.eq('token');
  });
  it('getClient', async () => {
    const client = await service.getClient();
    expect(client).to.eq(null);
  });
  it('getUserFromClient', async () => {
    const user = await service.getUserFromClient();
    expect(user).to.eq(null);
  });
  it('saveToken', async () => {
    const token = await service.saveToken();
    expect(token).to.eq(null);
  });
  it('validateScope', async () => {
    const scope = await service.validateScope();
    expect(scope).to.eq(null);
  });
});
