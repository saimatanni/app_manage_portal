import React from "react";
import PropTypes from "prop-types";
import detailIcon from "../../../../assets/img/detail-icon.svg";

import { useDispatch, useSelector } from "react-redux";
import { GetLeadsnput, UpdateLeads } from "../_redux/action/LeadAction";
const EditLeadPreview = ({ toggleLead }) => {
  EditLeadPreview.propTypes = {
    toggleLead: PropTypes.string.isRequired,
  };
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const dispatch = useDispatch();
  const handleEditLead = (data) => {
    dispatch(UpdateLeads(data));
  };
  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));
  };
  return (
    <div className="customar-detail">
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}>Edit Lead Quality</h4>
        </div>
        <div className="button-box">
          <button
            style={{ fontSize: "14px", background: "red" }}
            className="custom-btn  flex mx-2"
            onClick={toggleLead}
          >
            <span>Cancel</span>
          </button>
          <button
            className=" custom-btn  flex "
            //  onClick={toggleLead}
            onClick={() => {
              toggleLead();
              handleEditLead(leadInput);
            }}
          >
            <img
              width={19}
              height={17}
              src={detailIcon}
              style={{ marginRight: "7px" }}
              alt=""
            />
            <span style={{ fontSize: "14px" }}>Done</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="row align-items-center mb-3">
          <div className="col-md-2">
            <strong
              style={{
                fontWeight: "700",
                fontSize: "14px",
                color: "#3c4b64",
              }}
            >
          Lead Quality:
            </strong>
          </div>
          <div className="col-md-10">
            <button
              className={`${
                leadInput.lead_type === 0 ? "active_basic_btn" : "basic_btn"
              }`}
              onClick={() => handleChangeInput("lead_type", 0)}
            >
              Hot
            </button>
            <button
              className={`${
                leadInput.lead_type === 1 ? "active_basic_btn" : "basic_btn"
              }`}
              onClick={() => handleChangeInput("lead_type", 1)}
            >
              Cold
            </button>
            <button
              className={`${
                leadInput.lead_type === 2 ? "active_basic_btn" : "basic_btn"
              }`}
              onClick={() => handleChangeInput("lead_type", 2)}
            >
              Warm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLeadPreview;
