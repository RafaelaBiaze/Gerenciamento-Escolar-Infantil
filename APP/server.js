import express from 'express';
import chalk from 'chalk';
import http from 'http';            // Necessário para unir Express + Socket
import { Server } from 'socket.io'; // Biblioteca do WebSocket
import cors from 'cors';       
import path from 'path';     // Libera o acesso do Vite

import "./bootstrap/app.js"
import routes from "./routes/routes.js";
import initRelations from "./config/sequelize_relations.js";
import UserModel from './app/Models/UserModel.js';
import ProfessorModel from './app/Models/ProfessorModel.js';

const app = express();

// 1. Configuração do CORS (Vital para o Vite funcionar)
app.use(cors({
    origin: '*', // Aceita tudo (ideal para prova)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROTA EJS (SSR)
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'resources', 'views'));
app.get('/sobre', async (req, res) => {
    try {
        // 2. Contar as duas tabelas
        const totalUsers = await UserModel.count();
        const totalProfessores = await ProfessorModel.count();
        const dataAtual = new Date().toLocaleString('pt-BR');
        
        // 3. Enviar as duas variáveis para a view
        res.render('sobre', { 
            totalUsers, 
            totalProfessores, 
            dataAtual 
        });
    } catch (error) {
        console.error(error);
        res.send("Erro ao carregar dados do servidor.");
    }
});

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
