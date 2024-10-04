import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
const ProtectedRoute = () => {
  const auth = useAuth();
  return <div>{auth ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoute;
