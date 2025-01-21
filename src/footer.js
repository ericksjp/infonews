// Selecionar o botão
const backToTopButton = document.getElementById('back-to-top');

// Adicionar o clique
backToTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,        
    behavior: 'smooth' 
  });
});
