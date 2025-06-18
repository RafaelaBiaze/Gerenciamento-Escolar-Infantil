
import { getConnection } from '../../config/rabbit.js';
import registerJobs from './registerJobs.js';

/**
 * Lófica de criação do entrypoint worker
 * Registro e event loop
 * Podemos escolher o diretório de registro dos Jobs e a fila de conexão do worker/consumer
 */
export default async function createWorker(dir) {

    /** Registro dos jobs */
    const jobMap = await registerJobs(dir);

    async function listen(queue = "default", concurrency = 1) {

        /**
         * Abrir conexão com o banco de dados de fila intermitente
         */
        const channel = await getConnection();

        /**
         * Parte da conexão onde o worker escolhe qual fila irá ouvir
         */
        await channel.assertQueue(queue, { durable: true });

        // 👇 Isso aqui é o que faz o worker pegar só 1 por vez
        await channel.prefetch(concurrency);

        /** 
         * Inicialização do event loop
         */
        channel.consume(queue, async (msg) => {
            if (!msg) {
                return;
            }

            const start = Date.now();

            try {

                /**
                 * Desestrutura a info enviada pelo producer, que possui o job e o paylod
                 */
                const { job, payload } = JSON.parse(msg.content.toString());

                /** Encontra o job no registro de jobs
                 * Se encontrar, seu valor será a função handle que será executada
                 * Se nao, erro
                 */
                const jobHandle = jobMap[job];

                if (!jobHandle) {
                    throw new Error(`Job "${job}" não registrado`);
                }

                console.log(`[${getTime()}] Executando ${job} da fila "${queue}"`);

                /** Execução da funcão handle do job */
                await jobHandle(payload);

                /** Calcula o tempo de execução da fila */
                const duration = ((Date.now() - start) / 1000).toFixed(3);

                console.log(`[${getTime()}] Executado ${job} da fila "${queue}" (Finalizado em ${duration}s)`);

                /** Remover o job da fila */
                channel.ack(msg);

            } catch (err) {

                console.error(`[${getTime()}] Erro ao processar job:`, err);

                /** Retornar o job da fila */
                channel.nack(msg, false, false);

            }
        });

        console.log(`[WORKER] Fila: "${queue}"`);
        console.log(`[WORKER] Concorrência: ${concurrency}`);

    }

    return { listen };
}
