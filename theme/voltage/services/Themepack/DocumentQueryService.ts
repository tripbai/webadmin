
/**
 * Serves as a wrapper for document query methods.
 */
export class DocumentQueryService {

    constructor(

    ) {}

    getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
        return document.getElementById(id) as T | null
    }

    querySelector<T extends Element = Element>(selectors: string): T | null {
        return document.querySelector(selectors) as T | null
    }

    querySelectorAll<T extends Element = Element>(selectors: string): NodeListOf<T> {
        return document.querySelectorAll(selectors) as NodeListOf<T>
    }

}