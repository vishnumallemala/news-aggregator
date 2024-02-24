const news = require('express').Router();
const validateToken = require('../middlewares/authMiddleware');
const newsService = require('../services/news');

news.get('/', validateToken, async (req, res) => {
  const userPreferences = req.user.preferences;
  const news = await newsService.fetchNews(userPreferences);
  if (news && news.length) {
    res.status(200).send({
      status: true,
      message: 'News has been fetched successfully',
      news,
    });
  }
});
module.exports = news;
