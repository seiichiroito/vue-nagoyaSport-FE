export default {
  userId(state) {
    if (!state.userId) {
      return state.userId;
    } else {
      return state.userId.slice(0, 8);
    }
  },
  token(state) {
    return state.token;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
};
