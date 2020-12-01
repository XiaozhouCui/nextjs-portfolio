const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDb = require("./fakeDb");

mongoose.connect(
  config.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => {
    console.log("Starting populating DB...");
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log("DB has been populated");
  }
);
