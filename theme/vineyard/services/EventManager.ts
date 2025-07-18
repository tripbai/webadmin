export namespace EventManager {

    let eventid = 0
    const registry: {[key: string]: Array<(...args:any) => void>} = {}

    /**
     * Register a new event name.
     * @returns name - The name of the event registered
     */
    export const register = (): string => {
        eventid++
        const id = eventid.toString()
        registry[id] = []
        return id
    }

    /**
     * Subscribe to an event.
     * @param name - The name of the event to subscribe to.
     * @param listener - The listener function to be called when the event is dispatched.
     * @param override - Overrides all existing listener
     */
    export const subscribe = (
        id: string, 
        listener: (...args: any)=>any,
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
     * Dispatch an event.
     * @param name - The name of the event to dispatch.
     */
    export const dispatch = (
        id: string, 
        ...args:any
    ) => {
        if (!(id in registry)) return
        for (let i = 0; i < registry[id].length; i++) {
            const listener = registry[id][i]
            try {
                listener(...args)
            } catch (error) {
                console.error(error)
            }
        }
    }
}