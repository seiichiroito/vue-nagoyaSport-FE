import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  state() {
    return {
      userId: null,
      token: null,
      email: null,
    };
  },
  getters,
  mutations,
  actions,
};
