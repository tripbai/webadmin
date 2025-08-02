import { SimpleMessage } from "../../../blocks/Themepack/Alerts/SimpleMessage/SimpleMessage";
import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress";
import { Password } from "../../../blocks/Themepack/Forms/Inputs/Password/Password";
import { ButtonStateManagerFactory } from "../../../factories/Themepack/StateManagers/ButtonStateManagerFactory";
import { LoginServiceInterface } from "../../../interfaces/Login/LoginServiceInterface";
import { ComponentScope } from "../../../interfaces/PluncAPI/ComponentScope";
import { PluncElementInterface } from "../../../interfaces/PluncAPI/PluncElement";
import { UserDataValidatorInterface } from "../../../interfaces/Users/UserDataValidatorInterface";

export class BasicLoginForm {

    constructor(
        private emailAddressBlock: EmailAddress,
        private passwordBlock: Password,
        private buttonStateManagerFactory: ButtonStateManagerFactory,
        private props: ComponentScope<BasicLoginFormProps>,
        private userDataValidator: UserDataValidatorInterface,
        private loginService: LoginServiceInterface,
        private simpleMessage: SimpleMessage
    ) {}

    async render() {
        this.props.submit = async (button: PluncElementInterface<HTMLButtonElement>) => {
            const messageAlertNamespace = 'LoginForms_BasicLoginForm_MessageAlert';
            const buttonStateManager = this.buttonStateManagerFactory.create(button)
            this.simpleMessage.clearMessage(messageAlertNamespace)
            try {
                const emailAddress = await this.emailAddressBlock.getValue()
                const password = await this.passwordBlock.getValue()
                if (emailAddress === null || password === null) {
                    throw new Error("")
                }
                if (emailAddress.trim() === "" || password.trim() === "") {
                    throw new Error("")
                }
                buttonStateManager.freezeButton() 
                await this.loginService.loginUsingEmailAndPassword(emailAddress, password)
                console.log({emailAddress, password})
            } catch (error) {
                if (error.message === "") {
                    return
                }
                console.error(error)
                buttonStateManager.defrostButton()
                this.simpleMessage.setMessage(
                    messageAlertNamespace,
                    'Sorry, your credentials appear to be incorrect. Please try again.',
                    "error"
                )
            }
        }
        console.group(this.props)
        await this.emailAddressBlock.setProps()
        this.emailAddressBlock.setValidator(async (emailAddress) => {
            await this.userDataValidator.validateEmail(emailAddress)
        })
        await this.passwordBlock.setProps()
    }

}

type BasicLoginFormProps = {
    submit: (button: PluncElementInterface<HTMLButtonElement>) => Promise<void>
}