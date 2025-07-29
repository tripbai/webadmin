import { InputStateManagerFactory } from "../../../../../factories/Themepack/StateManagers/InputStateManagerFactory"
import { BlockService } from "../../../../../interfaces/PluncAPI/BlockService"
import { ComponentScope } from "../../../../../interfaces/PluncAPI/ComponentScope"
import { SimpleMessage } from "../../../Alerts/SimpleMessage/SimpleMessage"

type Scope = {
    Themepack_Forms_Inputs_FullName: {
        firstName: string
        lastName: string
        validate: () => Promise<void>
    }
}


export class FullName {

    private firstNameValidator: ((firstName: string) => Promise<void>) | null = null
    private lastNameValidator: ((lastName: string) => Promise<void>) | null = null
    private namespace = 'Themepack_Forms_Inputs_FullName'

    constructor(
        private props: ComponentScope<Scope>,
        private inputStateManagerFactory: InputStateManagerFactory,
        private blockService: BlockService,
        private simpleMessage: SimpleMessage
    ) {}

    async setProps(props: {
        firstName: string,
        lastName: string,
    } | null) {
        const firstName = props?.firstName || ''
        const lastName = props?.lastName || ''
        this.props.Themepack_Forms_Inputs_FullName = {
            firstName: firstName,
            lastName: lastName,
            validate: async () => {
                const firstNameInputElement = this.inputStateManagerFactory.create(
                    'Themepack_Forms_Inputs_FullName/FirstNameInput', this.blockService
                )
                const lastNameInputElement = this.inputStateManagerFactory.create(
                    'Themepack_Forms_Inputs_FullName/LastNameInput', this.blockService
                )
                if (this.firstNameValidator === null || this.lastNameValidator === null) {
                    this.simpleMessage.setMessage(
                        this.namespace,
                        'No validator function provided.',
                        'error'
                    )
                    return
                }
                try {
                    await this.firstNameValidator(
                        this.props.Themepack_Forms_Inputs_FullName.firstName.trim()
                    )
                } catch (error) {
                    console.error(error)
                    firstNameInputElement.error()
                    this.simpleMessage.setMessage(
                        this.namespace,
                        error.message,
                        'error'
                    )
                    return
                }
                firstNameInputElement.clear()
                try {
                    await this.lastNameValidator(
                        this.props.Themepack_Forms_Inputs_FullName.lastName.trim()
                    )
                } catch (error) {
                    console.error(error)
                    lastNameInputElement.error()
                    this.simpleMessage.setMessage(
                        this.namespace,
                        error.message,
                        'error'
                    )
                    return
                }
                lastNameInputElement.clear()
            }
        }
    }

    async setFirstNameValidator(
        validator: ((firstName: string) => Promise<void>) | null = null
    ) {
        this.firstNameValidator = validator
    }

    async setLastNameValidator(
        validator: ((lastName: string) => Promise<void>) | null = null
    ) {
        this.lastNameValidator = validator
    }

    async get(): Promise<{ firstName: string, lastName: string } | null> {
        if (this.firstNameValidator === null || this.lastNameValidator === null) {
            throw new Error("Please set a validator.")
        }
        const firstName = this.props.Themepack_Forms_Inputs_FullName.firstName.trim()
        const lastName = this.props.Themepack_Forms_Inputs_FullName.lastName.trim()
        if (firstName === "" || lastName === "") {
            return null
        }
        await this.props.Themepack_Forms_Inputs_FullName.validate()
        return { firstName, lastName }
    }

}