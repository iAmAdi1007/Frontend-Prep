/* Check if unique pair exists */

// Approach 1 : Naive Brute Force

const arr = [15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10];

const findTwoSum = (arr, k) => {
    let len = arr.length;

    for(let i = 0; i < len - 1; i++){
        for(let j = i + 1; j < len; j++){
            if(arr[i] + arr[j] === k){
                return true;
            }
        }
    }

    return false;
}

console.log("$Brute Force:", findTwoSum(arr, 25));

// Approach 2: Two pointers approach

function findTwoSumWithPointers(arr, k){
    arr.sort((a, b) => a - b);
    let low = 0;
    let high = arr.length - 1;
    let result = [];
    while(low < high){
        let sum = arr[low] + arr[high];
        if(sum === k){
            result.push([arr[low], arr[high]]);
            low++;
            high--;
        }else if(sum < k){
            low++;
        }else{
            high--;
        }
    }

    return result;
}

console.log("$Two Pointers:", findTwoSumWithPointers(arr, 25));

// Approach 3: Hashing

function findTwoSumWithHashing(arr, k){
    const set = new Set();
    let isFound = false;
    arr.forEach(val => {
        let rem = k - val;
        if(set.has(rem)){
            isFound = true;
        }else{
            set.add(val);
        }
    })
    return isFound;
}

console.log("$Hashing:", findTwoSumWithHashing(arr, 26));

// Approach 4: Recursion

function helper(arr, n, sum, count, k){
    if(count == 2 && sum == k){
        return true;
    }

    if(count == 2 || n == 0 || sum > k){
        return false;
    }

    return helper(arr, n - 1, sum, count, k) || helper(arr, n -1, sum + arr[n - 1], count + 1, k);
}

function findTwoSumRecursion(arr, k){
    return helper(arr, arr.length, 0, 0, k);
}

console.log("$Recursion:", findTwoSumRecursion(arr, 25));

