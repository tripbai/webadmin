'use client';

import { useUserSnippet } from "@/hooks/identity-authority/useUserSnippet";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function Navbar() {
    const userState = useSelector((state: RootState) => state.user.value)
    if (!userState.isSignedIn) {
        return <></>    
    }
    const { data, error, isLoading, isError } = useUserSnippet(userState.userId)
    const renderProfilePhoto = () => {
        if (isLoading) {
            return <button className="cursor-pointer w-9 h-9 outline-none rounded-full ring-gray-200 ring-2 lg:focus:ring-indigo-600 --skeleton"></button>
        }
        if (isError) {
            return <div></div>
        }
        if (data.snippet.profile_photo === null) {
            return (
                <button className="cursor-pointer flex items-center justify-center w-9 h-9 outline-none rounded-full ring-gray-200 ring-2 lg:focus:ring-indigo-600">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24"><path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path></svg>
                </button>
            )
        }
        return (
            <button className="cursor-pointer w-9 h-9 outline-none rounded-full ring-gray-200 ring-2 lg:focus:ring-indigo-600">
                <img
                    src="https://randomuser.me/api/portraits/men/46.jpg"
                    className="w-full h-full rounded-full"
                />
            </button>
        )
    }

    return (
        <nav className="border-b dark:border-gray-700 w-full md:static md:text-sm">
            <div className="items-center px-4 mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="javascript:void(0)">
                        tripbai
                    </a>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 block`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                            {isLoading && <div className="--skeleton-text --skeleton w-24"></div>}    
                            {!isLoading && <div className="">{data.snippet.first_name} {data.snippet.last_name}</div>} 
                            <li>
                                {renderProfilePhoto()}
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
