# Projeto de Sistema de Gerenciamento Escolar Infantil

## 📑 Sumário

- [Instalação e Execução](#instalacao-e-execucao)
- [Detalhe de acesso](#acesso)
- [Como Criar Elementos](#como-criar-elementos)
  - [🧩 Criar uma Rota](#criar-uma-rota)
  - [📦 Criar um Controller](#criar-um-controller)
  - [⛓️ Criar um Middleware](#criar-um-middleware)



---

## Instalação e Execução <a name="instalacao-e-execucao"></a>
### Siga os passos abaixo para rodar o projeto via Docker:

1. Clonar o repositório:

   ```sh
   git clone https://github.com/RafaelaBiaze/Gerenciamento-Escolar-Infantil
   ```

2. Entrar na pasta do projeto:

   ```sh
   cd Gerenciamento-Escolar-Infantil
   ```

3. Depois de entrar na pasta do projeto, troque de diretório novamente para o APP(Onde a aplicação realmente está):

   ```sh
   cd APP
   ```

4. Criar o arquivo `.env` na raiz do projeto(dentro de APP) copiando o .env.example:

   > No windows:

   ```ini
   copy .env.example .env
   ```

   > No linux

   ```ini
   cp .env.example .env
   ```

5. Abrir o arquivo `.env` recém criado e preencher os campos abaixo:
   > Este é apenas um exemplo para o funcionamento da aplicação, mudar as credenciais abaixo não irá afetar em nada.

    ```sh
   POSTGRES_USER=meu_usuario
   POSTGRES_PASSWORD=minha_senha
   RABBITMQ_USER=meu_usuario
   RABBITMQ_PASSWORD=minha_senha
   JWT_SECRET=super_secreta
   ```

6. Instalar as dependências:

   ```sh
   npm install
   ```


7. Subir a aplicação com Docker Compose:

   ```sh
   docker-compose up --build
   ```

   > Usuários com **Docker moderno** devem usar:

   ```sh
   docker compose up --build
   ```

8. Executar as migrations utilizando UM desses comandos:

   > Container (Docker Compose tradicional):

   ```sh
   docker-compose run --rm nodecli-container migrate
   ```

   > Container (Docker Compose moderno):

   ```sh
   docker compose run --rm nodecli-container migrate
   ```

   > Host:

   ```sh
   node command migrate
   ```

9. Executar as seeds utilizando UM desses comandos:

   > Container (Docker Compose tradicional):

   ```sh
   docker-compose run --rm nodecli-container seed
   ```

   > Container (Docker Compose moderno):

   ```sh
   docker compose run --rm nodecli-container seed
   ```

   > Host:

   ```sh
   node command seed
   ```

---

## Detalhe de acesso <a name="acesso"></a>

O servidor estará disponível em: [http://localhost:8080](http://localhost:8080)

Documentação api: [http://localhost:8080/docs](http://localhost:8080/docs)

Observação: ./Insomnia.yml deve-se utilizar no Insomnia

> Pasta `Docs` fora da aplicação, é somente para arquivos de documentação do banco de dados, como MER e DER.

---

## Como Criar Elementos <a name="como-criar-elementos"></a>

### Criar uma Rota <a name="criar-uma-rota"></a>

1. Defina o path da rota em `routes/web.js` ou `routes/api.js`
2. Associe um controller da `app/Http/Controllers/`

Exemplo (`routes/api.js`):
```js
router.get('/exemplo', MeuController);
```

### Criar um Controller <a name="criar-um-controller"></a>

1. Crie um novo arquivo em `app/Http/Controllers/...`

```js
export default async function(request, response) {
  ...
  # Minha Lógica
  ...
  response.status(200).json({"success": "Minha resposta"});
}
```

### ⛓️ Criar um Middleware <a name="criar-um-middleware"></a>

Adicione em `app/Http/Middlewares/`, por exemplo:

```js
export default async function (request, response, next) {
  console.log(`[${request.method}] ${request.url}`);
  next();
}
```