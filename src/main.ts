import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/index.less";
const app = createApp(App);

app.config.unwrapInjectedRef = true;

app.use(store).use(router).mount("#app");
