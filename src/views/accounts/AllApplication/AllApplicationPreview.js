import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import Loader from "src/utils/Loader";
import { showToast } from "src/utils/ToastHelper";

import "./AllApplication.css";

import detailIcon from "../../../assets/img/detail-icon.svg";
import { GetAllProductList } from "src/views/common/_redux/action/CommonAction";
import { useDispatch } from "react-redux";
import { GetIndustryList } from "../Leads/_redux/action/LeadAction";

import Cookies from "js-cookie"; // Import js-cookie
import AllApplicationSof from "./AllApplicationSof";
export default function AllApplicationPreview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
    dispatch(GetIndustryList());
  }, []);
  // console.log(IndustryList,'ind')

  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  // const { id } = useParams()
  const id = localStorage.getItem("allAppId");
  //   const navigate=useNavigate()
  // states

  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getNewPreview = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res?.data?.data);
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

  useEffect(() => {
    getNewPreview(
      `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/`
    );
    // getNewPreview(`${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/submitted_application_details/`);
  }, []);
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div>
      <div
        style={{ marginTop: "40px", marginBottom: "40px" }}
        className="buisness-detail customar-detail w-100 "
      >
        <div className="customar-detail-head w-100 fees-box">
          <div className="head-first">
            <img src={detailIcon} alt="" />
            <h4 style={{ color: "white" }}>All Application Preview</h4>
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
              <span>{quote?.opportunity.name}</span>
            </div>
            <div>
              <p>
                First Name <span className="required">*</span>
              </p>
              <span>{quote?.lead?.firstname}</span>
            </div>

            <div>
              <p>
                Last Name <span className="required">*</span>
              </p>
              <span>{quote?.lead?.lastname}</span>
            </div>

            <div>
              <p>
                Email Address <span className="required">*</span>
              </p>
              <span>{quote?.lead?.emailaddress1}</span>
            </div>

            <div>
              <p>
                Mobile Number <span className="required">*</span>
              </p>
              <span>{quote?.lead?.telephone3}</span>
            </div>

            <div>
              <p>Ownership TYPE</p>
              <span>
                {
                  quote?.contact?.[
                    "ptsave_authorizedsignatory@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Ownership Percentage</p>
              <span>
                {" "}
                {
                  quote?.contact?.[
                    "ptsave_percentofownership@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Role</p>
              <span>
                {" "}
                {
                  quote?.contact?.[
                    "ptsave_ownershiptype@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
          </div>
        </div>
        {/* business detail */}
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
              <span>
                {" "}
                {
                  quote?.lead?.[
                    "ptsave_legal_type@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>
                Legal Name <span className="required">*</span>
              </p>
              <span>{`${quote?.lead.companyname}`}</span>
            </div>

            <div>
              <p>
                Trading Name <span className="required">*</span>
              </p>
              <span>{`${quote?.opportunity.ptsave_trading_name}`}</span>
            </div>

            <div>
              <p>CRN / UTR</p>
              <span>{`${quote?.opportunity.ptsave_companyhouseno}`}</span>
            </div>

            <div>
              <p>
                Mobile Number <span className="required">*</span>
              </p>
              <span>{`${quote?.lead.telephone3}`}</span>
            </div>

            <div>
              <p>
                Email <span className="required">*</span>
              </p>
              <span>{`${quote?.lead.emailaddress1}`}</span>
            </div>
            <div>
              <p>
                Sales Partner <span className="required">*</span>
              </p>
              <span>{`${quote?.lead?.["_ptsave_partner_value@OData.Community.Display.V1.FormattedValue"]}`}</span>
            </div>

            <div>
              <p>VAT Details</p>
              <span>
                {" "}
                {
                  quote?.opportunity?.[
                    "ptsave_vat@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>MCC Code</p>
              <span>{`${quote?.lead.ptsave_mcc_code}`}</span>
            </div>

            <div>
              <p>Website</p>
              <span>{`${quote?.lead.websiteurl}`}</span>
            </div>

            <div>
              <p>Industry Type</p>
              <span>
                {
                  quote.lead?.[
                    "_ptsave_industry_type_value@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
            <div>
              <p>First Batch Date</p>
              <span>
                {quote?.account[
                  "ptsave_first_batch@OData.Community.Display.V1.FormattedValue"
                ]
                  ? quote?.account[
                      "ptsave_first_batch@OData.Community.Display.V1.FormattedValue"
                    ]
                  : ""}
              </span>
            </div>
          </div>
        </div>
        {/* address */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                borderBottom: "0.4px solid #979797",

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
              <span>{quote?.lead.address1_postalcode}</span>
            </div>

            <div>
              <p>
                Address 1 <span className="required">*</span>
              </p>
              <span>{quote?.lead.address1_line1}</span>
            </div>

            <div>
              <p>Address 2</p>
              <span>{quote?.lead.address1_line2}</span>
            </div>

            <div>
              <p>
                City/Town <span className="required">*</span>
              </p>
              <span>{quote?.lead.address1_city}</span>
            </div>

            <div>
              <p>County</p>
              <span>{quote?.lead.address1_county}</span>
            </div>

            <div>
              <p>Country</p>
              <span>{quote?.lead.address1_country}</span>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                borderBottom: "0.4px solid #979797",

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
              <span>{quote?.lead.ptsave_trading_zippostalcode}</span>
            </div>

            <div>
              <p>
                Address 1 <span className="required">*</span>
              </p>
              <span>{quote?.lead.ptsave_trading_street1}</span>
            </div>

            <div>
              <p>Address 2</p>
              <span>{quote?.lead.ptsave_trading_street2}</span>
            </div>

            <div>
              <p>
                City/Town <span className="required">*</span>
              </p>
              <span>{quote?.lead.ptsave_trading_city}</span>
            </div>

            <div>
              <p>County</p>
              <span>{quote?.lead.ptsave_trading_stateprovince}</span>
            </div>

            <div>
              <p>Country</p>
              <span>{quote?.lead.ptsave_trading_countryregion}</span>
            </div>
          </div>
        </div>
        {/* app details */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              Application Details
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
              <span>
                {
                  quote.opportunity?.[
                    "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Application Type</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_opportunity_type@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Application Status</p>
              <span>
                {
                  quote?.account?.[
                    "statecode@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Application Stage</p>
              <span>
                {
                  quote?.account?.[
                    "ptsave_back_office_stage@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Payment Method </p>
              <span>{quote?.oppurtinity?.ptsave_paymentmethod}</span>
            </div>

            <div>
              <p>Cash Back</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_cashback@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Submission Date</p>
              <span>
                {
                  quote?.account?.[
                    "ptsave_oppssubmissiondate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              Terminal Details
            </p>
          </div>
          <div className="detail-content" style={{ marginTop: "-30px" }}>
            <div>
              {/* <p>Product Type</p>
              <span>
                {" "}
                {quote?.application_products?.length > 0
                  ? quote?.application_products[0]?.product_type
                  : ""}
              </span> */}
            </div>
          </div>
        </div>
        {/* card terminal */}
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
                    <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Line Number</p>
                      </div>
                    </th>
                    {/* app type className="d-flex justify-content-between align-content-center" */}
                    <th>
                      <div className="d-flex px-2 justify-content-center">
                        <p>Terminal</p>
                        {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                      </div>
                    </th>
                    {/* legal name */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Status</p>
                      </div>
                    </th>
                    {/* trading name */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p className="ms-4">Tracking ID</p>
                      </div>
                    </th>
                    {/* mMID status */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Connection Type</p>
                      </div>
                    </th>
                    {/* mMID status */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Term</p>
                      </div>
                    </th>
                    {/* account status */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Terminal Rental</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>TID</p>
                      </div>
                    </th>
                    {/* account status */}
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Created On</p>
                      </div>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center">
                        <p>Updated On</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quote?.terminal?.length === 0 ? (
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
                      {quote?.terminal?.map((data) => (
                        <>
                          <tr>
                            <td>
                              {
                                data?.[
                                  "ptsave_lineitemnumber@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
                            <td>
                              {
                                data?.[
                                  "_ptsave_product_value@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
                            <td>
                              {
                                data?.[
                                  "ptsave_terminalstatus@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
                            <td>{data?.["ptsave_trackingnumbe"]}</td>
                            <td>
                              {
                                data?.[
                                  "_ptsave_connectiontype_value@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
                            <td>
                              {
                                data?.[
                                  "_ptsave_terminalterm_value@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
                            <td>
                              {
                                data?.[
                                  "ptsave_terminalrental@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>

                            <td>{data?.["ptsave_tid"]}</td>
                            <td>
                              {
                                data?.[
                                  "createdon@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
                            <td>
                              {
                                data?.[
                                  "modifiedon@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </td>
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
        {/* SOF*/}

        {/*   <div style={{ backgroundColor: "#f5f5f5" }}>
          <div style={{ backgroundColor: "#f5f5f5", margin: "20px 26px" }}>
            <p
              style={{
                fontWeight: "bold",
              }}
              className="pt-3"
            >
              Schedule of Fees - Debit
            </p>
          </div>
          <div className="detail-content">
            <div>
              <p>Visa Debit:</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_visadebitsecrate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
            <div>
              <p>Mastercard Debit:</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_masterdebitsecrate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
            <div>
              <p>Visa Business Debit:</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_visabusdebitsecrate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}>
            <p
              style={{
                fontWeight: "bold",
              }}
              className="pt-3"
            >
              Schedule of Fees - Credit
            </p>
          </div>
          <div className="detail-content">
            <div>
              <p>Visa Credit:</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_visacreditsecrate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
            <div>
              <p>Mastercard Credit:</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_masterdebitnonsecrate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
            <div>
              <p>Mastercard Business Credit:</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_visabuscreditsecrate@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>
          </div>
          <div className="detail-content">
            <div>
              <p>Auth Fees</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_authfeescommission_base@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>MMSC</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_mmsc@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Average Transaction Value</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_atv@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            <div>
              <p>Notes for pricing</p>
              <span>{quote?.opportunity?.["description"]}</span>
            </div>

            <div>
              <p>Annual Card Turnover</p>
              <span>
                {
                  quote?.account?.[
                    "ptsave_annualcardturnover@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </span>
            </div>

            

            <div>
              <p>Annual Turnover</p>
              <span>
                {
                  quote?.opportunity?.[
                    "ptsave_annual_business_turnover@OData.Community.Display.V1.FormattedValue"
                    
                  ]
                }
              </span>
            </div>
          </div>

          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}>
              <p
                style={{
                  fontWeight: "bold",
                }}
                className="pt-3"
              >
                Card Acceptance Ration
              </p>
            </div>
            <div className="detail-content">
              <div>
                <p>CNP/MOTO:</p>
                <span>
                  {quote?.opportunity?.["ptsave_cardacceptanceratio_cnpmoto"]}
                </span>
              </div>
              <div>
                <p>E-Commerce:</p>
                <span>
                  {quote?.opportunity?.["ptsave_cardacceptanceratio_ecommerce"]}
                </span>
              </div>
              <div>
                <p>Face To Face:</p>
                <span>
                  {quote?.opportunity?.["ptsave_cardacceptanceratio_face2face"]}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <AllApplicationSof quote={quote} />
      </div>

      <div className="row">
        {/* back btn */}
        <div className="col-md-12 my-3 text-right">
          <a href="/all-application" className="btn basic_btn">
            Back
          </a>
        </div>
      </div>
      {/* =========d-none------ */}
    </div>
  );
}
