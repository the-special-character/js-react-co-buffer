import React, { Component, createRef } from 'react';
import clsx from 'clsx';
import './style.scss';
import './todo.scss';

export default class App extends Component {
  state = {
    todoList: [],
  };

  todoTextRef = createRef();

  addTodo = (event) => {
    event.preventDefault();

    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          {
            id: new Date().valueOf(),
            text: this.todoTextRef.current.value,
            isDone: false,
          },
        ],
      }),
      () => {
        this.todoTextRef.current.value = '';
      }
    );
  };

  updateTodo = (item) => {
    console.log(item);
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = (item) => {
    const isConfirmed = confirm('Are you sure want to delete this item');
    if (isConfirmed) {
      console.log(item);
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    }
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
            />
          </div>
          <button type="submit" className="btn rounded-r-md">
            Add Todo
          </button>
        </form>
        <div className="todo__list">
          {todoList.map((x) => (
            <div className="todo__list-item" key={x.id}>
              <input
                type="checkbox"
                checked={x.isDone}
                onChange={() => this.updateTodo(x)}
              />
              <p
                className={clsx('px-4 flex-1', {
                  'line-through': x.isDone,
                })}
              >
                {x.text}
              </p>
              <button
                type="button"
                className="btn rounded-md"
                onClick={() => this.deleteTodo(x)}
              >
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
