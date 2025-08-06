'use client';

import { useState } from 'react';
import MessageBox from '../MessageBox';
import { httpGet, httpPost } from '@/services/httpClient';
import { IdentityAuthority } from '@/types/identity-authority/module/module';

export default function Login() {
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log({email, password})
        try {
            const response = await httpPost<IdentityAuthority.Users.Endpoints.AccessReport>({
                host: 'http://localhost:5458',
                path: '/identity-authority/access-report',
                params: {},
                data: {
                    provider: 'iauth',
                    email_address: email as IdentityAuthority.Users.Endpoints.AccessReport['request']['data']['email_address'],
                    password: password as IdentityAuthority.Users.Endpoints.AccessReport['request']['data']['password']
                },
                authToken: null
            })
            if (!response.is_user_registered) {
                throw new Error('Sorry, invalid email or password')
            }
        } catch (error) {
            setShowMessage(true)
            setMessage(error.message)
        }
    }
    return (
        <div>   
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="font-medium text-sm dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium text-sm dark:text-gray-300">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-x-3">
                        <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                        <label
                            htmlFor="remember-me-checkbox"
                            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                        >
                        </label>
                        <span>Remember me</span>
                    </div>
                    <a href="javascript:void(0)" className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                <button
                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                    Sign in
                </button>
            </form>
            {showMessage && <MessageBox message={message} />}
        </div>
    )
}