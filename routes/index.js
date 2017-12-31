import express from "express";
const router = express.Router();

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/App";
import getRandomSolve from "rubiks-cross-trainer";

function handleServerSideRendering(req, res) {
  const initialScramble = getRandomSolve(1);
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App initialScramble={initialScramble} />
    </StaticRouter>
  );

  res.render("index", {
    markup,
    initialScramble
  });
}

router.get("*", handleServerSideRendering);

export default router;
