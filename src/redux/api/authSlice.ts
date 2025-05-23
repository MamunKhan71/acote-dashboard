import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ILoginData } from "../../common/common.interface";

interface AuthState {
  user: ILoginData | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token)
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state;