/* Implementing Binary Heap DS with Array */

class BinaryHeap{
    constructor(){
        this.list = [];
    }

    maxHeapify(arr, n, index){
        let largest = index;
        let left = 2 * index + 1;
        let right = 2 * index + 2;

        if(left < n && arr[left] > arr[largest]){
            largest = left;
        }

        if(right < n && arr[right] > arr[largest]){
            largest = right;
        }   

        if(largest !== index){
            let temp = arr[largest];
            arr[largest] = arr[index];
            arr[index] = temp;

            this.maxHeapify(arr, n, largest);
        }
    }

    insert(element){
        if(this.list.length == 0){
            this.list.push(element)
        }else{
            this.list.push(element);
            for(let i = parseInt(this.list.length / 2 - 1); i >= 0; i--){
                this.maxHeapify(this.list, this.list.length, i);
            }
        }
    }

    print(){
        this.list.forEach(element => console.log(`${element} -->`))
    }
}

const heapObj = new BinaryHeap();

heapObj.insert(9);
heapObj.insert(3);
heapObj.insert(7);
heapObj.insert(1);
heapObj.insert(0);
heapObj.insert(2);
heapObj.insert(5);
heapObj.insert(10);

// heapObj.print();


