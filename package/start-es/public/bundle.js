(function () {
  'use strict';

  let count = 0;

  function increment() {
    count += 3;
  }

  let re = /quick\s(brown).+?(jumps)/dgi;
  const str$1 = "The Quick Brown Fox Jumps Over The Lazy Dog";
  const result = re.exec(str$1);

  const reg = /[\d{1,2}]/;
  const str = "[90] this is a test about 42";

  var execIndex = reg.exec(str);

  console.log(`start--> ${count}`);
  increment();
  increment();

  console.log(`start--> ${count}`);

  console.log(result);

  console.log(execIndex);

})();
//# sourceMappingURL=bundle.js.map
