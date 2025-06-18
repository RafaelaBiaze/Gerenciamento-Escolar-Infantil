import createJob from '../../Core/QueueCore/createJob.js';

export default createJob({
    name: "FirstJob",
    handle: async (payload) => {
        console.log('Payload recebido:', payload);
        await timerBySecond(10);
    }
});