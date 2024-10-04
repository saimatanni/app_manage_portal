import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,  } from "react-router-dom";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import { showToast } from "src/utils/ToastHelper";
import detailIcon from "../../../assets/img/detail-icon.svg";
import {  useSelector } from "react-redux";

import Cookies from "js-cookie"; // Import js-cookie
export default function PriceQuotePreview() {
  const navigate = useNavigate();

  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList
  );
 
  
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const id = localStorage.getItem("quoteId");
  // const id = Cookies.get("quoteId");
  //   const navigate=useNavigate()

  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const quoteProduct = quote?.quote_products;
  const cardTerminal = quoteProduct?.filter(
    (quote) => quote?.product_type === "card_terminal"
  );
  const eposTerminal = quoteProduct?.filter(
    (quote) => quote?.product_type === "epos"
  );
  const ecomTerminal = quoteProduct?.filter(
    (quote) =>
      quote?.product_type === "ecom" ||
      quote?.product_type === "VT" ||
      quote?.product_type === "pay_by_link" ||
      quote?.product_type === "ecom_VT"
  );
  const getNewPreview = (url) => {
    axios
      .get(url)
      .then((res) => {
        setQuote(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request?.response)?.message;
        if (
          message === "Invalid token." ||
          JSON.parse(err.request.response).code === 401
        ) {
          showToast("success", "Invalid Token");
        }
        console.log(err);
      });
  };
  const oportunity = {
    1: "New Application",
    2: "New Ecom App",
    3: "New VT App",
    4: "Cole",
    5: "Additional Outlet",
  };
  const oprtunityStage = {
    0: {
      name: "NEW",
      bg: "bg-info",
    },
    1: {
      name: "QUOTED",
      bg: "bg-warning",
    },
    2: {
      name: "Contract Sent",
      bg: "bg-primary",
    },
    3: {
      name: "Contract Returned",
      bg: "bg-danger",
    },
    4: {
      name: "Sent for Processing",
      bg: "bg-light",
    },
    5: {
      name: "Lost",
      bg: "bg-Danger",
    },
  };
  const legalType = {
    ST: "Sole Trader",
    CL: "Club",
    CH: "Charity",
    TR: "Trust",
    PART: "Partnership",
    LLP: "Limited Liability Partnership",
    L: "Private Limited Company",
    PL: "Public Limited Company",
    OT: "Other",
  };

  useEffect(() => {
    getNewPreview(`${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${id}/`);
  }, []);
  if (isLoading) {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ minHeight: "100vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  const getPdName = (product) => {
    if (
      allProductList !== [] &&
      allProductList !== null &&
      allProductList !== undefined
    ) {
      const filter = allProductList?.filter((data) => data?.id === product);
      return filter[0]?.name;
    } else return "";
  };
  const getPdName2 = (product) => {
    if (
      allProductList !== [] &&
      allProductList !== null &&
      allProductList !== undefined
    ) {
      const filter = allProductList?.filter((data) => data?.id === product);
      return filter;
    } else return "";
  };
  const getPdConnectionType = (product) => {
    if (
      allProductList !== [] &&
      allProductList !== null &&
      allProductList !== undefined
    ) {
      const filter = allProductList?.filter((data) => data?.id === product);
      return filter[0]?.connection_type[0]?.name;
    } else return "";
  };

  return (
    <div>
      {/* new Desgin  */}
      <div
        style={{ marginTop: "40px", marginBottom: "40px" }}
        className="buisness-detail customar-detail w-100 "
      >
        <div className="customar-detail-head w-100 fees-box">
          <div className="head-first">
            <img src={detailIcon} alt="" />
            <h4 style={{ color: "white" }}>Opportunity Preview</h4>
          </div>
        </div>

        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="pt-4 px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Customer Details
            </p>
          </div>

          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>Client ID</p>
              <span>{`${quote?.client_id}`}</span>
            </div>

            <div>
              <p>
                First Name <span className="required">*</span>
              </p>
              <span>{`${quote?.first_name}`}</span>
            </div>

            <div>
              <p>
                Last Name <span className="required">*</span>
              </p>
              <span>{`${quote?.last_name}`}</span>
            </div>

            <div>
              <p>
                Email Address <span className="required">*</span>
              </p>
              <span>{`${quote?.email}`}</span>
            </div>

            <div>
              <p>
                Mobile Number <span className="required">*</span>
              </p>
              <span>{`${quote?.mobile}`}</span>
            </div>

            <div>
              <p>Ownership TYPE</p>
              <span>{`${
                quote?.quote_owners[0]?.is_beneficial_owner === true
                  ? "Beneficial owner"
                  : ""
              } ${
                quote?.quote_owners[0]?.is_signatory === true
                  ? ", Authorised Signatory"
                  : ""
              }`}</span>
            </div>

            <div>
              <p>Ownership Percentage</p>
              <span>{`${quote?.quote_owners[0]?.ownership_perc} %`}</span>
            </div>

            <div>
              <p>Role</p>
              <span>{`${
                quote?.quote_owners[0]?.is_director === true ? "Director" : ""
              } ${
                quote?.quote_owners[0]?.is_owner === true ? ", Owner" : ""
              }`}</span>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Business Details
            </p>
          </div>

          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>
                Business Type <span className="required">*</span>
              </p>
              <span>{`${legalType[quote?.legal_type]}`}</span>
            </div>

            <div>
              <p>
                Legal Name <span className="required">*</span>
              </p>
              <span>{`${quote?.legal_name}`}</span>
            </div>

            <div>
              <p>
                Trading Name <span className="required">*</span>
              </p>
              <span>{`${quote?.trading_name}`}</span>
            </div>

            <div>
              <p>CRN / UTR</p>
              <span>{`${quote?.company_house_no}`}</span>
            </div>

            <div>
              <p>
                Mobile Number <span className="required">*</span>
              </p>
              <span>{`${quote?.mobile}`}</span>
            </div>

            <div>
              <p>
                Email <span className="required">*</span>
              </p>
              <span>{`${quote?.email}`}</span>
            </div>


            <div>
              <p>MCC Code</p>
              <span>{`${quote?.mcc_code}`}</span>
            </div>

            <div>
              <p>Website</p>
              <span>{`${quote?.website}`}</span>
            </div>

            <div>
              <p>Industry Type</p>

              <span>{quote?.industry_type_name}</span>
            </div>
            <div>
              <p>Lead Owner</p>
              <span>{quote?.lead_owner_name}</span>
            </div>
            <div>
              <p>Sales Partner</p>
              <span>{quote?.sales_partner_name}</span>
            </div>
            <div>
              <p> Partner Manager</p>
              <span>{quote?.partner_manager_name}</span>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Legal Address Information
            </p>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>
                Post Code <span className="required">*</span>
              </p>
              <span>{quote?.legal_postcode}</span>
            </div>

            <div>
              <p>
                Address 1 <span className="required">*</span>
              </p>
              <span>{quote?.legal_address1}</span>
            </div>

            <div>
              <p>Address 2</p>
              <span>{quote?.legal_address2}</span>
            </div>

            <div>
              <p>
                City/Town <span className="required">*</span>
              </p>
              <span>{quote?.legal_city}</span>
            </div>

            <div>
              <p>County</p>
              <span>{quote?.legal_county}</span>
            </div>

            <div>
              <p>Country</p>
              <span>{quote?.legal_country_name}</span>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Trading Address Information
            </p>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>
                Post Code <span className="required">*</span>
              </p>
              <span>{quote?.trading_postcode}</span>
            </div>

            <div>
              <p>
                Address 1 <span className="required">*</span>
              </p>
              <span>{quote?.trading_address1}</span>
            </div>

            <div>
              <p>Address 2</p>
              <span>{quote?.trading_address2}</span>
            </div>

            <div>
              <p>
                City/Town <span className="required">*</span>
              </p>
              <span>{quote?.trading_city}</span>
            </div>

            <div>
              <p>County</p>
              <span>{quote?.trading_county}</span>
            </div>

            <div>
              <p>Country</p>
              <span>{quote?.trading_country_name}</span>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Quote Details
            </p>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              <p>New Card Process</p>
              <span>
                {quote?.new_to_card_proccessing === true ? "Yes" : "No"}
              </span>
            </div>

            <div>
              <p>Acquiring Bank</p>
              <span>{`${quote?.acquiring_bank === 0 ? "Elavon" : ""}`}</span>
            </div>

            <div>
              <p>Application Type</p>
              <span>{`${oportunity[quote?.application_type]}`}</span>
            </div>

           

            <div>
              <p>Quote Stage</p>
              <span>{`${oprtunityStage[quote?.opportunity_stage]?.name}`}</span>
            </div>


            <div>
              <p>Cash Back</p>
              <span>{quote?.cashback === true ? "Yes" : "No"}</span>
            </div>

          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Terminal Details
            </p>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                // borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              Card Terminal
            </p>
          </div>
          <div className="mx-0 mx-md-3">
            <div className="table-container mt-2">
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ color: "black" }}>
                  <tr className="height">
                   
                    <th>
                      <div>
                        <p>Product Name</p>
                        
                      </div>
                    </th>

                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Connection Type</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Option</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p className="ms-4">Contract Length</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Monthly Rental</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Type</p>
                      </div>
                    </th>
                    {/* account status */}
                  </tr>
                </thead>
                <tbody>
                  {cardTerminal?.length === 0 ? (
                    <>
                      <tr>
                        <td colSpan="11">
                          <div className="not_found">
                            <h4 className="my-4">No Data Found</h4>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {cardTerminal?.map((data) => (
                        <>
                          <tr>
                            {/* <td>{data?.id}</td> */}
                            <td>{getPdName(data?.product)}</td>
                            <td>{getPdConnectionType(data?.product)}</td>
                            {/* <td>{data?.connection_type_name}</td> */}

                            <td>
                              {data?.terminal_option === "FT"
                                ? "Free Terminal"
                                : data?.terminal_option === "MR"
                                ? "Monthly Rental"
                                : data?.terminal_option === "ET"
                                ? "Elavon Terminal"
                                : "Outright"}
                            </td>
                            <td>{data?.product_term}</td>
                            <td>{data?.price}</td>
                            <td>{data?.integration_availability}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
          

                fontWeight: "bold",
              }}
            >
              E-Commerce / Virtual terminal
            </p>
          </div>
          <div className="mx-0 mx-md-3">
            <div className="table-container mt-2">
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ color: "black" }}>
                  <tr className="height">
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Getway Provider</p>
                      </div>
                    </th>
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Service Type</p>
                      </div>
                    </th>
                  
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>WebSite URL</p>
                        
                      </div>
                    </th>
                    {/* legal name */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Getway Fee</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ecomTerminal?.length === 0 ? (
                    <>
                      <tr>
                        <td colSpan="11">
                          <div className="not_found">
                            <h4 className="my-4">No Data Found</h4>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {ecomTerminal?.map((data) => (
                        <>
                          <tr>
                            <td>
                              {data?.getway_provider === 0
                                ? "Cardstream"
                                : "Opayo"}
                            </td>
                            <td>
                              {data?.product_type === "VT"
                                ? "Virtual terminal"
                                : data?.product_type === "ecom"
                                ? " E-Commerce"
                                : data?.product_type === "ecom_VT"
                                ? "E-Commerce & Virtual terminal"
                                : "Pay By Link"}
                            </td>
                            <td>
                              {data?.website_url ? data?.website_url : ""}
                            </td>
                            <td>{data?.getway_fee}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
             

                fontWeight: "bold",
              }}
            >
              E-POS / Online Ordering / Website
            </p>
          </div>
          <div className="mx-0 mx-md-3">
            <div className="table-container mt-2">
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ color: "black" }}>
                  <tr className="height">
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Service provider</p>
                      </div>
                    </th>
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Service Option</p>
                      </div>
                    </th>
                    {/* app type className="d-flex justify-content-between align-content-center" */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>one of Cost</p>
                        {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                      </div>
                    </th>
                    {/* trading name */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p className="ms-4">Monthly Rental</p>
                      </div>
                    </th>
                    {/* mMID status */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Contract length</p>
                      </div>
                    </th>
                    {/* account status */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Service Type</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Integrated With </p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eposTerminal?.length === 0 ? (
                    <>
                      <tr>
                        <td colSpan="11">
                          <div className="not_found">
                            <h4 className="my-4">No Data Found</h4>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {eposTerminal?.map((data) => (
                        <>
                          <tr>
                            <td>{data?.epos_provider}</td>
                            <td>{data?.service_option}</td>
                            <td>{data?.one_of_cost}</td>
                            <td>{data?.price}</td>
                            <td>{data?.product_term}</td>
                            <td>{data?.epos_option}</td>
                            <td>{data?.integrated_with}</td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* visa debit */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive p-4">
              <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                Schedule Of Fees
              </p>
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
                    <td>{quote?.visa_credit_sr}</td>

                    <td>{quote?.visa_credit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Credit</td>
                    <td>{quote?.master_credit_sr}</td>

                    <td>{quote?.master_credit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Debit</td>
                    <td>{quote?.visa_debit_sr}</td>

                    <td>{quote?.visa_debit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Debit</td>
                    <td>{quote.master_debit_sr}</td>

                    <td>{quote.master_debit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa V-Pay</td>
                    <td>{quote.visa_v_pay_sr}</td>

                    <td>{quote.visa_v_pay_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Domestic</td>
                    <td>{quote.uk_maestro_sr}</td>

                    <td>{quote.uk_maestro_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Within EEA</td>
                    <td>
                      {quote.international_maestro_sr}
                      {"  "}
                    </td>

                    <td>{quote.international_maestro_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Credit</td>
                    <td>{quote.visa_business_credit_sr}</td>

                    <td>{quote.visa_business_credit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Debit</td>
                    <td>{quote.visa_business_debit_sr}</td>

                    <td>{quote.visa_business_debit_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Purchasing</td>
                    <td>
                      {quote.visa_purchasing_sr}
                      {"  "}
                    </td>
                    <td>{quote.visa_purchasing_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Corporate</td>
                    <td>{quote.visa_corporate_sr}</td>
                    <td>{quote.visa_corporate_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Business</td>
                    <td>{quote.master_business_sr}</td>
                    <td>{quote.master_business_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Purchasing</td>
                    <td>
                      {quote.master_purchasing_sr}
                      {"  "}
                    </td>
                    <td>{quote.master_purchasing_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Fleet</td>
                    <td>{quote.master_fleet_sr}</td>
                    <td>{quote.master_fleet_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Corporate</td>
                    <td>
                      {quote.master_corporate_sr}
                      {"  "}
                    </td>
                    <td>{quote.master_corporate_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>
                      Mastercard Prepaid Commercial
                    </td>
                    <td>
                      {quote.master_pre_commercial_sr}
                      {"  "}
                    </td>
                    <td>{quote.master_pre_commercial_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA VISA</td>
                    <td>{quote.non_eea_visa_sr}</td>
                    <td>{quote.non_eea_visa_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA Mastercard</td>
                    <td>{quote.non_eea_master_sr}</td>
                    <td>{quote.non_eea_master_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>AMEX</td>
                    <td>
                      {quote.amex_sr}
                      {"  "}
                    </td>
                    <td>{quote.amex_sr_per_tr_fee}</td>
                  </tr>
                  <tr>
                    <td>* DCI/Discover</td>

                    <td colSpan={2}>{quote.diners_sr}</td>
                  </tr>

                  <tr>
                    <td>** JCB</td>
                    <td colSpan={2}>{quote.jcb_sr}</td>
                  </tr>
                  <tr>
                    <td>*** Union Pay</td>
                    <td colSpan={2}>{quote.union_pay_sr}</td>
                  </tr>
                  <tr>
                    <td>Higher Risk Additional Loading Rate</td>
                    <td colSpan={2}>{quote.high_risk_loading_rate}</td>
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
              <table className="mt-3 table table-striped number-center text-center">
                <tbody className="text-center">
                  <tr>
                    <td>Auth Fees </td>

                    <td colSpan={2}>{quote.auth_fees}</td>
                  </tr>

                  <tr>
                    <td>MMSC</td>
                    <td colSpan={2}>{quote.mmsc}</td>
                  </tr>
                  <tr>
                    <td> Average transaction value</td>
                    <td colSpan={2}>{quote.atv}</td>
                  </tr>
                  <tr>
                    <td> Single maximum transaction value</td>
                    <td colSpan={2}>{quote.smtv}</td>
                  </tr>

                  <tr>
                    <td> Annual Business Turnover </td>

                    <td colSpan={2}>{quote.annual_turnover}</td>
                  </tr>

                  <tr>
                    <td> Annual Card Turnover</td>
                    <td colSpan={2}>{quote.annual_card_turnover}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Dinners Jcb Union pay */}
       
      </div>
      <div className="row">
        <div className="col-md-12 my-3 text-right">
          {/* <a href="/opportunity" className="btn basic_btn">
            Back
          </a> */}
          <button
            onClick={() => navigate("/opportunity")}
            className="btn btn-info text-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
