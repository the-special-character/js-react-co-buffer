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

describe('App Component', () => {
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
});
