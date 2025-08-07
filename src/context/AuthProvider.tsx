'use client';

import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { httpPost } from "@/services/httpClient";
import { IdentityAuthority } from "@/types/identity-authority/module/module";
import { clearUserSession, refreshAuthToken } from "@/state/user/userSlice";
import { destroySession, getStoredUserSession, setUserSession } from "@/services/userSession";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [hasValidSession, setHasValidSession] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const hasRefreshedTokenRef = useRef(false)
    useEffect(() => {
        if (typeof window === 'undefined') return

        // checks if the user is authenticated and redirects accordingly
        const gatekeep = (isAuthenticated: boolean) => {
            if (!isAuthenticated && pathname !== '/login') {
                router.push('/login')
                setLoading(false)
                return
            } else if (!isAuthenticated && pathname === '/login') {
                setLoading(false)
                return
            } else if (isAuthenticated && pathname === '/login') {
                router.push('/')
                setHasValidSession(true)
                setLoading(false)
                return
            } else {
                setHasValidSession(true)
                setLoading(false)
            }
        }
        const sessionData = getStoredUserSession()
        if (!sessionData) {
            gatekeep(false)
            return
        }

        if (!hasRefreshedTokenRef.current) {
            hasRefreshedTokenRef.current = true
            httpPost<IdentityAuthority.Users.Endpoints.RefreshAccessToken>({
                host: 'http://localhost:5458',
                path: '/identity-authority/tokens/refresh',
                params: {},
                authToken: sessionData.authToken
            }).then((response) => {
                // update token 
                dispatch(refreshAuthToken({
                    isSignedIn: true,
                    userId: sessionData.userId,
                    authToken: response.token
                }))
                setUserSession({
                    userId: sessionData.userId,
                    authToken: response.token
                })
                return gatekeep(true)
            }).catch((error) => {
                destroySession()
                dispatch(clearUserSession())
                return gatekeep(false)
            })
        }
        return gatekeep(true)
    }, [pathname])

    // for any page, we show a loader while checking the session
    if (loading) return <Loader />

    // as soon as we router.push('/login') above, 
    // the pathname changes to '/login'
    if (!hasValidSession && pathname === '/login') return <> {children} </>

    // when we have a valid session, and the pathname is not '/login',
    // we render the children components
    if (hasValidSession && pathname !== '/login') return <> {children} </>

    return <Loader />
}