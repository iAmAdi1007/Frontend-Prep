/** Implement async filter function that takes an array of inputs and an async iteratee function and returns a promise that resolves with the list of inputs that has passed the test through the iteratee
 * function . The inputs will run in parallel , but the output will be in the same order as original . The async iteratee function will accept an input and a callback. The callback function will be invoked
 * when the input is finished processing. The first argument of the callback function is an error flag and the second is the result
 */

const asyncFilter = (inputArray, iteratee) => {
  return new Promise((res, rej) => {
    let output = [];
    let counter = 0;
    inputArray.forEach((val, index) => {
        iteratee(val, (error, result) => {
            if (error) {
                rej(error);
            } 
            counter++;
            if(result){
                output[index] = result;
            }
            if (counter >= inputArray.length) {
              res(output.filter(Boolean));
            }
      });
    });
  });
};


let numPromise =  asyncFilter([1,2,3,4,5], function(num, callback){
    setTimeout(function() {
        num = num * 2;
        console.log(num);

        if(num == 7){
            callback(true)
        }else{
            callback(null, num !== 4)
        }
    }, 2000)
})

numPromise.then((result) => console.log("Success:", result)).catch(() => {console.log("No success")});
