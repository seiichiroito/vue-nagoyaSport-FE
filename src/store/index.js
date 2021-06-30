import { createStore } from "vuex";

import authModule from "./auth/index.js";
import facilityModule from "./facility/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    facility: facilityModule,
  },
  state() {
    return {
      hello: "World",
    };
  },
  getters: {
    hello(state) {
      return state.hello;
    },
  },
});

export default store;
