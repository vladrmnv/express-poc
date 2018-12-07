import { BaseHttpController, httpGet } from "inversify-express-utils";

export class AuthenticationController extends BaseHttpController {

    @httpGet('/provider')
    redirectToProvider() {
        return 200;
    }
}