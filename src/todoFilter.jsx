import clsx from 'clsx';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function TodoFilter({ filterStatus, filterTodo }) {
  return (
    <div className="todo__filter">
      <button
        type="button"
        className={clsx('btn flex-1', {
          'btn--active': filterStatus === 'all',
        })}
        onClick={() => filterTodo('all')}
      >
        All
      </button>
      <button
        type="button"
        className={clsx('btn flex-1', {
          'btn--active': filterStatus === 'pending',
        })}
        onClick={() => filterTodo('pending')}
      >
        Pending
      </button>
      <button
        type="button"
        className={clsx('btn flex-1', {
          'btn--active': filterStatus === 'completed',
        })}
        onClick={() => filterTodo('completed')}
      >
        Completed
      </button>
    </div>
  );
}

TodoFilter.propTypes = {
  filterStatus: PropTypes.oneOf([
    'all',
    'pending',
    'completed',
  ]).isRequired,
  filterTodo: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
