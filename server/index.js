const express = require("express");
const path = require("path");
const axios = require('axios');
require("dotenv").config();

let port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});