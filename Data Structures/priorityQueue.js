class QueueElement{
    constructor(data, priority){
        this.data = data;
        this.priority = priority;
    }
}

class PriorityQueue{
    constructor(){
        this.items = [];
    }

    enqueue(data, priority){
        let added = false;
        const queueElement = new QueueElement(data, priority);
        if(this.items.length === 0){
            this.items.push(queueElement);
        }else{
            for(let i = 0; i < this.items.length; i++){
                if(this.items[i].priority > queueElement.priority){
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }

            if(!added){
                this.items.push(queueElement);
            }
        }
    }

    dequeue(){
        return this.items.shift();
    }

    front(){
        return this.items[0];
    }

    rear(){
        return this.items[this.items.length - 1];
    }

    isEmpty(){
        return this.items.length === 0;
    }

    print(){
        this.items.forEach(element => console.log(element));
    }
}


const queue = new PriorityQueue();

queue.enqueue(3, 3);
queue.enqueue(4, 4);
queue.enqueue(5, 1);
queue.enqueue(7, 1);
queue.enqueue(11, 2);

queue.print();

console.log('Logging Front Element:', queue.front());