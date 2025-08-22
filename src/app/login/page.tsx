"use client";

import LoginForm from "@/components/logins/LoginForm";
import HorizontalLogo from "@/components/logos/tripbai/HorizontalLogo";

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <section>
          <HorizontalLogo />
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-black">Hello there!</h2>
            <p className="text-md text-gray-600">Please login to continue.</p>
          </div>
        </section>
        <LoginForm />
      </div>
    </main>
  );
}
