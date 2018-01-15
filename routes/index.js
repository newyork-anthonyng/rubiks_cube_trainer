import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/App";
import getRandomSolve from "rubiks-cross-trainer";

// Get JS bundle filenames created by webpack
const bundleData = fs.readFileSync(path.join("dist", "files.json"), "utf8");
const bundleDataJson = JSON.parse(bundleData);
const jsFilePaths = bundleDataJson.js;

function writeHeader(res) {
  res.write(`
    <!doctype html>
    <html>
      <head>
        <title>Rubiks Cube Trainer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${jsFilePaths.map(
          js => `<link rel="preload" href="${js}" as="script">`
        )}
      </head>
      <body>
  `);
}

function createBodyContent({ initialScramble }) {
  return `</div>
        <script type="text/javascript">
          window.__INITIAL_SCRAMBLE__ = "${initialScramble}";
        </script>
        <script type="text/javascript">
          console.log("GitHub: https://github.com/newyork-anthonyng/rubiks_cube_trainer");
        </script>
        ${jsFilePaths.map(
          js => `<script type="text/javascript" src="${js}"></script>`
        )}
      </body>
    </html>
  `;
}

function writeBody(req, res) {
  res.write(`<div id="app">`);

  const initialScramble = getRandomSolve(1);
  const stream = ReactDOMServer.renderToNodeStream(
    <StaticRouter location={req.url} context={{}}>
      <App initialScramble={initialScramble} />
    </StaticRouter>
  );
  stream.pipe(res, { end: false });

  stream.on("error", err => {
    console.error("Error in renderToNodeStream");
    console.error(err);
    res.end();
  });

  stream.on("end", () => {
    res.write(createBodyContent({ initialScramble }));

    res.end();
  });
}

function handleServerSideRendering(req, res) {
  writeHeader(res);

  writeBody(req, res);
}

router.get("*", handleServerSideRendering);

export default router;
