function findSum(input) {
  return input.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

function checkDuplicates(input) {
  const set = new Set();
  for (let el of input) {
    if (set.has(el)) {
      return true;
    } else {
      set.add(el);
    }
  }
  return false;
}

function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum == target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}

function twoSumUnsorted(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let remaining = target - arr[i];
    if (map.has(remaining)) {
      return [i, map.get(remaining)];
    } else {
      map.set(arr[i], i);
    }
  }
  return [];
}

function twoSumUniquePairs(nums, target) {
  const set = new Set();
  const result = new Set();
  for (let i = 0; i < nums.length; i++) {
    const remaining = target - nums[i];
    if (set.has(remaining)) {
      result.add([Math.min(nums[i], remaining), Math.max(nums[i], remaining)]);
    } else {
      set.add(nums[i]);
    }
  }

  return Array.from(result);
}

function moveZeroes(arr) {
  let lastIndexThatsNotZero = arr.length - 1;

  let start = 0;
  while (start < lastIndexThatsNotZero) {
    if (arr[start] !== 0) {
      start++;
    } else {
      if (arr[lastIndexThatsNotZero] !== 0) {
        let temp = arr[start];
        arr[start] = arr[lastIndexThatsNotZero];
        arr[lastIndexThatsNotZero] = temp;
        lastIndexThatsNotZero--;
      } else {
        lastIndexThatsNotZero--;
      }
    }
  }

  return arr;
}

function moveZeroesInOrder(arr) {
  if (arr.length <= 1) return arr;
  let left = 0;
  let right = left + 1;
  while (right < arr.length && left < arr.length) {
    if (arr[left] != 0) {
      left++;
      continue;
    }

    if (arr[right] !== 0 && left !== right) {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    } else {
      right++;
    }
  }

  return arr;
}

function bestTimeToBuyAndSell(arr) {
  let bestDay = 0;
  let nextDay = bestDay + 1;
  let maxProfit = 0;
  while (nextDay < arr.length) {
    let profit = arr[nextDay] - arr[bestDay];
    if (profit < 0) {
      bestDay = nextDay;
    } else {
      maxProfit = Math.max(maxProfit, profit);
    }
    nextDay++;
  }
  return maxProfit;
}

function bestTimeToBuyAndSellMultiTransaction(prices) {
  let buyDay = 0;
  let sellDay = buyDay + 1;
  let totalProfit = 0;
  while (sellDay < prices.length) {
    let profit = prices[sellDay] - prices[buyDay];
    if (profit > 0) {
      totalProfit += profit;
    }
    buyDay++;
    sellDay++;
  }
  return totalProfit;
}

function maxSumSubArray(nums, k) {
  let windowSum = 0;
  let maxSum = -Infinity;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  maxSum = windowSum;

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

function kadane(nums) {
  let maxSum = -Infinity;
  let currSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    maxSum = Math.max(currSum, maxSum);
    if (currSum < 0) {
      currSum = 0;
    }
  }
  return maxSum;
}

function findContinuousSubarrays(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let prefixSum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (map.has(prefixSum - k)) {
      count += map.get(prefixSum - k);
    }
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
}

function findLongestSubarrayWithSumK(nums, k) {
  const map = new Map();
  map.set(0, -1);
  let prefixSum = 0;
  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i]; // Prefix Sum Till i
    let rem = prefixSum - k;
    if (map.has(rem)) {
      maxLen = Math.max(maxLen, i - map.get(rem));
    }

    if (!map.has(prefixSum)) {
      map.set(prefixSum, i);
    }
  }
  return maxLen;
}

function findLongestSubstringWithoutRepeatingCharacters(str) {
  if (str === "") return 0;
  const set = new Set();
  let left = 0;
  let right = 0;
  set.add(str.charAt(left));
  let maxLen = 1;
  while (right < str.length) {
    right++;
    const char = str.charAt(right);
    if (set.has(char)) {
      while (str.charAt(left) !== char) {
        set.delete(str.charAt(left));
        left++;
      }
      set.delete(str.charAt(left));
      left += 1;
    }
    if (right < str.length && !set.has(char)) {
      maxLen = Math.max(maxLen, right - left + 1);
      set.add(char);
    }
  }
  return maxLen;
}
function minWindow(s, t) {
  if (s.length === 0 || t.length === 0) return "";


  const tMap = new Map();
  for (const char of t) {
    tMap.set(char, (tMap.get(char) || 0) + 1);
  }

  const required = tMap.size; 


  const windowMap = new Map();
  let formed = 0;
  let left = 0, right = 0;


  let ans = [Infinity, 0];


  while (right < s.length) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);


    if (tMap.has(char) && windowMap.get(char) === tMap.get(char)) {
      formed++;
    }


    while (formed === required) {
 
      if (right - left + 1 < ans[0]) {
        ans = [right - left + 1, left];
      }

      const leftChar = s[left];
      windowMap.set(leftChar, windowMap.get(leftChar) - 1);

      if (tMap.has(leftChar) && windowMap.get(leftChar) < tMap.get(leftChar)) {
        formed--;
      }

      left++;
    }
    right++;
  }

  return ans[0] === Infinity ? "" : s.slice(ans[1], ans[1] + ans[0]);
}

function productOfArrayExceptSelf(){
    
}

console.log(minimumWindowSubstring("pwwkew", "kew"));
