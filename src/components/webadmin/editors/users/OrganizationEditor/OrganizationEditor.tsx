"use client";

import * as TripBai from "@/types/app/module/types";
import OrganizationDetails from "./OrganizationDetails";
import OrganizationPackage from "./OrganizationPackage";
import FeatureEditor from "@/components/webadmin/utilities/FeatureEditor";

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
    </>
  );
}
