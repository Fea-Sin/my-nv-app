import { expect } from "chai";
import { isObject } from "../src";

describe("#isObject", () => {
  it("isObject base", () => {
    const obj = { a: 1 };
    const b = "{}";
    expect(isObject(obj)).to.equal(true);
    expect(isObject(b)).to.equal(false);
  });
});
