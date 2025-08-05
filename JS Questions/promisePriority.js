const promiseCreator = (time) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(time % 2 == 0){
                res(time);
            }else{
                rej(new Error('Error Resolving Promise with entry:', time));
            }
        }, time * 1000)
    });
}

const promiseArray = [
    {val: promiseCreator(1), priority: 3},
    {val: promiseCreator(3), priority: 2},
    {val: promiseCreator(5), priority: 4},
    {val: promiseCreator(7), priority: 1},
]


const resolvePriority = (promiseArray) => {
    let sortedArray = promiseArray.sort((a, b) => a.priority - b.priority);
    let mostPriority = Infinity;
    let result = [];
    let failedPromisesCount = 0;
    let resolvedPromisesCount = 0;
    return new Promise((resolve, reject) => {
        sortedArray.forEach(({val, priority}) => {
            val.then((res) => {
                resolvedPromisesCount++;
                if(priority < mostPriority){
                    mostPriority = priority;
                    result = [];
                    result[priority] = res;
                }
            }).catch(err => {
                failedPromisesCount++;
            }).finally(() => {
                if(failedPromisesCount === promiseArray.length){
                    reject(new Error('All Promises Have Failed'));
                }
                if(failedPromisesCount + resolvedPromisesCount === promiseArray.length){
                    resolve({value : result[mostPriority], mostPriority})
                }
            })
        })
    })
}

resolvePriority(promiseArray).then(console.log).catch(console.log);