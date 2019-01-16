## DESCRIPTION

Create two functions that implements requirements below.

## REQUIREMENTS

1) Create function `passToCallbackES5` which accepts any number of optional arguments, **required** calback function as last argument, add passes all its arguments (except callback function) to callback function.

`passToCallbackES5([num1[, num2[, ...]]], callbackFunction) {...}`
* `num1, num2, ...` - set of optional numbers which should be processed
* `callbackFunction` - callback that accepts any number of arguments and somehow process them (for example sum numbers and alert result).

* `passToCallbackES5` should return value returned from `callbackFunction`.
* `passToCallbackES5` should thow an exception `Callback function is reqired as last argument` if last passed argument is not a function.
* `passToCallbackES5` should be implemented using only ES5 language features.

> NOTE: you can use ES2015 language features in `callbackFunction` (e.g. rest params as in usage examples).

Usage examples:
```
passToCallbackES5(4, 5, 2, (...nums) => nums.reduce((prev, cur) => prev + cur, 0)); // return 11
passToCallbackES5(3, 4, 1, function(...nums){console.log(nums)}); //logs [3, 4, 1], returns undefined
```

2. Create function `passToCallbackES6` which follows all requirements for `passToCallbackES5` except you should use ES2015 language features for its implementation.

The code should work properly in latest versions of Chrome, Firefox and Edge without any transpilation.

## WORKFLOW:

Commit implemented task to git into

branch "03-javascript"

folder "03-javascript/02-browser-events-and-dom/task-02"


Structure of the task should be:
```
<task folder>
\---task2.js
\---task2.html
```

## SOURCES:

```
<task folder>
\---task2.js
\---task2.html
```

## DEADLINE:

Due Date - 15-01-2019 23:59.

Penalty will be applied for each overdue day.
