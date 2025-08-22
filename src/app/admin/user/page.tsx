"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getUserById } from "@/services/identity-authority/userService";
import { assertValidEntityId } from "@/services/core/entity-toolkit";
import * as IdentityAuthority from "@/types/identity-authority/module/types";
import FirstAndLastName from "@/components/Forms/Inputs/FirstAndLastName";
import EmailAddress from "@/components/Forms/Inputs/EmailAddress";
import Username from "@/components/Forms/Inputs/Username";
import ButtonWithSpinner from "@/components/Forms/Button/ButtonWithSpinner";

type DataState =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "loaded";
      user: IdentityAuthority.Users.Endpoints.GetModel["response"];
    };

export default function ManageUserPage() {
  const singedInUser = useSelector((state: RootState) => state.user.value);
  if (!singedInUser.isSignedIn) {
    return <></>;
  }
  const [dataState, useDataState] = useState<DataState>({ status: "initial" });
  const getUserId = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  };
  const userId = getUserId();
  useEffect(() => {
    const userId = getUserId();
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
      signedInUser: singedInUser,
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
      <Navbar />
      <div className="flex grow">
        <Sidebar />
        <main className="flex grow mx-auto px-4 py-4 md:px-8 flex-col">
          {dataState.status === "loaded" && (
            <div className="w-full flex">
              <div className="w-1/2">
                <section className="w-full">
                  <h3 className="text-md font-semibold">User Profile</h3>
                  <p className="text-sm text-gray-500">
                    This information is visible to the user in their account.
                  </p>
                  <div className="mt-4 w-full space-y-2">
                    <FirstAndLastName
                      value={{
                        firstName: "",
                        lastName: "",
                      }}
                      error={null}
                      onChange={async () => {}}
                    />
                    <EmailAddress
                      value={dataState.user.email_address}
                      error={null}
                      onChange={async (value) => {}}
                    />
                    <Username
                      value={dataState.user.username}
                      error={null}
                      onChange={async (value) => {}}
                    />
                  </div>
                </section>
                <hr className="border-t border-gray-300 my-4" />
                <section className="w-full">
                  <h3 className="text-md font-semibold">Password</h3>
                  <p className="text-sm text-gray-500">
                    Send a password reset email to the user.
                  </p>
                  <div className="mt-4 w-full space-y-2">
                    <ButtonWithSpinner
                      onClick={async () => {
                        // await resetUserPassword(dataState.user.id);
                      }}
                      onComplete={async () => {
                        // Show a success message
                      }}
                      text="Reset Password"
                      type="primary"
                    />
                  </div>
                </section>
                <hr className="border-t border-gray-300 my-4" />
                <section className="w-full">
                  <h3 className="text-md font-semibold">
                    Account Verification
                  </h3>
                  {dataState.user.is_email_verified && (
                    <div className="mt-3 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
                      <div className="flex justify-between py-3">
                        <div className="flex">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 rounded-full text-green-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="self-center ml-3">
                            <span className="text-green-600 font-semibold text-sm">
                              Account Verified
                            </span>
                            <p className="text-green-600 mt-1 text-sm">
                              This user has verified their email address.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!dataState.user.is_email_verified && (
                    <div className="mt-3 mx-4 px-4 rounded-md bg-amber-50 md:max-w-2xl md:mx-auto md:px-8">
                      <div className="py-3">
                        <div className="flex">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 rounded-full text-amber-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="self-center ml-3 text-sm">
                            <span className="text-amber-600 font-semibold">
                              Account Verification Required
                            </span>
                            <p className="text-amber-600 mt-1 text-sm">
                              This user has not verified their email address.
                            </p>
                            <p className="mt-3">
                              <ButtonWithSpinner
                                onClick={async () => {
                                  // await resetUserPassword(dataState.user.id);
                                }}
                                onComplete={async () => {
                                  // Show a success message
                                }}
                                text="Force Account Verification"
                                type="danger"
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>
              <div className="w-1/2"></div>
            </div>
          )}
          {dataState.status === "loading" && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="--spinner-simple"></div>
            </div>
          )}
          {dataState.status === "error" && (
            <div className="w-full h-full flex items-center justify-center">
              <div>
                <p className="text-sm">
                  Sorry, we couldn't find what you are looking for.
                </p>
                <p className="text-sm text-center">
                  Go back to{" "}
                  <Link
                    href="/admin/users"
                    className="text-indigo-600 hover:underline"
                  >
                    Users.
                  </Link>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
