import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress";
import { Password } from "../../../blocks/Themepack/Forms/Inputs/Password/Password";
import { ButtonStateManagerFactory } from "../../../factories/Themepack/StateManagers/ButtonStateManagerFactory";
import { ComponentScope } from "../../../interfaces/PluncAPI/ComponentScope";
import { PluncElementInterface } from "../../../interfaces/PluncAPI/PluncElement";

export class BasicLoginForm {

    constructor(
        private emailAddressBlock: EmailAddress,
        private passwordBlock: Password,
        private buttonStateManagerFactory: ButtonStateManagerFactory,
        private props: ComponentScope<BasicLoginFormProps>
    ) {}

    async render() {
        this.props.submit = async (button: PluncElementInterface<HTMLButtonElement>) => {
            const emailAddress = await this.emailAddressBlock.getValue()
            const password = await this.passwordBlock.getValue()
            console.log({emailAddress, password})
            const buttonStateManager = this.buttonStateManagerFactory.create(button)
            buttonStateManager.freezeButton() 
        }
        console.group(this.props)
        await this.emailAddressBlock.setProps()
        this.emailAddressBlock.setValidator(async (emailAddress) => {
            throw new Error('invalid email')
        })
        await this.passwordBlock.setProps()
    }

}

type BasicLoginFormProps = {
    submit: (button: PluncElementInterface<HTMLButtonElement>) => Promise<void>
}