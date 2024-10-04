import React, { useEffect,  } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";

import user from "../../../assets/img/user.svg";

import { Form } from "react-bootstrap";
import wallet from "../../../assets/img/wallet.svg";
import averege from "../../../assets/img/average.svg";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";

import Cookies from "js-cookie"; // Import js-cookie
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function BusinessProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
 
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const handleChangeInput = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
    if (name === "take_deposit" && value === true) {
      dispatch(GetApplicationInput("take_deposit", 1));
    } else if (name === "take_deposit" && value === false) {
      dispatch(GetApplicationInput("take_deposit", 0));
    }
  };
  const percentage =
    parseInt(applicationInput?.sales_ftf_perc) +
      parseInt(applicationInput?.sales_moto_perc) +
      parseInt(applicationInput?.sales_internet_perc) || 0;
  useEffect(() => {
    if (applicationInput.take_deposit === 0) {
      dispatch(GetApplicationInput("deposit_perc_transaction_value", ""));
      dispatch(GetApplicationInput("advance_supply_deposite_taken", ""));
      dispatch(GetApplicationInput("perc_annual_deposite_of_turnover", ""));
      dispatch(
        GetApplicationInput("time_btw_deposite_and_remaining_payment", "")
      );
      dispatch(GetApplicationInput("take_full_payment", false));
    }
    if (applicationInput.take_full_payment === false) {
      dispatch(GetApplicationInput("perc_annual_upfront_of_turnover", ""));
      dispatch(GetApplicationInput("advance_supply_full_payment", ""));
      dispatch(GetApplicationInput("deposite_comment", ""));
    }
  }, [applicationInput.take_deposit, applicationInput.take_full_payment]);
  useEffect(() => {
    if (applicationInput.seasonal_sales === false) {
      dispatch(GetApplicationInput("jan_to_mar", ""));
      dispatch(GetApplicationInput("jul_to_sep", ""));
      dispatch(GetApplicationInput("apr_to_jun", ""));
      dispatch(GetApplicationInput("oct_to_dec", ""));
    }
  }, [applicationInput.seasonal_sales]);
  useEffect(() => {
    if (typeof applicationInput.annual_turnover === "string") {
      const sanitizedValue = applicationInput.annual_turnover?.replace(
        /,/g,
        ""
      );
      dispatch(
        GetApplicationInput(
          "annual_turnover",
          sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [applicationInput.annual_turnover]);
  useEffect(() => {
    if (typeof applicationInput.smtv === "string") {
      const sanitizedValue = applicationInput.smtv?.replace(/,/g, "");
      dispatch(
        GetApplicationInput(
          "smtv",
          sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [applicationInput.smtv]);
  useEffect(() => {
    if (typeof applicationInput.annual_card_turnover === "string") {
      const sanitizedValue = applicationInput.annual_card_turnover.replace(
        /,/g,
        ""
      );
      dispatch(
        GetApplicationInput(
          "annual_card_turnover",
          sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [applicationInput.annual_card_turnover]);
  useEffect(() => {
    // for (const product of applicationInput.application_products) {
    if (typeof applicationInput.annual_card_turnover === "string") {
      if (applicationInput.annual_card_turnover?.replace(/,/g, "") >= 2000000) {
        dispatch(GetApplicationInput("parent_entity_code", "52495"));
      } else {
        if (applicationInput.renting_elavon_terminals === true) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53266"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53269"));
          }
        } else if (applicationInput.renting_elavon_terminals === false) {
          // if (annual_card_turnover >= 2000000) {
          //   dispatch(GetApplicationInput("parent_entity_code", "52495"));
          // } else
          if (
            applicationInput.annual_card_turnover?.replace(/,/g, "") >=
              500000 &&
            applicationInput.annual_card_turnover?.replace(/,/g, "") < 2000000
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53266"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53269"));
            }
          } else if (
            applicationInput.annual_card_turnover?.replace(/,/g, "") < 500000 &&
            applicationInput.auth_fees <= 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53267"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53270"));
            }
          } else if (
            applicationInput.annual_card_turnover?.replace(/,/g, "") < 500000 &&
            applicationInput.auth_fees > 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          } else if (applicationInput.auth_fees > 0) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          }
        }
      }
    } else {
      if (applicationInput.annual_card_turnover >= 2000000) {
        dispatch(GetApplicationInput("parent_entity_code", "52495"));
      } else {
        if (applicationInput.renting_elavon_terminals === true) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53266"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53269"));
          }
        } else if (applicationInput.renting_elavon_terminals === false) {
          // if (applicationInput.annual_card_turnover >= 2000000) {
          //   dispatch(GetApplicationInput("parent_entity_code", "52495"));
          // } else
          if (
            applicationInput.annual_card_turnover >= 500000 &&
            applicationInput.annual_card_turnover < 2000000
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53266"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53269"));
            }
          } else if (
            applicationInput.annual_card_turnover < 500000 &&
            applicationInput.auth_fees <= 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53267"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53270"));
            }
          } else if (
            applicationInput.annual_card_turnover < 500000 &&
            applicationInput.auth_fees > 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          } else if (applicationInput.auth_fees > 0) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          }
        }
      }
    }
    if (applicationInput.application_type === 2) {
      dispatch(GetApplicationInput("sales_internet_perc", 100));
      dispatch(GetApplicationInput("sales_moto_perc", 0));
      dispatch(GetApplicationInput("sales_ftf_perc", 0));
    }
    // }
  }, [
    applicationInput.annual_card_turnover,
    applicationInput.atv,
    applicationInput.annual_card_turnover,
    applicationInput.renting_elavon_terminals,
    applicationInput.application_type,
  ]);

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

  return (
    <div className="leads text-capitalize" id="appInput">
      <CRow className="p-lg-4 p-0">
        <CCol md="6">
          <img src={user} width="18" alt="" />
          <strong> Business Profile </strong>
          <br />
          <br />
          <div>
            <label htmlFor="">
              Description of Goods or Service{" "}
              <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div
              className={`form-group mt-3 ${
                applicationInput?.desc_of_service?.length > 300
                  ? "error_input"
                  : ""
              }`}
            >
              <textarea
                type="text"
                className="form-control"
                required
                rows={3}
                maxLength={300}
                name="desc_of_service"
                value={applicationInput.desc_of_service}
                onChange={(e) => {
                  handleChangeInput(
                    "desc_of_service",
                    e.target.value.toUpperCase()
                  );
                }}
              />
              {/* <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={pincode} width="21" alt="" />
                </span>
              </div> */}
            </div>
          </div>

          <p className="mb-3">
            count :{applicationInput?.desc_of_service?.length}/300{" "}
          </p>
          <div>
            <label htmlFor="">
              Annual Card Turnover <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div
              className={`input-group my-3 p-0 ${
                typeof applicationInput.annual_turnover === "string" &&
                typeof applicationInput.annual_card_turnover === "string" &&
                parseFloat(
                  applicationInput.annual_turnover?.replace(/,/g, "")
                ) <
                  parseFloat(
                    applicationInput.annual_card_turnover?.replace(/,/g, "")
                  ) &&
                applicationInput.annual_card_turnover !== ""
                  ? "error_input"
                  : ""
              }`}
            >
              <input
                // type="number"
                className="form-control border-end-0"
                required
                name="annual_card_turnover"
                min={0}
                onWheel={(e) => e.target.blur()}
                value={applicationInput.annual_card_turnover}
                onChange={(e) => {
                  handleChangeInput("annual_card_turnover", e.target.value);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={wallet} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          {/* 
          <div>
            <label htmlFor="">
              Face to Face <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="number"
                className="form-control border-end-0"
                required
                name="sales_ftf_perc"
                onWheel={(e) => e.target.blur()}
                value={applicationInput.sales_ftf_perc}
                onChange={(e) => {
                  handleChangeInput("sales_ftf_perc", e.target.value);
                  // setType(e.target.value);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={address} width="21" alt="" />
                </span>
              </div>
            </div>
          </div> */}

          {/* <div>
            <label htmlFor="">
              E-Commerce <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="number"
                className="form-control border-end-0"
                required
                name="sales_internet_perc"
                onWheel={(e) => e.target.blur()}
                value={applicationInput.sales_internet_perc}
                onChange={(e) => {
                  handleChangeInput("sales_internet_perc", e.target.value);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={address} width="21" alt="" />
                </span>
              </div>
            </div>
          </div> */}

          <br />
        </CCol>
        <CCol md="6">
          <br />
          <br />
          <div>
            <label htmlFor="">
              Customer Annual Turnover{" "}
              <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div
              className={`input-group my-3 p-0${
                typeof applicationInput.annual_turnover === "string" &&
                typeof applicationInput.annual_card_turnover === "string" &&
                parseFloat(
                  applicationInput.annual_turnover?.replace(/,/g, "")
                ) <
                  parseFloat(
                    applicationInput.annual_card_turnover?.replace(/,/g, "")
                  ) &&
                applicationInput.annual_turnover !== ""
                  ? "error_input"
                  : ""
              }`}
            >
              <input
                // type="number"
                min={0}
                className="form-control border-end-0"
                required
                name="annual_turnover"
                onWheel={(e) => e.target.blur()}
                value={applicationInput.annual_turnover}
                onChange={(e) => {
                  handleChangeInput("annual_turnover", e.target.value);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text bg-white" id="basic-addon2">
                  <img src={wallet} width="21" alt="" />
                </span>
              </div>
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="">
              Average Transaction Value{" "}
              <span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className="input-group my-3">
              <input
                type="number"
                className="form-control border-end-0"
                required
                name="atv"
                min={25}
                onWheel={(e) => e.target.blur()}
                value={applicationInput.atv}
                // onChange={(e) => {
                //   handleChangeInput("atv", e.target.value);
                // }}
                onChange={(e) => {
                  const inputValue = parseFloat(e.target.value);
                  if (inputValue >= 25) {
                    handleChangeInput("atv", inputValue);
                  } else {
                    handleChangeInput("atv", inputValue);
                  }
                }}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white"
                  id="basic-addon2"
                  style={{ padding: "9px 8px" }}
                >
                  <img src={averege} width="20" alt="" />
                </span>
              </div>
            </div>
          </div>
        </CCol>
        {/* acceptance ratio */}
        <CRow className="align-items-center">
          <CCol md="9">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-3">
                <CButton
                  color="info"
                  className="clear-btn mb-3"
                  style={{
                    width: "100%",
                    fontSize: "14px",
                    // background: "#56CCF2",
                  }}
                >
                  Face to Face
                </CButton>
                <Form.Group controlId="formBasicSelect">
                  <Form.Control
                    disabled={applicationInput.application_type === 2 && true}
                    type="number"
                    placeholder="%"
                    min={0}
                    max={100}
                    name="sales_ftf_perc"
                    onWheel={(e) => e.target.blur()}
                    value={applicationInput.sales_ftf_perc}
                    onChange={(e) => {
                      handleChangeInput("sales_ftf_perc", e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <CButton
                  color="warning"
                  className="clear-btn mb-3"
                  style={{ width: "100%", fontSize: "14px" }}
                >
                  CNP/MOTO
                </CButton>
                <Form.Group controlId="formBasicSelect">
                  <Form.Control
                    disabled={applicationInput.application_type === 2 && true}
                    type="number"
                    placeholder="%"
                    min={0}
                    max={100}
                    name="sales_moto_perc"
                    onWheel={(e) => e.target.blur()}
                    value={applicationInput.sales_moto_perc}
                    onChange={(e) => {
                      handleChangeInput("sales_moto_perc", e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <CButton
                  color="danger"
                  className="clear-btn mb-3"
                  style={{ width: "100%", fontSize: "14px" }}
                >
                  E-Commerce
                </CButton>
                <Form.Group controlId="formBasicSelect">
                  <Form.Control
                    type="number"
                    placeholder="%"
                    min={0}
                    max={100}
                    name="sales_internet_perc"
                    onWheel={(e) => e.target.blur()}
                    value={applicationInput.sales_internet_perc}
                    onChange={(e) => {
                      handleChangeInput("sales_internet_perc", e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
          </CCol>
          <CCol sm="5" md="3" d-flex justify-content-cenmter>
            <div
              className="progress-box mb-3"
              style={{ width: 150, height: 150 }}
            >
              {percentage === 100 ? (
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#2E8B57",
                    // pathColor: "#FF3A29",
                    textColor: "#000000",
                    //   trailColor: '#FF3A29',
                    backgroundColor: "#FFE5D3",
                    height: "25px",
                  })}
                />
              ) : (
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#FF3A29",
                    textColor: "#000000",
                    //   trailColor: '#FF3A29',
                    backgroundColor: "#FFE5D3",
                    height: "25px",
                  })}
                />
              )}
              {/* <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={5}
                        styles={buildStyles({
                          pathColor: "#FF3A29",
                          textColor: "#000000",
                          //   trailColor: '#FF3A29',
                          backgroundColor: "#FFE5D3",
                          height: "25px",
                        })}
                      /> */}
            </div>
          </CCol>
        </CRow>

        {/* acceptance ratio end*/}
        <div className="row mt-4">
          <div className="col-4 col-lg-3 d-flex align-items-center">
            <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
              AMEX MID :{" "}
            </strong>
          </div>
          <div className="col-8 col-lg-9">
            <div className="d-sm-flex gap-3">
              <button
                className={`mb-2 ${
                  applicationInput.amex_mid === "true"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput("amex_mid", "true")}

                // variant="outlined"
              >
                YES
              </button>
              <button
                className={`mb-2 ${
                  applicationInput.amex_mid === "false"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => {
                  handleChangeInput("amex_mid", "false");
                  dispatch(GetApplicationInput("amex_type", ""));
                  dispatch(GetApplicationInput("amex_no", ""));
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>

        {applicationInput.amex_mid === "true" && (
          <div className="row mt-4">
            <div className="col-4 col-lg-3 d-flex align-items-center">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                AMEX Type :{" "}
              </strong>
            </div>
            <div className="col-8 col-lg-9">
              <div className="d-sm-flex gap-3">
                <button
                  className={`mb-2 ${
                    applicationInput.amex_type === "Existing AMEX"
                      ? "active_basic_btn"
                      : "basic_btn"
                  }`}
                  onClick={() =>
                    handleChangeInput("amex_type", "Existing AMEX")
                  }
                >
                  EXISTING AMEX
                </button>

                <button
                  className={`mb-2 ${
                    applicationInput.amex_type === "New AMEX"
                      ? "active_basic_btn"
                      : "basic_btn"
                  }`}
                  onClick={() => {
                    handleChangeInput("amex_type", "New AMEX");
                    dispatch(GetApplicationInput("amex_no", ""));
                  }}
                >
                  NEW AMEX
                </button>
              </div>
            </div>
          </div>
        )}
        {applicationInput.amex_type === "Existing AMEX" &&
          applicationInput.amex_mid === "true" && (
            <div className="row mt-4">
              <div className="col-3 py-2 d-flex align-items-center">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  AMEX No. :
                </strong>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control "
                  required
                  onWheel={(e) => e.target.blur()}
                  name="amex_no"
                  value={applicationInput.amex_no}
                  onChange={(e) => {
                    handleChangeInput("amex_no", e.target.value);
                  }}
                />
              </div>
            </div>
          )}
        <CCol md-6 className="mt-4">
          <form action="">
            <div className="row mb-2">
              <div className="col-3 py-2">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  Do you take deposit :
                </strong>
              </div>
              <div className="col-7">
                <Switch
                  {...label}
                  value={applicationInput.take_deposit}
                  checked={applicationInput.take_deposit === 1 ? true : false}
                  name="take_deposit"
                  onChange={(e) => {
                    handleChangeInput("take_deposit", e.target.checked);
                  }}
                />
              </div>
            </div>
          </form>
          {applicationInput.take_deposit === 1 && (
            <CRow className="mt-0">
              <CCol md="3" className="my-3">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  Size of deposit as a % of total transaction values:
                </strong>
              </CCol>
              <CCol md="9" className="my-3">
                <div className="input-group ">
                  <input
                    className="form-control"
                    placeholder="Size of deposit as a % of total transaction  values"
                    type="number"
                    max={100}
                    onWheel={(e) => e.target.blur()}
                    name="deposit_perc_transaction_value"
                    value={applicationInput.deposit_perc_transaction_value}
                    // onChange={(e) => {
                    //   handleChangeInput(
                    //     "deposit_perc_transaction_value",
                    //     e.target.value
                    //   );
                    // }}
                    onChange={(e) => {
                      const inputValue = parseFloat(e.target.value);
                      if (inputValue <= 100) {
                        handleChangeInput(
                          "deposit_perc_transaction_value",
                          inputValue
                        );
                      } else {
                        handleChangeInput(
                          "deposit_perc_transaction_value",
                          "100"
                        );
                      }
                    }}
                  />
                </div>
              </CCol>

              {/* <CRow className="mt-5"> */}
              <CCol md="3" className="my-3">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  How Far In Advances:
                </strong>
              </CCol>
              <CCol md="9" className="my-3">
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="0.00"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    size="small"
                    name="advance_supply_deposite_taken"
                    value={applicationInput.advance_supply_deposite_taken}
                    onChange={(e) => {
                      handleChangeInput(
                        "advance_supply_deposite_taken",
                        e.target.value
                      );
                    }}
                  />
                </div>
              </CCol>
              <CCol md="3" className="my-3">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  What % of your annual turnover relates to deposits?:
                </strong>
              </CCol>
              <CCol md="9" className="my-3">
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="50%"
                    type="number"
                    max={100}
                    onWheel={(e) => e.target.blur()}
                    size="small"
                    name="perc_annual_deposite_of_turnover"
                    value={applicationInput.perc_annual_deposite_of_turnover}
                    onChange={(e) => {
                      const inputValue = parseFloat(e.target.value);
                      if (inputValue <= 100) {
                        handleChangeInput(
                          "perc_annual_deposite_of_turnover",
                          inputValue
                        );
                      } else {
                        handleChangeInput(
                          "perc_annual_deposite_of_turnover",
                          "100"
                        );
                      }
                    }}
                    // onChange={(e) => {
                    //   handleChangeInput(
                    //     "perc_annual_deposite_of_turnover",
                    //     e.target.value
                    //   );
                    // }}
                  />
                </div>
              </CCol>
              <CCol md="3" className="my-3">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  Time between taking deposit and receiving remaining balance of
                  payment? :
                </strong>
              </CCol>
              <CCol md="9" className="my-3">
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Days"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    size="small"
                    name="time_btw_deposite_and_remaining_payment"
                    value={
                      applicationInput.time_btw_deposite_and_remaining_payment
                    }
                    onChange={(e) => {
                      handleChangeInput(
                        "time_btw_deposite_and_remaining_payment",
                        e.target.value
                      );
                    }}
                  />
                </div>
              </CCol>
              {/* </CRow> */}

              <div className="row my-3">
                <div className="col-3 py-2">
                  <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                    Do You Ever Take Full Payment Upfront :
                  </strong>
                </div>
                <div className="col-9">
                  <Switch
                    {...label}
                    value={applicationInput.take_full_payment}
                    checked={
                      applicationInput.take_full_payment === true ? true : false
                    }
                    name="take_full_payment"
                    onChange={(e) => {
                      handleChangeInput("take_full_payment", e.target.checked);
                    }}
                  />
                </div>
              </div>

              {applicationInput.take_full_payment === true && (
                <>
                  <CCol md="6" style={{ display: "block" }}>
                    <CRow>
                      <CCol className="text-right">
                        <label>
                          How far in advance of supply is the full payment
                          taken:
                        </label>
                      </CCol>
                      <CCol md="12">
                        <input
                          type="number"
                          className="form-control border-end-0 my-3"
                          placeholder="Days"
                          size="small"
                          name="advance_supply_full_payment"
                          value={applicationInput.advance_supply_full_payment}
                          onChange={(e) => {
                            handleChangeInput(
                              "advance_supply_full_payment",
                              e.target.value
                            );
                          }}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol md="6" style={{ display: "block" }}>
                    <CRow>
                      <CCol className="text-right">
                        <label>
                          % of your annual turnover relates to upfront full
                          payments
                        </label>
                      </CCol>
                      <CCol md="12">
                        <div className="input-group my-3">
                          <input
                            onWheel={(e) => e.target.blur()}
                            type="number"
                            max={100}
                            className="form-control border-end-0"
                            placeholder="% of your annual turnover relates to upfront full payments"
                            name="perc_annual_upfront_of_turnover"
                            value={
                              applicationInput.perc_annual_upfront_of_turnover
                            }
                            onChange={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (inputValue <= 100) {
                                handleChangeInput(
                                  "perc_annual_upfront_of_turnover",
                                  inputValue
                                );
                              } else {
                                handleChangeInput(
                                  "perc_annual_upfront_of_turnover",
                                  "100"
                                );
                              }
                            }}
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CCol>
                </>
              )}
            </CRow>
          )}
        </CCol>

        <CCol md="12">
          <form action="">
            <div className="row">
              <div className="col-3 py-2">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  Seasonal Sales :
                </strong>
              </div>
              <div className="col-9">
                <Switch
                  {...label}
                  value={applicationInput.seasonal_sales}
                  checked={
                    applicationInput.seasonal_sales === true ? true : false
                  }
                  name="seasonal_sales"
                  onChange={(e) => {
                    handleChangeInput("seasonal_sales", e.target.checked);
                  }}
                />
              </div>
            </div>
          </form>
        </CCol>
        <br />
        <br />
        {applicationInput.seasonal_sales === true && (
          <CCol md="12" style={{ display: "block" }}>
            <CRow>
              <CCol md="3">
                <CCard className="text-center border bg-transparent my-2">
                  <CCardHeader style={{ borderBottom: "1px solid #212121" }}>
                    <CRow>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Jan
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Feb
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Mar
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CRow className="align-items-center">
                      {/* <CCol md="4"></CCol> */}
                      <CCol md="10" className="text-right">
                        <div className="input-group">
                          <input
                            onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control"
                            placeholder="0.50"
                            name="jan_to_mar"
                            value={applicationInput.jan_to_mar}
                            // onChange={(e) => {
                            //   handleChangeInput("jan_to_mar", e.target.value);
                            // }}
                            onChange={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (inputValue <= 100) {
                                handleChangeInput("jan_to_mar", inputValue);
                              } else {
                                handleChangeInput("jan_to_mar", "100");
                              }
                            }}
                          />
                        </div>
                      </CCol>
                      <CCol md="1" className="text-start">
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          %
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md="3">
                <CCard className="text-center border bg-transparent my-2">
                  <CCardHeader style={{ borderBottom: "1px solid #212121" }}>
                    <CRow>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Apr
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          May
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Jun
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol md="10" className="text-right">
                        <div className="input-group">
                          <input
                            onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control"
                            placeholder="0.50"
                            name="apr_to_jun"
                            value={applicationInput.apr_to_jun}
                            // onChange={(e) => {
                            //   handleChangeInput("apr_to_jun", e.target.value);
                            // }}
                            onChange={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (inputValue <= 100) {
                                handleChangeInput("apr_to_jun", inputValue);
                              } else {
                                handleChangeInput("apr_to_jun", "100");
                              }
                            }}
                          />
                        </div>
                      </CCol>
                      <CCol md="1" className="text-start">
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          %
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md="3">
                <CCard className="text-center border bg-transparent my-2">
                  <CCardHeader style={{ borderBottom: "1px solid #212121" }}>
                    <CRow>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Jul
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Aug
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Sep
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol md="10" className="text-right">
                        <div className="input-group">
                          <input
                            onWheel={(e) => e.target.blur()}
                            type="number"
                            className="form-control"
                            placeholder="0.50"
                            name="jul_to_sep"
                            value={applicationInput.jul_to_sep}
                            // onChange={(e) => {
                            //   handleChangeInput("jul_to_sep", e.target.value);
                            // }}
                            onChange={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (inputValue <= 100) {
                                handleChangeInput("jul_to_sep", inputValue);
                              } else {
                                handleChangeInput("jul_to_sep", 100);
                              }
                            }}
                          />
                        </div>
                      </CCol>
                      <CCol md="1" className="text-start">
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          %
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md="3">
                <CCard className="text-center border bg-transparent my-2">
                  <CCardHeader style={{ borderBottom: "1px solid #212121" }}>
                    <CRow>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Oct
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Nov
                        </strong>
                      </CCol>
                      <CCol>
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          Dec
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol md="10" className="text-right">
                        <div className="input-group">
                          <input
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            className="form-control "
                            placeholder="0.50"
                            name="oct_to_dec"
                            value={applicationInput.oct_to_dec}
                            // onChange={(e) => {
                            //   handleChangeInput("oct_to_dec", e.target.value);
                            // }}
                            onChange={(e) => {
                              const inputValue = parseFloat(e.target.value);
                              if (inputValue <= 100) {
                                handleChangeInput("oct_to_dec", inputValue);
                              } else {
                                handleChangeInput("oct_to_dec", "100");
                              }
                            }}
                          />
                        </div>
                      </CCol>
                      <CCol md="1" className="text-start">
                        <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                          %
                        </strong>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCol>
        )}
      </CRow>
    </div>
  );
}
