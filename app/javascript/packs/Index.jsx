import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../store/store.js";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;

document.addEventListener("DOMContentLoaded", () => {
  render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});