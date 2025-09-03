import { describe, it, expect } from 'vitest';
import { suma } from '../src/suma';

describe('suma (Vitest)', () => {
  it('debería sumar dos números', () => {
    expect(suma(2, 3)).toBe(5);
  });
});
