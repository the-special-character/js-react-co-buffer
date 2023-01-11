// Javascript is single threded sync programing

// Node.js Is using V8 engine to execute javascript code

const wait = (time) =>
  new Promise((resolve, reject) => setTimeout(resolve, time || 0));

// aync

console.log("a1");
setTimeout(() => {
  console.log("s1");
}, 5000);
console.log("a2");
wait(8000).then(() => console.log("s2"));
console.log("a3");
setTimeout(() => {
  console.log("s3");
}, 0);
wait().then(() => console.log("s4"));
console.log("a4");
