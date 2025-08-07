import { IdentityAuthority } from "@/types/identity-authority/module/module"
import { httpGet, httpPost } from "../httpClient"
import { KryptoDoc } from "@/types/kryptodoc/types"
import taskManager from "@/lib/taskManagerInstance"

export const getUserSnippet = async (userId: string): Promise<{[key:string]: any}> => {
    // const response = await httpPost<KryptoDoc.Endpoints.Query>({
    //     host: 'http://127.0.0.1:8000',
    //     path: '/query',
    //     params: {},
    //     data: {
    //         query: {
    //             Kind: "#snippet",
    //             namespace: "glTIjYUMTwMK5TMUviQlKpBaovs2w7Lv",
    //             collection: "users",
    //             entity_id: userId,
    //             fields: {
    //                 name: null,
    //                 email_address: null
    //             }
    //         }
    //     },
    //     authToken: null
    // })
    // return response
    console.log(`how many times is this called for id ${userId}?`)
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate network delay
    return {
        id: 'some-user-id',
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email_address: 'johndoe@gmail.com',
        is_email_verified: true,
        user_type: 'concrete',
        status: 'active',
        profile_photo: null,
        cover_photo: null
    }
}
