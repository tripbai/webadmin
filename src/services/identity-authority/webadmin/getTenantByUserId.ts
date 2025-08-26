import * as Core from "@/types/core/module/types";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import config from "@/config";
import { SignedInUser } from "@/state/user/userSlice";
import { httpGet } from "@/services/httpClient";

export const getTenantByUserId = async (
  userId: Core.Entity.Id,
  signedInUser: SignedInUser
) => {
  return await httpGet<IdentityAuthority.Tenants.Endpoints.GetTenantByUserId>({
    host: config.iauth.host,
    path: "/identity-authority/get/tenant?user_id=:user_id",
    params: { user_id: userId },
    authToken: signedInUser.authToken,
  });
};
