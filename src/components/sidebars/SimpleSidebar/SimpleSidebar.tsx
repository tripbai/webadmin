"use client";

import { destroySession } from "@/services/userSession";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearUserSession } from "@/state/user/userSlice";
import { useRouter } from "next/navigation";

export default function SimpleSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const navTopItems = [
    {
      href: "/",
      name: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
    },
    {
      href: "/admin/users",
      name: "Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path d="M9 4A4 4 0 1 0 9 12 4 4 0 1 0 9 4z"></path>
          <path d="m10,13h-2c-2.76,0-5,2.24-5,5v1c0,.55.45,1,1,1h10c.55,0,1-.45,1-1v-1c0-2.76-2.24-5-5-5Z"></path>
          <path d="m15,4c-.47,0-.9.09-1.31.22.82,1.02,1.31,2.33,1.31,3.78s-.49,2.75-1.31,3.78c.41.13.84.22,1.31.22,2.28,0,4-1.72,4-4s-1.72-4-4-4Z"></path>
          <path d="m16,13h-1.11c1.3,1.27,2.11,3.04,2.11,5v1c0,.35-.07.69-.18,1h3.18c.55,0,1-.45,1-1v-1c0-2.76-2.24-5-5-5Z"></path>
        </svg>
      ),
    },
    {
      href: "/admin/organizations",
      name: "Organizations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={0.5}
          stroke="none"
          className="w-6 h-6"
        >
          <path d="M4 22h16c.55 0 1-.45 1-1V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v6H5c-1.1 0-2 .9-2 2v9c0 .55.45 1 1 1M9 4h10v16h-6v-8c0-1.1-.9-2-2-2H9zm-4 8h6v8H5z"></path>
          <path d="M11 6h2v2h-2zM15 6h2v2h-2zM15 10.03h2V12h-2zM15 14h2v2h-2zM7 14h2v2H7z"></path>
        </svg>
      ),
    },
    {
      href: "plans",
      name: "Plans",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
    },
    {
      href: "/packages",
      name: "Packages",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      href: "/integrations",
      name: "Integrations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
          />
        </svg>
      ),
    },
  ];

  const navBottomItems = [
    {
      href: "javascript:void(0)",
      name: "Help",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Logout",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
      onClick: () => {
        destroySession();
        dispatch(clearUserSession());
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      },
    },
  ];

  return (
    <>
      <div className="w-60 h-full border-r border-gray-300 dark:border-gray-700"></div>
      <nav className="fixed h-screen space-y-8 w-60 flex-shrink-0 top-0 left-0">
        <div className="flex flex-col h-full">
          <div className="h-5 flex items-center px-8"></div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 flex-1">
              <div className="h-[67px] w-full"></div>
              {navTopItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href !== "javascript:void(0)" ? item.href : "#"}
                    className="group flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
                  >
                    <div className="text-gray-400 dark:text-gray-300">
                      {item.icon}
                    </div>
                    <span className="hover:is-text-primary text-md">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4">
                {navBottomItems.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={
                        item.href !== "javascript:void(0)" ? item.href : "#"
                      }
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        }
                      }}
                      className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    >
                      <div className="text-gray-400 dark:text-gray-300">
                        {item.icon}
                      </div>
                      <span className="hover:is-text-primary text-md">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
