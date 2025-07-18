import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress"
import { Fullname } from "../../../blocks/Themepack/Forms/Inputs/FullName/Fullname"
import { Password } from "../../../blocks/Themepack/Forms/Inputs/Password/Password"
import { Username } from "../../../blocks/Themepack/Forms/Inputs/Username/Username"
import { ButtonElement } from "../../../factories/Themepack/ButtonElement"
import { PluncElementInterface, Pluncx } from "../../../interfaces/pluncx"
import { ActivationEvent } from "../../../services/ActivationEvent"
import { EventBus } from "../../../services/Themepack/EventBus"

type Scope = {
    submit: (button:PluncElementInterface<HTMLButtonElement>) => void
}
const scope = Pluncx.scope<Scope>()
scope.submit = async (button) => {
    const buttonElement = new ButtonElement(button)
    buttonElement.freeze()
    const username = await Username.get()
    const emailAddress = await EmailAddress.get()
    const fullname = Fullname.get()
    const password = Password.get()
    if (username === null || 
        emailAddress === null || 
        fullname === null ||
        password === null
    ) {
        buttonElement.defrost()
        return
    }
    const data: RegistrationData = {
        firstName: fullname.firstName,
        lastName: fullname.lastName,
        username,
        emailAddress,
        password
    }
    await EventBus.dispatchEvent(submitEvent, data)
}

type RegistrationData = {
    firstName: string,
    lastName: string
    username: string,
    emailAddress: string,
    password: string
}

const submitEvent = EventBus.createEvent()

/** 
 * You can self-activate this component by subscribing to the `ActivationEvent`. 
 * This event is fired after the @AppRouter component signals the page activation.
 */
ActivationEvent.subscribe(async () => {
    BasicRegistrationForm.render()
})

export namespace BasicRegistrationForm {
    export const render = () => {
        Fullname.render()
        EmailAddress.render()
        Password.render()
        Username.render()
    }
    export namespace Events {
        export const whenSubmit = (listener: (data: RegistrationData) => Promise<void>) => {
            EventBus.subscribeToEvent(submitEvent, listener)
        }
    }
    export namespace Assign {
        export namespace Validator {
            export const fullName = (validator) => {
                Fullname.Assign.validator(validator)
            }
        }
    }
}