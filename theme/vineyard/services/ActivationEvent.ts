import { EventManager } from "./EventManager"

export namespace ActivationEvent {

    const eventid = EventManager.register()
    
    /**
     * Subscribe to the page activation event.
     * @param callback - The callback function to be called when the page is activated.
     */
    export const subscribe = (listener: (...args: any) => void) => {
        EventManager.subscribe(eventid, listener)
    }

    /**
     * Dispatches the activation event
     */
    export const dispatch = () => {
        EventManager.dispatch(eventid)
    }
}