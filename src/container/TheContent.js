import React, { Suspense } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { CContainer } from "@coreui/react";

// routes config
import routes from "../routes";
import ApplicationRoute from "src/EboardComponents/routes/ApplicationRoute";

const loading = (
  <div
    className="d-flex align-items-center justify-content-center "
    style={{ minHeight: "100vh" }}
  >
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const TheContent = () => {
  const newRoutes = routes.concat(ApplicationRoute);
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Routes>
            {newRoutes.map((route, idx) => {
          
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
