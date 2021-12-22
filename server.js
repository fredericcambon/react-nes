const express = require("express");
const path = require("path");
const app = express();
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

const port = process.env.PORT || 8080;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/data", express.static(path.join(__dirname, "data")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "build")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Starting server on port ${port} using env ${process.env.NODE_ENV}`));
