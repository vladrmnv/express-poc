import 'reflect-metadata';
import { Container } from 'inversify';
import {
  IAccountsService,
  AccountsService,
} from './accounting/accounts.service';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser = require('body-parser');
import './accounting/accounts.controller';
import { AuthenticationAppImpl } from './authentication/server';

const container = new Container();
container.bind<IAccountsService>(AccountsService).toSelf();
const inversifyServer = new InversifyExpressServer(container);
inversifyServer.setConfig(app => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});
const accountingServer = inversifyServer.build();
const authentication = new AuthenticationAppImpl();
Promise.all([
  accountingServer.listen(3000),
  authentication.start(3001),
])
  .then(() => {
    console.log('accountingServer running on 3000');
    console.log('authentication running on 3001');
  })
  .catch(e => console.log(e));
