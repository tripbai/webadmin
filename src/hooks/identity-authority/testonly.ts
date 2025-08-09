import { httpPost } from "@/services/httpClient"
import { KryptoDoc } from "@/types/kryptodoc/types"

const test = async () => {
    const response = await httpPost<KryptoDoc.Endpoints.Query<'snippet', UserSnippetResponseType>>({
        host: 'asdads',
        path: '/query',
        params: {},
        data: {
            query: {
                kind: '#snippet',
                namespace:  'asdasd',
                collection: 'asdasd',
                entity_id: 'asdasd',
                fields: {
                    first_name: null,
                    last_name: null,
                    email_address: null,
                    reviews: {
                        kind: '#list',
                        collection: 'reviews',
                        has_entity_id: '687789706',
                        fields: {
                            content: null
                        }
                    }
                }
            }
        },
        authToken: null
    })
    response // This should be an error, as 'invalidKey' is not defined in the query
}

type UserSnippetResponseType = {
    first_name: null, 
    last_name: null,
    email_address: null,
    reviews: KryptoDoc.ListOf<[{
        content: null
    }]>
}