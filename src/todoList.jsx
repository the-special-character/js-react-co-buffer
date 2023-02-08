import clsx from 'clsx';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function TodoList({
  todoList,
  filterStatus,
  updateTodo,
  deleteTodo,
}) {
  console.log('Todo List render');
  return (
    <>
      {/* O(N) */}
      {todoList.map((x) => {
        if (
          filterStatus === 'all' ||
          (filterStatus === 'pending' &&
            x.isDone === false) ||
          (filterStatus === 'completed' &&
            x.isDone === true)
        ) {
          return (
            <div className="todo__list-item" key={x.id}>
              <input
                type="checkbox"
                checked={x.isDone}
                onChange={() => updateTodo(x)}
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
                onClick={() => deleteTodo(x)}
              >
                Delete
              </button>
            </div>
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
