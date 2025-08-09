'use client';

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

export default function TanStackQueryProvider({ children }: { children: React.ReactNode } ) {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}