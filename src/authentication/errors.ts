export class UnauthorizedError extends Error {
  status: number;
  constructor() {
    super('Unauthorized');
    this.status = 403;
  }
}
