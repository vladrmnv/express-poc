import 'reflect-metadata';
import { Container } from 'inversify';
import {
  IAccountsService,
  AccountsService,
} from './accounting/accounts.service';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser = require('body-parser');
import './accounting/accounts.controller';

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
const app = inversifyServer.build();

app.listen(3000, () => {
  console.log('Server running');
});
