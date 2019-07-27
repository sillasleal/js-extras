/*
 * The MIT License
 *
 * Copyright 2018 Sillas S. Leal<sillas.s.leal@gmail.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.values = undefined;
/**/
const assert = require('assert');
require('./../src/Object');

describe('Testing new functions from Object', function() {
  describe('isObject', function() {
    it('is defined', function() {
      assert.equal(typeof Object.isObject, 'function');
    });

    it('return boolean', function() {
      assert.equal(typeof Object.isObject({ }), 'boolean');
    });

    it('test objects', function() {
      assert.equal(Object.isObject({ }), true);
    });

    it('ignore Arrays', function() {
      assert.equal(Object.isObject([
      ]), false);
    });

    it('ignore null', function() {
      assert.equal(Object.isObject(null), false);
    });

    it('ignore others', function() {
      assert.equal(Object.isObject(1), false);
      assert.equal(Object.isObject('p'), false);
      assert.equal(Object.isObject(true), false);
      assert.equal(Object.isObject(function() {}), false);
      assert.equal(Object.isObject(5.5), false);
      assert.equal(Object.isObject(() => ({ })), false);
    });

    it('regular expression is a object', function() {
      assert.equal(Object.isObject(/ab+c/), true);
    });
  });

  describe('assignDeep', function() {
    it('is defined', function() {
      assert.equal(typeof Object.assignDeep, 'function');
    });
    it('return object', function() {
      assert.equal(Object.isObject(Object.assignDeep({ }, { })), true);
    });
    it('assign objects', function() {
      const obj1 = {
        a: 10,
      };
      const obj2 = {
        b: 20,
      };
      const obj3 = Object.assignDeep(obj1, obj2);
      const objMixed = {
        a: 10,
        b: 20,
      };
      assert.equal(JSON.stringify(obj1) !== JSON.stringify(obj2), true);
      assert.equal(JSON.stringify(obj3) ===
              JSON.stringify(objMixed), true);
    });
    it('assign deep objects', function() {
      const obj1 = {
        a: 10,
        b: {
          c: 20,
        },
      };
      const obj2 = {
        d: 30,
        e: {
          f: 40,
        },
      };
      const obj3 = Object.assignDeep(obj1, obj2);
      const objMixed = {
        a: 10,
        b: {
          c: 20,
        },
        d: 30,
        e: {
          f: 40,
        },
      };
      assert.equal(JSON.stringify(obj1) !== JSON.stringify(obj2), true);
      assert.equal(JSON.stringify(obj3) ===
              JSON.stringify(objMixed), true);
    });
  });

  describe('Object.isEmpty', function() {
    it('is defined', function() {
      assert.equal(typeof Object.isEmpyt, 'function');
    });
    it('return false to a item that is not object', function() {
      assert.equal(Object.isEmpyt(), true);
    });
    it('return false to a item that is not object', function() {
      assert.equal(Object.isEmpyt(1), true);
    });
    it('return false to a empyt object', function() {
      assert.equal(Object.isEmpyt({ }), true);
    });
    it('return true to a empyt object', function() {
      assert.equal(Object.isEmpyt({
        a: 90,
      }), false);
    });
  });

  describe('readProp', function() {
    it('is defined', function() {
      assert.equal(typeof Object.readProp, 'function');
    });
    it('read a root prop', function() {
      const obj = {
        a: 10,
      };
      assert.equal(Object.readProp(obj, 'a'), 10);
    });
    it('doesnt find prop', function() {
      const obj = {
        a: 10,
      };
      assert.equal(Object.readProp(obj, 'b'), undefined);
    });
    it('return a default value', function() {
      const obj = {
        a: 10,
      };
      assert.equal(Object.readProp(obj, 'b', 30), 30);
    });
    it('return a deep prop', function() {
      const obj = {
        a: {
          b: {
            c: {
              d: {
                e: {
                  f: {
                    g: {
                      h: 100,
                    },
                  },
                },
              },
            },
          },
        },
      };
      assert.equal(Object.readProp(obj, 'a.b.c.d.e.f.g.h'), 100);
    });
    it('prop empyt', function() {
      const obj = {
        a: 10,
      };
      assert.equal(Object.readProp(obj, '', 90), 90);
      assert.equal(Object.readProp(obj, undefined, 90), 90);
    });

    it('informe a object on path', function() {
      const obj = {
        a: {
          b: {
            c: 80,
          },
        },
      };
      assert.equal(Object.readProp(obj, {
        path: 'a.b.c',
      }, 90), 80);
    });

    it('informe a object on path with a invalid path', function() {
      const obj = {
        a: {
          b: {
            c: 80,
          },
        },
      };
      assert.equal(Object.readProp(obj, {
        path: undefined,
      }, 90), 90);
    });

    it('informe a object on path with a valid path and test of return', function() {
      const obj = {
        a: {
          b: {
            c: 80,
          },
        },
      };
      assert.equal(Object.readProp(obj, {
        path: 'a.b.c',
        test: (v) => typeof v === 'number',
      }, 90), 80);
      assert.equal(Object.readProp(obj, {
        path: 'a.b.c',
        test: (v) => typeof v === 'string',
      }, 90), 90);
    });

    it('informe a not object', function() {
      assert.equal(Object.readProp(99, 'a.b.c', 12), 12);
    });
  });
});
