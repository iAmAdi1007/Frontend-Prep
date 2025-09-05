// Curry with closures

const curry = () => {
  let sum = 0;
  return function (num) {
    sum += num;
    return sum;
  };
};

const sum = curry();

// console.log(sum(5));
// console.log(sum(3));
// console.log(sum(4));
// console.log(sum(0));

// Q : Implement a sum function which can accept arguments in any order -> sum(1, 2)(3)(4, 5) / sum(1, 2, 3, 4, 5) and returns the sum if the number of arguments reach 5

function curriedSum(...args) {
  let total = [...args];
  if (total.length === 5) {
    return total.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  } else {
    const temp = function (...otherArgs) {
      total = [...total, ...otherArgs];
      console.log('Total:', total)
      if (total.length === 5) {
        return total.reduce((acc, curr) => {
          return acc + curr;
        }, 0);
      }else{
        return temp;
      }
    };
    return temp;
  }
}

// console.log(curriedSum(1)(2, 3)(4, 5))

// Q: To add to the previous question a use case like, base condition change -> we basically need to create an infinite currying function which can keep on accepting arguments until the return function is invoked with zero arguments i.e. sum(1)(2, 3)(4, 5, 6)(7)()

function infiniteCurryingSum(...args){
    let totalArgs = [...args]
    if(args.length === 0){
        return args.reduce((acc, curr) => acc + curr, 0);
    }else{
        const inner = function(...otherArgs){
            totalArgs = [...totalArgs, ...otherArgs]
            if(otherArgs.length === 0){
                return totalArgs.reduce((acc, curr) => acc + curr, 0);
            }else{
                return inner;
            }
        }
        return inner;
    }
}
// console.log(infiniteCurryingSum(3)(4)(5)(1, 2, 6)());
// console.log(infiniteCurryingSum())

// Q: Implement a curry function which takes in a callback(eg: sum function) and returns a curried version of it

const findSum = function(a, b, c, d){
    return a + b + c + d;
}

const currify = function(cb){
    const curriedFunction = function(...args){
        if(cb.length === args.length){
            return cb.apply(this, args)
        }else{
            let temp = function(...otherArgs){
                return curriedFunction(...args, ...otherArgs)
            }
            return temp;
        }
    }
    return curriedFunction;
}

const currifiedSum = currify(findSum);

console.log(currifiedSum(1)(2)(3)(4));
