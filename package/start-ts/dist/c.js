function say(arg) {
    // console.log(arg.length);
    return arg;
}
var hello = "hello vue3js";
say(hello);
function sayA(arg) {
    console.log(arg.length);
    return arg.length;
}
// function overloading
// function add(arg1: string, arg2: string): string
// function add(arg1: number, arg2: number): number
function add(arg1, arg2) {
    if (typeof arg1 === "string" && typeof arg2 === "string") {
        return arg1 + arg2;
    }
    if (typeof arg1 === "number" && typeof arg2 === "number") {
        return arg1 + arg2;
    }
}
add(1, 2); // 3
add("1", "2"); // '12'
