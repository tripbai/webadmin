import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import PrimarySelectMenu from "@/components/forms/select-menus/PrimarySelectMenu";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

type RoleNames = "Web Admin" | "Moderator" | "User";

export default function UserRole({ user }: Props) {
  const [localUser, setLocalUser] = useState(user);
  const toRoleNames = (role: IdentityAuthority.Users.Fields.Role) => {
    switch (role) {
      case "webadmin":
        return "Web Admin";
      case "moderator":
        return "Moderator";
      case "user":
        return "User";
      default:
        return "User";
    }
  };
  const [selectedValue, setSelectedValue] = useState<RoleNames | null>(
    toRoleNames(localUser.role)
  );
  const displaySaveButton = () => {
    if (selectedValue === null) return false;
    return selectedValue !== toRoleNames(localUser.role);
  };
  const fromRoleNames = (roleName: RoleNames) => {
    switch (roleName) {
      case "Web Admin":
        return "webadmin";
      case "Moderator":
        return "moderator";
      case "User":
        return "user";
      default:
        return "user";
    }
  };
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">User Role</h3>
      <p className="text-gray-500 mt-1">
        Update the user's role information here.
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <PrimarySelectMenu
          items={["Web Admin", "Moderator", "User"]}
          onChange={(value) => {
            const role = fromRoleNames(value);
            if (role !== localUser.role) {
              setSelectedValue(value);
              return;
            }
            setSelectedValue(null);
          }}
          defaultValue={toRoleNames(localUser.role)}
        />
        {displaySaveButton() && (
          <ButtonWithSpinner
            onClick={async () => {
              // Save changes
              setLocalUser((prev) => ({
                ...prev,
                role: fromRoleNames(selectedValue!),
              }));
            }}
            onComplete={async () => {
              toast.success("User role updated successfully");
              setSelectedValue(null);
            }}
            text="Save"
            type="primary"
          />
        )}
      </div>
      <Toaster />
    </section>
  );
}
