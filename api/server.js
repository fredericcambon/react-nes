const express = require("express");
const path = require("path");
const app = express();
const dotenv = require('dotenv');
const port = 3001;

// dotenv.config({
//   path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port, () => console.log(`Starting server on port ${port} using env ${process.env.NODE_ENV}`));
