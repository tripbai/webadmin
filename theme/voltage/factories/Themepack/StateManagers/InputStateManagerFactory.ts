import { BlockService } from "../../../interfaces/PluncAPI/BlockService"
import { PluncElementInterface } from "../../../interfaces/PluncAPI/PluncElement"

export class InputStateManagerFactory {

    constructor(

    ) {}

    create(blockElement: PluncElementInterface<HTMLDivElement>): InputStateManager {
        return new InputStateManager(blockElement)
    }

}

class InputStateManager {

    /**
     * The wrapper block of the input element
     */
    blockElement: PluncElementInterface<HTMLDivElement>

    /**
     * The current state of the input element. Possible values are:
     * - `'error'`: Indicates an error state with corresponding visual feedback.
     * - `'success'`: Indicates a successful state with corresponding visual feedback.
     * - `'default'`: The neutral state, with no error or success indicators.
     * - `'loading'`: Indicates a loading state, typically used during asynchronous operations.
     * - `'disabled'`: Indicates that the input is disabled and cannot be interacted with.
     */
    state: "error" | "success" | "default" | "loading" | "disabled"

    constructor(blockElement: PluncElementInterface<HTMLDivElement>) {
        this.blockElement = blockElement
        this.state = 'default'
    }

    error() {
        this.clear()
        const selector = this.getSelector()
        const borderCss = `${selector} { border-color: var(--default-color-error-strong); }`
        const svgError  = `${selector} .--icon-left > svg { stroke: var(--default-color-error-strong); }`
        const iconRightError = `${selector} > .--icon-right-error {display: block !important;}`
        this.setStyle(`${borderCss} ${svgError} ${iconRightError}`)
    }

    success() {
        this.clear()
        const selector = this.getSelector()
        const borderCss = `${selector} { border-color: var(--default-color-success-strong); }`
        const svgSuccess = `${selector} .--icon-left > svg { stroke: var(--default-color-success-strong); }`
        const iconRightSuccess = `${selector} > .--icon-right-success {display: block !important;}`
        this.setStyle(`${borderCss} ${svgSuccess} ${iconRightSuccess}`)
    }

    clear() {
        this.setStyle('')
    }

    loading() {
        this.clear()
        const inactiveStyle = this.getInactiveStyle()
        const selector = this.getSelector()
        const spinnerCss = `${selector} > .--themepack-spinner-simple {display: block !important;}`
        this.setStyle(`${inactiveStyle} ${spinnerCss}`)
    }

    disable() {
        this.clear()
        const inactiveStyle = this.getInactiveStyle()
        this.setStyle(`${inactiveStyle}`)
    }

    private getInactiveStyle() {
        const selector = this.getSelector()
        const borderColor = `${selector} { border-color: var(--default-color-grayscale-9); }`
        const backgroundCss = `${selector} { background-color: var(--default-color-grayscale-1); }`
        const inputCss = `${selector} > input { pointer-events: none; opacity: 0.5; }`
        return `${backgroundCss} ${inputCss} ${borderColor}`
    }

    private setStyle(style: string) {
        const styleElement = this.blockElement.$element.querySelector('style')
        if (styleElement !== null) {
            styleElement.innerText = style
        }
    }

    private getStyleId(): string {
        return this.blockElement.$element.getAttribute('data-style-id') || ''
    }

    private getBlockName(): string {
        return this.blockElement.$element.getAttribute('plunc-block') || ''
    }

    getSelector(): string {
        const blockName = this.getBlockName()
        const styleId = this.getStyleId()
        return `[plunc-block="${blockName}"][data-style-id="${styleId}"]`
    }

}