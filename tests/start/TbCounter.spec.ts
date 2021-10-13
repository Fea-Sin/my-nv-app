import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter", () => {
  const wrapper = mount(Counter);

  it("renders the correct element", () => {
    expect(wrapper.html()).to.contain(`<div class="count-box">0</div>`);
  });

  // 也便与检查已经存在的元素
  it("has a button", () => {
    expect(wrapper.find("button").text()).to.equal("自增");
  });
});
