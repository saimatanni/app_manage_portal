import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import { useSelector,  } from "react-redux";
const Leads = ({ toggleLead }) => {
  Leads.propTypes = {
    toggleLead: PropTypes.string.isRequired,
  };
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const countryList = useSelector((state) => state.leadInfo.countryList);
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList);
  return (
 
      <div className="customar-detail">
        <div className="customar-detail-head w-100 fees-box">
          <div className="head-first">
            <img src={detailIcon} alt="" />
            <h4 style={{ color: "white" }}>Lead Details</h4>
          </div>
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
        </div>
        <div className="detail-content">
          <div>
            <p>
              First Name <span className="required">*</span>
            </p>
            <span>
              {applicationInput?.business_owners[0]?.owner_first_name}
            </span>
          </div>

          <div>
            <p>
              Last Name <span className="required">*</span>
            </p>
            <span>{applicationInput?.business_owners[0]?.owner_surname}</span>
          </div>

          <div>
            <p>
              Company/Legal Name <span className="required">*</span>
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
            <p>Telephone Number</p>
            <span>{applicationInput?.telephone}</span>
          </div>

          <div>
            <p>
              Mobile number <span className="required">*</span>
            </p>
            <span>{applicationInput?.mobile}</span>
          </div>

          <div>
            <p>
              Email <span className="required">*</span>
            </p>
            <span>{applicationInput?.email}</span>
          </div>

          <div>
            <p>Industry Type</p>
            {IndustryList?.map((option) => {
              return (
                <>
                  {parseInt(option.ptsave_industrytypeid) ===
                    parseInt(applicationInput?.industry_type) && (
                    <span
                      key={option.ptsave_industrytypeid}
                      value={option.ptsave_industrytypeid}
                    >
                      {option?.ptsave_name}
                    </span>
                  )}
                </>
              );
            })}
          </div>

          <div>
            <p>Website</p>
            <span>{applicationInput?.website}</span>
          </div>

          <div>
            <p>MCC Code</p>
            {IndustryList?.map((option) => {
              return (
                <>
                  {parseInt(option.ptsave_industrytypeid) ===
                    parseInt(applicationInput?.industry_type) && (
                    <span
                      key={option.ptsave_industrytypeid}
                      value={option.ptsave_industrytypeid}
                    >
                      {option?.ptsave_code}
                    </span>
                  )}
                </>
              );
            })}
          </div>
          <div>
              <p>Lead Owner</p>
              <span>{applicationInput?.lead_owner_name}</span>
            </div>
            <div>
              <p>Sales Partner</p>
              <span>{applicationInput?.sales_partner_name}</span>
            </div>
            <div>
              <p> Partner Manager</p>
              <span>{applicationInput?.partner_manager_name}</span>
            </div>
        </div>
        <div className="buissness-data">
          {/* --------------Trading Address----------------------- */}
          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}>
              <p
                style={{
                  borderBottom: "0.4px solid #979797",
                  paddingBottom: "12px",
                  fontWeight: "bold",
                }}
              >
                Trading Address Information
              </p>
            </div>
            <div className="detail-content">
              <div>
                <p>
                  Address 1<span className="required">*</span>
                </p>
                <span>
                  {""} {applicationInput?.trading_address1}
                </span>
              </div>
              <div>
                <p>Address 2</p>
                <span>
                  {""}
                  {applicationInput?.trading_address2}
                </span>
              </div>
              <div>
                <p>
                  City/Town<span className="required">*</span>
                </p>
                <span>
                  {""}
                  {applicationInput?.trading_city}
                </span>
              </div>
              <div>
                <p>
                  Post Code<span className="required">*</span>
                </p>
                <span>
                  {""}
                  {applicationInput?.trading_postcode}
                </span>
              </div>
              <div>
                <p>County</p>
                {countryList?.map((option) => {
                  return (
                    <>
                      {option.id === applicationInput?.trading_country && (
                        <span key={option.id} value={option.id}>
                          {option?.name}
                        </span>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* --------------Trading Address----------------------- */}
        </div>
        <div className="buissness-data">
          {/* --------------legal Address----------------------- */}
          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}>
              <p
                style={{
                  borderBottom: "0.4px solid #979797",
                  paddingBottom: "12px",
                  fontWeight: "bold",
                }}
              >
                Legal Address Information
              </p>
            </div>
            <div className="detail-content">
              <div>
                <p>
                  Address 1<span className="required">*</span>
                </p>
                <span>
                  {""}
                  {applicationInput?.legal_address1}
                </span>
              </div>
              <div>
                <p>Address 2</p>
                <span>
                  {""}
                  {applicationInput?.legal_address2}
                </span>
              </div>
              <div>
                <p>
                  City/Town<span className="required">*</span>
                </p>
                <span>
                  {""}
                  {applicationInput?.legal_city}
                </span>
              </div>
              <div>
                <p>
                  Post Code<span className="required">*</span>
                </p>
                <span>
                  {""}
                  {applicationInput?.legal_postcode}
                </span>
              </div>
              <div>
                <p>County</p>
                {countryList.map((option) => {
                  return (
                    <>
                      {option.id === applicationInput?.legal_country && (
                        <span key={option.id} value={option.id}>
                          {option?.name}
                        </span>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* --------------Trading Address----------------------- */}
        </div>
      </div>
   
  );
};

export default Leads;
