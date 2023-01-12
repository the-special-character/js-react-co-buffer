const p1 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      // resolve("p1 resolved")
      reject("p1 rejected");
    }, 1000);
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
