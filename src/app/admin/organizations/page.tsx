"use client";

import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import GokkeNavbar from "@/components/navbars/GokkeNavbar/GokkeNavbar";
import PageHeading from "@/components/page/headings/PageHeading";
import SimpleSidebar from "@/components/sidebars/SimpleSidebar/SimpleSidebar";
import Dialog, { DialogRef } from "@/components/utilities/Dialog/Dialog";
import SimpleTag from "@/components/utilities/tags/SimpleTag";
import CreateOrganizationForm from "@/components/webadmin/forms/CreateOrganizationForm";
import useOrganizationList from "@/hooks/tripbai/useOrganizationList";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as TripBai from "@/types/app/module/types";
import Link from "next/link";
import RacoonTable from "@/components/tables/racoon/RacoonTable";
import { formatPhilippineNumber } from "@/services/utils/formatPhilippineNumber";

export default function OrganizationsPage() {
  const {
    organizations,
    isLoading,
    searchOrganization,
    hasNextPage,
    hasPreviousPage,
    getNextPage,
    getPreviousPage,
    closeSearch,
  } = useOrganizationList();
  const dialogRef = useRef<DialogRef>(null);
  const [formKey, setFormKey] = useState(0);
  const handleCreateOrganizationClick = () => {
    setFormKey((prevKey) => prevKey + 1);
    dialogRef.current?.open();
  };
  const getStatusTagColor = (status: TripBai.Organizations.Fields.Status) => {
    switch (status) {
      case "active":
        return "bg-teal-600";
      case "deactivated":
        return "bg-slate-600";
      case "archived":
        return "bg-neutral-500";
      default:
        // suspended
        return "bg-zinc-500";
    }
  };
  const createRows = () => {
    return organizations.map((organization) => ({
      cells: [
        <div className="flex items-center space-x-4 pl-4 py-3">
          <Avatar
            src={organization.profile_photo}
            alt={`${organization.business_name}`}
            fallback={
              <NameInitialsAvatar firstName={organization.business_name} />
            }
          />
          <div>
            <div className="font-bold leading-4">
              {organization.business_name}
            </div>
          </div>
        </div>,
        <div className="py-3">{organization.type}</div>,
        <div className="text-gray-500 py-3">
          <code>{organization.entity_id}</code>
        </div>,
        <div className="py-3">
          {formatPhilippineNumber(organization.telephone_number ?? "")}
        </div>,
        <span className="py-3">
          <SimpleTag
            label={organization.status}
            background={getStatusTagColor(organization.status)}
          />
        </span>,
        <div className="py-3 pr-4">
          <Link
            href={`/admin/organization?id=${organization.entity_id}`}
            className="is-link-primary text-sm"
          >
            Manage
          </Link>
        </div>,
      ],
    }));
  };
  return (
    <section className="h-screen size-full flex flex-col">
      <GokkeNavbar />
      <div className="flex grow">
        <SimpleSidebar />
        <main className="flex grow mx-auto px-4 py-4 md:px-8 flex-col">
          <div className="w-full max-w-7xl mx-auto">
            <PageHeading
              title="Organizations"
              subtitle="Create and manage organizations"
              buttons={[
                {
                  className: "is-background-primary is-button",
                  label: "Create Organization",
                  icon: <></>,
                  onClick: handleCreateOrganizationClick,
                },
              ]}
            />
            <hr className="border-t border-gray-300 my-4" />
            <RacoonTable
              isLoading={isLoading}
              loaders={[]}
              rows={createRows()}
              headers={[
                <div className="text-left bg-gray-100 py-2 pl-6">
                  Organization
                </div>,
                <div className="text-left bg-gray-100 py-2">Type</div>,
                <div className="text-left bg-gray-100 py-2">Org ID</div>,
                <div className="text-left bg-gray-100 py-2">Phone No.</div>,
                <div className="text-left bg-gray-100 py-2">Status</div>,
                <div className="text-left bg-gray-100 py-2 pr-4">Actions</div>,
              ]}
              emptyState={
                <div className="text-center py-4">No organizations found.</div>
              }
              onSearchSubmit={searchOrganization}
              onSearchClose={closeSearch}
              searchPlaceholder="Search users..."
              onNextPageClick={getNextPage}
              onPreviousPageClick={getPreviousPage}
              hasPreviousPage={hasPreviousPage.current}
              hasNextPage={hasNextPage.current}
            />
          </div>
        </main>
      </div>
      <Dialog ref={dialogRef}>
        {({ close }) => (
          <CreateOrganizationForm
            key={formKey} // force re-mount on each open
            onSuccess={() => {
              close();
              toast.success("Organization created successfully");
            }}
            onCancel={close}
          />
        )}
      </Dialog>
      <Toaster />
    </section>
  );
}
