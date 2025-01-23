import NewsAPI from "newsapi";

class ApiService {
  #categories;
  #newsMap;
  #newsAPI;
  #refreshTime;
  #searchedNewsMap;

  constructor(apiKey, refreshTime = 60 * 2, sortBy = "relevancy") {
    this.apiKey = apiKey;
    this.#newsAPI = new NewsAPI(apiKey);
    this.#categories = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];
    this.#newsMap = new Map();
    this.#searchedNewsMap = new Map();
    this.#refreshTime = refreshTime * 1000;
    this.sortBy = sortBy;
  }

  async getNewsByCategory(category) {
    this.#validateCategory(category);

    let resp = this.#newsMap.get(category);
    if (resp) {
      resp = (await this.#refreshNewsIfNeeded(category)) || resp;
      return resp;
    }

    return await this.#fetchNews(category);
  }

  #validateCategory(category) {
    if (!this.#categories.includes(category)) {
      throw new Error("Invalid category");
    }
  }

  async #fetchNews(category) {
    this.#validateCategory(category);
    const response = await this.#newsAPI.v2.topHeadlines({
      category,
      sortBy: "relevancy",
    });
    this.#newsMap.set(category, { time: Date.now(), news: response.articles });
    return response;
  }

  async #refreshNewsIfNeeded(category) {
    const lastFetchTime = this.#newsMap.get(category).time;
    if (Date.now() - lastFetchTime > this.#refreshTime) {
      return await this.#fetchNews(category);
    }
  }
}

export default ApiService;
