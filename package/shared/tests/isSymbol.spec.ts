import { expect } from "chai";
import { isSymbol } from "../src";

describe("#isSymbol", () => {
  it("isSymbol base", () => {
    const a = Symbol("foo");
    const b = "symbol";

    expect(isSymbol(a)).to.equal(true);
    expect(isSymbol(b)).to.equal(false);
  });
});
