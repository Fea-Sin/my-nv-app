import Person from "./person";

const myobj = {
  a: "Hello World",
  b: "vue3js",
};

const Hello = {
  id: 42,
  ...myobj,
};

const hi = new Person();

hi.toSay();

console.log("babel rollup--->", Hello);

export default Hello;
