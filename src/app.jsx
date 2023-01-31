import React from 'react';
import PropTypes from 'prop-types';

// Props are the immutable
// can pass N number of props

// Function Component
// Stateless Component

// base on props derive UI
function App({ title, desc }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{desc}</h2>
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

App.defaultProps = {
  desc: 'N/A',
};

export default App;
