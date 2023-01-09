// big O notation

// complexity

const arr = [1, 1.5, 3, 3.5, 4, 5, 5.5, 6];

// O(1)

// O(1)

// O(logN)
let result = false;
for (let i = 0; i < arr.length; i++) {
  console.log(i);
  if (arr[i] === 4) {
    result = true;
    break;
  }
}

console.log(result);
