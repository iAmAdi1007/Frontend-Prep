const arr = [[1, 2], [3, [4, 5]], 6, [7, [8, [9, [10, [11, [12, [13, 14]]]]]]]];

console.log(arr.flat());
console.log(arr.flat(1));
console.log(arr.flat(2));

/* Create a Polyfill For Array Flat Method */

Array.prototype.myFlat = function (levels = 1) {
  let result = [];
  let originalArray = this;
  if (levels === Infinity) {
    function recursivelyFlatten(originalArray) {
      let recurResult = [];
      if (!Array.isArray(originalArray)) {
        return originalArray;
      }
      for (let i = 0; i < originalArray.length; i++) {
        let flattened = recursivelyFlatten(originalArray[i]);
        recurResult = recurResult.concat(flattened);
      }

      return recurResult;
    }

    result = recursivelyFlatten(originalArray);
  } else {
    while (levels > 0) {
      result = [];
      for (let i = 0; i < originalArray.length; i++) {
        if (Array.isArray(originalArray[i])) {
          result = [...result, ...originalArray[i]];
        } else {
          result.push(originalArray[i]);
        }
      }
      originalArray = result;
      levels--;
    }
  }

  return result;
};

// console.log(arr.myFlat());
console.log(arr.myFlat(Infinity));
