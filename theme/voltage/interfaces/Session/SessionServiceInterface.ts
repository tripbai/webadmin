export interface SessionServiceInterface {

    /**
     * Should be called before app bootstrapping. This method 
     * can check if a user is logged in and if so, 
     * handle redirects or other logic.
     */
    verifySession(): Promise<void>

    /**
     * Can be called after login.
     */
    createSession(sessionData: {[key:string]: any}): Promise<void>

}