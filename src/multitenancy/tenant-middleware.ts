import {
  BaseMiddleware,
  injectHttpContext
,
} from 'inversify-express-utils';
import express from 'express';
import { interfaces, injectable } from 'inversify';

const multitenancyTypes = {
  ResolveTenant: Symbol('ResolveTenant')
}

@injectable()
export class ResolveTenant extends BaseMiddleware {
  // @injectHttpContext private readonly _httpContext: HttpContent;
  public handler(
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) {
    (<any>this.httpContext).tenant = req.param('tenant');
    next();
  }
}
