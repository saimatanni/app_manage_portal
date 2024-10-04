import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const BuisnessDetails = ({ toggleBusinessDetail }) => {
  BuisnessDetails.propTypes = {
    toggleBusinessDetail: PropTypes.string.isRequired,
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
          <h4 style={{ color: "white" }}>Business Details</h4>
        </div>
        <div className="button-box">
          <button
            className="   custom-btn  flex "
            onClick={toggleBusinessDetail}
          >
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>
      <div className="detail-content">
        <div>
          <p>Business Type <span className="required">*</span></p>
          <span>
            {applicationInput.legal_type === "ST"
              ? "Sole Trade"
              : applicationInput.legal_type === "L" ||applicationInput.legal_type === "LLP" ||applicationInput.legal_type === "PL"
              ? "LIMITED"
              :  "Partnership (e.g. Others)"}
          </span>
        </div>

        <div>
          <p>
            Legal Name <span className="required">*</span>
          </p>
          <span>{applicationInput?.legal_name}</span>
        </div>

        <div>
          <p>
            Trading Name <span className="required">*</span>
          </p>
          <span>{applicationInput?.trading_name}</span>
        </div>

        <div>
          <p>CRN / UTR</p>
          <span>{applicationInput?.company_house_no}</span>
        </div>

        <div>
          <p>
            Mobile number <span className="required">*</span>
          </p>
          <span>{applicationInput?.mobile}</span>
        </div>

        <div>
          <p>Incorporation Date</p>

          {applicationInput.incorporated_on ? (
                <span>
                  {/* {applicationInput?.incorporated_on} */}
                  {applicationInput.incorporated_on &&
                    new Date(applicationInput?.incorporated_on).getDate()}
                  /
                  {applicationInput.incorporated_on &&
                    new Date(applicationInput?.incorporated_on).getMonth() + 1}
                  /
                  {applicationInput.incorporated_on &&
                    new Date(applicationInput?.incorporated_on).getFullYear()}
                </span>
              ) : (
                ""
              )}
        </div>
        <div>
          <p>Current Ownership  Date</p>

          {applicationInput.current_ownership_since ? (
                <span>
                  {/* {applicationInput?.current_ownership_since} */}
                  {applicationInput.current_ownership_since &&
                    new Date(applicationInput?.current_ownership_since).getDate()}
                  /
                  {applicationInput.current_ownership_since &&
                    new Date(applicationInput?.current_ownership_since).getMonth() + 1}
                  /
                  {applicationInput.current_ownership_since &&
                    new Date(applicationInput?.current_ownership_since).getFullYear()}
                </span>
              ) : (
                ""
              )}
        </div>

        <div>
          <p>Telephone Number</p>
          <span>{applicationInput?.telephone}</span>
        </div>

        <div>
          <p>
            Email <span className="required">*</span>
          </p>
          <span>{applicationInput?.email}</span>
        </div>

        <div>
          <p>Vat Details </p>
          <span>
            {" "}
            {applicationInput?.vat_enabled === 0 ? (
              <span>Vat number</span>
            ) : applicationInput?.vat_enabled === 1 ? (
              <span>Vat number pending</span>
            ) : (
              <span>In business confirmation</span>
            )}
          </span>
        </div>
        {applicationInput.vat_enabled === 0 && (
          <>
            <div>
              <p>Vat Number</p>
              <span> {applicationInput?.tax_id}</span>
            </div>
          </>
        )}

        <div>
          <p>New to Card Process</p>
          <span>
            {applicationInput?.new_to_card_proccessing === true ? "Yes" : "No"}
          </span>
        </div>

        <div>
          <p>Old Provider</p>
          <span>{applicationInput?.previous_acquirer}</span>
        </div>

        <div>
          <p>Notes</p>
          <span>{applicationInput?.note}</span>
        </div>
      </div>
    </div>
  );
};

export default BuisnessDetails;
