/* 
 * The MIT License
 *
 * Copyright 2018 sillas.
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

/**
 * Method that criate a array with range of numbers
 * @param {number} start
 * @param {number} end
 * @returns {Array}
 */
Array.range = function (start, end) {
    let ret = [ ], toUp;
    if (typeof start === "number" && typeof end === "number") {
        toUp = start <= end;
        if (start <= end) {
            for (let i = start; i <= end; i++) {
                ret.push(i);
            }

        } else {
            for (let i = start; i >= end; i--) {
                ret.push(i);
            }
        }

    }
    return ret;
};


/**
 * It Removes duplicates items
 * @param {Array} array
 * @return {Array|Array.uniq.newArray}
 */
Array.uniq = function (array) {
    if (!Array.isArray(array)) {
        throw new Error("parameter is not a array");
    }
    let newArray = [ ];
    for (var item in array) {
        if (newArray.indexOf(array[item]) < 0) {
            newArray.push(array[item]);
        }
    }
    /**/
    return newArray;
};

/**
 * Função que verifica se o array informado é valido, ou seja, é array e possui elementos
 * @param {mixed} array O array a ser testado
 * @returns {Boolean} Retorna TRUE se for válido e FALSE se não for
 */
Array.isValid = function (array) {
    return Array.isArray(array) && array.length;
};

/**
 * Função que retorna o ultimo elemento do array, isso se ele for válido
 * @param {Array} array O Array
 * @returns {mixed} O ultimo elemento do Array
 */
Array.last = function (array) {
    return Array.isValid(array) ? array[array.length - 1] : undefined;
};