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
        responseData.message || "Failed to authentication."
      );
      throw error;
    }

    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("token", responseData.idToken);
    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
    });
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
  autoLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      return;
    }

    context.commit("setUser", {
      userId,
      token,
    });
  },
};
