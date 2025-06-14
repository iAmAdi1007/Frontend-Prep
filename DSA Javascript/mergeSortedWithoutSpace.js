var merge = function(nums1, m, nums2, n) {
    let i = m + n - 1, j = 0;
    while(nums1[i] < nums2[j]){
        console.log("Comparing", nums1[i], nums2[j])
        nums1[i--] = nums2[j++];
    }

    return nums1.sort((a, b) => a - b);
    
};

// Given the numbers are sorted and there are no negative elements in the 2nd array
let nums1 = [1,2,3,0,0,0];
let nums2 = [2,5,6]

console.log(merge(nums1, 3, nums2, 3))