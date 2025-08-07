const generateKey = (path, config) => {
  const key = Object.keys(config)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => k + ":" + config[k].toString())
    .join("&");
  return path + key;
};

const cachedAPICall = (timeInterval) => {
  let lastCalledTime = 0;
  let map = new Map();
  return async function (fetchURL, config = {}) {
    const key = generateKey(fetchURL, config);
    const timeDiff = Date.now() - lastCalledTime;
    if (timeDiff < timeInterval && map.has(key)) {
      return map.get(key);
    } else {
      try {
        lastCalledTime = Date.now();
        const jsonRes = await fetch(fetchURL);
        const res = await jsonRes.json();
        map.set(key, res);
        return res;
      } catch (err) {
        lastCalledTime = 0;
      }
    }
  };
};

const call = cachedAPICall(1500);

call("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
  console.log("First",res)
);
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    console.log("Second", res)
  );
}, 700);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    console.log("Third", res)
  );
}, 1400);
