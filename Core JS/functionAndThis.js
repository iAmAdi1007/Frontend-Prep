/** How many ways to invoke a function in JS ?? ANSWER - 4 */

// 1. As a normal function

function dummy() {
    console.log(this == global); // As a normal function, this points to the window object in case of browser and global in case of node js, however in strict mode this value is "undefined"
    console.log('I am a dummy function');
}

dummy();

// 2. As a method -> functions declared inside an object are called methods

let obj = {
    name: 'Aditya',
    printName: function() {
        console.log(this.name)
        console.log(this === obj)
    }
}

obj.printName();

// 3. As a constructor

const newObj = new Array(5);

console.log(newObj.fill(0));

// 4. Calling indirectly via call, apply and bind

function printName(){
    console.log(`Name to be printed: ${this.name}`)
}

const nameObj = {
    name: "Tarun"
}

printName.call(nameObj);

/** Value of "this" is decided upon how the function is invoked , each invokation creates its own context & the context decides the value of this(also strict mode affects the value)*/

// For Normal Fuctions and IIFEs , the this context is equal to window/global, in strict equals "undefined"
// For Methods, this context equals the object through which it is invoked, but there are a few use cases as well

obj = {
    name: "Same object case",
    displayName: function(){
        console.log(this.name);
        console.log(this === obj); 
    }
}

obj.displayName(); // "this" points to the object thorugh which we invoked the method

obj = {
    name: "Global Scope Case",
    displayName: function() {
        console.log(this === global);
    }
}

const display = obj.displayName;

display(); // here the global context overrides the object context

obj = {
    name: "Inner functions context",
    displayName: function() {
        console.log(this.name);
        function inner(){
            console.log(this === global)
        }

        inner();
    }
}

obj.displayName(); // Here the inner function is invoked as a normal function, hence the scope changes to "global"

obj = {
    name: "We can borrow context from Parent via call, bind and apply / using Fat Arrow",
    displayName: function() {
        console.log(this.name);
        const inner = () => {
            console.log(this === obj)
        }

        inner();
    }
}

obj.displayName(); // Fat Arrow functions borrow the context from nearest parent

obj = {
    name: "We can borrow context from Parent via call, bind and apply / using Fat Arrow",
    displayName: function() {
        console.log(this.name);
        function inner(){
            console.log(this === obj)
        }

        inner.call(this);
    }
}

obj.displayName();

/**
 * Q. Create a function which can only be invoked as a constructor
 * 
 */

function Example(val){
    if(!(this instanceof Example)){
        throw new Error('Can only be invoked as a constructor');
    }
    this.val = val;

    this.displayValue = function() {
        console.log(val);
    }
}

const exampleObj = new Example('Contructor');

exampleObj.displayValue();

const notObj = Example('Not constructor object');


