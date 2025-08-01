import { UserDataValidatorInterface } from "../../../interfaces/Users/UserDataValidatorInterface";

export class UserValidator implements UserDataValidatorInterface {

    constructor(

    ) {}

    async validateEmail(email: string): Promise<void> {
        /** @TODO A more comprehensive email format validation */
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!regex.test(email)) {
            throw new Error('Invalid or unsupported email address format')
        }
        if (email.length < 8 || email.length > 64) {
            throw new Error('Email address must be within 8 - 64 characters long')
        }
    }

    async validateEmailIsUnique(email: string): Promise<void> {
        // Implement logic to check if the email is unique
    }

    async validatePassword(password: string): Promise<void> {
        if (password.length < 8 || password.length > 64 ){
            throw new Error('Insufficient or unsupported password length')
        }
    }

}