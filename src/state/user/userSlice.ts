import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserState {
    value: {
        isSignedIn: false
    } | {
        isSignedIn: true
        userId: string
        authToken: string
    }
}

type SignedInUser = Extract<UserState['value'], { isSignedIn: true }>

const initialState: UserState = {
    value: {
        isSignedIn: false
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUserSession: (state, action: PayloadAction<SignedInUser>) => {
            state.value = {
                isSignedIn: true,
                userId: action.payload.userId,
                authToken: action.payload.authToken
            }
        },
        refreshAuthToken: (state, action: PayloadAction<SignedInUser>) => {
            state.value = {
                isSignedIn: true,
                userId: action.payload.userId,
                authToken: action.payload.authToken
            }
        },
        clearUserSession: (state) => {
            state.value = {
                isSignedIn: false
            }
        }
    }
})

export const { createUserSession, refreshAuthToken, clearUserSession } = userSlice.actions

export default userSlice.reducer