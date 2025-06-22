/** Q. Given 3 sorted arrays, find the common elements in them. */
// Example: [1, 5, 10, 20, 40, 80], [6, 7, 20, 80, 100], [3, 4, 15, 20, 30, 70, 80, 120] => [20, 80]

function findSmallestAmong(element1,element2, element3){
    if(element1 < element2 && element1 < element3){
        return element1;
    }else if(element2 < element1 && element2 < element3){
        return element2;
    }else{
        return element3;
    }
}

function findCommon(arr1, arr2, arr3) {
    let i = 0; j =0; k = 0;
    let result = [];

    while(i < arr1.length && j < arr2.length && k < arr3.length){
        let element1 = arr1[i];
        let element2 = arr2[j];
        let element3 = arr3[k];
        if(element1 === element2 && element2 === element3){
            result.push(element1);
            i++;
            j++;
            k++;
        }else{
            let smallest = findSmallestAmong(element1, element2, element3);
            if(smallest === element1){
                i++;
            }else if(smallest === element2){
                j++;
            }else{
                k++;
            }
        }
    }

    return result;
}


console.log(findCommon([1, 5, 10, 20, 40, 80], [6, 7, 20, 80, 100], [3, 4, 15, 20, 30, 70, 80, 120]));

