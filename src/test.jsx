import React, { Component } from 'react';

// Class Component
// stateful component
export default class Test extends Component {
  // Method overriding
  state = {
    count: 0,
    name: 'Yagnesh',
  };

  render() {
    const { count, name } = this.state;
    return (
      <div id="test">
        <p>{name}</p>
        <button
          type="button"
          onClick={() => {
            // this.state.count += 1;
            this.setState({ count: 5, name: 'Virat' });
          }}
        >
          +
        </button>
        <p>{count}</p>
        <button type="button">-</button>
      </div>
    );
  }
}
