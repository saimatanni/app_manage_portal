import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { NavLink, useNavigate } from 'react-router-dom'
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";

import { IS_SIDEBAR_SHOW } from "src/views/pages/_redux/types/Types";

// import { useEffect } from "react";
// import { GetNotificationList } from "src/views/common/_redux/action/CommonAction";
import Cookies from "js-cookie"; // Import js-cookie


const AppHeader = () => {
const navigate=useNavigate()

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.loginInfo.sidebarShow);

  // useEffect(() => {
  //   dispatch(
  //     GetNotificationList(
  //       `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/`
  //     )
  //   );
  // }, []);
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
   
  }, [navigate]);
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            dispatch({ type: IS_SIDEBAR_SHOW, payload: !sidebarShow })
          }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
         
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
