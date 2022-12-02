import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
