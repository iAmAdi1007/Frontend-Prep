function delayPromise(delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, delay);
  });
}

/* Retry Promise 'N' Times with the added Delay */

const asyncAfterThree = () => {
  let counter = 0;
  //closure concept
  return async () => {
    counter += 1;
    if (counter < 3) {
      throw new Error("Error Calling Method");
    } else {
      console.log("200 OK");
    }
  };
};

const innerFunction = asyncAfterThree();

async function retryPromiseWithDelay(fn, delay, retries) {
  try {
    await fn();
  } catch (err) {
    retries -= 1;
    if (retries > 0) {
      await delayPromise(delay);
      return await retryPromiseWithDelay(fn, delay, retries);
    }
    return Promise.reject("Max retries reached");
  }
}

(async function () {
  // await retryPromiseWithDelay(asyncAfterThree(), 500, 2);
  await retryPromiseWithDelay(asyncAfterThree(), 500, 3);
})();
// console.log('Sucess');
