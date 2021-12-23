let result;

import("./foo").then(({ default: foo }) => {
  result = foo + "and exama index";
});

export default result;
