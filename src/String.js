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
String.prototype.isValid = function (target) {
    return typeof target === 'string' && target.length;
};

/**
 * Replace occurrences of search in string
 * @param {string} search
 * @param {string} replacement
 * @returns {String}
 */
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/**
 * Replace first letter to uppercases
 * @returns {String}
 */
String.prototype.ucFirst = function () {
    var target = this;
    return target.substr(0, 1).toUpperCase() + target.substr(1);
};

/**
 * Remove all acents of string
 * @returns {String}
 */
String.prototype.removeAccents = function () {
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
String.prototype.containsIgAccents = function (search) {
    if (typeof search !== "string") {
        throw new TypeError("Parameter is not a string");
    }
    /**/
    var target = this.removeAccents();
    var newSearch = search.removeAccents();
    /**/
    return target.includes(newSearch);
};

if (!String.prototype.repeat) {
    /**
     * The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.
     * @param {String} count An integer between 0 and +∞: [0, +∞), indicating the number of times to repeat the string in the newly-created string that is to be returned.
     * @returns {String} A new string containing the specified number of copies of the given string.
     * @link <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat>
     */
    String.prototype.repeat = function (count) {
        'use strict';
        if (this === null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count !== count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count === Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length === 0 || count === 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (var i = 0; i < count; i++) {
            rpt += str;
        }
        return rpt;
    };
}