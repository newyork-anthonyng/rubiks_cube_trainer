import express from "express";
const router = express.Router();

import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import getRandomSolve from "rubiks-cross-trainer";

function handleServerSideRendering(req, res) {
  const initialScramble = getRandomSolve(1);
  const markup = ReactDOMServer.renderToString(<App initialScramble={initialScramble} />);

  res.render("index", {
    markup,
    initialScramble
  });
}

router.get("*", handleServerSideRendering);

export default router;
