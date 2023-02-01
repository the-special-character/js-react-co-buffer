import React, { PureComponent } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Child2 extends PureComponent {
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  //     // if (this.props !== nextProps || this.state !== nextState) {
  //     //   return true;
  //     // }
  //     // return false;
  //   }

  constructor(props) {
    super(props);

    this.controller = new AbortController();
  }

  async componentDidMount() {
    document.addEventListener('mousemove', this.mouseMove);
    this.interval = setInterval(() => {
      console.log('interval');
    }, 1000);
    await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      signal: this.controller.signal,
    });
  }

  // callback
  // promise
  // generator

  // use to remove all async code from the component
  componentWillUnmount() {
    throw new Error('Something went wrong');
    document.removeEventListener('mousemove', this.mouseMove);
    clearInterval(this.interval);
    this.controller.abort();
  }

  mouseMove = () => {
    try {
      console.log(this);
      console.log('Mouse Move');
    } catch (error) {}
  };

  render() {
    console.log('Child 2 render');
    const { count } = this.props;
    return (
      <div>
        <h1>Child 2</h1>
        <p>{count}</p>
      </div>
    );
  }
}
