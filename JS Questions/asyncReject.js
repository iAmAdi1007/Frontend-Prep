/* Implement a function that takes an array of inputs and an async iteratee functionand returns a
 * promise that resolves with the list of inputs that has failed the test through the iteratee 
 * function. The inputs are run in parallel but out should be in the same order as the original.
 */


function asyncReject(inputArray, iterateeFn){
    return new Promise((resolve, reject) => {
        const result = [];
        let counter = 0;
        inputArray.forEach((val, index) => {
            iterateeFn(val, (err, res) => {
                counter++;
                if(err){
                    reject(err);
                }
                if(!res){
                    result[index] = res;
                }
                if(counter === inputArray.length){
                    resolve(result)
                }
            })
        })
    })
}

// Input

let numPromise = asyncReject([1, 2, 3.5, 4, 5, 7], function(num, callback){
    setTimeout(function(){
        num = num * 2;
        console.log(num)

        //throw error
        if(num == 7){
            callback(true)
        }else{
            callback(null, num !== 4)
        }
    }, 2000)
})

numPromise.then((result) => console.log("Success:" + result)).catch(() => console.log('No Success'));