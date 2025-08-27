import * as IdentityAuthority from "@/types/identity-authority/module/types";
import * as Core from "@/types/core/module/types";
import * as TripBai from "@/types/app/module/types";
import { SignedInUser } from "@/state/user/userSlice";
import config from "@/config";
import { httpGet } from "@/services/httpClient";

export const getAllFeatures = async ({
  signedInUser,
}: {
  signedInUser: SignedInUser;
}) => {
  return await httpGet<TripBai.Features.Endpoints.GetAllDefaultFeatures>({
    host: config.tripbai.host,
    path: "/tripbai/features",
    params: {},
    authToken: signedInUser.authToken,
  });
};
