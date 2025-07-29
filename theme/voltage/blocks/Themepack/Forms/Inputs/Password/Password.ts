import { InputStateManagerFactory } from "../../../../../factories/Themepack/StateManagers/InputStateManagerFactory"
import { BlockService } from "../../../../../interfaces/PluncAPI/BlockService"
import { ComponentScope } from "../../../../../interfaces/PluncAPI/ComponentScope"
import { SimpleMessage } from "../../../Alerts/SimpleMessage/SimpleMessage"

type Scope = {
    Themepack_Forms_Inputs_Password: {
        value: string
        validate: () => Promise<void>
    }
}

export class Password {

    private messageNamespace: string = 'Themepack_Forms_Inputs_Password'

    constructor(
        private props: ComponentScope<Scope>,
        private inputStateManagerFactory: InputStateManagerFactory,
        private blockService: BlockService,
        private simpleMessage: SimpleMessage
    ) {}

    async setProps() {
        this.props.Themepack_Forms_Inputs_Password = {
            value: "",
            validate: async () => {
                const inputElement = this.inputStateManagerFactory.create(
                    'Themepack_Forms_Inputs_Password/Input', this.blockService
                )
                const value = this.props.Themepack_Forms_Inputs_Password.value
                if (value.trim().length === 0) {
                    await inputElement.error()
                    await this.simpleMessage.setMessage(
                        this.messageNamespace,
                        'Password cannot be empty.',
                        'error'
                    )
                    return
                }
                await inputElement.clear()
                await this.simpleMessage.clearMessage(this.messageNamespace)
            }
        }
    }

    async get(): Promise<string> {
        await this.props.Themepack_Forms_Inputs_Password.validate()
        return this.props.Themepack_Forms_Inputs_Password.value.trim()
    }

}