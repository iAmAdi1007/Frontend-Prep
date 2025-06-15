/* Promise all is a promise helper, which can be used to execute an array of promises in parallel and returns a new Promise which:
 * resolves with the result array when all the promises in the array are resolved
 * rejects when any one of the promise from the promise array rejects 
*/

const asyncTaskCreator = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10);
      if (random % 2 == 0) {
        res(`Resolved Promise with value: ${random}`);
      } else {
        rej(`Resolved Promise with value: ${random}`);
      }
    }, time * 100);
  });
};

const promises = [
    asyncTaskCreator(5),
    asyncTaskCreator(3)
]

const myPromiseAll = (promises) => {
    const result = [];
    let promiseCounter = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then(val => {
                result[index] = val;
                promiseCounter += 1;
                if(promiseCounter === promises.length){
                    resolve(result);
                }
            }).catch(err => {
                reject(err);
            })
        })
    })
};

// Promise.all(promises).then(console.log).catch(err => console.log('Some Error Occurred'))

myPromiseAll(promises).then(console.log).catch(err => console.log('Some Error Occurred'))
