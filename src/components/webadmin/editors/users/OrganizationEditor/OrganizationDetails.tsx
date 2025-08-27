"use client";

import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";
import SimpleInput from "@/components/forms/inputs/SimpleInput";
import OrganizationTypeSelect from "@/components/webadmin/utilities/OrganizationTypeSelect";
import useForm from "@/hooks/forms/useForm";
import * as TripBai from "@/types/app/module/types";

type Props = {
  organization: TripBai.Organizations.Endpoints.InternalGetOrganization["response"];
};

export default function OrganizationDetails({ organization }: Props) {
  const { values, errors, setValue, setError, hasChange, submitForm } = useForm(
    {
      initialValues: {
        businessName: organization.business_name,
        orgType: organization.type,
      },
    }
  );
  return (
    <section id="user-profile" className="w-full">
      <h3 className="text-lg font-semibold">About Organization</h3>
      <p className="text-gray-500 mt-1">
        Details and information about the organization.
      </p>
      <div className="mt-4 space-y-2">
        <SimpleInput
          label="Organization ID"
          value={organization.entity_id}
          error={null}
          isDisabled={true}
          onChange={async (value) => {
            // Handle email change
          }}
        />
        <SimpleInput
          label="Business Name"
          value={values.businessName}
          error={errors.businessName ?? null}
          isDisabled={false}
          onChange={async (value) => {
            setValue("businessName", value);
          }}
        />
        <div className="flex align-center space-x-2">
          <div className="w-1/2">
            <SimpleInput
              label="Created At"
              value={organization.created_at}
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
              value={organization.updated_at}
              error={null}
              isDisabled={true}
              onChange={async (value) => {
                // Handle email change
              }}
            />
          </div>
        </div>
        <OrganizationTypeSelect
          orgType={values.orgType}
          onChange={(value) => {
            setValue("orgType", value);
          }}
        />
        <div className="w-full pt-6 flex justify-end space-x-2">
          {hasChange && (
            <ButtonWithSpinner
              onClick={submitForm}
              text="Save Changes"
              type="primary"
            />
          )}
        </div>
      </div>
    </section>
  );
}
