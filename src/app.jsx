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

  componentDidMount() {
    this.loadTodo();
  }

  loadTodo = async () => {
    try {
      const res = await fetch(
        'http://localhost:3000/todoList',
      );
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {
      console.log(error);
    }
  };

  addTodo = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        'http://localhost:3000/todoList',
        {
          method: 'POST',
          body: JSON.stringify({
            text: this.todoTextRef.current.value,
            isDone: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const json = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [...todoList, json],
        }),
        () => {
          this.todoTextRef.current.value = '';
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  updateTodo = async (item) => {
    try {
      const res = await fetch(
        `http://localhost:3000/todoList/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...item,
            isDone: !item.isDone,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await res.json();

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(
          (x) => x.id === item.id,
        );
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteTodo = async (item) => {
    const isConfirmed = confirm(
      'Are you sure want to delete this item',
    );
    if (isConfirmed) {
      try {
        await fetch(
          `http://localhost:3000/todoList/${item.id}`,
          {
            method: 'DELETE',
          },
        );
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
      } catch (error) {}
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
