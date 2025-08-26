"use client";

import GokkeNavbar from "@/components/navbars/GokkeNavbar/GokkeNavbar";
import PageHeading from "@/components/page/headings/PageHeading";
import SimpleSidebar from "@/components/sidebars/SimpleSidebar/SimpleSidebar";
import Dialog, { DialogRef } from "@/components/utilities/Dialog/Dialog";
import CreateOrganizationForm from "@/components/webadmin/forms/CreateOrganizationForm";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function OrganizationsPage() {
  const dialogRef = useRef<DialogRef>(null);
  const [formKey, setFormKey] = useState(0);
  const handleCreateOrganizationClick = () => {
    setFormKey((prevKey) => prevKey + 1);
    dialogRef.current?.open();
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
