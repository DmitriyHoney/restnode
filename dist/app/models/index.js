"use strict";
const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const tutorials = require("./tutorial.model")(mongoose);
const db = {
    mongoose,
    url: dbConfig.url,
    tutorials,
};
module.exports = db;
