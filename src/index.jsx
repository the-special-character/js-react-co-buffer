import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <>
    <App title="Yagnesh Modh" desc="Full Stack Developer" />
    <App title="Virat Kohli" desc="Cricketor" />
  </>
);
