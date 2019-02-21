self.addEventListener('message',perfomCalculation);
function perfomCalculation(e){
    const iterations = e.data.iterations;
    const resultsEvery = e.data.resultsEvery;

    var generatePoint = function () {
        var r = 16;
        var x = Math.random() * r * 2 - r;
        var y = Math.random() * r * 2 - r;
        return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
    };

    var computePi = function () {
        var inCircle = 0;
        var i;
        for (i = 0; i < iterations; i++) {
            if(i===0) continue;
            if(i%resultsEvery === 0){
                if (generatePoint()) {
                    //return inCircle / ITERATIONS * 4;
                    console.log({iteration:i,generatePoint:generatePoint()})
                    //self.postMessage({data: data});
                    inCircle++;
            }
            }
        }
    };

    computePi();
}