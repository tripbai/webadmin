import { httpGet, httpPost } from "../httpClient";
import * as IdentityAuthority from "../../types/identity-authority/module/types";
import config from "@/config";
import { storeCreateUserAction } from "./userActionReels";

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

export const createUser = async ({
  firstName,
  lastName,
  emailAddress,
  password,
  username,
}: {
  firstName: IdentityAuthority.Profile.Fields.FirstName;
  lastName: IdentityAuthority.Profile.Fields.LastName;
  emailAddress: IdentityAuthority.Users.Fields.EmailAddress;
  password: IdentityAuthority.Users.Fields.RawPassword;
  username: IdentityAuthority.Users.Fields.Username;
}) => {
  const response = await httpPost<IdentityAuthority.Users.Endpoints.Create>({
    host: config.iauth.host,
    path: "/identity-authority/users",
    params: {},
    data: {
      type: "concrete",
      context: "external",
      provider: "iauth",
      role: "user",
      status: "unverified",
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      password: password,
      username: username,
    },
    authToken: null,
  });
  await storeCreateUserAction({
    id: response.user_id,
    first_name: response.first_name,
    last_name: response.last_name,
    email_address: response.email_address,
    username: response.username,
    is_email_verified: false,
    user_type: "concrete",
    status: "unverified",
    profile_photo: null,
    cover_photo: null,
  });
};
