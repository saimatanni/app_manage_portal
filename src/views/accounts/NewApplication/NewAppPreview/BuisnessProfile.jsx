import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import {  useSelector } from "react-redux";
const BuisnessProfile = ({toggleBusinessProfile}) => {
  BuisnessProfile.propTypes= {
    toggleBusinessProfile: PropTypes.string.isRequired,
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
          <h4 style={{ color: "white" }}>Business Profile</h4>
        </div>
        <div className="button-box">
          <button className="   custom-btn  flex " onClick={toggleBusinessProfile}>
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>
      <div className="detail-content">
        <div>
          <p>
            Description of Goods or Service <span className="required">*</span>
          </p>
          <span>{applicationInput?.desc_of_service}</span>
        </div>

        <div>
          <p>
            Customer Annual Business Turnover <span className="required">*</span>
          </p>
          <span>{applicationInput?.annual_turnover}</span>
        </div>

        <div>
          <p>
          Annual Card Turnover <span className="required">*</span>
          </p>
          <span>{applicationInput?.annual_card_turnover}</span>
        </div>

        <div>
          <p>
            CNP/MOTO <span className="required">*</span>
          </p>
          <span>{applicationInput?.sales_moto_perc}</span>
        </div>

        <div>
          <p>
            Face to Face <span className="required">*</span>
          </p>
          <span>{applicationInput?.sales_ftf_perc}</span>
        </div>

        <div>
          <p>
            E-Commerce <span className="required">*</span>
          </p>
          <span>{applicationInput?.sales_internet_perc}</span>
        </div>
        <div>
            <p>Do You Want Take Deposite<span className="required">*</span></p>
            <span>
              {" "}
              {applicationInput?.take_deposit === 1 ? (
                <span>Yes</span>
              ) : (
                <span>False</span>
              )}
            </span>
          </div>
          {/* ------------------take dposite------------------ */}
          {applicationInput?.take_deposit === 1 && (
            <>
              <div>
                <p>% of total Transaction  value</p>
                <span> {applicationInput?.deposit_perc_transaction_value}</span>
              </div>

              <div>
                <p>Advance supply of goods/service</p>
                <span> {applicationInput?.advance_supply_deposite_taken}</span>
              </div>
              <div>
                <p>% of annual deposite of turnover</p>
                <span>
                  {" "}
                  {applicationInput?.perc_annual_deposite_of_turnover}
                </span>
              </div>
              <div>
                <p>Time between deposite and remaining payment</p>
                <span>
                  {" "}
                  {applicationInput?.time_btw_deposite_and_remaining_payment}
                </span>
              </div>
              <div>
                <p>Do You ever take full payment</p>
                <span>
                  {" "}
                  {applicationInput?.take_full_payment === true ? (
                    <span>Yes</span>
                  ) : (
                    <span>False</span>
                  )}
                </span>
              </div>
              {applicationInput?.take_full_payment === true && (
                <>
                  <div>
                    <p>How Far In Advance Of Supply Is The Full</p>
                    <span>
                      {" "}
                      {applicationInput?.advance_supply_full_payment}
                    </span>
                  </div>
                  <div>
                    <p>% of annual turnover upfront</p>
                    <span>
                      {" "}
                      {applicationInput?.perc_annual_upfront_of_turnover}
                    </span>
                  </div>
                </>
              )}
            </>
          )}
          {/* ------------------take dposite end------------------ */}
          <div>
            <p>Seasonal sale<span className="required">*</span></p>
            {applicationInput?.seasonal_sales === true ? (
              <span>Yes</span>
            ) : (
              <span>False</span>
            )}
          </div>
          {applicationInput?.seasonal_sales === true && (
            <>
              <div>
                <p>Jan Feb Mar</p>
                <span>{applicationInput?.jan_to_mar}</span>
              </div>
              <div>
                <p>Apr May June</p>
                <span>{applicationInput?.apr_to_jun}</span>
              </div>
              <div>
                <p>Jul Aug Sep</p>
                <span>{applicationInput?.jul_to_sep}</span>
              </div>
              <div>
                <p>Oct Nov Dec</p>
                <span>{applicationInput?.oct_to_dec}</span>
              </div>
            </>
          )}

      </div>
    </div>
  );
};

export default BuisnessProfile;
