export interface LoginServiceInterface {

    loginUsingEmailAndPassword: (
        email: string,
        password: string
    ) => Promise<void>

}