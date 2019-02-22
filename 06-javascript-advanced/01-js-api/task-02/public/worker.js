self.addEventListener('message', perfomCalculation);

function perfomCalculation(e) {

    const iterations = parseInt(e.data.iterations);
    const resultsEvery = parseInt(e.data.resultsEvery);
    const PI = Math.PI;

    const generatePoint = () => {
        const r = 16;
        const x = Math.random() * r * 2 - r;
        const y = Math.random() * r * 2 - r;

        return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
    };

    const computePi = () => {
        let inCircle = 0;
        let i;

        for (i = 0; i <= iterations; i++) {
            if (i === 0) continue;
            if (generatePoint()) {
                inCircle++;
            }
            if (i % resultsEvery === 0) {
                const result = inCircle / i * 4;
                const delta = PI - result;

                if (i === iterations) {
                    self.postMessage([{iteration: i, computed: result, delta: delta, finished: true}]);
                } else {
                    self.postMessage([{iteration: i, computed: result, delta: delta}]);
                }
            }
        }
    };
    computePi();
}
