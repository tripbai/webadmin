import { InputElement } from "../../../../../factories/Themepack/InputElement"
import { Pluncx } from "../../../../../interfaces/pluncx"
import { ColorPicker } from "../../../ColorPicker/ColorPicker"

type Scope = {
    [key: string]: {
        value: string
        validate: () => Promise<boolean>
    }
}

const scope = Pluncx.scope<Scope>()
const namespace = Pluncx.reflect().namespace
scope[namespace] = {
    value: '',
    validate: async () => {
        const inputElement = new InputElement(namespace, Pluncx.block, classnames)
        try {
            await validate(scope[namespace].value)
            inputElement.unerror()
            return true
        } catch (error) {
            inputElement.error(error.message)
            return false
        }
    }
}

export namespace EmailAddress {
    export const render = () => {}
    export namespace Assign {
        /**
         * Assigns a validator function to the email input validation process.
         * @param validatorFn A custom validation function that takes an email address as a string
         */
        export const validator = (validatorFn: (emailAddress: string) => Promise<void>) => {
            validate = validatorFn
        }
    }
    export const get = async (): Promise<string | null> => {
        if (!await scope[namespace].validate()) return null
        return scope[namespace].value
    }
}

// Default validator function for email address validation 
// This can be overridden by the Assign.validator method
let validate = async (emailAddress: string): Promise<void> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailAddress === undefined ||
        emailAddress === null ||
        emailAddress.length < 5 ||
        emailAddress.length > 64 ||
        !emailRegex.test(emailAddress) 
    ) {
        throw new Error('Please provide a valid email address')
    }
    
}

/**
 * A utility object containing CSS class names for input element states, retrieved dynamically
 * via `ColorPicker`. Provides styles for:
 * - Error state (e.g., text and border colors).
 * - Success state (e.g., text and border colors).
 */
const classnames = {
    error: ColorPicker.pick('color-error-strong') ?? '',
    success: ColorPicker.pick('color-success-strong') ?? '',
    borders: {
        error: ColorPicker.pick('border-color-error-strong') ?? '',
        success: ColorPicker.pick('border-color-success-strong') ?? ''
    }
};