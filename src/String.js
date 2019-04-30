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

/* global Infinity */

/**
 * Check if the target is a valid String
 * @param {type} target
 * @returns {Boolean}
 */
String.isValid = function (target) {
    return Boolean(typeof target === 'string' && target.trim().length);
};

/**
 * Replace occurrences of search in string
 * @param {string} search
 * @param {string} replacement
 * @returns {String}
 */
String.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/**
 * Replace first letter to uppercases
 * @returns {String}
 */
String.ucFirst = function () {
    var target = this;
    return target.substr(0, 1).toUpperCase() + target.substr(1);
};

/**
 * Remove all acents of string
 * @returns {String}
 */
String.removeAccents = function () {
    var target = this;
    var newString = "";
    var latin = {
        'á': 'a',
        'à': 'a',
        'ä': 'a',
        'ã': 'a',
        'â': 'a',
        'Á': 'A',
        'À': 'A',
        'Ä': 'A',
        'Ã': 'A',
        'Â': 'A',

        'é': 'e',
        'è': 'e',
        'ë': 'e',
//        '˜e': 'e',
        'ê': 'e',
        'É': 'E',
        'È': 'E',
        'Ë': 'E',
//        '˜E': 'E',
        'Ê': 'E',

        'í': 'i',
        'ì': 'i',
        'ï': 'i',
//        '˜i': 'i',
        'î': 'i',
        'Í': 'I',
        'Ì': 'I',
        'Ï': 'I',
//        '˜I': 'I',
        'Î': 'I',

        'ó': 'o',
        'ò': 'o',
        'ö': 'o',
        'õ': 'o',
        'ô': 'o',
        'Ó': 'O',
        'Ò': 'O',
        'Ö': 'O',
        'Õ': 'O',
        'Ô': 'O',

        'ú': 'u',
        'ù': 'u',
        'ü': 'u',
//        '˜u': 'u',
        'û': 'u',
        'Ú': 'U',
        'Ù': 'U',
        'Ü': 'U',
//        '˜U': 'U',
        'Û': 'U'

    };
    var split = target.split("");
    for (var item in split) {
        if (latin[split[item]]) {
            newString += latin[split[item]];
        } else {
            newString += split[item];
        }
    }
    /**/
    return newString;
};

/**
 * Determines whether one string may be found within another string.
 * @param {type} search
 * @returns {Boolean}
 */
String.containsIgAccents = function (search) {
    if (typeof search !== "string") {
        throw new TypeError("Parameter is not a string");
    }
    /**/
    var target = this.removeAccents();
    var newSearch = search.removeAccents();
    /**/
    return target.includes(newSearch);
};


if (!String.stringOfValidValues) {
    class StringOfValues {
        getString() {
            let newString = "";
            /**/
            for (var indexArguments in arguments) {
                if (!isNaN(indexArguments)) {
                    if (typeof arguments[indexArguments] === "object") {
                        if (arguments[indexArguments]) {
                            if (Array.isArray(arguments[indexArguments])) {
                                for (var indexArrayArguments in arguments[indexArguments]) {
                                    newString += `${this.getString(arguments[indexArguments][indexArrayArguments])} `;
                                }
                            } else {
                                for (var indexObjectArguments in arguments[indexArguments]) {
                                    if (typeof (arguments[indexArguments][indexObjectArguments]) === 'function') {
                                        newString += `${this.getString(indexObjectArguments, arguments[indexArguments][indexObjectArguments])} `;
                                    } else {
                                        if (arguments[indexArguments][indexObjectArguments]) {
                                            newString += `${indexObjectArguments} `;
                                        }
                                    }
                                }
                            }
                        }
                    } else if (typeof arguments[indexArguments] === 'function') {
//                    newString += `${arguments[indexArguments]()} `;
                        newString += `${this.getString(arguments[indexArguments]())} `;
                    } else {
                        newString += `${String(arguments[indexArguments])} `;
                    }
                }
            }
            /**/
            return  newString.trim();
        }
    }
    const stringOfValues = new StringOfValues();
    String.stringOfValidValues = function () {
        return stringOfValues.getString(...arguments);
    };
}