import { httpGet, httpPatch, httpPost } from "../httpClient";
import * as IdentityAuthority from "../../types/identity-authority/module/types";
import * as Core from "@/types/core/module/types";
import { SignedInUser } from "@/state/user/userSlice";
import config from "@/config";
import {
  storeCreateUserAction,
  storeUpdateUserAction,
} from "./userActionReels";

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

export const getUserById = async ({
  userId,
  signedInUser,
}: {
  userId: Core.Entity.Id;
  signedInUser: SignedInUser;
}) => {
  return await httpGet<IdentityAuthority.Users.Endpoints.GetModel>({
    host: config.iauth.host,
    path: "/identity-authority/users/:user_id",
    params: { user_id: userId },
    data: {},
    authToken: signedInUser.authToken,
  });
};

export const updateUserInternal = async ({
  params,
  signedInUser,
}: {
  params: IdentityAuthority.Users.Endpoints.InternalUserUpdate["request"]["data"];
  signedInUser: SignedInUser;
}) => {
  const originalUserData = await getUserById({
    userId: params.user_id,
    signedInUser: signedInUser,
  });
  await httpPatch<IdentityAuthority.Users.Endpoints.InternalUserUpdate>({
    host: config.iauth.host,
    path: "/identity-authority/update/user",
    params: {},
    data: params,
    authToken: signedInUser.authToken,
  });
  storeUpdateUserAction({
    id: params.user_id,
    first_name: params.first_name ?? originalUserData.first_name,
    last_name: params.last_name ?? originalUserData.last_name,
    // @ts-expect-error - successful patch above means the email address is unique
    email_address: params.email_address ?? originalUserData.email_address,
    // @ts-expect-error - successful patch above means the username is unique
    username: params.username ?? originalUserData.username,
    is_email_verified: false,
    user_type: "concrete",
    status: "unverified",
    profile_photo: null,
    cover_photo: null,
  });
};
