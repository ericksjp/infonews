const apiKey = "23df153f2c7b4529bc4cd27f5d701952";
const urlBase = "https://newsapi.org/v2/";

export const getRelatedNews = async (name, pageSize = 1) => {
  if (!name) {
    return [];
  }
  const urlSearch = `${urlBase}everything?q=${name}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const response = await fetch(urlSearch);
  const data = await response.json();
  console.log(data);
  return data.articles;
};
