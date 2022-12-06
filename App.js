import Main from "./Components/Main";
import store from "./redux/store";
import { Provider } from "react-redux";
import React from "react";

export default function App() {
  return (
    //directs the app on how to run
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
