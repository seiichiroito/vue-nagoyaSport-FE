export default {
  setUser(state, payload) {
    // console.log(payload);
    state.refreshToken = payload.refreshToken;
    state.userId = payload.userId;
    state.token = payload.token;
    state.email = payload.email;
  },
  setEmailVerify(state, payload) {
    state.isEmailVerified = payload;
  },
};
