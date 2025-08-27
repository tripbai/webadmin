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
import * as TripBai from "@/types/app/module/types";
import { getOrganizationByIdInternal } from "@/services/tripbai/organizations/getOrganizationByIdInternal";
import OrganizationEditor from "@/components/webadmin/editors/users/OrganizationEditor";

type DataState =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "loaded";
      organization: TripBai.Organizations.Endpoints.InternalGetOrganization["response"];
    };

export default function ManageUserPage() {
  const signedInUser = useSelector(
    (state: RootState) => state.signedInUser.value
  );
  const [dataState, useDataState] = useState<DataState>({ status: "initial" });
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const organizationId = queryParams.get("id");
    if (organizationId === null || organizationId.trim() === "") {
      useDataState({ status: "error" });
      return;
    }
    try {
      assertValidEntityId(organizationId);
    } catch (error) {
      useDataState({ status: "error" });
      return;
    }
    useDataState({ status: "loading" });
    getOrganizationByIdInternal({
      organizationId: organizationId,
      signedInUser: signedInUser,
    })
      .then((organizationData) => {
        useDataState({ status: "loaded", organization: organizationData });
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
              goBackLink="/admin/organizations"
              goBackLinkText="Organizations"
            />
          )}
          {dataState.status === "loaded" && (
            <div className="w-full max-w-7xl mx-auto flex space-x-4">
              <div className="w-3/5">
                <OrganizationEditor organization={dataState.organization} />
              </div>
              <div className="w-2/5 pl-4 border-l border-gray-200"></div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
