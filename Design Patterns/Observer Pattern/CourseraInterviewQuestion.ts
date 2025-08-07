/* Advanced Version of Singleton Pattern 
To Implement :

1. subscribe()
2. subscribeOnce()
3. subscribeOnceAsync()

*/

type EventHandler = (...args: any[]) => void;

class ObserverAdvanced {
  #subscriptionList: Map<string, EventHandler[]>;
  #subscriptionOnceList: Map<string, EventHandler[]>;
  #subscriptionOnceAsyncList: Map<string, ((value: any) => void)[]>;

  constructor() {
    this.#subscriptionList = new Map();
    this.#subscriptionOnceList = new Map();
    this.#subscriptionOnceAsyncList = new Map();
  }

  subscribe(event: string, fn: EventHandler): { remove: () => void } {
    if (this.#subscriptionList.has(event)) {
      const handlerArray = this.#subscriptionList.get(event)!;
      handlerArray.push(fn);
    } else {
      this.#subscriptionList.set(event, [fn]);
    }

    return {
      remove: () => {
        const handlers = this.#subscriptionList.get(event) || [];
        this.#subscriptionList.set(
          event,
          handlers.filter((handler) => handler !== fn)
        );
      },
    };
  }

  subscribeOnce(event: string, fn: EventHandler): void {
    if (this.#subscriptionOnceList.has(event)) {
      const handlerArray = this.#subscriptionOnceList.get(event)!;
      handlerArray.push(fn);
    } else {
      this.#subscriptionOnceList.set(event, [fn]);
    }
  }

  subscribeOnceAsync(event: string): Promise<any> {
    return new Promise((resolve) => {
      if (this.#subscriptionOnceAsyncList.has(event)) {
        const handlerArray = this.#subscriptionOnceAsyncList.get(event)!;
        handlerArray.push(resolve);
      } else {
        this.#subscriptionOnceAsyncList.set(event, [resolve]);
      }
    });
  }
}
