import axios from "axios";
import store from "../store";

axios.defaults.baseURL = process.env.VUE_APP_API;
// axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;

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
// axios.defaults.headers.common["HOST"] = "jeraan-1.onrender.com";

// Request interceptor for logging
axios.interceptors.request.use(
  (config) => {
    console.log("Axios Request:", {
      url: config.url,
      method: config.method.toUpperCase(),
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor (your existing + enhanced logging)
axios.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", {
      url: response.config.url,
      status: response.status,
      headers: response.headers,
      data: response.data,
    });

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

    // Your existing handling...
    if (error.response && error.response.status === 401) {
      store.dispatch("logout");
    }

    return Promise.reject(error);
  }
);

export default axios;
