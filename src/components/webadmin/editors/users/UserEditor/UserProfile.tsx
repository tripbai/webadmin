import * as IdentityAuthority from "@/types/identity-authority/module/types";
import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import EmailAddress from "@/components/forms/inputs/EmailAddress";
import FirstAndLastName from "@/components/forms/inputs/FirstAndLastName";
import Username from "@/components/forms/inputs/Username";
import {
  assertIsFirstName,
  assertIsLastName,
} from "@/services/identity-authority/profile-assertions";
import useForm from "@/hooks/forms/useForm";
import { useState } from "react";
import {
  assertIsEmailAddress,
  assertIsUsername,
} from "@/services/identity-authority/user-assertions";
import {
  doesUserEmailExists,
  doesUsernameExists,
  updateUserInternal,
} from "@/services/identity-authority/userService";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getUpdatedFields } from "@/services/utils/getUpdatedFields";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function UserProfile({ user }: Props) {
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  const { values, errors, setValue, setError, hasChange, submitForm } = useForm(
    {
      initialValues: {
        email: user.email_address,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      onSubmit: async (values) => {
        const updatedFieldsOnly = getUpdatedFields(user, {
          email_address: values.email,
          username: values.username,
          first_name: values.firstName,
          last_name: values.lastName,
        });
        const params: Parameters<typeof updateUserInternal>[0]["params"] =
          Object.create(null);
        params.user_id = user.id;
        if ("first_name" in updatedFieldsOnly) {
          params.first_name = updatedFieldsOnly.first_name;
        }
        if ("last_name" in updatedFieldsOnly) {
          params.last_name = updatedFieldsOnly.last_name;
        }
        if ("email_address" in updatedFieldsOnly) {
          params.email_address = updatedFieldsOnly.email_address;
        }
        if ("username" in updatedFieldsOnly) {
          params.username = updatedFieldsOnly.username;
        }
        await updateUserInternal({
          params,
          signedInUser,
        });
      },
      onSuccess: () => {
        toast.success("Changes saved successfully!");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Sorry, something went wrong.");
      },
    }
  );
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">User Profile</h3>
      <p className="text-gray-500 mt-1">
        This information is visible to the user in their account.
      </p>
      <div className="flex align-center mt-4 space-x-4">
        <div>
          <Avatar
            src={user.profile_photo}
            alt="User Avatar"
            size="large"
            fallback={
              <NameInitialsAvatar firstName={user.first_name} size="large" />
            }
          />
        </div>
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
          <EmailAddress
            value={user.email_address}
            error={errors.email ?? ""}
            onChange={async (value) => {
              try {
                assertIsEmailAddress(value);
                if (await doesUserEmailExists(value)) {
                  throw new Error("Email already exists");
                }
                // @ts-expect-error - doesUserEmailExists validates whether the email is unique
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
          <Username
            value={user.username}
            error={errors.username ?? null}
            onChange={async (value) => {
              try {
                assertIsUsername(value);
                if (await doesUsernameExists(value)) {
                  throw new Error("Username already exists");
                }
                // @ts-expect-error - doesUsernameExists validates whether the username is unique
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
          <div className="w-full pt-6 flex justify-end space-x-2">
            {hasChange && (
              <ButtonWithSpinner
                onClick={submitForm}
                text="Save Changes"
                type="primary"
              />
            )}
          </div>
          <Toaster />
        </div>
      </div>
    </section>
  );
}
