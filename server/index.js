const express = require("express");
const path = require("path");
require("dotenv").config();
const { getSubregions, getSubregionsAndSpots } = require("./controllers/api_controller");

let port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());


app.get('/api/subregions_spots', getSubregionsAndSpots);
app.get('/api/subregions', getSubregions);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname,'../client/dist/index.html'));
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});