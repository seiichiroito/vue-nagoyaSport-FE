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
      notification: {},
    };
  },
  getters: {
    notification(state) {
      return state.notification;
    },
  },
  actions: {
    clearNotification(context) {
      context.commit("setNotification", {});
    },
    showNotification(context, payload) {
      context.commit("setNotification", payload);
    },
  },
  mutations: {
    setNotification(state, payload) {
      state.notification = {
        type: payload.type,
        messages: payload.messages,
      };
    },
  },
});

export default store;
