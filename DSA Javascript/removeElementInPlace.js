/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let start = 0, end = nums.length - 1;
    while(start <=end){
        if(nums[start] == val && nums[end] !== val){
            let temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
        }else if(nums[start] !== val && nums[end] !== val){
            start++;
        }
        else{
            end--;
        }
    }
    return start;
};


removeElement([0,1,2,2,3,0,4,2], 2)