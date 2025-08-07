/** What is Proxy and what is its usage??
 * 
 * Proxy serve as a firewall to the object where object mutability is not directly allowed
 * In simpler terms, Proxy as the name suggests is a wrapper on top of an object which can be used to control object changes
 */

// Example : Age should not be a negative value

const obj = {
    fname: "Aditya",
    lname: "Pratap",
    role: "Software Engineer",
    age: 28
}

// We need to create a Proxy Object for this main object and apply a check to its mutability

const proxyObj =  new Proxy(obj, {
    get(target, prop){ // Target: is the same object for which the proxy is created, prop: is the property which is being queried
        console.log(`Property queried: ${prop}`)
        return target[prop];
    },
    set(target, prop, newValue){
        console.log(`Trying to set "${prop}" value as ${newValue}`)
        switch(prop){
            case 'age':
                if(newValue < 0){
                    const err = `Trying to set -ve "${prop}" value. Not Allowed!`;
                    throw new Error(err);
                }else {
                    target[prop] = newValue
                }
                break;
            case 'role':
                if(['Software Engineer', 'Frontend Developer', 'UI Developer'].includes(newValue)){
                    target[prop] = newValue;
                }else{
                    throw new Error('Role change not allowed');
                }
                break;
        }
    }
})


console.log(proxyObj.age);
// proxyObj.age = -10; // Output -> Error: Trying to set -ve "age" value. Not Allowed!
proxyObj.age = 29;
// proxyObj.role = 'QA Tester' // Output -> Error: Role change not allowed
proxyObj.role = 'UI Developer';
console.log(proxyObj);


// IMP Note: All the subsequent changes after the failed scenario won't reflect