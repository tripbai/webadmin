import { InputElement } from "../../../../../factories/Themepack/InputElement";
import { Pluncx } from "../../../../../interfaces/pluncx";
import { ColorPicker } from "../../../ColorPicker/ColorPicker";

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
    validate: async (): Promise<boolean> => {
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
// Default validation function for the username input,
// can be overridden by the Assign.validator method.
let validate = async (username: string): Promise<void> => {
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
    if (username.length > 64) throw new Error('Username must not exceed 64 characters')
    if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Username can only contain letters, numbers, and underscores')
}
export namespace Username {
    export const render = () => {}
    export const get = async () => {
        const value = scope[namespace].value
        if (!await scope[namespace].validate()) return null
        return value
    }
    export namespace Assign {
        /**
         * Assigns a custom validation function for the username input.
         * @param validatorFn A function that takes a username string and returns a Promise.
         */
        export const validator = (validatorFn: (username: string) => Promise<void>) => {
            validate = validatorFn
        }
    }
}
const classnames = {
    error: ColorPicker.pick('color-error-strong') ?? '',
    success: ColorPicker.pick('color-success-strong') ?? '',
    borders: {
        error: ColorPicker.pick('border-color-error-strong') ?? '',
        success: ColorPicker.pick('border-color-success-strong') ?? ''
    }
}