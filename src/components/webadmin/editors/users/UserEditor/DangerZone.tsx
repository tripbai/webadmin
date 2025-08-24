import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function DangerZone({ user }: Props) {
  const [localUser, setLocalUser] = useState(user);
  return (
    <section className="w-full space-y-4">
      <div id="user-suspension" className="flex justify-between">
        <div>
          <h3 className="font-semibold">User Suspension</h3>
          <p className="text-gray-500 mt-1">
            {localUser.suspended_until
              ? "This user is currently suspended until " +
                localUser.suspended_until
              : "This user is not suspended."}
          </p>
        </div>
        <div>
          {localUser.suspended_until !== null && (
            <ButtonWithSpinner
              onClick={async () => {
                // Handle suspension logic
                await new Promise((resolve) => setTimeout(resolve, 3000));
                setLocalUser({
                  ...localUser,
                  suspended_until: null,
                });
              }}
              onComplete={() => {
                toast.success("[Test] User suspension lifted successfully");
              }}
              text="Lift Suspension"
              type="primary"
            />
          )}
          {localUser.suspended_until === null && (
            <ButtonWithSpinner
              onClick={async () => {
                // Handle suspension logic
                await new Promise((resolve) => setTimeout(resolve, 3000));
                setLocalUser({
                  ...localUser,
                  suspended_until: new Date(Date.now()).toISOString(),
                });
              }}
              onComplete={() => {
                toast.success("[Test] User suspended successfully");
              }}
              text="Suspend User"
              type="danger"
            />
          )}
        </div>
      </div>

      <div id="ban-user" className="flex justify-between">
        <div>
          <h3 className="font-semibold">Ban User</h3>
          <p className="text-gray-500 mt-1">
            {localUser.status === "banned"
              ? "This user is currently banned."
              : "This user is not banned."}
          </p>
        </div>
        <div>
          {localUser.status === "banned" && (
            <ButtonWithSpinner
              onClick={async () => {
                // Handle unban logic
              }}
              onComplete={() => {}}
              text="Lift Ban"
              type="primary"
            />
          )}
          {localUser.status !== "banned" && (
            <ButtonWithSpinner
              onClick={async () => {
                // Handle ban logic
              }}
              onComplete={() => {}}
              text="Ban User"
              type="danger"
            />
          )}
        </div>
      </div>

      <div id="archive-user" className="flex justify-between">
        <div>
          <h3 className="font-semibold">Archive User</h3>
          <p className="text-gray-500 mt-1">
            {localUser.archived_at !== null
              ? "This user is currently archived."
              : "This user is not archived."}
          </p>
        </div>
        <div>
          {localUser.archived_at !== null && (
            <ButtonWithSpinner
              onClick={async () => {
                // Handle unarchive logic
              }}
              onComplete={() => {}}
              text="Remove from Archive"
              type="primary"
            />
          )}
          {localUser.archived_at === null && (
            <ButtonWithSpinner
              onClick={async () => {
                // Handle archive logic
              }}
              onComplete={() => {}}
              text="Archive User"
              type="danger"
            />
          )}
        </div>
      </div>

      <Toaster />
    </section>
  );
}
