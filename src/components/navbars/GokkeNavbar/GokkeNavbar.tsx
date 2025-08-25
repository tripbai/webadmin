"use client";

import Avatar from "@/components/avatars/Avatar";
import NameInitialsAvatar from "@/components/avatars/NameInitialsAvatar";
import HorizontalLogo from "@/components/logos/tripbai/HorizontalLogo";
import { useUserSnippet } from "@/hooks/identity-authority/useUserSnippet";
import { RootState } from "@/state/store";
import Link from "next/link";
import { destroySession } from "@/services/userSession";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserSession } from "@/state/user/userSlice";
import { useRouter } from "next/navigation";

export default function GokkeNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state: RootState) => state.signedInUser.value);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cachedUser, setCachedUser] = useState<any>(null);

  const { data, error, isLoading, isError } = useUserSnippet(userState.userId);

  // cache the snippet once it's available
  useEffect(() => {
    if (data) setCachedUser(data);
  }, [data]);

  const renderProfilePhoto = () => {
    if ((isLoading && !cachedUser) || data === undefined) {
      return (
        <button className="cursor-pointer w-9 h-9 outline-none rounded-full ring-gray-200 ring-2 lg:focus:ring-indigo-600 --skeleton"></button>
      );
    }
    if (isError && !cachedUser) {
      return <div></div>;
    }

    const snippet = data?.snippet || cachedUser?.snippet;

    return (
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer"
      >
        <Avatar
          src={snippet.profile_photo}
          alt={`${snippet.first_name} ${snippet.last_name}`}
          fallback={NameInitialsAvatar({ firstName: snippet.first_name })}
        />
      </button>
    );
  };

  const handleLogout = () => {
    destroySession();
    setTimeout(() => {
      dispatch(clearUserSession());
      router.push("/login");
    }, 1000);
  };

  const snippet = data?.snippet || cachedUser?.snippet;

  return (
    <>
      <div className="w-full flex-none h-[67px]"></div>
      <nav className="z-1 flex-none h-[67px] fixed top-0 bg-white border-b border-gray-300 w-full">
        <div className="items-center px-4 mx-auto md:flex align-center md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <HorizontalLogo />
          </div>
          <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 block`}>
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
              <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
                {isLoading && !snippet && (
                  <div className="--skeleton-text --skeleton w-24"></div>
                )}
                {snippet && (
                  <div>
                    {snippet.first_name} {snippet.last_name}
                  </div>
                )}
                <li>{renderProfilePhoto()}</li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className={`mt-17 mr-4 absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 ring-opacity-5 ${
          isMenuOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="py-2">
          <Link
            href={`/admin/user?id=${snippet?.id ?? ""}`}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:is-text-primary rounded-md"
          >
            My Profile
          </Link>
          <Link
            href="#"
            onClick={handleLogout}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:is-text-primary rounded-md"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
