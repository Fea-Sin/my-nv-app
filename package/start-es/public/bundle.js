(function () {
  'use strict';

  let count = 0;

  function increment() {
    count += 3;
  }

  let re = /quick\s(brown).+?(jumps)/dgi;
  const str = "The Quick Brown Fox Jumps Over The Lazy Dog";
  const result = re.exec(str);

  console.log(`start--> ${count}`);
  increment();
  increment();

  console.log(`start--> ${count}`);

  console.log(result);

})();
//# sourceMappingURL=bundle.js.map
