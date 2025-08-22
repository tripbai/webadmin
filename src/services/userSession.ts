type UserSession = {
    userId: string
    authToken: string
}

export const getStoredUserSession = (): null | UserSession => {
    const rawSessionData = localStorage.getItem('__urx')
    if (rawSessionData === null) {
        return null
    }
    const sessionData: unknown = JSON.parse(rawSessionData)
    if (typeof sessionData !== 'object' || sessionData === null) {
        return null
    }
    if (!('userId' in sessionData) || !('authToken' in sessionData)) {
        return null
    }
    if (typeof sessionData.userId !== 'string' || typeof sessionData.authToken !== 'string') {
        return null
    }
    return {
        userId: sessionData.userId,
        authToken: sessionData.authToken
    }
}

export const setUserSession = (userSession: UserSession): void => {
    localStorage.setItem('__urx', JSON.stringify(userSession))
}

export const destroySession = (): void => {
    localStorage.removeItem('__urx')
}