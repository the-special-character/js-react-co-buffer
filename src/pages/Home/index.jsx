import React, { useState } from 'react';
import { CounterContext } from '../../context/counterContext';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <CounterContext.Consumer>
        {(data) => (
          <div>
            <p>{data.counter}</p>
            <button
              type="button"
              onClick={() => {
                data.setCounter((val) => val + 1);
              }}
            >
              Increment Counter
            </button>
          </div>
        )}
      </CounterContext.Consumer>
    </div>
  );
}

export default Home;
