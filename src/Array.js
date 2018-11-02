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
    let ret = [
    ], toUp;
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

//if (!Array.prototype.find) {
//    /**
//     * The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
//     * @param {function} callback[, thisArg] Function to execute on each value in the array, taking three arguments:
//     *      element
//     *          The current element being processed in the array.
//     *      indexOptional
//     *          The index of the current element being processed in the array.
//     *      arrayOptional
//     *          The array find was called upon.
//     *  thisArg Optional
//     *      Object to use as this when executing callback.
//     * @link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find>
//     * @returns {Array} A value in the array if an element passes the test; otherwise, undefined.     
//     */
//    Object.defineProperty(Array.prototype, 'find', {
//        value: function (predicate) {
//            // 1. Let O be ? ToObject(this value).
//            if (this === null) {
//                throw new TypeError('"this" is null or not defined');
//            }
//
//            var o = Object(this);
//
//            // 2. Let len be ? ToLength(? Get(O, "length")).
//            var len = o.length >>> 0;
//
//            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
//            if (typeof predicate !== 'function') {
//                throw new TypeError('predicate must be a function');
//            }
//
//            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
//            var thisArg = arguments[1];
//
//            // 5. Let k be 0.
//            var k = 0;
//
//            // 6. Repeat, while k < len
//            while (k < len) {
//                // a. Let Pk be ! ToString(k).
//                // b. Let kValue be ? Get(O, Pk).
//                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
//                // d. If testResult is true, return kValue.
//                var kValue = o[k];
//                if (predicate.call(thisArg, kValue, k, o)) {
//                    return kValue;
//                }
//                // e. Increase k by 1.
//                k++;
//            }
//
//            // 7. Return undefined.
//            return undefined;
//        },
//        configurable: true,
//        writable: true
//    });
//}

/**
 * It Removes duplicates items
 * @param {Array} array
 * @return {Array|Array.uniq.newArray}
 */
Array.uniq = (array) => {
    if (!Array.isArray(array)) {
        throw new Error("parameter is not a array");
    }
    let newArray = [
    ];
    for (var item in array) {
        if (newArray.indexOf(array[item]) < 0) {
            newArray.push(array[item]);
        }
    }
    return newArray;
};