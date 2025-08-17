"use client";

import Navbar from "@/components/Navbar";
import SimpleHeading from "@/components/Page/Headings/SimpleHeading";
import Sidebar from "@/components/Sidebar";
import RacoonTable from "@/components/Tables/RacoonTable";
import { useEffect, useState } from "react";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<Array<{}>>([]);
  const handleAddUserClick = () => {
    alert("Add User Clicked");
  };
  const handleManageUserClick = (row: { [key: string]: any }) => {
    console.log("Manage User Clicked", row);
  };
  const handleSearchSubmit = (searchTerm: string) => {
    setLoading(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading delay
  }, [loading]);
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
            isLoading={loading}
            loadingSkeleton={{
              rows: 5,
              columns: 5,
            }}
            hasNextPage={true}
            hasPreviousPage={false}
            searchSubmit={handleSearchSubmit}
            emptyMessage="No users found."
            headings={[
              <>Name</>,
              <>Username</>,
              <>Email</>,
              <>Role</>,
              <>Status</>,
            ]}
            rows={[
              {
                cells: [
                  <>Liam James</>,
                  <>ljames</>,
                  <>ljames@gmail.com</>,
                  <>Product designer</>,
                  <>Active</>,
                ],
                buttons: [
                  {
                    className:
                      "cursor-pointer py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg",
                    label: "Manage",
                    icon: <></>,
                    onClick: handleManageUserClick,
                  },
                ],
              },
            ]}
          />
        </main>
      </div>
    </section>
  );
}
