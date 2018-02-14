import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/App";
import getRandomSolve from "rubiks-cross-trainer";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import stats from "../dist/react-loadable.json";

// Get JS bundle filenames created by webpack
const bundleData = fs.readFileSync(path.join("dist", "files.json"), "utf8");
const bundleDataJson = JSON.parse(bundleData);
const jsFilePaths = bundleDataJson.js;

function constructScriptTags(bundles) {
  let manifestFile;
  const scriptTags = [];

  jsFilePaths.forEach(js => {
    if (js.indexOf("manifest") !== -1) {
      manifestFile = constructScriptTag(js);
    } else {
      scriptTags.push(constructScriptTag(js));
    }
  });

  return `
    ${manifestFile}
    ${bundles.map(bundle => constructScriptTag(bundle.file)).join("")}
    ${scriptTags.join("")}
  `;
}

function constructScriptTag(path) {
  return `<script type="text/javascript" src="${path}"></script>`;
}

function constructHtmlResponse({
  html,
  reactLoadableBundles,
  initialScramble
}) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Rubiks Cube Trainer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${jsFilePaths
          .map(js => `<link rel="preload" href="${js}" as="script">`)
          .join("")}
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="text/javascript">
          window.__INITIAL_SCRAMBLE__ = "${initialScramble}";
        </script>
        <script type="text/javascript">
          console.log("GitHub: https://github.com/newyork-anthonyng/rubiks_cube_trainer");
        </script>
        ${constructScriptTags(reactLoadableBundles)}
      </body>
    </html>
  `;
}

function handleServerSideRendering(req, res) {
  const initialScramble = getRandomSolve(1);
  const modules = [];

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <Loadable.Capture
        report={moduleName => {
          modules.push(moduleName);
        }}
      >
        <App initialScramble={initialScramble} />
      </Loadable.Capture>
    </StaticRouter>
  );

  res.send(
    constructHtmlResponse({
      html,
      initialScramble,
      reactLoadableBundles: getBundles(stats, modules)
    })
  );
}

router.get("*", handleServerSideRendering);

export default router;
