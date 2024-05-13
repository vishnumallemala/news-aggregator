const express = require("express");
const router = express.Router();
const axios = require("axios");
const verifyToken = require("../middleware/verifyJWT");

router.get("/", verifyToken, (req, res) => {
  let fromDate = new Date().toISOString().substring(0, 11) + "00:00:00.000Z";
  let toDate = new Date();
  let payload = {
    method: "get",
    url: "https://gnews.io/api/v4/top-headlines",
    params: {
      apikey: process.env.NEWS_API_KEY,
      category: req.options.preferences[0],
      from: fromDate,
      to: toDate,
      lang: "en",
      country: "in",
      max: 100,
    },
  };
  axios(payload)
    .then((result) => {
      res.status(200).json({ news: result.data.articles });
    })
    .catch((err) => {
      res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
    });
});

module.exports = router;
