import config from "@/config"
import { httpPost } from "@/services/httpClient"
import { IdentityAuthority } from "@/types/identity-authority/module/module"
import { KryptoDoc } from "@/types/kryptodoc/types"
import { useEffect, useState } from "react"

type Params = {
    sinceUserId: string | null
    getPrevious: boolean
    getNext: boolean
}

export default function useUserList(initialConfig?: Partial<Params>) {
    const [users, setUsers] = useState<UserSnippet[]>([])
    const [params, setParams] = useState<Params>({
        sinceUserId: null,
        getPrevious: false,
        getNext: true,
        ...initialConfig
    })
    const [isLoading, setIsLoading] = useState(false)
    async function fetchUsers() {
        setIsLoading(true)
        try {
          const response = await httpPost<KryptoDoc.Endpoints.Query<'list',UserSnippet[]>>({
            host: config.kryptodoc.host,
            path: '/query',
            params: {},
            data: {
                query: {
                    kind: '#list',
                    namespace: config.kryptodoc.namespace,
                    collection: 'users',
                    fields: {
                        id: null,
                        first_name: null,
                        last_name: null,
                        username: null,
                        email_address: null,
                        is_email_verified: null,
                        user_type: null,
                        status: null,
                        profile_photo: null,
                        cover_photo: null
                    }
                }
            },
            authToken: null
          })
          setUsers(prev => [...prev, ...response.snippets])
        } finally {
          setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [params])

    return {
        users,
        isLoading,
        setParams,
        refresh: fetchUsers
    }
}

export type UserSnippet = IdentityAuthority.Users.Snippet