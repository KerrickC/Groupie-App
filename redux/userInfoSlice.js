import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {},
  reducers: {
    set: (state, value) => {
      state.value = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = userInfoSlice.actions;

export default userInfoSlice.reducer;
