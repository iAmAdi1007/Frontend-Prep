const objA = {
  name: "ABC",
  age: 23,
  address: {
    city: "NY",
  },
};

const objB = Object.assign({ email: "abc.com" }, objA);
objB.age = 34;
objB.address.city = "LA";
console.log(objB);
console.log(objA);

const objC = Object.create(objA);

console.log(objC); // OUTPUT: {}

console.log(Object.getPrototypeOf(objC) === objA);

const source = {
  a: 1,
  get b() {
    return 2;
  },
};

const target = {};
const copyObj = Object.assign(target, source);

console.log(Object.getOwnPropertyDescriptor(copyObj, "b")); //{ value: 2, writable: true, enumerable: true, configurable: true }

const preservedDescriptor = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source)
);

console.log(preservedDescriptor);
