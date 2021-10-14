import { mount, shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

const wrapper = mount(Counter);

// 通过`wrapper.vm` 访问实际的Vue实例
// eslint-disable-next-line
const vm = wrapper.vm;

// console.log("vm---->", vm);
// console.log("wrapper---->", wrapper);

// eslint-disable-next-line
const shallowWrapper = shallowMount(Counter);

// console.log("shallow wrapper---->", shallowWrapper.vm);
