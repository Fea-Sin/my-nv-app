import YesNoComponent from "@/components/YesNoComponent.vue";
import { shallowMount } from "@vue/test-utils";
import sinon from "sinon";

describe("YesNoComponent", () => {
  it("click on yes button calls our method with argument yes", async () => {
    const spy = sinon.spy();

    const wrapper = shallowMount(YesNoComponent, {
      props: {
        callMe: spy,
      },
    });
    await wrapper.find("button.yes").trigger("click");

    spy.calledWith("yes");
  });
});
