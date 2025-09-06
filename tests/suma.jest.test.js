const { suma } = require('../src/suma');
describe('suma (Jest)', () => {
  test('debería sumar dos números', () => {
    expect(suma(2, 3)).toBe(5);
  });
  test('debería sumar números negativos', () => {
    expect(suma(-2, 3)).toBe(1);
  });
  test('debería sumar decimales', () => {
    expect(suma(2.5, 3.1)).toBeCloseTo(5.6);
  });
  test('debería sumar ceros', () => {
    expect(suma(0, 0)).toBe(0);
  });
  test('debería manejar strings como números', () => {
    expect(suma('2', 3)).toBe(5);
  });
  test('debería manejar null como 0', () => {
    expect(suma(null, 3)).toBe(3);
  });
  test('debería manejar undefined como NaN', () => {
    expect(suma(undefined, 3)).toBeNaN();
  });
});
