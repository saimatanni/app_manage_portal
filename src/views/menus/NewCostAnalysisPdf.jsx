import React, { useState } from "react";
import { CCard, CCardBody } from "@coreui/react";
import logo from "../../assets/img/logo.png";

import group from "../../assets/img/Group.svg";

import "./Menu.css";

import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,BarElement
} from "chart.js";
import PropTypes from "prop-types";
import Cookies from "js-cookie"; // Import js-cookie
// export default function NewCostAnalysisPdf() {
export default function NewCostAnalysisPdf({ cRef }) {
  NewCostAnalysisPdf.propTypes = {
    cRef: PropTypes.string.isRequired,
  };


  const [today, setToday] = React.useState("");
  // Get today's date in the format dd/mm/yyyy
  const getFormattedDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Set today's date when the component mounts
  useState(() => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;
    setToday(todayDate);
  }, []);

  const userData = JSON.parse(Cookies.get("userData")) || undefined;
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,BarElement
  );

  //bar chart
  const determineBackgroundColor = (value) => {
    return value < 0 ? "#e55353" : "#198754";
  };
  const determineLabel = (value) => {
    return value < 0 ? "Cost " : "Savings ";
  };

  const fourYearSavings = (
    (leadInput.totalCurrentCost - leadInput.total_pc) *
    48
  )?.toFixed(2);
  const annualSavings = (
    (leadInput.totalCurrentCost - leadInput.total_pc) *
    12
  )?.toFixed(2);
  const monthlySavings = (
    leadInput.totalCurrentCost - leadInput.total_pc
  )?.toFixed(2);

  const data = {
    labels: [
      "Monthly " + determineLabel(fourYearSavings),
      "Annual " + determineLabel(fourYearSavings),
      "4 Year " + determineLabel(fourYearSavings),
    ],
    datasets: [
      {
        label: determineLabel(fourYearSavings) + "Amount",
        data: [monthlySavings || 0, annualSavings || 0, fourYearSavings || 0],
        backgroundColor: [
          determineBackgroundColor(monthlySavings),
          determineBackgroundColor(annualSavings),
          determineBackgroundColor(fourYearSavings),
        ],
        borderColor: "#181430",
        borderWidth: 1,
        barThickness: 65, // Adjust this value to control the bar width
      },
    ],
  };

  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      {/* <div ref={cRef} style={{ size: "a4", margin: "10mm 0 0 " }}> */}
      <div ref={cRef}>
        <div className="m-5" id="costAnalysisPdf">
          {/* <div className="container" id="costAnalysisPdf"> */}
          <div className="row my-2">
            <div className="d-flex  pt-4">
              <img
                src={logo}
                className="img-fluid"
                alt=""
                style={{ width: "320px" }}
              />
            </div>
          </div>
        </div>
        {/* <br /><br /><br /> */}
        <section>
          <div className="mx-5">
            {/* <div className="container-fluid"> */}
            <div className="row my-2 ">
              <div className="col-md-6">
                <form>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Legal Name</strong>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.legal_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Trading Name</strong>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.trading_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Address 1</strong>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.trading_address1}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Address 2</strong>{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.trading_address2}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>City/Town</strong>{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.trading_city}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Postcode</strong>
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.trading_postcode}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      <strong>Statement Date</strong>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={getFormattedDate(today)}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      <strong>Customer Contact Number</strong>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.mobile}
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                      <div className="text-center">
                        <h4>Contact To</h4>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      <strong>Account Manager</strong>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={userData.first_name + " " + userData.last_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      <strong>Representative Mobile</strong>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={userData.mobile}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      <strong>Representative Email</strong>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control"
                        id="inputPassword"
                        value={userData.email}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      <strong>Reference Number</strong>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.client_id}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-md-12">
                <h2 className="text-info mb-3">Cost Analysis</h2>
                <div className="table-responsive">
                  <table className="table border text-center">
                    <thead>
                      <th>Type of</th>
                      <th>Current Rate</th>
                      <th>Paymentsave Rate</th>
                      <th>Monthly Turnover</th>
                      <th>Current Cost</th>
                      <th>Paymentsave Cost</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>VISA Debit (Personal)</strong>
                        </td>
                        <td>% {leadInput.visa_debit_cr} </td>
                        <td>% {leadInput.visa_debit_pr}</td>
                        <td>£ {parseInt(leadInput.visa_debit_ts)} </td>
                        <td>£ {leadInput.visa_debit_cc}</td>
                        <td>£ {leadInput.visa_debit_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mastercard Debit</strong>
                        </td>
                        <td>% {leadInput.mastercard_debit_cr} </td>
                        <td>% {leadInput.mastercard_debit_pr}</td>
                        <td>£ {parseInt(leadInput.mastercard_debit_ts)} </td>
                        <td>£ {leadInput.mastercard_debit_cc}</td>
                        <td>£ {leadInput.mastercard_debit_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>VISA Credit (Personal)</strong>
                        </td>
                        <td>% {leadInput.visa_credit_cr} </td>
                        <td>% {leadInput.visa_credit_pr}</td>
                        <td>£ {parseInt(leadInput.visa_credit_ts)} </td>
                        <td>£ {leadInput.visa_credit_cc}</td>
                        <td>£ {leadInput.visa_credit_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mastercard Credit</strong>
                        </td>
                        <td>% {leadInput.mastercard_credit_cr} </td>
                        <td>% {leadInput.mastercard_credit_pr}</td>
                        <td>£ {parseInt(leadInput.mastercard_credit_ts)} </td>
                        <td>£ {leadInput.mastercard_credit_cc}</td>
                        <td>£ {leadInput.mastercard_credit_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Visa Business Debit</strong>
                        </td>
                        <td>% {leadInput.visa_business_debit_cr} </td>
                        <td>% {leadInput.visa_business_debit_pr}</td>
                        <td>£ {parseInt(leadInput.visa_business_debit_ts)} </td>
                        <td>£ {leadInput.visa_business_debit_cc}</td>
                        <td>£ {leadInput.visa_business_debit_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mastercard Business</strong>
                        </td>
                        <td>% {leadInput.mastercard_business_cr} </td>
                        <td>% {leadInput.mastercard_business_pr}</td>
                        <td>£ {parseInt(leadInput.mastercard_business_ts)} </td>
                        <td>£ {leadInput.mastercard_business_cc}</td>
                        <td>£ {leadInput.mastercard_business_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Visa Business Credit</strong>
                        </td>
                        <td>% {leadInput.visa_business_credit_cr} </td>
                        <td>% {leadInput.visa_business_credit_pr}</td>
                        <td>
                          £ {parseInt(leadInput.visa_business_credit_ts)}{" "}
                        </td>
                        <td>£ {leadInput.visa_business_credit_cc}</td>
                        <td>£ {leadInput.visa_business_credit_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mastercard Corporate</strong>
                        </td>
                        <td>% {leadInput.mastercard_corporate_cr} </td>
                        <td>% {leadInput.mastercard_corporate_pr}</td>
                        <td>
                          £ {parseInt(leadInput.mastercard_corporate_ts)}{" "}
                        </td>
                        <td>£ {leadInput.mastercard_corporate_cc}</td>
                        <td>£ {leadInput.mastercard_corporate_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong> All Non-EEA Visa</strong>
                        </td>
                        <td>% {leadInput.all_non_eea_visa_fee_cr} </td>
                        <td>% {leadInput.all_non_eea_visa_fee_pr}</td>
                        <td>
                          £ {parseInt(leadInput.all_non_eea_visa_fee_ts)}{" "}
                        </td>
                        <td>£ {leadInput.all_non_eea_visa_fee_cc}</td>
                        <td>£ {leadInput.all_non_eea_visa_fee_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong> All Non-EEA Mastercard</strong>
                        </td>
                        <td>% {leadInput.all_non_eea_mastercard_fee_cr} </td>
                        <td>% {leadInput.all_non_eea_mastercard_fee_pr}</td>
                        <td>
                          £ {parseInt(leadInput.all_non_eea_mastercard_fee_ts)}{" "}
                        </td>
                        <td>£ {leadInput.all_non_eea_mastercard_fee_cc}</td>
                        <td>£ {leadInput.all_non_eea_mastercard_fee_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>AMEX</strong>
                        </td>
                        <td>% {leadInput.amex_cr} </td>
                        <td>% {leadInput.amex_sr}</td>
                        <td>£ {parseInt(leadInput.amex_ts)} </td>
                        <td>£ {leadInput.amex_cc}</td>
                        <td>£ {leadInput.amex_pc} </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Authorisation Fees</strong>
                        </td>
                        <td>£ {leadInput.authorization_fee_cr} </td>
                        <td>£ {leadInput.authorization_fee_pr}</td>
                        <td>
                          Number of transaction <br />
                          {parseInt(leadInput.authorization_fee_tr_no)}{" "}
                        </td>
                        <td>£ {leadInput.authorization_fee_cc}</td>
                        <td>£ {leadInput.authorization_fee_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Per Transactional Charge</strong>
                        </td>
                        <td>£ {leadInput.per_transactional_charge_cr} </td>
                        <td>£ {leadInput.per_transactional_charge_pr}</td>
                        <td>
                          Number of transaction <br />
                          {parseInt(
                            leadInput.per_transactional_charge_tr_no
                          )}{" "}
                        </td>
                        <td>£ {leadInput.per_transactional_charge_cc}</td>
                        <td>£ {leadInput.per_transactional_charge_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Portal Reporting</strong>
                        </td>
                        <td>£ {leadInput.portal_reporting_fee_cr} </td>
                        <td>£ {leadInput.portal_reporting_fee_pr}</td>
                        <td>
                          Per Month
                          {/* £ {parseInt(leadInput.portal_reporting_fee_ts)}{" "} */}
                        </td>
                        <td>£ {leadInput.portal_reporting_fee_cc}</td>
                        <td>£ {leadInput.portal_reporting_fee_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PCI DSS Fees</strong>
                        </td>
                        <td> £{leadInput.pci_dss_fee_cr} </td>
                        <td> £{leadInput.pci_dss_fee_pr}</td>
                        <td>
                          Per Month
                          {/* {parseInt(leadInput.pci_dss_fee_ts)}  */}
                        </td>
                        <td>£ {leadInput.pci_dss_fee_cc}</td>
                        <td>£ {leadInput.pci_dss_fee_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Terminal Rental</strong>
                        </td>
                        <td>£{leadInput.terminal_rental_fee_cr} </td>
                        <td> £{leadInput.terminal_rental_fee_pr}</td>
                        <td>
                          {/* Per Month */}
                          Number of Terminal <br />
                          {parseInt(leadInput.num_of_terminals)}
                        </td>
                        <td>£ {leadInput.terminal_rental_fee_cc}</td>
                        <td>£ {leadInput.terminal_rental_fee_pc} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td
                          style={{
                            background: "#e55353",
                          }}
                        >
                          <p
                            style={{
                              background: "#e55353",
                              color: "white",
                              marginBottom: 0,
                            }}
                          >
                            £ {leadInput.totalCurrentCost}
                          </p>{" "}
                        </td>
                        <td
                          style={{
                            background: "#198754",
                          }}
                        >
                          <p
                            style={{
                              background: "#198754",
                              color: "white",
                              marginBottom: 0,
                            }}
                          >
                            £ {leadInput.total_pc}
                          </p>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <div className="row my-2">
              <div className="col-md-6">
                <CCard style={{ background: "#F2F2F7" }}>
                  <CCardBody>
                    {/* <Line options={options1} data={chartData} /> */}
                    <Bar data={data} options={options2} />
                  </CCardBody>
                </CCard>
              </div>
              <div className="col-md-6">
                <table
                  className="table table-striped table-hover table-bordered text-center"
                  style={{ background: "#fff" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "600" }}>Monthly Savings</td>
                      <td>
                        <strong>
                          £
                          {(
                            leadInput.totalCurrentCost - leadInput.total_pc
                          )?.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "600" }}>% of Saving</td>
                      <td>
                        <strong>
                          {" "}
                          {!leadInput.percent ||
                          leadInput.percent === "-Infinity" ||
                          leadInput.percent === "NaN"
                            ? 0
                            : Math.ceil(leadInput.percent)}
                        </strong>{" "}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "600" }}>Annual Savings</td>
                      <td>
                        <strong>
                          £
                          {(
                            (leadInput.totalCurrentCost - leadInput.total_pc) *
                            12
                          )?.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "600" }}>4 Years Savings</td>
                      <td>
                        <strong>
                          £
                          {(
                            (leadInput.totalCurrentCost - leadInput.total_pc) *
                            48
                          )?.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <footer style={{ marginTop: "55px" }}>
          <div
            // className="container-fluid"
            style={{ width: "100%" }}
          >
            <div className="row">
              <div className="col-md-6" style={{ padding: "0" }}>
                <div className="bg-info text-center">
                  <p
                    style={{
                      margin: "0",
                      padding: "12px 20px",
                      color: "white",
                    }}
                  >
                    <img src={group} width="18px" alt="" /> Unit 7 Stanton Gate,
                    49 Mawney Road, Romoford, RM7 7HL
                  </p>
                </div>
              </div>
              <div className="col-md-6" style={{ padding: " 0" }}>
                <div style={{ background: "#1e2553" }} className="text-center">
                  <div
                    className="d-flex align-items-center"
                    style={{ justifyContent: "space-around", padding: "12px" }}
                  >
                    {/* <div className="row" style={{ padding: "12px" }}> */}
                    <div>
                      {/* <div className="col-md-4"> */}
                      <a href="" className="nav-link text-white">
                        <img
                          src="../../assets/img/Vector.svg"
                          width="18px"
                          alt=""
                        />
                        +44 1634 540 453
                      </a>
                    </div>
                    <div className="">
                      <a href="" className="nav-link text-white">
                        <img
                          src="../../assets/img/Group.svg"
                          width="18px"
                          alt=""
                        />
                        www.paymentsave.co.uk
                      </a>
                    </div>
                    <div className="">
                      <a href="" className="nav-link text-white">
                        <img
                          src="../../assets/img/wmail.svg"
                          width="18px"
                          alt=""
                        />
                        info@paymentsave.co.uk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* ---------------==============-------------- */}
    </>
  );
}
