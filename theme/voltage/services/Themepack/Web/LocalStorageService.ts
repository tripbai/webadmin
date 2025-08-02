export class LocalStorageService {

    constructor(

    ) {}

    getItem(key: string): string | null {
        return localStorage.getItem(key)
    }

    storeItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }

    removeItem(key: string): void {
        localStorage.removeItem(key)
    }

}