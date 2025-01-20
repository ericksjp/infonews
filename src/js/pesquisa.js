const API_KEY = 'chave_da_api';
const fetchNews = (query) => {
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const newsResults = document.getElementById('newsResults');
            newsResults.innerHTML = '';
            if (data.articles.length === 0) {
                newsResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            } else {
                data.articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Leia mais</a>
                    `;
                    newsResults.appendChild(articleElement);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar notícias:', error);
            const newsResults = document.getElementById('newsResults');
            newsResults.innerHTML = '<p>Ocorreu um erro ao buscar as notícias. Tente novamente mais tarde.</p>';
        });
};

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    fetchNews(query);
});

const initialQuery = localStorage.getItem('searchQuery');
if (initialQuery) {
    fetchNews(initialQuery);
}
