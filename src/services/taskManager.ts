import { EventBus } from "./eventBus"

type Runner = (...args:any) => Promise<any>
type EventListener = (...args: any) => void


/**
 * TaskManager
 *
 * A utility class for managing asynchronous tasks with unique identifiers.
 * TaskManager is designed to ensure a task (identified by a unique id) runs only once, 
 * and subsequent attempts to interact with the same task will utilize the cached result 
 * or error, provided the webpage is not reloaded. 
 *
 * Features:
 * - Ensures a certain task is only executed once, and result is cached.
 * - Tracks the lifecycle of tasks (new, ongoing, completed, failed).
 * - Supports registering tasks with unique IDs.
 * - Dispatches events on task success or failure.
 * - Allows subscribing and unsubscribing listeners to handle task events.
 *
 * Dependencies:
 * - `EventManager`: Manages event registration, subscription, and dispatching.
 *
 * Example Usage:
 * ```typescript
 * const taskManager = new TaskManager();
 * 
 * // Register a task
 * taskManager.register('task1', async () => {
 *   return await fetchData();
 * });
 * 
 * // Listen for success and failure
 * taskManager.listen(
 *   'task1',
 *   (data) => console.log('Task succeeded with data:', data),
 *   (error) => console.error('Task failed with error:', error)
 * );
 * ```
 */
export class TaskManager {
    private tasks: {[id:string]: {
        eventids: {
            success: string,
            fail: string
        }
        status: 'completed' | 'ongoing' | 'new' | 'failed',
        task: Runner,
        data: any,
        error: Error | null
    }}
    constructor(){
        this.tasks = {}
    }

    /**
     * Registers a new task with a unique ID.
     *
     * If a task with the given ID is already registered, this method does nothing.
     *
     * @param id - The unique identifier for the task.
     * @param task - A function that returns a Promise representing the asynchronous task.
     *
     * Example Usage:
     * ```typescript
     * taskManager.register('task1', async () => {
     *   return await fetch('https://api.example.com/data');
     * });
     * ```
     */
    register(id: string, task: Runner): void {
        if (!(id in this.tasks)) {
            this.tasks[id] = {
                eventids: {
                    success: EventBus.register(),
                    fail: EventBus.register()
                },
                status: 'new',
                task: task,
                data: null,
                error: null
            }
        }
    }

    /**
     * Checks if a task with the specified ID exists in the manager.
     *
     * @param id - The unique identifier of the task.
     * @returns `true` if the task exists, otherwise `false`.
     *
     * Example Usage:
     * ```typescript
     * if (taskManager.exists('task1')) {
     *   console.log('Task1 is registered.');
     * }
     * ```
     */
    exists(id: string): boolean {
        return (id in this.tasks)
    }

    /**
     * Executes a registered task by its ID.
     *
     * This method should only be called internally. It handles the task execution
     * and updates the task's status based on its resolution or rejection.
     *
     * On success, the result is stored and the success event is dispatched.
     * On failure, the error is stored and the failure event is dispatched.
     *
     * @param id - The unique identifier of the task.
     *
     * @throws Will throw an error if the task ID is invalid.
     */
    private run(id: string): void {
        const promise = this.tasks[id].task()
        promise.then(response => {
            this.tasks[id].status = 'completed'
            this.tasks[id].data = response
            /** Dispatch success listeners */
            EventBus.dispatch(
                this.tasks[id].eventids.success,
                response
            )
        }).catch(error => {
            this.tasks[id].status = 'completed'
            this.tasks[id].error = new Error(error.message)
            /** Dispatch fail listeners */
            EventBus.dispatch(
                this.tasks[id].eventids.fail,
                this.tasks[id].error
            )
        })
    }

    /**
     * Subscribes to success and failure events for a specific task.
     *
     * If the task has already completed, the corresponding callback
     * (success or fail) is invoked immediately with the result or error.
     *
     * @param id - The unique identifier of the task.
     * @param success - Callback function invoked on task success.
     * @param fail - Optional callback function invoked on task failure.
     *
     * @throws Will throw an error if the task is not registered.
     *
     * Example Usage:
     * ```typescript
     * taskManager.listen(
     *   'task1',
     *   (data) => console.log('Task succeeded with data:', data),
     *   (error) => console.error('Task failed with error:', error)
     * );
     * ```
     */
    listen(id: string, success: EventListener, fail?: EventListener): void {
        if (!(id in this.tasks)) {
            /** Error: Adding listener when task is not registered */
            throw new Error('x00xx1TMS100')
        }
        EventBus.subscribe(this.tasks[id].eventids.success, success)
        if (fail !== undefined) {
            EventBus.subscribe(this.tasks[id].eventids.fail, fail)
        }
        if (this.tasks[id].status === 'new') {
            this.tasks[id].status = 'ongoing'
            this.run(id)
            return
        }
        if (this.tasks[id].status === 'ongoing') {
            return
        }
        if (this.tasks[id].status === 'completed') {
            const error = this.tasks[id].error
            if (error !== null) {
                if (fail === undefined) {
                    return
                }
                fail(error)
                return
            }
            success(this.tasks[id].data)
        }
    }
}