"use client";

import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import HorizontalLogo from "@/components/logos/tripbai/HorizontalLogo";
import { useUserSnippet } from "@/hooks/identity-authority/useUserSnippet";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function GokkeNavbar() {
  const userState = useSelector((state: RootState) => state.signedInUser.value);
  const { data, error, isLoading, isError } = useUserSnippet(userState.userId);
  const renderProfilePhoto = () => {
    if (isLoading || data === undefined) {
      return (
        <button className="cursor-pointer w-9 h-9 outline-none rounded-full ring-gray-200 ring-2 lg:focus:ring-indigo-600 --skeleton"></button>
      );
    }
    if (isError) {
      return <div></div>;
    }
    return (
      <button className="cursor-pointer">
        <Avatar
          src={data.snippet.profile_photo}
          alt={`${data.snippet.first_name} ${data.snippet.last_name}`}
          fallback={NameInitialsAvatar({ firstName: data.snippet.first_name })}
        />
      </button>
    );
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-500 dark:border-gray-700 border-gray-300 w-full md:static md:text-sm">
      <div className="items-center px-4 mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <HorizontalLogo />
        </div>
        <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 block`}>
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              {isLoading && (
                <div className="--skeleton-text --skeleton w-24"></div>
              )}
              {!isLoading && data !== undefined && (
                <div className="">
                  {data.snippet.first_name} {data.snippet.last_name}
                </div>
              )}
              <li>{renderProfilePhoto()}</li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
