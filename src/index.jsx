import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useMemo,
  useCallback,
} from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import ErrorBoundary from './errorBoundary';

const container = document.getElementById('root');

const root = createRoot(container);

// function Child1({ data, fn }) {
//   console.log('Child1');
//   return (
//     <div>
//       <h1>Hello Child1</h1>
//       {data.map((x) => (
//         <p key={x}>{x}</p>
//       ))}
//       <button onClick={fn} type="button">
//         Click me
//       </button>
//     </div>
//   );
// }

// const Child1Memo = memo(Child1);

// function Child2({ data, fn }) {
//   console.log('Child2');
//   return (
//     <div>
//       <h1>Hello Child2</h1>
//       {data.map((x) => (
//         <p key={x}>{x}</p>
//       ))}
//       <button onClick={fn} type="button">
//         Click me
//       </button>
//     </div>
//   );
// }

// const Child2Memo = memo(Child2);

// function App({ number }) {
//   const [counter, setCounter] = useState(number);
//   const [name, setName] = useState('Yagnesh');
//   const isMounted = useRef(false);

//   // Memorizing The non primitive type of data
//   const data = useMemo(() => [1, 2, 3], [name]);

//   const fn = useCallback(() => {
//     console.log('hello wold');
//   }, [name]);

//   // Clousures
//   const increment = () => {
//     setCounter((val) => val + 1);
//   };

//   const decrement = () => {
//     setCounter((val) => val - 1);
//   };

//   const changeName = () => {
//     setName('Rohit');
//   };

//   // Never Change Value of dependency
//   useEffect(() => {
//     if (isMounted.current) {
//       console.log('Change value');
//     }
//   }, [name]);

//   // Component Did Mount
//   // Component Did Update  // **Never write useEffect without dependency**
//   useEffect(() => {
//     console.log('Component Did Mount');
//     isMounted.current = true;
//   }, []);

//   return (
//     <>
//       <div>
//         <button type="button" onClick={increment}>
//           +
//         </button>
//         {counter}
//         <button type="button" onClick={decrement}>
//           -
//         </button>
//       </div>
//       <div>
//         {name}
//         <button type="button" onClick={changeName}>
//           Change Name
//         </button>
//       </div>
//       <Child1Memo data={data} fn={fn} />
//       <Child2Memo data={data} fn={fn} />
//     </>
//   );
// }

root.render(
  <ErrorBoundary>
    <App number={10} />
  </ErrorBoundary>,
);
