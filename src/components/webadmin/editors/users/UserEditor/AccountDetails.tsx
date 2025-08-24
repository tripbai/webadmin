import SimpleInput from "@/components/forms/inputs/SimpleInput";
import * as IdentityAuthority from "@/types/identity-authority/module/types";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function AccountDetails({ user }: Props) {
  return (
    <section id="account-details" className="w-full">
      <h3 className="text-lg font-semibold">Account Details</h3>
      <p className="text-gray-500 mt-1">Details about the user's account.</p>
      <div className="mt-4 space-y-2">
        <SimpleInput
          label="User ID"
          value={user.id}
          error={null}
          isDisabled={true}
          onChange={async (value) => {
            // Handle email change
          }}
        />
        <div className="flex align-center space-x-2">
          <div className="w-1/2">
            <SimpleInput
              label="Created At"
              value={user.created_at}
              error={null}
              isDisabled={true}
              onChange={async (value) => {
                // Handle email change
              }}
            />
          </div>
          <div className="w-1/2">
            <SimpleInput
              label="Updated At"
              value={user.updated_at}
              error={null}
              isDisabled={true}
              onChange={async (value) => {
                // Handle email change
              }}
            />
          </div>
        </div>
        <div className="flex align-center space-x-2">
          <div className="w-1/2">
            <SimpleInput
              label="Creation Context"
              value={user.creation_context}
              error={null}
              isDisabled={true}
              onChange={async (value) => {
                // Handle email change
              }}
            />
          </div>
          <div className="w-1/2">
            <SimpleInput
              label="User Type"
              value={user.type}
              error={null}
              isDisabled={true}
              onChange={async (value) => {
                // Handle email change
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
