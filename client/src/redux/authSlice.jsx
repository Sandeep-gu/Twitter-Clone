import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("twitterclone");
const user = JSON.parse(userData);
let tokens = null;
let userDetail = {};
if (user) {
  tokens = user.data.token;
  userDetail = user.data;
}
const initialState = {
  token: tokens,
  userDetail: userDetail,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});

export const { setToken, setUserDetail } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
