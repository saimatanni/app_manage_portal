import React from "react";
import NotificationList from "src/components/NotificationList";

import { CBadge } from "@coreui/react";
import { useSelector } from "react-redux";
import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const DashboardNotification = () => {
  const [search, setSearch] = useState("");
  const notificationList = useSelector(
    (state) => state.commonInfo.notificationList
  );

  return (
    
      <div
        className="p-4 notification_detail_card mb-4"
        style={{ minHeight: "645px" }}
      >
        <div className="d-flex gap-2  align-items-center justify-content-between mb-3">
          <div className="d-flex gap-1 align-items-center ">
            <h2 className="m-0">Notification List </h2>{" "}
            {notificationList?.results?.unread_count > 0 && (
              <CBadge color="danger" shape="rounded-pill">
                {notificationList?.results?.unread_count}
              </CBadge>
            )}
          </div>
          <InputGroup style={{width:"auto"}}>
            <InputGroup.Text id="basic-addon1">
              <BiSearch />
              {/* <img style={{ height: "20px" }} src={search2} alt="" /> */}
            </InputGroup.Text>
            <Form.Control
              style={{
                boxShadow: "0 0 0 0.25rem rgb(139 163 199 / 25%) !important",
              }}
              aria-label="Username"
              aria-describedby="basic-addon1"
              placeholder="Search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        <div
          className="notification-list-container"
          style={{ height: "calc(100% - 3.5rem)" }}
        >
          {/* <NewNotificationList/> */}
          <NotificationList search={search} />
        </div>
      </div>
   
  );
};

export default DashboardNotification;
