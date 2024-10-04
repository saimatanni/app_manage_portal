import React, { useEffect, useState } from "react";
// import { CDatePicker } from '@coreui/react-pro'
import { CCol, CRow } from "@coreui/react";
import resume from "../../../assets/img/resume.svg";
import user from "../../../assets/img/user.svg";
import crn from "../../../assets/img/CRN.svg";
import location from "../../../assets/img/location.svg";
import address from "../../../assets/img/address.svg";
import mail from "../../../assets/img/mail icon.svg";
import password from "../../../assets/img/password (2).svg";
import telephone from "../../../assets/img/telephone.svg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetApplicationInput,
  GetVatList,
} from "../NewApplication/_redux/action/ApplicationAction";
import LegalName from "../Leads/leadCreate/LegalName";
import ApplicationPostCode from "./ApplicationPostCode";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Cookies from 'js-cookie'; // Import js-cookie
import { GetEmailVerification } from "src/views/common/_redux/action/CommonAction";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function BusinessDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(Cookies.get("userData"));
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);

  const companyOfficerDetails = useSelector((state) =>
    state.leadInfo.companyOfficerDetails.filter((item) => !item.resigned_on)
  );
  const countryList = useSelector((state) => state.leadInfo.countryList);


  

  const handleChangeInput = (name, value) => {
    dispatch(GetApplicationInput(name, value));
    // if (name === "incorporated_on" && value) {
    //   dispatch(
    //     GetApplicationInput(
    //       "current_ownership_since",
    //       calculateEndDate(name, value)
    //     )
    //   );
    // }
    // if (name === "current_ownership_since" && value) {
    //   dispatch(
    //     GetApplicationInput("incorporated_on", calculateEndDate(name, value))
    //   );
    // }
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return "";
  };
  const handleSelectVat = (name, i) => {
    dispatch(GetApplicationInput(name, i));
    if (
      i === 0 &&
      (applicationInput.legal_name !== null ||
        applicationInput.legal_name !== "") &&
      (applicationInput.company_house_no !== null ||
        applicationInput.legal_name !== "")
    ) {
      dispatch(
        GetVatList(
          applicationInput.legal_name,
          applicationInput.company_house_no
        )
      );
    }

    if (
      applicationInput.vat_enabled === 1 ||
      applicationInput.vat_enabled === 2
    ) {
      dispatch(GetApplicationInput("tax_id", ""));
    }
    if (applicationInput.new_to_card_proccessing === true) {
      dispatch(GetApplicationInput("previous_acquirer", ""));
    }
  };
  useEffect(() => {
    if (
      applicationInput.vat_enabled === 1 ||
      applicationInput.vat_enabled === 2
    ) {
      dispatch(GetApplicationInput("tax_id", ""));
    }
  }, [applicationInput.vat_enabled]);

  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 
  const Phone_regex = /^(07\d{9})$/; // regex for valid numbers
  const getTradingcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(applicationInput.trading_country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
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
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
  
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(GetApplicationInput("sales_partner", userData.id));
    dispatch(GetApplicationInput("partner_manager", userData.partner_manager));
    // dispatch(GetApplicationInput("user", userData.id));
    dispatch(
      GetApplicationInput(
        "s_individual_sales_representatives",
        applicationInput.sales_partner_name
      )
    );
    dispatch(
      GetApplicationInput(
        "s_individual_sales_representatives",
        userData.first_name + " " + userData.last_name
      )
    );
  }, []);
  useEffect(() => {
    if (applicationInput.new_to_card_proccessing === true) {
      dispatch(GetApplicationInput("previous_acquirer", ""));
    }
  }, [applicationInput.new_to_card_proccessing]);



  // --------------end validation--
  React.useEffect(() => {
    if (applicationInput.s_individual_sales_representatives) {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          applicationInput.sales_partner_name
        )
      );
    } else {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          userData.first_name + " " + userData.last_name
        )
      );
    }
  }, []);

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
  //multiple contact
  const [contactName, setContactName] = useState("");

  useEffect(() => {
    if (
      contactName !== "" &&
      (applicationInput.contact_full_name !== null ||
        applicationInput.contact_full_name !== "")
    ) {
      const contact = undefined;
      const contact1 = "business_owner_contacts";

      const newContactList = [...companyOfficerDetails]; // Create a copy of the original array

      const contactFullName = applicationInput.contact_full_name;

      newContactList
        .sort((a, b) => {
          if (a.name === contactFullName) {
            return -1; // Move item a to the beginning
          } else if (b.name === contactFullName) {
            return 1; // Move item b to the beginning
          } else {
            return 0; // Preserve the order of other items
          }
        })
        .map((item, index) => {
          if (!item.resigned_on) {
            const name = item.name.split(", ");
            const first_name = name[1].trim().split(" ");
            const full_Name = [first_name[0], ...first_name.slice(1)].join(" ");
            const last_Name = name[0];

            dispatch(
              GetApplicationInput(
                "owner_surname",
                last_Name.toUpperCase(),
                index,
                "business_owners",
                contact
              )
            );
            dispatch(
              GetApplicationInput(
                "owner_first_name",
                full_Name.toUpperCase(),
                index,
                "business_owners",
                contact
              )
            );
            dispatch(
              GetApplicationInput(
                "is_deleted",
                false,
                index,
                "business_owners",
                contact
              )
            );
            //address
            let firstPart = "";
            let secondPart = "";
            let add2 = "";
            var lastSpaceIndex;
            if (item.address?.address_line_2) {
              add2 = item.address?.address_line_2;
            } else {
              add2 = "";
            }
            const full_add =
              item?.address?.premises +
              " " +
              item?.address?.address_line_1 +
              " " +
              add2 +
              " ";

            if (full_add.length > 40) {
              firstPart = full_add.substring(0, 40);
              lastSpaceIndex = firstPart.lastIndexOf(" ");

              if (lastSpaceIndex !== -1) {
                secondPart = full_add.substring(lastSpaceIndex + 1);
                firstPart = full_add.substring(0, lastSpaceIndex);
              } else {
                secondPart = full_add.substring(40);
                firstPart = full_add.substring(0, 40);
              }
            }

            dispatch(
              GetApplicationInput(
                "zip_code",
                item.address.postal_code,
                index,
                "business_owners",
                contact1
              )
            );

            if (firstPart) {
              dispatch(
                GetApplicationInput(
                  "street_line_1",
                  firstPart,
                  index,
                  "business_owners",
                  contact1
                )
              );
            } else {
              dispatch(
                GetApplicationInput(
                  "street_line_1",
                  full_add,
                  index,
                  "business_owners",
                  contact1
                )
              );
            }
            if (secondPart) {
              dispatch(
                GetApplicationInput(
                  "locality",
                  secondPart,
                  index,
                  "business_owners",
                  contact1
                )
              );
            } else {
              dispatch(
                GetApplicationInput(
                  "locality",
                  "",
                  index,
                  "business_owners",
                  contact1
                )
              );
            }
            dispatch(
              GetApplicationInput(
                "city",
                item.address?.locality,
                index,
                "business_owners",
                contact1
              )
            );
            dispatch(
              GetApplicationInput(
                "county_code",
                item.address?.region,
                index,
                "business_owners",
                contact1
              )
            );
            dispatch(
              GetApplicationInput(
                "country_code",
                74,
                index,
                "business_owners",
                contact1
              )
            );
          }
        });
    }
  }, [contactName]);

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
      <img src={resume} width="25" alt="" />
      <strong> Business Details </strong>
      <br />
      <br />
      <div className="row align-self-center">
        <div className="col-md-3">
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Select Business Type <span style={{ color: "#DD2C00" }}>*</span> :
          </strong>
        </div>
        <div className="col-md-9">
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
            onClick={() => {
              handleChangeInput("legal_type", "ST");
              dispatch(GetApplicationInput("company_house_no", ""));
              dispatch(GetApplicationInput("incorporated_on", null));
            }}
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
      <CRow>
        <CCol md="12">
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
          <form action="">
            <br />
            <div>
              <label htmlFor="basic-url">
                Legal Name<span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className=" my-3">
                {applicationInput.legal_type === "LLP" ||
                applicationInput.legal_type === "PL" ||
                applicationInput.legal_type === "L" ? (
                  <LegalName
                    style={{ margin: 0 }}
                    name="legal_name"
                    value={applicationInput.legal_name}
                    details={"application"}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="legal_name"
                    value={applicationInput.legal_name}
                    onChange={(e) =>
                      handleChangeInput("legal_name", e.target.value)
                    }
                  />
                )}
                {/* <input type="text" className="form-control border-end-0" /> */}
                {/* <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={user} width="21" alt="" />
                  </span>
                </div>  */}
              </div>
            </div>
            <div>
              <label htmlFor="basic-url">Contact Full Name</label>
              <div className=" my-3">
                <Autocomplete
                  size="small"
                  options={companyOfficerDetails}
                  onChange={(event, newValue) => {
                    handleChangeInput(
                      "contact_full_name",
                      newValue === null ? "" : newValue.name
                    );
                    setContactName(newValue === null ? "" : newValue.name);
                  }}
                  inputValue={applicationInput.contact_full_name ?? ""}
                  
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
                      onChange={(e) => {
                        handleChangeInput("contact_full_name", e.target.value);
                      }}
                      value={
                        companyOfficerDetails?.[
                          applicationInput.contact_full_name
                        ] || null
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <label htmlFor="basic-url">CRN / UTR</label>
              {(applicationInput.legal_type === "L" ||
                applicationInput.legal_type === "LLP" ||
                applicationInput.legal_type === "PL") && (
                <span style={{ color: "#DD2C00" }}>*</span>
              )}
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control border-end-0"
                  name="company_house_no"
                  value={applicationInput.company_house_no}
                  onChange={(e) =>
                    handleChangeInput("company_house_no", e.target.value)
                  }
                />
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={crn} width="15" alt="" />
                </span>
              </div>
            </div>
            {/* </div> */}
            <div>
              <label htmlFor="basic-url">
                Incorporation Date{" "}
                {(applicationInput.legal_type === "L" ||
                  applicationInput.legal_type === "LLP" ||
                  applicationInput.legal_type === "PL") && (
                  <span style={{ color: "#DD2C00" }}>*</span>
                )}
              </label>
              <div className="input-group my-3">
              
                <DatePicker
                  format="dd/MM/yyyy"
                  className="form-control"
                  name="incorporated_on"
                  value={applicationInput.incorporated_on}
                  onChange={(date) =>
                    handleChangeInput("incorporated_on", date)
                  }
                  formatDate={formatDate}
                />
              </div>
            </div>
            <div>
              <label htmlFor="basic-url">
                Current Ownership Since{" "}
                <span style={{ color: "#DD2C00" }}>*</span>
                {/* {(applicationInput.legal_type === "L" ||
                  applicationInput.legal_type === "LLP" ||
                  applicationInput.legal_type === "PL") && (
                  <span style={{ color: "#DD2C00" }}>*</span>
                )} */}
              </label>
              <div className="input-group my-3">
                {/* <input
                  type="date"
                  className="form-control"
                  name="current_ownership_since"
                  value={applicationInput.current_ownership_since}
                  onChange={(e) =>
                    handleChangeInput("current_ownership_since", e.target.value)
                  }
                /> */}
                <DatePicker
                  format="dd/MM/yyyy"
                  className="form-control"
                  name="current_ownership_since"
                  value={applicationInput.current_ownership_since}
                  onChange={(date) =>
                    handleChangeInput("current_ownership_since", date)
                  }
                  formatDate={formatDate}
                />
              </div>
            </div>
            <div>
              <label htmlFor="basic-url">
                Email<span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className="input-group  my-3">
                <input
                  className={`form-control border-end-0 ${
                    (!regEmail.test(applicationInput.email) &&
                      applicationInput.email !== "" &&
                      applicationInput.email !== null) ||
                    emailDetails?.message === "Invalid Email Provided"
                      ? " error_input"
                      : " "
                  }`}
                  type="email"
                  name="email"
                  value={applicationInput?.email?.toLowerCase()}
                  onChange={(e) =>
                    handleChangeInput("email", e.target.value?.toLowerCase())
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
          </form>
          <br />
          <form action="">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  New to Card Process ?
                </strong>
              </div>
              <div className="col-md-8">
                <Switch
                  {...label}
                  value={applicationInput.new_to_card_proccessing}
                  checked={
                    applicationInput.new_to_card_proccessing === true
                      ? true
                      : false
                  }
                  name="new_to_card_proccessing"
                  onChange={(e) => {
                    handleChangeInput(
                      "new_to_card_proccessing",
                      e.target.checked
                    );
                  }}
                />
              </div>
              {applicationInput.new_to_card_proccessing === false && (
                <div className="col-md-12 mt-3">
                  <div style={{ display: "block" }}>
                    <label htmlFor="basic-url">Old Provider</label>
                    <span style={{ color: "#DD2C00" }}>*</span>
                    <div className="input-group my-3">
                      <input
                        type="text"
                        className="form-control border-end-0"
                        name="previous_acquirer"
                        value={applicationInput.previous_acquirer}
                        onChange={(e) => {
                          handleChangeInput(
                            "previous_acquirer",
                            e.target.value
                          );
                        }}
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
                </div>
              )}
            </div>
            <br />
          </form>
        </CCol>
        <CCol md="6">
          <br />
          <div>
            <label htmlFor="basic-url">
              Trading Name<span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_name"
                value={applicationInput.trading_name}
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

          <div>
            <label htmlFor="basic-url">Telephone Number</label>
            <div className="input-group  my-3">
              <input
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
                type="text"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                maxLength={11}
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

          <div className="row">
            <div className="col-md-12">
              <button
                className={`mb-2 ${
                  applicationInput.vat_enabled === 0
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleSelectVat("vat_enabled", 0)}
              >
                Vat Number
              </button>
              <button
                className={`mb-2 ${
                  applicationInput.vat_enabled === 1
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleSelectVat("vat_enabled", 1)}
              >
                Vat Number Pending
              </button>
              <button
                className={`mb-2 ${
                  applicationInput.vat_enabled === 2
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleSelectVat("vat_enabled", 2)}
              >
                In Business Confirmation
              </button>
            </div>
          </div>
          <br />
          {applicationInput.vat_enabled === 0 && (
            <div>
              <label htmlFor="basic-url">
                Vat Number <span style={{ color: "#dd2c00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control border-end-0"
                  name="tax_id"
                  value={applicationInput.tax_id}
                  onChange={(e) => {
                    handleChangeInput("tax_id", e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="basic-url">Application Notes</label>
            <div className="input-group my-3">
              <textarea
                type="text"
                rows={3}
                className="form-control border-end-0"
                name="note"
                value={applicationInput.note}
                onChange={(e) => {
                  handleChangeInput("note", e.target.value);
                }}
              />
              {/* <!-- <div className="input-group-append">
            <span className="input-group-text bg-white" id="basic-addon2"><img src="../../assets/img/telephone.svg" width="21" alt=""></span>
          </div> --> */}
            </div>
          </div>

          <br />
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
                      handleChangeInput("trading_address1", e.target.value)
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
                      handleChangeInput("trading_address2", e.target.value)
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
                      handleChangeInput("trading_city", e.target.value)
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
                      handleChangeInput("trading_county", e.target.value)
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
                    value={countryList?.[getTradingcountryIndex()] || null}
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
                  <div className="d-flex gap-2 justify-content-end">
                    <div className="">
                      <input
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
                    </div>
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
                    details="quote_legal_postcode"
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
                      handleChangeInput("legal_address1", e.target.value)
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
                      handleChangeInput("legal_address2", e.target.value)
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
                      handleChangeInput("legal_city", e.target.value)
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
                      handleChangeInput("legal_county", e.target.value)
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
                    value={
                      countryList?.[applicationInput.legal_country - 1] || null
                    }
                    getOptionLabel={(option) => option.name}
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
    </div>
  );
}
