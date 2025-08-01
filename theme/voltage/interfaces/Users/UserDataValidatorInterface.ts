export interface UserDataValidatorInterface {

    validateEmail(email: string): Promise<void>

    validateEmailIsUnique(email: string): Promise<void>

    validatePassword(password: string): Promise<void>

}