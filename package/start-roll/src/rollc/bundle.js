(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  let count = 0;

  function increment() {
    count += 1;
  }

  console.log("count--->", count);
  increment();
  console.log("count--->", count);

  // Error: Illegal reassignment to import "count"
  // count += 10;

}));
