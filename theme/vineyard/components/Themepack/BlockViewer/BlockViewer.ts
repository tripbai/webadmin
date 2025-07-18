import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress"
import { Fullname } from "../../../blocks/Themepack/Forms/Inputs/FullName/Fullname"
import { Password } from "../../../blocks/Themepack/Forms/Inputs/Password/Password"
import { TextAreaWithCounter } from "../../../blocks/Themepack/Forms/Inputs/TextAreaWithCounter/TextAreaWithCounter"
import { TextFieldWithCounter } from "../../../blocks/Themepack/Forms/Inputs/TextFieldWithCounter/TextFieldWithCounter"
import { ActivationEvent } from "../../../services/ActivationEvent"

ActivationEvent.subscribe(() => {
    BlockViewer.render()
})

export namespace BlockViewer {

    export const render = () => {
        Fullname.render()
        EmailAddress.render()
        Password.render()
        TextFieldWithCounter.render()
        TextAreaWithCounter.render()
    }

}