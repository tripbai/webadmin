import * as Core from "@/types/core/module/types";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import config from "@/config";
import { SignedInUser } from "@/state/user/userSlice";
import { httpGet, httpPost } from "@/services/httpClient";
import { KryptoDoc } from "@/types/kryptodoc/types";

export const getTenantUsers = async ({
  tenantId,
  signedInUser,
}: {
  tenantId: Core.Entity.Id;
  signedInUser: SignedInUser;
}) => {
  const tenantUsers =
    await httpGet<IdentityAuthority.Tenants.Endpoints.GetTenantUsers>({
      host: config.iauth.host,
      path: "/identity-authority/tenants/:tenant_id/users",
      params: { tenant_id: tenantId },
      authToken: signedInUser.authToken,
    });
  if (tenantUsers.length === 0) {
    return [];
  }
  const getUserSnippetPromises = tenantUsers.map((tenantUser) => {
    return httpPost<
      KryptoDoc.Endpoints.Query<"snippet", IdentityAuthority.Users.Snippet>
    >({
      host: config.kryptodoc.host,
      path: "/query",
      params: {},
      data: {
        query: {
          kind: "#snippet",
          namespace: config.kryptodoc.namespace,
          collection: "users",
          entity_id: tenantUser.user_id,
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
            cover_photo: null,
          },
        },
      },
      authToken: null,
    });
  });
  const userSnippets = await Promise.all(getUserSnippetPromises);
  return userSnippets.map((userSnippet) => {
    const tenantUser = tenantUsers.find(
      (tenantUser) => tenantUser.user_id === userSnippet.entity_id
    );
    return {
      ...userSnippet.snippet,
      is_owner: tenantUser!.is_owner,
    };
  });
};
