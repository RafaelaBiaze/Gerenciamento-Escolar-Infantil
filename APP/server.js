import express from 'express';
import chalk from 'chalk';
import http from 'http';            // Necessário para unir Express + Socket
import { Server } from 'socket.io'; // Biblioteca do WebSocket
import cors from 'cors';            // Libera o acesso do Vite

import "./bootstrap/app.js"
import routes from "./routes/routes.js";
import initRelations from "./config/sequelize_relations.js";

const app = express();

// 1. Configuração do CORS (Vital para o Vite funcionar)
app.use(cors({
    origin: '*', // Aceita tudo (ideal para prova)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Configura Rotas
app.use("/", routes);

// Inicializa Banco
initRelations();

// 3. Criação do Servidor HTTP + WebSocket
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Libera WebSocket para o Vite
        methods: ["GET", "POST"]
    }
});

// Evento de teste para ver se conectou
io.on('connection', (socket) => {
    console.log(chalk.blue(`[WebSocket] Cliente conectado: ${socket.id}`));
    
    socket.on('disconnect', () => {
        console.log('[WebSocket] Cliente desconectado');
    });
});

// Gambiarra útil: Deixa o IO global para usar nos Controllers
globalThis.io = io;

const nodePort = 3000;
const webPort = 8080;

// MUDANÇA FINAL: Usar server.listen em vez de app.listen
server.listen(nodePort, () => {
    console.log(chalk.green(`Servidor rodando internamente na porta: ${nodePort}`));
    console.log(chalk.yellow(`Acesse externamente via Nginx: http://localhost:${webPort}`));
});