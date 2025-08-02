import { Core } from "../AppEngine/core/module/module"

export type RequestConfig<T extends Core.Route.Endpoint.Schema> = {
    host: string,
    path: T['request']['path'],
    params: Core.ExtractParams<T['request']['path']>,
    data?: T['request']['data'] | FormData,
    authToken: string | null
    isJsonRes?: boolean
}