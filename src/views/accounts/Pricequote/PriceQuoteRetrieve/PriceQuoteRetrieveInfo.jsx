import React from "react";
import { CCol, CRow } from "@coreui/react";
import list from "../../../../assets/img/list.svg";
import user from "../../../../assets/img/user.svg";
import telephone from "../../../../assets/img/telephone.svg";
import mail from "../../../../assets/img/mail icon.svg";
import internet from "../../../../assets/img/internet.svg";
import password from "../../../../assets/img/password (2).svg";
import location from "../../../../assets/img/loction icon.svg";
import locationImg from "../../../../assets/img/location.svg";
import address from "../../../../assets/img/address.svg";
import lock from "../../../../assets/img/lock.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetPricequoteInput } from "../_redux/action/PriceQuoteAction";
import LegalName from "../../Leads/leadCreate/LegalName";
import QuotePostCode from "./QuotePostCode";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GetEmailVerification } from "src/views/common/_redux/action/CommonAction";
import { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
export default function PriceQuoteRetrieveInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const countryList = useSelector((state) => state.leadInfo.countryList);
  const IndustryList = useSelector((state) => state.leadInfo.IndustryList);
  const handleChangeInput = (name, value, e) => {
    dispatch(GetPricequoteInput(name, value, e));
    if (name === "trading_name") {
      dispatch(GetPricequoteInput("company_name", value));
    }
    if (value === "CH" && name === "legal_type") {
      dispatch(GetPricequoteInput("company_house_no", ""));
      dispatch(GetPricequoteInput("incorporated_on", ""));
      dispatch(GetPricequoteInput("legal_address1", ""));
      dispatch(GetPricequoteInput("legal_city", ""));
      dispatch(GetPricequoteInput("legal_postcode", ""));
    }
    if (value === "ST" && name === "legal_type") {
      dispatch(GetPricequoteInput("company_house_no", ""));
      dispatch(GetPricequoteInput("incorporated_on", ""));
      dispatch(GetPricequoteInput("legal_address1", ""));
      dispatch(GetPricequoteInput("legal_city", ""));
      dispatch(GetPricequoteInput("legal_postcode", ""));
    } else if (
      priceQuoteInput.legal_type === "L" ||
      priceQuoteInput.legal_type === "PL" ||
      priceQuoteInput.legal_type === "CLLPH"
    ) {
      dispatch(GetPricequoteInput("charity_number", ""));
    }
  };
  const getIndustryIndex = () => {
    var index = -1;
    IndustryList.map((opt) => {
      if (
        parseInt(opt.ptsave_industrytypeid) ===
        parseInt(priceQuoteInput.industry_type)
      ) {
        index = IndustryList.indexOf(opt);
      }
    });
    return index;
  };
  const getTradingcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(priceQuoteInput.trading_country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };
  const getLegalcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(priceQuoteInput.legal_country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };
  const handleChangeAddress = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(GetPricequoteInput("site_and_trading_address_same", 1));
      dispatch(
        GetPricequoteInput("legal_postcode", priceQuoteInput.trading_postcode)
      );
      dispatch(
        GetPricequoteInput("legal_address1", priceQuoteInput.trading_address1)
      );
      dispatch(
        GetPricequoteInput("legal_address2", priceQuoteInput.trading_address2)
      );
      dispatch(GetPricequoteInput("legal_city", priceQuoteInput.trading_city));
      dispatch(
        GetPricequoteInput("legal_county", priceQuoteInput.trading_county)
      );
      dispatch(
        GetPricequoteInput("legal_country", priceQuoteInput.trading_country)
      );
    } else {
      dispatch(GetPricequoteInput("site_and_trading_address_same", 0));

      dispatch(GetPricequoteInput("legal_postcode", ""));
      dispatch(GetPricequoteInput("legal_address1", ""));
      dispatch(GetPricequoteInput("legal_address2", ""));
      dispatch(GetPricequoteInput("legal_city", ""));
      dispatch(GetPricequoteInput("legal_county", ""));
      // dispatch(GetPricequoteInput("legal_country", ""));
    }
  };
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      navigate("/login");
    }
  }, []);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const Phone_regex = /^(07\d{9})$/; // regex for valid numbers

  //email verification
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  useEffect(() => {
    if (priceQuoteInput.email.includes("@")) {
      dispatch(
        GetEmailVerification(
          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${priceQuoteInput.email}`
        )
      );
    }
  }, [priceQuoteInput.email]);
  return (
    <div className="leads">
      <CRow>
        <CCol xs="12" md="6">
          <img src={list} width="25" alt="" />
          <strong>New Leads Information </strong>
          <br />
          <br />
          {/* <!-- <form action=""> --> */}

          <div>
            <label htmlFor="basic-url">
              First Name <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                maxLength={20}
                name="first_name"
                value={priceQuoteInput.first_name}
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
                name="legal_name"
                value={priceQuoteInput.legal_name}
                details="quote"
              />
            </div>
          </div>

          <div>
            <label htmlFor="basic-url">Telephone Number</label>
            <div className="input-group my-3">
              <input
                type="text"
                className={`form-control border-end-0 ${
                  priceQuoteInput.telephone !== null ||
                  priceQuoteInput.telephone !== ""
                    ? priceQuoteInput.telephone !== "" &&
                      priceQuoteInput.telephone !== null &&
                      priceQuoteInput.telephone?.length !== 11
                      ? " error_input"
                      : " "
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                maxLength={11}
                name="telephone"
                value={priceQuoteInput.telephone}
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
                className={`form-control border-end-0 ${
                  (!regEmail.test(priceQuoteInput.email) &&
                    priceQuoteInput.email !== "" &&
                    priceQuoteInput.email !== null) ||
                  emailDetails?.message === "Invalid Email Provided"
                    ? " error_input"
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Primary Email"
                name="email"
                value={priceQuoteInput?.email?.toLowerCase()}
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
          <div>
            <div className="input-group my-3">
              <input
                type="email"
                className={`form-control border-end-0 input-group  ${
                  !regEmail.test(priceQuoteInput.secondary_email) &&
                  priceQuoteInput.secondary_email !== "" &&
                  priceQuoteInput.secondary_email !== null
                    ? " error_input"
                    : " "
                }`}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                placeholder="Secondary Email"
                name="secondary_email"
                value={priceQuoteInput?.secondary_email?.toLowerCase()}
                onChange={(e) =>
                  handleChangeInput(
                    "secondary_email",
                    e.target.value?.toLowerCase()
                  )
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
            <div className="input-group  my-3 ">
              <input
                type="text"
                className={`form-control border-end-0 `}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="website"
                value={priceQuoteInput.website}
                onChange={(e) => handleChangeInput("website", e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={internet} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <img src={locationImg} width="25" alt="" />
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Trading Address
          </strong>
          <br />
          <br />
          <div>
            <label htmlFor="browser">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Post Code <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group border-end-0 my-3">
              <QuotePostCode
                name="trading_postcode"
                value={priceQuoteInput.trading_postcode}
                details="quote_trading_postcode"
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
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Address 1 <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                name="trading_address1"
                value={priceQuoteInput.trading_address1}
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
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Address 2
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="trading_address2"
                value={priceQuoteInput.trading_address2}
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
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                City/Town <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                name="trading_city"
                value={priceQuoteInput.trading_city}
                onChange={(e) =>
                  handleChangeInput("trading_city", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
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
                value={priceQuoteInput.trading_county}
                onChange={(e) =>
                  handleChangeInput("trading_county", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
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
        </CCol>

        <CCol md="6">
          <br />
          <br />
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
                value={priceQuoteInput.last_name}
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
                value={priceQuoteInput.trading_name}
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
            <div className="input-group my-3">
              <input
                type="text"
                className={`form-control border-end-0 ${
                  !Phone_regex.test(priceQuoteInput.mobile) &&
                  priceQuoteInput.mobile !== "" &&
                  priceQuoteInput.mobile !== null
                    ? "error_input"
                    : ""
                }`}
                maxLength={11}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="mobile"
                value={priceQuoteInput.mobile}
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
            <label htmlFor="exampleFormControlSelect1">
              Industry Type <span style={{ color: "#dd2c00" }}>*</span>
            </label>

            <Autocomplete
              className="my-3"
              size="small"
              options={IndustryList}
              value={IndustryList?.[getIndustryIndex()] || null}
              getOptionLabel={(option) => option.ptsave_name}
              onChange={(event, newValue) => {
                if (newValue) {
                  IndustryList.map((item) => {
                    if (
                      item.ptsave_industrytypeid ===
                      newValue.ptsave_industrytypeid
                    ) {
                      dispatch(
                        GetPricequoteInput("mcc_code", item.ptsave_code)
                      );
                    }
                  });
                  handleChangeInput(
                    "industry_type",
                    newValue.ptsave_industrytypeid
                  );
                } else {
                  dispatch(GetPricequoteInput("mcc_code", ""));

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
                      borderRadius: "0.375rem",
                      // border: "1px solid #ced4da",
                      fontSize: "1rem",
                      height: "calc(1.5em + .75rem + 2px)",
                      padding: "5px 12px",
                    },
                  }}
                />
              )}
            />
          </div>
          <br />
          <div className="mt-4">
            <label htmlFor="basic-url">
              MCC Code <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
                name="mcc_code"
                disabled
                value={priceQuoteInput.mcc_code}
                onChange={(e) => handleChangeInput("mcc_code", e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={lock} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <CRow>
            <CCol md="6">
              <img src={locationImg} width="25" alt="" />
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Legal Address
              </strong>
            </CCol>
            <CCol md="6">
              {" "}
              <div className="d-flex gap-2 justify-content-end">
                <div className="">
                  <input
                    type="checkbox"
                    value={priceQuoteInput.site_and_trading_address_same}
                    checked={
                      priceQuoteInput.site_and_trading_address_same === 1
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

          <div>
            <label htmlFor="browser">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Post Code <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <QuotePostCode
                name="legal_postcode"
                value={priceQuoteInput.legal_postcode}
                details="quote_legal_postcode"
              />
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
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Address 1 <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                name="legal_address1"
                value={priceQuoteInput.legal_address1}
                onChange={(e) =>
                  handleChangeInput("legal_address1", e.target.value)
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
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Address 2
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                name="legal_address2"
                value={priceQuoteInput.legal_address2}
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
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                City/Town <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control border-end-0"
                required
                name="legal_city"
                value={priceQuoteInput.legal_city}
                onChange={(e) =>
                  handleChangeInput("legal_city", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
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
                value={priceQuoteInput.legal_county}
                onChange={(e) =>
                  handleChangeInput("legal_county", e.target.value)
                }
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={location} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="basic-url">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
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
                value={countryList?.[getLegalcountryIndex()] || null}
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
