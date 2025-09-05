const obj = {
    printFullName: function(age){
        console.log(`Full Name is ${this.firstName} ${this.lastname}`)
        console.log(`Age is: ${age}`)
    }
}

// obj.printFullName()


const user = {
    firstName: 'Aditya',
    lastname: 'Pratap'
}

const { printFullName } = obj;

const boundFn = printFullName.bind(user);
// boundFn(99)


Function.prototype.myCall = function(thisContext, ...args){
    const symbol = Symbol();
    thisContext[symbol] = this;
    const rv = thisContext[symbol](...args);
    delete thisContext[symbol];
    return rv;
}

Function.prototype.myBind = function(thisContext, ...args){
    return (...otherArgs) => {
        return this.myCall(thisContext, ...args, ...otherArgs)
    }
}

Function.prototype.myApply = function(thisContext, args=[]){
    return this.myCall(thisContext, ...args)
}

printFullName.myApply(user, [29])

// customBind(29)
