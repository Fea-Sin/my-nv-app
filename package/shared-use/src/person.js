export default class Person {
  name = "Rollup + Babel Person";
  age = 42;

  toSay() {
    console.log(`HI: ${this.name}, ${this.age}`);
  }
}
