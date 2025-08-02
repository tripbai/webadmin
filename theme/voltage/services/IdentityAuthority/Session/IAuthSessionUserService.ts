import { IAuthSessionUserData } from "../../../interfaces/AppEngine/identity-authority/IAuthSessionUserData"
import { LocalStorageService } from "../../Themepack/Web/LocalStorageService"

export class IAuthSessionUserService {

    private lsKey = 'iauthsession'

    constructor(
        private localStorageService: LocalStorageService
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

}