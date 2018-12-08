import { BaseHttpController, httpGet, controller } from "inversify-express-utils";

@controller('/auth')
export class AuthenticationController extends BaseHttpController {

    @httpGet('/provider')
    redirectToProvider() {
        return 200;
    }

    @httpGet('/provider/callback')
    handleOAuthCallback() {
        return 200;
    }
}