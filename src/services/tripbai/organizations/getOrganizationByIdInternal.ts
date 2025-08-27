import * as IdentityAuthority from "@/types/identity-authority/module/types";
import * as Core from "@/types/core/module/types";
import * as TripBai from "@/types/app/module/types";
import { SignedInUser } from "@/state/user/userSlice";
import config from "@/config";
import { httpGet } from "@/services/httpClient";

export const getOrganizationByIdInternal = async ({
  organizationId,
  signedInUser,
}: {
  organizationId: Core.Entity.Id;
  signedInUser: SignedInUser;
}) => {
  return await httpGet<TripBai.Organizations.Endpoints.InternalGetOrganization>(
    {
      host: config.tripbai.host,
      path: "/tripbai/internal/organizations/:organization_id",
      params: {
        organization_id: organizationId,
      },
      data: {},
      authToken: signedInUser.authToken,
    }
  );
};
