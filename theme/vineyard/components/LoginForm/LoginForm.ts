
import { EmailAddress } from "../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress"
import { Password } from "../../blocks/Themepack/Forms/Inputs/Password/Password"
import { PluncElementInterface, Pluncx } from "../../interfaces/pluncx"
import { ActivationEvent } from "../../services/ActivationEvent"

type Scope = {
    submit: (button: PluncElementInterface<HTMLButtonElement>) => void
}

const scope = Pluncx.scope<Scope>()
scope.submit = (button) => {
    const emailAddress = EmailAddress.get()
    console.log(emailAddress)
}

/** 
 * You can self-activate this component by subscribing to the `ActivationEvent`. 
 * This event is fired after the @AppRouter component signals the page activation.
 */
ActivationEvent.subscribe(async () => {
    LoginForm.render()
})

export namespace LoginForm {
    export const render = () => {
        EmailAddress.render()
        Password.render()
    }
}