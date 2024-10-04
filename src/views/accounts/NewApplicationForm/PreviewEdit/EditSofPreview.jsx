import React from 'react'
import AppScheduleOfFees from '../AppScheduleOfFees'
import PropTypes from "prop-types";
import detailIcon from '../../../../assets/img/detail-icon.svg'

const EditSofPreview = ({ toggleSof }) => {
    EditSofPreview.propTypes= {
        toggleSof: PropTypes.string.isRequired,
      };
  return (
    <div className="customar-detail">
    <div className="customar-detail-head w-100 fees-box">
    <div className="head-first">
      <img src={detailIcon} alt="" />
      <h4 style={{ color: "white" }}>Edit Schedule Of Fees</h4>
    </div>
    <div className="button-box">
      <button className="  custom-btn mx-2 flex " onClick={toggleSof}>
        <span style={{ fontSize: "14px" }}>Cancel</span>
      </button>
      <button className="  custom-btn  flex " onClick={toggleSof}>
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
  <AppScheduleOfFees/>
</div>
  )
}

export default EditSofPreview