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
  refreshToken(state) {
    return state.refreshToken;
  },
  email(state) {
    return state.email;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
  isEmailVerified(state) {
    return state.isEmailVerified;
  },
};
