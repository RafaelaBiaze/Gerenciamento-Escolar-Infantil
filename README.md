# Projeto de Sistema de Gerenciamento Escolar Infantil
Este projeto consiste no desenvolvimento de um sistema de gerenciamento completo para a Escola Infantil UniFAAT-ADS. O objetivo principal é automatizar e otimizar o controle de pagamentos, presenças e atividades dos alunos, substituindo o método manual atual baseado em cadernos.

---

## Principais Funcionalidades
* Módulo de Pagamentos: Permite o registro, acompanhamento e geração de relatórios de mensalidades e outras taxas escolares.
* Módulo de Presenças: Facilita o registro e acompanhamento da frequência dos alunos, com possibilidade de geração de relatórios.
* Módulo de Atividades: Permite o cadastro, organização e visualização das atividades pedagógicas realizadas com os alunos.
* Autenticação Segura: Sistema de login e senha com tokens JWT e senhas criptografadas para garantir a segurança dos dados.
* API Documentada: A API do sistema é documentada com Swagger, facilitando o teste e a integração.

---

## Principais tecnologias utilizadas
> O projeto é construído com as seguintes tecnologias:
* **Backend:** Node.js, Express.js
* **Banco de Dados:** PostgreSQL com Sequelize ORM
* **Autenticação:** JSON Web Tokens (jsonwebtoken) e bcrypt
* **Documentação da API:** swagger-jsdoc e swagger-ui-express
* **Linguagem:** Javascript

---

## Instalação e Execução
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
    JWT_SECRET=super_secreta
    ```

6. Subir a aplicação com Docker Compose:

   ```sh
   docker-compose up --build
   ```

   > Usuários com **Docker moderno** devem usar:

   ```sh
   docker compose up --build
   ```

---

## Detalhes

O servidor estará disponível em: [http://localhost:8080](http://localhost:8080)

Documentação api: [http://localhost:8080/docs](http://localhost:8080/docs)

Observação: ./Insomnia.yml deve-se utilizar no Insomnia

> Pasta `Docs` fora da aplicação, é somente para arquivos de documentação do banco de dados, como MER e DER.