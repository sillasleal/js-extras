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
require('./../src/String');

describe('Testing new functions of String', function () {
    describe('isValid', function () {
        it('is defined', function () {
            assert.equal(typeof String.isValid, 'function');
        });

        it('return a boolean', function () {
            assert.equal(typeof String.isValid(''), 'boolean');
        });

        it('accept only strings', function () {
            assert.equal(String.isValid('asd'), true);
            assert.equal(String.isValid(1), false);
            assert.equal(String.isValid(true), false);
            assert.equal(String.isValid({}), false);
            assert.equal(String.isValid([
            ]), false);
            assert.equal(String.isValid(function () {}), false);
            assert.equal(String.isValid(''), false);
            assert.equal(String.isValid(' '), false);
        });
    });
    describe('replaceAll', function () {
        it('is defined in strings', function () {
            assert.equal(typeof "asd".replaceAll, 'function');
        });
        it('return the own string', function () {
            const  str = "value";
            assert.equal(str.replaceAll(), str);
        });
        it('replace onece', function () {
            const  str = "value";
            assert.equal(str.replaceAll('a', 'e'), 'velue');
        });
        it('replace many times', function () {
            const  str = "banana";
            assert.equal(str.replaceAll('a', 'e'), 'benene');
        });
    });
    describe('ucFirst', function () {
        it('is define in string', function () {
            assert.equal(typeof "asd".ucFirst, 'function');
        });
        it('return a string', function () {
            assert.equal(typeof "asd".ucFirst(), 'string');
        });
        it('return a string witn uc first', function () {
            assert.equal("asd".ucFirst(), 'Asd');
        });
    });
    describe('removeAccents', function () {
        it('is defined', function () {
            assert.equal(typeof "asd".removeAccents, 'function');
        });
        it('return a string', function () {
            assert.equal(typeof "asd".removeAccents(), 'string');
        });
        it('remove accents', function () {
            const string = "áàéèíìóòúù";
            assert.equal(string.removeAccents(), 'aaeeiioouu');
        });
    });
    describe('containsIgAccents', function () {
        it('is defined', function () {
            assert.equal(typeof "asd".containsIgAccents, 'function');
        });
        it('return boolean', function () {
            assert.equal(typeof "asd".containsIgAccents(""), 'boolean');
        });
        it('ignore non strings', function () {
            let test = 0;
            const values = [1, true, {}, [], function () {}];
            for (var item in values) {
                try {
                    "asd".containsIgAccents(values[item]);
                } catch (e) {
                    test++;
                }
            }
            assert.equal(test, values.length);
        });
    });
});