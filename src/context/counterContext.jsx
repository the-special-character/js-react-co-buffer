import React, { createContext, useState } from 'react';

export const CounterContext = createContext(5);

export function CounterProvider({ children }) {
  const [counter, setCounter] = useState(10);

  return (
    <CounterContext.Provider
      value={{
        counter,
        setCounter,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}
