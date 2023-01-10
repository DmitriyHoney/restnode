const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const tutorials = require("./tutorial.model")(mongoose);

module.exports = {
    mongoose,
    url: dbConfig.url,
    tutorials,
};
