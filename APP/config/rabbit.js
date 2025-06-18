import amqplib from 'amqplib';
import dotenv from 'dotenv';
import net from 'net';
import { URL } from 'url';

dotenv.config();

let sharedChannel = null;

const {
    RABBITMQ_USER,
    RABBITMQ_PASSWORD,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
} = process.env;

const login = `${RABBITMQ_USER}:${RABBITMQ_PASSWORD}`;
const AMQP_URL = `amqp://${login}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

// Utilizado apenas pelo WORKER
async function waitForRabbit(url, timeoutMs = 15000) {
    const { hostname: host, port } = new URL(url);
    const portNum = parseInt(port, 10);
    const start = Date.now();

    return new Promise((resolve, reject) => {
        const tryConnect = () => {
            const socket = net.createConnection({ host, port: portNum });
            let done = false;

            socket
                .once('connect', () => {
                    if (!done) {
                        done = true;
                        socket.destroy();
                        resolve();
                    }
                })
                .once('error', () => {
                    socket.destroy();
                    if (Date.now() - start > timeoutMs) {
                        if (!done) {
                            done = true;
                            reject(new Error(`Timeout esperando RabbitMQ em ${host}:${portNum}`));
                        }
                    } else {
                        setTimeout(tryConnect, 1000);
                    }
                });
        };

        tryConnect();
    });
}

// Para WORKERS (espera Rabbit)
export async function getConnection() {
    if (sharedChannel) return sharedChannel;

    console.log(`[RabbitMQ] Conexão: amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}...`);
    await waitForRabbit(AMQP_URL);

    const connection = await amqplib.connect(AMQP_URL);

    const channel = await connection.createChannel();
    sharedChannel = channel;
    return channel;
}

// Para PRODUCERS (rápido e pontual)
export async function quickConnect() {
    const connection = await amqplib.connect(AMQP_URL);
    const channel = await connection.createChannel();
    return { connection, channel };
}
