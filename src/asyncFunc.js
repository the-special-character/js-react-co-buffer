export const wait = (time) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve('hello');
      } catch (error) {
        reject(error);
      }
    }, time);
  });

export const fetchData = async () => {
  const res = await fetch(
    "'https://jsonplaceholder.typicode.com/todos/1'",
  );
  return res;
};
