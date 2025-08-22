import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  value: {
    userId: string;
    authToken: string;
  };
}

export type SignedInUser = UserState["value"];

const initialState: UserState = {
  value: {
    userId: "",
    authToken: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUserSession: (state, action: PayloadAction<UserState["value"]>) => {
      state.value = {
        userId: action.payload.userId,
        authToken: action.payload.authToken,
      };
    },
    refreshAuthToken: (state, action: PayloadAction<UserState["value"]>) => {
      state.value = {
        userId: action.payload.userId,
        authToken: action.payload.authToken,
      };
    },
    clearUserSession: (state) => {
      state.value = {
        userId: "",
        authToken: "",
      };
    },
  },
});

export const { createUserSession, refreshAuthToken, clearUserSession } =
  userSlice.actions;

export default userSlice.reducer;
