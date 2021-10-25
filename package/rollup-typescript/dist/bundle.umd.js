(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MyRollupTypeScript = factory());
})(this, (function () { 'use strict';

    function add(x, y) {
        return x + y;
    }
    function substract(x, y) {
        return x - y;
    }

    const x = 20;
    const y = 12;
    console.log(`${x} + ${y} = ${add(x, y)}`);
    console.log(`${x} - ${y} = ${substract(x, y)}`);

    return substract;

}));
