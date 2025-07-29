import { DocumentQueryService } from "./DocumentQueryService";

export class ColorPicker {

    private id = 'slate_color_palette'

    constructor(
        private documentQueryService: DocumentQueryService
    ) {}

    getClassNameByColorId(name: string): string | null {
        const palette = this.documentQueryService.getElementById(this.id)
        if (palette === null) return null 
        const color = palette.querySelector(`[data-color-id="${name}"]`)
        if (color === null) return null 
        const classname = color.getAttribute('class')
        if (classname === null) return null 
        return classname.trim()
    }

    getErrorTextClassName(): string {
        return this.getClassNameByColorId('color-error-strong') ?? ''
    }

    getSuccessTextClassName(): string {
        return this.getClassNameByColorId('color-success-strong') ?? ''
    }

    getErrorBorderClassName(): string {
        return this.getClassNameByColorId('border-color-error-strong') ?? ''
    }

    getSuccessBorderClassName(): string {
        return this.getClassNameByColorId('border-color-success-strong') ?? ''
    }

}