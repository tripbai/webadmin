import { httpPost } from "@/services/httpClient";
import { SignedInUser } from "@/state/user/userSlice";
import * as IdentityAuthority from "../../../types/identity-authority/module/types";
import * as Core from "@/types/core/module/types";
import config from "@/config";

export const backfillUserSnippet = async ({
  userId,
  signedInUser,
}: {
  userId: Core.Entity.Id;
  signedInUser: SignedInUser;
}) => {
  await httpPost<IdentityAuthority.Users.Endpoints.BackfillUserSnippet>({
    host: config.iauth.host,
    path: "/identity-authority/backfills/user-snippet",
    params: {},
    data: {
      user_id: userId,
    },
    authToken: signedInUser.authToken,
  });
};
