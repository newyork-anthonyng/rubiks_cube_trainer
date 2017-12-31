import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

let initialScramble;
if (window.__INITIAL_SCRAMBLE__) {
  initialScramble = window.__INITIAL_SCRAMBLE__;
}

hydrate(
  <BrowserRouter>
    <App initialScramble={initialScramble} />
  </BrowserRouter>,
  document.getElementById("app")
);
