
/* Execute Promises in Series */
const promiseCreator = (time) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(time)
        }, time * 1000)
    });
}

const promiseArray = [
    promiseCreator(3),
    promiseCreator(5),
    promiseCreator(1),
    promiseCreator(7),
    promiseCreator(2),
];

/** Method 1: Using Array.reduce */

const executePromises = async(promiseArray) => {
    promiseArray.reduce((previousVal, currEle) => {
        return previousVal.then(() => {
            return currEle.then((val) => {
                console.log(`Resolved Promise with Time from Array Reduce ${val}`)
            })
        })
    }, Promise.resolve())
}

/** Method 2: Using async await syntactic sugar */

const executeUsingAsyncAwait = async(promiseArray) => {
    for(let promise of promiseArray){
        try{
            const res = await promise;
            console.log(`Resolved Promise with Time from async-await ${res}`);
        }catch(err){
            console.log(err);
        }
    }
}

/** Method 3: Using Recursion */

const executeSeriesRecusively =  (promiseArray,  index) => {
    if(index < promiseArray.length){
        promiseArray[index].then(val => {
            console.log(`Resolved Promise with Time using recursion ${val}`);
            executeSeriesRecusively(promiseArray, index + 1);
        })
    }
}

executePromises(promiseArray);
executeUsingAsyncAwait(promiseArray);
executeSeriesRecusively(promiseArray, 0);
