"use client";

import { Dispatch, SetStateAction, useState } from "react";
import ButtonWithSpinner from "../Forms/Button/ButtonWithSpinner";
import EmailAddress from "../Forms/Inputs/EmailAddress";
import useForm from "@/hooks/forms/useForm";
import FirstAndLastName from "../Forms/Inputs/FirstAndLastName";
import {
  assertIsFirstName,
  assertIsLastName,
} from "@/services/identity-authority/profile-assertions";
import {
  assertIsEmailAddress,
  assertIsRawPassword,
  assertIsUsername,
} from "@/services/identity-authority/user-assertions";
import {
  createUser,
  doesUserEmailExists,
  doesUsernameExists,
} from "@/services/identity-authority/userService";
import Username from "../Forms/Inputs/Username";
import Password from "../Forms/Inputs/Password";
import SimpleButton from "../Forms/Button/SimpleButton";
import * as IdentityAuthority from "@/types/identity-authority/module/types";

type CreateUserFormProps = {
  onSuccess: () => void;
};

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const { values, errors, setValue, setError } = useForm<{
    email: IdentityAuthority.Users.Fields.EmailAddress;
    username: IdentityAuthority.Users.Fields.Username;
    firstName: IdentityAuthority.Profile.Fields.FirstName;
    lastName: IdentityAuthority.Profile.Fields.LastName;
    password: IdentityAuthority.Users.Fields.RawPassword;
  }>({
    email: "" as IdentityAuthority.Users.Fields.EmailAddress,
    username: "" as IdentityAuthority.Users.Fields.Username,
    firstName: "" as IdentityAuthority.Profile.Fields.FirstName,
    lastName: "" as IdentityAuthority.Profile.Fields.LastName,
    password: "" as IdentityAuthority.Users.Fields.RawPassword,
  });
  const [fullNameError, setFullNameError] = useState<string | null>(null);

  const clickSubmitButton = async () => {
    try {
      await createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.email,
        password: values.password,
        username: values.username,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className="w-md space-y-4">
      <h3 className="text-gray-800 dark:text-gray-200 text-lg font-bold sm:text-xl">
        Create User
      </h3>

      <div className="space-y-2">
        <FirstAndLastName
          value={{
            firstName: values.firstName,
            lastName: values.lastName,
          }}
          error={fullNameError}
          onChange={async (field, value) => {
            try {
              if (field === "firstName") {
                assertIsFirstName(value);
              } else {
                assertIsLastName(value);
              }
              setValue(field, value);
              setFullNameError(null);
            } catch (error) {
              error instanceof Error
                ? setFullNameError(
                    error.message.charAt(0).toUpperCase() +
                      error.message.slice(1)
                  )
                : setFullNameError("Invalid name");
            }
          }}
        />

        {/** Email Field */}
        <EmailAddress
          value={values.email}
          error={errors.email ?? null}
          onChange={async (value) => {
            try {
              assertIsEmailAddress(value);
              if (await doesUserEmailExists(value)) {
                throw new Error("Email already exists");
              }
              console.log("Email is available");
              setValue("email", value);
              setError("email", null);
            } catch (error) {
              error instanceof Error
                ? setError(
                    "email",
                    error.message.charAt(0).toUpperCase() +
                      error.message.slice(1)
                  )
                : setError("email", "Invalid email");
            }
          }}
        />

        {/** Username Field */}
        <Username
          value={values.username}
          error={errors.username ?? null}
          onChange={async (value) => {
            try {
              assertIsUsername(value);
              if (await doesUsernameExists(value)) {
                throw new Error("Username already exists");
              }
              setValue("username", value);
              setError("username", null);
            } catch (error) {
              error instanceof Error
                ? setError(
                    "username",
                    error.message.charAt(0).toUpperCase() +
                      error.message.slice(1)
                  )
                : setError("username", "Invalid username");
            }
          }}
        />

        {/** Password Field */}
        <Password
          value={values.password}
          onChange={(password) => {
            // assertIsRawPassword(password);
            // @ts-expect-error
            setValue("password", password);
          }}
        />
      </div>

      <div className="w-full pt-6 flex justify-end space-x-2">
        <SimpleButton type="secondary" text="Cancel" onClick={onSuccess} />
        <ButtonWithSpinner
          onClick={clickSubmitButton}
          text="Create User"
          type="primary"
        />
      </div>
    </div>
  );
}
