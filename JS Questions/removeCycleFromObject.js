const List = function(val){
    this.next = null;
    this.value = val;
}

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;


function removeCycles(obj){
    const set = new WeakSet([obj]);

    (function iterateObj(obj){
        for(let key in obj){
            if(typeof obj[key] === 'object'){
                if(set.has(obj[key])){
                    delete obj[key]
                }
            }else{
                set.add(obj[key])
                iterateObj(obj[key])
            }
        }
    })(obj)
}
