import * as IdentityAuthority from "../../types/identity-authority/module/types";
import { recordAction, replayAction } from "../action-reel/actionReelService";

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

export const replayUserActions = async (
  userSnippets: IdentityAuthority.Users.Snippet[],
  includeCreatedUsers: boolean
) => {
  const replayableData = userSnippets.map((userSnippet) => {
    return {
      recordId: userSnippet.id,
      data: userSnippet,
    };
  });
  const replayedActions = await replayAction({
    collection: "users",
    data: replayableData,
    skips: includeCreatedUsers ? [] : ["create"],
  });
  const snippets: IdentityAuthority.Users.Snippet[] = [];
  for (let i = 0; i < replayedActions.length; i++) {
    const replayedAction = replayedActions[i];
    snippets.push(replayedAction.data);
  }
  return JSON.parse(JSON.stringify(snippets));
};
