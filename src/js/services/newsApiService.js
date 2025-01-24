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
      "health",
      "science",
      "sports",
      "technology",
    ];
    this.sortByOptions = ["relevancy", "popularity", "publishedAt"];
    this.#newsMap = new Map();
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
    console.log("here")
    const data = await this.#fetchNews(category, sortBy);
    return data.news;
  }

  getNewsByCategoryFromCache(category) {
    this.#validateCategory(category);
    const cachedData = this.#newsMap.get(category);
    if (cachedData) {
      return this.#isCachedValid(cachedData.time) ? cachedData.news : undefined;
    }
  }

  isCachedAndValid(category) {
    const cachedData = this.#newsMap.get(category);
    if (cachedData) {
      return this.#isCachedValid(cachedData.time);
    }
    return false;
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

  // busca as noticias da API, se ocorrer algum erro na operação, retorna as noticias do cache
  async #fetchNews(category, sortBy) {
    try {
      const response = await fetch(`${this.#baseUrl}/top-headlines?category=${category}&sortBy=${sortBy}&apiKey=${this.apiKey}`);

      // se a resposta nao for ok, lanca um erro
      if (!response.ok) throw new Error(`Failed to fetch news: ${response.status}`);

      const data = await response.json();
      console.log(data)

      // se a resposta nao tiver a propriedade articles, lanca um erro
      if (!data.articles) throw new Error("Invalid response data");

      const object = {time: Date.now(), news: data.articles};

      // atualiza o cache e o salva no localStorage
      this.#newsMap.set(category, object);
      this.#saveToStorage();

      // para evitar uma consulta x2 no map, retorna o objeto
      return object;
    } catch (err) {
      console.error(`Error fetching news for category '${category}':`, err);

      // se houver dados no cache, retorna esses dados, caso contrario, retorna um objeto com um array vazio como noticias
      const cachedData = this.#newsMap.get(category);
      if (cachedData) {
        console.warn("Returning cached news due to fetch error.");
        return cachedData;
      }

      return { time: Date.now(), news: [] };
    }
  }

  // salva os dados no localStorage
  #saveToStorage() {
    try {
      const data = {
        newsMap: Array.from(this.#newsMap.entries()),
        refreshTime: this.#refreshTime,
      };
      localStorage.setItem("apiService", JSON.stringify(data));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }

  // recupera os dados do localStorage
  #loadFromStorage() {
    try {
      const storedData = localStorage.getItem("apiService");
      if (storedData) {
        const { newsMap, refreshTime } = JSON.parse(storedData);
        this.#newsMap = new Map(newsMap);
        this.#refreshTime = refreshTime;
      }
    } catch (err) {
      console.error("Error loading from localStorage:", err);
    }
  }
}

const apiService = new ApiService(
  "23df153f2c7b4529bc4cd27f5d701952", // triste, porem necessario :(
  300,
  "publishedAt"
);

export default apiService;
