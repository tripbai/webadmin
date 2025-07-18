import { Pluncx } from "../../../../../interfaces/pluncx"

type Scope = {
    [key: string]: {
        value: string
        validate: () => boolean
    }
}

const scope = Pluncx.scope<Scope>()
const namespace = Pluncx.reflect().namespace
scope[namespace] = {
    value: '',
    validate: () => {
        return validate(scope[namespace].value)
    }
}

export namespace Password {
    export const render = () => {}
    export const get = () => {
        if (!scope[namespace].validate()) return null
        return scope[namespace].value.trim()
    }
    export namespace Assign {
        /**
         * Assigns a validator function to the input validation process.
         * @param validatorFn A custom validation function that takes a string
         */
        export const validator = (validatorFn: (password: string) => boolean) => {
            validate = validatorFn
        }
    }
}

let validate = (password: string): boolean => {
    return (password !== null && password.trim() !== '')
}