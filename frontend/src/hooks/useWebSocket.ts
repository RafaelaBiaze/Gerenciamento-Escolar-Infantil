import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// MUDANÇA AQUI: Aponta para o Nginx (8080) em vez do Node direto (3000)
const SOCKET_URL = 'http://localhost:8080';

export const useWebSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [lastMessage, setLastMessage] = useState<string>('');

    useEffect(() => {
        // MUDANÇA AQUI: Adicionado { transports: ['websocket'] }
        // Isso força o uso imediato de WebSocket, evitando falhas de "polling"
        const newSocket = io(SOCKET_URL, {
            transports: ['websocket']
        });

        newSocket.on('connect', () => {
            console.log('[Frontend] Conectado ao WebSocket via Nginx!');
        });

        newSocket.on('connect_error', (err) => {
            console.error('[Frontend] Erro de conexão WebSocket:', err);
        });

        // Escuta eventos vindos do servidor (ex: aviso de novo usuário)
        newSocket.on('atualizacao', (data: any) => {
            console.log('Mensagem recebida:', data);
            setLastMessage(JSON.stringify(data));
            // alert('Nova atualização: ' + JSON.stringify(data)); // Descomente se quiser o alerta
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = (event: string, data: any) => {
        if (socket) {
            socket.emit(event, data);
        }
    };

    return { socket, lastMessage, sendMessage };
};