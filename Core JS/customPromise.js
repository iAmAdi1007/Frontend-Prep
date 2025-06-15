const PROMISE_STATES = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  state = PROMISE_STATES.PENDING;
  sucessCallbacks = [];
  rejectedCallbacks = [];
  value = undefined;
  reason = undefined;
  constructor(executorFn) {
    executorFn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    console.log('Inside resolve');
    if (this.state === PROMISE_STATES.FULFILLED) return;
    this.state = PROMISE_STATES.FULFILLED;
    this.value = value;
    console.log('Running callbacks:', this.sucessCallbacks);
    this.sucessCallbacks.forEach((cb) => cb(value));
  }

  reject(reason) {
    if (this.state === PROMISE_STATES.REJECTED) return;
    this.state = PROMISE_STATES.REJECTED;
    this.reason = reason;
    this.rejectedCallbacks.forEach((cb) => cb(reason));
  }

  then(handlerFn) {
    this.sucessCallbacks.push(handlerFn);
    return this;
  }

  catch(handlerFn) {
    this.rejectedCallbacks.push(handlerFn);
    return this;
  }
}

function customPromise(time) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(time)
    }, time * 1000)
  });
}

customPromise(2).then((val) => console.log("From Custom Resolve:", val));
