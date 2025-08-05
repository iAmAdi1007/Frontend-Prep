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