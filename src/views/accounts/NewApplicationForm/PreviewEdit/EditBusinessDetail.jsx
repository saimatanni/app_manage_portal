import React from 'react'
import detailIcon from '../../../../assets/img/detail-icon.svg'

import PropTypes from "prop-types";
import BusinessDetails from '../BusinessDetails';

const EditBusinessDetail = ({toggleBusinessDetail}) => {
    EditBusinessDetail.propTypes = {
        toggleBusinessDetail: PropTypes.string.isRequired,
      };
  return (
    <div className="customar-detail">
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}>Edit Business Detail</h4>
        </div>
        <div className="button-box">
          <button className="  custom-btn  flex mx-2" onClick={toggleBusinessDetail}>
            <span style={{ fontSize: "14px" }}>Cancel</span>
          </button>
          <button className="  custom-btn  flex " onClick={toggleBusinessDetail}>
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
      <BusinessDetails/>
    </div>
  )
}

export default EditBusinessDetail