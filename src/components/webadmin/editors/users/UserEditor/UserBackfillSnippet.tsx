import * as IdentityAuthority from "@/types/identity-authority/module/types";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import { backfillUserSnippet } from "@/services/identity-authority/webadmin/backfillUserSnippet";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  user: IdentityAuthority.Users.Endpoints.GetModel["response"];
};

export default function UserBackfillSnippet({ user }: Props) {
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  return (
    <section id="backfill-snippet" className="w-full">
      <h3 className="text-lg font-semibold">Backfill Snippet</h3>
      <p className="text-gray-500 mt-1">
        Run this task to backfill user snippet data in the indexer.
      </p>
      <div className="mt-4 w-full space-y-2">
        <ButtonWithSpinner
          onClick={async () => {
            await backfillUserSnippet({
              userId: user.id,
              signedInUser: signedInUser,
            });
          }}
          onSuccess={async () => {
            toast.success("Backfill has successfully started");
          }}
          onError={(error) => {
            console.error("Failed to backfill user snippet:", error);
            toast.error("Failed to backfill user snippet");
          }}
          text="Backfill Snippet"
          type="primary"
        />
      </div>
    </section>
  );
}
