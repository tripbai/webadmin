"use client";

import GokkeNavbar from "@/components/navbars/GokkeNavbar/GokkeNavbar";
import SimpleSidebar from "@/components/sidebars/SimpleSidebar/SimpleSidebar";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="h-screen size-full flex flex-col">
      <GokkeNavbar />
      <div className="flex grow">
        <SimpleSidebar />
        <main>
          <h1>Welcome home!</h1>
          <Link href="/admin/users">Go to Users Page</Link>
        </main>
      </div>
    </section>
  );
}
