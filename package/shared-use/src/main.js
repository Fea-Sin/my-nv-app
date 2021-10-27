import Person from "./person";
import { remove, isPlainObject } from "@nvapp/shared";
// import { join } from "lodash/array";

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

const arr = ["a", "n", "p", "l"];

remove(arr, "p");

const oba = {};

console.log("plain-object--->", isPlainObject(oba));

// console.log("npm link shared--->", join(arr, "~"));
console.log("npm link shared--->", arr);

console.log("babel rollup--->", Hello);

export default Hello;
