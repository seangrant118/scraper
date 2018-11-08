// import dependencies 

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");

// require models

const db = require("./models");

// PORT

const PORT = process.env.PORT || 3000;

// Express 

const app = express();

// Middleware

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes

const routes = require("./controllers/controller")

app.use(routes);

// 

