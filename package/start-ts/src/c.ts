function say<T>(arg: T): T {
  // console.log(arg.length);
  return arg;
}

const hello = "hello vue3js";

say(hello);

// 泛型约束
interface Lengthwise {
  length: number;
}

function sayA<T extends Lengthwise>(arg: T): number {
  console.log(arg.length);
  return arg.length;
}

// function overloading

// function add(arg1: string, arg2: string): string
// function add(arg1: number, arg2: number): number

function add<T, U>(arg1: T, arg2: U) {
  if (typeof arg1 === "string" && typeof arg2 === "string") {
    return arg1 + arg2;
  }
  if (typeof arg1 === "number" && typeof arg2 === "number") {
    return arg1 + arg2;
  }
}

add(1, 2); // 3
add("1", "2"); // '12'
