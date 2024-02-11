import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("twitterclone");
const user = JSON.parse(userData);
let tokens = null;
if (user) {
  tokens = user.token;
}
const initialState = {
  token: tokens,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
