import { fetchData, wait } from './asyncFunc';

test('should test fetchdata', () => {
  expect(wait(300)).resolves.toBe('hello');
  expect(wait(300)).rejects.toBe();
});
