import store from "./redux/store";
import { Provider } from "react-redux";
import React from "react";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App /> // Now App has access to context
    </Provider>
  );
}
