const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const userController = require("./controllers/user-controller");
const newsController = require("./controllers/news-controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userController);
app.use("/news", newsController);

try {
  const DB_NAME = process.env.DB_NAME || "news-aggregator";
  const DB_HOST = process.env.DB_HOST || "localhost";
  const DB_PORT = process.env.DB_PORT || "27017";
  if (DB_HOST !== "localhost") {
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    DB_URL =
      "mongodb+srv://" +
      DB_USER +
      ":" +
      DB_PASS +
      "@" +
      DB_HOST +
      "/" +
      DB_NAME;
  } else {
    DB_URL = "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
  }
  mongoose.connect(DB_URL);
} catch (err) {
  console.log(err);
  console.log("Failed while connecting to mongodb");
}

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
