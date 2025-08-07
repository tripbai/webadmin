'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
    return (
        <section className="h-screen size-full flex flex-col">
            <Navbar />
            <div className="flex grow">
                <Sidebar />
                <main>
                    <h1>Welcome home!</h1>
                    <Link href="/admin/users">Go to Users Page</Link>
                    <Link href="/login">Go to Login</Link>
                </main>
            </div>
        </section>
    )
}