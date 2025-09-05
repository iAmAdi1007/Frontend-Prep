class Singleton{
    constructor() {
        if(Singleton.object){
            return Singleton.object;
        }

        this.data = 'Singleton Data';

        Singleton.object = this;
    }
}


const obj1 = new Singleton();
const obj2 = new Singleton();

// console.log(obj1 === obj2);
// console.log(obj2);


// Using Closures

const singleton = (function(){
    let instance = null;

    function createInstance(){
        const obj = {data : 'Singleton Obj'};
        return obj;
    }

    return {
        getInstance: function(){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    }
})()


const singletonObj1 = singleton.getInstance();
const singletonObj2 = singleton.getInstance();
console.log(singletonObj1 === singletonObj2)

