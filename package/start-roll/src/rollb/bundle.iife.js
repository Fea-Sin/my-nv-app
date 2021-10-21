var RollB = (function () {
  'use strict';

  let count$1 = 0;

  function increment$1() {
    count$1 += 1;
  }

  var incrementCjs = {
    count: count$1,
    increment: increment$1,
  };

  const { count, increment } = incrementCjs;

  console.log("count--->", count);
  increment();
  console.log("count--->", count);

  // count += 100;
  console.log("count--->", count);

  var bCjs = {

  };

  return bCjs;

})();
