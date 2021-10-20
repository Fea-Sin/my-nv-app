import { expect } from "chai";
import { isFunction } from "../src";

describe("#isFunction", () => {
  it("isFunction base", () => {
    const fun = () => {};
    expect(isFunction(fun)).to.equal(true);
    expect(isFunction("hello")).to.equal(false);
  });
});
