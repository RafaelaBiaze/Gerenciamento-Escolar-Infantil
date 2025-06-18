import minimist from "minimist";

/** Obter a fila e a concorrencia que o worker irá se conectar 
 * 1. Irá priorizar o parametro de terminal --queue
 * 2. Irá buscar a variável de ambiente RABBITMQ_QUEUE
 * 3. Irá conectar na fila default
 */
export default () => {

    /**
     * Utiliza o minimist para transformar em objeto os parametro --[nome]=[valor]
     */
    const [, , ...rawArgs] = process.argv;
    const args = minimist(rawArgs);
    delete args["_"];

    const queue = (args["queue"]) ? (args["queue"]) : (process.env.RABBITMQ_QUEUE || "default");

    const concurrency = (args["concurrency"]) ? (args["concurrency"]) : (process.env.RABBITMQ_CONCURRENCY || 1);

    return {
        queue: queue,
        concurrency: parseInt(concurrency)
    }
}