// 1. callback
// 2. Promise
// 3. generator

// document.addEventListener("click", () => {

// })

setTimeout(() => {
  console.log("hello");
}, 1000);

//  Promise

// pending

// success

// rejected

let isLoading;

const p1 = () => {
  return new Promise((resolve, reject) => {
    // server call
    resolve("Promise resolve");
    // reject("Promise rejected")
  });
};

p1()
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("finally");
  });
