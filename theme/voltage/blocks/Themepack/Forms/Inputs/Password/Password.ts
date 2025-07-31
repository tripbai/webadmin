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
                const inputBlock = await this.blockService.get<HTMLDivElement>('Themepack_Forms_Inputs_Password/Input')
                if (!inputBlock) {
                    this.simpleMessage.setMessage(
                        this.messageNamespace,
                        'Input block not found.',
                        'error'
                    )
                    return
                }
                const inputElement = this.inputStateManagerFactory.create(inputBlock)
                const value = this.props.Themepack_Forms_Inputs_Password.value
                if (value.trim().length === 0) {
                    inputElement.error()
                    await this.simpleMessage.setMessage(
                        this.messageNamespace,
                        'Password cannot be empty.',
                        'error'
                    )
                    return
                }
                inputElement.clear()
                await this.simpleMessage.clearMessage(this.messageNamespace)
            }
        }
    }

    async getValue(): Promise<string> {
        await this.props.Themepack_Forms_Inputs_Password.validate()
        return this.props.Themepack_Forms_Inputs_Password.value.trim()
    }

}