import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import SimpleButton from "@/components/forms/buttons/SimpleButton";
import SearchUser from "../../admin/users/SearchUser";
import SimpleInput from "@/components/forms/inputs/SimpleInput";
import useForm from "@/hooks/forms/useForm";
import * as Core from "@/types/core/module/types";
import { getTenantByUserId } from "@/services/identity-authority/webadmin/getTenantByUserId";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { assertIsOrganizationBusinessName } from "@/services/tripbai/organizationAssertions";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function CreateOrganizationForm({ onSuccess, onCancel }: Props) {
  const { values, errors, setValue, setError } = useForm({
    initialValues: {
      tenantAdminUserId: "" as Core.Entity.Id,
      organizationName: "" as string,
    },
  });
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  return (
    <div className="w-md space-y-4">
      <h3 className="text-gray-800 dark:text-gray-200 text-lg font-bold sm:text-xl">
        Create Organization
      </h3>
      <div className="space-y-2">
        <SearchUser
          label="Search User"
          error={errors.tenantAdminUserId ?? null}
          onSelectResult={(user) => {
            getTenantByUserId(user.id, signedInUser)
              .then((tenant) => {
                setError(
                  "tenantAdminUserId",
                  "User already belongs to an organization"
                );
                setValue("tenantAdminUserId", "" as Core.Entity.Id);
              })
              .catch((error) => {
                console.error(error);
                setValue("tenantAdminUserId", user.id);
                setError("tenantAdminUserId", null);
              });
          }}
        />
        <SimpleInput
          label="Organization Name"
          value={values.organizationName}
          isDisabled={false}
          error={errors.organizationName ?? null}
          placeholder="Enter organization name"
          onChange={async (value) => {
            try {
              assertIsOrganizationBusinessName(value);
              setValue("organizationName", value);
              setError("organizationName", null);
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : "Invalid value";
              setError("organizationName", errorMessage);
            }
          }}
        />
      </div>
      <div className="w-full pt-6 flex justify-end space-x-2">
        <SimpleButton type="secondary" text="Cancel" onClick={onCancel} />
        <ButtonWithSpinner
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            onSuccess();
          }}
          text="Create"
          type="primary"
        />
      </div>
    </div>
  );
}
