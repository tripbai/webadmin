import { InputElement } from "../../../../../factories/Themepack/InputElement"
import { Pluncx } from "../../../../../interfaces/pluncx"
import { ColorPicker } from "../../../ColorPicker/ColorPicker"

type Scope = {
    [key: string]: {
        fname: { value: ''},
        lname: { value: '' }
        validate: () => boolean
    }
}

const namespace = Pluncx.reflect().namespace
const scope = Pluncx.scope<Scope>()
scope[namespace] = {
    fname: { value: '' },
    lname: { value: '' },
    validate: () => {
        const firstName = scope[namespace].fname.value.trim()
        const lastName = scope[namespace].lname.value.trim()
        const inputel = new InputElement(namespace, Pluncx.block, classnames)
        if (validate(firstName, lastName)) {
            inputel.unerror()
            return true
        }
        inputel.error('Please provide a valid name')
        return false
    }
}

// Default validator
let validate = (firstName: string, lastName: string) => {
    if (firstName.length === 0 || lastName.length === 0) {
        return false
    }
    return true
}


export namespace Fullname {
    export const render = () => {}
    export const get = (): {firstName: string, lastName: string} | null => {
        const firstName = scope[namespace].fname.value.trim()
        const lastName = scope[namespace].lname.value.trim()
        if (!scope[namespace].validate()) return null
        return {
            firstName,
            lastName
        }
    }
    export namespace Assign {
        /**
         * Assigns a validator function to the input validation process.
         * @param validatorFn A custom validation function that takes as a string
         */
        export const validator = (validatorFn: (firstName: string, lastName: string) => boolean) => {
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