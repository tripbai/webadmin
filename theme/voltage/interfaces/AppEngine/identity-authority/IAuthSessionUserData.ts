import { Core } from "../core/module/module"
import { IdentityAuthority } from "./module/module.interface"

export type IAuthSessionUserData = {
    active: true
    userId: Core.Entity.Id
    userStatus: IdentityAuthority.Users.Status.Type
    authToken: string
    createdAt: number
} | {
    active: false
}