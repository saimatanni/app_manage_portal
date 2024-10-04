import React, { Suspense } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// routes config
import routes from "../routes";
import Loader from "src/utils/Loader";
import Cookies from "js-cookie";

const AppContent = () => {
  const navigate = useNavigate();
  var userData;
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const userDataCookie = Cookies.get("userData");
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, [navigate]);
  if (userDataCookie) {
    userData = JSON.parse(userDataCookie);
    // Now you can use the parsed userData object
  } else {
    // Handle the case where the cookie is not set or is empty
    // You might want to provide a default value or perform some other action
  }

  return (
    // <CContainer >
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element &&
            route?.Permissions && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          );
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
    // </CContainer>
  );
};

export default React.memo(AppContent);
