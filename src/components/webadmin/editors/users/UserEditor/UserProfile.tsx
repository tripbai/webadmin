import * as IdentityAuthority from "@/types/identity-authority/module/types";
import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import EmailAddress from "@/components/forms/inputs/EmailAddress";
import FirstAndLastName from "@/components/forms/inputs/FirstAndLastName";
import Username from "@/components/forms/inputs/Username";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function UserProfile({ user }: Props) {
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
              firstName: user.first_name,
              lastName: user.last_name,
            }}
            error={null}
            onChange={async () => {}}
          />
          <EmailAddress
            value={user.email_address}
            error={null}
            onChange={async () => {}}
          />
          <Username
            value={user.username}
            error={null}
            onChange={async () => {}}
          />
        </div>
      </div>
    </section>
  );
}
