import { createStore } from "vuex";

import transportModule from "./modules/publicTransport/index";

const store = createStore({
  modules: {
    transport: transportModule,
  },
  state() {},
});

export default store;
