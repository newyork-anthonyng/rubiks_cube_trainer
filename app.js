const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "dist"));

app.use("/", (req, res) => {
  res.render("index", {
    markdown: "<h1>Hi</h1>"
  });
});

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
