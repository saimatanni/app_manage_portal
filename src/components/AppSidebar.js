import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { showToast } from "src/utils/ToastHelper";
import { GetProfileDetails } from "src/views/common/_redux/action/CommonAction";

import nav_logo from "../assets/psImg/nav_logo.png";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import navigation from "../_nav";
import { IS_SIDEBAR_SHOW } from "src/views/pages/_redux/types/Types";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.loginInfo.sidebarShow);
  const profileDetails = useSelector(
    (state) => state.commonInfo.profileDetails
  );

  const [invoice, setInvoice] = useState([]);
  const userDataCookie = Cookies.get("userData");
  let userData;

  if (userDataCookie) {
    userData = JSON.parse(userDataCookie);
  }

  useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") === "true";
    if (!is_ps_logged_in || location.pathname === "/login") {
      // Redirect if not logged in or already on the login page
      navigate("/login");
      return; // Stop the execution of the rest of this useEffect
    }

    // Call API to fetch profile details and invoices
    dispatch(GetProfileDetails());
    const fetchData = () => {
      const url = `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?user=${userData.id}`;
      axios
        .get(url)
        .then((res) => {
          setInvoice(res?.data?.data?.results);
        })
        .catch((err) => {
          if (err.response === undefined) {
            showToast("error", "Internal Server Error.");
            // navigate("/login");
          } else if (err.response && err.response.status === 401) {
            showToast("error", "Session expired.");
            // navigate("/login");
          } else {
            showToast("error", "Something went wrong ");
          }
        });
    };

    // Call fetchData immediately and set up a timer for future calls
    fetchData();
    const intervalId = setInterval(fetchData, 30000); // 30 seconds interval

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const name = userData
    ? `${userData.first_name} ${userData.last_name}`
    : "User";
  function getFirstLetters(str) {
    const words = str.split(" ");
    const firstLetters = words.map((word) => word.charAt(0).toUpperCase());
    return firstLetters.join("");
  }
  return (
    <CSidebar
      position="fixed"
      show={sidebarShow}
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) =>
        dispatch({ type: IS_SIDEBAR_SHOW, payload: visible })
      }
    >
      <CSidebarBrand className="" to="/">
        <img
          className="mt-5 mb-3"
          src={profileDetails?.image_url ? profileDetails.image_url : nav_logo}
          style={{
            height: "82px",
            width: profileDetails?.image_url && "82px",
            // : "100%"
            objectFit: "cover",
            borderRadius: profileDetails?.image_url ? "50%" : 0,
          }}
          alt="User Profile"
        />
      </CSidebarBrand>
      <div
        className="py-2"
        style={{ textAlign: "center", backgroundColor: "#181430" }}
      >
        <h5 className="mx-3">{name}</h5>
        {userData && (
          <small style={{ opacity: ".6" }}>
            ( {getFirstLetters(userData.customer_type)} )
          </small>
        )}
      </div>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav
            items={navigation}
            invoice={invoice.unread_count}
            userData={userData}
          />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        style={{ backgroundColor: "#181430" }}
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
