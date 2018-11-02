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

//
//if (!Object.assign) {
//    Object.defineProperty(Object, 'assign', {
//        enumerable: false,
//        configurable: true,
//        writable: true,
//        value: function (target) {
//            'use strict';
//            if (target === undefined || target === null) {
//                throw new TypeError('Cannot convert first argument to object');
//            }
//
//            var to = Object(target);
//            for (var i = 1; i < arguments.length; i++) {
//                var nextSource = arguments[i];
//                if (nextSource === undefined || nextSource === null) {
//                    continue;
//                }
//                nextSource = Object(nextSource);
//
//                var keysArray = Object.keys(Object(nextSource));
//                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
//                    var nextKey = keysArray[nextIndex];
//                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
//                    if (desc !== undefined && desc.enumerable) {
//                        to[nextKey] = nextSource[nextKey];
//                    }
//                }
//            }
//            return to;
//        }
//    });
//}

Object.defineProperty(Object, 'isObject', {
    writable: true,
    /**
     * Simple object check.
     * @param {mixed} item
     * @returns {boolean}
     * @link <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
     */
    value: (item) => {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
});
/**
 * Assign deeep objects
 * @param {object} target
 * @param {object} sources
 * @returns {object}
 */
Object.assignDeep = (target, ...sources) => {
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();

    if (Object.isObject(target) && Object.isObject(source)) {
        for (const key in source) {
            if (Object.isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, {
                        [key]: {}
                    });
                Object.assignDeep(target[key], source[key]);
            } else {
                Object.assign(target, {
                    [key]: source[key]
                });
            }
        }
    }
    /**/
    return Object.assignDeep(target, ...sources);
};

/**
 * Method that read a prop or subprop of object and return this
 * @param {object} object
 * @param {string} prop
 * @param {mixed} defaultValue 
 * @returns {Object.readProp.ret|@arr;ret|obj}
 */
Object.readProp = (object, prop, defaultValue) => {
    let props = typeof prop === "string" && prop.length ? prop.split(".") : [];
    let ret = Object.isObject(object) ? object : {};
    /**/
    if (props.length) {
        for (let i = 0; i < (props.length); i++) {
            if (ret[props[i]] === undefined) {
                return defaultValue;
            }
            ret = ret[props[i]];
        }
        /**/
        return ret;
    } else {
        return object;
    }
};

if (!Object.values) {
    /**
     * Método que retorna os values do objeto em um array
     * Método criado poi o IE não possui o método values
     * @param {object} object O objeto
     * @returns {Array} Retorna um array contendo os valores das propriedades do objeto
     */
    Object.values = function (object) {
        let ret = [];
        if (Object.isObject(object)) {
            Object.keys(object).forEach((prop) => {
                ret.push(object[prop]);
            });
        }
        /**/
        return ret;
    };
}