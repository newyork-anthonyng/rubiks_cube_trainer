import React from "react";
import { render, hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

let initialScramble;
if (window.__INITIAL_SCRAMBLE__) {
  initialScramble = window.__INITIAL_SCRAMBLE__;
}

let renderApp = hydrate;

if (module.hot) {
  // Use react-dom/render to avoid SSR mismatch warnings
  renderApp = render;
}

renderApp(
  <BrowserRouter>
    <App initialScramble={initialScramble} />
  </BrowserRouter>,
  document.getElementById("app")
);
