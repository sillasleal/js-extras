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


if (window && !window.className) {
    /**
     * Método que gera o nome da classe do componente
     * @returns {String} Retorna as classes devidamente concatenadas
     */
    window.className = () => {
        let className = "";
        /**/
        for (var indexArguments in arguments) {
            switch (typeof arguments[indexArguments]) {
                case "object":
                    if (arguments[indexArguments]) {
                        if (Array.isArray(arguments[indexArguments])) {
                            for (var indexArrayArguments in arguments[indexArguments]) {
                                className += `${window.className(arguments[indexArguments][indexArrayArguments])} `;
                            }
                        } else {
                            for (var indexObjectArguments in arguments[indexArguments]) {
                                switch (typeof arguments[indexArguments][indexObjectArguments]) {
                                    case 'function':
                                        if (arguments[indexArguments][indexObjectArguments]()) {
                                            className += `${window.className(indexObjectArguments)} `;
                                        }
                                        break;
                                    case 'object':
                                        className += `${window.className(indexObjectArguments, arguments[indexArguments][indexObjectArguments])} `;
                                        break;
                                    default:
                                        if (arguments[indexArguments][indexObjectArguments]) {
                                            className += `${window.className(indexObjectArguments)} `;
                                        }
                                        break;
                                }
                            }
                        }
                    }
                    break;
                case 'function':
                    className += `${window.className(arguments[indexArguments]())} `;
                    break;
                default:
                    className += `${String(arguments[indexArguments])} `;
                    break;
            }
        }
        /**/
        return  className.trim();
    };
}