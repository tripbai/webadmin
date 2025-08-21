import { httpGet } from "../httpClient";
import * as IdentityAuthority from "../../types/identity-authority/module/types";
import config from "@/config";

export const doesUserEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response =
      await httpGet<IdentityAuthority.Users.Endpoints.GetByEmailOrUsername>({
        host: config.iauth.host,
        path: "/identity-authority/user/get/snippet?type=:type&value=:value",
        params: { type: "email_address", value: email },
        authToken: null,
      });
    return true;
  } catch (error) {
    return false;
  }
};

export const doesUsernameExists = async (
  username: string
): Promise<boolean> => {
  try {
    const response =
      await httpGet<IdentityAuthority.Users.Endpoints.GetByEmailOrUsername>({
        host: config.iauth.host,
        path: "/identity-authority/user/get/snippet?type=:type&value=:value",
        params: { type: "username", value: username },
        authToken: null,
      });
    return true;
  } catch (error) {
    return false;
  }
};
