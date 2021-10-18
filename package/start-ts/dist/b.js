var LogLevel;
(function (LogLevel) {
    LogLevel["info"] = "info";
    LogLevel["wran"] = "warn";
    LogLevel["error"] = "error";
})(LogLevel || (LogLevel = {}));
// Declare a tuple type
var x;
x = ["hell", 8];
// x = [8, "tu"]
// any type
var notSure = 4;
notSure = "maybe a string";
notSure = false;
// void type
function warnUser() {
    console.log("my function");
}
var point = { x: 10, y: 20, z: 30, l: 79 };
// point.l = 300;
// function params and return type
function sum(a, b) {
    return a + b;
}
var result = {
    x: 20,
    b: 40
};
var myfoo = function (arg) {
    console.log(arg);
};
myfoo(2);
// myfoo(null)
myfoo("hello");
myfoo(true);
