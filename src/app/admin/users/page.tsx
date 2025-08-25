"use client";

import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import GokkeNavbar from "@/components/navbars/GokkeNavbar/GokkeNavbar";
import PageHeading from "@/components/page/headings/PageHeading";
import SimpleSidebar from "@/components/sidebars/SimpleSidebar/SimpleSidebar";
import RacoonTable from "@/components/tables/racoon/RacoonTable";
import Dialog from "@/components/utilities/Dialog";
import { DialogRef } from "@/components/utilities/Dialog/Dialog";
import SimpleTag from "@/components/utilities/tags/SimpleTag";
import CreateUserForm from "@/components/webadmin/forms/CreateUserForm";
import useUserList from "@/hooks/identity-authority/useUserList";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UsersPage() {
  const {
    users,
    isLoading,
    searchUser,
    hasNextPage,
    hasPreviousPage,
    getNextPage,
    getPreviousPage,
    closeSearch,
  } = useUserList();
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<DialogRef>(null);
  const handleAddUserClick = () => {
    setFormKey((prevKey) => prevKey + 1);
    dialogRef.current?.open();
  };
  const getUserStatusTagColor = (
    status: IdentityAuthority.Users.Status.Type
  ) => {
    switch (status) {
      case "active":
        return "bg-teal-600";
      case "unverified":
        return "bg-yellow-500";
      case "banned":
        return "bg-pink-600";
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
    return users.map((user) => ({
      cells: [
        <div className="flex items-center space-x-4 pl-4 py-3">
          <Avatar
            src={user.profile_photo}
            alt={`${user.first_name} ${user.last_name}`}
            fallback={<NameInitialsAvatar firstName={user.first_name} />}
          />
          <div>
            <div className="font-bold leading-4">
              {user.first_name + " " + user.last_name}
            </div>
            <div className="text-gray-500">@{user.username}</div>
          </div>
        </div>,
        <div className="py-3">{user.email_address}</div>,
        <div className="text-gray-500 py-3">
          <code>{user.id}</code>
        </div>,
        <span className="py-3">
          <SimpleTag
            label={user.status}
            background={getUserStatusTagColor(user.status)}
          />
        </span>,
        <div className="py-3 pr-4">
          <Link
            href={`/admin/user?id=${user.id}`}
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
            <RacoonTable
              isLoading={isLoading}
              loaders={[]}
              rows={createRows()}
              headers={[
                <div className="text-left bg-gray-100 py-2 pl-6">User</div>,
                <div className="text-left bg-gray-100 py-2">Email</div>,
                <div className="text-left bg-gray-100 py-2">User ID</div>,
                <div className="text-left bg-gray-100 py-2">Status</div>,
                <div className="text-left bg-gray-100 py-2 pr-4">Actions</div>,
              ]}
              emptyState={
                <div className="text-center py-4">No users found.</div>
              }
              onSearchSubmit={searchUser}
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
