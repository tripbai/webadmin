import { BlockService } from "../../../../interfaces/PluncAPI/BlockService"
import { ColorPicker } from "../../../../services/Themepack/ColorPicker"


type Scope = {
    
}


export class SimpleMessage {

    constructor(
        private blockService: BlockService,
        private colorPicker: ColorPicker
    ) {}

    setMessage(
        namespace: string,
        message: string,
        type: "info" | "success" | "warning" | "error" = "info"
    ): Promise<void> {
        const blockName = `${namespace}/Themepack_Alerts_SimpleMessage`
        return new Promise(resolve => {
            this.blockService.get(blockName, blockElement => {
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
                blockElement.addClass(className)
                blockElement.$element.innerHTML = message
            })
        })
        
    }

    clearMessage(namespace: string): Promise<void> {
        const blockName = `${namespace}/Themepack_Alerts_SimpleMessage`
        return new Promise(resolve => {
            this.blockService.get(blockName, blockElement => {
                blockElement.$element.innerHTML = ''
                blockElement.removeClass(this.colorPicker.getSuccessTextClassName())
                blockElement.removeClass(this.colorPicker.getErrorTextClassName())
            })
            resolve()
        })
    }

}