document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  localStorage.setItem('searchQuery', query);
  window.location.href = 'pesquisa.html';
});
