import * as IdentityAuthority from "@/types/identity-authority/module/types";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function UserPassword({ user }: Props) {
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">Password</h3>
      <p className="text-gray-500 mt-1">
        Send a password reset email to the user.
      </p>
      <div className="mt-4 w-full space-y-2">
        <ButtonWithSpinner
          onClick={async () => {
            // await resetUserPassword(dataState.user.id);
          }}
          onComplete={async () => {
            // Show a success message
          }}
          text="Reset Password"
          type="primary"
        />
      </div>
    </section>
  );
}
