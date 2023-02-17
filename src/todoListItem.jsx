import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function TodoListItem({
  item,
  updateTodo,
  deleteTodo,
  updateTodoState,
  deleteTodoState,
}) {
  return (
    <div
      data-testid="todolist-item"
      className="todo__list-item"
      key={item.id}
    >
      <div>
        <label htmlFor="isDone" className="sr-only">
          Completed
        </label>
        <input
          id="isDone"
          type="checkbox"
          checked={item.isDone}
          className="disabled:text-slate-400 disabled:cursor-wait"
          disabled={updateTodoState?.status === 'REQUEST'}
          onChange={() => updateTodo(item)}
        />
      </div>
      <p
        data-testid="item-text"
        className={clsx('px-4 flex-1', {
          'line-through': item.isDone,
        })}
      >
        {item.text}
      </p>
      <button
        type="button"
        className="btn rounded-md disabled:bg-slate-500 disabled:cursor-wait"
        disabled={deleteTodoState?.status === 'REQUEST'}
        onClick={() => deleteTodo(item)}
      >
        Delete
      </button>
    </div>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodoState: PropTypes.shape({
    type: PropTypes.oneOf(['UPDATE_TODO']).isRequired,
    status: PropTypes.oneOf(['REQUEST', 'ERROR'])
      .isRequired,
  }),
  deleteTodoState: PropTypes.shape({
    type: PropTypes.oneOf(['DELETE_TODO']).isRequired,
    status: PropTypes.oneOf(['REQUEST', 'ERROR'])
      .isRequired,
  }),
};

TodoListItem.defaultProps = {
  updateTodoState: undefined,
  deleteTodoState: undefined,
};

export default memo(TodoListItem);
