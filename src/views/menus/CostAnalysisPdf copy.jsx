import React from "react";
import { CCard, CCardBody } from "@coreui/react";
import logo from "../../assets/img/logo.png";

import group from "../../assets/img/Group.svg";


import "./Menu.css";

export default function CostAnalysisPdf() {
  return (
    <div>
      <div className="container">
        <div className="row my-4">
          <div className="col-md-4 pt-4">
            <img src={logo} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <section>
        <div className="container">
          <div className="row my-4">
            <div className="col-md-6">
              <form>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <form>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>

                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>

                <div className="row my-4">
                  <div className="col-md-4"></div>
                  <div className="col-md-8">
                    <div className="text-center">
                      <h4>Contact To</h4>
                    </div>
                  </div>
                </div>

                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  ></label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                    />
                  </div>
                </div>
                <div className="form-group row my-4">
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
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <br />
          <div className="row my-4">
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
                        <strong>VISA Debit (Personal)</strong>
                      </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mastercard Debit</strong>
                      </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>VISA Credit (Personal)</strong>
                      </td>
                      <td>£ </td>
                      <td>£</td>
                      <td>£ </td>
                      <td>£</td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mastercard Credit</strong>
                      </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Visa Business Debit</strong>
                      </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mastercard Business</strong>
                      </td>
                      <td>£</td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Visa Business Credit</strong>
                      </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mastercard Corporate</strong>
                      </td>
                      <td>£</td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Authorisation Fees</strong>
                      </td>
                      <td></td>
                      <td> </td>
                      <td> </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Per Transactional Charge</strong>
                      </td>
                      <td> </td>
                      <td> </td>
                      <td></td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Portal Reporting</strong>
                      </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PCI DSS Fees</strong>
                      </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td>£ </td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Terminal Rental</strong>
                      </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td>£</td>
                      <td>£ </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style={{ background: "#1E2553", color: "#fff" }}>
                        {" "}
                        £{" "}
                      </td>
                      <td style={{ background: "#e55353", color: "#fff" }}>
                        £{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div className="row my-4">
            <div className="col-md-6">
              <CCard style={{ background: "#F2F2F7" }}>
                <CCardBody>
                  {/* <GChart type="AreaChart" :data="chartData" :options="chartOptions" /> */}
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
                    <td style={{ fontWeight: "600" }}>Monthly Saving</td>
                    <td>
                      <strong>£</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>% of Saving</td>
                    <td>
                      <strong></strong>%
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>Annual Saving</td>
                    <td>
                      <strong>£ </strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>4 Years Saving</td>
                    <td>
                      <strong>£ </strong>
                    </td>
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
            <div className="col-md-6" style={{ padding: "0" }}>
              <div className="bg-info text-center">
                <p style={{ margin: "0", padding: "12px 20px" }}>
                  <img src={group} width="18px" alt="" /> Unit 7 Stanton Gate,
                  49 Mawney Road, Romoford, RM7 7HL
                </p>
              </div>
            </div>
            <div className="col-md-6" style={{ padding: " 0" }}>
              <div style={{ background: "#1e2553" }} className="text-center">
                <div className="row" style={{ padding: "12px" }}>
                  <div className="col-md-4">
              
                    <a href="" className="nav-link text-white">
                      <img
                        src="../../assets/img/Vector.svg"
                        width="18px"
                        alt=""
                      />
                      +44 7368 543 985
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="" className="nav-link text-white">
                      <img
                        src="../../assets/img/Group.svg"
                        width="18px"
                        alt=""
                      />
                      www.paymentsave.co.uk
                    </a>
                  </div>
                  <div className="col-md-4">
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
  );
}

