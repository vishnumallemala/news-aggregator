module.exports = {
  /**
   * The function fetches news articles based on user preferences using the News API with error
   * handling.
   * @param userPreferences - User preferences is an array containing categories of news that the user
   * is interested in.
   * @returns The `fetchNews` function returns an array of news articles based on the user's
   * preferences.
   */
  async fetchNews(userPreferences) {
    try {
      const apiKey = process.env.NEWS_API_KEY;
      const articlesPromises = userPreferences.map(async (preference) => {
        const url = `https://newsapi.org/v2/top-headlines?category=${preference}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = response.json();
        return data.articles;
      });
      const articlesArrays = await Promise.all(articlesPromises);
      const articles = articlesArrays.flat();
      return articles;
    } catch (error) {
      console.log('Failed fetching news articles', error);
      throw error;
    }
  },
};
