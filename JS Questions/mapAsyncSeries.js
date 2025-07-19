/** Implement a map series async function which is similar to array.map function but returns a Promise that resolves
 * on the list of output by mapping each element through an async iteratee function or rejects if any error.
 * The inputs are run in seq i.e. one after another. The async iteratee function will accept an input and a callback . The callback function will be called once the input is finished processing
 * The first arg of the callback would be error flag and the second is the result
 */

const arr = [1, 2, 3, 4, 5];
const mapSeries  = (arr, fn) => {
    return new Promise(async(res, rej) => {
        let final =  arr.reduce((acc, curr) => {
            // listetning to the previous value
            return acc.then((result) => {
                return new Promise((resolve, reject) => {
                    fn(curr, (error, value) => {
                        if(error){
                            reject(error)
                        }else{
                            resolve([...result, value])
                        }
                    })
                })
            })
        }, Promise.resolve([]))

        final.then(output => {
            res(output)
        }).catch(error => {
            rej(error)
        })
    })
}
