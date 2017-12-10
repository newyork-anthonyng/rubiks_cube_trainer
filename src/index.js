import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

let initialScramble;
if (window.__INITIAL_SCRAMBLE__) {
  initialScramble = window.__INITIAL_SCRAMBLE__;
}

hydrate(
  <App initialScramble={initialScramble} />,
  document.getElementById("app")
);
