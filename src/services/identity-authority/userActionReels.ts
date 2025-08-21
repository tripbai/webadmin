import * as IdentityAuthority from "../../types/identity-authority/module/types";
import { recordAction } from "../action-reel/actionReelService";

export const storeCreateUserAction = async (
  userSnippet: IdentityAuthority.Users.Snippet
) => {
  await recordAction({
    collection: "users",
    recordId: userSnippet.id,
    data: userSnippet,
    type: "create",
  });
};
