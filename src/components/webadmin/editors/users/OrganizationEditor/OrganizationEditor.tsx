"use client";

import * as TripBai from "@/types/app/module/types";
import OrganizationDetails from "./OrganizationDetails";
import OrganizationPackage from "./OrganizationPackage";
import FeatureEditor from "@/components/webadmin/utilities/FeatureEditor";
import AddressForm from "@/components/webadmin/utilities/AddressForm";
import ContactsForm from "@/components/webadmin/utilities/ContactsForm";
import ButtonWithSpinner from "@/components/forms/buttons/ButtonWithSpinner";

type Props = {
  organization: TripBai.Organizations.Endpoints.InternalGetOrganization["response"];
};

export default function OrganizationEditor({ organization }: Props) {
  return (
    <>
      <OrganizationDetails organization={organization} />
      <hr className="border-t border-gray-300 my-4" />
      <OrganizationPackage organization={organization} />
      <hr className="border-t border-gray-300 my-4" />
      <FeatureEditor
        featurableEntityId={organization.entity_id}
        featurableEntityType="organization"
      />
      <hr className="border-t border-gray-300 my-4" />
      <AddressForm
        formTitle="Organization Address"
        formDescription="Details about the organization's business address."
        addressEntityId={organization.entity_id}
        lineAddress1={organization.line_address_1}
        lineAddress2={organization.line_address_2}
        locationId={organization.location_id}
      />
      <hr className="border-t border-gray-300 my-4" />
      <ContactsForm
        formTitle="Organization Contacts"
        formDescription="The organization's contact information."
        contactEntityId={organization.entity_id}
        landlineNumber={organization.telephone_number}
        mobileNumber={organization.mobile_number}
        businessEmail={organization.email_address}
      />
      <hr className="border-t border-gray-300 my-4" />
      <section className="w-full space-y-4">
        <div id="archive-user" className="flex justify-between">
          <div>
            <h3 className="font-semibold">Archive Organization</h3>
            <p className="text-gray-500 mt-1">
              {organization.status === "archived"
                ? "This organization is currently archived."
                : "This organization is not archived."}
            </p>
          </div>
          <div>
            {organization.status === "archived" && (
              <ButtonWithSpinner
                onClick={async () => {
                  // Handle unarchive logic
                }}
                onComplete={() => {}}
                text="Remove from Archive"
                type="primary"
              />
            )}
            {organization.status !== "archived" && (
              <ButtonWithSpinner
                onClick={async () => {
                  // Handle archive logic
                }}
                onComplete={() => {}}
                text="Archive Organization"
                type="danger"
              />
            )}
          </div>
        </div>
      </section>
      <hr className="border-t border-gray-300 my-4" />
    </>
  );
}
