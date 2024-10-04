import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const FinancialProfile = ({ toggleFinancialInfo }) => {
  FinancialProfile.propTypes = {
    toggleFinancialInfo: PropTypes.string.isRequired,
  };
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="buisness-detail customar-detail w-100 "
    >
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}>Financial Info</h4>
        </div>
        <div className="button-box">
          <button
            className="   custom-btn  flex "
            onClick={toggleFinancialInfo}
          >
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>

      <div className="buissness-data ">
        <div className="" style={{ backgroundColor: "#f5f5f5" }}>
          <div
            className="pt-3"
            style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}
          >
            <p
              style={{
                borderBottom: "0.4px solid #979797",
                paddingBottom: "12px",
                fontWeight: "bold",
              }}
            >
              Settlement Account Details
            </p>
          </div>
          <div className="detail-content">
            <div>
              <p>
                Bank Name <span className="required">*</span>
              </p>
              <span className="extra-color">{applicationInput?.bank_name}</span>
            </div>

            <div>
              <p>
                Account Name <span className="required">*</span>
              </p>
              <span className="extra-color">
                {applicationInput?.bank_account_name}
              </span>
            </div>

            <div>
              <p>
                Sort Code <span className="required">*</span>
              </p>
              <span className="extra-color">
                {applicationInput?.bank_sort_code}
              </span>
            </div>

            <div>
              <p>
                Account Number <span className="required">*</span>
              </p>
              <span className="extra-color">
                {applicationInput?.bank_account_no}
              </span>
            </div>
          </div>
        </div>
        {/* --------------Trading Address----------------------- */}
      </div>
      <div className="buissness-data ">
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div
            className="pt-3"
            style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}
          >
            <p
              style={{
                borderBottom: "0.4px solid #979797",
                paddingBottom: "12px",
                fontWeight: "bold",
              }}
            >
              Direct Debit Account Details
            </p>
          </div>
          <div className="detail-content">
            <div>
              <p>Bank Name</p>
              <span className="extra-color">
                {applicationInput?.debit_bank_info[0]?.debit_bank_name}
              </span>
            </div>

            <div>
              <p>Account Name</p>
              <span className="extra-color">
                {applicationInput?.debit_bank_info[0]?.debit_bank_account_name}
              </span>
            </div>

            <div>
              <p>Sort Code</p>
              <span className="extra-color">
                {applicationInput?.debit_bank_info[0]?.debit_bank_sort_code}
              </span>
            </div>

            <div>
              <p>Account Number</p>
              <span className="extra-color">
                {applicationInput?.debit_bank_info[0]?.debit_bank_account_no}
              </span>
            </div>
          </div>
        </div>
        {/* --------------Trading Address----------------------- */}
      </div>
      <div className="detail-content">
        <div>
          <p>
            Faster Payments <span className="required">*</span>
          </p>
          <span className="extra-color">
            {parseInt(applicationInput.bank_faster_payments) === 1
              ? "Yes"
              : "No"}
          </span>
        </div>
        <div>
          <p>
          Cash Back <span className="required">*</span>
          </p>
          <span className="extra-color">
            {(applicationInput.cashback) === true
              ? "Yes"
              : "No"}
          </span>
        </div>
        <div>
          <p>
          Cash Back Amount<span className="required">*</span>
          </p>
          <span className="extra-color">
            {applicationInput.avg_cashback_amount }
          </span>
        </div>
        <div>
          <p>
            Payment Method <span className="required">*</span>
          </p>
          <span className="extra-color">
            {applicationInput?.payment_method}
          </span>
        </div>

        <div>
          <p>
            Funding Frequency <span className="required">*</span>
          </p>
          <span className="extra-color">
            {applicationInput?.funding_frequesncy}
          </span>
        </div>

        <div>
          <p>
            Billing Frequency <span className="required">*</span>
          </p>
          <span className="extra-color">
            {" "}
            {applicationInput?.billing_frequesncy}
          </span>
        </div>

        <div>
          <p>
            Settlement Method <span className="required">*</span>
          </p>
          <span className="extra-color">
            {" "}
            {applicationInput?.bank_settlement_method}
          </span>
        </div>

        <div>
          <p>
            Account <span className="required">*</span>
          </p>
          <span className="extra-color">
            {" "}
            {applicationInput?.bank_account_type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialProfile;
