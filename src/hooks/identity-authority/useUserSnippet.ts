import config from "@/config";
import { httpPost } from "@/services/httpClient";
import { KryptoDoc, SnippetResponseKind } from "@/types/kryptodoc/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export function useUserSnippet(userId: string): UseQueryResult<SnippetResponseKind<UserSnippetResult>> {
    console.log(userId)
    return useQuery<SnippetResponseKind<UserSnippetResult>>({
        queryKey: ['user-snippet', userId],
        queryFn: () => httpPost<KryptoDoc.Endpoints.Query<'snippet', UserSnippetResult>>({
            host: config.kryptodoc.host,
            path: '/query',
            params: {},
            data: {
                query: {
                    kind: "#snippet",
                    namespace: config.kryptodoc.namespace,
                    collection: "users",
                    entity_id: userId,
                    fields: {
                        first_name: null,
                        last_name: null,
                        email_address: null
                    }
                }
            },
            authToken: null
        }),
        staleTime: 5 * 60 * 1000, // 5 minutes,
        retry: 1
    })
}


export type UserSnippetResult = {
    first_name: string
    last_name: string
    email_address: string,
}