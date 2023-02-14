import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import TodoListItem from '../todoListItem';

const updateTodo = jest.fn();
const deleteTodo = jest.fn();

describe('TodoListItem', () => {
  let container = null;
  const item = {
    text: 'hello',
    isDone: false,
    id: 8,
  };

  beforeEach(() => {
    container = render(
      <TodoListItem
        item={item}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        updateTodoState={undefined}
        deleteTodoState={undefined}
      />,
    ).container;
  });

  test('should render TodoListItem', () => {
    expect(container.firstChild).toBeDefined();
  });

  test('should render checkbox', () => {
    const isDone = screen.queryByLabelText('Completed');
    expect(isDone).toBeDefined();
    expect(isDone).not.toBeDisabled();
  });

  test('should change checkbox', () => {
    const isDone = screen.queryByLabelText('Completed');
    fireEvent.click(isDone);
    expect(updateTodo).toBeCalledTimes(1);
    expect(updateTodo).toBeCalledWith(item);
  });

  test('should render delete button', () => {
    const deleteButton = screen.queryByRole('button');
    expect(deleteButton).toBeDefined();
    expect(deleteButton.innerHTML).toBe('Delete');
  });

  test('should button click', () => {
    const deleteButton = screen.queryByRole('button');
    fireEvent.click(deleteButton);
    expect(deleteTodo).toBeCalledTimes(1);
    expect(deleteTodo).toBeCalledWith(item);
  });
});
