import { expect } from "chai";

describe("js mocha test es6", () => {
  it("es6 file arr 1", () => {
    expect([1, 2, 3].indexOf(5)).to.equal(-1);
  });
  it("es6 file arr 2", () => {
    expect([1, 2, 3].indexOf(3)).to.equal(2);
  });
});
