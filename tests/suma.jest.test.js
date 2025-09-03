const { suma } = require('../src/suma');
describe('suma (Jest)', () => {
  test('debería sumar dos números', () => {
    expect(suma(2, 3)).toBe(5);
  });
});
