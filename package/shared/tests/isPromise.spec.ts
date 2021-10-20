import { expect } from "chai";
import { isPromise } from "../src";

describe("#isPromise", () => {
  it("isPromise base", () => {
    const a = new Promise((resolve) => {
      resolve("a");
    });
    expect(isPromise(a)).to.equal(true);
  });
});
