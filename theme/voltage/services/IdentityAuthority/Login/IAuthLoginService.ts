import { AppConfigurationFactory } from "../../../factories/Configuration/AppConfigurationFactory";
import { IdentityAuthority } from "../../../interfaces/AppEngine/identity-authority/module/module.interface";
import { LoginServiceInterface } from "../../../interfaces/Login/LoginServiceInterface";
import { HTTPRequestService } from "../../HTTPRequests/HTTPRequestService";

export class IAuthLoginService implements LoginServiceInterface {

    constructor(
        private httpRequestService: HTTPRequestService,
        private appConfigFactory: AppConfigurationFactory
    ) {}

    async loginUsingEmailAndPassword(email: string, password: string){
        const appConfig = this.appConfigFactory.create()
        const response = await this.httpRequestService.post<IdentityAuthority.Users.Endpoints.AccessReport>({
            host: appConfig.iauth.host,
            path: '/identity-authority/access-report',
            data: {
                provider: 'iauth',
                email_address: email as IdentityAuthority.Users.Fields.EmailAddress,
                password: password as IdentityAuthority.Users.Fields.RawPassword
            },
            params: {},
            authToken: null
        })
    }

}