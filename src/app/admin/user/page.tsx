"use client";

import GokkeNavbar from "@/components/navbars/GokkeNavbar/GokkeNavbar";
import SimpleSidebar from "@/components/sidebars/SimpleSidebar/SimpleSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import { useEffect, useState } from "react";
import { assertValidEntityId } from "@/services/core/entity-toolkit";
import { getUserById } from "@/services/identity-authority/userService";
import Link from "next/link";
import InnerLoader from "@/components/page/InnerLoader";
import PageError from "@/components/page/errors/PageError";
import UserEditor from "@/components/webadmin/editors/users/UserEditor";

type DataState =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "loaded";
      user: IdentityAuthority.Users.Endpoints.GetModel["response"];
    };

export default function ManageUserPage() {
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  const [dataState, useDataState] = useState<DataState>({ status: "initial" });
  const getUserIdFromQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("id");
    if (userId === null || userId.trim() === "") {
      useDataState({ status: "error" });
      return;
    }
    try {
      assertValidEntityId(userId);
    } catch (error) {
      useDataState({ status: "error" });
      return;
    }
    useDataState({ status: "loading" });
    getUserById({
      userId: userId,
      signedInUser: signedInUser,
    })
      .then((userData) => {
        useDataState({ status: "loaded", user: userData });
      })
      .catch((error) => {
        useDataState({ status: "error" });
      });
  }, []);
  return (
    <section className="h-screen size-full flex flex-col">
      <GokkeNavbar />
      <div className="flex grow">
        <SimpleSidebar />
        <main className="flex grow mx-auto px-4 py-4 md:px-8 flex-col">
          {dataState.status === "loading" && <InnerLoader />}
          {dataState.status === "error" && (
            <PageError
              message="Sorry, we couldn't find what you are looking for."
              code={404}
              goBackLink="/admin/users"
              goBackLinkText="Users"
            />
          )}
          {dataState.status === "loaded" && (
            <div className="w-full max-w-7xl mx-auto flex">
              <div className="w-3/5">
                <UserEditor user={dataState.user} />
              </div>
              <div className="w-2/5"></div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
