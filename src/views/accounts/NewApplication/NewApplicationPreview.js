import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "src/utils/Loader";
import { showToast } from "src/utils/ToastHelper";

import "./Preview.css";

import detailIcon from "../../../assets/img/detail-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductList } from "src/views/common/_redux/action/CommonAction";
import {
  GetCountryList,
  GetIndustryList,
} from "../Leads/_redux/action/LeadAction";
import Cookies from "js-cookie"; // Import js-cookie

export default function NewApplicationPreview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList);
  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList
  );
  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
    dispatch(GetIndustryList());
    dispatch(GetCountryList());
  }, []);

  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

  // const { id } = useParams()
  const id = localStorage.getItem("newAppId");
  //   const navigate=useNavigate()
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const quoteProduct = quote?.application_products;
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
    setIsLoading(true);
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
          navigate(`/login`)
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
  const countryList = useSelector((state) => state.leadInfo.countryList);
  useEffect(() => {
    if (id) {
      getNewPreview(
        `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/new-application-details/`
      );
    }
  }, [id]);
  if (isLoading) {
    return (
      <>
        <Loader />
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

  return (
    <>
      <div
        style={{ marginTop: "40px", marginBottom: "40px" }}
        className="buisness-detail customar-detail w-100 "
      >
        <div className="customar-detail-head w-100 fees-box">
          <div className="head-first">
            <img src={detailIcon} alt="" />
            <h4 style={{ color: "white" }}>New Application Preview</h4>
          </div>
        </div>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="py-4 px-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Customer Details
            </h5>
          </div>

          {quote?.business_owners?.length > 0 &&
            quote?.business_owners?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="card mb-3"
                  style={
                    {
                      // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      // padding: "20px 0",
                    }
                  }
                >
                  <div
                    className="detail-content"
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
                      <p>Client ID</p>

                      <span>{quote?.client_id}</span>
                    </div>
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
                          {item?.contact_dob &&
                            new Date(item?.contact_dob).getDate()}
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
                      <span>
                        {item?.is_main_principal === true ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <p>
                        Is beneficial Owner? <span className="required">*</span>
                      </p>
                      <span>
                        {item?.is_beneficial_owner === true ? "Yes" : "No"}
                      </span>
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
                      <span>
                        {item?.is_partnership === true ? "Yes" : "No"}
                      </span>
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
                      <div
                        style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}
                      >
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
                      <div className="detail-content pt-0">
                        <div>
                          <p>
                            Post Code<span className="required">*</span>
                          </p>
                          <span>
                            {item?.business_owner_contacts[0]?.zip_code}
                          </span>
                        </div>
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
                          <span>
                            {item?.business_owner_contacts[0]?.locality &&
                              item?.business_owner_contacts[0]?.locality}
                          </span>
                        </div>
                        <div>
                          <p>
                            City/Town<span className="required">*</span>
                          </p>
                          <span>{item?.business_owner_contacts[0]?.city}</span>
                        </div>

                        <div>
                          <p>County</p>
                          <span>
                            {item?.business_owner_contacts[0]?.county_code}
                          </span>
                        </div>
                        <div>
                          <p>Country</p>
                          {countryList?.map((option) => {
                            return (
                              <>
                                {option.id ===
                                  item?.business_owner_contacts[0]
                                    ?.country_code && (
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
                </div>
              );
            })}
        </div>
        {/* business detail */}
        {/* <hr /> */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Business Details
            </h5>
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
              <p>Incorporation Date</p>
              {quote.incorporated_on ? (
                <span>
                  {/* {quote?.incorporated_on} */}
                  {quote.incorporated_on &&
                    new Date(quote?.incorporated_on).getDate()}
                  /
                  {quote.incorporated_on &&
                    new Date(quote?.incorporated_on).getMonth() + 1}
                  /
                  {quote.incorporated_on &&
                    new Date(quote?.incorporated_on).getFullYear()}
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              <p>Current Ownership Date</p>
              {quote?.current_ownership_since ? (
                <span>
                  {/* {quote?.incorporated_on} */}
                  {new Date(quote?.current_ownership_since).getDate()}/
                  {new Date(quote?.current_ownership_since).getMonth() + 1}/
                  {new Date(quote?.current_ownership_since).getFullYear()}
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              <p>Telephone Number</p>
              <span>{quote?.telephone}</span>
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
              <p>VAT Details</p>
              <span>
                {" "}
                {quote?.vat_enabled === 0 ? (
                  <span>Vat number</span>
                ) : quote?.vat_enabled === 1 ? (
                  <span>Vat number pending</span>
                ) : (
                  <span>In business confirmation</span>
                )}
              </span>
            </div>
            <div>
              <p>Vat Number</p>
              <span> {quote?.tax_id}</span>
            </div>
            <div>
              <p>New to Card Process</p>
              <span>
                {quote?.new_to_card_proccessing === true ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <p>Old Provider</p>
              <span>{quote?.previous_acquirer}</span>
            </div>

            <div>
              <p>Notes</p>
              <span>{quote?.note}</span>
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
              <span>
                {IndustryList?.map((option) => {
                  return (
                    <>
                      {parseInt(option.ptsave_industrytypeid) ===
                        parseInt(quote?.industry_type) && (
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
              </span>
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
        {/* address */}
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
              {countryList?.map((option) => {
                return (
                  <>
                    {option.id === quote?.legal_country && (
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
              {countryList?.map((option) => {
                return (
                  <>
                    {option.id === quote?.trading_country && (
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
        {/* //businesss profile */}
        <hr />
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Business Profile
            </h5>
          </div>
          <div className="detail-content pt-0">
            <div>
              <p>
                Description of Goods or Service{" "}
                <span className="required">*</span>
              </p>
              <span>{quote?.desc_of_service}</span>
            </div>

            <div>
              <p>
                Customer Annual Business Turnover{" "}
                <span className="required">*</span>
              </p>
              <span>{quote?.annual_turnover}</span>
            </div>

            <div>
              <p>
                Annual Card Turnover <span className="required">*</span>
              </p>
              <span>{quote?.annual_card_turnover}</span>
            </div>

            <div>
              <p>
                CNP/MOTO <span className="required">*</span>
              </p>
              <span>{quote?.sales_moto_perc}</span>
            </div>

            <div>
              <p>
                Face to Face <span className="required">*</span>
              </p>
              <span>{quote?.sales_ftf_perc}</span>
            </div>

            <div>
              <p>
                E-Commerce <span className="required">*</span>
              </p>
              <span>{quote?.sales_internet_perc}</span>
            </div>
            <div>
              <p>
                Do You Want Take Deposite<span className="required">*</span>
              </p>
              <span>
                {" "}
                {quote?.take_deposit === 1 ? (
                  <span>Yes</span>
                ) : (
                  <span>False</span>
                )}
              </span>
            </div>
            {/* ------------------take dposite------------------ */}
            {quote?.take_deposit === 1 && (
              <>
                <div>
                  <p>% of total Transaction value</p>
                  <span> {quote?.deposit_perc_transaction_value}</span>
                </div>

                <div>
                  <p>Advance supply of goods/service</p>
                  <span> {quote?.advance_supply_deposite_taken}</span>
                </div>
                <div>
                  <p>% of annual deposite of turnover</p>
                  <span> {quote?.perc_annual_deposite_of_turnover}</span>
                </div>
                <div>
                  <p>Time between deposite and remaining payment</p>
                  <span> {quote?.time_btw_deposite_and_remaining_payment}</span>
                </div>
                <div>
                  <p>Do You ever take full payment</p>
                  <span>
                    {" "}
                    {quote?.take_full_payment === true ? (
                      <span>Yes</span>
                    ) : (
                      <span>False</span>
                    )}
                  </span>
                </div>
                {quote?.take_full_payment === true && (
                  <>
                    <div>
                      <p>How Far In Advance Of Supply Is The Full</p>
                      <span> {quote?.advance_supply_full_payment}</span>
                    </div>
                    <div>
                      <p>% of annual turnover upfront</p>
                      <span> {quote?.perc_annual_upfront_of_turnover}</span>
                    </div>
                  </>
                )}
              </>
            )}
            {/* ------------------take dposite end------------------ */}
            <div>
              <p>
                Seasonal sale<span className="required">*</span>
              </p>
              {quote?.seasonal_sales === true ? (
                <span>Yes</span>
              ) : (
                <span>False</span>
              )}
            </div>
            {quote?.seasonal_sales === true && (
              <>
                <div>
                  <p>Jan Feb Mar</p>
                  <span>{quote?.jan_to_mar}</span>
                </div>
                <div>
                  <p>Apr May June</p>
                  <span>{quote?.apr_to_jun}</span>
                </div>
                <div>
                  <p>Jul Aug Sep</p>
                  <span>{quote?.jul_to_sep}</span>
                </div>
                <div>
                  <p>Oct Nov Dec</p>
                  <span>{quote?.oct_to_dec}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        {/* //financial info */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                fontWeight: "bold",
              }}
            >
              Bank Account Details
            </h5>
          </div>
          <div className="detail-content pt-0">
            <div>
              <p>
                Bank Name <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.bank_name}</span>
            </div>

            <div>
              <p>
                Account Name <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.bank_account_name}</span>
            </div>

            <div>
              <p>
                Sort Code <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.bank_sort_code}</span>
            </div>

            <div>
              <p>
                Account Number <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.bank_account_no}</span>
            </div>
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
                    {quote?.debit_bank_info &&
                      quote?.debit_bank_info[0]?.debit_bank_name}
                  </span>
                </div>

                <div>
                  <p>Account Name</p>
                  <span className="extra-color">
                    {quote?.debit_bank_info &&
                      quote?.debit_bank_info[0]?.debit_bank_account_name}
                  </span>
                </div>

                <div>
                  <p>Sort Code</p>
                  <span className="extra-color">
                    {quote?.debit_bank_info &&
                      quote?.debit_bank_info[0]?.debit_bank_sort_code}
                  </span>
                </div>

                <div>
                  <p>Account Number</p>
                  <span className="extra-color">
                    {quote?.debit_bank_info &&
                      quote?.debit_bank_info[0]?.debit_bank_account_no}
                  </span>
                </div>
              </div>
            </div>
            {/* -------------- Payment Method----------------------- */}
          </div>
          <div className="detail-content">
            <div>
              <p>
                Faster Payments <span className="required">*</span>
              </p>
              <span className="extra-color">
                {parseInt(quote.bank_faster_payments) === 1 ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <p>
                Cash Back <span className="required">*</span>
              </p>
              <span className="extra-color">
                {quote.cashback === true ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <p>
                Cash Back Amount<span className="required">*</span>
              </p>
              <span className="extra-color">{quote.avg_cashback_amount}</span>
            </div>
            <div>
              <p>
                Payment Method <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.payment_method}</span>
            </div>

            <div>
              <p>
                Funding Frequency <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.funding_frequesncy}</span>
            </div>

            <div>
              <p>
                Billing Frequency <span className="required">*</span>
              </p>
              <span className="extra-color"> {quote?.billing_frequesncy}</span>
            </div>

            <div>
              <p>
                Settlement Method <span className="required">*</span>
              </p>
              <span className="extra-color">
                {" "}
                {quote?.bank_settlement_method}
              </span>
            </div>

            <div>
              <p>
                Account <span className="required">*</span>
              </p>
              <span className="extra-color"> {quote?.bank_account_type}</span>
            </div>
            <div>
              <p>Cash Back</p>
              <span>{quote?.cashback === true ? "Yes" : "No"}</span>
            </div>
            <div>
              <p>Cash Back Amount</p>
              <span>{quote?.avg_cashback_amount}</span>
            </div>
          </div>
        </div>
        <hr />
        {/* //site visit? */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                // borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              Site Visit
            </h5>
          </div>
          <div className="detail-content pt-0">
            <div>
              <p>
                Legal Name <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.legal_name}</span>
            </div>

            <div>
              <p>
                Trading Name <span className="required">*</span>
              </p>
              <span className="extra-color">{quote?.trading_name}</span>
            </div>
            <div>
              <p>
                {" "}
                Location Type:<span className="required">*</span>
              </p>
              {quote?.s_location_type === "SHOPPING_CENTRE" ? (
                <span className="extra-color"> Shopping center</span>
              ) : quote?.s_location_type === "OFFICE_BUILDING" ? (
                <span className="extra-color"> Office Building</span>
              ) : quote?.s_location_type === "INDUSTRIAL_ESTATE" ? (
                <span className="extra-color"> Industrial Estate</span>
              ) : quote?.s_location_type === "HOME" ? (
                <span className="extra-color">Home</span>
              ) : (
                <span className="extra-color">Other</span>
              )}
            </div>
            {quote.s_location_type === "OTHER" && (
              <div>
                <p>
                  Specific Location<span className="required">*</span>
                </p>

                <span className="extra-color">{quote.s_specific_location}</span>
              </div>
            )}
            <div>
              <p>
                Customer Lives Above The Premises:
                <span className="required">*</span>
              </p>

              <span className="extra-color">
                {quote.s_customer_lives === 1 ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <p>
                {" "}
                Location Environment:<span className="required">*</span>
              </p>
              {quote?.s_location_environment === "BUSINESS_DISTRICT" ? (
                <span className="extra-color"> Business District</span>
              ) : quote?.s_location_environment === "INDUSTRIAL_ESTATE" ? (
                <span className="extra-color"> Industrial Estate</span>
              ) : quote?.s_location_environment === "RESIDENTIAL" ? (
                <span className="extra-color"> Residential</span>
              ) : (
                quote?.s_location_environment === "RETAIL" && (
                  <span className="extra-color">Retail</span>
                )
              )}
            </div>
            <div>
              <p>
                {" "}
                Condition of Vicinity<span className="required">*</span>
              </p>
              {quote?.s_condition_of_vicinity === "WELL_KEPT" ? (
                <span className="extra-color"> Well Kept</span>
              ) : quote?.s_condition_of_vicinity === "REGENERATION" ? (
                <span className="extra-color"> Regeneration</span>
              ) : (
                quote?.s_condition_of_vicinity === "DETERIORATION" && (
                  <span className="extra-color"> Deterioration</span>
                )
              )}
            </div>
            <div>
              <p>
                Square Metres<span className="required">*</span>
              </p>
              {quote?.s_squire_meters === "LESS_THAN_250" ? (
                <span className="extra-color"> 250</span>
              ) : quote?.s_squire_meters === "251_500" ? (
                <span className="extra-color"> 251-500</span>
              ) : quote?.s_squire_meters === "501_1000" ? (
                <span className="extra-color"> 501-1,000</span>
              ) : (
                quote?.s_squire_meters === "1000_PLUS" && (
                  <span className="extra-color"> 1,000+</span>
                )
              )}
            </div>
            <div>
              <p>
                Square Metres<span className="required">*</span>
              </p>
              {quote?.s_general_appearance === "VERY_GOOD" ? (
                <span className="extra-color"> Very Good</span>
              ) : quote?.s_general_appearance === "SATISFACTORY" ? (
                <span className="extra-color"> Satisfactory</span>
              ) : (
                quote?.s_general_appearance === "POOR" && (
                  <span className="extra-color"> POOR</span>
                )
              )}
            </div>
            <div>
              <p>
                Premises Ownership<span className="required">*</span>
              </p>
              {quote?.s_ownership === 1 ? (
                <span className="extra-color"> Merchant Owns</span>
              ) : (
                quote?.s_ownership === 2 && (
                  <span className="extra-color"> Merchant Rents</span>
                )
              )}
            </div>
            <div>
              <p>
                Is Business Open & Operating<span className="required">*</span>
              </p>
              {quote?.s_is_business_open === true ? (
                <span className="extra-color"> Yes</span>
              ) : (
                quote?.s_is_business_open === false && (
                  <span className="extra-color"> No</span>
                )
              )}
            </div>
            {quote.s_is_business_open === false && (
              <div>
                <p>
                  Start Date<span className="required">*</span>
                </p>
                {quote?.s_business_start_date && (
                  <span className="extra-color">
                    {new Date(quote?.s_business_start_date).getDate()}/
                    {new Date(quote?.s_business_start_date).getMonth() + 1}/
                    {new Date(quote?.s_business_start_date).getFullYear()}
                  </span>
                )}
              </div>
            )}
            <div>
              <p>
                Sufficient Stock for Purchase Volume
                <span className="required">*</span>
              </p>
              {quote?.s_is_sufficient_stock === true ? (
                <span className="extra-color"> Yes</span>
              ) : (
                quote?.s_is_sufficient_stock === false && (
                  <span className="extra-color"> No</span>
                )
              )}
            </div>
            {quote.s_is_sufficient_stock === false && (
              <div>
                <p>Sufficient Stock Comment</p>
                <span className="extra-color">
                  {quote?.s_sufficient_stock_comment}
                </span>
              </div>
            )}
            <div>
              <p>
                Does Stock Reflect Business Type
                <span className="required">*</span>
              </p>
              {quote?.s_is_reflect_business_type === true ? (
                <span className="extra-color"> Yes</span>
              ) : (
                quote?.s_is_reflect_business_type === false && (
                  <span className="extra-color"> No</span>
                )
              )}
            </div>
            {quote.s_is_reflect_business_type === false && (
              <div>
                <p>
                  Stock Reflect Comment<span className="required">*</span>
                </p>
                <span className="extra-color">{quote?.s_reflect_comment}</span>
              </div>
            )}
            <div>
              <p>
                Are Card Decals Visible?<span className="required">*</span>
              </p>
              {quote?.s_is_card_decels_visible === true ? (
                <span className="extra-color"> Yes</span>
              ) : (
                quote?.s_is_card_decels_visible === false && (
                  <span className="extra-color"> No</span>
                )
              )}
            </div>
            {quote.s_is_card_decels_visible === false && (
              <div>
                <p>
                  Installed at Visit?<span className="required">*</span>
                </p>
                {quote?.s_is_installed_at_visit === true ? (
                  <span className="extra-color"> Yes</span>
                ) : (
                  quote?.s_is_installed_at_visit === false && (
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
              <span className="extra-color">{quote?.s_name_of_individual}</span>
            </div>
            <div>
              <p>
                Date of the site visit<span className="required">*</span>
              </p>
              {quote.s_individual_start_date ? (
                <span>
                  {/* {quote?.s_individual_start_date} */}
                  {quote.s_individual_start_date &&
                    new Date(quote?.s_individual_start_date).getDate()}
                  /
                  {quote.s_individual_start_date &&
                    new Date(quote?.s_individual_start_date).getMonth() + 1}
                  /
                  {quote.s_individual_start_date &&
                    new Date(quote?.s_individual_start_date).getFullYear()}
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
                  {item.id === quote.sales_partner &&
                    item.first_name+ " " + item.last_name}
                </>
              );
            })} */}
                {quote?.s_individual_sales_representatives}
              </span>
            </div>
            <div>
              <p>
                Printed Name<span className="required">*</span>
              </p>
              <span className="extra-color">
                {quote?.s_individual_sales_representatives}
              </span>
            </div>
            <div>
              <p>
                Individual Date<span className="required">*</span>
              </p>
              {quote.s_individual_date ? (
                <span>
                  {/* {quote?.s_individual_date} */}
                  {quote.s_individual_date &&
                    new Date(quote?.s_individual_date).getDate()}
                  /
                  {quote.s_individual_date &&
                    new Date(quote?.s_individual_date).getMonth() + 1}
                  /
                  {quote.s_individual_date &&
                    new Date(quote?.s_individual_date).getFullYear()}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <h5
              style={{
                // borderBottom: "0.4px solid #979797",

                fontWeight: "bold",
              }}
            >
              Terminal Details
            </h5>
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
                      {/* app type className="d-flex justify-content-between align-content-center" */}
                      <th>
                        <div className="d-flex  justify-content-center">
                          <p>Product Name</p>
                          {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                        </div>
                      </th>
                      {/* legal name */}
                      <th>
                        <div className="d-flex justify-content-center">
                          <p>Connection Type</p>
                        </div>
                      </th>
                      {/* trading name */}
                      <th>
                        <div className="d-flex justify-content-center">
                          <p className="ms-4">Contract Length</p>
                        </div>
                      </th>
                      {/* mMID status */}
                      <th>
                        <div className="d-flex justify-content-center">
                          <p>Terminal Option</p>
                        </div>
                      </th>
                      {/* mMID status */}
                      <th>
                        <div className="d-flex justify-content-center">
                          <p>Terminal Model</p>
                        </div>
                      </th>
                      {/* account status */}
                      <th>
                        <div className="d-flex justify-content-center">
                          <p>Monthly Price</p>
                        </div>
                      </th>
                      <th style={{ minWidth: "140px" }}>
                        <div className="d-flex px-2 justify-content-center">
                          <p style={{ textAlign: "end" }}>Terminal Type</p>
                        </div>
                      </th>
                      <th style={{ minWidth: "140px" }}>
                        <div className="d-flex px-2 justify-content-center">
                          <p style={{ textAlign: "end" }}>Quantity</p>
                        </div>
                      </th>
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
                              <td>{getPdName(data?.product)}</td>
                              <td>{data?.connection_type}</td>
                              <td>{data?.contact_length}</td>
                              <td>
                                {data?.terminal_option === "FT"
                                  ? "Free Terminal"
                                  : data?.terminal_option === "MR"
                                  ? "Monthly Rental"
                                  : data?.terminal_option === "ET"
                                  ? "Elavon Terminal"
                                  : "Outright"}
                              </td>
                              <td>{data?.terminal_model}</td>
                              <td>{data?.monthly_price}</td>
                              <td>{data?.integration_availability}</td>
                              <td>{data?.qty}</td>
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
                  // borderBottom: "0.4px solid #979797",

                  fontWeight: "bold",
                }}
              >
                E-Commerce or Virtual terminal
              </p>
            </div>
            <div className="mx-0 mx-md-3">
              <div className="table-container mt-2">
                <table className="table table-striped table-hover table-bordered">
                  <thead style={{ color: "black" }}>
                    <tr className="height">
                      {/* <th style={{ minWidth: "140px" }}>
                        <div className="d-flex px-2 justify-content-center">
                          <p style={{ textAlign: "end" }}>Product ID</p>
                        </div>
                      </th> */}
                      <th style={{ minWidth: "140px" }}>
                        <div className="d-flex px-2 justify-content-center">
                          <p style={{ textAlign: "end" }}>Service Type</p>
                        </div>
                      </th>
                      {/* app type className="d-flex justify-content-between align-content-center" */}
                      <th>
                        <div className="d-flex px-2 justify-content-center">
                          <p style={{ textAlign: "start" }}>WebSite Url</p>
                          {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                        </div>
                      </th>
                      {/* legal name */}
                      <th>
                        <div className="d-flex justify-content-center">
                          <p>E-com Provider</p>
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
                              {/* <td>{data?.id}</td> */}
                              <td>
                                {" "}
                                {data?.product_type === "VT"
                                  ? "Virtual terminal"
                                  : data?.product_type === "ecom"
                                  ? " E-Commerce"
                                  : data?.product_type === "ecom_VT"
                                  ? "E-Commerce & Virtual terminal"
                                  : "Pay By Link"}
                              </td>
                              {/* <td>{data?.product_type}</td> */}
                              <td>
                                {data?.website_url ? data?.website_url : ""}
                              </td>
                              <td>
                                {data?.getway_provider === 0
                                  ? "CARDSTREAM"
                                  : "OPAYO"}
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
          <div style={{ backgroundColor: "#f5f5f5" }}>
            <div className="px-4">
              <p
                style={{
                  // borderBottom: "0.4px solid #979797",

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
                              <td>{data?.monthly_price}</td>
                              <td>{data?.contact_length}</td>
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
        </div>
        <hr />
        {/* //Schedule of fees */}
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
                      <td style={{ fontWeight: 500 }}>
                        All Non-EEA Mastercard
                      </td>
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

                    {/* <tr>
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
                  <tr>
                    <td>Card acceptance ratio(FtoF) </td>
                    <td colSpan={2}>{quote.sales_ftf_perc}</td>
                  </tr>
                  <tr>
                    <td> Card acceptance ratio( CNP/MOTO) </td>
                    <td colSpan={2}>{quote.sales_moto_perc}</td>
                  </tr>
                  <tr>
                    <td> Card acceptance ratio( ECOM) </td>
                    <td colSpan={2}>{quote.sales_internet_perc}</td>
                  </tr>
                  <tr>
                    <td>Notes for pricing</td>
                    <td colSpan={2}>{quote.sof_notes || "--"}</td>
                  </tr> */}
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
                    <tr>
                      <td>Card acceptance ratio(FtoF) </td>
                      <td colSpan={2}>{quote.sales_ftf_perc}</td>
                    </tr>
                    <tr>
                      <td> Card acceptance ratio( CNP/MOTO) </td>
                      <td colSpan={2}>{quote.sales_moto_perc}</td>
                    </tr>
                    <tr>
                      <td> Card acceptance ratio( ECOM) </td>
                      <td colSpan={2}>{quote.sales_internet_perc}</td>
                    </tr>
                    <tr>
                      <td>Notes for pricing</td>
                      <td colSpan={2}>{quote.sof_notes || "--"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/*All Non-EEA mastercard */}

        {/* Dinners Jcb Union pay */}
        {/* <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="p-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Schedule of Fees - * Diners / ** JCB / *** Union Pay
            </p>
          </div>
          <div className="detail-content pt-0">
            <div>
              <p>* DCI/Discover.</p>
              <span>{quote?.diners_sr}</span>
            </div>
            <div>
              <p>** JCB Sr.</p>
              <span>{quote?.jcb_sr}</span>
            </div>
            <div>
              <p>*** Union Pay Sr.</p>
              <span>{quote?.union_pay_sr}</span>
            </div>
            <div>
              <p>Higher Risk Additional Loading Rate</p>
              <span>{quote?.high_risk_loading_rate}</span>
            </div>
          </div>
        </div> */}
        {/* Others */}
        {/* <div style={{ backgroundColor: "#f5f5f5" }}>
          <div className="px-4">
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Schedule of Fees - Others
            </p>
          </div>
          <div className="detail-content">
            <div>
              <p>Auth Fees </p>
              <span>{quote?.auth_fees}</span>
            </div>
            <div>
              <p>MMSC</p>
              <span>{quote?.mmsc}</span>
            </div>
            <div>
              <p>Average Transaction Value</p>
              <span>{quote?.atv}</span>
            </div>
            <div>
              <p>Single Maximum Transaction Value</p>
              <span>{quote?.smtv}</span>
            </div>
            <div>
              <p>Annual Turnover</p>
              <span>{quote?.annual_turnover}</span>
            </div>
            <div>
              <p>Annual Card Turnover</p>
              <span>{quote?.annual_card_turnover}</span>
            </div>
          </div>
        </div> */}
      </div>
      <div className="row">
        <div className="col-md-12 my-3 text-right">
          <a href="/new-application" className="btn basic_btn">
            Back
          </a>
        </div>
      </div>

      <section className="content d-none">
        <div className="container p-0">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="card d-flex flex-fill p-4">
                    <div className="preview-header d-none">
                      <h2>New Application</h2>
                    </div>

                    {/* ========
                                        new price quote copy
                                        ==============
                                        */}
                    <div className="card-body pt-0">
                      <h6 className="my-4">Customer Details</h6>
                      <hr className="mb-4" />
                      <div className="row d-none">
                        <div className="col-md-3 ">
                          <br />
                          <div>
                            <strong>Client Id</strong>
                            <input
                              disabled
                              placeholder={`PS-${quote?.id}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Mobile Number</strong>
                            <input
                              disabled
                              placeholder={`${quote?.mobile}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <br />
                          <div>
                            <strong>First Name</strong>
                            <input
                              disabled
                              placeholder={`${
                                quote?.business_owners &&
                                quote?.business_owners[0]?.owner_first_name
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Ownership TYPE</strong>
                            <input
                              disabled
                              placeholder={`${
                                quote?.business_owners &&
                                quote?.business_owners[0]
                                  ?.is_beneficial_owner === true &&
                                "Beneficial owner"
                              } ${
                                quote?.business_owners &&
                                quote?.business_owners[0]?.is_signatory ===
                                  true &&
                                ", Authorised Signatory"
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <br />
                          <div>
                            <strong>Last Name</strong>
                            <input
                              disabled
                              placeholder={`${
                                quote?.business_owners &&
                                quote?.business_owners[0]?.owner_surname
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Ownership Percentage</strong>
                            <input
                              disabled
                              //   placeholder={`${quote?.quote_owners[0]?.ownership_perc} %`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <br />
                          <div>
                            <strong>Email Address</strong>
                            <input
                              disabled
                              placeholder={`${quote?.email}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Role</strong>
                            <input
                              disabled
                              //   placeholder={`${
                              //     quote?.quote_owners[0]?.is_director === true && 'Director'
                              //   } ${quote?.quote_owners[0]?.is_owner === true && ', Owner'}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h6 className="my-4">Lead Information</h6>
                        <hr className="md-4" />
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <div>
                            <strong>Business Type</strong>
                            <input
                              disabled
                              placeholder={`${legalType[quote?.legal_type]}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Mobile Number</strong>
                            <input
                              disabled
                              placeholder={`${quote?.mobile}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Industry Type</strong>
                            <input
                              disabled
                              placeholder={`${
                                legalType[quote?.industry_type_name]
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Legal Name</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_name}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Email</strong>
                            <input
                              disabled
                              placeholder={`${quote?.email}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Website</strong>
                            <input
                              disabled
                              placeholder={`${quote?.website}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Trading Name</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_name}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Vat Details</strong>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>CRN / UTR</strong>
                            <input
                              disabled
                              placeholder={`${quote?.company_house_no}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>MCC Code</strong>
                            <input
                              disabled
                              placeholder={`${quote?.mcc_code}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                      </div>
                      <h6 className="my-4">Legal Address Information</h6>
                      <hr className="mb-4" />
                      <div className="row">
                        <div className="col-md-3">
                          <div>
                            <strong>Address 1</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_address1}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>County</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_county}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Address 2</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_address2}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Country</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_country_name}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>City/Town</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_city}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Post Code</strong>
                            <input
                              disabled
                              placeholder={`${quote?.legal_postcode}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                      </div>

                      <h6 className="my-4">Trading Address Information</h6>
                      <hr className="mb-4" />
                      <div className="row">
                        <div className="col-md-3">
                          <div>
                            <strong>Address 1</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_address1}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>County</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_county}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Address 2</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_address1}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Country</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_country_name}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>City/Town</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_city}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Post Code</strong>
                            <input
                              disabled
                              placeholder={`${quote?.trading_postcode}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                      </div>
                      <h6 className="my-4">Application Details</h6>
                      <hr className="mb-4" />
                      <div className="row">
                        <div className="col-md-3">
                          <div>
                            <strong>New Card process</strong>
                            <p></p>
                            <input
                              type="text"
                              className="form-control my-3"
                              value=""
                              disabled
                            />
                          </div>
                          <div>
                            <strong>Application Stage</strong>
                            <input
                              disabled
                              placeholder={`${
                                oportunity[quote?.application_type]
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Acquiring Bank</strong>
                            <input
                              disabled
                              placeholder={`${
                                quote?.acquiring_bank === 0 ? "Elavon" : ""
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Faster Payment</strong>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Application Type</strong>
                            <input
                              disabled
                              placeholder={`${
                                oportunity[quote?.application_type]
                              }`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Cash Back</strong>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <p>
                              <strong>Application Status</strong>
                            </p>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                          <div>
                            <strong>Submission Date</strong>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <h6 className="my-4">Terminal Details</h6>
                      <hr className="mb-4" />
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            <strong>Product Type</strong>
                            <p></p>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h4 className="my-4 text-center">Card Terminal</h4>
                          <div className="table-container mt-2">
                            <table className="table table-striped table-hover table-bordered">
                              <thead style={{ color: "black" }}>
                                <tr className="height">
                                  <th style={{ minWidth: "140px" }}>
                                    <div className="d-flex px-2 justify-content-between align-content-center">
                                      <p style={{ textAlign: "end" }}>
                                        Product ID
                                      </p>
                                    </div>
                                  </th>
                                  {/* app type className="d-flex justify-content-between align-content-center" */}
                                  <th>
                                    <div>
                                      <p>Product Name</p>
                                      {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                                    </div>
                                  </th>
                                  {/* legal name */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>Connection Type</p>
                                    </div>
                                  </th>
                                  {/* trading name */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p className="ms-4">Connection Lenght</p>
                                    </div>
                                  </th>
                                  {/* mMID status */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>Terminal Option</p>
                                    </div>
                                  </th>
                                  {/* mMID status */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>Terminal Model</p>
                                    </div>
                                  </th>
                                  {/* account status */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>Monthly Price</p>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {quote?.application_products?.length === 0 ? (
                                  <>
                                    <tr>
                                      <td colSpan="11">
                                        <div className="not_found">
                                          <h4 className="my-4">
                                            No Data Found
                                          </h4>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    {quote?.application_products?.map(
                                      (data) => (
                                        <>
                                          <tr>
                                            <td>{data?.id}</td>
                                            <td>{data?.terminal_model}</td>
                                            <td>Data 3</td>
                                            <td>Data 4</td>
                                            <td>Data 4</td>
                                            <td>{data?.qty}</td>
                                            <td>{data?.price}</td>
                                          </tr>
                                        </>
                                      )
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h4 className="my-4 text-center">
                            E-Commerce or Virtual terminal
                          </h4>
                          <div className="table-container mt-2">
                            <table className="table table-striped table-hover table-bordered">
                              <thead style={{ color: "black" }}>
                                <tr className="height">
                                  <th style={{ minWidth: "140px" }}>
                                    <div className="d-flex px-2 justify-content-between align-content-center">
                                      <p style={{ textAlign: "end" }}>
                                        Product ID
                                      </p>
                                    </div>
                                  </th>
                                  <th style={{ minWidth: "140px" }}>
                                    <div className="d-flex px-2 justify-content-between align-content-center">
                                      <p style={{ textAlign: "end" }}>
                                        Service Type
                                      </p>
                                    </div>
                                  </th>
                                  {/* app type className="d-flex justify-content-between align-content-center" */}
                                  <th>
                                    <div>
                                      <p style={{ textAlign: "start" }}>
                                        WebSite Url
                                      </p>
                                      {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                                    </div>
                                  </th>
                                  {/* legal name */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>E-com Provider</p>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {quote?.application_products?.length === 0 ? (
                                  <>
                                    <tr>
                                      <td colSpan="11">
                                        <div className="not_found">
                                          <h4 className="my-4">
                                            No Data Found
                                          </h4>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    {quote?.application_products?.map(
                                      (data) => (
                                        <>
                                          <tr>
                                            <td>Data 4</td>
                                            <td>Data 4</td>
                                            <td>{data?.qty}</td>
                                            <td>{data?.price}</td>
                                          </tr>
                                        </>
                                      )
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h4 className="my-4 text-center">E-POS</h4>
                          <div className="table-container mt-2">
                            <table className="table table-striped table-hover table-bordered">
                              <thead style={{ color: "black" }}>
                                <tr className="height">
                                  <th style={{ minWidth: "140px" }}>
                                    <div className="d-flex px-2 justify-content-between align-content-center">
                                      <p style={{ textAlign: "end" }}>
                                        Product ID
                                      </p>
                                    </div>
                                  </th>
                                  <th style={{ minWidth: "140px" }}>
                                    <div className="d-flex px-2 justify-content-between align-content-center">
                                      <p style={{ textAlign: "end" }}>
                                        EPOS Option
                                      </p>
                                    </div>
                                  </th>
                                  {/* app type className="d-flex justify-content-between align-content-center" */}
                                  <th>
                                    <div>
                                      <p>Epos Provider</p>
                                      {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                                    </div>
                                  </th>
                                  {/* trading name */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p className="ms-4">Connection Lenght</p>
                                    </div>
                                  </th>
                                  {/* mMID status */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>One Of Cost</p>
                                    </div>
                                  </th>
                                  {/* account status */}
                                  <th>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <p>Monthly Price</p>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {quote?.application_products?.length === 0 ? (
                                  <>
                                    <tr>
                                      <td colSpan="11">
                                        <div className="not_found">
                                          <h4 className="my-4">
                                            No Data Found
                                          </h4>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    {quote?.application_products?.map(
                                      (data) => (
                                        <>
                                          <tr>
                                            <td>{data?.id}</td>
                                            <td>{data?.terminal_model}</td>
                                            <td>Data 3</td>
                                            <td>Data 3</td>
                                            <td>Data 4</td>
                                            <td>{data?.qty}</td>
                                          </tr>
                                        </>
                                      )
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <h6 className="my-4">Schedule of Fees</h6>
                      <hr className="mb-4" />
                      <div className="row">
                        <div className="col-md-6">
                          <h6 className="my-4">Debit</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3 row">
                                <label
                                  htmlFor="staticEmail"
                                  className="col-sm-4 col-form-label"
                                >
                                  Visa debit:
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 row">
                                <label
                                  htmlFor="staticEmail"
                                  className="col-sm-6 col-form-label"
                                >
                                  Mastercard debit:
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h6 className="my-4">Credit</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3 row">
                                <label
                                  htmlFor="staticEmail"
                                  className="col-sm-6 col-form-label"
                                >
                                  Visa Credit:
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3 row">
                                <label
                                  htmlFor="staticEmail"
                                  className="col-sm-6 col-form-label"
                                >
                                  Mastercard credit:
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <div>
                            <strong>Auth Fess</strong>
                            <input
                              disabled
                              placeholder={`${quote?.auth_fees}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>

                          <div>
                            <strong>Annual Card Turnover</strong>
                            <input
                              disabled
                              placeholder={`${quote?.annual_card_turnover}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>MMSC</strong>
                            <input
                              disabled
                              placeholder={`${quote?.mmsc}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Card Acceptance Ratio</strong>
                            <input
                              type="text"
                              className="form-control my-3"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Average transect value</strong>
                            <input
                              disabled
                              placeholder={`${quote?.atv}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                          <div>
                            <strong>Annual Turnover</strong>
                            <input
                              disabled
                              placeholder={`${quote?.annual_turnover}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <strong>Notes</strong>
                            <input
                              disabled
                              placeholder={`${quote?.note}`}
                              type="text"
                              className="form-control my-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 my-3 text-right">
              <a href="/new-application" className="btn btn-info">
                Back
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
