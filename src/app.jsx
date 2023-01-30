import React from 'react';

const bgColor = 'red';
const color = 'white';

// 1. first letter should be always upper case
// 2. each component should return single Element
// 3. style should be object and property name should be in camel case
// 4. instead of class have to use className
function App({ title, desc }) {
  return (
    <>
      <h1
        style={{
          backgroundColor: bgColor,
          color,
        }}
        className="container"
      >
        {title}
      </h1>
      <h2>{desc}</h2>
      <input type="checkbox" />
    </>
  );
}

export default App;
