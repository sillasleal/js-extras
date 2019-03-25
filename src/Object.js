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
 * Test if item is a real object
 * @param {mixed} item
 * @returns {Boolean}
 */
Object.isObject = function (item) {
    return (Boolean(item) && typeof item === 'object' && !Array.isArray(item));
};
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
    let props = (typeof prop === "string" && prop.length)
            ? prop.split(".")
            : [];
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
        return defaultValue;
    }
};

/**
 * Method that check if object is empyt
 * @param {object} object The object to be tested
 * @returns {Boolean} Return TRUE if exists properties in object or FALSE if not
 */
Object.isEmpyt = function (object) {
    return Object.isObject(object) && Boolean(Object.keys(object).length);
};