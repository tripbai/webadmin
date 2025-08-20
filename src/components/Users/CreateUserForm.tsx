"use client";

import { Dispatch, SetStateAction, useState } from "react";
import ButtonWithSpinner from "../Forms/Button/ButtonWithSpinner";

type CreateUserFormProps = {
  onSuccess: () => void;
};

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const submit = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  return (
    <div className="w-md">
      <h3 className="text-gray-800 dark:text-gray-200 text-lg font-bold sm:text-xl">
        Create User
      </h3>
      <div className="flex align-center pt-4">
        <div className="w-half mr-1">
          <label className="text-gray-600 text-sm">First Name</label>
          <input
            type="text"
            placeholder="John"
            className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="w-half ml-1">
          <label className="text-gray-600 text-sm">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>

      {/** Email Field */}
      <div className="pt-2">
        <label className="text-gray-600 text-sm">Email Address</label>
        <div className="relative">
          <svg
            className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <input
            type="email"
            placeholder="johndoe@example.com"
            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>

      {/** Username Field */}
      <div className="pt-2">
        <label className="text-gray-600 text-sm">Username</label>
        <div className="relative">
          <svg
            className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="none"
          >
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.47 0 2.96-.37 4.44-1.1l-.89-1.79c-1.2.59-2.4.9-3.56.9-4.41 0-8-3.59-8-8S7.59 4 12 4s8 3.59 8 8v1c0 .69-.31 2-1.5 2-1.4 0-1.49-1.82-1.5-2V8h-2v.03C14.16 7.4 13.13 7 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.45 0 2.75-.63 3.66-1.62.52.89 1.41 1.62 2.84 1.62 2.27 0 3.5-2.06 3.5-4v-1c0-5.51-4.49-10-10-10m0 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3"></path>
          </svg>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>

      {/** Password Field */}
      <div className="pt-2">
        <label className="text-gray-600 text-sm">Password</label>
        <div className="relative">
          <button
            className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
            onClick={() => setPasswordHidden(!isPasswordHidden)}
          >
            {isPasswordHidden ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
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
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
          <input
            type={isPasswordHidden ? "password" : "text"}
            placeholder="**************"
            className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>
      <div className="w-full pt-6 flex justify-end">
        <ButtonWithSpinner onClick={submit} text="Create User" type="primary" />
      </div>
    </div>
  );
}
