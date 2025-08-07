'use client';

import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Welcome home!</h1>
            <Link href="/admin/users">Go to Users Page</Link>
            <Link href="/login">Go to Login</Link>
        </div>
    )
}