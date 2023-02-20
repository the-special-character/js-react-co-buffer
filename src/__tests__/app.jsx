import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import App from '../app';
import axiosInstance from '../utils/axiosInstance';

var mock = new MockAdapter(axiosInstance);

const todoList = [
  {
    text: 'hello',
    isDone: false,
    id: 9,
  },
];

const todoList1 = [
  {
    text: 'hello',
    isDone: true,
    id: 9,
  },
];

const pendingTodos = [
  {
    text: 'asdfads',
    isDone: false,
    id: 22,
  },
  {
    text: 'asdf',
    isDone: false,
    id: 23,
  },
];

describe('App Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('should render app component', async () => {
    mock.onGet('/todoList').reply(200, todoList);
    const { asFragment } = render(<App />);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render loading before api call', async () => {
    mock.onGet('/todoList').reply(200, todoList);
    render(<App />);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );
  });

  test('should render todo app', async () => {
    mock.onGet('/todoList').reply(200, todoList);
    render(<App />);
    const title = await screen.findByText('Todo App');
    expect(title).toBeInTheDocument();
  });

  test('should complete add functionality', async () => {
    mock.onGet('/todoList').reply(200, todoList);
    mock.onPost('/todoList').reply(200, {
      text: 'hello world',
      isDone: false,
      id: 5,
    });
    render(<App />);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );
    const todoInput = screen.queryByLabelText(/Todo Text/i);
    fireEvent.change(todoInput, {
      target: { value: 'hello world' },
    });
    expect(todoInput.value).toBe('hello world');

    const addTodo = screen.queryByText(/Add Todo/i);
    fireEvent.click(addTodo);
    await waitFor(() =>
      expect(
        screen.queryAllByTestId('todolist-item').length,
      ).toBe(2),
    );
  });

  test('should update todo', async () => {
    mock.onGet('/todoList').reply(200, todoList);
    mock
      .onPut('todoList/9')
      .reply(200, { ...todoList[0], isDone: true });

    render(<App />);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );

    const checkbox = screen.queryByLabelText('Completed');
    const itemtext = screen.queryByTestId('item-text');

    expect(itemtext).not.toHaveClass('line-through');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
      expect(itemtext).toHaveClass('line-through');
    });
  });

  test('should update todo on checked input', async () => {
    mock.onGet('/todoList').reply(200, todoList1);
    mock
      .onPut('todoList/9')
      .reply(200, { ...todoList[0], isDone: false });

    render(<App />);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );

    const checkbox = screen.queryByLabelText('Completed');
    const itemtext = screen.queryByTestId('item-text');

    expect(itemtext).toHaveClass('line-through');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
      expect(itemtext).not.toHaveClass('line-through');
    });
  });

  test('should delete todo on click of delete button', async () => {
    mock.onGet('/todoList').reply(200, todoList1);
    mock.onDelete('todoList/9').reply(200, {});

    render(<App />);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );

    const deleteButton = screen.queryByText('Delete');

    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(deleteButton).not.toBeInTheDocument(),
    );
  });

  test('should display only pending records', async () => {
    mock.onGet('/todoList').reply(200, todoList1);

    render(<App />);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Loading.../i),
    );

    mock.reset();
    mock.onGet('/todoList').reply(200, pendingTodos);

    const pendingButton = screen.queryByText('Pending');

    fireEvent.click(pendingButton);

    await waitFor(() => {
      expect(
        screen.queryAllByTestId('todolist-item').length,
      ).toBe(2);
    });
  });
});
