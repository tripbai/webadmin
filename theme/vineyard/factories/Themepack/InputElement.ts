import { BlockAPI, PluncElementInterface } from "../../interfaces/pluncx";

/**
 * Represents an input element with extended state management and styling utilities,
 * leveraging a block-based API (`BlockAPI`) and `PluncElementInterface`.
 */
export class InputElement {
    /**
     * The name of the block this input element is associated with.
     */
    blockName: string;

    /**
     * A function that wraps elements with the `plunc-block` attribute and provides
     * a callback for interacting with these elements as `PluncElementInterface` instances.
     */
    blockAPI: BlockAPI;

    /**
     * The current state of the input element. Possible values are:
     * - `'error'`: Indicates an error state with corresponding visual feedback.
     * - `'success'`: Indicates a successful state with corresponding visual feedback.
     * - `'default'`: The neutral state, with no error or success indicators.
     */
    state: "error" | "success" | "default";

    classnames: ColorClassnamesConfig

    /**
     * Constructs a new `InputElement` instance.
     * 
     * @param blockName - The name of the block associated with this input element.
     * @param blockAPI - A function for accessing and manipulating blocks with the
     *                   `plunc-block` attribute, wrapped as `PluncElementInterface`.
     */
    constructor(blockName: string, blockAPI: BlockAPI, classnames: ColorClassnamesConfig) {
        this.blockName = `Forms/Input/${blockName}`;
        this.blockAPI = blockAPI;
        this.state = 'default';
        this.classnames = classnames;
    }

    /**
     * Sets the input element to an error state, optionally displaying an error message.
     * 
     * @param errorMessage - The error message to display.
     * @param showErrorMessage - Whether to show the error message visually. Default is `true`.
     */
    error(errorMessage: string, showErrorMessage = true): void {
        clearState(this.blockName, this.blockAPI, this.classnames, showErrorMessage);
        this.blockAPI(this.blockName, (BlockWrapper) => {
            BlockWrapper.addClass(this.classnames.borders.error);
            const RightIcon = BlockWrapper.$element.querySelector('[slate-input-icon-block="error"]');
            if (RightIcon !== null) {
                RightIcon.setAttribute('style', 'display:flex');
            }
        });
        if (showErrorMessage) {
            this.blockAPI(this.blockName + '/Message', (element: PluncElementInterface<HTMLDivElement>) => {
                element.addClass(this.classnames.error);
                element.$element.innerText = errorMessage;
            });
        }
    }

    /**
     * Sets the input element to a loading or preloading state, disabling it and showing a loading icon.
     */
    preload(): void {
        clearState(this.blockName, this.blockAPI, this.classnames);
        this.blockAPI(this.blockName, (BlockWrapper: PluncElementInterface<HTMLFieldSetElement>) => {
            BlockWrapper.$element.disabled = true;
            const RightIcon = BlockWrapper.$element.querySelector('[slate-input-icon-block="loading"]');
            if (RightIcon !== null) {
                RightIcon.setAttribute('style', 'display:flex');
            }
        });
    }

    /**
     * Sets the input element to a success state, showing a success icon.
     */
    success(): void {
        clearState(this.blockName, this.blockAPI, this.classnames);
        this.blockAPI(this.blockName, (BlockWrapper: PluncElementInterface<HTMLFieldSetElement>) => {
            const RightIcon = BlockWrapper.$element.querySelector('[slate-input-icon-block="success"]');
            if (RightIcon !== null) {
                RightIcon.setAttribute('style', 'display:flex');
            }
        });
    }

    /**
     * Clears any error or success state, resetting the input element to its default state.
     */
    unerror(): void {
        clearState(this.blockName, this.blockAPI, this.classnames);
    }

    /**
     * Disables the input element, preventing any user interaction.
     */
    freeze(): void {
        this.blockAPI(this.blockName, (fieldset: PluncElementInterface<HTMLFieldSetElement>) => {
            fieldset.$element.disabled = true;
        });
    }
}

/**
 * Utility function to reset the state of an input element and optionally clear error messages.
 * 
 * @param blockName - The name of the block associated with the input element.
 * @param blockAPI - The block API function for interacting with the element.
 * @param clearErrorMessage - Whether to clear the error message. Default is `true`.
 */
const clearState = (blockName: string, blockAPI: BlockAPI, classnames: ColorClassnamesConfig, clearErrorMessage = true): void => {
    blockAPI(blockName, (BlockWrapper: PluncElementInterface<HTMLFieldSetElement>) => {
        BlockWrapper.$element.disabled = false;
        BlockWrapper.$element.querySelectorAll('[slate-input-icon-block]').forEach(element => {
            element.setAttribute('style', 'display:none');
        });
    });
    blockAPI(blockName, (element) => {
        element.removeClass(classnames.borders.error);
        element.removeClass(classnames.borders.success);
    });
    if (clearErrorMessage) {

        blockAPI(blockName + '/Message', (element: PluncElementInterface<HTMLDivElement>) => {
            element.removeClass(classnames.error);
            element.removeClass(classnames.success);
            element.$element.innerText = '';
        });
    }
};

export type ColorClassnamesConfig = {
    error: string;
    success: string;
    borders: {
        error: string;
        success: string;
    }
}

