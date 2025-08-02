
import { InputStateManagerFactory } from "../../../../../factories/Themepack/StateManagers/InputStateManagerFactory"
import { BlockService } from "../../../../../interfaces/PluncAPI/BlockService"
import { ComponentScope } from "../../../../../interfaces/PluncAPI/ComponentScope"
import { SimpleMessage } from "../../../Alerts/SimpleMessage/SimpleMessage"

type Scope = {
    Themepack_Forms_Inputs_EmailAddress: {
        value: string
        validate: () => Promise<void>
    }
}


export class EmailAddress {

    private validator: ((value: string) => Promise<void>) | null = null
    private messageNamespace: string = 'Themepack_Forms_Inputs_EmailAddress'

    constructor(
        private props: ComponentScope<Scope>,
        private blockService: BlockService,
        private inputStateManagerFactory: InputStateManagerFactory,
        private simpleMessage: SimpleMessage
    ) {}
    
    /**
     * Initializes the email address component.
     * Sets the initial value to an empty string if no value is provided.
     * @param value The initial email address value, defaults to null.
     */
    async setProps(
        value: string | null = null
    ) {
        this.props.Themepack_Forms_Inputs_EmailAddress = {
            value: value || "",
            validate: async () => {
                const inputBlock = await this.blockService.get<HTMLDivElement>('Themepack_Forms_Inputs_EmailAddress/Input')
                if (inputBlock === null) {
                    throw new Error("Email input block not found.")
                }
                const inputElement = this.inputStateManagerFactory.create(inputBlock)
                if (this.validator !== null) {
                    inputElement.loading()
                    try {
                        if (this.props.Themepack_Forms_Inputs_EmailAddress.value.trim() === "") {
                            throw new Error("Email address cannot be empty.")
                        }
                        await this.validator(this.props.Themepack_Forms_Inputs_EmailAddress.value)
                        inputElement.clear()
                        await this.simpleMessage.clearMessage(this.messageNamespace)
                    } catch (error) {
                        console.error(error)
                        inputElement.error()
                        await this.simpleMessage.setMessage(
                            this.messageNamespace,
                            error.message,
                            'error'
                        )
                    }
                    return
                }
                inputElement.clear()
                await this.simpleMessage.clearMessage(this.messageNamespace)
            }
        }
    }

    /**
     * Sets a validator function that will be called when the email address is validated.
     * The validator should throw an error if the email address is invalid.
     * @param validator A function that takes the email address as a string and returns a Promise.
     */
    setValidator(
        validator: ((value: string) => Promise<void>) | null = null
    ) {
        this.validator = validator
    }

    /**
     * Gets the email address value.
     * If the email address is empty, it returns null.
     * If the email address is not valid, it throws an error.
     * @returns The email address value or null if empty.
     */
    async getValue(): Promise<string|null> {
        if (this.validator === null) {
            throw new Error("Please set a validator.")
        }
        await this.props.Themepack_Forms_Inputs_EmailAddress.validate()
        return this.props.Themepack_Forms_Inputs_EmailAddress.value
    }

}