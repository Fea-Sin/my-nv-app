import { remove } from "../src";
import { expect } from "chai";

describe("remove feature", () => {
  it("string array remove", () => {
    const arr = ["one", "two", "three"];
    remove(arr, "two");
    expect(arr).to.deep.equal(["one", "three"]);
  });

  it("number array remove", () => {
    const arr = [1, 2, 4, 5];
    remove(arr, 4);
    expect(arr).to.deep.equal([1, 2, 5]);
  });

  // object 是引用值，不是原始值
  it("object of array", () => {
    const arr = [{ a: 1 }, { b: 2 }, { c: 3 }];
    remove(arr, { b: 2 });
    expect(arr).to.not.equal([{ a: 1 }, { c: 3 }]);
  });
});
