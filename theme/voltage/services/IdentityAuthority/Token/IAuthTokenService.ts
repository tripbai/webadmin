import { AppConfigurationFactory } from "../../../factories/Configuration/AppConfigurationFactory";
import { IdentityAuthority } from "../../../interfaces/AppEngine/identity-authority/module/module.interface";
import { HTTPRequestService } from "../../HTTPRequests/HTTPRequestService";

export class IAuthTokenService {

    constructor(
        private httpService: HTTPRequestService,
        private appConfigurationFactory: AppConfigurationFactory
    ) {}

    async refreshToken(token: string): Promise<string> {
        const appConfig = this.appConfigurationFactory.create()
        const response = await this.httpService.post<IdentityAuthority.Users.Endpoints.RefreshAccessToken>({
            host: appConfig.iauth.host,
            path: '/identity-authority/tokens/refresh',
            data: {},
            params: {},
            authToken: token
        })
        return response.token
    }

}