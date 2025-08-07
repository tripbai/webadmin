import taskManager from "@/lib/taskManagerInstance";
import { useEffect, useState } from "react";

export function useUserSnippet(userId: string) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let isMounted = true;
        const success = (result: any) => {
            if (isMounted) {
                setData(result)
                setLoading(false)
            }
        }
        const fail = (error: any) => {
            if (isMounted) {
                setError(error)
                setLoading(false)
            }
        }
        taskManager.listen('getUserSnippet', success, fail)
        return () => {
            isMounted = false;
        }
    }, [userId])
    return { data, error, loading }
}