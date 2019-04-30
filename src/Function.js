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
//import regeneratorRuntime from "regenerator-runtime";
/**
 * Method that execute a pipeline with one uniq arg
 * @param {mixed} firstARg The initial arq
 * @param {Arryar} functions A functions to be executed
 * @returns {Promise} A Promise with result of functions
 */
Function.pipeline = async (firstARg, functions) => {
    if (!Array.isArray(functions)) {
        throw new TypeError('Function.pipeline: Functions have to be a Array of functions');
    }
    if (!functions.length) {
        //If the array is empty
        return;
    }
    /**/
    let ret = firstARg;
    for (var item in functions) {
        if (typeof functions[item] !== 'function') {
            throw new TypeError('Function.pipeline: Functions have to be a Array of functions');
        }
        ret = await functions[item](ret);
    }
    /**/
    return ret;
};

/**
 * Fução que informa a obrigatoriedade de um parametro
 * @param {String} parameter O nome do parametro
 * @throws {Error} Lança uma nova exceção em qualquer caso
 * @return {undefined}
 */
Function.requiredParameter = function(parameter = ""){
    throw new Error(`REQUIRE_PARAMETER ${parameter}`);
};