/* Extension to the classic 2 Sum Problem */

const arr = [15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10];
// Approach 1: Using 3 loops -> Time Complexity will be O(n^3)

function findThreeSumNaive(arr, val) {
  let result = [];
  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === val) {
          result.push([arr[i], arr[j], arr[k]]);
        }
      }
    }
  }
  return result;
}

// Approach 2: Two Pointers Approach

function findThreeSum(arr, k) {
  arr.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < arr.length - 2; i++) {
    let rem = k - arr[i];
    let low = i + 1;
    let high = arr.length - 1;
    while (low < high) {
      let sum = arr[low] + arr[high];
      if (sum === rem) {
        result.push([arr[i], arr[low], arr[high]]);
        low++;
        high--;
      } else if (sum < rem) {
        low++;
      } else {
        high--;
      }
    }
  }
  return result;
}
console.log(findThreeSumNaive(arr, 26));

console.log(findThreeSum(arr, 26));


