const mongoose = require("mongoose");
const config = require("../config/dev");

const Portfolio = require("./models/portfolio");

exports.connect = () => {
  mongoose.connect(
    config.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );
};
