enum LogLevel {
  info = "info",
  wran = "warn",
  error = "error",
}

// Declare a tuple type
let x: [string, number];

x = ["hell", 8];

// x = [8, "tu"]

// any type
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// void type
function warnUser(): void {
  console.log("my function");
}

// interface

interface Point {
  x: number;
  y: number;
  z?: number;
  readonly l: number;
}

const point: Point = { x: 10, y: 20, z: 30, l: 79 };

// point.l = 300;

// function params and return type
function sum(a: number, b: number): number {
  return a + b;
}

// 交叉类型
interface foo {
  x: number;
}
interface bar {
  b: number;
}

type intersection = foo & bar;

const result: intersection = {
  x: 20,
  b: 40,
};

// Union types
type Arg = string | number | boolean;
const myfoo = (arg: Arg): void => {
  console.log(arg);
};

myfoo(2);
// myfoo(null)
myfoo("hello");
myfoo(true);
