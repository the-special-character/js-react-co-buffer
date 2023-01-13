const p1 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      resolve("p1 resolved");
      // reject("p1 rejected");
    }, 1000);
  });
};

const p2 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      resolve("p1 resolved");
      // reject("p1 rejected");
    }, 2000);
  });
};

const p3 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      resolve("p1 resolved");
      // reject("p1 rejected");
    }, 3000);
  });
};

const loadData = async () => {
  try {
    console.time("async");
    const res1 = await p1();
    const res2 = await p2();
    const res3 = await p3();
    console.timeEnd("async");
  } catch (error) {
    console.log(error);
  }
};

loadData();

p1()
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("finally block called");
  });

// fetch("http://localhost:3004/login", {
//   method: "POST",
//   body: JSON.stringify({
//     email: "yagnesh.modh@gmail.com",
//     password: "Password1!",
//   }),
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// })
//   .then((val) => {
//     return val.json();
//   })
//   .then((json) => {
//     console.log(json);
//     fetch("http://localhost:3004/660/products", {
//       headers: {
//         Authorization: `Bearer ${json.accessToken}`,
//       },
//     })
//       .then((val) => {
//         if (!val.ok) {
//           throw new Error("Token Not valid");
//         }
//         return val.json();
//       })
//       .then((json) => {
//         console.log(json);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       })
//       .finally(() => {
//         console.log("finally");
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const loadData = async () => {
  try {
    const loginRes = await fetch("http://localhost:3004/login", {
      method: "POST",
      body: JSON.stringify({
        email: "yagnesh.modh@gmail.com",
        password: "Password1!",
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const loginJson = await loginRes.json();
    const productsRes = await fetch("http://localhost:3004/660/products", {
      headers: {
        Authorization: `Bearer ${loginJson.accessToken}`,
      },
    });
    const productsJson = await productsRes.json();
    console.log(productsJson);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally block");
  }
};

loadData();

console.log("how are you?");
