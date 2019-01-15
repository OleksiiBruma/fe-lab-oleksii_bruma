function passToCallbackES5(){
    let nums = Array.prototype.slice.call(arguments);
        let callbackFunction = nums.pop();
        if (typeof callbackFunction !== "function" ){
            throw "Callback function is reqired as last argument";
        }
        return callbackFunction.apply(undefined, nums);
}
console.log(passToCallbackES5(4, 5, 2, (...nums) => nums.reduce((prev, cur) => prev + cur, 0))); // return 11
passToCallbackES5(3, 4, 1, function(...nums){console.log(nums)}); //logs [3, 4, 1], returns undefined

function passToCallbackES6(...args){
    let nums = args.slice();
    let callbackFunction = nums.pop();
    if (typeof callbackFunction !== "function" ){
        throw "Callback function is reqired as last argument";
    }
   return callbackFunction(...nums);
}
console.log(passToCallbackES6(4, 5, 2, (...nums) => nums.reduce((prev, cur) => prev + cur, 0))); // return 11
passToCallbackES6(3, 4, 1, function(...nums){console.log(nums)}); //logs [3, 4, 1], returns undefined


