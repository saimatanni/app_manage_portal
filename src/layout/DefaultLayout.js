import React from "react";
import { AppContent, AppSidebar, AppHeader } from "../components/index";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { useLocation } from "react-router-dom";
import routes from "src/routes";
import Page404 from "src/views/pages/page404/Page404";
const DefaultLayout = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const isPathvalid = routes.some((route) => route.path === location.pathname);
  if (location.pathname === `/`) {
    navigate("/dashboard", { replace: true });
  } else if (!isPathvalid) {
    return <Page404 />;
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div
          className="body flex-grow-1 p-4"
          style={{
            backgroundColor:
              location.pathname.includes("dashboard") === true
                ? " #eff1f3"
                : "#fff",
            marginTop: "-23px",
          }}
        >
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
