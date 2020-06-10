import React from "react";
import ReactDOM from "react-dom";
import Root from "./views/Root";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
