const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use("/data", express.static(path.join(__dirname, "data")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(8080, () => console.log("Listening on port 8080"));
