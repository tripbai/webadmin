import { EmailAddress } from "../../../blocks/Themepack/Forms/Inputs/EmailAddress/EmailAddress";
import { FullName } from "../../../blocks/Themepack/Forms/Inputs/FullName/FullName";

export class BlockPreviewer {

    constructor(
        private emailAddressBlock: EmailAddress,
        private fullNameBlock: FullName
    ) {}

    async render() {
        this.emailAddressBlock.setValidator(async (emailAddress) => {
            console.log('validator is working')
            console.log(emailAddress)
        })
        await this.emailAddressBlock.setProps()
        this.fullNameBlock.setFirstNameValidator(async (firstName) => {
            throw new Error('Invalid first name')
        })
        this.fullNameBlock.setLastNameValidator(async (lastName) => {
            
        })
        await this.fullNameBlock.setProps(null)
    }

}