import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './todoListItem';

function TodoList({
  todoList,
  updateTodo,
  deleteTodo,
  updateTodoState,
  deleteTodoState,
}) {
  console.log('Todo List render');
  return (
    <>
      {todoList.map((x) => (
        <TodoListItem
          key={x.id}
          item={x}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          updateTodoState={updateTodoState.find(
            (y) => y.loadingId === x.id,
          )}
          deleteTodoState={deleteTodoState.find(
            (y) => y.loadingId === x.id,
          )}
        />
      ))}
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
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodoState: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['UPDATE_TODO']).isRequired,
      status: PropTypes.oneOf(['REQUEST', 'ERROR'])
        .isRequired,
    }),
  ).isRequired,
  deleteTodoState: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['DELETE_TODO']).isRequired,
      status: PropTypes.oneOf(['REQUEST', 'ERROR'])
        .isRequired,
    }),
  ).isRequired,
};

export default memo(TodoList);
