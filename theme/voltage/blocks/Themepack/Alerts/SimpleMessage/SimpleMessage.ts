import { BlockService } from "../../../../interfaces/PluncAPI/BlockService"
import { ColorPicker } from "../../../../services/Themepack/ColorPicker"


type Scope = {
    
}


export class SimpleMessage {

    constructor(
        private blockService: BlockService,
        private colorPicker: ColorPicker
    ) {}

    async setMessage(
        namespace: string,
        message: string,
        type: "info" | "success" | "warning" | "error" = "info"
    ): Promise<void> {
        const blockName = `${namespace}/Themepack_Alerts_SimpleMessage`
        const messageBlock = await this.blockService.get(blockName)
        if (!messageBlock) {
            throw new Error(`Block ${blockName} not found`)
        }
        let className = ''
        switch (type) {
            case "success":
                className = this.colorPicker.getSuccessTextClassName()
                break
            case "warning":
                throw new Error("Warning messages are not supported in SimpleMessage block.")
                break
            case "error":
                className = this.colorPicker.getErrorTextClassName()
                break
            default:
                break
        }
        messageBlock.addClass(className)
        messageBlock.$element.innerHTML = message
    }

    async clearMessage(namespace: string): Promise<void> {
        const blockName = `${namespace}/Themepack_Alerts_SimpleMessage`
        const messageBlock = await this.blockService.get(blockName)
        if (!messageBlock) {
            throw new Error(`Block ${blockName} not found`)
        }
        messageBlock.$element.innerHTML = ''
        messageBlock.removeClass(this.colorPicker.getSuccessTextClassName())
        messageBlock.removeClass(this.colorPicker.getErrorTextClassName())
    }

}