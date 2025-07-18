import { PluncElementInterface } from "../../interfaces/pluncx";

type ButtonElementStates = 'disabled' | 'spinner' | 'active'

/**
 * Represents a button element with customizable states and utility methods
 * for managing its usability and appearance.
 */
export class ButtonElement {
    
    /**
     * A wrapped button element that provides basic states and methods
     * through the `PluncElementInterface`.
     */
    private button: PluncElementInterface<HTMLButtonElement>;

    /**
     * The current state of the button. It can be:
     * - `'disabled'`: The button is not clickable and appears inactive.
     * - `'spinner'`: The button shows a spinner, indicating a loading or processing state.
     * - `'active'`: The button is fully functional and ready for interaction.
     */
    private state: ButtonElementStates = 'active';

    /**
     * Creates a new `ButtonElement` instance.
     * 
     * @param button - The wrapped button element implementing the `PluncElementInterface`.
     */
    constructor(button: PluncElementInterface<HTMLButtonElement>) {
        this.button = button;
    }

    /**
     * Freezes the button, disabling its functionality and adding a spinner style.
     * 
     * This method:
     * - Sets the button element's `disabled` attribute to `true`.
     * - Adds the class `--pluncx-ui-spinning-btn` to apply spinner styling.
     */
    freeze(): void {
        this.button.$element.disabled = true;
        this.button.addClass('--themepack-spinning-btn');
    }

    /**
     * Defrosts the button, re-enabling its functionality and removing the spinner style.
     * 
     * This method:
     * - Removes the `disabled` attribute, making the button clickable.
     * - Removes the class `--pluncx-ui-spinning-btn` to revert spinner styling.
     */
    defrost(): void {
        this.button.$element.disabled = false;
        this.button.removeClass('--themepack-spinning-btn');
    }
}
