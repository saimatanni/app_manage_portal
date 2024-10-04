import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { GetCountryList } from "../../Leads/_redux/action/LeadAction";
const CustomarDetails = ({ toggleCustomerDetail }) => {
  CustomarDetails.propTypes = {
    toggleCustomerDetail: PropTypes.string.isRequired,
  };
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const countryList = useSelector((state) => state.leadInfo.countryList);
 
  useEffect(() => {
    GetCountryList();
  }, []);

  //   const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();
  // const hour = date.getHours();
  // const minute = date.getMinutes();

  // const formattedDate = `${day}/${month}/${year} at ${hour}:${minute.toString().padStart(2, '0')}`;
  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="buisness-detail customar-detail w-100 "
    >
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}>Customer Details</h4>
        </div>
        <div className="button-box">
          <button
            className="   custom-btn  flex "
            onClick={toggleCustomerDetail}
          >
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>
      {applicationInput?.business_owners?.map((item, index) => {
        return (
          <>
            <div
              className="detail-content mt-3"
              style={{ position: "relative" }}
            >
              <p
                style={{
                  borderBottom: "0.4px solid #979797",
                  position: "absolute",
                  top: "1px",
                  left: "7px",
                  fontWeight: "bold",
                  color: "cornflowerblue",
                }}
              >
                Contact : {index + 1}
              </p>
              <div>
                <p>
                  Title <span className="required">*</span>
                </p>
                <span>{item.owner_title}</span>
              </div>

              <div>
                <p>
                  First Name <span className="required">*</span>
                </p>
                <span> {item?.owner_first_name}</span>
              </div>

              <div>
                <p>
                  Last Name <span className="required">*</span>
                </p>
                <span>{item?.owner_surname}</span>
              </div>

              <div>
                <p>
                  DOB <span className="required">*</span>
                </p>
                {item?.contact_dob ? (
                  <span>
                    {item?.contact_dob && new Date(item?.contact_dob).getDate()}
                    /
                    {item?.contact_dob &&
                      new Date(item?.contact_dob).getMonth() + 1}
                    /
                    {item?.contact_dob &&
                      new Date(item?.contact_dob).getFullYear()}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <p>
                  Responsible Party <span className="required">*</span>
                </p>
                <span>
                  {item?.is_responsible_party === true ? "Yes" : "No"}
                </span>
              </div>

              <div>
                <p>
                  Owner Email <span className="required">*</span>
                </p>
                <span>{item?.owner_email}</span>
              </div>

              <div>
                <p>
                  Phone Number <span className="required">*</span>
                </p>
                <span>{item?.owner_phone_no}</span>
              </div>

              <div>
                <p>
                  ID Number <span className="required">*</span>
                </p>
                <span>{item?.owner_id_num}</span>
              </div>
              {/* <div>
                <p>
                Issuer ID  <span className="required">*</span>
                </p>
                <span>{item?.issuer_id}</span>
              </div> */}

              <div>
                <p>
                  Issue Date <span className="required">*</span>
                </p>
                {item?.owner_issue_date ? (
                  <span>
                    {new Date(item?.owner_issue_date).getDate()}/
                    {new Date(item?.owner_issue_date).getMonth() + 1}/
                    {new Date(item?.owner_issue_date).getFullYear()}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <p>
                  Expiry Date <span className="required">*</span>
                </p>
                {item?.owner_expiry_date ? (
                  <span>
                    {new Date(item?.owner_expiry_date).getDate()}/
                    {new Date(item?.owner_expiry_date).getMonth() + 1}/
                    {new Date(item?.owner_expiry_date).getFullYear()}
                    {/* at {new Date(item?.owner_expiry_date).getHours()}:{new Date(item?.owner_expiry_date).getMinutes().toString().padStart(2, '0')} */}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div>
                <p>
                  Nationality <span className="required">*</span>
                </p>
                {countryList?.map((option) => {
                  return (
                    <>
                      {option.id === item.owner_nationality && (
                        <span key={option.id} value={option.id}>
                          {option.nationality}
                        </span>
                      )}
                    </>
                  );
                })}
              </div>

              <div>
                <p>
                  Is main principal? <span className="required">*</span>
                </p>
                <span>{item?.is_main_principal === true ? "Yes" : "No"}</span>
              </div>

              <div>
                <p>
                  Is beneficial Owner? <span className="required">*</span>
                </p>
                <span>{item?.is_beneficial_owner === true ? "Yes" : "No"}</span>
              </div>

              <div>
                <p>
                  Is signatory? <span className="required">*</span>
                </p>
                <span>{item?.is_signatory === true ? "Yes" : "No"}</span>
              </div>
              <div>
                <p>
                  Is Partnership? <span className="required">*</span>
                </p>
                <span>{item?.is_partnership === true ? "Yes" : "No"}</span>
              </div>
              <div>
                <p>
                  Ownership Percentage <span className="required">*</span>
                </p>
                <span>{item?.ownership_perc}</span>
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
                    Private Residential Address
                  </p>
                </div>
                <div className="detail-content">
                  <div>
                    <p>
                      Address 1<span className="required">*</span>
                    </p>
                    <span>
                      {item?.business_owner_contacts[0]?.street_line_1}
                    </span>
                  </div>
                  <div>
                    <p>Address 2</p>
                    <span>{item?.business_owner_contacts[0]?.locality}</span>
                  </div>
                  <div>
                    <p>
                      City/Town<span className="required">*</span>
                    </p>
                    <span>{item?.business_owner_contacts[0]?.city}</span>
                  </div>
                  <div>
                    <p>
                      Post Code<span className="required">*</span>
                    </p>
                    <span>{item?.business_owner_contacts[0]?.zip_code}</span>
                  </div>
                  <div>
                    <p>County</p>
                    <span>{item?.business_owner_contacts[0]?.county_code}</span>
                  </div>
                  <div>
                    <p>Country</p>
                    {countryList?.map((option) => {
                      return (
                        <>
                          {option.id ===
                            item?.business_owner_contacts[0]?.country_code && (
                            <span key={option.id} value={option.id}>
                              {option.name}
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
            <hr />
          </>
        );
      })}
    </div>
  );
};

export default CustomarDetails;
