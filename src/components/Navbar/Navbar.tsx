'use client';

import { useUserSnippet } from "@/hooks/identity-authority/useUserSnippet";

export default function Navbar() {
    const { data, error, isLoading, isError } = useUserSnippet('some-user-id');
    console.log(data)
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
                            <li>Web Admin</li>
                            <li>
                                <button className="w-9 h-9 outline-none rounded-full ring-gray-200 ring-2 lg:focus:ring-indigo-600">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/46.jpg"
                                        className="w-full h-full rounded-full"
                                    />
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
