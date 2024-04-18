const express = require("express");
const dotenv = require("dotenv");

// Configuration the .env file

dotenv.config();

//Create Express APP

const app = express();

const port = process.env.PORT || 8000;
// Define the first Route of APP

app.get("/", (req, res) => {
  // send hello world
  res.send("APP Express + TS");
});
