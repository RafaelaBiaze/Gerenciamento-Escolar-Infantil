import FirstJob from "../Jobs/FirstJob.js"

export default {

    name: 'dispatch',

    description: 'dispatch first-job',

    handle: async function () {
        await FirstJob.dispatch({ "oi": true });
    }
}