
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
                const inputElement = this.inputStateManagerFactory.create(
                    'Themepack_Forms_Inputs_EmailAddress/Input', this.blockService
                )
                if (this.validator !== null) {
                    await inputElement.loading()
                    try {
                        await this.validator(this.props.Themepack_Forms_Inputs_EmailAddress.value)
                        await inputElement.clear()
                    } catch (error) {
                        console.error(error)
                        await inputElement.error()
                        await this.simpleMessage.setMessage(
                            this.messageNamespace,
                            error.message,
                            'error'
                        )
                    }
                    return
                }
                await inputElement.clear()
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
    async get(): Promise<string|null> {
        if (this.validator === null) {
            throw new Error("Please set a validator.")
        }
        if (this.props.Themepack_Forms_Inputs_EmailAddress.value.trim() === "") {
            return null
        }
        await this.props.Themepack_Forms_Inputs_EmailAddress.validate()
        return this.props.Themepack_Forms_Inputs_EmailAddress.value
    }

}