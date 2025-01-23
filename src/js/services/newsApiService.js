import { simulateRequest } from "../util/mockData";

class ApiService {
  #categories;
  #newsMap;
  #refreshTime;
  #baseUrl;

  constructor(apiKey, refreshTime = 60 * 2, sortBy = "relevancy") {
    this.apiKey = apiKey;
    this.#baseUrl = "https://newsapi.org/v2/";
    this.#categories = [
      "general",
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ];
    this.#newsMap = new Map();
    this.#refreshTime = refreshTime * 1000;
    this.sortBy = sortBy;

    this.#loadFromStorage();
  }

  getRefreshTime() {
    return this.#refreshTime;
  }

  setRefreshTime(seconds) {
    if (typeof seconds !== "number" || seconds <= 0)
      throw new Error("Refresh time must be a positive number.");
    seconds = Math.round(seconds);
    this.#refreshTime = seconds * 1000;
  }

  async getNewsByCategory(category) {
    this.#validateCategory(category);
    const cached = this.#newsMap.get(category);
    if (cached && Date.now() - cached.time <= this.#refreshTime) {
      return cached.news;
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

    const response = await fetch(
      `${this.#baseUrl}/top-headlines?category=${category}&apiKey=${this.apiKey}`,
    );
    let data;
    if (response.status !== 200) {
      console.error("erro na api");
      return [];
    } else {
      data = await response.json();
    }
    this.#newsMap.set(category, { time: Date.now(), news: data.articles });
    this.#saveToStorage();
    return data.articles;
  }

  #saveToStorage() {
    const data = {
      newsMap: Array.from(this.#newsMap.entries()),
      refreshTime: this.#refreshTime,
    };
    localStorage.setItem("apiService", JSON.stringify(data));
  }

  #loadFromStorage() {
    const storedData = localStorage.getItem("apiService");
    if (storedData) {
      const { newsMap, refreshTime } = JSON.parse(storedData);
      this.#newsMap = new Map(newsMap);
      this.#refreshTime = refreshTime;
    }
  }
}

const apiService = new ApiService(
  "f9af5ef8f3ee49c5bd31b9d48e42c44e", // triste, porem necessario :(
  120,
  "publishedAt",
);

export default apiService;
