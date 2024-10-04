import React, { Component, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import "../src/views/dashboard/Dashboard.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ProtectedRoute from "./services/ProtectedRoute";
// Containers
import Loader from "src/utils/Loader";
const loading = (
  <div
    className="d-flex align-items-center justify-content-center "
    style={{ minHeight: "100vh" }}
  >
    {/* <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div> */}
    <Loader/>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const Reset = React.lazy(() => import("./views/pages/Reset/Reset.jsx"));

class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          {/* <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          /> */}
          <Route exact path="/reset" name="Reset Page" element={<Reset />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {/* <Route exact path="*" name="Home" element={<DefaultLayout />} /> */}
          <Route path="/*" element={<ProtectedRoute />}>
            <Route path="*" element={<DefaultLayout />} />
          </Route>
          {/* <Route path="/" element={<DefaultLayout />} /> */}
          {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
      </Suspense>
      // </BrowserRouter>
    );
  }
}

export default App;
