/* 
 * The MIT License
 *
 * Copyright 2019 Sillas S. Leal<sillas.santos.leal@accenture.com>.
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


/* global module */

if (!module && window && !window.loadScript) {
    /**
     * Método que carrega um script de forma dinâmica
     * @param {String} url A url do script a ser carregado
     * @param {Function} callBack Função a ser chamada após o carregamento do Script
     * @returns {undefined}
     */
    window.loadScript = function (url, callBack) {
        let script = document.createElement('script');
        if (!script || (typeof script !== 'object' && Array.isARray(script))) {
            throw new Error("LOADSCRIPT: TAG_SCRIPT_NOT_FOUND");
        }
        script.type = 'text/javascript';
        script.src = url;
        if (!Array.isArray(document.getElementsByTagName('script')) && !document.getElementsByTagName('script')[0]) {
            throw new Error("LOADSCRIPT: NO_TAG_SCRIPT");
        }
        let firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
        if (typeof callBack === "function") {
            script.addEventListener('load', () => {
                //Antes de inicializar é preciso esperar o js ser carregado
                callBack();
            });
        }
    };
}