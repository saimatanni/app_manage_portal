import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import { useSelector,  } from "react-redux";
import PropTypes from "prop-types";
import Cookies from 'js-cookie'; // Import js-cookie
const LeadInfoPreview = ({ toggleLead }) => {
  LeadInfoPreview.propTypes = {
    toggleLead: PropTypes.string.isRequired,
  };
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const userData = JSON.parse(Cookies.get("userData"));
  return (
    <div className="customar-detail">
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}>Lead Quality</h4>
        </div>
        {userData?.customer_type !== "Partner Manager" && (
          <div className="button-box">
            <button className="  custom-btn  flex " onClick={toggleLead}>
              <img
                width={19}
                height={17}
                src={pen}
                style={{ marginRight: "7px" }}
                alt=""
              />
              <span style={{ fontSize: "14px" }}>Edit</span>
            </button>
          </div>
        )}
      </div>
      <div className="detail-content">
        <div>
          <p>
            Lead_type <span className="required">*</span>
          </p>
          <span>
            {leadInput?.lead_type === 0
              ? "HOT"
              : leadInput?.lead_type === 1
              ? "COLD"
              : "WARM"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeadInfoPreview;
