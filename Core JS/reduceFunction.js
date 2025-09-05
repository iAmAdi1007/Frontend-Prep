/** Reduce function is a very powerful function in JS, which can be used for aggregation mostly, but has various other use cases */

// Aggregation Example
let arr = [1,2, 50, 1123, 428];

console.log(arr.reduce((prev, curr) => {
    return prev + curr
}, 0))

/* Segregation Example
 -> Aim is to segrgate similar values
 -> Output Expected: { 1 -> [1.1, 1.2, 1.3], 2 -> [2.1, 2.7, 2.1]}
*/

arr = [1.1, 1.2, 1.3, 2.1, 2.7, 2.1]

const result = arr.reduce((prev, curr) => {
    const currentRounded = Math.floor(curr);
    if(prev[currentRounded]){
        // The key is found in the object
        prev[currentRounded] = [...prev[currentRounded], curr]
    }else{
        // The key is not found in the object
        prev[currentRounded] = [curr]
    }
    return prev;
}, {})

console.log(result);


/*Run in Sequence*/

const upperCase = (str) => {
    return str.toUpperCase();
}

const reverse = (str) => {
    return str.split('').reverse().join('');
}

const append = (str) => {
    return 'Hello ' + str;
}

const functionArray = [upperCase, reverse, append];

console.log(functionArray.reduce((prev, curr) => {
    return curr(prev);
}, 'Aditya'))

/* Execute Promises in Sequence */

const asyncTask = (time) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(`Completing in time ${time}`)
        }, time * 100)
    })
}

const asyncTaskArray = [asyncTask(3), asyncTask(1), asyncTask(5), asyncTask(7), asyncTask(2)];

asyncTaskArray.reduce((prev, curr) => {
    return prev.then(() => {
        return curr.then(console.log)
    })
}, Promise.resolve())


Array.prototype.myReduce = function(callback, initialValue){

    if(typeof callback !== 'function'){
        throw new Error('First Parameter of Reduce should be a callback!!');
    }
    let acc = null;
    let startValue = initialValue !== undefined ? 0 : 1;
    if(!initialValue){
        acc = this[0]
    }else{
        acc = initialValue;
    }
    
    for(let i = startValue; i < this.length; i++){
        acc = callback(acc, this[i]);
    }

    return acc;
} 

const testArr = [1, 2, 3];

const original = testArr.reduce((acc, curr) => {
    console.log(curr);
    return acc + curr
})

const custom = testArr.myReduce((acc, curr) => {
    console.log(curr);
    return acc + curr
})

console.log(`Custom ${custom} vs. Original ${original}`)
