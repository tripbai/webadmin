import { Core } from "../../interfaces/AppEngine/core/module/module"
import { RequestConfig } from "../../interfaces/HTTPRequests/types"
import { HTTPRequestProcessor } from "./HTTPRequestProcessor"

export class HTTPRequestService {

    constructor(
        private httpRequestProcessor: HTTPRequestProcessor
    ) {}

    async get<T extends Core.Route.Endpoint.Schema & {request: {method: 'GET'}}>(
        config: RequestConfig<T>
    ): Promise<T['response']>{
        return await this.process('GET',config)
    }

    async post<T extends Core.Route.Endpoint.Schema & {request: {method: 'POST'}}>(
        config: RequestConfig<T>
    ): Promise<T['response']> {
        return await this.process('POST',config)
    }

    async put<T extends Core.Route.Endpoint.Schema & {request: {method: 'PUT'}}>(
        config: RequestConfig<T>
    ): Promise<T['response']> {
        return await this.process('PUT',config)
    }

    async patch<T extends Core.Route.Endpoint.Schema & {request: {method: 'PATCH'}}>(
        config: RequestConfig<T>
    ): Promise<T['response']> {
        return await this.process('PATCH',config)
    }

    async delete<T extends Core.Route.Endpoint.Schema & {request: {method: 'DELETE'}}>(
        config: RequestConfig<T>
    ): Promise<T['response']> {
        return await this.process('DELETE',config)
    }

    private async process<T extends Core.Route.Endpoint.Schema>(
        method: Core.Route.Http.Method, 
        config: RequestConfig<T>
    ): Promise<T> {
        const processedUrl = config.host + this.httpRequestProcessor.populatePathPlaceholders(config)
        return await this.run<T>(method, processedUrl, config)
    }

    private async run<T extends Core.Route.Endpoint.Schema>(
        method: Core.Route.Http.Method, 
        url: string, 
        config: RequestConfig<T>
    ) {
        
        let payload: string | FormData = ''
        let contentType: string | false = false
        let processData: boolean = true

        if (config.data !== undefined) {
            if (config.data instanceof FormData) {
                payload = config.data
                contentType = false // FormData sets its own content type
                processData = false // Do not process data for FormData
            } else {
                payload = JSON.stringify(config.data)
                contentType = 'application/json'
                processData = true
            }
        }

        // Set the header object
        const headers = {}

        // If authToken is provided, it means we need to pass it as a header
        const passRequesterToken = config.authToken !== null
        if (passRequesterToken) {
            headers['X-Requester-Token'] = config.authToken
        }

        if (contentType !== false) {
            headers['content-type'] = contentType
        }

        // Construct the fetch configuration
        const fetchConfig: {
            method: Core.Route.Http.Method,
            headers: {[key:string]:any},
            body?: string | FormData
        } = {
            method: method,
            headers: headers
        }

        // Unlike Ajax, fetch throws an error when you attach
        // request body to a GET request. Here, we only 
        // attach the body if the method is not GET
        if (method !== 'GET') {
            fetchConfig.body = payload
        }

        const response = await fetch(url, fetchConfig)
        const expectJson = config.isJsonRes ?? true
        const mimetype = response.headers.get('Content-Type')

        let data: {[key:string]: any}

        const isJsonResponse = mimetype && mimetype.includes('application/json')
        if (isJsonResponse) {
            if (!expectJson) {
                throw new Error('Expecting JSON response but got non-JSON response')
            }
            data = await response.json()
        } else {
            try {
                data = JSON.parse(await response.text());
            } catch {
                throw new Error('Failed to parse non-JSON response as JSON');
            }
        }

        if (response.status !== 200) {
            throw new Error(`Fetch request failed with status ${response.status} - ${response.statusText}`)
        }

        return data as T
    }

}