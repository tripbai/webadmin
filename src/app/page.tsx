'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <section>
            <Navbar />
            <h1>Welcome home!</h1>
            <Link href="/admin/users">Go to Users Page</Link>
            <Link href="/login">Go to Login</Link>
        </section>
    )
}