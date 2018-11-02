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

const assert = require('assert');
require('./../src/Array');
/**/
describe('Testing new functions from Array:', function () {
    describe('range', function () {
        it('is defined', function () {
            assert.equal((typeof Array.range), 'function');
        });

        it('return a array', function () {
            assert.equal(Array.isArray(Array.range(1, 10)), true);
        });

        it('ascending order', function () {
            let last = 0;
            const newArray = Array.range(1, 10);
            for (var item in newArray) {
                assert.equal(last < newArray[item], true);
                last = newArray[item];
            }
        });

        it('descende order', function () {
            let last = 11;
            const newArray = Array.range(10, 1);
            for (var item in newArray) {
                assert.equal(last > newArray[item], true);
                last = newArray[item];
            }
        });

        it('empyt array', function () {
            assert.equal(Array.range('a', 'b').length, 0);
        });
    });

    describe('uniq', function () {
        it('is defined', function () {
            assert(typeof Array.uniq, 'function');
        });

        it('reject not arrays', function () {
            let test = false;
            try {
                Array.uniq({});
            } catch (e) {
                test = true;
            }
            assert.equal(test, true);
        });

        it('return array', function () {
            assert.equal(Array.isArray(Array.uniq([
            ])), true);
        });

        it('remove duplicates', function () {
            let qtList = {};
            let qtNewList = {};
            const list = [
                1,
                2,
                3,
                1,
                4,
                5,
                2
            ];
            const newList = Array.uniq(list);
            list.forEach(i => {
                qtList[i] = qtList[i] ? qtList[i] + 1 : 1;
            });
            newList.forEach(i => {
                qtNewList[i] = qtNewList[i] ? qtNewList[i] + 1 : 1;
            });
            /**/
            assert.equal(list.length > newList.length, true);
            assert.equal(qtList[1] !== qtNewList[1], true);
            assert.equal(qtList[2] !== qtNewList[2], true);
        });
    });
});