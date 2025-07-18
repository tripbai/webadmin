export namespace ColorPicker {
    const id = 'slate_color_palette'
    export const pick = (name: string): string | null => {
        const palette = document.getElementById(id)
        if (palette === null) return null 
        const color = palette.querySelector(`[data-color-id="${name}"]`)
        if (color === null) return null 
        const classname = color.getAttribute('class')
        if (classname === null) return null 
        return classname.trim()
    }
}