/**
 * Represents a binary state that encapsulates a boolean value and provides utility methods
 * for interacting with the state in a stringified binary form ('1' or '0').
 */
export class BinaryState {
    /**
     * The private property that stores the binary representation of the state.
     * It can be either '1' (true) or '0' (false).
     */
    private state: '1' | '0';

    /**
     * Constructs a new `BinaryState` instance.
     * 
     * @param state - The initial state as a boolean value.
     *                `true` initializes the state to '1', and `false` initializes it to '0'.
     */
    constructor(state: boolean) {
        this.state = state ? '1' : '0';
    }

    /**
     * Updates the state.
     * 
     * @param state - The new state as a boolean value.
     *                `true` updates the state to '1', and `false` updates it to '0'.
     */
    set(state: boolean): void {
        this.state = state ? '1' : '0';
    }

    /**
     * Checks if the current state is 'true' (represented by '1').
     * 
     * @returns `true` if the state is '1'; otherwise, `false`.
     */
    true(): boolean {
        return this.state === '1';
    }

    /**
     * Checks if the current state is 'false' (represented by '0').
     * 
     * @returns `true` if the state is '0'; otherwise, `false`.
     */
    false(): boolean {
        return this.state === '0';
    }
}
