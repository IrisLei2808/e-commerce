import React from "react";
import ReactDOM from "react-dom";
import "./";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css"></link>


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
