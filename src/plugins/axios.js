import axios from "axios";
import store from "../store";

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// Set authorization token if exists
const token = localStorage.getItem("token");
if (token && token !== "Bearer undefined") {
  axios.defaults.headers.common["Authorization"] = token;
}

// Set language header
const language = localStorage.getItem("languageUniversal");
if (language) {
  axios.defaults.headers.common["lang"] = language;
}

// Set proper Content-Type
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

axios.interceptors.response.use(
  (response) => {
    console.log("Response received", response);

    // Check if response is HTML (ngrok warning page)
    if (typeof response.data === "string" && response.data.includes("ngrok")) {
      console.error("NGROK WARNING PAGE DETECTED!");
      alert(
        "⚠️ ngrok warning page detected! Please open " +
          process.env.VUE_APP_API +
          " in a new tab and click 'Visit Site' first."
      );

      const ngrokUrl = process.env.VUE_APP_API.replace("/api/", "");
      window.open(ngrokUrl, "_blank");

      return Promise.reject(new Error("ngrok warning page"));
    }

    if (
      response.data.code === -1 ||
      response.data.code === -2 ||
      response.data.code === -3
    ) {
      store.dispatch("logout");
    }
    return response;
  },
  (error) => {
    console.log("Error occurred", error);
    console.log("Error response:", error.response);
    console.log("Error message:", error.message);

    // Handle 401 unauthorized
    if (error.response && error.response.status === 401) {
      store.dispatch("logout");
    }

    return Promise.reject(error);
  }
);

export default axios;
