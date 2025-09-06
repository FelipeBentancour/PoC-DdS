import { describe, it, expect } from 'vitest';
import { suma } from '../src/suma';

describe('suma (Vitest)', () => {
  it('debería sumar dos números', () => {
    expect(suma(2, 3)).toBe(5);
  });
  it('debería sumar números negativos', () => {
    expect(suma(-2, 3)).toBe(1);
  });
  it('debería sumar decimales', () => {
    expect(suma(2.5, 3.1)).toBeCloseTo(5.6);
  });
  it('debería sumar ceros', () => {
    expect(suma(0, 0)).toBe(0);
  });
  it('debería manejar strings como números', () => {
    expect(suma('2', 3)).toBe(5);
  });
  it('debería manejar null como 0', () => {
    expect(suma(null, 3)).toBe(3);
  });
  it('debería manejar undefined como NaN', () => {
    expect(suma(undefined, 3)).toBeNaN();
  });
});
