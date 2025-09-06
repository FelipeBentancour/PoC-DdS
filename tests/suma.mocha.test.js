const { suma } = require('../src/suma');
const assert = require('assert');
describe('suma (Mocha)', function () {
  it('debería sumar dos números', function () {
    assert.strictEqual(suma(2, 3), 5);
  });
  it('debería sumar números negativos', function () {
    assert.strictEqual(suma(-2, 3), 1);
  });
  it('debería sumar decimales', function () {
    assert.strictEqual(suma(2.5, 3.1), 5.6);
  });
  it('debería sumar ceros', function () {
    assert.strictEqual(suma(0, 0), 0);
  });
  it('debería manejar strings como números', function () {
    assert.strictEqual(suma('2', 3), 5);
  });
  it('debería manejar null como 0', function () {
    assert.strictEqual(suma(null, 3), 3);
  });
  it('debería manejar undefined como NaN', function () {
    assert.ok(isNaN(suma(undefined, 3)));
  });
});
