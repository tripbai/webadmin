import { ApexTable } from "../../../../blocks/Themepack/Tables/ApexTable/ApexTable";
import { Core } from "../../../../interfaces/AppEngine/core/module/module";
import { IdentityAuthority } from "../../../../interfaces/AppEngine/identity-authority/module/module.interface";
import { ComponentScope } from "../../../../interfaces/PluncAPI/ComponentScope";
import { PatchService } from "../../../../interfaces/PluncAPI/PatchService";

type Scope = {
    users: Array<IdentityAuthority.Users.Snippet>
}

export class UsersTable {

    constructor(
        private apexTable: ApexTable,
        private patchService: PatchService,
        private props: ComponentScope<Scope>
    ) {}

    async render() {
        await this.apexTable.setLoading()
        await this.patchService.patch()
        setTimeout(() => {
            this.props.users = [
                {
                    id: '1' as Core.Entity.Id,
                    first_name: 'John' as IdentityAuthority.Profile.Fields.FirstName,
                    last_name: 'Doe' as IdentityAuthority.Profile.Fields.LastName,
                    username: 'johndoe' as IdentityAuthority.Users.Fields.UniqueUsername,
                    email_address: 'johndoe@gmail.com' as IdentityAuthority.Users.Fields.UniqueEmailAddress,
                    is_email_verified: true,
                    user_type: 'concrete',
                    status: 'active',
                    profile_photo: null,
                    cover_photo: null
                },
                {
                    id: '2' as Core.Entity.Id,
                    first_name: 'Jane' as IdentityAuthority.Profile.Fields.FirstName,
                    last_name: 'Smith' as IdentityAuthority.Profile.Fields.LastName,
                    username: 'janesmith' as IdentityAuthority.Users.Fields.UniqueUsername,
                    email_address: 'janesmith@example.com' as IdentityAuthority.Users.Fields.UniqueEmailAddress,
                    is_email_verified: false,
                    user_type: 'abstract',
                    status: 'unverified',
                    profile_photo: null,
                    cover_photo: null
                },
                {
                    id: '3' as Core.Entity.Id,
                    first_name: 'Alice' as IdentityAuthority.Profile.Fields.FirstName,
                    last_name: 'Brown' as IdentityAuthority.Profile.Fields.LastName,
                    username: 'aliceb' as IdentityAuthority.Users.Fields.UniqueUsername,
                    email_address: 'aliceb@domain.com' as IdentityAuthority.Users.Fields.UniqueEmailAddress,
                    is_email_verified: true,
                    user_type: 'concrete',
                    status: 'active',
                    profile_photo: null,
                    cover_photo: null
                },
                {
                    id: '4' as Core.Entity.Id,
                    first_name: 'Bob' as IdentityAuthority.Profile.Fields.FirstName,
                    last_name: 'Johnson' as IdentityAuthority.Profile.Fields.LastName,
                    username: 'bobbyj' as IdentityAuthority.Users.Fields.UniqueUsername,
                    email_address: 'bobbyj@domain.com' as IdentityAuthority.Users.Fields.UniqueEmailAddress,
                    is_email_verified: true,
                    user_type: 'abstract',
                    status: 'banned',
                    profile_photo: null,
                    cover_photo: null
                },
                {
                    id: '5' as Core.Entity.Id,
                    first_name: 'Charlie' as IdentityAuthority.Profile.Fields.FirstName,
                    last_name: 'Lee' as IdentityAuthority.Profile.Fields.LastName,
                    username: 'charliel' as IdentityAuthority.Users.Fields.UniqueUsername,
                    email_address: 'charliel@demo.com' as IdentityAuthority.Users.Fields.UniqueEmailAddress,
                    is_email_verified: false,
                    user_type: 'concrete',
                    status: 'unverified',
                    profile_photo: null,
                    cover_photo: null
                },
                {
                    id: '6' as Core.Entity.Id,
                    first_name: 'Dana' as IdentityAuthority.Profile.Fields.FirstName,
                    last_name: 'White' as IdentityAuthority.Profile.Fields.LastName,
                    username: 'danaw' as IdentityAuthority.Users.Fields.UniqueUsername,
                    email_address: 'danaw@example.org' as IdentityAuthority.Users.Fields.UniqueEmailAddress,
                    is_email_verified: true,
                    user_type: 'abstract',
                    status: 'active',
                    profile_photo: null,
                    cover_photo: null
                }
            ];
            this.apexTable.setWithData(this.props.users)
        }, 2000)
    }

}