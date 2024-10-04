import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const SiteVisit = ({ toggleSiteVisit }) => {
  SiteVisit.propTypes = {
    toggleSiteVisit: PropTypes.string.isRequired,
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
          <h4 style={{ color: "white" }}>Site Visit</h4>
        </div>
        <div className="button-box">
          <button className="   custom-btn  flex " onClick={toggleSiteVisit}>
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>
      <div className="detail-content">
        <div>
          <p>
            Legal Name <span className="required">*</span>
          </p>
          <span className="extra-color">{applicationInput?.legal_name}</span>
        </div>

        <div>
          <p>
            Trading Name <span className="required">*</span>
          </p>
          <span className="extra-color">{applicationInput?.trading_name}</span>
        </div>
        <div>
          <p>
            {" "}
            Location Type:<span className="required">*</span>
          </p>
          {applicationInput?.s_location_type === "SHOPPING_CENTRE" ? (
            <span className="extra-color"> Shopping center</span>
          ) : applicationInput?.s_location_type === "OFFICE_BUILDING" ? (
            <span className="extra-color"> Office Building</span>
          ) : applicationInput?.s_location_type === "INDUSTRIAL_ESTATE" ? (
            <span className="extra-color"> Industrial Estate</span>
          ) : applicationInput?.s_location_type === "HOME" ? (
            <span className="extra-color">Home</span>
          ) : (
            <span className="extra-color">Other</span>
          )}
        </div>
        {applicationInput.s_location_type === "OTHER" && (
          <div>
            <p>
              Specific Location<span className="required">*</span>
            </p>

            <span className="extra-color">
              {applicationInput.s_specific_location}
            </span>
          </div>
        )}
        <div>
          <p>
            Customer Lives Above The Premises:
            <span className="required">*</span>
          </p>

          <span className="extra-color">
            {applicationInput.s_customer_lives === 1 ? "Yes" : "No"}
          </span>
        </div>
        <div>
          <p>
            {" "}
            Location Environment:<span className="required">*</span>
          </p>
          {applicationInput?.s_location_environment === "BUSINESS_DISTRICT" ? (
            <span className="extra-color"> Business District</span>
          ) : applicationInput?.s_location_environment ===
            "INDUSTRIAL_ESTATE" ? (
            <span className="extra-color"> Industrial Estate</span>
          ) : applicationInput?.s_location_environment === "RESIDENTIAL" ? (
            <span className="extra-color"> Residential</span>
          ) : (
            applicationInput?.s_location_environment === "RETAIL" && (
              <span className="extra-color">Retail</span>
            )
          )}
        </div>
        <div>
          <p>
            {" "}
            Condition of Vicinity<span className="required">*</span>
          </p>
          {applicationInput?.s_condition_of_vicinity === "WELL_KEPT" ? (
            <span className="extra-color"> Well Kept</span>
          ) : applicationInput?.s_condition_of_vicinity === "REGENERATION" ? (
            <span className="extra-color"> Regeneration</span>
          ) : (
            applicationInput?.s_condition_of_vicinity === "DETERIORATION" && (
              <span className="extra-color"> Deterioration</span>
            )
          )}
        </div>
        <div>
          <p>
            Square Metres<span className="required">*</span>
          </p>
          {applicationInput?.s_squire_meters === "LESS_THAN_250" ? (
            <span className="extra-color"> 250</span>
          ) : applicationInput?.s_squire_meters === "251_500" ? (
            <span className="extra-color"> 251-500</span>
          ) : applicationInput?.s_squire_meters === "501_1000" ? (
            <span className="extra-color"> 501-1,000</span>
          ) : (
            applicationInput?.s_squire_meters === "1000_PLUS" && (
              <span className="extra-color"> 1,000+</span>
            )
          )}
        </div>
        <div>
          <p>
            Square Metres<span className="required">*</span>
          </p>
          {applicationInput?.s_general_appearance === "VERY_GOOD" ? (
            <span className="extra-color"> Very Good</span>
          ) : applicationInput?.s_general_appearance === "SATISFACTORY" ? (
            <span className="extra-color"> Satisfactory</span>
          ) : (
            applicationInput?.s_general_appearance === "POOR" && (
              <span className="extra-color"> POOR</span>
            )
          )}
        </div>
        <div>
          <p>
            Premises Ownership<span className="required">*</span>
          </p>
          {applicationInput?.s_ownership === 1 ? (
            <span className="extra-color"> Merchant Owns</span>
          ) : (
            applicationInput?.s_ownership === 2 && (
              <span className="extra-color"> Merchant Rents</span>
            )
          )}
        </div>
        <div>
          <p>
            Is Business Open & Operating<span className="required">*</span>
          </p>
          {applicationInput?.s_is_business_open === true ? (
            <span className="extra-color"> Yes</span>
          ) : (
            applicationInput?.s_is_business_open === false && (
              <span className="extra-color"> No</span>
            )
          )}
        </div>
        {applicationInput.s_is_business_open === false && (
          <div>
            <p>
              Start Date<span className="required">*</span>
            </p>
            {applicationInput?.s_business_start_date && (
              <span className="extra-color">
                {new Date(applicationInput?.s_business_start_date).getDate()}/
                {new Date(applicationInput?.s_business_start_date).getMonth() +
                  1}
                /
                {new Date(
                  applicationInput?.s_business_start_date
                ).getFullYear()}
              </span>
            )}
          </div>
        )}
        <div>
          <p>
            Sufficient Stock for Purchase Volume
            <span className="required">*</span>
          </p>
          {applicationInput?.s_is_sufficient_stock === true ? (
            <span className="extra-color"> Yes</span>
          ) : (
            applicationInput?.s_is_sufficient_stock === false && (
              <span className="extra-color"> No</span>
            )
          )}
        </div>
        {applicationInput.s_is_sufficient_stock === false && (
          <div>
            <p>Sufficient Stock Comment</p>
            <span className="extra-color">
              {applicationInput?.s_sufficient_stock_comment}
            </span>
          </div>
        )}
        <div>
          <p>
            Does Stock Reflect Business Type<span className="required">*</span>
          </p>
          {applicationInput?.s_is_reflect_business_type === true ? (
            <span className="extra-color"> Yes</span>
          ) : (
            applicationInput?.s_is_reflect_business_type === false && (
              <span className="extra-color"> No</span>
            )
          )}
        </div>
        {applicationInput.s_is_reflect_business_type === false && (
          <div>
            <p>
              Stock Reflect Comment<span className="required">*</span>
            </p>
            <span className="extra-color">
              {applicationInput?.s_reflect_comment}
            </span>
          </div>
        )}
        <div>
          <p>
            Are Card Decals Visible?<span className="required">*</span>
          </p>
          {applicationInput?.s_is_card_decels_visible === true ? (
            <span className="extra-color"> Yes</span>
          ) : (
            applicationInput?.s_is_card_decels_visible === false && (
              <span className="extra-color"> No</span>
            )
          )}
        </div>
        {applicationInput.s_is_card_decels_visible === false && (
          <div>
            <p>
              Installed at Visit?<span className="required">*</span>
            </p>
            {applicationInput?.s_is_installed_at_visit === true ? (
              <span className="extra-color"> Yes</span>
            ) : (
              applicationInput?.s_is_installed_at_visit === false && (
                <span className="extra-color"> No</span>
              )
            )}
          </div>
        )}
        <div>
          <p>
            Name of the individual met at the premises
            <span className="required">*</span>
          </p>
          <span className="extra-color">
            {applicationInput?.s_name_of_individual}
          </span>
        </div>
        <div>
          <p>
            Date of the site visit<span className="required">*</span>
          </p>
          {applicationInput.s_individual_start_date ? (
            <span className="extra-color">
              {applicationInput.s_individual_start_date &&
                new Date(applicationInput?.s_individual_start_date).getDate()}
              /
              {applicationInput.s_individual_start_date &&
                new Date(applicationInput?.s_individual_start_date).getMonth() +
                  1}
              /
              {applicationInput.s_individual_start_date &&
                new Date(
                  applicationInput?.s_individual_start_date
                ).getFullYear()}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <p>
            {" "}
            Sales Partner<span className="required">*</span>
          </p>
          <span className="extra-color">
            {/* {salesPartnerList?.map((item) => {
              return (
                <>
                  {" "}
                  {item.id === applicationInput.sales_partner &&
                    item.first_name+ " " + item.last_name}
                </>
              );
            })} */}
            {applicationInput?.s_individual_sales_representatives}
          </span>
        </div>
        <div>
          <p>
            Printed Name<span className="required">*</span>
          </p>
          <span className="extra-color">
            {applicationInput?.s_individual_sales_representatives}
          </span>
        </div>
        <div>
          <p>
            Individual Date<span className="required">*</span>
          </p>
          {applicationInput.s_individual_date ? (
                <span className="extra-color">
                  {/* {applicationInput?.s_individual_date} */}
                  {applicationInput.s_individual_date &&
                    new Date(applicationInput?.s_individual_date).getDate()}
                  /
                  {applicationInput.s_individual_date &&
                    new Date(applicationInput?.s_individual_date).getMonth() + 1}
                  /
                  {applicationInput.s_individual_date &&
                    new Date(applicationInput?.s_individual_date).getFullYear()}
                </span>
              ) : (
                ""
              )}
        </div>
      </div>
    </div>
  );
};

export default SiteVisit;
