import { LocationFactory } from "../../factories/Themepack/Web/LocationFactory";
import { Core } from "../../interfaces/AppEngine/core/module/module";
import { IAuthSessionUserData } from "../../interfaces/AppEngine/identity-authority/IAuthSessionUserData";
import { IdentityAuthority } from "../../interfaces/AppEngine/identity-authority/module/module.interface";
import { SessionServiceInterface } from "../../interfaces/Session/SessionServiceInterface";
import { IAuthSessionUserService } from "../IdentityAuthority/Session/IAuthSessionUserService";

export class WebAdminAppSessionManager implements SessionServiceInterface {

    constructor(
        private iAuthSessionUserService: IAuthSessionUserService,
        private locationFactory: LocationFactory
    ) {}

    async verifySession(): Promise<void> {
        const userSession = this.iAuthSessionUserService.getStoredSession()
        const locationObject = this.locationFactory.create()
        const currentPagePath = locationObject.pathname
        if (currentPagePath === '/login.html' && userSession !== null && userSession.active) {
            try {
                await this.iAuthSessionUserService.refreshSesssion()
                // Redirect user if already login
                return this.redirectToMainPage()
            } catch (error) {
                // Redirect to login page if refreshing session fails
                this.iAuthSessionUserService.clearSession()
                const redirectValue = this.createRedirectValueUsingCurrentPageUrl()
                locationObject.href = `/login.html?redirect=${redirectValue}`
            }
        }
        if (currentPagePath === '/login.html' && userSession === null) {
            // If on login page and no session, do nothing
            return
        }
        if (currentPagePath !== '/login.html' && (userSession === null || !userSession.active)) {
            // Redirect to login page if not logged in
            const redirectValue = this.createRedirectValueUsingCurrentPageUrl()
            locationObject.href = `/login.html?redirect=${redirectValue}`
            return
        }
        // If user is logged in and not on login page, do nothing
        if (currentPagePath !== '/login.html' && userSession !== null && userSession.active) {
            try {
                await this.iAuthSessionUserService.refreshSesssion()
                // Set an interval
                this.iAuthSessionUserService.refreshAtInterval(1000 * 60 * 5) // Refresh every 5 minutes
            } catch (error) {
                // Redirect to login page if refreshing session fails
                this.iAuthSessionUserService.clearSession()
                const redirectValue = this.createRedirectValueUsingCurrentPageUrl()
                locationObject.href = `/login.html?redirect=${redirectValue}`
            }
            return
        }
        // If we reach here, something went wrong
        throw new Error('Unexpected session state')
    }

    async createSession(loginResponse: IdentityAuthority.Users.Endpoints.AccessReport['response']): Promise<void> {
        if (!loginResponse.is_user_registered) {
            throw new Error('User is not registered')
        }
        if (loginResponse.access_type === 'prohibited') {
            throw new Error('User access is prohibited')
        }
        const sessionData: IAuthSessionUserData = {
            userId: loginResponse.user_id as Core.Entity.Id,
            authToken: loginResponse.token,
            active: true,
            userStatus: loginResponse.user_status,
            createdAt: Date.now()
        }
        this.iAuthSessionUserService.createSession(sessionData)
        this.redirectToMainPage()
    }

    redirectToMainPage(): void {
        const locationObject = this.locationFactory.create()
        const redirectValue = this.getRedirectValueInCurrentPageParams()
        if (redirectValue === null) {
            locationObject.href = '/index.html'
            return
        }
        // Redirect to the value in the redirect parameter
        locationObject.href = redirectValue
        return
    }

    getRedirectValueInCurrentPageParams(): string | null {
        const paramsString = this.locationFactory.create().search
        const urlParams = new URLSearchParams(paramsString)
        return urlParams.get('redirect')
    }

    createRedirectValueUsingCurrentPageUrl(): string {
        const locationObject = this.locationFactory.create()
        const currentPagePath = locationObject.pathname + locationObject.search
        return encodeURIComponent(currentPagePath)
    }

}