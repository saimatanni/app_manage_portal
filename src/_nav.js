import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilAccountLogout,
  cilCursor,
  cilDescription,
  cilDrop,
  cilPencil,
  cilPuzzle,
  cilHome,
  cilLockLocked,
  cilUser,
  cilDollar,
} from "@coreui/icons";
import Cookies from "js-cookie"; // Import js-cookie
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

var userData;
const userDataCookie = Cookies.get("userData");
// const userData = JSON.parse(userDataCookie);

if (userDataCookie) {
  // If the cookie exists, parse it as JSON
  const userData = JSON.parse(userDataCookie);
  console.log("userData", userData);
} else {
  // Handle the case where the cookie does not exist
  console.log("userData cookie does not exist");
}

const handleLogout = () => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
  };
  try {
    // Clear the cookies
    Cookies.remove("is_ps_logged_in");
    Cookies.remove("access_token");
    Cookies.remove("userData");

    // Redirect to the login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } catch (error) {
    // Handle any errors here
    console.error("Logout error:", error);
    response.isLoading = false;
  }
};
const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
    ? null
    : {
        component: CNavItem,
        name: "Cost Analysis",
        to: "/cost-analysis",
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
  {
    component: CNavItem,
    name: "Revenue Calculator",
    to: "/revenue-calculator",
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavTitle,
  //   name: "Applications",
  // },
  {
    component: CNavGroup,
    name:
      userDataCookie && JSON.parse(userDataCookie)?.user_role === 2
        ? "Applications By Partner "
        : "Applications",
    to: "/accounts",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Leads",
        to: "/leads",
      },

      {
        component: CNavItem,
        name: "Opportunities",
        to: "/opportunity",
      },
      {
        component: CNavItem,
        name: "New Applications",
        to: "/new-application",
      },

      {
        component: CNavItem,
        name: "All Applications",
        to: "/all-application",
      },
    ],
  },

  userDataCookie &&
  (JSON.parse(userDataCookie)?.user_role === 8 ||
    JSON.parse(userDataCookie)?.user_role === 10)
    ? null
    : {
        component: CNavGroup,
        name: "Commissions Hub ",
        to: "/commission",
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: "Upfront Commissions ",
            to: "/upfront-commission",
          },
          {
            component: CNavItem,
            name: "Residuals",
            to: "/residual",
          },
          {
            component: CNavItem,
            name: "Commissions Statement",
            to: "/commission-statement",
          },
          {
            component: CNavItem,
            name: "Clawbacks ",
            to: "/clawback",
          },
        ],
      },
  userDataCookie && JSON.parse(userDataCookie)?.user_role === 9
    ? //  {
      //     component: CNavItem,
      //     name: "Sales Man",
      //     to: "/salesman-list",
      //     icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      //   },
      {
        component: CNavGroup,
        name: "User Management",
        to: "/user-management",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: "Users",
            to: "/salesman-list",
          },

          {
            component: CNavItem,
            name: "Statement for User",
            to: "/user-statement",
          },
          {
            component: CNavItem,
            name: "Invoice for User",
            to: "/user-invoice",
          },
        ],
      }
    : null,
  userDataCookie && JSON.parse(userDataCookie)?.user_role === 2
    ? {
        component: CNavItem,
        name: "Partners",
        to: "/partner-list",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      }
    : null,
  // {
  //   component: CNavTitle,
  //   name: "Others",
  // },
  userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
    ? null
    : {
        component: CNavItem,
        name: "Invoice",
        to: "/invoice",
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
      },
  userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
    ? null
    : {
        component: CNavItem,
        name: "Information Hub",
        to: "/information-hub",
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
      },
  // userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
  //   ? null
  //   : {
  //       component: CNavGroup,
  //       name: "Support",
  //       to: "/supports",
  //       icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //       items: [
  //         {
  //           component: CNavItem,
  //           name: "Tickets",
  //           to: "/tickets",
  //         },
  //         {
  //           component: CNavItem,
  //           name: "Tasks",
  //           to: "/tasks",
  //         },
  //         {
  //           component: CNavItem,
  //           name: "Chat",
  //           to: "/chat",
  //         },
  //       ],
  //     },
  // userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
  //   ? null
  //   : {
  //       component: CNavItem,
  //       name: "Calendar",
  //       to: "/calendar",
  //       icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  //     },
  userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
    ? null
    : {
        component: CNavItem,
        name: "Change Password",
        to: "/change-password",
        icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
      },
  {
    component: CNavItem,
    name: "Logout",
    to: "/login",
    onClick: handleLogout,
    icon: (
      <CIcon
        icon={cilAccountLogout}
        customClassName="nav-icon"
        onClick={handleLogout}
      />
    ),
  },
];

export default _nav;
