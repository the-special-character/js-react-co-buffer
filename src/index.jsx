import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './app';
import ErrorBoundary from './errorBoundary';

const container = document.getElementById('root');

const root = createRoot(container);

function App({ number }) {
  const [counter, setCounter] = useState(number);
  const [name, setName] = useState('Yagnesh');
  const isMounted = useRef(false);

  // Clousures
  const increment = () => {
    setCounter((val) => val + 1);
  };

  const decrement = () => {
    setCounter((val) => val - 1);
  };

  const changeName = () => {
    setName('Rohit');
  };

  // Never Change Value of dependency
  useEffect(() => {
    if (isMounted.current) {
      console.log('Change value');
    }
  }, [name]);

  // Component Did Mount
  // Component Did Update  // **Never write useEffect without dependency**
  useEffect(() => {
    console.log('Component Did Mount');
    isMounted.current = true;
  }, []);

  return (
    <>
      <div>
        <button type="button" onClick={increment}>
          +
        </button>
        {counter}
        <button type="button" onClick={decrement}>
          -
        </button>
      </div>
      <div>
        {name}
        <button type="button" onClick={changeName}>
          Change Name
        </button>
      </div>
    </>
  );
}

root.render(
  <ErrorBoundary>
    <App number={10} />
  </ErrorBoundary>,
);
