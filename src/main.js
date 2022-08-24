import { createApp } from "vue";
import store from "./store";

import App from "@/App";

import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";

const app = createApp(App);

app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);

app.use(store);

app.mount("#app");
