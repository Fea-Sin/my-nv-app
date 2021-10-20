import { expect } from "chai";
import { isSet } from "../src";

describe("#isSet", () => {
  it("isSet base", () => {
    const set = new Set(["one", "two"]);
    const b = ["one", "two"];
    expect(isSet(set)).to.equal(true);
    expect(isSet(b)).to.equal(false);
  });
});
