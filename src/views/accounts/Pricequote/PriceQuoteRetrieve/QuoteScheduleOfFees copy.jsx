import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPricequoteInput,
  QualifyApplicationList,
  SetQuoteStatusFalse,
  SetQuoteStatusForQualifyFalse,
  SubmitConvertApplication,
} from "../_redux/action/PriceQuoteAction";
import ScheduleFeeTable from "./ScheduleFeeTable";
import calender from "../../../../assets/img/calendar (1).svg";
import { CRow, CCol, CButton } from "@coreui/react";
import Table from "react-bootstrap/Table";
// import { SetLeadsQualifyStatusFalse } from "../../Leads/_redux/action/LeadAction";
import { useNavigate } from "react-router-dom";
const QuoteScheduleOfFees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const afterSuccessQuotequalify = useSelector(
    (state) => state.quoteInfo.afterSuccessQuotequalify
  );
  const checkQuoteQualify = useSelector(
    (state) => state.quoteInfo.checkQuoteQualify
  );
  const handleChangeInput = (name, value, e) => {
    dispatch(GetPricequoteInput(name, value, e));
    if (name === "visa_credit_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_credit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_credit_sr") {
      dispatch(
        GetPricequoteInput(
          "master_credit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_debit_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_debit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_debit_sr") {
      dispatch(
        GetPricequoteInput(
          "master_debit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_v_pay_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_v_pay_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "uk_maestro_sr") {
      dispatch(
        GetPricequoteInput(
          "uk_maestro_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "international_maestro_sr") {
      dispatch(
        GetPricequoteInput(
          "international_maestro_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_business_credit_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_business_credit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_business_debit_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_business_debit_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_purchasing_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_purchasing_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "visa_corporate_sr") {
      dispatch(
        GetPricequoteInput(
          "visa_corporate_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_business_sr") {
      dispatch(
        GetPricequoteInput(
          "master_business_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_purchasing_sr") {
      dispatch(
        GetPricequoteInput(
          "master_purchasing_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_fleet_sr") {
      dispatch(
        GetPricequoteInput(
          "master_fleet_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_corporate_sr") {
      dispatch(
        GetPricequoteInput(
          "master_corporate_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "master_pre_commercial_sr") {
      dispatch(
        GetPricequoteInput(
          "master_pre_commercial_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "non_eea_visa_sr") {
      dispatch(
        GetPricequoteInput(
          "non_eea_visa_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    } else if (name === "non_eea_master_sr") {
      dispatch(
        GetPricequoteInput(
          "non_eea_master_non_sr",
          (parseFloat(value) + 0.5).toFixed(3)
        )
      );
    }
  };
  const handleConvertNewapplication = (data) => {
    dispatch(SubmitConvertApplication(data));
  };
  React.useEffect(() => {
    if (afterSuccessQuotequalify === true) {
      dispatch(QualifyApplicationList(priceQuoteInput?.slug));
      dispatch(SetQuoteStatusForQualifyFalse());
    }
  }, [afterSuccessQuotequalify]);
  React.useEffect(() => {
    if (checkQuoteQualify === true) {
      navigate(`/application-retrive`);
      dispatch(SetQuoteStatusFalse());
    }
  }, [checkQuoteQualify]);
  React.useEffect(() => {
    dispatch(
      GetPricequoteInput("quote_products", [
        ...(priceQuoteInput?.terminal_products ?? []),
        ...(priceQuoteInput?.ecommerce_products ?? []),
        ...(priceQuoteInput?.epos_products ?? []),
      ])
    );
  }, []);

  const handleChangeDebitData = (name, value, e) => {
    dispatch(GetPricequoteInput(name, value, e));
    const newValue = parseFloat(value);
    dispatch(
      GetPricequoteInput(
        "visa_debit_non_sr",
        (parseFloat(value) + 0.5).toFixed(3)
      )
    );
    // master debit
    dispatch(
      GetPricequoteInput(
        "master_debit_sr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
    dispatch(
      GetPricequoteInput(
        "master_debit_non_sr",
        (parseFloat(value) + 0.5 + 0.03).toFixed(3)
      )
    );
    // visa v pay
    dispatch(GetPricequoteInput("visa_v_pay_sr", newValue.toFixed(3)));
    dispatch(
      GetPricequoteInput(
        "visa_v_pay_non_sr",
        (parseFloat(value) + 0.5).toFixed(3)
      )
    );
    // uk meastr0
    dispatch(
      GetPricequoteInput(
        "uk_maestro_sr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
    dispatch(
      GetPricequoteInput(
        "uk_maestro_non_sr",
        (parseFloat(value) + 0.5 + 0.03).toFixed(3)
      )
    );
  };
  const handleChangevisaVPay = (name, value, e) => {
    dispatch(GetPricequoteInput(name, value, e));
    const newValue = parseFloat(value);
    dispatch(
      GetPricequoteInput(
        "visa_v_pay_non_sr",
        (parseFloat(value) + 0.5).toFixed(3)
      )
    );
    dispatch(
      GetPricequoteInput(
        "uk_maestro_sr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
    dispatch(
      GetPricequoteInput(
        "uk_maestro_non_sr",
        (parseFloat(value) + 0.5 + 0.03).toFixed(3)
      )
    );
  };

  return (
    <CRow>
      <div className="leads text-capitalize schedule_table">
        <CCol md="6">
          <img src={calender} width="25" alt="" />
          <strong> Schedule Of Fees </strong> <br />
          <br />
        </CCol>

        <div className="mt-4">
          <div className="row">
            <div className=" table-responsive mb-4 ">
              <Table className="table table-striped number-center">
                <thead className="table-head">
                  <tr>
                    <th style={{ position: "static", color: "#333333" }}>
                      Card Type
                    </th>
                    <th>Secure Rate(%) + (£) Per Transaction</th>
                    <th>Non-Secure Rate (%) + (£) Per Transaction </th>
                    {/* <th>Monthly Turnover</th>
                    <th>Number of Transactions</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Credit</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput?.visa_credit_sr.includes(".") &&
                          priceQuoteInput.visa_credit_sr?.split(".")[1].length >
                            3 &&
                          priceQuoteInput.visa_credit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_credit_sr"
                        value={priceQuoteInput?.visa_credit_sr}
                        onChange={(e) => {
                          handleChangeInput("visa_credit_sr", e.target.value);
                          handleChangeInput("master_credit_sr", e.target.value);
                        }}
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput?.visa_credit_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput?.visa_credit_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput?.visa_credit_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_credit_sr_per_tr_fee"
                        value={priceQuoteInput?.visa_credit_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_credit_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput?.visa_credit_non_sr.includes(".") &&
                          priceQuoteInput.visa_credit_non_sr?.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_credit_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_credit_non_sr"
                        value={priceQuoteInput?.visa_credit_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_credit_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput?.visa_credit_per_non_sr_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput?.visa_credit_per_non_sr_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput?.visa_credit_per_non_sr_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_credit_per_non_sr_tr_fee"
                        value={priceQuoteInput?.visa_credit_per_non_sr_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_credit_per_non_sr_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Credit</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput?.master_credit_sr.includes(".") &&
                          priceQuoteInput.master_credit_sr?.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_credit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_credit_sr"
                        value={priceQuoteInput?.master_credit_sr}
                        onChange={(e) =>
                          handleChangeInput("master_credit_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput?.master_credit_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput?.master_credit_sr_per_tr_fee?.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_credit_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_credit_sr_per_tr_fee"
                        value={priceQuoteInput?.master_credit_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_credit_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput?.master_credit_non_sr.includes(".") &&
                          priceQuoteInput?.master_credit_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput?.master_credit_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_credit_non_sr"
                        value={priceQuoteInput?.master_credit_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_credit_non_sr",
                            e.target.value
                          )
                        }
                      />

                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput?.master_credit_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput?.master_credit_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput?.master_credit_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_credit_non_sr_per_tr_fee"
                        value={priceQuoteInput?.master_credit_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_credit_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Debit</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput?.visa_debit_sr.includes(".") &&
                          priceQuoteInput?.visa_debit_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput?.visa_debit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_debit_sr"
                        value={priceQuoteInput?.visa_debit_sr}
                        onChange={(e) =>
                          handleChangeDebitData("visa_debit_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput?.visa_debit_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput?.visa_debit_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput?.visa_debit_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_debit_sr_per_tr_fee"
                        value={priceQuoteInput?.visa_debit_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_debit_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_debit_non_sr.includes(".") &&
                          priceQuoteInput.visa_debit_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_debit_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_debit_non_sr"
                        value={priceQuoteInput.visa_debit_non_sr}
                        onChange={(e) =>
                          handleChangeInput("visa_debit_non_sr", e.target.value)
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_debit_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_debit_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_debit_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_debit_non_sr_per_tr_fee"
                        value={priceQuoteInput.visa_debit_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_debit_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Debit</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_debit_sr.includes(".") &&
                          priceQuoteInput.master_debit_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput.master_debit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_debit_sr"
                        value={priceQuoteInput.master_debit_sr}
                        onChange={(e) =>
                          handleChangeInput("master_debit_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_debit_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_debit_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_debit_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_debit_sr_per_tr_fee"
                        value={priceQuoteInput.master_debit_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_debit_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_debit_non_sr.includes(".") &&
                          priceQuoteInput.master_debit_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_debit_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_debit_non_sr"
                        value={priceQuoteInput.master_debit_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_debit_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_debit_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_debit_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_debit_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_debit_non_sr_per_tr_fee"
                        value={priceQuoteInput.master_debit_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_debit_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa V-Pay</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_v_pay_sr.includes(".") &&
                          priceQuoteInput.visa_v_pay_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput.visa_v_pay_sr !== ""
                            ? "error_input"
                            : "input "
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_v_pay_sr"
                        value={priceQuoteInput.visa_v_pay_sr}
                        onChange={(e) =>
                          handleChangevisaVPay("visa_v_pay_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_v_pay_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_v_pay_sr_per_tr_fee.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_v_pay_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_v_pay_sr_per_tr_fee"
                        value={priceQuoteInput.visa_v_pay_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_v_pay_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_v_pay_non_sr.includes(".") &&
                          priceQuoteInput.visa_v_pay_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_v_pay_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_v_pay_non_sr"
                        value={priceQuoteInput.visa_v_pay_non_sr}
                        onChange={(e) =>
                          handleChangeInput("visa_v_pay_non_sr", e.target.value)
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_v_pay_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_v_pay_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_v_pay_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_v_pay_non_sr_per_tr_fee"
                        value={priceQuoteInput.visa_v_pay_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_v_pay_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Domestic</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.uk_maestro_sr.includes(".") &&
                          priceQuoteInput.uk_maestro_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput.uk_maestro_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="uk_maestro_sr"
                        value={priceQuoteInput.uk_maestro_sr}
                        onChange={(e) =>
                          handleChangeInput("uk_maestro_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.uk_maestro_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.uk_maestro_sr_per_tr_fee.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.uk_maestro_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="uk_maestro_sr_per_tr_fee"
                        value={priceQuoteInput.uk_maestro_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "uk_maestro_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.uk_maestro_non_sr.includes(".") &&
                          priceQuoteInput.uk_maestro_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.uk_maestro_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="uk_maestro_non_sr"
                        value={priceQuoteInput.uk_maestro_non_sr}
                        onChange={(e) =>
                          handleChangeInput("uk_maestro_non_sr", e.target.value)
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.uk_maestro_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.uk_maestro_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.uk_maestro_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="uk_maestro_non_sr_per_tr_fee"
                        value={priceQuoteInput.uk_maestro_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "uk_maestro_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Maestro Within EEA</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.international_maestro_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.international_maestro_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.international_maestro_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="international_maestro_sr"
                        value={priceQuoteInput.international_maestro_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "international_maestro_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.international_maestro_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.international_maestro_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.international_maestro_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="international_maestro_sr_per_tr_fee"
                        value={
                          priceQuoteInput.international_maestro_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "international_maestro_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.international_maestro_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.international_maestro_non_sr.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.international_maestro_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="international_maestro_non_sr"
                        value={priceQuoteInput.international_maestro_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "international_maestro_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.international_maestro_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.international_maestro_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.international_maestro_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="international_maestro_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.international_maestro_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "international_maestro_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Credit</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_business_credit_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_credit_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_business_credit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_credit_sr"
                        value={priceQuoteInput.visa_business_credit_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_credit_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_business_credit_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_credit_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_business_credit_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_credit_sr_per_tr_fee"
                        value={
                          priceQuoteInput.visa_business_credit_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_credit_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_business_credit_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_credit_non_sr.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_business_credit_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_credit_non_sr"
                        value={priceQuoteInput.visa_business_credit_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_credit_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_business_credit_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_credit_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_business_credit_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_credit_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.visa_business_credit_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_credit_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Business Debit</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_business_debit_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_debit_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_business_debit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_debit_sr"
                        value={priceQuoteInput.visa_business_debit_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_debit_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_business_debit_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_debit_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_business_debit_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_debit_sr_per_tr_fee"
                        value={
                          priceQuoteInput.visa_business_debit_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_debit_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_business_debit_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_debit_non_sr.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_business_debit_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_debit_non_sr"
                        value={priceQuoteInput.visa_business_debit_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_debit_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_business_debit_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_business_debit_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_business_debit_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_business_debit_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.visa_business_debit_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_business_debit_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Purchasing</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_purchasing_sr.includes(".") &&
                          priceQuoteInput.visa_purchasing_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_purchasing_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_purchasing_sr"
                        value={priceQuoteInput.visa_purchasing_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_purchasing_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_purchasing_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_purchasing_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_purchasing_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_purchasing_sr_per_tr_fee"
                        value={priceQuoteInput.visa_purchasing_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_purchasing_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_purchasing_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_purchasing_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_purchasing_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_purchasing_non_sr"
                        value={priceQuoteInput.visa_purchasing_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_purchasing_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_purchasing_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_purchasing_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_purchasing_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_purchasing_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.visa_purchasing_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_purchasing_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Visa Corporate</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_corporate_sr.includes(".") &&
                          priceQuoteInput.visa_corporate_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_corporate_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_corporate_sr"
                        value={priceQuoteInput.visa_corporate_sr}
                        onChange={(e) =>
                          handleChangeInput("visa_corporate_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_corporate_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_corporate_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_corporate_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_corporate_sr_per_tr_fee"
                        value={priceQuoteInput.visa_corporate_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_corporate_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.visa_corporate_non_sr.includes(".") &&
                          priceQuoteInput.visa_corporate_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.visa_corporate_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_corporate_non_sr"
                        value={priceQuoteInput.visa_corporate_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_corporate_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.visa_corporat_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.visa_corporat_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.visa_corporat_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="visa_corporat_non_sr_per_tr_fee"
                        value={priceQuoteInput.visa_corporat_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "visa_corporat_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Business</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput?.visa_credit_sr.includes(".") &&
                          priceQuoteInput?.visa_credit_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput?.visa_credit_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_business_sr"
                        value={priceQuoteInput.master_business_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_business_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_business_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_business_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_business_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_business_sr_per_tr_fee"
                        value={priceQuoteInput.master_business_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_business_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_business_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_business_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_business_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_business_non_sr"
                        value={priceQuoteInput.master_business_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_business_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_business_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_business_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_business_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_business_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.master_business_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "master_business_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Purchasing</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_purchasing_sr.includes(".") &&
                          priceQuoteInput.master_purchasing_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_purchasing_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_purchasing_sr"
                        value={priceQuoteInput.master_purchasing_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_purchasing_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_purchasing_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_purchasing_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_purchasing_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_purchasing_sr_per_tr_fee"
                        value={priceQuoteInput.master_purchasing_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_purchasing_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_purchasing_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_purchasing_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_purchasing_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_purchasing_non_sr"
                        value={priceQuoteInput.master_purchasing_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_purchasing_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_purchasing_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_purchasing_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_purchasing_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_purchasing_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.master_purchasing_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "master_purchasing_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Fleet</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_fleet_sr.includes(".") &&
                          priceQuoteInput.master_fleet_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput.master_fleet_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_fleet_sr"
                        value={priceQuoteInput.master_fleet_sr}
                        onChange={(e) =>
                          handleChangeInput("master_fleet_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_fleet_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_fleet_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_fleet_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_fleet_sr_per_tr_fee"
                        value={priceQuoteInput.master_fleet_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_fleet_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_fleet_non_sr.includes(".") &&
                          priceQuoteInput.master_fleet_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_fleet_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_fleet_non_sr"
                        value={priceQuoteInput.master_fleet_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_fleet_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_fleet_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_fleet_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_fleet_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_fleet_non_sr_per_tr_fee"
                        value={priceQuoteInput.master_fleet_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_fleet_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>Mastercard Corporate</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_corporate_sr.includes(".") &&
                          priceQuoteInput.master_corporate_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_corporate_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_corporate_sr"
                        value={priceQuoteInput.master_corporate_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_corporate_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_corporate_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_corporate_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_corporate_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_corporate_sr_per_tr_fee"
                        value={priceQuoteInput.master_corporate_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_corporate_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_corporate_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_corporate_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_corporate_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_corporate_non_sr"
                        value={priceQuoteInput.master_corporate_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_corporate_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_corporate_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_corporate_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_corporate_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_corporate_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.master_corporate_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "master_corporate_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>
                      Mastercard Prepaid Commercial
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_pre_commercial_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_pre_commercial_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.master_pre_commercial_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_pre_commercial_sr"
                        value={priceQuoteInput.master_pre_commercial_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_pre_commercial_sr",
                            e.target.value
                          )
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_pre_commercial_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_pre_commercial_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_pre_commercial_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_pre_commercial_sr_per_tr_fee"
                        value={
                          priceQuoteInput.master_pre_commercial_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "master_pre_commercial_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.master_pre_commercial_non_sr.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_pre_commercial_non_sr.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_pre_commercial_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_pre_commercial_non_sr"
                        value={priceQuoteInput.master_pre_commercial_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "master_pre_commercial_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.master_pre_commercial_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.master_pre_commercial_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.master_pre_commercial_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="master_pre_commercial_non_sr_per_tr_fee"
                        value={
                          priceQuoteInput.master_pre_commercial_non_sr_per_tr_fee
                        }
                        onChange={(e) =>
                          handleChangeInput(
                            "master_pre_commercial_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA VISA</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.non_eea_visa_sr.includes(".") &&
                          priceQuoteInput.non_eea_visa_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput.non_eea_visa_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_visa_sr"
                        value={priceQuoteInput.non_eea_visa_sr}
                        onChange={(e) =>
                          handleChangeInput("non_eea_visa_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.non_eea_visa_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.non_eea_visa_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.non_eea_visa_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_visa_sr_per_tr_fee"
                        value={priceQuoteInput.non_eea_visa_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "non_eea_visa_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.non_eea_visa_non_sr.includes(".") &&
                          priceQuoteInput.non_eea_visa_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.non_eea_visa_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_visa_non_sr"
                        value={priceQuoteInput.non_eea_visa_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "non_eea_visa_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.non_eea_visa_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.non_eea_visa_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.non_eea_visa_non_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_visa_non_sr_per_tr_fee"
                        value={priceQuoteInput.non_eea_visa_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "non_eea_visa_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 500 }}>All Non-EEA Mastercard</td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.non_eea_master_sr.includes(".") &&
                          priceQuoteInput.non_eea_master_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.non_eea_master_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_master_sr"
                        value={priceQuoteInput.non_eea_master_sr}
                        onChange={(e) =>
                          handleChangeInput("non_eea_master_sr", e.target.value)
                        }
                      />{" "}
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.non_eea_master_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.non_eea_master_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.non_eea_master_sr_per_tr_fee !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_master_sr_per_tr_fee"
                        value={priceQuoteInput.non_eea_master_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "non_eea_master_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={` ${
                          priceQuoteInput.non_eea_master_non_sr.includes(".") &&
                          priceQuoteInput.non_eea_master_non_sr.split(".")[1]
                            .length > 3 &&
                          priceQuoteInput.non_eea_master_non_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_master_non_sr"
                        value={priceQuoteInput.non_eea_master_non_sr}
                        onChange={(e) =>
                          handleChangeInput(
                            "non_eea_master_non_sr",
                            e.target.value
                          )
                        }
                      />
                      {"  "}
                      <input
                        className={`mt-1 ${
                          priceQuoteInput.non_eea_master_non_sr_per_tr_fee.includes(
                            "."
                          ) &&
                          priceQuoteInput.non_eea_master_non_sr_per_tr_fee.split(
                            "."
                          )[1].length > 3 &&
                          priceQuoteInput.non_eea_master_non_sr_per_tr_fee !==
                            ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="non_eea_master_non_sr_per_tr_fee"
                        value={priceQuoteInput.non_eea_master_non_sr_per_tr_fee}
                        onChange={(e) =>
                          handleChangeInput(
                            "non_eea_master_non_sr_per_tr_fee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>* Diners</td>

                    <td colSpan={2}>
                      <input
                        style={{ width: "60%" }}
                        className={` ${
                          priceQuoteInput.diners_sr.includes(".") &&
                          priceQuoteInput.diners_sr.split(".")[1].length > 3 &&
                          priceQuoteInput.diners_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="diners_sr"
                        value={priceQuoteInput.diners_sr}
                        onChange={(e) =>
                          handleChangeInput("diners_sr", e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>** JCB</td>
                    <td colSpan={2}>
                      <input
                        style={{ width: "60%" }}
                        className={` ${
                          priceQuoteInput.jcb_sr.includes(".") &&
                          priceQuoteInput.jcb_sr.split(".")[1].length > 3 &&
                          priceQuoteInput.jcb_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="jcb_sr"
                        value={priceQuoteInput.jcb_sr}
                        onChange={(e) =>
                          handleChangeInput("jcb_sr", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>*** Union Pay</td>
                    <td colSpan={2}>
                      <input
                        style={{ width: "60%" }}
                        className={` ${
                          priceQuoteInput.union_pay_sr.includes(".") &&
                          priceQuoteInput.union_pay_sr.split(".")[1].length >
                            3 &&
                          priceQuoteInput.union_pay_sr !== ""
                            ? "error_input"
                            : " input"
                        }`}
                        type="number"
                        placeholder="£"
                        onWheel={(e) => e.target.blur()}
                        name="union_pay_sr"
                        value={priceQuoteInput.union_pay_sr}
                        onChange={(e) =>
                          handleChangeInput("union_pay_sr", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <ScheduleFeeTable />
            </div>

            {/* <QuoteProductDetails /> */}
          </div>
        </div>

        <div className="mt-4">
          <CRow className="align-items-center">
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              {/* <CButton block color="danger" href="/opportunity-pdf" disabled>
                Generate Quotation
              </CButton> */}
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0 text-end">
              <CButton
                block
                color="warning"
                onClick={() => {
                  handleConvertNewapplication(priceQuoteInput);
                }}
              >
                Convert to New Application
              </CButton>
            </CCol>
          </CRow>
        </div>
      </div>{" "}
    </CRow>
  );
};

export default QuoteScheduleOfFees;
