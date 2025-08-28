import { useEffect } from "react";
import * as TripBai from "@/types/app/module/types";
import * as Core from "@/types/core/module/types";
import useStoresByOrgList from "@/hooks/tripbai/useStoresByOrgList";
import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import { getLocationById } from "@/services/tripbai/locations/getLocationById";
import Link from "next/link";

type Props = {
  organization: TripBai.Organizations.Endpoints.InternalGetOrganization["response"];
};

export default function OrganizationStores({ organization }: Props) {
  const { stores, isLoading } = useStoresByOrgList({
    orgId: organization.entity_id,
  });
  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold">Stores</h3>
      <p className="text-gray-500 mt-1">
        All stores associated with this organization are listed below.
      </p>
      <div className="mt-4 w-full space-y-4">
        {stores.map((store, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex space-x-2">
              <Avatar
                src={store.profile_photo_src}
                alt={store.name}
                fallback={<NameInitialsAvatar firstName={store.name} />}
              />
              <div>
                <span className="font-semibold">{store.name}</span>
                <p className="text-gray-500">
                  {getLocationById(store.location_id ?? "")}
                </p>
              </div>
            </div>
            <Link
              href={`/admin/stores?id=${store.entity_id}`}
              className="is-link-primary text-sm"
            >
              Manage
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
