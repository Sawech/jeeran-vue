import { createStore } from "vuex";
import axios from "../plugins/axios"; // Use your configured axios for everything

export default createStore({
  state: {
    token: null,
    fullName: "",
    role: "",
    loggedIn: true,
    dashboardData: {},
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
    },
    user(state, userData) {
      state.fullName = userData.fullName;
      state.role = userData.role;
    },
    clearAuthData(state) {
      state.token = null;
    },
    loginFailureData(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    dashboard(state, dashboardData) {
      state.dashboardData = dashboardData;
    },
  },
  actions: {
    login({ commit }, authData) {
      axios
        .post("auth/login", {
          mobile_or_email: authData.mobile_or_email,
          password: authData.password,
          loginType: "admin",
        })
        .then((response) => {
          console.log("response =", response);
          if (response.data.code == 200) {
            console.log("hiiiii");
            const token = "Bearer" + " " + response.data.data.access_token;

            // Update axios headers immediately after getting token
            axios.defaults.headers.common["Authorization"] = token;
            axios.defaults.headers.common["lang"] = "ar";

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", response.data.data.user.role.type);
            localStorage.setItem("fullName", response.data.data.user.name);
            localStorage.setItem("email", response.data.data.user.email);
            localStorage.setItem("languageUniversal", "ar");

            const role = response.data.data.user.role.type;

            // Now fetch dashboard with updated axios instance
            console.log("About to fetch dashboard, token:", token);
            console.log("Axios baseURL:", axios.defaults.baseURL);

            axios
              .get("admin/dashboard")
              .then((dashResponse) => {
                if (dashResponse.data.code == 200) {
                  let dashboard = dashResponse.data.data;
                  dashboard.languageUniversal = "ar";
                  commit("dashboard", dashboard);
                  localStorage.setItem("dashboard", JSON.stringify(dashboard));
                  commit("authUser", {
                    token: token,
                  });
                  commit("loginFailureData", true);

                  console.log("About to redirect, role:", role);

                  // Redirect based on role
                  if (role == "admin") {
                    window.location.href = "/";
                  } else if (role == "button_operator") {
                    window.location.href = "/button-case";
                  } else if (role == "sewing_worker") {
                    window.location.href = "/sewing-case";
                  } else if (role == "shear_factor") {
                    window.location.href = "/cut-case";
                  } else if (role == "seller") {
                    window.location.href = "/orders";
                  } else {
                    window.location.href = "/login";
                  }
                } else {
                  console.log(
                    "Dashboard response code not 200:",
                    dashResponse.data.code
                  );
                }
              })
              .catch((error) => {
                console.log("Dashboard error:", error);
                console.log("Dashboard error response:", error.response);
                console.log("Dashboard error message:", error.message);
                // Even if dashboard fails, you might want to redirect
              });
          } else if (response.data.code == "-4") {
            commit("loginFailureData", false);
          }
        })
        .catch((error) => {
          console.log("Login error:", error.response);
          console.error("Axios Response Error:", {
            url: error.config ? error.config.url : "unknown",
            message: error.message,
            response: error.response
              ? {
                  status: error.response.status,
                  headers: error.response.headers,
                  data: error.response.data,
                }
              : "No response",
          });
        });

      axios
        .post("auth/login", {
          mobile_or_email: authData.mobile_or_email,
          password: authData.password,
          loginType: "admin",
        })
        .then((response) => console.log("reseponse 2 =", response))
        .catch((err) => console.log("err =", err.response));
    },

    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      commit("authUser", {
        token: token,
      });

      const fullName = localStorage.getItem("fullName");
      const role = localStorage.getItem("role");

      commit("user", {
        fullName: fullName,
        role: role,
      });
    },

    logout({ commit }) {
      axios
        .get("auth/logout")
        .then((response) => {
          console.log(response);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("fullName");
          localStorage.removeItem("email");
          localStorage.removeItem("languageUniversal");
          localStorage.removeItem("dashboard");
          commit("clearAuthData");
          window.location.href = "/login";
        })
        .catch((error) => {
          console.log(error);
          // Even if logout fails, clear local data
          localStorage.clear();
          window.location.href = "/login";
        });
    },
  },
  modules: {},
});
