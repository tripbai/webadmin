import SearchUser from "@/components/admin/users/SearchUser";
import TenantUserList from "@/components/admin/users/TenantUserList";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import * as TripBai from "@/types/app/module/types";
import * as Core from "@/types/core/module/types";

type Props = {
  organization: TripBai.Organizations.Endpoints.InternalGetOrganization["response"];
};

export default function OrganizationUsers({ organization }: Props) {
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">Users</h3>
      <p className="text-gray-500 mt-1">
        All users associated with this organization are listed below.
      </p>
      <div className="mt-2 space-y-4">
        <div className="flex items-center space-x-3 w-full">
          <div className="w-1/2">
            <SearchUser
              label="Add User"
              error={null}
              onSelectResult={async () => {}}
            />
          </div>
          <div className="">
            <div>
              <label className="text-gray-600 text-sm opacity-0">
                Submit Button
              </label>
            </div>
            <ButtonWithSpinner
              text="Add"
              type="primary"
              onClick={async () => {}}
            />
          </div>
        </div>
        <TenantUserList tenantId={organization.entity_id} />
      </div>
    </section>
  );
}
