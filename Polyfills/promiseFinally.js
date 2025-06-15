/** Promise.finally() schedules a callback to be executed once the Promise is settled, also returns a Promise which can be further chained */

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

Promise.prototype.myfinally = function(callback){
    if(!(typeof callback === 'function')){
        return this.then(callback, callback);
    }

    const P = this.constructor || Promise;

    return this.then(
        value => P.resolve(callback()).then(() => value),
        error => P.resolve(callback()).then(() => new Error(error))
    )
}

asyncTaskCreator(2).then(console.log).myfinally(() => console.log('This is my finally executing'));

