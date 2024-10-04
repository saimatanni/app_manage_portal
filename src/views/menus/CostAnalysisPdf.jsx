import React, { useRef } from "react";
import { CCard, CCardBody } from "@coreui/react";
import logo from "../../assets/img/logo.png";
import group15 from "../../assets/img/Group 15.svg";
import group from "../../assets/img/Group.svg";
import vector from "../../assets/img/Vector.svg";
import webmail from "../../assets/img/wmail.svg";

import "./Menu.css";

import { useSelector } from "react-redux";

export default function CostAnalysisPdf() {
  const cRef = useRef();
  

  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  return (
    <div>
      <div ref={cRef}>
        <div className="container" id="costAnalysisPdf">
          <div className="row">
            <div className="col-md-4 pt-4">
              <img src={logo} className="img-fluid" alt="" />
            </div>
            
          </div>
        </div>
        <br />
        <br />
        <br />
        <section className="first-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <form>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong> Customer Name</strong>
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.first_name + " " + leadInput.last_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong> Trading Name</strong>
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.trading_name}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Address 1</strong>
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.legal_address1}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Address 2</strong>{" "}
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.legal_address2}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>City/Town</strong>{" "}
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.legal_city}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Postcode</strong>{" "}
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.legal_postcode}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <form>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong> Date</strong>
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong> Account Manager</strong>
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Mobile</strong>
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.mobile}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    ></label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        value={leadInput.telephone}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      <strong>Statement Date</strong>{" "}
                    </label>
                    <div className="col-sm-9 my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-info">Cost Analysis</h1>
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
                          <strong>Visa Debit</strong>
                        </td>
                        <td>{leadInput.visa_debit_cr}%</td>
                        <td>{leadInput.visa_debit_pr}%</td>

                        <td>£ {leadInput.visa_debit_ts}</td>
                        <td>£ {leadInput.visa_debit_cc}</td>
                        <td>£ {leadInput.visa_debit_pc}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mastercard Debit</strong>
                        </td>
                        <td>{leadInput.master_debit_cr}%</td>
                        <td>{leadInput.master_debit_pr}%</td>

                        <td>£ {leadInput.master_debit_ts}</td>
                        <td>£ {leadInput.master_debit_cc}</td>
                        <td>£ {leadInput.master_debit_pc}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Visa Credit</strong>
                        </td>
                        <td>{leadInput.visa_credit_cr}%</td>
                        <td>{leadInput.visa_credit_pr}%</td>

                        <td>£ {leadInput.visa_credit_ts}</td>
                        <td>£ {leadInput.visa_credit_cc}</td>
                        <td>£ {leadInput.visa_credit_pc}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mastercard Credit</strong>
                        </td>
                        <td>{leadInput.mastercard_credit_cr}%</td>
                        <td>{leadInput.mastercard_credit_pr}%</td>

                        <td>£ {leadInput.mastercard_credit_ts}</td>
                        <td>£ {leadInput.mastercard_credit_cc}</td>
                        <td>£ {leadInput.mastercard_credit_pc}</td>
                      </tr>
                      {/* <!-- <tr>
                    <td><strong>Card Acceptance Fee</strong></td>
                    <td>0.25%</td>
                    <td>0.34%</td>
                    <td>£ 135,517.00</td>
                    <td>£ 338.79</td>
                    <td>£ 460.76</td>
                  </tr> --> */}
                      <tr>
                        <td>
                          <strong>Authorisation Fees</strong>
                        </td>
                        <td>{leadInput.authorization_fee_cr}%</td>
                        <td>{leadInput.authorization_fee_pr}%</td>

                        <td>£ {leadInput.authorization_fee_tr_no}</td>
                        <td>£ {leadInput.authorization_fee_cc}</td>
                        <td>£ {leadInput.authorization_fee_pc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-md-6">
                <CCard style={{ background: "#F2F2F7" }}>
                  <CCardBody>
                    {/* <CChartLineSimple border-color="success" labels="months" /> */}
                  </CCardBody>
                </CCard>
              </div>
              <div className="col-md-6">
                <table className="table border text-center">
                  <thead style={{ background: "#1E2553", color: "#fff" }}>
                    <tr>
                      <th>TOTAL</th>
                      <th>£{leadInput.totalCurrentCost}</th>
                      <th>£{leadInput.total_pc}</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan="3"
                        style={{
                          writingMode: "vertical-lr",
                          background: "#FF5722",
                          color: "#fff",
                          width: "30px",
                        }}
                      >
                        <strong>Saving</strong>
                      </td>
                      <td>0.45%</td>
                      <td>0.50%</td>
                    </tr>
                    <tr>
                      {/* <!-- <td>Master card debit / UK maestro</td> --> */}
                      <td>0.48%</td>
                      <td>0.55%</td>
                    </tr>
                    <tr>
                      {/* <!-- <td>Visa business debit / International masestro</td> --> */}
                      <td>1.00%</td>
                      <td>2.00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 " style={{ paddign: "0" }}>
                <div className="bg-info text-center">
                  <p style={{ margin: "0", padding: "26px 20px" }}>
                    <img src={group15} width="18px" alt="" /> Unit 7 Stanton
                    Gate, 49 Mawney Road, Romoford, RM7 7HL
                  </p>
                </div>
              </div>
              <div
                className="col-md-6"
                style={{ paddign: "0", fontSize: "15px" }}
              >
                <div style={{ background: "#1e2553" }} className="text-center">
                  <div className="row" style={{ padding: "8px" }}>
                    {/* <div className="col-md-4">
                      <a href="" className="nav-link text-white">
                        <img src={} width="18px" alt="" />
                        +44 7368 543 985
                      </a>
                    </div> */}
                    <div className="col-md-4">
                      <a href="/" className="nav-link text-white">
                        <img src={vector} width="18px" alt="" />
                        <p>+44 7368 543 985</p>
                      </a>
                    </div>

                    <div className="col-md-4">
                      <a href="" className="nav-link text-white">
                        <img src={group} width="18px" alt="" />
                        www.paymentsave.co.uk
                      </a>
                    </div>
                    <div className="col-md-4">
                      <a href="" className="nav-link text-white">
                        <img src={webmail} width="18px" alt="" />
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
      <div className="my-3 d-flex justify-content-end me-4">
        
      </div>
    </div>
  );
}
