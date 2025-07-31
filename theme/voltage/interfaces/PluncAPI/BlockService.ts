import { PluncElementInterface } from "./PluncElement";

export interface BlockService {
    getAll<TElement extends Element>(
        elementName: string,
        callback: BlockCallback<TElement>
    ): void

    get<TElement extends Element>(
        elementName: string
    ): Promise<PluncElementInterface<TElement> | null>
}

export type BlockCallback<TElement extends Element> = (
    element: PluncElementInterface<TElement> | null
) => void;
