import * as IdentityAuthority from "@/types/identity-authority/module/types";
import * as Core from "@/types/core/module/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { getTenantUsers } from "@/services/identity-authority/tenants/getTenantUsers";
import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";

type Props = {
  tenantId: Core.Entity.Id;
};

export default function TenantUserList({ tenantId }: Props) {
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  const [users, setUsers] = useState<
    Array<
      IdentityAuthority.Users.Snippet & {
        is_owner: boolean;
      }
    >
  >([]);
  useEffect(() => {
    if (signedInUser) {
      getTenantUsers({ tenantId, signedInUser }).then((users) => {
        setUsers(users);
      });
    }
  }, [signedInUser]);
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Avatar
              src={user.profile_photo}
              alt={`${user.first_name} ${user.last_name}`}
              fallback={<NameInitialsAvatar firstName={user.first_name} />}
            />
            <div>
              <div className="font-bold leading-4">
                {user.first_name + " " + user.last_name}{" "}
                {user.is_owner && (
                  <span className="text-gray-500">(Owner)</span>
                )}
              </div>
              <div className="text-gray-500">@{user.username}</div>
            </div>
          </div>
          <div>
            {!user.is_owner ? (
              <span className="text-sm text-gray-400 hover:is-text-primary cursor-pointer">
                Remove
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
