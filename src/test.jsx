import React, { Component } from 'react';
import Child1 from './child1';
import Child2 from './child2';

// HOOKS
//

// Life Cycle Method

// 1. Mounting
// -> constuctor (call only once when you create instance)
// -> getDerivedStateFromProps (static)
// -> render
// -> componentDidMount (call only once when you create instance)

// 2. Updating
// -> getDerivedStateFromProps
// -> shouldComponentUpdate (PureComponent / memo) (IMP)
// -> render
// -> getSnapshotBeforeUpdate
// -> componentDidUpdate

// 3. Unmounting
// -> componentWillUnmount (IMP)

// 4. Error
// -> getDerivedStateFromError
// -> componentDidCatch

// Class Component
// stateful component

// when ever you want to manupulate UI on some event

// use method as arrow method except life cycle methods

// when i change my state value or props value that time component rerender(update)
export default class Test extends Component {
  // Method overriding
  state = {
    count: 0,
    name: 'Yagnesh',
  };

  // base on props define state value
  // bind method
  // analytics
  // call only once
  constructor(props) {
    super(props);
    console.log('constructor');
    // state is mutable
    // this.state = {
    //   count: props.count,
    //   name: 'Yagnesh',
    // };

    // this.increment = this.increment.bind(this);
    // this.descrement = this.descrement.bind(this);
    // analytics logic here
    // server call and pass info
  }

  // calls every time when prop or state change
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    if (state.count === 0) {
      return {
        count: props.count,
      };
    }
    return null;
  }

  // manipulate dom element
  // register an event
  // load data on page load
  async componentDidMount() {
    console.log('componentDidMount');
    // console.log(document.getElementById('test'));
    // document.getElementById('test').style.backgroundColor = 'yellow';
    document.addEventListener('copy', () => {
      console.log('Copied');
    });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      this.setState({ name: json.title });
    } catch (error) {}
  }

  // to capture info and pass it to componentDidUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {}

  // Manipulate DOM Element
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
    console.log(this.state);
    console.log(this.props);
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  // logging
  componentDidCatch(error, errorInfo) {
    // server call
    console.log(errorInfo.componentStack);
  }

  increment = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  descrement = () => {
    this.setState((state) => ({
      count: state.count - 1,
    }));
  };

  render() {
    console.log('render');
    const { count, name, error } = this.state;
    // never write any logic inside render method
    if (error) {
      return <h1>{error.message}</h1>;
    }

    return (
      <div id="test">
        <p>{name}</p>
        <button type="button" onClick={this.increment}>
          +
        </button>
        <p>{count}</p>
        <button type="button" onClick={this.descrement}>
          -
        </button>
        <div>
          <Child1 />
          {count < 12 && <Child2 count={count} />}
        </div>

        <button
          type="button"
          onClick={() => {
            this.setState({ name: 'Virat' });
          }}
        >
          Change Name
        </button>
      </div>
    );
  }
}
