"use client";

import Navbar from "@/components/Navbar";
import SimpleHeading from "@/components/Page/Headings/SimpleHeading";
import Sidebar from "@/components/Sidebar";
import RacoonTable from "@/components/Tables/RacoonTable";
import useUserList from "@/hooks/identity-authority/useUserList";
import { useEffect, useState } from "react";

export default function Users() {
  //const [loading, setLoading] = useState(true);
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
  const handleAddUserClick = () => {
    alert("Add User Clicked");
  };
  const handleManageUserClick = (row: { [key: string]: any }) => {
    console.log("Manage User Clicked", row);
  };
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
        user.first_name + " " + user.last_name,
        user.username,
        user.email_address,
        user.status,
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
                  "inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm",
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
            headings={[<>Name</>, <>Username</>, <>Email</>, <>Status</>]}
            rows={createRows()}
          />
        </main>
      </div>
    </section>
  );
}
