# Usa imagem oficial do Node 24
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar dependências
COPY package*.json ./
COPY command ./
COPY app/Commands/ ./app/Commands/      

# Instala dependências (e opcionalmente o minimist ou chalk se usados)
RUN npm install

# Dá permissão de execução para o script CLI (caso necessário)
RUN chmod +x ./command

# Define o entrypoint como o script de comandos (sem extensão)
ENTRYPOINT ["node", "./command"]
