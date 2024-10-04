
import React, { useEffect,  } from "react";
import addressImg from "../../../../assets/img/address.svg";
import postCodeImg from "../../../../assets/img/password (2).svg";
import locationImg from "../../../../assets/img/loction icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {

  GetCountryList,
  GetLeadsnput,
  SetLeadsStatusFalse,
} from "../_redux/action/LeadAction";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Cookies from 'js-cookie'; // Import js-cookie

import LegalName from "../leadCreate/LegalName";
import LeadPostCode from "../leadCreate/LeadPostCode";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
export default function LimitedCompany() {
  const requiredstyle = {
    color: " #dd2c00",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const companyOfficerDetails = useSelector(
    (state) => state.leadInfo.companyOfficerDetails
  );
 

  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const legalTypeInput = useSelector((state) => state.leadInfo.legalTypeInput);
  const countryList = useSelector((state) => state.leadInfo.countryList);
  const handleChangeInput = (name, value, e) => {
    dispatch(GetLeadsnput(name, value, e));
  };

 
  const handleChangeAddress = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(GetLeadsnput("site_and_trading_address_same", 1));
      dispatch(GetLeadsnput("trading_postcode", leadInput.legal_postcode));
      dispatch(GetLeadsnput("trading_address1", leadInput.legal_address1));
      dispatch(GetLeadsnput("trading_address2", leadInput.legal_address2));
      dispatch(GetLeadsnput("trading_city", leadInput.legal_city));
      dispatch(GetLeadsnput("trading_county", leadInput.legal_county));
      dispatch(GetLeadsnput("trading_country", leadInput.legal_country));
    } else {
      dispatch(GetLeadsnput("site_and_trading_address_same", 0));

      dispatch(GetLeadsnput("trading_postcode", ""));
      dispatch(GetLeadsnput("trading_address1", ""));
      dispatch(GetLeadsnput("trading_address2", ""));
      dispatch(GetLeadsnput("trading_city", ""));
      dispatch(GetLeadsnput("trading_county", ""));
      // dispatch(GetLeadsnput("trading_country", ""));
    }
   
  };

  useEffect(() => {
    if (legalTypeInput.soleTrade === "ST" || legalTypeInput.other === "OT") {
      dispatch(SetLeadsStatusFalse());
    }
  }, [legalTypeInput.limited, legalTypeInput.other, legalTypeInput.soleTrade]);
  useEffect(() => {
    const isLoggedIn = Cookies.get("is_ps_logged_in") || "false";
    if (isLoggedIn === "false") {
      navigate("/login");
    }
    dispatch(GetCountryList(1));
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
  return (
    <>
      <div>
        <strong style={{ color: "#3c4b64" }}>
          Company Legal Name or Registration Number
          <span style={requiredstyle}> *</span>
        </strong>
        <div className="mt-3">
          <LegalName
            name="legal_name"
            value={leadInput.legal_name}
            details="lead"
          />
        </div>
      </div>
      <div className="my-3">
        <strong style={{ color: "#3c4b64" }}>
          Select Director
          <span style={requiredstyle}> *</span>
        </strong>
        <select
          className="form-select mt-3"
          aria-label="Default select example"
          name="contact_full_name"
          value={leadInput.contact_full_name}
          onChange={(e) =>
            handleChangeInput("contact_full_name", e.target.value)
          }
        >
          <option value={""}>Select director</option>
          {companyOfficerDetails?.map((item) => {
            return (
              <>
                {!item.resigned_on && (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                )}
              </>
            );
          })}
        </select>
      </div>
      {leadInput.company_house_no && (
        <>
          {/* Company Details */}
          <div className="row">
            <div className="col-md-5">
              <strong style={{ color: "#3c4b64" }}>
                Company Registration Number <span style={requiredstyle}>*</span>
              </strong>
            </div>
            <div className="col-md-7">
              <p>
                {leadInput.company_house_no
                  ? leadInput.company_house_no
                  : " None selected"}
              </p>
              {/* <p>None selected</p> */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <strong style={{ color: "#3c4b64" }}>
                Registered Business Address <span style={requiredstyle}>*</span>
              </strong>
            </div>
            <div className="col-md-7">
              <p>
                {leadInput.legal_postcode
                  ? //  leadInput.legal_postcode +
                    //     "," +
                    //     leadInput.legal_address1 +
                    //     "," +
                    //     leadInput.legal_city
                    leadInput.full_add
                  : " None selected"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <strong style={{ color: "#3c4b64" }}>Director Name</strong>
            </div>
            <div className="col-md-7">
              <p>
                {leadInput.contact_full_name
                  ? leadInput.contact_full_name
                  : " None selected"}
              </p>
            </div>
          </div>
          <h4 className="my-3">Trading Address</h4>
          <div className="row align-items-center">
            <div className="col-md-5">
              <p style={{ color: "#3c4b64", marginBottom: "0" }}>
                Does The Trading Address is Same as Legal Address?
              </p>
            </div>
            <div className="col-md-7">
              <Checkbox
                value={leadInput.site_and_trading_address_same}
                checked={
                  leadInput.site_and_trading_address_same === 1 ? true : false
                }
                onChange={(e) => handleChangeAddress(e)}
                inputProps={{ "aria-label": "controlled" }}
              />
             
            </div>
          </div>
          {/* Post Code */}
          {leadInput.site_and_trading_address_same === 1 && (
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
                  {/* <div className="input-group my-3"> */}
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
                    {/* <div className="input-group-append">
                      <span className="input-group-text bg-white" id="basic-addon2">
                        <img src={locationImg} width="21" alt="" />
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
