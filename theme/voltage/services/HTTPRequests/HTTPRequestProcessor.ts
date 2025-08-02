import { Core } from "../../interfaces/AppEngine/core/module/module"
import { RequestConfig } from "../../interfaces/HTTPRequests/types"

export class HTTPRequestProcessor {

    constructor(

    ) {}

    populatePathPlaceholders<T extends Core.Route.Endpoint.Schema> (config: RequestConfig<T>){
        const params = config.params
        let path = config.path
        for (const key in params) {
            const placeholder = `:${key}`
            if (path.includes(placeholder)) {
                path = path.split(placeholder).join(params[key])
            }
        }
        return path
    }

}