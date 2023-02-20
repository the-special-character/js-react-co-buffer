import React, { PureComponent, createRef } from 'react';
import './style.scss';
import './todo.scss';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';
import axiosInstance from './utils/axiosInstance';

// O(N)

const requestState = ({
  appState,
  type,
  loadingId = -1,
}) => [...appState, { type, status: 'REQUEST', loadingId }];

const successState = ({ appState, type, loadingId = -1 }) =>
  appState.filter(
    (x) => !(x.type === type && x.loadingId === loadingId),
  );

const errorState = ({
  appState,
  type,
  error,
  loadingId = -1,
}) =>
  appState.map((x) => {
    if (x.type === type && x.loadingId === loadingId) {
      return {
        ...x,
        status: 'ERROR',
        message: error.message,
      };
    }
    return x;
  });

export default class App extends PureComponent {
  state = {
    todoList: [],
    filterStatus: 'all',
    appState: [],
  };

  todoTextRef = createRef();

  componentDidMount() {
    this.loadTodo('all');
  }

  loadTodo = async (filterStatus) => {
    const type = 'LOAD_TODO';
    try {
      this.setState(({ appState }) => ({
        appState: requestState({ appState, type }),
      }));

      let params = {};
      if (filterStatus !== 'all') {
        params = {
          isDone: filterStatus === 'completed',
        };
      }

      const res = await axiosInstance.get('todoList', {
        params,
      });

      console.log(res.data);

      this.setState(({ appState }) => ({
        todoList: res.data,
        filterStatus,
        appState: successState({ appState, type }),
      }));
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorState({ appState, type, error }),
      }));
    }
  };

  addTodo = async (event) => {
    event.preventDefault();
    const type = 'ADD_TODO';
    try {
      this.setState(({ appState }) => ({
        appState: requestState({ appState, type }),
      }));

      const res = await axiosInstance.post('todoList', {
        text: this.todoTextRef.current.value,
        isDone: false,
      });

      this.setState(
        ({ todoList, appState }) => ({
          todoList: [...todoList, res.data],
          appState: successState({ appState, type }),
        }),
        () => {
          this.todoTextRef.current.value = '';
        },
      );
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorState({ appState, type, error }),
      }));
    }
  };

  updateTodo = async (item) => {
    const type = 'UPDATE_TODO';
    const loadingId = item.id;
    try {
      this.setState(({ appState }) => ({
        appState: requestState({
          appState,
          type,
          loadingId,
        }),
      }));

      const res = await axiosInstance.put(
        `todoList/${item.id}`,
        {
          ...item,
          isDone: !item.isDone,
        },
      );

      this.setState(({ todoList, appState }) => {
        const index = todoList.findIndex(
          (x) => x.id === item.id,
        );
        return {
          todoList: [
            ...todoList.slice(0, index),
            res.data,
            ...todoList.slice(index + 1),
          ],
          appState: successState({
            appState,
            type,
            loadingId,
          }),
        };
      });
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorState({
          appState,
          type,
          error,
          loadingId,
        }),
      }));
    }
  };

  deleteTodo = async (item) => {
    const type = 'DELETE_TODO';
    const loadingId = item.id;
    try {
      this.setState(({ appState }) => ({
        appState: requestState({
          appState,
          type,
          loadingId,
        }),
      }));
      await axiosInstance.delete(`todoList/${item.id}`);

      this.setState(({ todoList, appState }) => {
        const index = todoList.findIndex(
          (x) => x.id === item.id,
        );
        return {
          todoList: [
            ...todoList.slice(0, index),
            ...todoList.slice(index + 1),
          ],
          appState: successState({
            appState,
            type,
            loadingId,
          }),
        };
      });
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorState({
          appState,
          type,
          error,
          loadingId,
        }),
      }));
    }
  };

  render() {
    const { todoList, filterStatus, appState } = this.state;

    const loadTodoState = appState.find(
      (x) => x.type === 'LOAD_TODO',
    );

    const addTodoState = appState.find(
      (x) => x.type === 'ADD_TODO',
    );

    const updateTodoState = appState.filter(
      (x) => x.type === 'UPDATE_TODO',
    );

    const deleteTodoState = appState.filter(
      (x) => x.type === 'DELETE_TODO',
    );

    if (loadTodoState?.status === 'REQUEST') {
      return <h1>Loading...</h1>;
    }

    if (loadTodoState?.status === 'ERROR') {
      return <h1>{loadTodoState.message}</h1>;
    }

    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <TodoForm
          addTodo={this.addTodo}
          ref={this.todoTextRef}
          addTodoState={addTodoState}
        />
        <div className="todo__list">
          {todoList.length > 0 && (
            <TodoList
              todoList={todoList}
              updateTodo={this.updateTodo}
              deleteTodo={this.deleteTodo}
              updateTodoState={updateTodoState}
              deleteTodoState={deleteTodoState}
            />
          )}
        </div>
        <TodoFilter
          filterStatus={filterStatus}
          filterTodo={this.loadTodo}
        />
      </div>
    );
  }
}
