import React, { PureComponent, createRef } from 'react';
import './style.scss';
import './todo.scss';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

// O(N)

export default class App extends PureComponent {
  state = {
    todoList: [],
    filterStatus: 'all',
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
      },
    );
  };

  updateTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(
        (x) => x.id === item.id,
      );
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
    const isConfirmed = confirm(
      'Are you sure want to delete this item',
    );
    if (isConfirmed) {
      this.setState(({ todoList }) => {
        const index = todoList.findIndex(
          (x) => x.id === item.id,
        );
        return {
          todoList: [
            ...todoList.slice(0, index),
            ...todoList.slice(index + 1),
          ],
        };
      });
    }
  };

  filterTodo = (filterStatus) => {
    this.setState({ filterStatus });
  };

  render() {
    const { todoList, filterStatus } = this.state;
    console.log('render');

    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <TodoForm
          addTodo={this.addTodo}
          ref={this.todoTextRef}
        />
        <div className="todo__list">
          {todoList.length > 0 && (
            <TodoList
              todoList={todoList}
              filterStatus={filterStatus}
              updateTodo={this.updateTodo}
              deleteTodo={this.deleteTodo}
            />
          )}
        </div>
        <TodoFilter
          filterStatus={filterStatus}
          filterTodo={this.filterTodo}
        />
      </div>
    );
  }
}
