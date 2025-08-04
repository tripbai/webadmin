import { BlockService } from "../../../../interfaces/PluncAPI/BlockService"
import { ComponentScope } from "../../../../interfaces/PluncAPI/ComponentScope"
import { PluncElementInterface } from "../../../../interfaces/PluncAPI/PluncElement"

type Scope = {
    Themepack_Sidebars_CancunSidebar: {
        toggleCollapse: (cancunId: string) => Promise<void>,
        presetCss: string
    }
}

export class CancunSidebar {

    constructor(
        private props: ComponentScope<Scope>,
        private blockService: BlockService
    ) {}

    async setProps(params: {
        preCollapseName: string | null,
        preSelectName: string | null
    }) {
        let preCollapseCss = ''
        let preSelectCss = ''
        if (params.preCollapseName !== null) {
            preCollapseCss += `[data-cancun-name="${params.preCollapseName}"] .--cc-nav-collapsible-content {max-height: 1000px !important;} \n`
        }
        if (params.preSelectName !== null) {
            preSelectCss += `[data-cancun-name="${params.preSelectName}"] {background-color: var(--default-color-primary-weak) !important;} \n`
        }
        this.props.Themepack_Sidebars_CancunSidebar = {
            toggleCollapse: async (cancunId: string) => {
                const blockElement = await this.blockService.get('Themepack_Sidebars_CancunSidebar')
                if (blockElement === null) {
                    throw new Error('Block Themepack_Sidebars_CancunSidebar not found')
                }
                const collapsibleElementSelector = `[data-cancun-id="${cancunId}"] .--cc-nav-collapsible-content`
                const collapsibleElement = blockElement.$element.querySelector(collapsibleElementSelector)
                if (collapsibleElement === null) {
                    throw new Error('Cancun collapsible element not found')
                }
                const height = collapsibleElement.scrollHeight
                let cssCode = `${collapsibleElementSelector} {max-height: ${height}px !important;} \n`
                cssCode += `[data-cancun-id="${cancunId}"] .--cc-collapsible-arrow-right {display: none;} \n`
                cssCode += `[data-cancun-id="${cancunId}"] .--cc-collapsible-arrow-down {display: block !important;}`
                cssCode += preSelectCss
                this.injectStyleTag(blockElement, cssCode)
            },
            presetCss: `${preCollapseCss}${preSelectCss}`
        }
    }

    injectStyleTag(
        blockElement: PluncElementInterface<Element>,
        cssCode: string
    ){
        const styleElement = blockElement.$element.querySelector('style')
        if (styleElement === null) {
            throw new Error('Missing style element in CancunSidebar')
        }
        styleElement.innerHTML = cssCode
    }

    

}