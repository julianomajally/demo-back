/**
 * src/config/http.js
 */

const axios = require("axios");
const qs = require("qs");

const url = process.env.HUBSPOT_URL;
const timeout = process.env.TIMEOUT;

/**
 * axios instance
 */
let instance = axios.create({
  baseURL: url,
  timeout: timeout,
});

instance.interceptors.request.use(
  async function (config) {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    config.params = {
      hapikey: process.env.HAPIKEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response parse
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response) {
      throw error.response;
    } else {
      return Promise.reject(error);
    }
  }
);

/**
 *
 * parse error response
 */
function parseError(error) {
  // error
  if (error) {
    if (error.status === 403) {
      localStorage.removeItem(sessionStorageKeys.token);
      // refreshToken();
      return Promise.reject({ message: "Forbidden Access" });
    } else if (error.status === 401) {
      localStorage.removeItem(sessionStorageKeys.token);
      // refreshToken();
      return Promise.reject({ message: "Session Expired" });
    } else {
      return Promise.reject({ message: error.data.message });
    }
  } else {
    return Promise.reject({ message: "Something Went Wrong" });
  }
}

exports.http = instance;
