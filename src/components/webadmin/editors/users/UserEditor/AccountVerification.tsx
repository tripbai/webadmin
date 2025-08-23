import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function AccountVerification({ user }: Props) {
  const [localUser, setLocalUser] = useState(user);
  return (
    <section className="w-full">
      {localUser.is_email_verified && (
        <div className="mt-3 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-4">
          <div className="flex justify-between py-3">
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-full text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="self-center ml-3">
                <span className="text-green-600 font-semibold text-sm">
                  Account Verified
                </span>
                <p className="text-green-600 mt-1 text-sm">
                  This user has verified their email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!localUser.is_email_verified && (
        <div className="mt-3 mx-4 px-4 rounded-md bg-amber-50 md:max-w-2xl md:mx-auto md:px-4">
          <div className="py-3">
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-full text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="self-center ml-3 text-sm">
                <span className="text-amber-600 font-semibold">
                  Account Verification Required
                </span>
                <p className="text-amber-600 mt-1 text-sm">
                  This user has not verified their email address.
                </p>
                <p className="mt-3">
                  <ButtonWithSpinner
                    onClick={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 3000));
                      setLocalUser({
                        ...localUser,
                        is_email_verified: true,
                        verified_since: new Date(Date.now()).toISOString(),
                      });
                    }}
                    onComplete={async () => {
                      toast.success(
                        "[Test] User account verified successfully"
                      );
                    }}
                    text="Force Account Verification"
                    type="primary"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
