import React, { Component, createRef } from 'react';
import './style.scss';
import './todo.scss';

export default class App extends Component {
  state = {
    todoList: [],
  };

  todoTextRef = createRef();

  // changeText = (event) => {
  //   this.setState({ todoText: event.target.value });
  // };

  addTodo = (event) => {
    event.preventDefault();

    // O(logN)
    // const todoTextElement = document.getElementById('todoText');

    // if (todoTextElement) {
    // O(1)

    // async code
    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          { id: new Date().valueOf(), text: this.todoTextRef.current.value },
        ],
      }),
      () => {
        this.todoTextRef.current.value = '';
      }
    );

    // sync code

    // }
  };

  render() {
    const { todoList } = this.state;
    console.log('render');

    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <form className="todo__form" onSubmit={this.addTodo}>
          <div>
            <label htmlFor="todoText" className="sr-only">
              Todo Text
            </label>
            <input
              ref={this.todoTextRef}
              type="text"
              id="todoText"
              className="rounded-l-md"
              // value={todoText}
              // onChange={this.changeText}
            />
          </div>
          <button type="submit" className="btn rounded-r-md">
            Add Todo
          </button>
        </form>
        <div className="todo__list">
          {todoList.map((x) => (
            <div className="todo__list-item" key={x.id}>
              <input type="checkbox" name="" id="" />
              <p className="px-4 flex-1">{x.text}</p>
              <button type="button" className="btn rounded-md">
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="todo__filter">
          <button type="button" className="btn flex-1">
            All
          </button>
          <button type="button" className="btn btn--active flex-1">
            Pending
          </button>
          <button type="button" className="btn flex-1">
            Completed
          </button>
        </div>
      </div>
    );
  }
}
