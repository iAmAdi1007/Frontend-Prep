/** Promise.race is a Promise helper which returns a Promise which resolves / rejects as soon as the first promise in the array of Promises resolves or rejects */

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
    asyncTaskCreator(2),
    asyncTaskCreator(4),
    asyncTaskCreator(6),
    asyncTaskCreator(8),
    asyncTaskCreator(3),
    // asyncTaskCreator(1), 
]

const myPromiseRace = (promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(resolve).catch(reject);
        })
    })
}

Promise.race(promises).then(console.log).catch(console.error);

myPromiseRace(promises).then(console.log).catch(console.error)

