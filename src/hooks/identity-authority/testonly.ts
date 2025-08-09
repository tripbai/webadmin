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
    
}

type UserSnippetResponseType = {
    first_name: null, 
    last_name: null,
    email_address: null,
    reviews: {
        kind: '#list',
        collection: 'reviews',
        has_entity_id: {
            entity_id: string
            exists: boolean
        }
        count: number,
        snippets: {
            
        }
    }
}