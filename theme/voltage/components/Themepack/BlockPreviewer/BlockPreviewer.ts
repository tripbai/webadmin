import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress";

export class BlockPreviewer {

    constructor(
        private emailAddressBlock: EmailAddress
    ) {}

    async render() {
        this.emailAddressBlock.setValidator(async (emailAddress) => {
            console.log('validator is working')
            console.log(emailAddress)
        })
        await this.emailAddressBlock.setProps()
    }

}