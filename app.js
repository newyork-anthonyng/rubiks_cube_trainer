const express = require("express");
const app = express();
const path = require("path");

const indexRoute = require("./dist/indexRoute").default;

app.use(express.static(path.join(__dirname, "dist")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "dist"));

app.use(indexRoute);

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
