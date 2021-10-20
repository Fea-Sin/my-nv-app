import { expect } from "chai";
import { hasOwn } from "../src";

describe("#hasOwn", () => {
  it("hasOwn object base", () => {
    const obj = {
      a: 1,
      b: 3,
    };
    expect(hasOwn(obj, "b")).to.equal(true);
    expect(hasOwn(obj, "toString")).to.equal(false);
  });

  it("hasOwn array base", () => {
    const arr = ["a", "n", "p"];
    expect(hasOwn(arr, "2")).to.equal(true);
  });
});
