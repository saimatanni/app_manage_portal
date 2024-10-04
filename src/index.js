// import "react-app-polyfill/ie11"; // For IE 11 support
// import "react-app-polyfill/stable";
// import "core-js";
// import "./polyfill";
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
// // import { createStore, applyMiddleware } from "redux";
// import "react-toastify/dist/ReactToastify.css";

// import { Provider } from "react-redux";
// import Store from "./redux/store/Store";
// // import store from './store'
// //Import Toast
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
// import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
// // Import axios.js so that it can inject token in every request
// require("./services/axios");
// //Toaster
// //FOnt Awesome




// ReactDOM.render(
//   <Provider store={Store()}>
//     <App />   <ToastContainer />
//   </Provider>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();


import React from "react";
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import Store from "./redux/store/Store";
import { ToastContainer,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client"; // updated import statement



require("./services/axios");
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // use createRoot from "react-dom/client"

root.render(
  <Provider store={Store()}>
    <BrowserRouter>
      <App /> <ToastContainer />
    </BrowserRouter>
  </Provider>
);
serviceWorker.register()
reportWebVitals();
