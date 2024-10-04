import axios from "axios";

import CookieService from "./CookiService"; // Import the CookieService

import { showToast } from "src/utils/ToastHelper";


function decodeToken(encodedToken) {
  if (encodedToken) {
    const decodedChars = [];
    for (let i = 0; i < encodedToken.length; i++) {
      decodedChars.push(String.fromCharCode(encodedToken.charCodeAt(i) - 1));
    }

    return decodedChars.join("");
  }

 
}
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Custom decoding function

    const encodedToken = CookieService.getCookie("access_token"); // Retrieve the token from the cookie

    const token = decodeToken(encodedToken);
    if (token) {
      config.headers["Authorization"] = "Token " + token;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {

    const statusCode = JSON.parse(error.request.response).code;
    console.log("statusCode", statusCode);
    if (statusCode === 401) {
      // Handle token expiration here
       window.location.href = "/"
      // Redirect to the login page or perform any other desired actions
      CookieService.removeCookie("is_ps_logged_in");
      CookieService.removeCookie("access_token");
      CookieService.removeCookie("userData");
      CookieService.removeCookie("is_remember_me");
      CookieService.removeCookie("is_ps_remember_me");

   
    }
    if (statusCode === 404) {
      // Handle 404 error by redirecting to the "not found" route
      showToast("error", "404! ,Not found");
      // navigate(`/404`); // Change the path to match your "not found" route
    }
    if (
      statusCode === 500 ||
      statusCode === 501 ||
      statusCode === 502 ||
      statusCode === 503 ||
      statusCode === 504 ||
      statusCode === 505
    ) {
      showToast("error", `${statusCode}, Server error !`);
    }
    return Promise.reject(error);
  }
);
