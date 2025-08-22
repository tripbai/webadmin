"use client";

import Avatar from "@/components/Avatar/Avatar";
import NameInitialsAvatar from "@/components/Avatar/NameInitialsAvatar";
import Dialog, { DialogRef } from "@/components/Dialog";
import Navbar from "@/components/Navbar";
import SimpleHeading from "@/components/Page/Headings/SimpleHeading";
import Sidebar from "@/components/Sidebar";
import RacoonTable from "@/components/Tables/RacoonTable";
import CreateUserForm from "@/components/Users/CreateUserForm";
import useUserList from "@/hooks/identity-authority/useUserList";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Users() {
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
  const [userList, setUserList] = useState<Array<{}>>([]);
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<DialogRef>(null);
  const handleAddUserClick = () => {
    setFormKey(Date.now());
    dialogRef.current?.open();
  };
  const handleManageUserClick = (row: { [key: string]: any }) => {};
  const handleSearchSubmit = (searchTerm: string) => {
    searchUser(searchTerm);
  };
  const handleOnNextPageClick = () => {
    // Logic for handling next page click
    getNextPage();
  };
  const handleOnPreviousPageClick = () => {
    // Logic for handling previous page click
    getPreviousPage();
  };
  const createRows = () => {
    return users.map((user) => ({
      cells: [
        <>
          <Avatar
            src={user.profile_photo}
            alt={`${user.first_name} ${user.last_name}`}
            fallback={<NameInitialsAvatar firstName={user.first_name} />}
          />
        </>,
        <div>
          <div>
            <div className="font-bold">
              {user.first_name + " " + user.last_name}
            </div>{" "}
            <div className="text-gray-600">@{user.username}</div>
          </div>
        </div>,
        user.email_address,
        <code className="text-gray-500">{user.id}</code>,
        <span className={`--tag-status-is-${user.status}`}>{user.status}</span>,
      ],
      buttons: [
        {
          className:
            "cursor-pointer py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg",
          label: "Manage",
          icon: <></>,
          onClick: () => handleManageUserClick(user),
        },
      ],
    }));
  };
  return (
    <section className="h-screen size-full flex flex-col">
      <Navbar />
      <div className="flex grow">
        <Sidebar />
        <main className="flex grow mx-auto px-4 py-4 md:px-8 flex-col">
          <SimpleHeading
            title="Users"
            subtitle="Manage Identity Authority users and their permissions."
            buttons={[
              {
                className:
                  "cursor-pointer inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm",
                label: "Add User",
                icon: <></>,
                onClick: handleAddUserClick,
              },
            ]}
          />
          <RacoonTable
            isLoading={isLoading}
            loadingSkeleton={{
              rows: 5,
              columns: 5,
            }}
            hasNextPage={hasNextPage.current}
            onNextPageClick={handleOnNextPageClick}
            hasPreviousPage={hasPreviousPage.current}
            onPreviousPageClick={handleOnPreviousPageClick}
            searchSubmit={handleSearchSubmit}
            searchClose={closeSearch}
            searchPlaceholder="Search User ID..."
            emptyMessage="No users found."
            headings={[<></>, <>User</>, <>Email</>, <>User ID</>, <>Status</>]}
            rows={createRows()}
          />
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
