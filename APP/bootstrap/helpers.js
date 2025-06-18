export default {
    timerBySecond: (seconds) => {
        const STEP = 100;

        const miliseconds = seconds * 1000;

        return new Promise((resolve) => {
            let time = 0;

            const tick = () => {

                if ((time + STEP) <= miliseconds) {
                    time += STEP;
                    (time % 1000 === 0) && console.log(`${time / 1000} seconds passed`);
                    setTimeout(tick, STEP);
                } else {
                    console.log(`Finished in ${time / 1000} seconds!`);
                    resolve();
                }
            };

            tick();
        });
    },
    getTime: () => {
        return new Date().toLocaleTimeString('pt-BR', { hour12: false })
    }
};