# 🌐 InfoNews

O **InfoNews** é um site desenvolvido para fornecer notícias de forma dinâmica e acessível. Este projeto foi desenvolvido por:

- **Erick Ribeiro** 📱
- **Tatiany Souza** 🎨
- **Diego Leite** 💻
- **Gustavo Brito** 👨‍💻

## 🛠 Tecnologias Utilizadas

- **HTML**: A linguagem de marcação usada para estruturar o conteúdo da web, como texto, imagens, links e outros elementos. 📝
- **CSS**: A linguagem de estilo utilizada para definir a aparência e o layout da página, como cores, fontes, margens e espaçamentos. 🎨
- **JavaScript**: A linguagem de programação utilizada para tornar a página interativa, permitindo manipulação de elementos, validação de formulários e comunicação com servidores. ⚡
- **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**: Uma extensão para o Visual Studio Code que permite rodar um servidor local e visualizar as alterações em tempo real no navegador. 🚀
- **[NewsAPI](https://newsapi.org/docs)**: Uma API que fornece acesso a notícias de diversas fontes confiáveis ao redor do mundo, permitindo exibir conteúdo atualizado em seu site. 📰
- **[Vite](https://vitejs.dev/)**: Um build tool e servidor de desenvolvimento extremamente rápido que melhora a experiência de desenvolvimento com recarga instantânea. ⚙️

# 🚀 Como Rodar o Projeto - InfoNews

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### 1. Clone o repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/ericksjp/infonews.git
```

### 2. Instale as dependências

Entre no diretório do projeto e instale as dependências com o NPM:

```bash
cd infonews && npm install
```

### 3. Configuração da NewsAPI

Para que o projeto funcione corretamente, você precisará de uma chave da NewsAPI. Obtenha sua chave em <https://newsapi.org>.

Após obter sua chave, insira-a no arquivo src/js/services/newsApiService.js.

### 4. Rodando o projeto em modo de desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando abaixo:

```bash
npm run dev
```

Verifique a saída do terminal e insira a URL gerada pelo Vite no seu navegador.

### 5. (Opcional) Buildar o projeto para produção

Se você deseja gerar uma versão otimizada do projeto para produção, utilize o comando abaixo:

```bash
npm run build
```

Isso criará uma pasta `dist` com todos os arquivos otimizados para deploy.
