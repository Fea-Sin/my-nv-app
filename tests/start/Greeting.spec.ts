import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Greeting from "@/components/Greeting.vue";
import HiComponent from "@/components/HiComponent.vue";

describe("greeting component", () => {
  /*= 1 =*/
  it("component attribute", () => {
    const wrapper = shallowMount(Greeting);
    expect(wrapper.attributes("id")).to.equal("greet");
  });
  /*= 2 =*/
  it("component classes", () => {
    const wrapper = shallowMount(Greeting);
    expect(wrapper.find(".myBox").classes()).to.deep.equal(["active", "myBox"]);
  });
  /*= 3 =*/
  it("component classes name", () => {
    const wrapper = shallowMount(Greeting);
    expect(wrapper.find(".myBox").classes("select")).to.equal(false);
  });
  /*= 4 =*/
  it("component contains", () => {
    const wrapper = shallowMount(Greeting);
    expect(wrapper.find("p").text()).to.equal("this is a element");
  });
  /*= 5 =*/
  it("component html", () => {
    const wrapper = shallowMount(Greeting);
    expect(wrapper.find(".foo").html()).to.equal(
      `<div class="foo"><div>Foo</div></div>`
    );
  });

  it("component findComponent", () => {
    const wrapper = shallowMount(Greeting);
    const Hi = wrapper.findComponent(HiComponent);
    expect(Hi.exists()).to.equal(true);
  });
});
