/**
 Do not return anything, modify nums1 in-place instead.
 */
 function merge(nums1, m, nums2, n) {
    let i = 0, j = 0, index = 0;
    let res = new Array<number>(m + n);

    while(i < m && j < n){
        if(nums1[i] < nums2[j]){
            res[index++] = nums1[i++]
        }else{
            res[index++] = nums2[j++]
        }
    }

    if(i < m){
        while(i < m){
            res[index++] = nums1[i++];
        }
    }

    if(j < n){
        while(j < n){
            res[index++] = nums2[j++];
        }
    }

    for(i = 0; i < res.length; i++){
        nums1[i] = res[i]
    }
};