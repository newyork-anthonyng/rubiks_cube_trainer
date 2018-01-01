const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");

const indexRoute = require("./dist/indexRoute").default;

app.use(compression());
app.use(express.static(path.join(__dirname, "dist")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "dist"));

app.use(indexRoute);

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Server listening on ${port}`);
});
