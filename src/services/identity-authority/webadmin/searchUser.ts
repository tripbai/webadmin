import { assertValidEntityId } from "@/services/core/entity-toolkit";
import { assertIsEmailAddress, assertIsUsername } from "../user-assertions";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { KryptoDoc } from "@/types/kryptodoc/types";
import { httpGet, httpPost } from "@/services/httpClient";
import config from "@/config";

export const searchUser = async (
  keyword: string
): Promise<IdentityAuthority.Users.Snippet | null> => {
  const isUserId = (value: string) => {
    try {
      assertValidEntityId(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isEmailAddress = (value: string) => {
    try {
      assertIsEmailAddress(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  const isUsername = (value: string) => {
    try {
      assertIsUsername(value);
      return true;
    } catch (error) {
      return false;
    }
  };
  if (isUserId(keyword)) {
    const response = await httpPost<
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
          entity_id: keyword,
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
    if (response.snippet.id === null) return null;
    return response.snippet;
  }

  let type: "email_address" | "username" | null = null;

  if (isEmailAddress(keyword)) {
    type = "email_address";
  } else if (isUsername(keyword)) {
    type = "username";
  } else {
    return null;
  }

  const response =
    await httpGet<IdentityAuthority.Users.Endpoints.GetByEmailOrUsername>({
      host: config.iauth.host,
      path: "/identity-authority/user/get/snippet?type=:type&value=:value",
      params: { type: type, value: keyword },
      data: {},
      authToken: null,
    });
  return response;
};
