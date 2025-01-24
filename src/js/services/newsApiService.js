class ApiService {
  #categories;
  #newsMap;
  #queryMap;
  #refreshTime;
  #baseUrl;

  constructor(apiKey, refreshTime = 60 * 2, sortBy = "relevancy") {
    this.apiKey = apiKey;
    this.#baseUrl = "https://newsapi.org/v2/";
    this.#categories = [
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ];
    this.sortByOptions = ["relevancy", "popularity", "publishedAt"];
    this.#newsMap = new Map();
    this.#queryMap = new Map();
    this.#refreshTime = refreshTime * 1000;
    this.sortBy = sortBy;

    this.#loadFromStorage();
  }

  getRefreshTime() {
    return this.#refreshTime;
  }

  setRefreshTime(seconds) {
    if (typeof seconds !== "number" || seconds <= 0) {
      throw new Error("Refresh time must be a positive number.");
    }
    seconds = Math.round(seconds);
    this.#refreshTime = seconds * 1000;
  }

  async getNewsByCategory(category, sortBy = "relevancy") {
    this.#validateCategory(category);
    this.#validateSortBy(sortBy);
    return (await this.#fetchData("category", { category, sortBy })).news;
  }

  async queryNews(query) {
    this.#validateQuery(query);
    const trimmedQuery = query.trim().toLowerCase();
    return (await this.#fetchData("query", { query: trimmedQuery })).news;
  }

  getQueryNewsFromCache(query) {
    const trimmedQuery = query.trim().toLowerCase();
    return this.#getCachedData(this.#queryMap, trimmedQuery);
  }

  isQueryCachedAndValid(query) {
    const trimmedQuery = query.trim().toLowerCase();
    return this.#isCachedValid(this.#queryMap.get(trimmedQuery)?.time);
  }

  getNewsByCategoryFromCache(category) {
    this.#validateCategory(category);
    return this.#getCachedData(this.#newsMap, category);
  }

  isCachedAndValid(category) {
    return this.#isCachedValid(this.#newsMap.get(category)?.time);
  }

  #isCachedValid(cacheTime) {
    return Date.now() - cacheTime <= this.#refreshTime;
  }

  #validateCategory(category) {
    if (!this.#categories.includes(category)) {
      throw new Error("Invalid category");
    }
  }

  #validateSortBy(sortBy) {
    if (!this.sortByOptions.includes(sortBy)) {
      throw new Error("Invalid sortBy option");
    }
  }

  #validateQuery(query) {
    if (typeof query !== "string" || query.trim() === "") {
      throw new Error("Query must be a non-empty string.");
    }
  }

  async #fetchData(type, params) {
    const { category, sortBy, query } = params;
    const cacheMap = type === "category" ? this.#newsMap : this.#queryMap;
    const cacheKey = type === "category" ? category : query;
    const endpoint =
      type === "category"
        ? `top-headlines?category=${category}&sortBy=${sortBy}`
        : `everything?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(
        `${this.#baseUrl}${endpoint}&apiKey=${this.apiKey}`,
      );
      if (!response.ok)
        throw new Error(`Failed to fetch news: ${response.status}`);

      const data = await response.json();
      if (!data.articles) throw new Error("Invalid response data");

      if (type === "query" && this.#queryMap.size >= 5) {
        const lastKey = Array.from(this.#queryMap.keys()).pop();
        this.#queryMap.delete(lastKey);
      }

      const object = { time: Date.now(), news: data.articles };

      // Update cache and save to storage
      cacheMap.set(cacheKey, object);
      this.#saveToStorage();
      return object;
    } catch (err) {
      console.error(`Error fetching news for ${type} '${cacheKey}':`, err);

      const cachedData = cacheMap.get(cacheKey);
      if (cachedData) {
        console.warn(`Returning cached ${type} news due to fetch error.`);
        return cachedData;
      }

      return { time: Date.now(), news: [] };
    }
  }

  #getCachedData(cacheMap, key) {
    const cachedData = cacheMap.get(key);
    return this.#isCachedValid(cachedData?.time) ? cachedData.news : undefined;
  }

  #saveToStorage() {
    try {
      const data = {
        newsMap: Array.from(this.#newsMap.entries()),
        queryMap: Array.from(this.#queryMap.entries()),
        refreshTime: this.#refreshTime,
      };
      localStorage.setItem("apiService", JSON.stringify(data));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }

  #loadFromStorage() {
    try {
      const storedData = localStorage.getItem("apiService");
      if (storedData) {
        const { newsMap, queryMap, refreshTime } = JSON.parse(storedData);
        this.#newsMap = new Map(newsMap);
        this.#queryMap = new Map(queryMap);
        this.#refreshTime = refreshTime;
      }
    } catch (err) {
      console.error("Error loading from localStorage:", err);
    }
  }
}

const apiService = new ApiService(
  "", // insira sua chave de api
  300,
  "publishedAt",
);

export default apiService;
