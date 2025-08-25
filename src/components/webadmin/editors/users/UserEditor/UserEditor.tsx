import * as IdentityAuthority from "@/types/identity-authority/module/types";
import UserProfile from "./UserProfile";
import UserPassword from "./UserPassword";
import AccountVerification from "./AccountVerification";
import AccountDetails from "./AccountDetails";
import DangerZone from "./DangerZone";
import UserRole from "./UserRole";
import UserBackfillSnippet from "./UserBackfillSnippet";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function UserEditor({ user }: Props) {
  return (
    <>
      <UserProfile user={user} />
      <hr className="border-t border-gray-300 my-4" />
      <UserPassword user={user} />
      <hr className="border-t border-gray-300 my-4" />
      <AccountDetails user={user} />
      <hr className="border-t border-gray-300 my-4" />
      <AccountVerification user={user} />
      <hr className="border-t border-gray-300 my-4" />
      <UserRole user={user} />
      <hr className="border-t border-gray-300 my-4" />
      <UserBackfillSnippet user={user} />
      <hr className="border-t border-gray-300 my-4" />
      <DangerZone user={user} />
      <hr className="border-t border-gray-300 my-4" />
    </>
  );
}
