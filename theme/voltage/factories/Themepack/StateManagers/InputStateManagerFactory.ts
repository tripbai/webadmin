import { BlockService } from "../../../interfaces/PluncAPI/BlockService"

export class InputStateManagerFactory {

    constructor(

    ) {}

    create(blockName: string, blockService: BlockService): InputStateManager {
        return new InputStateManager(blockName, blockService)
    }

}

class InputStateManager {

    /**
     * The name of the block this input element is associated with.
     */
    blockName: string

    /**
     * The BlockService instance used to interact with the block system.
     */
    blockService: BlockService

    /**
     * The current state of the input element. Possible values are:
     * - `'error'`: Indicates an error state with corresponding visual feedback.
     * - `'success'`: Indicates a successful state with corresponding visual feedback.
     * - `'default'`: The neutral state, with no error or success indicators.
     * - `'loading'`: Indicates a loading state, typically used during asynchronous operations.
     * - `'disabled'`: Indicates that the input is disabled and cannot be interacted with.
     */
    state: "error" | "success" | "default" | "loading" | "disabled"

    constructor(blockName: string, blockService: BlockService) {
        this.blockName = blockName
        this.blockService = blockService
        this.state = 'default'
    }

    async error() {
        await this.clear()
        const selector = await this.getSelector()
        const borderCss = `${selector} { border-color: var(--default-color-error-strong); }`
        const svgError  = `${selector} .--icon-left > svg { stroke: var(--default-color-error-strong); }`
        const iconRightError = `${selector} > .--icon-right-error {display: block !important;}`
        await this.setStyle(`${borderCss} ${svgError} ${iconRightError}`)
    }

    async success(): Promise<void> {
        await this.clear()
        const selector = await this.getSelector()
        const borderCss = `${selector} { border-color: var(--default-color-success-strong); }`
        const svgSuccess = `${selector} .--icon-left > svg { stroke: var(--default-color-success-strong); }`
        const iconRightSuccess = `${selector} > .--icon-right-success {display: block !important;}`
        await this.setStyle(`${borderCss} ${svgSuccess} ${iconRightSuccess}`)
    }

    async clear(): Promise<void> {
        await this.setStyle('')
    }

    async loading(): Promise<void> {
        await this.clear()
        const inactiveStyle = await this.getInactiveStyle()
        const selector = await this.getSelector()
        const spinnerCss = `${selector} > .--themepack-spinner-simple {display: block !important;}`
        await this.setStyle(`${inactiveStyle} ${spinnerCss}`)
    }

    async disable(): Promise<void> {
        await this.clear()
        const inactiveStyle = await this.getInactiveStyle()
        await this.setStyle(`${inactiveStyle}`)
    }

    private async getInactiveStyle() {
        const selector = await this.getSelector()
        const borderColor = `${selector} { border-color: var(--default-color-grayscale-9); }`
        const backgroundCss = `${selector} { background-color: var(--default-color-grayscale-1); }`
        const inputCss = `${selector} > input { pointer-events: none; opacity: 0.5; }`
        return `${backgroundCss} ${inputCss} ${borderColor}`
    }

    private setStyle(style: string): Promise<void> {
        return new Promise(resolve => {
            this.blockService.get(this.blockName, (blockElement) => {
                const styleElement = blockElement.$element.querySelector('style')
                if (styleElement !== null) {
                    styleElement.innerText = style
                }
                resolve()
            })
        })
    }

    private getStyleId(): Promise<string> {
        return new Promise(resolve => {
            this.blockService.get(this.blockName, (blockElement) => {
                const styleId = blockElement.$element.getAttribute('data-style-id')
                resolve(styleId || '')
            })
        })
    }

    async getSelector(): Promise<string> {
        const styleId = await this.getStyleId()
        return `[plunc-block="${this.blockName}"][data-style-id="${styleId}"]`
    }

}