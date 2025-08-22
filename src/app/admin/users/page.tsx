"use client";

import GokkeNavbar from "@/components/navbars/GokkeNavbar/GokkeNavbar";
import PageHeading from "@/components/page/headings/PageHeading";
import SimpleSidebar from "@/components/sidebars/SimpleSidebar/SimpleSidebar";
import Dialog from "@/components/utilities/Dialog";
import { DialogRef } from "@/components/utilities/Dialog/Dialog";
import CreateUserForm from "@/components/webadmin/forms/CreateUserForm";
import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UsersPage() {
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<DialogRef>(null);
  const handleAddUserClick = () => {
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
              title="Users"
              subtitle="Manage Identity Authority users and their permissions."
              buttons={[
                {
                  className: "is-background-primary is-button",
                  label: "Add User",
                  icon: <></>,
                  onClick: handleAddUserClick,
                },
              ]}
            />
            <hr className="border-t border-gray-300 my-4" />
          </div>
        </main>
      </div>
      <Dialog ref={dialogRef}>
        {({ close }) => (
          <CreateUserForm
            key={formKey} // force re-mount on each open
            onSuccess={() => {
              close();
              toast.success("User created successfully!");
            }}
            onCancel={close}
          />
        )}
      </Dialog>
      <Toaster />
    </section>
  );
}
