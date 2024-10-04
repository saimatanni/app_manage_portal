import React, { useEffect } from "react";
import userImg from "../../../../assets/img/user.svg";
import mailImg from "../../../../assets/img/mail icon.svg";
import addressImg from "../../../../assets/img/address.svg";
import postCodeImg from "../../../../assets/img/password (2).svg";
import locationImg from "../../../../assets/img/loction icon.svg";
import telephone from "../../../../assets/img/telephone.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetLeadsnput } from "../_redux/action/LeadAction";
import LeadPostCode from "../leadCreate/LeadPostCode";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from "react-router-dom";
import { GetEmailVerification } from "src/views/common/_redux/action/CommonAction";
export default function ContactInformation() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const requiredstyle = {
    color: " #dd2c00",
  };

  const dispatch = useDispatch();
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const countryList = useSelector((state) => state.leadInfo.countryList);
  const legalTypeInput = useSelector((state) => state.leadInfo.legalTypeInput);
  const Phone_regex = /^(07\d{9})$/; // regex for valid numbers
  // const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbers
  // const maxLength = leadInput.mobile.startsWith(7) ? 10 : 11;
  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));
    dispatch(GetLeadsnput("lead_stage", 0, e));
  };
 
  React.useEffect(() => {
    if (legalTypeInput.soleTrade === "ST" || legalTypeInput.other === "OT") {
      dispatch(
        GetLeadsnput(
          "legal_name",
          leadInput.first_name + " " + leadInput.last_name
        )
      );
    }
  }, [leadInput.first_name, leadInput.last_name]);
  React.useEffect(() => {
    if (legalTypeInput.limited) {
      dispatch(GetLeadsnput("legal_type", legalTypeInput.limited));
    } else if (legalTypeInput.soleTrade) {
      dispatch(GetLeadsnput("legal_type", legalTypeInput.soleTrade));
    } else if (legalTypeInput.other) {
      if (!leadInput.legal_type) {
        dispatch(GetLeadsnput("legal_type", legalTypeInput.other));
      }
    }
  }, []);
  const getTradingcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(leadInput.trading_country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };

  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //email verification
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  useEffect(() => {
    if (leadInput.email.includes("@")) {
      dispatch(
        GetEmailVerification(
          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${leadInput.email}`
        )
      );
    }
  }, [leadInput.email]);
  return (
  
      < >
        {/* <div className="col-md-1"></div> */}
        <div className="col-md-12">
          <div className="" style={{ padding: "16px" }}>
            {/* <div className='new_leads_information'> */}
            <h1 className="text-center my-4">Contact Information</h1>

            <div className="row my-3">
              <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url">
                    First Name <span style={requiredstyle}>*</span>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      maxLength={20}
                      className="form-control border-end-0"
                      required
                      name="first_name"
                      value={leadInput.first_name}
                      onChange={(e) =>
                        handleChangeInput("first_name", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={userImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url">
                    Last Name <span style={requiredstyle}>*</span>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control border-end-0"
                      required
                      maxLength={20}
                      name="last_name"
                      value={leadInput.last_name}
                      onChange={(e) =>
                        handleChangeInput("last_name", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={userImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url">
                    Legal Name <span style={requiredstyle}>*</span>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control border-end-0"
                      required
                      name="legal_name"
                      value={leadInput.legal_name}
                      onChange={(e) =>
                        handleChangeInput("legal_name", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                        style={{ height: "35px" }}
                      >
                        <img src={userImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url">
                    Business Trading Name <span style={requiredstyle}>*</span>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control border-end-0"
                      required
                      name="trading_name"
                      value={leadInput.trading_name}
                      onChange={(e) =>
                        handleChangeInput("trading_name", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                        style={{ height: "35px" }}
                      >
                        <img src={userImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <div>
                  <label htmlFor="basic-url">Email Address</label>
                  <div className="input-group my-3">
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
                      required
                      name="email"
                      value={leadInput?.email?.toLowerCase()}
                      onChange={(e) =>
                        handleChangeInput(
                          "email",
                          e.target.value?.toLowerCase()
                        )
                      }
                      style={{ height: "35px" }}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                        style={{ height: "35px" }}
                      >
                        <img src={mailImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url">
                   Lead Note 
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className='form-control border-end-0 '
                      required
                      name="note"
                      value={leadInput.note}
                      onChange={(e) =>
                        handleChangeInput("note", e.target.value)
                      }
                      style={{height:'35px'}}
                    />
                    <div className="input-group-append" style={{height:'35px'}}>
                      <span className="input-group-text bg-white" id="basic-addon2">
                        <img src={list} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url">Telephone Number</label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className={`form-control border-end-0 ${
                        leadInput.telephone !== null ||
                        leadInput.telephone !== ""
                          ? leadInput.telephone !== "" &&
                            leadInput.telephone !== null &&
                            leadInput.telephone?.length !== 11
                            ? " error_input"
                            : " "
                          : " "
                      }`}
                      // onKeyPress="if(leadInput.telephone.length==4) return false;"
                      pattern="\d*"
                      required
                      maxLength={11}
                      // maxLength={leadInput.telephone.startsWith(0) ? 11 : 10}
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
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={telephone} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="basic-url" className="mb-3">
                    Mobile Number <span style={requiredstyle}>*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control border-end-0 ${
                        !Phone_regex.test(leadInput.mobile) &&
                        leadInput.mobile !== "" &&
                        leadInput.mobile !== null
                          ? "error_input"
                          : ""
                      }`}
                      maxLength={11}
                      required
                      name="mobile"
                      value={leadInput.mobile}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        handleChangeInput("mobile", numericValue);
                      }}
                    />

                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
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
              </div>
            </div>
            {/* Trading Address */}
            <div className="row">
              <div className="col-md-12">
                <strong style={{ color: "#3c4b64" }}>Trading Address</strong>
              </div>
            </div>
            {/* Post Code */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <label>
                    <strong style={{ color: "#3c4b64" }}>
                      Post Code <span style={requiredstyle}>*</span>
                    </strong>
                  </label>
                  <div className="input-group my-3">
                    <LeadPostCode
                      name="trading_postcode"
                      value={leadInput.trading_postcode}
                      details="lead_trading_postcode"
                    />
                    {/* <input type="text" className="form-control border-end-0" /> */}
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={postCodeImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>
                    <strong style={{ color: "#3c4b64" }}>Address 2 </strong>
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
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={addressImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>
                    <strong style={{ color: "#3c4b64" }}>County </strong>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control border-end-0"
                      name="trading_county"
                      value={leadInput.trading_county}
                      onChange={(e) =>
                        handleChangeInput("trading_county", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={locationImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label>
                    <strong style={{ color: "#3c4b64" }}>
                      Address 1 <span style={requiredstyle}>*</span>
                    </strong>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control border-end-0"
                      name="trading_address1"
                      value={leadInput.trading_address1}
                      onChange={(e) =>
                        handleChangeInput("trading_address1", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={addressImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>
                    <strong style={{ color: "#3c4b64" }}>
                      City/Town <span style={requiredstyle}>*</span>
                    </strong>
                  </label>
                  <div className="input-group my-3">
                    <input
                      type="text"
                      className="form-control border-end-0"
                      name="trading_city"
                      value={leadInput.trading_city}
                      onChange={(e) =>
                        handleChangeInput("trading_city", e.target.value)
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-white"
                        id="basic-addon2"
                      >
                        <img src={locationImg} width="21" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label>
                    <strong style={{ color: "#3c4b64" }}>
                      Country <span style={requiredstyle}>*</span>
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
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-1"></div> */}
      </>
  
  );
}
