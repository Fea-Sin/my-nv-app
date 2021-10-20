import { isArray } from "../src";
import { expect } from "chai";

describe("#isArray", () => {
  it("isArray base", () => {
    const arr1: any = [];
    const arr2 = "[]";
    const arr3 = {};
    expect(isArray(arr1)).to.equal(true);
    expect(isArray(arr2)).to.equal(false);
    expect(isArray(arr3)).to.equal(false);
  });
});
