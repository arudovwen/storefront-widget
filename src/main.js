import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "vue3-toastify/dist/index.css";
import "./assets/tailwind.css";
import "./assets/main.scss";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia); // Use the created Pinia instance
app.use(router);

app.mount("#app");
