/**
 * Sample test to verify test setup is working correctly.
 * You can delete this file once you start writing your own tests.
 */
describe('Test Setup', () => {
  test('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  test('should be able to perform basic assertions', () => {
    const sum = (a: number, b: number) => {
      return a + b;
    };
    expect(sum(2, 2)).toBe(4);
  });
});
