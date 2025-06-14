/* Create a Promise that will resolve in 5 secs*/

const promise = new Promise((res, rej) => {
    setTimeout(() => {
        const val = Math.floor(Math.random() * 10);
        console.log(val);
        if(val % 2 == 0){
            res('Resolving Promise in 5 secs')
        }else{
            rej(new Error('Error Resolving Promise with Random:', val));
        }
    }, 5 * 100)
});
const onResolved = (val) => {
    console.log('From On Resolved Callback=>', val);
}
const onRejected = (err) => {
    console.log('From On Rejected Callback=>', err);
} 
promise.then(onResolved, onRejected);

/* Instead of 2nd Callback, we can also make use of .catch to handle error sceanarios */

promise.then(console.log).catch((err) => {
    console.log('Error Handled Gracefully')
})

/* Finally will execute no matter what*/

promise.then(() => console.log('Promise got resolved')).catch(() => console.log('Promise Got Rejected')).finally(() => console.log('I will execute no matter what :)'));

/* Catch can be extended by a then block */

promise.catch((err) => {
    return 'I am being returned from Catch in Error Case'
}).then(console.log)

/** Promise Helpers */

console.log('1st Promise:', new Promise((res, rej) => res('I am from constructor')));
console.log('2nd Promise via helper', Promise.resolve('I am a resolved promise'));

/** Async Await Syntax - use try...catch to handle error scenarios in cases of Promise Rejected*/

(async function resolvePromise(){
    try{
        const res = await promise;
        console.log('From try:', res);
    }catch(err){
        console.log('From Catch:', err);
    }
})();

// Predict the Output
const promiseNew = Promise.resolve('I am resolved');

const example = async(promiseNew) => {
    try{
        const res = await promiseNew;
        return res;
    }catch(err){
        console.error(err);
    }finally{
        console.log('Task done!!');
    }
}

console.log(example(promiseNew)); // At first this seems like it will return the resolved value from Promise, but the catch(not the try..catch catch :)) here is that return value from async funtion is also a promise
/** OUTPUT : 
 * Promise{ <pending> },  
 * Task done!!
 * */

/* In case you need to log the value, you can either log it inside the async function / will have to chain a then block */

example(promiseNew).then(console.log);
/**OUTPUT:
 * Task done!!
 * I am resolved
 */

