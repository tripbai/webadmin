import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import * as IdentityAuthority from "@/types/identity-authority/module/types";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function Suspension({ user }: Props) {
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">User Suspension</h3>
      <p className="text-gray-500 mt-1">
        {user.suspended_until
          ? "This user is currently suspended until " + user.suspended_until
          : "This user is not suspended."}
      </p>
      <section className="mt-4">
        {user.suspended_until && (
          <ButtonWithSpinner
            onClick={async () => {
              // Handle suspension logic
            }}
            onComplete={() => {}}
            text="Lift Suspension"
            type="danger"
          />
        )}
        <ButtonWithSpinner
          onClick={async () => {
            // Handle suspension logic
          }}
          onComplete={() => {}}
          text="Suspend User"
          type="danger"
        />
      </section>
    </section>
  );
}
