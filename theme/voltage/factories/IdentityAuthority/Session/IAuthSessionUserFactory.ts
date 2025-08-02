import { IAuthSessionUserData } from "../../../interfaces/AppEngine/identity-authority/IAuthSessionUserData";
import { LocalStorageService } from "../../../services/Themepack/Web/LocalStorageService";

export class IAuthSessionUserFactory {

    constructor(
        private localStorageService: LocalStorageService
    ) {}

    createFromJson(json: string) {
        const data = JSON.parse(json)
        if (!data || typeof data !== 'object') {}

    }

}