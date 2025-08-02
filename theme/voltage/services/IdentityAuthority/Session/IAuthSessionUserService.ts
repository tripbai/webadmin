import { IAuthSessionUserData } from "../../../interfaces/AppEngine/identity-authority/IAuthSessionUserData"
import { LocalStorageService } from "../../Themepack/Web/LocalStorageService"
import { IAuthTokenService } from "../Token/IAuthTokenService"

export class IAuthSessionUserService {

    private lsKey = 'iauthsession'

    constructor(
        private localStorageService: LocalStorageService,
        private iAuthTokenService: IAuthTokenService
    ) {}

    getStoredSession(): IAuthSessionUserData | null {
        const stored = this.localStorageService.getItem(this.lsKey)
        if (stored === null) {
            return null
        }
        let user: IAuthSessionUserData | null = null
        try {
            user = JSON.parse(stored)
        } catch (e) {
            throw new Error('Failed to parse stored session data')
        }
        return user
    }

    createSession(sessionData: IAuthSessionUserData): void {
        if (sessionData === null) {
            throw new Error('Session data cannot be null')
        }
        this.localStorageService.storeItem(this.lsKey, JSON.stringify(sessionData))
    }

    clearSession(): void {
        this.localStorageService.removeItem(this.lsKey)
    }

    async refreshSesssion(): Promise<void> {
        const sessionData = this.getStoredSession()
        if (sessionData === null) {
            throw new Error('No session data found to refresh')
        }
        if (!sessionData.active) {
            throw new Error('Session is not active, cannot refresh')
        }
        const updatedToken = await this.iAuthTokenService.refreshToken(sessionData.authToken)
        sessionData.authToken = updatedToken
        this.createSession(sessionData)
    }

    refreshAtInterval(intervalInMs: number): void {
        const interval = setInterval(() => {
            this.refreshSesssion().catch(error => {
                console.error('Failed to refresh session:', error)
                clearInterval(interval) // Stop the interval if an error occurs
            })
        }, intervalInMs)
    }

}