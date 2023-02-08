import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './todoListItem';

function TodoList({
  todoList,
  filterStatus,
  updateTodo,
  deleteTodo,
}) {
  console.log('Todo List render');
  return (
    <>
      {todoList.map((x) => {
        if (
          filterStatus === 'all' ||
          (filterStatus === 'pending' &&
            x.isDone === false) ||
          (filterStatus === 'completed' &&
            x.isDone === true)
        ) {
          return (
            <TodoListItem
              key={x.id}
              item={x}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        }
        return null;
      })}
    </>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  filterStatus: PropTypes.oneOf([
    'all',
    'pending',
    'completed',
  ]).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
