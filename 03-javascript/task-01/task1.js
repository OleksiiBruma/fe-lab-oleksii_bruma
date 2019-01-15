function createCounter(startCount = 0, incrementor = 1){
    let initialCount = startCount - incrementor;
    const counter= ()=> {
        try{
            if (typeof startCount  !== "number" || typeof incrementor !== "number"){
                throw "Only numeric params are allowed";
            }
            return initialCount = initialCount + incrementor;
        }
        catch (e) {
            console.log(e);
        }
    }
    counter.resetCounter = ()=>{
        initialCount = startCount - incrementor;
    }
    return counter
}

let myCounter = createCounter(50,10);
console.log( myCounter() );
console.log( myCounter() );
console.log( myCounter() );
console.log( myCounter.resetCounter());
console.log( myCounter() );

let counterWithError = createCounter("1",10);
console.log( counterWithError() );
console.log( counterWithError() );
console.log( counterWithError() );
console.log( counterWithError.resetCounter());
console.log( counterWithError() );

