const { suma } = require('../src/suma');
const assert = require('assert');
describe('suma (Mocha)', function () {
  it('debería sumar dos números', function () {
    assert.strictEqual(suma(2, 3), 5);
  });
});
