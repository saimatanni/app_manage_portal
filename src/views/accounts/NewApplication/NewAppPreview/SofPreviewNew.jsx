import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const SofPreviewNew = ({ toggleSof }) => {
  SofPreviewNew.propTypes = {
    toggleSof: PropTypes.string.isRequired,
  };
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const isValueLessThanMin = (value, minValue) => {
    return Number(value) < minValue;
  };
  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="buisness-detail customar-detail w-100 "
    >
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}> Schedule of Fees </h4>
        </div>
        <div className="button-box">
          <button className="   custom-btn  flex " onClick={toggleSof}>
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>
      <div className="buissness-data " style={{ backgroundColor: "#f5f5f5" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive p-4">
              <table className="table table-striped number-center">
                <thead>
                  <tr>
                    <th style={{ color: "#333333" }}>Card Type</th>
                    <th>MSC Rate (%)</th>
                    <th>(£) MSC Rate Per Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Credit</td>
                    <td>
                      <p
                        style={{
                          color:
                            isValueLessThanMin(
                              applicationInput.visa_credit_sr,
                              0.65
                            ) && "red", margin:0
                        }}
                      >
                        {applicationInput?.visa_credit_sr}
                      </p>
                    </td>

                    <td>{applicationInput?.visa_credit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Credit</td>
                    <td
                      
                    >
                       <p
                        style={{
                          color:
                            isValueLessThanMin(
                              applicationInput.master_credit_sr,
                              0.65
                            ) && "red", margin:0
                        }}
                      >
                      {applicationInput?.master_credit_sr}</p>
                    </td>

                    <td>{applicationInput?.master_credit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Debit</td>
                    <td
                     
                    > <p
                    style={{
                      color:
                        isValueLessThanMin(
                          applicationInput.visa_debit_sr,
                          0.35
                        ) && "red", margin:0
                    }}
                  >
                      {applicationInput?.visa_debit_sr}</p>
                    </td>

                    <td>{applicationInput?.visa_debit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Debit</td>
                    <td
                      
                    >
                      <p style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.master_debit_sr,
                            0.38
                          ) && "red", margin:0
                      }}>
                      {applicationInput.master_debit_sr}</p>
                    </td>

                    <td>{applicationInput.master_debit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa V-Pay</td>
                    <td
                      
                    >
                       <p
                        style={{
                          color:
                            isValueLessThanMin(
                              applicationInput.visa_v_pay_sr,
                              0.35
                            ) && "red", margin:0
                        }}
                      >
                      {applicationInput.visa_v_pay_sr}</p>
                    </td>

                    <td>{applicationInput.visa_v_pay_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Domestic</td>
                    <td
                      
                    >
                       <p
                        style={{
                          color:
                            isValueLessThanMin(
                              applicationInput.uk_maestro_sr,
                              0.38
                            ) && "red", margin:0
                        }}
                      >
                      {applicationInput.uk_maestro_sr}</p>
                    </td>

                    <td>{applicationInput.uk_maestro_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Within EEA</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.international_maestro_sr,
                            1.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.international_maestro_sr}
                      {"  "}
                    </td>

                    <td>
                      {applicationInput.international_maestro_sr_per_tr_fee}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Credit</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.visa_business_credit_sr,
                            2.3
                          ) && "red",
                      }}
                    >
                      {applicationInput.visa_business_credit_sr}
                    </td>

                    <td>
                      {applicationInput.visa_business_credit_sr_per_tr_fee}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Debit</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.visa_business_debit_sr,
                            1.85
                          ) && "red",
                      }}
                    >
                      {applicationInput.visa_business_debit_sr}
                    </td>

                    <td>
                      {applicationInput.visa_business_debit_sr_per_tr_fee}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Purchasing</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.visa_purchasing_sr,
                            2.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.visa_purchasing_sr}
                      {"  "}
                    </td>
                    <td>{applicationInput.visa_purchasing_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Corporate</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.visa_corporate_sr,
                            2.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.visa_corporate_sr}
                    </td>
                    <td>{applicationInput.visa_corporate_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Business</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.master_business_sr,
                            2.3
                          ) && "red",
                      }}
                    >
                      {applicationInput.master_business_sr}
                    </td>
                    <td>{applicationInput.master_business_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Purchasing</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.master_purchasing_sr,
                            2.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.master_purchasing_sr}
                      {"  "}
                    </td>
                    <td>{applicationInput.master_purchasing_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Fleet</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.master_fleet_sr,
                            2.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.master_fleet_sr}
                    </td>
                    <td>{applicationInput.master_fleet_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Corporate</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.master_corporate_sr,
                            2.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.master_corporate_sr}
                      {"  "}
                    </td>
                    <td>{applicationInput.master_corporate_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>
                      Mastercard Prepaid Commercial
                    </td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.master_pre_commercial_sr,
                            2.5
                          ) && "red",
                      }}
                    >
                      {applicationInput.master_pre_commercial_sr}
                      {"  "}
                    </td>
                    <td>
                      {applicationInput.master_pre_commercial_sr_per_tr_fee}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA VISA</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.non_eea_visa_sr,
                            3
                          ) && "red",
                      }}
                    >
                      {applicationInput.non_eea_visa_sr}
                    </td>
                    <td>{applicationInput.non_eea_visa_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA Mastercard</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.non_eea_master_sr,
                            3
                          ) && "red",
                      }}
                    >
                      {applicationInput.non_eea_master_sr}
                    </td>
                    <td>{applicationInput.non_eea_master_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>AMEX</td>
                    <td
                      style={{
                        color:
                          isValueLessThanMin(applicationInput.amex_sr, 1.9) &&
                          "red",
                      }}
                    >
                      {applicationInput.amex_sr}
                      {"  "}
                    </td>
                    <td>{applicationInput.amex_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td>* DCI/Discover</td>
                    {/* <td>* Diners</td> */}

                    <td
                      colSpan={2}
                      style={{
                        color:
                          isValueLessThanMin(applicationInput.diners_sr, 3) &&
                          "red",
                      }}
                    >
                      {applicationInput.diners_sr}
                    </td>
                  </tr>

                  <tr>
                    <td>** JCB</td>
                    <td
                      colSpan={2}
                      style={{
                        color:
                          isValueLessThanMin(applicationInput.jcb_sr, 2.9) &&
                          "red",
                      }}
                    >
                      {applicationInput.jcb_sr}
                    </td>
                  </tr>
                  <tr>
                    <td>*** Union Pay</td>
                    <td
                      colSpan={2}
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.union_pay_sr,
                            2.9
                          ) && "red",
                      }}
                    >
                      {applicationInput.union_pay_sr}
                    </td>
                  </tr>
                  <tr>
                    <td>Higher Risk Additional Loading Rate</td>
                    <td
                      colSpan={2}
                      style={{
                        color:
                          isValueLessThanMin(
                            applicationInput.high_risk_loading_rate,
                            0.4
                          ) && "red",
                      }}
                    >
                      {applicationInput.high_risk_loading_rate}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Schedule Of Fees - Others
              </p>
              <table className="mt-3 table table-striped number-center">
                <tbody>
                  <tr>
                    <td>Auth Fees </td>

                    <td colSpan={2}>{applicationInput.auth_fees}</td>
                  </tr>

                  <tr>
                    <td>MMSC</td>
                    <td colSpan={2}>{applicationInput.mmsc}</td>
                  </tr>
                  <tr>
                    <td> Average transaction value</td>
                    <td colSpan={2}>{applicationInput.atv}</td>
                  </tr>
                  <tr>
                    <td> Single maximum transaction value</td>
                    <td colSpan={2}>{applicationInput.smtv}</td>
                  </tr>

                  <tr>
                    <td> Annual Business Turnover </td>

                    <td colSpan={2}>{applicationInput.annual_turnover}</td>
                  </tr>

                  <tr>
                    <td> Annual Card Turnover</td>
                    <td colSpan={2}>{applicationInput.annual_card_turnover}</td>
                  </tr>
                  <tr>
                    <td>Card acceptance ratio(FtoF) </td>
                    <td colSpan={2}>{applicationInput.sales_ftf_perc}</td>
                  </tr>
                  <tr>
                    <td> Card acceptance ratio( CNP/MOTO) </td>
                    <td colSpan={2}>{applicationInput.sales_moto_perc}</td>
                  </tr>
                  <tr>
                    <td> Card acceptance ratio( ECOM) </td>
                    <td colSpan={2}>{applicationInput.sales_internet_perc}</td>
                  </tr>
                  <tr>
                    <td>Notes for pricing</td>
                    <td colSpan={2}>{applicationInput.sof_notes || "--"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SofPreviewNew;
