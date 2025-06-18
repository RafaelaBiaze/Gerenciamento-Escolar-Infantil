export default {

    name: 'timer',
    description: 'print every onde second (--seconds=<seconds>)',
    arguments: {
        seconds: "number",
    },

    handle: async function ({ seconds }) {
        await timerBySecond(seconds);
    }
}