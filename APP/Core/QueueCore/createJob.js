import { quickConnect } from '../../config/rabbit.js';

/**
 * Componente que irá criar o job
 * Utilizado em ./app/Jobs
 * grava as infos do job e a função dispatch!
 */
export default function createJob(job) {
    if (typeof job !== 'object' && typeof job.name !== "string" || typeof job.handle !== "function") {
        throw new Error('Você precisa passar uma função válida');
    }

    const dispatch = async (payload, queue = "default") => {

        /*
        Abre uma conexão temporária
        */
        const { channel, connection } = await quickConnect();

        const jobName = job.name;

        /** 
         * Envia a info/mensagem necessária pro banco de dados de fila
         * O worker então saberá o que executar (payload) e como executar (job)
         */
        const message = {
            job: jobName,
            payload,
        };

        /** 
         * Abre um canal com a fila escolhida
         * e logo em seguida manda a mensagem em binŕio
         */
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

        console.log(`[Job] Enviado para fila "${queue}": ${jobName}`);

        /** Fecha a conexão temporária */
        await channel.close();
        await connection.close();
    };

    return {
        dispatch: dispatch,
        ...job
    };
}
