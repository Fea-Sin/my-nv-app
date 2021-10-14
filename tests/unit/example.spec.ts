import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });

  it("manipulates state", async () => {
    const m_wrapper = shallowMount(HelloWorld);
    const m_text = "manipulates props";
    await m_wrapper.setProps({ msg: m_text });
    expect(m_wrapper.text()).to.include(m_text);
  });
});
