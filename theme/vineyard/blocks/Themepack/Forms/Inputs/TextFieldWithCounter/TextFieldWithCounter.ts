
import { Pluncx } from "../../../../../interfaces/pluncx"
import { ColorPicker } from "../../../ColorPicker/ColorPicker"

/**
 * Scoped data stored within the component.
 */
type Scope = {
    namespace: {
        label: string
        placeholder: string
        limit: number
        value: string
        validate: () => boolean
    }
}

const namespace = Pluncx.reflect().namespace

const scope = Pluncx.scope<Scope>()
scope[namespace] = {
    label: 'Input with Counter',
    placeholder: 'Type something...',
    value: '',
    limit: 15,
    validate: () => {
        const value = scope[namespace].value.trim()
        if (value.length > scope[namespace].limit) {
            SetErrorMessage(`This value cannot be more than ${scope[namespace].limit} characters`)
            return false
        }
        const validation = validate(value)
        SetErrorMessage(validation.error)
        return validation.valid
    }
}

export namespace TextFieldWithCounter {
    export const render = () => {
        ListenToInputEvent()
        SetCounterRemaining(scope[namespace].value.length)
    }
}

type InputValidator = (value: string) => 
    { valid: true, error: '' } | 
    { valid: false, error: string }

const ListenToInputEvent = () => {
    const blockSection = getBlockSection()
    if (blockSection === null) return
    const input = blockSection.querySelector('input')
    if (input === null) return
    input.addEventListener('keyup', () => {
        const value = input.value
        SetCounterRemaining(value.length)
    })
}

const getBlockSection = () => {
    return Pluncx.component().element().$element.querySelector<HTMLDivElement>(`[data-block-id="${namespace}"]`)
}

const SetCounterRemaining = (current: number) => {
    const blockSection = getBlockSection()
    if (blockSection === null) return
    const counter = blockSection.querySelector<HTMLDivElement>('[data-role="counter"]')
    if (counter === null) return
    const remaining = scope[namespace].limit - current
    if (remaining > 0) {
        counter.innerText = remaining.toString()
    } else {
        counter.innerText = '0'
    }
}

const SetErrorMessage = (message: string) => {
    const error = Pluncx.component().element().$element.querySelector<HTMLDivElement>('[data-role="error"]')
    if (error === null) return
    error.innerText = message
}

let validate: InputValidator = () => {
    return { valid: true, error: '' }
}
