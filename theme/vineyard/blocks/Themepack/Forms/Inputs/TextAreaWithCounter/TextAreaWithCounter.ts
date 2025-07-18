import { Pluncx } from "../../../../../interfaces/pluncx"

type Scope = {
    [key: string]: {
        label: string
        placeholder: string
        limit: number
        value: string
        validate: () => boolean
    }
}

type TextAreaValidator = (value: string) => 
    { valid: true, error: '' } | 
    { valid: false, error: string }

const namespace = Pluncx.reflect().namespace
const scope = Pluncx.scope<Scope>()
scope[namespace] = {
    label: 'Textarea with Counter',
    placeholder: 'Type something...',
    limit: 100,
    value: '',
    validate: () => {
        const value = scope[namespace].value.trim()
        if (value.length > scope[namespace].limit) {
            SetErrorMessage(`This value cannot be more than ${scope.limit} characters`)
            return false
        }
        const validation = validate(value)
        SetErrorMessage(validation.error)
        return validation.valid
    }
}

const getBlockSection = () => {
    return Pluncx.component().element().$element.querySelector<HTMLDivElement>(`[data-block-id="${namespace}"]`)
}

const ListenToInputEvent = () => {
    const blockSection = getBlockSection()
    if (blockSection === null) return
    const input = blockSection.querySelector('textarea')
    if (input === null) return
    input.addEventListener('keyup', () => {
        const value = input.value
        SetCounterRemaining(value.length)
    })
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
    const blockSection = getBlockSection()
    if (blockSection === null) return
    const error = blockSection.querySelector<HTMLDivElement>('[data-role="error"]')
    if (error === null) return
    error.innerText = message
}

let validate: TextAreaValidator = () => {
    return { valid: true, error: '' }
}

export namespace TextAreaWithCounter {
    export const render = () => {
        ListenToInputEvent()
        SetCounterRemaining(scope[namespace].value.length)
    }
}