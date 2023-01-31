import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import Test from './test';

const container = document.getElementById('root');

const root = createRoot(container);

// Test.getDerivedStateFromProps = (props, state) => {};

root.render(
  <>
    <App title="Yagnesh Modh" desc="Full Stack Developer" />
    <App title="Virat Kohli" />
    <Test count={10} />
  </>
);
