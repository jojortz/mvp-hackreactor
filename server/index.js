const express = require("express");
const path = require("path");
require("dotenv").config();
const { getSpots, getSubregions } = require("./controllers/api_controller");

let port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

app.get('/subregions', getSubregions);
app.get('/spots', getSpots);

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});