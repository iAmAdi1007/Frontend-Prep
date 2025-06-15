/* Promise.any is exactly opposite to that of Promise.all. This Promise Helper also returns a new promise which resolves with the first value from the array of promises which resolves and rejects with all the rejected promises
 */
const asyncTaskCreator = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
        if(time % 2 !== 0){
            rej(`Rejected Promise with value ${time}`)
        }else{
            res(`Resolved Promise with value: ${time}`);
        }
    }, time * 100);
  });
};

const promises = [
    asyncTaskCreator(7),
    asyncTaskCreator(5),
    asyncTaskCreator(3),
    asyncTaskCreator(9),
    asyncTaskCreator(1),
]
const myPromiseAny = (promises) => {
    const rejectedPromiseArray = [];
    let promiseCounter = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(val => resolve(val)).catch(err => {
                rejectedPromiseArray[index] = err;
                promiseCounter++;
                if(promiseCounter === promises.length){
                    reject(rejectedPromiseArray)
                }
            })
        })
    })
};

Promise.any(promises).then(console.log).catch(console.error);

myPromiseAny(promises).then(val => {
    console.log('From Custom Promise Any:', val)
}).catch(console.error)
