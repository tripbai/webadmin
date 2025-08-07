export namespace KryptoDoc {
    export namespace Endpoints {
        export type Query = {
            request: {
                path: '/query',
                method: 'POST',
                data: {[key: string]: any}
            },
            response: {[key: string]: any}
        }
    }
}