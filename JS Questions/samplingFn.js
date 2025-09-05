/* Create a Sampling function in JS that accepts a function as input and a count and executes that input
*  function only once for the given count of calls.
*/

function sayHello(){
    console.log('Hello');
}


function sampler(fn, count){
    let calledCounter= 0;
    return function(...args){
        calledTimes++;
        if(calledCounter < count){
            //don't execute
            console.log('Not Executing.....')
        }else{
            fn(args)
            calledCounter = 0;
        }

    }
}

const sample = sampler(sayHello, 4);

sample();
sample();
sample();
sample();
sample();
sample();
sample();
sample();