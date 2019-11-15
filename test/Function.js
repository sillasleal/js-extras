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

/* global Function */

const assert = require('assert');
const {expect} = require('chai');
require('./../src/Function');

describe('Testing new function from Funtion:', function() {
  describe('pipeline', function() {
    it('is defined', function() {
      assert.equal((typeof Function.pipeline), 'function');
    });

    it('only allow array of functions', async function() {
      let test = false;
      try {
        await Function.pipeline(0, { });
      } catch (e) {
        test = true;
      }
      assert.equal(test, true);
      try {
        test = false;
        await Function.pipeline(0, [ ]);
      } catch (e) {
        test = true;
      }
      assert.equal(test, false);
    });

    it('error if array contains a item that is not a function', async function() {
      let test = false;
      try {
        await Function.pipeline(0, [
          () => {
          },
          { },
          5
        ]);
      } catch (e) {
        test = true;
      }
      assert.equal(test, true);
    });

    it('execut all function', async function() {
      const sq = n => n * n;
      const value = 3;
      const result = 6561;
      const ret = await Function.pipeline(value, [ sq, sq, sq ]);
      assert.equal(ret, result);
      const plus2 = v => v + 2;
      const ret2 = await Function.pipeline(ret, [
        plus2, plus2
      ]);
      assert.equal(ret2, 6565);
    });

    it('execut all function with promise', async function() {
      const sq = n => n * n;
      const sqP = n => new Promise(r => setTimeout(() => r(n * n), 1000));
      const value = 3;
      const result = 6561;
      const ret = await Function.pipeline(value, [ sq, sq, sq ]);
      assert.equal(ret, result);
      const plus2 = v => v + 2;
      const ret2 = await Function.pipeline(ret, [
        plus2, plus2
      ]);
      assert.equal(ret2, 6565);
    });
  });

  describe('requiredParameter', function() {
    it('is defined', function() {
      assert.equal(Function.requiredParameter !== undefined, true);
    });

    it('is a function', function() {
      assert.equal(typeof Function.requiredParameter, 'function');
    });

    it('throws exception on run', function() {
      expect(Function.requiredParameter).to.throw();
    });
  });
});
