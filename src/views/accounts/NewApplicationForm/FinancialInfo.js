import React, { useState, useEffect } from "react";
import { CCol, CRow } from "@coreui/react";
import newDocument from "../../../assets/img/new-document.svg";
import resume from "../../../assets/img/resume.svg";
import bank from "../../../assets/img/bank.svg";
import user from "../../../assets/img/user.svg";
import lock from "../../../assets/img/lock.svg";
import address from "../../../assets/img/address.svg";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"; // Import js-cookie
import {
  GetApplicationBankInput,
  GetApplicationInput,
  SubmitBavkInfo,
} from "../NewApplication/_redux/action/ApplicationAction";
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function FinancialInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bankName1, setbankName] = useState("");
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const debitBankDetails = useSelector(
    (state) => state.applicationInfo.debitBankDetails
  );

  const bankDetails = useSelector((state) => state.applicationInfo.bankDetails);
  const handleChangeInput = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
    if (name === "bank_faster_payments" && value === true) {
      dispatch(GetApplicationInput("bank_faster_payments", 1));
    } else if (name === "bank_faster_payments" && value === false) {
      dispatch(GetApplicationInput("bank_faster_payments", 0));
    }
    if (name === "cashback" && value === false) {
      dispatch(GetApplicationInput("avg_cashback_amount", ""));
    }
  };
  const handleChangeDebitBank = (name, value, index, e) => {
    dispatch(GetApplicationBankInput(name, value, 0));
    dispatch(GetApplicationBankInput("application", applicationInput.id, 0));
  };
  useEffect(() => {
    if (applicationInput.bank_name === "SANTANDER") {
      dispatch(GetApplicationInput("bank_faster_payments", "0"));
    }
  }, [bankName1]);
  const handleChangeBank = (e) => {
    if (e.target.checked) {
      dispatch(GetApplicationInput("sattel_debit_same", true));
      dispatch(
        GetApplicationBankInput(
          "debit_bank_name",
          applicationInput.bank_name,
          0
        )
      );
      dispatch(
        GetApplicationBankInput(
          "debit_bank_account_name",
          applicationInput.bank_account_name,
          0
        )
      );
      dispatch(
        GetApplicationBankInput(
          "debit_bank_sort_code",
          applicationInput.bank_sort_code,
          0
        )
      );
      dispatch(
        GetApplicationBankInput(
          "debit_bank_account_no",
          applicationInput.bank_account_no,
          0
        )
      );
      dispatch(GetApplicationBankInput("application", applicationInput.id, 0));
    } else {
      dispatch(GetApplicationInput("sattel_debit_same", false));
      dispatch(GetApplicationBankInput("debit_bank_name", "", 0));
      dispatch(GetApplicationBankInput("debit_bank_account_name", "", 0));
      dispatch(GetApplicationBankInput("debit_bank_sort_code", "", 0));
      dispatch(GetApplicationBankInput("debit_bank_account_no", "", 0));
    }
  };
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
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

  
  return (
    <div className="leads">
      <CRow className="p-lg-4 p-0">
        <CCol md="12">
          <div>
            <img src={newDocument} width="25" alt="" />
            <strong style={{ fontSize: "20px" }}>
              {" "}
              Financial Information{" "}
            </strong>
          </div>
          {/* <br />
          <div>
            <img src={resume} width="25" alt="" />
            <strong style={{ textDecoration: "underline" }}>
              {" "}
              Financial Information{" "}
            </strong>
          </div> */}
          <br />
        </CCol>
        <CCol md="12">
          <img src={bank} width="25" alt="" />
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            {" "}
            Settlement Account Details{" "}
          </strong>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6 col-12">
              <label htmlFor="basic-url">
                Sort Code <span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  className={`form-control border-end-0 ${
                    (applicationInput?.bank_sort_code?.length !== 6 &&
                      applicationInput?.bank_sort_code !== "" &&
                      applicationInput?.bank_sort_code !== null) ||
                    bankDetails[0]?.StatusInformation === "UnknownSortCode"
                      ? "error_input"
                      : ""
                  }`}
                  required
                  maxLength={6}
                  name="bank_sort_code"
                  value={applicationInput.bank_sort_code}
                  onChange={(e) => {
                    handleChangeInput(
                      "bank_sort_code",
                      e.target.value?.replace(/\D/g, "")
                    );
                    if (
                      e.target.value.length === 6 &&
                      applicationInput.bank_account_no &&
                      applicationInput.bank_account_no.length === 8
                    ) {
                      dispatch(
                        SubmitBavkInfo(
                          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-bank-details/?short_code=${e.target.value}&acc_no=${applicationInput.bank_account_no}`
                        )
                      );
                    }
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={lock} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <label htmlFor="basic-url mt-3">
                Bank Name <span style={{ color: "#dd2c00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control border-end-0"
                  required
                  name="bank_name"
                  value={applicationInput.bank_name}
                  onChange={(e) => {
                    handleChangeInput(
                      "bank_name",
                      e.target.value.toUpperCase()
                    );
                    setbankName(e.target.value);
                  }}
                />

                <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={address} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <label htmlFor="basic-url">
                Account Number <span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  className={`form-control border-end-0 ${
                    (applicationInput?.bank_account_no?.length !== 8 &&
                      applicationInput?.bank_account_no !== "" &&
                      applicationInput?.bank_account_no !== null) ||
                    bankDetails[0]?.StatusInformation === "InvalidAccountNumber"
                      ? "error_input"
                      : ""
                  }`}
                  required
                  maxLength={8}
                  name="bank_account_no"
                  value={applicationInput.bank_account_no}
                  onChange={(e) => {
                    handleChangeInput(
                      "bank_account_no",
                      e.target.value?.replace(/\D/g, "")
                    );
                    if (
                      e.target.value.length === 8 &&
                      applicationInput.bank_sort_code &&
                      applicationInput.bank_sort_code.length === 6
                    ) {
                      dispatch(
                        SubmitBavkInfo(
                          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-bank-details/?short_code=${applicationInput.bank_sort_code}&acc_no=${e.target.value}`
                        )
                      );
                    }
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={lock} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <label htmlFor="">
                Account Name <span style={{ color: "#DD2C00" }}>*</span>
              </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  className="form-control border-end-0"
                  required
                  maxLength={50}
                  name="bank_account_name"
                  value={applicationInput.bank_account_name}
                  onChange={(e) =>
                    handleChangeInput(
                      "bank_account_name",
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
          </div>
        </CCol>
        <CCol md="12" >
          {/* <CRow className="mt-5" sm="12"></CRow> */}

          <CRow className="mt-5" md="12">
            <CCol md="6">
              <img src={bank} width="25" alt="" />{" "}
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Direct Debit Account Details
              </strong>
            </CCol>
            <CCol md="6">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={
                    applicationInput.sattel_debit_same === true ? true : false
                  }
                  onChange={(e) => handleChangeBank(e)}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Same as Settlement Bank
                </label>
              </div>
            </CCol>
          </CRow>
          <br />
          <div className="row">
            <div className="col-md-6 col-12">
              <label htmlFor="basic-url">Sort Code</label>
              <div className="input-group my-3">
                <input
                  type="text"
                  autoComplete="off"
                  className={`form-control border-end-0 ${
                    debitBankDetails[0]?.StatusInformation === "UnknownSortCode"
                      ? "error_input"
                      : ""
                  }`}
                  required
                  maxLength={6}
                  name="debit_bank_sort_code"
                  value={
                    applicationInput.debit_bank_info[0]
                      ? applicationInput.debit_bank_info[0].debit_bank_sort_code
                      : ""
                  }
                  onChange={(e) => {
                    handleChangeDebitBank(
                      "debit_bank_sort_code",
                      e.target.value?.replace(/\D/g, "")
                    );
                    if (
                      e.target.value.length === 6 &&
                      applicationInput?.debit_bank_info[0] &&
                      applicationInput?.debit_bank_info[0]
                        ?.debit_bank_account_no &&
                      applicationInput?.debit_bank_info[0].debit_bank_account_no
                        .length === 8
                    ) {
                      dispatch(
                        SubmitBavkInfo(
                          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-bank-details/?short_code=${e.target.value}&acc_no=${applicationInput.debit_bank_info[0]?.debit_bank_account_no}`,
                          "debit"
                        )
                      );
                    }
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={lock} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <label htmlFor="basic-url mt-3">Bank Name </label>
              <div className="input-group my-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control border-end-0"
                  required
                  name="debit_bank_name"
                  value={
                    applicationInput.debit_bank_info[0]
                      ? applicationInput.debit_bank_info[0].debit_bank_name
                      : ""
                  }
                  onChange={(e) => {
                    handleChangeDebitBank(
                      "debit_bank_name",
                      e.target.value.toUpperCase()
                    );
                    setbankName(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={address} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <label htmlFor="basic-url">Account Number</label>
              <div className="input-group my-3">
                <input
                  type="text"
                  autoComplete="off"
                  className={`form-control border-end-0 ${
                    // (applicationInput.debit_bank_info[0] &&
                    //   applicationInput?.debit_bank_info[0].debit_bank_account_no
                    //     ?.length !== 8 &&
                    //   applicationInput?.debit_bank_info[0]
                    //     .debit_bank_account_no !== "" &&
                    //   applicationInput?.debit_bank_info[0]
                    //     .debit_bank_account_no !== null) ||
                    debitBankDetails[0]?.StatusInformation ===
                    "InvalidAccountNumber"
                      ? "error_input"
                      : ""
                  }`}
                  required
                  maxLength={8}
                  name="debit_bank_account_no"
                  value={
                    applicationInput.debit_bank_info[0]
                      ? applicationInput.debit_bank_info[0]
                          .debit_bank_account_no
                      : ""
                  }
                  onChange={(e) => {
                    handleChangeDebitBank(
                      "debit_bank_account_no",
                      e.target.value?.replace(/\D/g, "")
                    );
                    if (
                      e.target.value.length === 8 &&
                      applicationInput?.debit_bank_info[0] &&
                      applicationInput?.debit_bank_info[0]
                        ?.debit_bank_sort_code &&
                      applicationInput?.debit_bank_info[0]?.debit_bank_sort_code
                        .length === 6
                    ) {
                      dispatch(
                        SubmitBavkInfo(
                          `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-bank-details/?short_code=${applicationInput?.debit_bank_info[0]?.debit_bank_sort_code}&acc_no=${e.target.value}`,
                          "debit"
                        )
                      );
                    }
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <img src={lock} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <label htmlFor="basic-url">Name of Account Holder</label>
              <div className="input-group my-3">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control border-end-0"
                  required
                  maxLength={50}
                  name="debit_bank_account_name"
                  value={
                    applicationInput.debit_bank_info[0]
                      ? applicationInput.debit_bank_info[0]
                          .debit_bank_account_name
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeDebitBank(
                      "debit_bank_account_name",
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
          </div>

          <form action="" className="mt-4">
            <div className="row">
              <div className="col-md-4">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  Faster Payments :
                </strong>
              </div>
              <div className="col-md-8">
                <div className="d-flex gap-2 align-items-center">
                  {" "}
                  <Switch
                    {...label}
                    value={applicationInput.bank_faster_payments}
                    checked={
                      parseInt(applicationInput.bank_faster_payments) === 1
                        ? true
                        : false
                    }
                    name="bank_faster_payments"
                    onChange={(e) => {
                      handleChangeInput(
                        "bank_faster_payments",
                        e.target.checked
                      );
                    }}
                  />{" "}
                  {parseInt(applicationInput.bank_faster_payments) === 1 && (
                    <p className="m-0">(With Fee)</p>
                  )}
                </div>
              </div>
            </div>
          </form>
          <br />
          <form action="">
            <div className="row">
              <div className="col-md-4">
                <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                  Cash Back :
                </strong>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-2 text-center">
                    <Switch
                      {...label}
                      value={applicationInput.cashback}
                      checked={
                        applicationInput.cashback === true ? true : false
                      }
                      name="cashback"
                      onChange={(e) => {
                        handleChangeInput("cashback", e.target.checked);
                      }}
                    />
                  </div>
                  {applicationInput.cashback === true && (
                    <div className="col-md-10" style={{ display: "block" }}>
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        className="form-control"
                        placeholder="Anticipeted Cashback Amount"
                        name="avg_cashback_amount"
                        value={applicationInput.avg_cashback_amount}
                        onChange={(e) => {
                          handleChangeInput(
                            "avg_cashback_amount",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <br />

          <CRow form className="form-group">
            <CCol sm="4">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Payment Method :
              </strong>
            </CCol>
            <CCol sm="8">
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio1"
                  checked={
                    applicationInput.payment_method === "EBA" ? true : false
                  }
                  name="payment_method"
                  value={applicationInput.payment_method}
                  // onChange={(e) => {
                  //   handleChangeInput("payment_method", "EBA");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  EBA
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.payment_method === "ALB" ? true : false
                  }
                  name="payment_method"
                  value={applicationInput.payment_method}
                  // onChange={(e) => {
                  //   handleChangeInput("payment_method", "ALB");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  ALB
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  style={{ pointerEvents: "none", opacity: 1 }}
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.payment_method === "CHAIN" ? true : false
                  }
                  name="payment_method"
                  value={applicationInput.payment_method}
                  // onChange={(e) => {
                  //   handleChangeInput("payment_method", "CHAIN");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  CHAIN
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  style={{ pointerEvents: "none", opacity: 1 }}
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.payment_method === "CIT" ? true : false
                  }
                  name="payment_method"
                  value={applicationInput.payment_method}
                  // onChange={(e) => {
                  //   handleChangeInput("payment_method", "CIT");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  CIT
                </label>
              </div>
            </CCol>
          </CRow>

          <CRow form className="form-group">
            <CCol sm="4">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Funding Frequency :
              </strong>
            </CCol>
            <CCol sm="8">
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.funding_frequesncy === "DAILY"
                      ? true
                      : false
                  }
                  name="funding_frequesncy"
                  value={applicationInput.funding_frequesncy}
                  // onChange={(e) => {
                  //   handleChangeInput("funding_frequesncy", "DAILY");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Daily
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.funding_frequesncy === "WEEKLY"
                      ? true
                      : false
                  }
                  name="funding_frequesncy"
                  value={applicationInput.funding_frequesncy}
                  // onChange={(e) => {
                  //   handleChangeInput("funding_frequesncy", "WEEKLY");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Weekly
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.funding_frequesncy === "MONTHLY"
                      ? true
                      : false
                  }
                  name="funding_frequesncy"
                  value={applicationInput.funding_frequesncy}
                  // onChange={(e) => {
                  //   handleChangeInput("funding_frequesncy", "MONTHLY");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Monthly
                </label>
              </div>
            </CCol>
          </CRow>
          <CRow form className="form-group">
            <CCol sm="4">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Billing Frequency :
              </strong>
            </CCol>
            <CCol sm="8">
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.billing_frequesncy === "DAILY"
                      ? true
                      : false
                  }
                  name="billing_frequesncy"
                  value={applicationInput.billing_frequesncy}
                  // onChange={(e) => {
                  //   handleChangeInput("billing_frequesncy", "DAILY");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Daily
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.billing_frequesncy === "WEEKLY"
                      ? true
                      : false
                  }
                  name="billing_frequesncy"
                  value={applicationInput.billing_frequesncy}
                  // onChange={(e) => {
                  //   handleChangeInput("billing_frequesncy", "WEEKLY");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Weekly
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.billing_frequesncy === "MONTHLY"
                      ? true
                      : false
                  }
                  name="billing_frequesncy"
                  value={applicationInput.billing_frequesncy}
                  // onChange={(e) => {
                  //   handleChangeInput("billing_frequesncy", "MONTHLY");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Monthly
                </label>
              </div>
            </CCol>
          </CRow>
          <CRow form className="form-group">
            <CCol sm="4">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Settelment Method :
              </strong>
            </CCol>
            <CCol sm="8">
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.bank_settlement_method === "GROSS"
                      ? true
                      : false
                  }
                  name="bank_settlement_method"
                  value={applicationInput.bank_settlement_method}
                  // onChange={(e) => {
                  //   handleChangeInput("bank_settlement_method", "GROSS");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Gross
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.bank_settlement_method === "NET"
                      ? true
                      : false
                  }
                  name="bank_settlement_method"
                  value={applicationInput.bank_settlement_method}
                  // onChange={(e) => {
                  //   handleChangeInput("bank_settlement_method", "NET");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Net
                </label>
              </div>
            </CCol>
          </CRow>
          <CRow form className="form-group">
            <CCol sm="4">
              <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
                Account :
              </strong>
            </CCol>
            <CCol sm="8">
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.bank_account_type === "ALL" ? true : false
                  }
                  name="bank_account_type"
                  value={applicationInput.bank_account_type}
                  // onChange={(e) => {
                  //   handleChangeInput("bank_account_type", "ALL");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  All
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.bank_account_type === "DEPOSIT"
                      ? true
                      : false
                  }
                  name="bank_account_type"
                  value={applicationInput.bank_account_type}
                  // onChange={(e) => {
                  //   handleChangeInput("bank_account_type", "DEPOSIT");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Deposit
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.bank_account_type === "BILLING"
                      ? true
                      : false
                  }
                  name="bank_account_type"
                  value={applicationInput.bank_account_type}
                  // onChange={(e) => {
                  //   handleChangeInput("bank_account_type", "BILLING");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Billing
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  disabled
                  className="form-check-input"
                  type="radio"
                  id="inlineRadio2"
                  checked={
                    applicationInput.bank_account_type === "CHARGEBACK"
                      ? true
                      : false
                  }
                  name="bank_account_type"
                  value={applicationInput.bank_account_type}
                  // onChange={(e) => {
                  //   handleChangeInput("bank_account_type", "CHARGEBACK");
                  // }}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Charge back
                </label>
              </div>
            </CCol>
          </CRow>
        </CCol>
        <CCol md="6" sm="12">
          
        </CCol>
      </CRow>
    </div>
  );
}
