console.log("------ reduce ------");

const a = [0, 1, 2, , 3, , 4].reduce((accumlator, current, index) => {
  console.log("reduce index--->", index);
  return accumlator + current;
});

console.log("a--->", a);

const b = [1, 2, 3, 4].reduce((accumlator, current, index) => {
  console.log("reduce index--->", index);
  return accumlator + current;
}, 5);

console.log("b--->", b);
