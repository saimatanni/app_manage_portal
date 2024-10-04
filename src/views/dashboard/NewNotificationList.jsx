import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CAvatar,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPeople } from "@coreui/icons";

import { useNavigate } from "react-router-dom";
import {
  GetNotificationList,
  decodeToken,
} from "src/views/common/_redux/action/CommonAction";
import moment from "moment";

import axios from "axios";
import { GetAplicationDetails } from "../accounts/NewApplication/_redux/action/ApplicationAction";
import Swal from "sweetalert2";
import CookieService from "src/services/CookiService";
const NewNotificationList = () => {
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
  useEffect(() => {
    dispatch(
      GetNotificationList(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/notification/`
      )
    );
  }, []);
  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Description
            </CTableHeaderCell>
            <CTableHeaderCell>Usage</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Is Read</CTableHeaderCell>
            <CTableHeaderCell>Activity</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {notificationList?.results?.data?.map((notification, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar color="secondary" status="danger">
                  CUI
                </CAvatar>
                {notification?.action_user &&
                  notification?.action_user?.first_name &&
                  notification?.action_user?.first_name +
                    " " +
                    notification?.action_user?.last_name}
              </CTableDataCell>
              <CTableDataCell>
                <div>
                  {notification?.action_text && notification?.action_text}
                </div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div className="small text-medium-emphasis">
                  {notification.message}
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">
                  <div className="float-start">
                    <strong>{80}%</strong>
                  </div>
                  <div className="float-end">
                    <small className="text-medium-emphasis">{40}</small>
                  </div>
                </div>
                <CProgress
                  thin
                  //   color={notification.usage.color}
                  value={20}
                />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <strong> {notification.is_read}</strong>
                {/* <CIcon size="xl" icon={notification.payment.icon} /> */}
              </CTableDataCell>
              <CTableDataCell>
                {/* <div className="small text-medium-emphasis">Last login</div> */}
                <strong> {formatTimeAgo(notification.created_at)}</strong>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default NewNotificationList;
