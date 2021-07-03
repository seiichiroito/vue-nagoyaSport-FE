import axios from "axios";
export default {
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;

    let url;
    if (mode === "login") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }
    const response = await fetch(url + import.meta.env.VITE_FIREBASE_API_KEY, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Failed to authentication."
      );
      throw error;
    }

    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("email", responseData.email);
    localStorage.setItem("refreshToken", responseData.refreshToken);

    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
      refreshToken: responseData.refreshToken,
      email: responseData.email,
    });
  },
  async sendVerifyEmail(context) {
    const token = context.getters.token;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=";

    const response = await fetch(url + import.meta.env.VITE_FIREBASE_API_KEY, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        requestType: "VERIFY_EMAIL",
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Failed to change email."
      );
      throw error;
    }
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");

    context.commit("setUser", {
      userId: null,
      token: null,
      refreshToken: null,
      email: null,
    });
  },
  autoLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const email = localStorage.getItem("email");

    if (!userId || !token) {
      return;
    }

    context.commit("setUser", {
      userId,
      token,
      refreshToken,
      email,
    });
  },
  async changeEmail(context, payload) {
    await context.dispatch("exchangeIdToken");

    const token = context.getters.token;
    let refreshToken = context.getters.refreshToken;
    const email = context.getters.email;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";

    const response = await fetch(url + import.meta.env.VITE_FIREBASE_API_KEY, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        email: payload.email,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Failed to change email."
      );
      throw error;
    }

    if (responseData.email !== email) {
      refreshToken = responseData.refreshToken;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("email", responseData.email);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("refreshToken", refreshToken);

    context.commit("setUser", {
      userId: responseData.localId,
      token,
      refreshToken: refreshToken,
      email: responseData.email,
    });
  },
  async changePassword(context, payload) {
    await context.dispatch("exchangeIdToken");

    const token = context.getters.token;
    // let refreshToken = context.getters.refreshToken;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";

    const response = await fetch(url + import.meta.env.VITE_FIREBASE_API_KEY, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: payload.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Failed to change password."
      );
      throw error;
    }

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("email", responseData.email);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("refreshToken", responseData.refreshToken);

    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
      refreshToken: responseData.refreshToken,
      email: responseData.email,
    });
  },

  async exchangeIdToken(context) {
    const email = context.getters.email;
    const refreshToken = context.getters.refreshToken;

    if (!refreshToken) {
      return;
    }

    const url = "https://securetoken.googleapis.com/v1/token?key=";
    const response = await fetch(url + import.meta.env.VITE_FIREBASE_API_KEY, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Failed to refresh token."
      );
      throw error;
    }

    localStorage.setItem("token", responseData.id_token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", responseData.user_id);
    localStorage.setItem("email", email);
    context.commit("setUser", {
      userId: responseData.user_id,
      token: responseData.id_token,
      refreshToken: refreshToken,
      email: email,
    });
  },
};
