
/**
 * Provides a simple event system for subscribing to and dispatching events.
 */
export namespace EventBus {
    let eventid = 0
    const registry: {[key: string]: Array<(...payload: any) => Promise<void>>} = {}

    /**
     * Creates a new event ID and returns it.
     * @returns {string} The new event ID. 
     * This ID can be used to subscribe to or dispatch events.
     */
    export const createEvent = (): string => {
        eventid++
        const id = eventid.toString()
        registry[id] = []
        return id
    }
    
    /**
     * Subscribes to an event with the given ID.
     * @param id - The ID of the event to subscribe to.
     * @param listener - The listener function that will be called when the event is dispatched.
     * @param override - If true, it will override any existing listeners for the event ID.
     */
    export const subscribeToEvent = (
        id: string, 
        listener: (...payload: any)=>Promise<void>,
        override = false
    ) => {
        if (!(id in registry)) {
            registry[id] = []
        }
        if (override) {
            registry[id] = [listener]
        } else {
            registry[id].push(listener)
        }
    }
    
    /**
     * Dispatches an event with the given ID and payload.
     * @param id - The ID of the event to dispatch.
     * @param payload - The payload to pass to the event listeners.
     * @returns 
     */
    export const dispatchEvent = async (
        id: string, 
        ...payload:any
    ) => {
        if (!(id in registry)) return
        for (let i = 0; i < registry[id].length; i++) {
            const listener = registry[id][i]
            try {
                await listener(...payload)
            } catch (error) {
                console.error(error)
            }
        }
    }
}