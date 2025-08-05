/* Advanced Version of Singleton Pattern 
To Implement :

1. subscribe()
2. subscribeOnce()
3. subscribeOnceAsync()

*/

class ObserverAdvanced {
  #subscriptionList = null;
  #subsriptionOnceList = null;
  #subscriptionOnceAsyncList = null;

  constructor() {
    this.#subscriptionList = new Map();
    this.#subsriptionOnceList = new Map();
  }

  subscribe(event, fn) {
    if (this.#subscriptionList.has(event)) {
      const handlerArray = this.#subscriptionList.get(event);
      handlerArray.push(fn);
      this.#subscriptionList.set(event, handlerArray);
    } else {
      this.#subscriptionList.set(event, [fn]);
    }

    return {
      remove: () => {
        // used fat arrow function as it does not have this context of its own, hence it inherits parent's context
        this.#subscriptionList.set(
          event,
          this.#subscriptionList.get(event).filter((handler) => handler != fn)
        );
      },
    };
  }

  subscribeOnce(event, fn) {
    if (this.#subsriptionOnceList.has(event)) {
      const handlerArray = this.#subsriptionOnceList.get(event);
      handlerArray.push(fn);
      this.#subsriptionOnceList.set(event, handlerArray);
    } else {
      this.#subsriptionOnceList.set(event, [fn]);
    }
  }

  subscribeOnceAsync(event) {
    return new Promise((resolve, reject) => {
      if (this.#subscriptionOnceAsyncList.has(event)) {
        const handlerArray = this.#subscriptionOnceAsyncList.get(event);
        handlerArray.push(resolve);
        this.#subscriptionOnceAsyncList.set(event, handlerArray);
      } else {
        this.#subscriptionOnceAsyncList.set(event, [resolve]);
      }
    });
  }
}
