
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

const executePromises = async(promiseArray) => {
    promiseArray.reduce((previousVal, currEle) => {
        return previousVal.then(() => {
            return currEle.then((val) => {
                console.log(`Resolved Promise with Time ${val}`)
            })
        })
    }, Promise.resolve())
}

// executePromises(promiseArray);

/* Execute Promises in Parallel */

const executePromisesParallel = (promiseArray, callback) => {
    let resolvedPromiseCount = 0;
    promiseArray.forEach(promise => {
        promise.then(val => {
            console.log(`Resolved Promise with Time ${val}`)
            resolvedPromiseCount += 1;
            if(resolvedPromiseCount === promiseArray){
                callback();
            }
        })
    })
}

// executePromisesParallel(promiseArray, () => {});