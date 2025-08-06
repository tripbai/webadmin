import Login from '@/components/Login';

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <Login />
            </div>
        </main>
    )
}