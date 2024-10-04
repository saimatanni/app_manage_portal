import React, { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { CCol, CRow } from "@coreui/react";
import list from "../../../assets/img/list.svg";
import user from "../../../assets/img/user.svg";
import telephone from "../../../assets/img/telephone.svg";
import mail from "../../../assets/img/mail icon.svg";
import internet from "../../../assets/img/internet.svg";
import password from "../../../assets/img/password (2).svg";
import location from "../../../assets/img/loction icon.svg";

import address from "../../../assets/img/address.svg";
import lock from "../../../assets/img/lock.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetApplicationInput,
  GetApplicationList,
} from "../NewApplication/_redux/action/ApplicationAction";
import LegalName from "../Leads/leadCreate/LegalName";
import ApplicationPostCode from "./ApplicationPostCode";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { GetEmailVerification } from "src/views/common/_redux/action/CommonAction";
export default function OpportunityLeads() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const applicationList = useSelector(
    (state) => state.applicationInfo.applicationList || []
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);

  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const Phone_regex = /^(07\d{9})$/; // regex for valid numbers
  // const maxLength = applicationInput.mobile.startsWith("7") ? 10 : 11;

  const countryList = useSelector((state) => state.leadInfo.countryList);
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList);

  const getIndustryIndex = () => {
    var index = -1;
    IndustryList.map((opt) => {
      if (
        parseInt(opt.ptsave_industrytypeid) ===
        parseInt(applicationInput.industry_type)
        //   ||
        // opt.ptsave_code.includes(applicationInput?.mcc_code)
      ) {
        index = IndustryList.indexOf(opt);
        // dispatch(
        //   GetApplicationInput(
        //     "industry_type",
        //     IndustryList[index].ptsave_industrytypeid
        //   )
        // );
      }
    });
    return index;
  };

  const getTradingcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(applicationInput.trading_country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };
  const getLegalCountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(applicationInput.legal_country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };

  useEffect(() => {
    let activeStep = parseInt(localStorage.getItem("activeStep"));
    if (activeStep !== 9) {
      const handleScroll = () => {
        window.scrollTo(0, 0);
      };

      // Scroll to top when component mounts
      handleScroll();

      // Scroll to top on navigate
      const scrollOnNavigate = () => {
        handleScroll();
      };

      // Attach scrollOnNavigate as a listener to the beforeunload event
      window.addEventListener("beforeunload", scrollOnNavigate);

      // Cleanup the event listener when component unmounts
      return () => {
        window.removeEventListener("beforeunload", scrollOnNavigate);
      };
    }
  }, []);

  const userData = JSON.parse(Cookies.get("userData"));
  const handleChangeInput = (name, value, e, contact = undefined) => {
    dispatch(GetApplicationInput(name, value, e));
    // dispatch(GetApplicationInput("user", userData.id));
    dispatch(GetApplicationInput("sales_partner", userData.id));
    dispatch(GetApplicationInput("partner_manager", userData.partner_manager));
    if (name === "application_type" && value !== 4) {
      dispatch(GetApplicationInput("cole_from", ""));
    }
    if (name === "trading_name") {
      dispatch(GetApplicationInput("company_name", value));
    }
    if (value === "CH" && name === "legal_type") {
      dispatch(GetApplicationInput("company_house_no", ""));
      dispatch(GetApplicationInput("incorporated_on", null));
      dispatch(GetApplicationInput("legal_address1", ""));
      dispatch(GetApplicationInput("legal_city", ""));
      dispatch(GetApplicationInput("legal_postcode", ""));
    }
    if (value === "ST" && name === "legal_type") {
      dispatch(GetApplicationInput("company_house_no", ""));
      dispatch(GetApplicationInput("incorporated_on", null));
      dispatch(GetApplicationInput("legal_address1", ""));
      dispatch(GetApplicationInput("legal_city", ""));
      dispatch(GetApplicationInput("legal_postcode", ""));
    } else if (
      applicationInput.legal_type === "L" ||
      applicationInput.legal_type === "PL" ||
      applicationInput.legal_type === "LLP"
    ) {
      dispatch(GetApplicationInput("charity_number", ""));
    }
    if (name === "email") {
      dispatch(
        GetApplicationInput("owner_email", value, 0, "business_owners", contact)
      );
    }
    if (name === "mobile") {
      dispatch(
        GetApplicationInput(
          "owner_phone_no",
          value,
          0,
          "business_owners",
          contact
        )
      );
    }
    if (
      applicationInput.s_individual_sales_representatives === null ||
      applicationInput.s_individual_sales_representatives === ""
    ) {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          userData.first_name + " " + userData.last_name
        )
      );
    }
  };
  const handleChangeAddress = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(GetApplicationInput("site_and_trading_address_same", 1));
      dispatch(
        GetApplicationInput("legal_postcode", applicationInput.trading_postcode)
      );
      dispatch(
        GetApplicationInput("legal_address1", applicationInput.trading_address1)
      );
      dispatch(
        GetApplicationInput("legal_address2", applicationInput.trading_address2)
      );
      dispatch(
        GetApplicationInput("legal_city", applicationInput.trading_city)
      );
      dispatch(
        GetApplicationInput("legal_county", applicationInput.trading_county)
      );
      dispatch(
        GetApplicationInput("legal_country", applicationInput.trading_country)
      );
    } else {
      dispatch(GetApplicationInput("site_and_trading_address_same", 0));

      dispatch(GetApplicationInput("legal_postcode", ""));
      dispatch(GetApplicationInput("legal_address1", ""));
      dispatch(GetApplicationInput("legal_address2", ""));
      dispatch(GetApplicationInput("legal_city", ""));
      dispatch(GetApplicationInput("legal_county", ""));
      // dispatch(GetApplicationInput("legal_country", ""));
    }
    // dispatch(GetApplicationInput('trading_postcode', applicationInput.legal_postcode))
  };
  React.useEffect(() => {
    // dispatch(GetApplicationInput("user", userData.id));
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me = Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(GetApplicationInput("sales_partner", userData.id));
    if (!applicationInput.desc_of_service) {
      dispatch(GetApplicationInput("desc_of_service", ""));
    }
    if (
      applicationInput.s_individual_sales_representatives === null ||
      applicationInput.s_individual_sales_representatives === ""
    ) {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          userData.first_name + " " + userData.last_name
        )
      );
    }
  }, []);
  React.useEffect(() => {
    // dispatch(GetApplicationInput("user", userData.id));
    if (applicationInput.application_type === 2) {
      dispatch(GetApplicationInput("security_bin_check", true));
      dispatch(GetApplicationInput("security_velocity_check", true));
      dispatch(GetApplicationInput("security_ip_geo_check", true));
    } else {
      dispatch(GetApplicationInput("security_bin_check", false));
      dispatch(GetApplicationInput("security_velocity_check", false));
      dispatch(GetApplicationInput("security_ip_geo_check", false));
    }
  }, [applicationInput.application_type, userData.id]);

  //email verification
  useEffect(() => {
    if (applicationInput.email.includes("@")) {
      dispatch(
        GetEmailVerification(
          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${applicationInput.email}`
        )
      );
    }
  }, [applicationInput.email]);
  return (
    <div className="leads" id="appInput">
      <CRow>
        {/* <div className="row align-items-center">
            <div className="col-md-4 my-3">
              <strong style={{fontSize:"14px",color:"#3c4b64"}}>Selecte Business Type :</strong>
            </div>
            <div className="col-md-8">
              <button className="basic_btn ">
                Limited Company
              </button>
              <button className="basic_btn mb-1">
                Sole Trade
              </button>
              <button className="basic_btn mb-1">
                Others (e.g Partnership)
              </button>
            </div>
          </div> */}
        <CCol lg="12">
          <img src={list} width="25" alt="" />
          <strong>New Leads Information </strong>
          <br />
          <br />
          <div className="row my-4">
            <div className="col-md-3 col-lg-2 mb-3">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Application Type : <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </div>
            <div className="col-md-9 col-lg-10 ">
              {(applicationInput.application_type === 1 ||
                applicationInput.application_type === 2) && (
                <button
                  className={`mb-2 ${
                    applicationInput.application_type === 1 ||
                    applicationInput.application_type === 2
                      ? "active_basic_btn"
                      : "basic_btn"
                  }`}
                  onClick={() => {
                    handleChangeInput("application_type", 1);
                    handleChangeInput("existing_mid", "");
                  }}
                >
                  New Application
                </button>
              )}
              {applicationInput.application_type === 4 && (
                <button
                  // style={{ opacity: "0.5", cursor: "default" }}
                  className={`mb-2 ${
                    applicationInput.application_type === 4
                      ? "active_basic_btn"
                      : "basic_btn"
                  }`}
                  onClick={() => {
                    handleChangeInput("application_type", 4);
                    handleChangeInput("existing_mid", "");
                  }}
                >
                  Change of Legel Entity
                </button>
              )}

              {applicationInput.application_type === 5 && (
                <button
                  // style={{ opacity: "0.5", cursor: "default" }}
                  // disabled
                  className={`mb-2 ${
                    applicationInput.application_type === 5
                      ? "active_basic_btn"
                      : "basic_btn"
                  }`}
                  onClick={() => handleChangeInput("application_type", 5)}
                >
                  Additional Outlets
                </button>
              )}

              {/* <CTooltip
                content="Comming soon."
                placement="top"
                trigger={["hover", "focus"]}
              >
                <button
                  style={{ opacity: "0.5", cursor: "default" }}
                  // disabled
                  className={`mb-2 ${
                    applicationInput.application_type === 5
                      ? "basic_btn"
                      : "basic_btn"
                  }`}
                  // onClick={() => handleChangeInput("application_type", 5)}
                >
                  Multiple Outlets
                </button>
              </CTooltip>
              <CTooltip
                content="Comming soon."
                placement="top"
                trigger={["hover", "focus"]}
              >
                <button
                  style={{ opacity: "0.5", cursor: "default" }}
                  // disabled
                  className={`mb-2 ${
                    applicationInput.application_type === 5
                      ? "basic_btn"
                      : "basic_btn"
                  }`}
                  // onClick={() => handleChangeInput("application_type", 5)}
                >
                  Additional Terminal
                </button>
              </CTooltip> */}
            </div>
          </div>
          {applicationInput.application_type === 5 && (
            <>
              <div className="row my-4">
                <div className="col-md-2 mb-3">
                  <label htmlFor="basic-url">
                    Existing Mid<span style={{ color: "#DD2C00" }}>*</span>
                  </label>
                </div>

                <div className="col-md-8 col-lg-5 col-xxl-4">
                  <input
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    type="text"
                    className="form-control "
                    required
                    name="existing_mid"
                    value={applicationInput.existing_mid}
                    onChange={(e) => {
                      handleChangeInput("existing_mid", e.target.value);
                      dispatch(
                        GetApplicationList(
                          `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/new/?query=${e.target.value}`
                        )
                      );
                    }}
                  />
                </div>
              </div>

              <div className="row my-4">
                <div className="col-md-2 mb-3">
                  <label htmlFor="basic-url">
                    Existing Business<span style={{ color: "#DD2C00" }}>*</span>
                  </label>
                </div>

                <div className="col-md-8 col-lg-5 col-xxl-4">
                  <input
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    type="text"
                    className="form-control "
                    required
                    name="existing_mid"
                    value={applicationInput.legal_name}
                  />
                </div>
              </div>
            </>
          )}
          <div className="row align-items-center">
            <div className="col-md-3 col-lg-2  mt-3">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Select Business Type :{" "}
                <span style={{ color: "#DD2C00" }}>*</span>{" "}
              </strong>
            </div>
            <div className="col-md-9 col-lg-10 ">
              <button
                style={{
                  opacity: applicationInput.application_type === 5 && "0.5",
                  cursor: applicationInput.application_type === 5 && "default",
                }}
                disabled={applicationInput.application_type === 5 && true}
                className={`mb-2 ${
                  applicationInput.legal_type === "ST"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput("legal_type", "ST")}
              >
                Sole Trade
              </button>
              <button
                style={{
                  opacity: applicationInput.application_type === 5 && "0.5",
                  cursor: applicationInput.application_type === 5 && "default",
                }}
                disabled={applicationInput.application_type === 5 && true}
                className={`mb-2 ${
                  applicationInput.legal_type === "PART" ||
                  applicationInput.legal_type === "OT" ||
                  applicationInput.legal_type === "TR" ||
                  applicationInput.legal_type === "CL" ||
                  applicationInput.legal_type === "CH"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput("legal_type", "OT")}
              >
                Others (e.g. Partnership)
              </button>
              <button
                style={{
                  opacity: applicationInput.application_type === 5 && "0.5",
                  cursor: applicationInput.application_type === 5 && "default",
                }}
                disabled={applicationInput.application_type === 5 && true}
                className={`mb-2 ${
                  applicationInput.legal_type === "L" ||
                  applicationInput.legal_type === "PL" ||
                  applicationInput.legal_type === "LLP"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput("legal_type", "L")}
              >
                Limited
              </button>
            </div>
          </div>
        </CCol>
        <CCol md="12" className="mb-3">
          {(applicationInput.legal_type === "OT" ||
            applicationInput.legal_type === "CH" ||
            applicationInput.legal_type === "CL" ||
            applicationInput.legal_type === "TR" ||
            applicationInput.legal_type === "PART") && (
            <select
              className="form-select mt-3"
              aria-label="Default select example"
              name="legal_type"
              value={applicationInput.legal_type}
              onChange={(e) => handleChangeInput("legal_type", e.target.value)}
            >
              <option value={""}>-- Select --</option>
              <option value={"CH"}>Charity</option>
              <option value={"CL"}>Club</option>
              <option value={"PART"}>Partnership</option>
              {/* <option value={"LLP"}>Limited Liability Partnership</option>
              <option value={"PL"}>Public Limited Company</option> */}
              <option value={"TR"}>Trust</option>
              <option value={"OT"}>Others</option>
            </select>
          )}
        </CCol>
        <CCol md="6">
          {/* <!-- <form action=""> --> */}

          {applicationInput.application_type === 4 && (
            <div>
              <label htmlFor="basic-url">
                Old Mid<span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control border-end-0"
                  required
                  name="cole_from"
                  value={applicationInput.cole_from}
                  onChange={(e) =>
                    handleChangeInput("cole_from", e.target.value.toUpperCase())
                  }
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text bg-white"
                    id="basic-addon2"
                    style={{ height: "35px" }}
                  >
                    <img src={user} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
          )}
          {applicationInput.legal_type === "L" ||
          applicationInput.legal_type === "LLP" ||
          applicationInput.legal_type === "PL" ? (
            <div>
              <label htmlFor="basic-url">
                Company/Legal Name <span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className=" my-3">
                <LegalName
                  style={{ margin: 0 }}
                  name="legal_name"
                  value={applicationInput.legal_name}
                  details={"application"}
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="basic-url">
                Legal Name <span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  disabled={
                    applicationInput.application_type === 5 ? true : false
                  }
                  type="text"
                  className="form-control border-end-0"
                  required
                  name="legal_name"
                  value={applicationInput.legal_name}
                  onChange={(e) =>
                    handleChangeInput(
                      "legal_name",
                      e.target.value.toUpperCase()
                    )
                  }
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text bg-white"
                    id="basic-addon2"
                    style={{ height: "35px" }}
                  >
                    <img src={user} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="basic-url">Telephone Number</label>
            <div className="input-group my-3">
              <input
                type="text"
                className={`form-control border-end-0 ${
                  applicationInput.telephone !== null ||
                  applicationInput.telephone !== ""
                    ? applicationInput.telephone !== "" &&
                      applicationInput.telephone !== null &&
                      applicationInput.telephone?.length !== 11
                      ? " error_input"
                      : " "
                    : " "
                }`}
                maxLength={11}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="telephone"
                value={applicationInput.telephone}
                onChange={(e) =>
                  handleChangeInput(
                    "telephone",
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={telephone} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="basic-url">
              Email<span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="email"
                className={`form-control border-end-0${
                  (!regEmail.test(applicationInput?.email) &&
                    applicationInput?.email !== "" &&
                    applicationInput?.email !== null) ||
                  emailDetails?.message === "Invalid Email Provided"
                    ? " error_input"
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Primary Email"
                name="email"
                value={applicationInput?.email?.toLowerCase()}
                onChange={(e) =>
                  handleChangeInput("email", e.target.value.toLowerCase())
                }
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white"
                  id="basic-addon2"
                  style={{ padding: "9px 8px" }}
                >
                  <img src={mail} width="20" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="input-group my-3">
              <input
                type="email"
                className={`form-control border-end-0 ${
                  !regEmail.test(applicationInput.secondary_email) &&
                  applicationInput.secondary_email !== "" &&
                  applicationInput.secondary_email !== null
                    ? " error_input"
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Secondary Email"
                name="secondary_email"
                value={applicationInput.secondary_email}
                onChange={(e) =>
                  handleChangeInput("secondary_email", e.target.value)
                }
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white"
                  id="basic-addon2"
                  style={{ padding: "9px 8px" }}
                >
                  <img src={mail} width="20" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">Website</label>
            <div className="input-group  my-3">
              <input
                type="text"
                className={`form-control border-end-0 `}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="website"
                value={applicationInput.website}
                onChange={(e) => handleChangeInput("website", e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={internet} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
        </CCol>
        <CCol md="6">
          <div>
            <label htmlFor="basic-url">
              Trading Name <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="trading_name"
                value={applicationInput.trading_name}
                onChange={(e) =>
                  handleChangeInput(
                    "trading_name",
                    e.target.value.toUpperCase()
                  )
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={user} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="basic-url">
              Mobile number <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <div className="input-group  my-3">
              <input
                type="text"
                className={`form-control border-end-0 ${
                  !Phone_regex.test(applicationInput.mobile) &&
                  applicationInput.mobile !== "" &&
                  applicationInput.mobile !== null
                    ? "error_input"
                    : ""
                }`}
                maxLength={11}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="mobile"
                value={applicationInput.mobile}
                onChange={(e) =>
                  handleChangeInput("mobile", e.target.value.replace(/\D/g, ""))
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={telephone} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Industry Type</label>

            <Autocomplete
              // disabled={applicationInput.application_type === 5 ? true : false}
              className="my-3"
              size="small"
              options={IndustryList}
              value={IndustryList?.[getIndustryIndex()] || null}
              getOptionLabel={(option) => option.ptsave_name.toUpperCase()}
              onChange={(event, newValue) => {
                if (newValue) {
                  IndustryList.map((item) => {
                    if (
                      item.ptsave_industrytypeid ===
                      newValue.ptsave_industrytypeid
                    ) {
                      dispatch(
                        GetApplicationInput("mcc_code", item.ptsave_code)
                      );
                    }
                  });
                  handleChangeInput(
                    "industry_type",
                    newValue.ptsave_industrytypeid
                  );
                } else {
                  dispatch(GetApplicationInput("mcc_code", null));

                  handleChangeInput("industry_type", "");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      backgroundColor: "#fff",
                      // applicationInput.application_type === 5
                      //   ? "#e9ecef"
                      //   : "#fff",
                      borderRadius: "0.375rem",
                      // border: "1px solid #ced4da",
                      fontSize: "1rem",
                      padding: "6px 12px",
                      height: "calc(1.5em + .75rem + 2px)",
                    },
                  }}
                />
              )}
            />
          </div>

          <br />
          <br />
          <div className="mt-3">
            <label htmlFor="basic-url">MCC Code </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="mcc_code"
                disabled
                value={applicationInput.mcc_code}
                onChange={(e) => handleChangeInput("mcc_code", e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={lock} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
        </CCol>

        {/* -address------------- */}
        <CRow>
          <CCol md="6">
            <>
              <img src={location} width="25" alt="" />
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Trading Address
              </strong>
              <br />
              <br />
              <div>
                <label htmlFor="browser">
                  Post Code <span style={{ color: "#DD2C00" }}>*</span>
                </label>
                <div className="input-group my-3">
                  <ApplicationPostCode
                    name="trading_postcode"
                    value={applicationInput.trading_postcode}
                    details="application_trading_postcode"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={password} width="21" alt="" />
                    </span>
                  </div>
                </div>

                <datalist id="browsers">
                  <option></option>
                </datalist>
              </div>

              <div>
                <label htmlFor="basic-url">
                  Address 1<span style={{ color: "#DD2C00" }}>*</span>
                </label>
                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name="trading_address1"
                    value={applicationInput.trading_address1}
                    onChange={(e) =>
                      handleChangeInput(
                        "trading_address1",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={address} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">Address 2</label>
                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    name="trading_address2"
                    value={applicationInput.trading_address2}
                    onChange={(e) =>
                      handleChangeInput(
                        "trading_address2",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={address} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">
                  City/Town<span style={{ color: "#DD2C00" }}>*</span>
                </label>
                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    name="trading_city"
                    value={applicationInput.trading_city}
                    onChange={(e) =>
                      handleChangeInput(
                        "trading_city",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={location} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">County</label>
                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name="trading_county"
                    value={applicationInput.trading_county}
                    onChange={(e) =>
                      handleChangeInput(
                        "trading_county",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={location} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">Country</label>
                <div className=" my-3">
                  <Autocomplete
                    size="small"
                    options={countryList}
                    onChange={(event, newValue) =>
                      handleChangeInput(
                        "trading_country",
                        newValue === null ? null : newValue.id
                      )
                    }
                    // value={
                    //   countryList?.[applicationInput.trading_country-1] ||
                    //   null
                    // }
                    value={countryList?.[getTradingcountryIndex()] || null}
                    getOptionLabel={(option) => option?.name.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // variant="outlined"
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            backgroundColor: "#fff",
                            borderRadius: "0.375rem",
                            // border: "1px solid #ced4da",
                            fontSize: "1rem",
                            padding: "5px 12px",
                          },
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </>
          </CCol>
          <CCol md="6">
            <>
              <CRow>
                <CCol col-6>
                  <img src={location} width="25" alt="" />
                  <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                    Legal Address
                  </strong>
                </CCol>
                <CCol md="6">
                  {" "}
                  <div className="d-flex gap-2 justify-content-end align-items-center">
                    <input
                      style={{ width: "20px", height: "20px" }}
                      disabled={
                        applicationInput.application_type === 5 ? true : false
                      }
                      type="checkbox"
                      value={applicationInput.site_and_trading_address_same}
                      checked={
                        applicationInput.site_and_trading_address_same === 1
                          ? true
                          : false
                      }
                      onChange={(e) => handleChangeAddress(e)}
                    />

                    <div className="">
                      <strong style={{ fontSize: "13px", color: "#3c4b64" }}>
                        Same as trading address?
                      </strong>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <br />
              {/* <br /> */}
              <div>
                <label htmlFor="browser">
                  Post Code<span style={{ color: "#DD2C00" }}>*</span>
                </label>
                <div className="input-group my-3">
                  <ApplicationPostCode
                    name="legal_postcode"
                    value={applicationInput.legal_postcode}
                    details="application_legal_postcode"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={password} width="21" alt="" />
                    </span>
                  </div>
                </div>

                <datalist id="browsers">
                  <option></option>
                </datalist>
              </div>

              <div>
                <label htmlFor="basic-url">
                  Address 1<span style={{ color: "#DD2C00" }}>*</span>
                </label>
                <div className="input-group my-3">
                  <input
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    type="text"
                    className="form-control border-end-0"
                    required
                    name="legal_address1"
                    value={applicationInput.legal_address1}
                    onChange={(e) =>
                      handleChangeInput(
                        "legal_address1",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={address} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">Address 2</label>
                <div className="input-group my-3">
                  <input
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    type="text"
                    className="form-control border-end-0"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name="legal_address2"
                    value={applicationInput.legal_address2}
                    onChange={(e) =>
                      handleChangeInput(
                        "legal_address2",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={address} width="21" alt="" />
                  </span>
                </div>
              </div>
              {/* </div> */}

              <div>
                <label htmlFor="basic-url">
                  City/Town<span style={{ color: "#DD2C00" }}>*</span>
                </label>
                <div className="input-group my-3">
                  <input
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    type="text"
                    className="form-control border-end-0"
                    name="legal_city"
                    value={applicationInput.legal_city}
                    onChange={(e) =>
                      handleChangeInput(
                        "legal_city",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={location} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">County</label>
                <div className="input-group my-3">
                  <input
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    type="text"
                    className="form-control border-end-0"
                    name="legal_county"
                    value={applicationInput.legal_county}
                    onChange={(e) =>
                      handleChangeInput(
                        "legal_county",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={location} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="basic-url">Country</label>
                <div className=" my-3">
                  <Autocomplete
                    disabled={
                      applicationInput.application_type === 5 ? true : false
                    }
                    size="small"
                    options={countryList}
                    onChange={(event, newValue) =>
                      handleChangeInput(
                        "legal_country",
                        newValue === null ? null : newValue.id
                      )
                    }
                    value={countryList?.[getLegalCountryIndex()] || null}
                    getOptionLabel={(option) => option?.name.toUpperCase()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // variant="outlined"
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            backgroundColor:
                              applicationInput.application_type === 5
                                ? "#e9ecef"
                                : "#fff",
                            borderRadius: "0.375rem",
                            // border: "1px solid #ced4da",
                            fontSize: "1rem",
                            padding: "5px 12px",
                          },
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </>
          </CCol>
        </CRow>
      </CRow>
      {/* <SignAndConfirm/> */}
    </div>
  );
}
