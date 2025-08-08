import { getUserSnippet } from "@/services/identity-authority/getUserSnippet";
import { useQuery } from "@tanstack/react-query";

export function useUserSnippet(userId: string) {
    console.log(userId)
    return useQuery({
        queryKey: ['user-snippet', userId],
        queryFn: () => getUserSnippet(userId),
        staleTime: 5 * 60 * 1000, // 5 minutes,
        retry: 1
    })
}