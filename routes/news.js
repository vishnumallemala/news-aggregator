const express = require('express');
const axios = require('axios');
const verifyToken = require("../middlewares/authToken");
const {newsArticlesPromise} = require("../helpers/newsArticles");
const users = require("../user.json");
const news = express.Router();
const path = require("path");
const fs = require("fs");
require('dotenv').config()

//NEWS API KEY
const newsApiKey = process.env.NEWS_API_KEY;

// API to get news based on user's preferences
news.get('/', verifyToken, async (req, res) => {
  try {
    if(req.user){
        const user = users.users.find((user) => user.username === req.user.username);
        const preferences = user.newsPreferences.join('&category=');
        const newsApiUrl = `https://newsapi.org/v2/top-headlines?category=${preferences}&country=in&apiKey=${newsApiKey}`;
        console.log(newsApiUrl);
        const response = await newsArticlesPromise(newsApiUrl);
        res.status(200).json(response);
    }else{
        res.status(req.statusCode).send(req.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = news;