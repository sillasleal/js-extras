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
 * @return {Boolean}
 */
Object.isObject = function(item) {
  return (Boolean(item) && typeof item === 'object' && !Array.isArray(item));
};
/**
 * Assign deeep objects
 * @param {object} target
 * @param {object} sources
 * @return {object}
 */
Object.assignDeep = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  /* istanbul ignore else */
  if (Object.isObject(target) && Object.isObject(source)) {
    for (const key in source) {
      if (Object.isObject(source[key])) {
        /* istanbul ignore else */
        if (!target[key]) {
          Object.assign(target, {
            [key]: { },
          });
        }
        Object.assignDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }
  /**/
  return Object.assignDeep(target, ...sources);
};

/**
 * Method that check if object is empyt
 * @param {object} object The object to be tested
 * @return {Boolean} Return FALSE if exists properties in object or TRUE if not
 */
Object.isEmpyt = function(object) {
  return !(Object.isObject(object) && Boolean(Object.keys(object).length));
};

/**
 * Method that read a prop or subprop of object and return this
 * @param {object} object
 * @param {string} propsData
 * @param {mixed} defaultValue
 * @return {Object.readProp.ret|@arr;ret|obj}
 */
Object.readProp = function(object, propsData, defaultValue) {
  if (Object.isObject(propsData)) {
    const {
      path,
      test,
    } = propsData;
    const value = Object.readProp(object, path);
    const validate = typeof test === 'function'
        ?
        test
        : (v) => v !== undefined && v !== null;
    return validate(value)
        ? value
        : defaultValue;
  } else if (typeof propsData === 'string') {
    const props = propsData.split('.');
    let ret = typeof object === 'object' && object
        ? object
        : { };
    /**/
    for (let i = 0; i < (props.length); i++) {
      if (
        ret[props[i]] === undefined ||
          (i < (props.length - 1) && ret[props[i]] === null)
      ) {
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
 * Função que atribui um subvalor para um dado objeto
 * @param {object} obj O objeto que receberá o valor
 * @param {String} props As propriedades a serem gravadas
 * @param {mixed} value O valor a ser atribuido
 * @return {undefined}
 */
Object.writeProp = function(obj, props, value) {
  if (!Object.isObject(obj)) {
    throw new Error('Object.writeProp only works with objects!');
  }
  if (!String.isValid(props) && !Array.isArray(props)) {
    throw new Error('props in Object.writeProp need to be a string!');
  }
  if (Array.isArray(props) && !props.length) {
    throw new Error('props like array need to have elements');
  }
  /**/
  const keys = Array.isArray(props)
      ? props
      : props.split('.');
  /**/
  let o = obj;
  const len = keys.length;
  /**/
  for (let i = 0; i < len - 1; i++) {
    const key = keys[i];
    if (!o[key]) {
      o[key] = {};
    }
    o = o[key];
  }
  /**/
  o[keys[len - 1]] = value;
};
