import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter about C", () => {
  const wrapper = mount(Counter);

  it("init count", () => {
    expect(wrapper.vm.count).to.equal(0);
  });

  it("button click count increment", async () => {
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.find(".count-box").text()).to.equal("1");
  });
});
