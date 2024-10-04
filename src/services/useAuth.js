import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuth() {
  const [auth, setAuth] = useState(Cookies.get("is_ps_logged_in") === "true");
  const navigate = useNavigate();
  const location = useLocation();
  console.log('auth', auth)
  useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") === "true";
    setAuth(is_ps_logged_in);
    if (!is_ps_logged_in || location.pathname === "/login") {
      // Redirect if not logged in or already on the login page
      navigate("/login");
      return; // Stop the execution of the rest of this useEffect
    }
  }, [location.pathname, navigate]);

  return auth;
}
