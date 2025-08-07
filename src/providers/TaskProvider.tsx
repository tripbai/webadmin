'use client';

import taskManager from "@/lib/taskManagerInstance"
import { getUserSnippet } from "@/services/identity-authority/getUserSnippet"
import { useEffect } from "react"

export default function TaskProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        taskManager.register('getUserSnippet', getUserSnippet)
    })
    return <> {children} </>
}