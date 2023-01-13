const p1 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      // resolve("p1 resolved")
      reject("p1 rejected");
    }, 4000);
  });
};

const p2 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      // resolve("p2 resolved")
      reject("p2 rejected");
    }, 2000);
  });
};

const p3 = () => {
  return new Promise((resolve, reject) => {
    // fetch data from the server
    setTimeout(() => {
      // resolve("p3 resolved")
      reject("p3 rejected");
    }, 3000);
  });
};

const loadData = async () => {
  try {
    console.time("async");
    //   const res = await Promise.all([
    //     p1(),
    //     p2(),
    //     p3()
    //   ])

    //   console.log(res);

    const res1 = await Promise.any([p1(), p2(), p3()]);

    console.log(res1);

    //   const res1 = await Promise.allSettled([
    //     p1(),
    //     p2(),
    //     p3()
    //   ])

    //   console.log(res1);
    //   const res1 = await p1()
    //   const res2 = await p2()
    //   const res3 = await p3()
    console.timeEnd("async");
  } catch (error) {
    console.log(error);
  }
};

loadData();

// all
// allSettled
// race
// any
