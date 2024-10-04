import React, { useEffect } from "react";
import { CCol, CRow } from "@coreui/react";
import list from "../../../../assets/img/list.svg";
import user from "../../../../assets/img/user.svg";
import telephone from "../../../../assets/img/telephone.svg";
import mail from "../../../../assets/img/mail icon.svg";
import internet from "../../../../assets/img/internet.svg";
import password from "../../../../assets/img/password (2).svg";
import location1 from "../../../../assets/img/loction icon.svg";
import locationImg from "../../../../assets/img/location.svg";
import address from "../../../../assets/img/address.svg";
import lock from "../../../../assets/img/lock.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetLeadsnput } from "../_redux/action/LeadAction";
import LegalName from "../leadCreate/LegalName";
import LeadPostCode from "../leadCreate/LeadPostCode";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import "../LeadsRetrieve/Retrieve.css";

import { GetEmailVerification } from "src/views/common/_redux/action/CommonAction";
import Cookies from "js-cookie"; // Import js-cookie
export default function RetrieveLeadInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.leadInfo.countryList);
  // const UserList = useSelector((state) => state.leadInfo.UserList);
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList);
  const Phone_regex = /^(07\d{9})$/; // regex for valid numbe
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));
  };
  const handleChangeAddress = (e) => {
    if (e.target.checked) {
      dispatch(GetLeadsnput("site_and_trading_address_same", 1));
      dispatch(GetLeadsnput("legal_postcode", leadInput.trading_postcode));
      dispatch(GetLeadsnput("legal_address1", leadInput.trading_address1));
      dispatch(GetLeadsnput("legal_address2", leadInput.trading_address2));
      dispatch(GetLeadsnput("legal_city", leadInput.trading_city));
      dispatch(GetLeadsnput("legal_county", leadInput.trading_county));
      dispatch(GetLeadsnput("legal_country", leadInput.trading_country));
    } else {
      dispatch(GetLeadsnput("site_and_trading_address_same", 0));

      dispatch(GetLeadsnput("legal_postcode", ""));
      dispatch(GetLeadsnput("legal_address1", ""));
      dispatch(GetLeadsnput("legal_address2", ""));
      dispatch(GetLeadsnput("legal_city", ""));
      dispatch(GetLeadsnput("legal_county", ""));
      // dispatch(GetLeadsnput("legal_country", ""));
    }
  };
  const getIndustryIndex = () => {
    let index = -1;
    IndustryList.map((opt) => {
      if (
        parseInt(opt.ptsave_industrytypeid) ===
        parseInt(leadInput.industry_type)
      ) {
        index = IndustryList.indexOf(opt);
      }
    });
    return index;
  };

  useEffect(() => {
    if (leadInput.legal_type === "ST") {
      dispatch(GetLeadsnput("company_house_no", ""));
      dispatch(GetLeadsnput("incorporated_on", null));
    }
  }, [leadInput.legal_type]);

  //email verification
  useEffect(() => {
    if (leadInput.email.includes("@")) {
      dispatch(
        GetEmailVerification(
          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${leadInput.email}`
        )
      );
    }
  }, [leadInput.email]);

  console.log(
    "leadinput.num_of_transaction",
    leadInput.num_of_transaction,
    leadInput.atv
  );
  return (
    <div className="leads">
      <CRow>
        <CCol md="12">
          <img src={list} width="25" alt="" />
          <strong style={{ fontWeight: "700" }}>New Leads Information </strong>
          <br />
          <br />
          {location.pathname.includes("retrieve-lead") && (
            <div className="row align-items-center mb-3">
              <div className="col-md-2">
                <strong
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "#3c4b64",
                  }}
                >
                  Lead Quality <span style={{ color: "#dd2c00" }}>*</span>:
                </strong>
              </div>
              <div className="col-md-10">
                <button
                  className={`${
                    leadInput.lead_type === 0 ? "active_basic_btn" : "basic_btn"
                  }`}
                  onClick={() => handleChangeInput("lead_type", 0)}
                >
                  Hot
                </button>
                <button
                  className={`${
                    leadInput.lead_type === 1 ? "active_basic_btn" : "basic_btn"
                  }`}
                  onClick={() => handleChangeInput("lead_type", 1)}
                >
                  Cold
                </button>
                <button
                  className={`${
                    leadInput.lead_type === 2 ? "active_basic_btn" : "basic_btn"
                  }`}
                  onClick={() => handleChangeInput("lead_type", 2)}
                >
                  Warm
                </button>
              </div>
            </div>
          )}
          {/* <div style={{ marginTop: "16px" }}>
            <label htmlFor="basic-url">Lead Owner </label>
            <div className="input-group my-3">
              <select
                className="form-select "
                aria-label="Default select example"
                name="lead_owner"
                value={leadInput.lead_owner}
                onChange={(e) =>
                  handleChangeInput("lead_owner", e.target.value)
                }
              >
                <option value="">--</option>

                {IndustryList?.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option?.first_name} {option?.last_name}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={user} width="21" alt="" />
                </span>
              </div>
            </div>
          </div> */}
          <div className="row align-items-center mb-3">
            <div className="col-md-2">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Select Business Type :
              </strong>
            </div>
            <div className="col-md-10">
              <button
                disabled
                className={`mb-2 ${
                  leadInput.legal_type === "L"
                    ? // ||
                      // leadInput.legal_type === "PL" ||
                      // leadInput.legal_type === "LLP"
                      "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => {
                  handleChangeInput("legal_type", "L");
                  dispatch(GetLeadsnput("business_type", ""));
                }}
              >
                Limited Company
              </button>
              <button
                disabled
                className={`mb-2 ${
                  leadInput.legal_type === "ST"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => {
                  handleChangeInput("legal_type", "ST");
                  dispatch(GetLeadsnput("business_type", ""));
                }}
              >
                Sole Trade
              </button>
              <button
                disabled
                className={`mb-2 ${
                  leadInput.business_type === "OT"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => {
                  handleChangeInput("legal_type", "OT");
                  dispatch(GetLeadsnput("business_type", "OT"));
                }}
              >
                Others (e.g. Partnership)
              </button>
            </div>
          </div>
          {leadInput.business_type === "OT" && (
            <div className="mb-3">
              {/* <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Select Business Type
                <span style={requiredstyle}> *</span>
              </strong> */}
              <select
                disabled
                className="form-select mt-3"
                aria-label="Default select example"
                name="legal_type"
                value={leadInput.legal_type}
                onChange={(e) =>
                  handleChangeInput("legal_type", e.target.value)
                }
              >
                {/* <option value={""}>-- Select --</option> */}
                <option value={"CH"}>Charity</option>
                <option value={"CL"}>Club</option>
                <option value={"PART"}>Partnership</option>
                <option value={"LLP"}>Limited Liability Partnership</option>
                <option value={"PL"}>Public Limited Company</option>
                <option value={"TR"}>Trust</option>
                <option value={"OT"}>Others</option>
              </select>
            </div>
          )}
        </CCol>
        <CCol md="6">
          {/* <!-- <form action=""> --> */}
          <div>
            <label htmlFor="basic-url">
              First Name <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="first_name"
                maxLength={20}
                value={leadInput.first_name}
                required
                onChange={(e) =>
                  handleChangeInput("first_name", e.target.value)
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
              Company/Legal Name <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className=" my-3">
              <LegalName
                style={{ margin: 0 }}
                name="legal_name"
                value={leadInput.legal_name}
                details={"lead"}
              />

              {/* <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={user} width="21" alt="" />
                </span>
              </div> */}
            </div>
          </div>

          {/* <div>
            <label htmlFor="basic-url">Select Director</label>
            <div className="input-group my-3">
              <input type="text" className="form-control border-end-0" />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={user} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">Company Registration Number</label>
            <div className="input-group my-3">
              <input type="text" className="form-control border-end-0" />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={user} width="21" alt="" />
                </span>
              </div>
            </div>
          </div> */}

          <div>
            <label htmlFor="basic-url">Telephone Number</label>
            <div className="input-group my-3">
              <input
                type="text"
                className={`form-control border-end-0 ${
                  leadInput.telephone !== null || leadInput.telephone !== ""
                    ? leadInput.telephone !== "" &&
                      leadInput.telephone !== null &&
                      leadInput.telephone?.length !== 11
                      ? " error_input"
                      : " "
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                maxLength={11}
                name="telephone"
                value={leadInput.telephone}
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
              Email
              {/* <span style={{ color: "#DD2C00" }}>*</span> */}
            </label>
            <div className="input-group  my-3 ">
              <input
                type="email"
                className={`form-control border-end-0 ${
                  (!regEmail.test(leadInput.email) &&
                    leadInput.email !== "" &&
                    leadInput.email !== null) ||
                  emailDetails?.message === "Invalid Email Provided"
                    ? " error_input"
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Primary Email"
                name="email"
                value={leadInput?.email?.toLowerCase()}
                required
                onChange={(e) =>
                  handleChangeInput("email", e.target.value?.toLowerCase())
                }
                style={{ height: "35px" }}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white"
                  id="basic-addon2"
                  style={{ padding: "9px", height: "35px" }}
                >
                  <img src={mail} width="20" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "22px" }}>
            <div className="input-group my-3">
              <input
                style={{ height: "35px" }}
                type="email"
                className={`form-control border-end-0 input-group  ${
                  !regEmail.test(leadInput.secondary_email) &&
                  leadInput.secondary_email !== "" &&
                  leadInput.secondary_email !== null
                    ? " error_input"
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Secondary Email"
                name="secondary_email"
                value={leadInput?.secondary_email?.toLowerCase()}
                onChange={(e) => {
                  handleChangeInput(
                    "secondary_email",
                    e.target.value?.toLowerCase()
                  );
                  // if (e.target.value?.includes("@")) {
                  //   dispatch(
                  //     GetEmailVerification(
                  //       `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${e.target.value}`
                  //     )
                  //   );
                  // }
                }}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white"
                  id="basic-addon2"
                  style={{ padding: "9px", height: "35px" }}
                >
                  <img src={mail} width="20" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">Website</label>
            <div className={`input-group  my-3 `}>
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="website"
                value={leadInput.website}
                onChange={(e) => {
                  handleChangeInput("website", e.target.value);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={internet} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <img src={locationImg} width="25" alt="" />
          <strong
            style={{ fontWeight: "700", fontSize: "14px", color: "#3c4b64" }}
          >
            Trading Address
          </strong>
          <br />
          <br />
          <div>
            <label htmlFor="browser">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Post Code <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <LeadPostCode
                name="trading_postcode"
                value={leadInput.trading_postcode}
                details="lead_trading_postcode"
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={password} width="21" alt="" />
                </span>
              </div>
            </div>
            <div>
              <div className="postCode"></div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Address 1 <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                name="trading_address1"
                value={leadInput.trading_address1}
                onChange={(e) =>
                  handleChangeInput("trading_address1", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={address} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Address 2
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_address2"
                value={leadInput.trading_address2}
                onChange={(e) =>
                  handleChangeInput("trading_address2", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={address} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                City/Town <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                name="trading_city"
                value={leadInput.trading_city}
                onChange={(e) =>
                  handleChangeInput("trading_city", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location1} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                County
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="trading_county"
                value={leadInput.trading_county}
                onChange={(e) =>
                  handleChangeInput("trading_county", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location1} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Country <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
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
                value={countryList?.[leadInput.trading_country - 1] || null}
                getOptionLabel={(option) => option.name}
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
        </CCol>
        <CCol md="6">
          <div>
            <label htmlFor="basic-url">
              Last Name{" "}
              <span style={{ color: "#dd2c00" }}>
                <span style={{ color: "#dd2c00" }}>*</span>
              </span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                maxLength={20}
                name="last_name"
                value={leadInput.last_name}
                onChange={(e) => handleChangeInput("last_name", e.target.value)}
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
                value={leadInput.trading_name}
                onChange={(e) =>
                  handleChangeInput("trading_name", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={user} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          {/* <div className="mt-4">
            <div className="row">
              <div className="col-md-9">
                <label
                  htmlFor=""
                  style={{
                    fontWeight: "600",
                    color: "#3c4b64",
                    fontSize: "14px",
                  }}
                >
                  Do you currently have a card machine with another provider?
                </label>
              </div>
              <div className="col-md-3">
                <button className="basic_btn">Yes</button>
                <button className="basic_btn">No</button>
              </div>
            </div>
          </div> */}
          {/* <div style={{ marginTop: "14px" }}>
            <label htmlFor="basic-url">
              Provider Name <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <select
              className="form-select my-3"
              aria-label="Default select example"
              name="ptsave_oldcardprovider"
            >
              <option>-- Select --</option>
              <option value={"184090003"}>Elavon</option>
              <option value={"184090000"}>Worlpay</option>
              <option value={"184090002"}>Viva wallet</option>
              <option value={"184090001"}>Truest Payment</option>
            </select>
          </div> */}

          <div>
            <label htmlFor="basic-url">
              Mobile number <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className={`form-control border-end-0 ${
                  !Phone_regex.test(leadInput.mobile) &&
                  leadInput.mobile !== "" &&
                  leadInput.mobile !== null
                    ? "error_input"
                    : ""
                }`}
                inputMode="numeric" // Set input mode to numeric
                pattern="[0-9]*" // Restrict input to numbers only
                maxLength={11}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="mobile"
                value={leadInput.mobile}
                // onChange={(e) => handleChangeInput("mobile", e.target.value)}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  handleChangeInput("mobile", numericValue);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={telephone} width="21" alt="" />
                </span>
              </div>
            </div>
            {leadInput.mobile !== null &&
              leadInput.mobile !== "" &&
              !Phone_regex.test(leadInput.mobile) && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Should be start with 07
                </p>
              )}
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Industry Type</label>
            <Autocomplete
              className=" mt-3"
              id="country-select-demo"
              size="small"
              options={IndustryList}
              autoHighlight
              getOptionLabel={(option) => option.ptsave_name}
              value={IndustryList?.[getIndustryIndex()] || null}
              onChange={(event, newValue) => {
                if (newValue) {
                  IndustryList.map((item) => {
                    if (
                      item.ptsave_industrytypeid ===
                      newValue.ptsave_industrytypeid
                    ) {
                      dispatch(GetLeadsnput("mcc_code", item.ptsave_code));
                    }
                  });
                  handleChangeInput(
                    "industry_type",
                    newValue.ptsave_industrytypeid
                  );
                } else {
                  dispatch(GetLeadsnput("mcc_code", ""));

                  handleChangeInput("industry_type", "");
                }
              }}
              sortOptions={(a, b, inputValue) => {
                const aLabel = a.ptsave_name.toLowerCase();
                const bLabel = b.ptsave_name.toLowerCase();
                const inputVal = inputValue.toLowerCase();

                if (
                  aLabel.startsWith(inputVal) &&
                  !bLabel.startsWith(inputVal)
                ) {
                  return -1; // a comes first
                }
                if (
                  !aLabel.startsWith(inputVal) &&
                  bLabel.startsWith(inputVal)
                ) {
                  return 1; // b comes first
                }
                return 0; // no sorting
              }}
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
          {/* <br />
          <br /> */}

          <div style={{ marginTop: "16px" }}>
            {/* <label htmlFor="basic-url">MCC Code </label> */}
            <div className="input-group my-3">
              <select
                className="form-select "
                aria-label="Default select example"
                name="mcc_code"
                disabled
                value={leadInput.mcc_code}
                onChange={(e) => handleChangeInput("mcc_code", e.target.value)}
              >
                <option value="">-- MCC Code --</option>

                {IndustryList?.map((option) => (
                  <option
                    key={option?.ptsave_industrytypeid}
                    value={option?.ptsave_code}
                  >
                    {option?.ptsave_code}
                  </option>
                ))}
              </select>
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={lock} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="basic-url">Lead Note</label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0 "
                required
                name="note"
                value={leadInput.note}
                onChange={(e) => handleChangeInput("note", e.target.value)}
                style={{ height: "35px" }}
              />
              <div className="input-group-append" style={{ height: "35px" }}>
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={list} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <CRow>
            <CCol md="6">
              <img src={locationImg} width="25" alt="" />
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Legal Address
              </strong>
            </CCol>
            <CCol md="6">
              {" "}
              <div className="d-flex gap-2 justify-content-end">
                <div className="">
                  <input
                    type="checkbox"
                    value={leadInput.site_and_trading_address_same}
                    checked={
                      leadInput.site_and_trading_address_same === 1
                        ? true
                        : false
                    }
                    onChange={(e) => handleChangeAddress(e)}
                  />
                </div>
                <div className="">
                  <strong
                    style={{
                      fontWeight: "700",
                      fontSize: "13px",
                      color: "#3c4b64",
                    }}
                  >
                    Same as trading address?
                  </strong>
                </div>
              </div>
            </CCol>
          </CRow>
          <br />

          <div>
            <label htmlFor="browser">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Post Code <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <LeadPostCode
                name="legal_postcode"
                value={leadInput.legal_postcode}
                details="lead_legal_postcode"
              />
              {/* <input
                type="text"
                list="browsers"
                name="browser"
                id="my-input-field"
                className="form-control border-end-0"
                required
              /> */}
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={password} width="21" alt="" />
                </span>
              </div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Address 1 <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="legal_address1"
                value={leadInput.legal_address1}
                onChange={(e) =>
                  handleChangeInput("legal_address1", e.target.value)
                }
                required
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={address} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Address 2
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="legal_address2"
                value={leadInput.legal_address2}
                onChange={(e) =>
                  handleChangeInput("legal_address2", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={address} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                City/Town <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="legal_city"
                value={leadInput.legal_city}
                onChange={(e) =>
                  handleChangeInput("legal_city", e.target.value)
                }
                required
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location1} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                County
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="legal_county"
                value={leadInput.legal_county}
                onChange={(e) =>
                  handleChangeInput("legal_county", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location1} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Country <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className=" my-3">
              <Autocomplete
                size="small"
                options={countryList}
                onChange={(event, newValue) =>
                  handleChangeInput(
                    "legal_country",
                    newValue === null ? null : newValue.id
                  )
                }
                value={countryList?.[leadInput.legal_country - 1] || null}
                getOptionLabel={(option) => option.name}
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
        </CCol>
      </CRow>
    </div>
  );
}
