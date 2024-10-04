import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScheduleFeeTable from "./ScheduleFeeTable";

import { CCol } from "@coreui/react";
import Table from "react-bootstrap/Table";

import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
import Cookies from "js-cookie"; // Import js-cookie
const AppScheduleOfFees = () => {
  const dispatch = useDispatch();

  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  useEffect(() => {
    if (applicationInput.desc_of_service === null) {
      dispatch(GetApplicationInput("desc_of_service", ""));
    }
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
  const handleChangeInput = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
    if (name === "visa_credit_sr_per_tr_fee") {
      dispatch(
        GetApplicationInput(
          "master_credit_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "visa_debit_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "master_debit_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "visa_v_pay_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "uk_maestro_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "international_maestro_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "visa_business_credit_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "visa_business_debit_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "visa_purchasing_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "visa_corporate_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "master_business_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "master_purchasing_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "master_fleet_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "master_corporate_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "master_pre_commercial_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "non_eea_visa_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput(
          "non_eea_master_sr_per_tr_fee",
          parseFloat(value).toFixed(3)
        )
      );
      dispatch(
        GetApplicationInput("amex_sr_per_tr_fee", parseFloat(value).toFixed(3))
      );
    }
    if (name === "visa_credit_sr") {
      dispatch(
        GetApplicationInput(
          "visa_credit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_credit_sr") {
      dispatch(
        GetApplicationInput(
          "master_credit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_debit_sr") {
      dispatch(
        GetApplicationInput(
          "visa_debit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_debit_sr") {
      dispatch(
        GetApplicationInput(
          "master_debit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_v_pay_sr") {
      dispatch(
        GetApplicationInput(
          "visa_v_pay_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "uk_maestro_sr") {
      dispatch(
        GetApplicationInput(
          "uk_maestro_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "international_maestro_sr") {
      dispatch(
        GetApplicationInput(
          "international_maestro_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_business_credit_sr") {
      dispatch(
        GetApplicationInput(
          "visa_business_credit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_business_debit_sr") {
      dispatch(
        GetApplicationInput(
          "visa_business_debit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_purchasing_sr") {
      dispatch(
        GetApplicationInput(
          "visa_purchasing_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_corporate_sr") {
      dispatch(
        GetApplicationInput(
          "visa_corporate_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_business_sr") {
      dispatch(
        GetApplicationInput(
          "master_business_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_purchasing_sr") {
      dispatch(
        GetApplicationInput(
          "master_purchasing_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_fleet_sr") {
      dispatch(
        GetApplicationInput(
          "master_fleet_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_corporate_sr") {
      dispatch(
        GetApplicationInput(
          "master_corporate_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_pre_commercial_sr") {
      dispatch(
        GetApplicationInput(
          "master_pre_commercial_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "non_eea_visa_sr") {
      dispatch(
        GetApplicationInput(
          "non_eea_visa_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "non_eea_master_sr") {
      dispatch(
        GetApplicationInput(
          "non_eea_master_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    }
  };

  const handleChangeDebitData = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
    const newValue = parseFloat(value);
    dispatch(
      GetApplicationInput(
        "visa_debit_non_sr",
        (parseFloat(value) + 0.5).toFixed(3)
      )
    );
    // master debit
    dispatch(
      GetApplicationInput(
        "master_debit_sr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
    dispatch(
      GetApplicationInput(
        "master_debit_non_sr",
        (parseFloat(value) + 0.5 + 0.03).toFixed(3)
      )
    );
    // visa v pay
    dispatch(GetApplicationInput("visa_v_pay_sr", newValue.toFixed(3)));
    dispatch(
      GetApplicationInput(
        "visa_v_pay_non_sr",
        (parseFloat(value) + 0.5).toFixed(3)
      )
    );
    // uk meastr0
    dispatch(
      GetApplicationInput(
        "uk_maestro_sr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
    dispatch(
      GetApplicationInput(
        "uk_maestro_non_sr",
        (parseFloat(value) + 0.5 + 0.03).toFixed(3)
      )
    );
  };
  const handleChangevisaVPay = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
    const newValue = parseFloat(value);
    dispatch(
      GetApplicationInput(
        "visa_v_pay_non_sr",
        (parseFloat(value) + 0.5).toFixed(3)
      )
    );
    dispatch(
      GetApplicationInput(
        "uk_maestro_sr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
    dispatch(
      GetApplicationInput(
        "uk_maestro_non_sr",
        (parseFloat(value) + 0.5 + 0.03).toFixed(3)
      )
    );
  };
  const isValueLessThanMin = (value, minValue) => {
    return Number(value) < minValue;
  };
  return (
    <>
      <div className="leads text-capitalize schedule_table" id="appInput">
        <CCol md="6">
          {/* <img src={calender} width="25" alt="" /> */}
          <strong> Schedule Of Fees </strong> <br />
          <br />
        </CCol>

        <div className="mt-4">
          <div className="row">
            <div className=" table-responsive mb-4 ">
              <Table className="table table-striped number-center" id="myInput">
                <thead className="table-head">
                  <tr>
                    <th style={{ position: "static", color: "#333333" }}>
                      Card Type
                    </th>
                    <th>MSC Rate (%)</th>
                    <th>(£) MSC Rate Per Transaction</th>
                    {/* <th>Monthly Turnover</th>
                    <th>Number of Transactions</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Credit</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          className={`mt-1  ${
                            isValueLessThanMin(
                              applicationInput.visa_credit_sr,
                              0.65
                            )
                              ? "error_input"
                              : "input"
                          }`}
                          type="number"
                          min={0.65}
                          // disabled
                          // style={{ cursor: "not-allowed" }}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_credit_sr"
                          value={applicationInput?.visa_credit_sr}
                          onChange={(e) => {
                            handleChangeInput("visa_credit_sr", e.target.value);
                            handleChangeInput(
                              "master_credit_sr",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                    </td>

                    <td>
                      {"  "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput?.visa_credit_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput?.visa_credit_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput?.visa_credit_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_credit_sr_per_tr_fee"
                          value={applicationInput?.visa_credit_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_credit_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Credit</td>
                    <td>
                      {" "}
                      <div className="parcent-input2">
                        <input
                          className={` ${
                            isValueLessThanMin(
                              applicationInput.master_credit_sr,
                              0.65
                            )
                              ? "error_input"
                              : "input"
                          }`}
                          type="number"
                          // disabled
                          min={0.65}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_credit_sr"
                          value={applicationInput?.master_credit_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_credit_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput?.master_credit_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput?.master_credit_sr_per_tr_fee?.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_credit_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_credit_sr_per_tr_fee"
                          value={applicationInput?.master_credit_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_credit_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Debit</td>
                    <td>
                      {" "}
                      <div className="parcent-input2">
                        <input
                          // style={{ cursor: "not-allowed" }}
                          // disabled
                          className={` ${
                            isValueLessThanMin(
                              applicationInput.visa_debit_sr,
                              0.35
                            )
                              ? "error_input"
                              : "input"
                          }`}
                          // className={` ${
                          //   applicationInput?.visa_debit_sr.includes(".") &&
                          //   applicationInput?.visa_debit_sr.split(".")[1].length >
                          //     3 &&
                          //   applicationInput?.visa_debit_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0.35}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_debit_sr"
                          value={applicationInput?.visa_debit_sr}
                          onChange={(e) =>
                            handleChangeDebitData(
                              "visa_debit_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput?.visa_debit_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput?.visa_debit_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput?.visa_debit_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_debit_sr_per_tr_fee"
                          value={applicationInput?.visa_debit_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_debit_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Debit</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          // style={{ cursor: "not-allowed" }}
                          // disabled
                          // className={` ${
                          //   applicationInput.master_debit_sr.includes(".") &&
                          //   applicationInput.master_debit_sr.split(".")[1].length >
                          //     3 &&
                          //   applicationInput.master_debit_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          className={` ${
                            isValueLessThanMin(
                              applicationInput.master_debit_sr,
                              0.38
                            )
                              ? "error_input"
                              : "input"
                          }`}
                          type="number"
                          min={0.38}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_debit_sr"
                          value={applicationInput.master_debit_sr}
                          onChange={(e) =>
                            handleChangeInput("master_debit_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.master_debit_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.master_debit_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_debit_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_debit_sr_per_tr_fee"
                          value={applicationInput.master_debit_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_debit_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa V-Pay</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          // style={{ cursor: "not-allowed" }}
                          // disabled
                          className={` ${
                            isValueLessThanMin(
                              applicationInput.visa_v_pay_sr,
                              0.35
                            )
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0.35}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_v_pay_sr"
                          value={applicationInput.visa_v_pay_sr}
                          onChange={(e) =>
                            handleChangevisaVPay(
                              "visa_v_pay_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.visa_v_pay_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.visa_v_pay_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.visa_v_pay_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_v_pay_sr_per_tr_fee"
                          value={applicationInput.visa_v_pay_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_v_pay_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Domestic</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          // style={{ cursor: "not-allowed" }}
                          // disabled
                          className={` ${
                            isValueLessThanMin(
                              applicationInput.uk_maestro_sr,
                              0.38
                            )
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0.38}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="uk_maestro_sr"
                          value={applicationInput.uk_maestro_sr}
                          onChange={(e) =>
                            handleChangeInput("uk_maestro_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.uk_maestro_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.uk_maestro_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.uk_maestro_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="uk_maestro_sr_per_tr_fee"
                          value={applicationInput.uk_maestro_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "uk_maestro_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Within EEA</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className="input"
                          // className={` ${
                          //   applicationInput.international_maestro_sr.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.international_maestro_sr.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.international_maestro_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="international_maestro_sr"
                          value={applicationInput.international_maestro_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "international_maestro_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.international_maestro_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.international_maestro_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.international_maestro_sr_per_tr_fee !==
                              ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="international_maestro_sr_per_tr_fee"
                          value={
                            applicationInput.international_maestro_sr_per_tr_fee
                          }
                          onChange={(e) =>
                            handleChangeInput(
                              "international_maestro_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Credit</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className="input"
                          // className={` ${
                          //   applicationInput.visa_business_credit_sr.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.visa_business_credit_sr.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.visa_business_credit_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_business_credit_sr"
                          value={applicationInput.visa_business_credit_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                           className="mt-1 input"
                          // className={`mt-1 ${
                          //   applicationInput.visa_business_credit_sr_per_tr_fee.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.visa_business_credit_sr_per_tr_fee.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.visa_business_credit_sr_per_tr_fee !==
                          //     ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_business_credit_sr_per_tr_fee"
                          value={
                            applicationInput.visa_business_credit_sr_per_tr_fee
                          }
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Debit</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className="input"
                          // className={` ${
                          //   applicationInput.visa_business_debit_sr.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.visa_business_debit_sr.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.visa_business_debit_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={1.85}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_business_debit_sr"
                          value={applicationInput.visa_business_debit_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>

                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                           className="input"
                          // className={`mt-1 ${
                          //   applicationInput.visa_business_debit_sr_per_tr_fee.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.visa_business_debit_sr_per_tr_fee.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.visa_business_debit_sr_per_tr_fee !==
                          //     ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_business_debit_sr_per_tr_fee"
                          value={
                            applicationInput.visa_business_debit_sr_per_tr_fee
                          }
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Purchasing</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                           className="input"
                          disabled
                          style={{ cursor: "not-allowed" }}
                          // className={` ${
                          //   applicationInput.visa_purchasing_sr.includes(".") &&
                          //   applicationInput.visa_purchasing_sr.split(".")[1]
                          //     .length > 3 &&
                          //   applicationInput.visa_purchasing_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_purchasing_sr"
                          value={applicationInput.visa_purchasing_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_purchasing_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                           className="input"
                          // className={`mt-1 ${
                          //   applicationInput.visa_purchasing_sr_per_tr_fee.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.visa_purchasing_sr_per_tr_fee.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.visa_purchasing_sr_per_tr_fee !==
                          //     ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_purchasing_sr_per_tr_fee"
                          value={applicationInput.visa_purchasing_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_purchasing_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Corporate</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                           className="input"
                          disabled
                          style={{ cursor: "not-allowed" }}
                          // className={` ${
                          //   applicationInput.visa_corporate_sr.includes(".") &&
                          //   applicationInput.visa_corporate_sr.split(".")[1]
                          //     .length > 3 &&
                          //   applicationInput.visa_corporate_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_corporate_sr"
                          value={applicationInput.visa_corporate_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_corporate_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                           className="input"
                          // className={`mt-1 ${
                          //   applicationInput.visa_corporate_sr_per_tr_fee.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.visa_corporate_sr_per_tr_fee.split(
                          //     "."
                          //   )[1].length > 3 &&
                          //   applicationInput.visa_corporate_sr_per_tr_fee !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="visa_corporate_sr_per_tr_fee"
                          value={applicationInput.visa_corporate_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_corporate_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Business</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                           className="input"
                          disabled
                          style={{ cursor: "not-allowed" }}
                          // className={` ${
                          //   applicationInput?.master_business_sr.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput?.master_business_sr.split(".")[1]
                          //     .length > 3 &&
                          //   applicationInput?.master_business_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_business_sr"
                          value={applicationInput.master_business_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_business_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.master_business_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.master_business_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_business_sr_per_tr_fee !==
                              ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_business_sr_per_tr_fee"
                          value={applicationInput.master_business_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_business_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Purchasing</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                           className="input"
                          disabled
                          style={{ cursor: "not-allowed" }}
                          // className={` ${
                          //   applicationInput.master_purchasing_sr.includes(
                          //     "."
                          //   ) &&
                          //   applicationInput.master_purchasing_sr.split(".")[1]
                          //     .length > 3 &&
                          //   applicationInput.master_purchasing_sr !== ""
                          //     ? "error_input"
                          //     : " input"
                          // }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_purchasing_sr"
                          value={applicationInput.master_purchasing_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_purchasing_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.master_purchasing_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.master_purchasing_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_purchasing_sr_per_tr_fee !==
                              ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_purchasing_sr_per_tr_fee"
                          value={
                            applicationInput.master_purchasing_sr_per_tr_fee
                          }
                          onChange={(e) =>
                            handleChangeInput(
                              "master_purchasing_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Fleet</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.master_fleet_sr.includes(".") &&
                            applicationInput.master_fleet_sr.split(".")[1]
                              .length > 3 &&
                            applicationInput.master_fleet_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_fleet_sr"
                          value={applicationInput.master_fleet_sr}
                          onChange={(e) =>
                            handleChangeInput("master_fleet_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.master_fleet_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.master_fleet_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_fleet_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_fleet_sr_per_tr_fee"
                          value={applicationInput.master_fleet_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_fleet_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Corporate</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.master_corporate_sr.includes(
                              "."
                            ) &&
                            applicationInput.master_corporate_sr.split(".")[1]
                              .length > 3 &&
                            applicationInput.master_corporate_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_corporate_sr"
                          value={applicationInput.master_corporate_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_corporate_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={` ${
                            applicationInput.master_corporate_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.master_corporate_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_corporate_sr_per_tr_fee !==
                              ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_corporate_sr_per_tr_fee"
                          value={
                            applicationInput.master_corporate_sr_per_tr_fee
                          }
                          onChange={(e) =>
                            handleChangeInput(
                              "master_corporate_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>
                      Mastercard Prepaid Commercial
                    </td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.master_pre_commercial_sr.includes(
                              "."
                            ) &&
                            applicationInput.master_pre_commercial_sr.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_pre_commercial_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_pre_commercial_sr"
                          value={applicationInput.master_pre_commercial_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "master_pre_commercial_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.master_pre_commercial_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.master_pre_commercial_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.master_pre_commercial_sr_per_tr_fee !==
                              ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="master_pre_commercial_sr_per_tr_fee"
                          value={
                            applicationInput.master_pre_commercial_sr_per_tr_fee
                          }
                          onChange={(e) =>
                            handleChangeInput(
                              "master_pre_commercial_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA VISA</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            isValueLessThanMin(
                              applicationInput.non_eea_visa_sr,
                              2.5
                            )
                              ? "error_input"
                              : "input"
                          }`}
                          type="number"
                          min={2.5}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="non_eea_visa_sr"
                          value={applicationInput.non_eea_visa_sr}
                          onChange={(e) =>
                            handleChangeInput("non_eea_visa_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.non_eea_visa_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.non_eea_visa_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.non_eea_visa_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="non_eea_visa_sr_per_tr_fee"
                          value={applicationInput.non_eea_visa_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "non_eea_visa_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA Mastercard</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` mt-1 ${
                            isValueLessThanMin(
                              applicationInput.non_eea_master_sr,
                              2.5
                            )
                              ? "error_input"
                              : "input"
                          }`}
                          type="number"
                          min={2.5}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="non_eea_master_sr"
                          value={applicationInput.non_eea_master_sr}
                          onChange={(e) =>
                            handleChangeInput(
                              "non_eea_master_sr",
                              e.target.value
                            )
                          }
                        />{" "}
                        {"  "}{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.non_eea_master_sr_per_tr_fee.includes(
                              "."
                            ) &&
                            applicationInput.non_eea_master_sr_per_tr_fee.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.non_eea_master_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="non_eea_master_sr_per_tr_fee"
                          value={applicationInput.non_eea_master_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "non_eea_master_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>AMEX</td>
                    <td>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.amex_sr.includes(".") &&
                            applicationInput.amex_sr.split(".")[1].length > 3 &&
                            applicationInput.amex_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="amex_sr"
                          value={applicationInput.amex_sr}
                          onChange={(e) =>
                            handleChangeInput("amex_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                      {"  "}
                    </td>
                    <td>
                      {" "}
                      <div className="currency-input2">
                        <input
                          className={`mt-1 ${
                            applicationInput.amex_sr_per_tr_fee.includes(".") &&
                            applicationInput.amex_sr_per_tr_fee.split(".")[1]
                              .length > 3 &&
                            applicationInput.amex_sr_per_tr_fee !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="amex_sr_per_tr_fee"
                          value={applicationInput.amex_sr_per_tr_fee}
                          onChange={(e) =>
                            handleChangeInput(
                              "amex_sr_per_tr_fee",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>* DCI/Discover</td>
                    {/* <td>* Diners</td> */}

                    <td colSpan={2}>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.diners_sr.includes(".") &&
                            applicationInput.diners_sr.split(".")[1].length >
                              3 &&
                            applicationInput.diners_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="diners_sr"
                          value={applicationInput.diners_sr}
                          onChange={(e) =>
                            handleChangeInput("diners_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>** JCB</td>
                    <td colSpan={2}>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.jcb_sr.includes(".") &&
                            applicationInput.jcb_sr.split(".")[1].length > 3 &&
                            applicationInput.jcb_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="jcb_sr"
                          value={applicationInput.jcb_sr}
                          onChange={(e) =>
                            handleChangeInput("jcb_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>*** Union Pay</td>
                    <td colSpan={2}>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.union_pay_sr.includes(".") &&
                            applicationInput.union_pay_sr.split(".")[1].length >
                              3 &&
                            applicationInput.union_pay_sr !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="union_pay_sr"
                          value={applicationInput.union_pay_sr}
                          onChange={(e) =>
                            handleChangeInput("union_pay_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Higher Risk Additional Loading Rate</td>
                    <td colSpan={2}>
                      <div className="parcent-input2">
                        <input
                          disabled
                          style={{ cursor: "not-allowed" }}
                          className={` ${
                            applicationInput.high_risk_loading_rate.includes(
                              "."
                            ) &&
                            applicationInput.high_risk_loading_rate.split(
                              "."
                            )[1].length > 3 &&
                            applicationInput.high_risk_loading_rate !== ""
                              ? "error_input"
                              : " input"
                          }`}
                          type="number"
                          min={0}
                          // placeholder="£"
                          onWheel={(e) => e.target.blur()}
                          name="high_risk_loading_rate"
                          value={applicationInput.high_risk_loading_rate}
                          onChange={(e) =>
                            handleChangeInput(
                              "high_risk_loading_rate",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <ScheduleFeeTable />
            </div>

            {/* <QuoteProductDetails /> */}
          </div>
        </div>

        {/* <div className="mt-4">
          <CRow className="align-items-center">
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="danger" href="/opportunity-pdf">
              Convert to Opportunity
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0 text-end">
              <CButton
                block
                color="warning"
                onClick={() => {
                  handleConvertNewapplication(applicationInput);
                }}
              >
                Convert to New Application
              </CButton>
            </CCol>
          </CRow>
        </div> */}
      </div>{" "}
    </>
  );
};

export default AppScheduleOfFees;
