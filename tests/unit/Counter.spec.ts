import { nextTick } from "vue";
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter.vue", () => {
  it("increment count when button is clicked", async () => {
    const wrapper = shallowMount(Counter);
    wrapper.find("button").trigger("click");
    await nextTick();
    expect(wrapper.find(".count-box").text()).to.equal("1");
  });
});
