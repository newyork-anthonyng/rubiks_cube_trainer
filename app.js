const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
