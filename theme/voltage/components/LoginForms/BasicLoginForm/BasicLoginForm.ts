import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress";
import { Password } from "../../../blocks/Themepack/Forms/Inputs/Password/Password";

export class BasicLoginForm {

    constructor(
        private emailAddressBlock: EmailAddress,
        private passwordBlock: Password
    ) {}

    async render() {
        await this.emailAddressBlock.setProps()
        await this.passwordBlock.setProps()
    }

}