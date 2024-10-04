/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  GetNotificationList,
  decodeToken,
} from "src/views/common/_redux/action/CommonAction";
import moment from "moment";

import axios from "axios";
import { GetAplicationDetails } from "src/views/accounts/NewApplication/_redux/action/ApplicationAction";
import Swal from "sweetalert2";
import "./Notification.css";

import CircularProgress from "@mui/material/CircularProgress";

import CookieService from "src/services/CookiService";
import { useState } from "react";
import PropTypes from "prop-types";
const NotificationList = ({ search }) => {
  NotificationList.propTypes = {
    search: PropTypes.string.isRequired,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationList = useSelector(
    (state) => state.commonInfo.notificationList
  );
  const isLoadCommon = useSelector((state) => state.commonInfo.isLoadCommon);

  const formatTimeAgo = (isoTime) => {
    const timeDiff = Date.now() - new Date(isoTime).getTime();
    const minutesAgo = Math.floor(timeDiff / (1000 * 60));

    if (minutesAgo < 1) {
      return "just now";
    } else if (minutesAgo < 60) {
      return `${minutesAgo} mins ago`;
    } else if (minutesAgo < 1440) {
      const hoursAgo = Math.floor(minutesAgo / 60);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else {
      // Use moment.js to format date when more than 24 hours
      return moment(isoTime).format("D/M/YYYY HH:mm");
    }
  };
  const handleNotificationView = (id, info, object_id) => {
    if (info && object_id ) {
      if (info === "Application") {
        // dispatch(GetLeadsnput("step", 3));
        markNotificationAsRead(id);
        dispatch(GetAplicationDetails(object_id));
        navigate(`/new-application-preview`);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: `${info} not found!`,
        icon: "error",
      });
    }
  };
  const encodedToken = CookieService.getCookie("access_token");
  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/${notificationId}/`,
        { is_read: true },
        { id: notificationId },
        {
          headers: {
            Authorization: `Token ${decodeToken(encodedToken)}`,
          },
        }
      );

      dispatch(
        GetNotificationList(
          `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/`
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = (event) => {
    event.stopPropagation(); // Prevent the click event from reaching the Menu
    // Handle the notification click logic
  };

  //load more

  // const limit = 5;

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const api = `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/?offset=${offset}&limit=${limit}`;

 
  const loadMore = () => {
    setLimit(limit + 10);

    dispatch(GetNotificationList(api, offset, limit));
  };
  // const loadLess = () => {
  //   setLimit(limit - 10);

  //   dispatch(GetNotificationList(api, offset, limit));
  // };
  useEffect(() => {
    // Initial load
    dispatch(
      GetNotificationList(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/?offset=${offset}&limit=${limit}&query=${search}`
      )
    );

    // // Add scroll listener
    // window.addEventListener("scroll", handleScroll);

    // // Remove scroll listener on component unmount
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [dispatch, search]);
  // if (isLoadCommon) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center h-100">
  //       <CircularProgress />
  //     </div>
  //   );
  // }
  return (
    <div onClick={handleNotificationClick}>
      <section className="">
        <div className=" ">
     

          <div className="notification-ui_dd-content">
            {/* <div className="notification-list "></div> */}
            {notificationList?.results?.data?.length < 1 ? (
              <div className="not_found ">
                <h4 className="my-4">No Data Found !</h4>
              </div>
            ) : (
              <>
                {notificationList?.results?.data?.map((notification) => (
                  <div
                    style={{
                      // background:
                      //   notification.is_read === false
                      //     ? "#061eb71a"
                      //     : "white",
                      // borderLeft:
                      //   notification.is_read === true && "2px solid #676a6c42",
                      cursor: "pointer",
                    }}
                    key={notification.id}
                    className={`notification-list ${
                      notification.is_read === false &&
                      " notification-list--unread"
                    }`}
                    // className="notification-list notification-list--unread"
                    onClick={() =>
                      handleNotificationView(
                        notification?.id,
                        notification?.object_info,
                        notification?.object_slug
                      )
                    }
                  >
                    <div
                      className="notification-list_content"
                      style={{
                        background:
                          notification.is_read === false
                            ? "#f9b1151a"
                            : "white",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            className="notification-list_detail"
                            // style={{
                            //   fontWeight:
                            //     notification.is_read === false ? "bold" : "normal",
                            // }}
                          >
                            <p>
                              <b
                                style={{
                                  fontWeight:
                                    notification.is_read === false
                                      ? "bold"
                                      : "bold",
                                }}
                              >
                                {notification?.action_user &&
                                  notification?.action_user?.first_name &&
                                  notification?.action_user?.first_name +
                                    " " +
                                    notification?.action_user?.last_name}
                              </b>{" "}
                              {notification.action_text}
                            </p>
                            {/* <b >{notification.message}</b> */}
                            <p
                              className="text-muted mt-2"
                              // style={{
                              //   fontWeight:
                              //     notification.is_read === false
                              //       ? "bold"
                              //       : "normal",
                              // }}
                            >
                              {notification.message}
                            </p>
                            <p className="text-muted mt-2">
                              <small
                                style={{
                                  color: "#888888",
                                  fontSize: "11px",
                                }}
                              >
                                {formatTimeAgo(notification.created_at)}
                              </small>
                            </p>
                          </div>
                        </div>
                        {/* <div className="col-md-2 text-end">
                          <p className="text-muted mt-2">
                            <small
                              style={{
                                color:
                                  notification.is_read === false && "#0dcaf0",
                                fontSize: "11px",
                              }}
                            >
                              {formatTimeAgo(notification.created_at)}
                            </small>
                          </p>
                        </div> */}
                      </div>
                    </div>
                    <hr style={{ margin: 0 }} />
                  </div>
                ))}
              </>
            )}
            {isLoadCommon && (
              <div className="d-flex justify-content-center align-items-center h-100">
                <CircularProgress />
              </div>
            )}
          </div>
          <div className="d-flex gap-1 justify-content-center">
            {/* {limit>10 && (
                  // {notificationList?.previous && (
              <div className="text-center" onClick={loadLess}>
                {" "}
                <Button variant="outlined" size="small" color="error" >See Less </Button>{" "}
              </div>
            )} */}
            {notificationList?.count > limit && (
              <div className="text-center" onClick={loadMore}>
                {/* <div className="text-center" onClick={handleNexteClick}> */}{" "}
                <a href="#" className="link-info">
                  See More
                </a>
                {/* <Button variant="outlined" size="small">
                  See more{" "}
                </Button>{" "} */}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationList;
