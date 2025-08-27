import * as IdentityAuthority from "@/types/identity-authority/module/types";
import * as Core from "@/types/core/module/types";
import * as TripBai from "@/types/app/module/types";
import { SignedInUser } from "@/state/user/userSlice";
import config from "@/config";
import { httpGet } from "@/services/httpClient";

export const getFeature = async ({
  featureKey,
  signedInUser,
  featurableEntityId,
  featurableEntityType,
}: {
  featureKey: string;
  signedInUser: SignedInUser;
  featurableEntityId: Core.Entity.Id;
  featurableEntityType: "organization" | "store";
}) => {
  return await httpGet<TripBai.Features.Endpoints.GetFeature>({
    host: config.tripbai.host,
    path: "/tripbai/feature?key=:key&featurable_entity_id=:featurable_entity_id&featurable_entity_type=:featurable_entity_type",
    params: {
      key: featureKey,
      featurable_entity_id: featurableEntityId,
      featurable_entity_type: featurableEntityType,
    },
    authToken: signedInUser.authToken,
  });
};
