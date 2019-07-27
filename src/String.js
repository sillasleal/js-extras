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
 * @return {Boolean}
 */
String.isValid = function(target) {
  return Boolean(typeof target === 'string' && target.trim().length);
};

/**
 * Replace occurrences of search in string
 * @param {string} search
 * @param {string} replacement
 * @return {String}
 */
String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

/**
 * Replace first letter to uppercases
 * @return {String}
 */
String.prototype.ucFirst = function() {
  const target = this;
  return target.substr(0, 1).toUpperCase() + target.substr(1);
};

/**
 * Remove all acents of string
 * @return {String}
 */
String.prototype.removeAccents = function() {
  const target = this;
  let newString = '';
  const latin = {
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
    'ẽ': 'e',
    'ê': 'e',
    'É': 'E',
    'È': 'E',
    'Ë': 'E',
    'Ẽ': 'E',
    'Ê': 'E',

    'í': 'i',
    'ì': 'i',
    'ï': 'i',
    'ĩ': 'i',
    'î': 'i',
    'Í': 'I',
    'Ì': 'I',
    'Ï': 'I',
    'Ĩ': 'I',
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
    'ũ': 'u',
    'û': 'u',
    'Ú': 'U',
    'Ù': 'U',
    'Ü': 'U',
    'Ũ': 'U',
    'Û': 'U',

  };
  const split = target.split('');
  for (const item of split) {
    if (latin[item]) {
      newString += latin[item];
    } else {
      newString += item;
    }
  }
  /**/
  return newString;
};

/**
 * Determines whether one string may be found within another string.
 * @param {type} search
 * @return {Boolean}
 */
String.prototype.containsIgAccents = function(search) {
  if (typeof search !== 'string') {
    throw new TypeError('Parameter is not a string');
  }
  /**/
  const target = this.removeAccents();
  const newSearch = search.removeAccents();
  /**/
  return target.includes(newSearch);
};

String.ofValidValues = function(item) {
  if (Array.isArray(item)) {
    return item.filter((i) => i).join(' ');
  } else if (typeof item === 'object' && !Array.isArray(item) && item) {
    return Object.keys(item)
        .filter((i) => item[i])
        .join(' ');
  } else {
    return String(item);
  }
};
