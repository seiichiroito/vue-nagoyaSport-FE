import auth from ".";

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

    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
      email: responseData.email,
    });
    context.dispatch("sendVerifyEmail");
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
    localStorage.removeItem("userData");

    context.commit("setUser", {
      userId: null,
      token: null,
      email: null,
    });
  },
  autoLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!userId || !token) {
      return;
    }

    context.commit("setUser", {
      userId,
      token,
      email,
    });
  },
  async changeEmail(context, payload) {
    const token = context.getters.token;

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
    console.log(responseData);

    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("email", responseData.email);
    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
      email: responseData.email,
    });
  },
};
