import React from "react";
import dashboardApplicationImg from "../../assets/img/dashbaord_application_icon.svg";
import priceQuoteImg from "../../assets/img/price_qoute_chart.svg";
import blubImg from "../../assets/img/blub.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import {  CCol,  CRow, } from "@coreui/react";


import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardTop({ allChart }) {
  DashboardTop.propTypes = {
    allChart: PropTypes.object.isRequired,
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    width: 300,
    height: 300,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
    },
  };
  const commission = [
    allChart?.upfront > 0 ? allChart?.upfront : 1,
    allChart?.residual > 0 ? allChart?.residual : 1,
  ];
  const data = {
    labels: ["Upfront Comission(Weekly)", "Residual (Monthly)"],
    datasets: [
      {
        label: "# of Votes",
        data: commission,
        backgroundColor: ["#2E4284", "#425EBD", "#8E9ED7"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="today_detail_card p-4" style={{height:"auto"}}>
            <h2 className="mb-4">Today Details</h2>
            <CRow>
              <CCol sm={12} md={4}>
                <div className="total_leads">
                  <div className="row align-items-baseline p-4">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div>
                        <div
                          className="details_icon"
                          style={{ background: "#ff747c" }}
                        >
                          <img
                            src={blubImg}
                            alt=""
                            className="img-fluid"
                            style={{ width: "21px" }}
                          />
                        </div>
                        <div className="details_content pt-4">
                          <p>Total</p>
                        </div>
                      </div>
                      <div>
                        <h1>{allChart?.total_new_leads}</h1>
                      </div>
                    </div>
                    <div className="col-12 details_content pt-4">
                      <h6>New Leads</h6>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol sm={12} md={4}>
                <div className="mb-3">
                  <div className="total_price">
                    <div className="row p-4">
                      <div className="d-flex justify-content-between align-items-baseline">
                        <div>
                          <div
                            className="details_icon"
                            style={{ background: "#00bcd4" }}
                          >
                            <img src={priceQuoteImg} alt="" />
                          </div>
                          <div className="details_content pt-4">
                            <p>Total</p>
                          </div>
                        </div>
                        <div>
                          <h1>{allChart?.total_quotes}</h1>
                        </div>
                      </div>
                      <div className="col-12 details_content pt-4">
                        <h6>New Opportunities</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol sm={12} md={4}>
                <div className="mb-3">
                  <div className="total_application">
                    <div className="row p-4">
                      <div className="d-flex justify-content-between align-items-baseline">
                        <div>
                          <div
                            className="details_icon"
                            style={{ background: "#ffbe5b" }}
                          >
                            <img src={dashboardApplicationImg} alt="" />
                          </div>
                          <div className="details_content pt-4">
                            <p>Total</p>
                          </div>
                        </div>
                        <div>
                          <h1>{allChart?.total_new_applications}</h1>
                        </div>
                      </div>
                      <div className="col-12 details_content pt-4">
                        <h6>New Applications</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol sm={12} md={12}>
                <div className="transaction_card p-4 mb-3">
                  <h2>Earning Details</h2>
                  <div className="transaction_chart mt-n3">
                    <Doughnut options={chartOptions} data={data} />
                  </div>

                  <div className="row row-cols-3 mt-4">
                    <div className="col-lg-6 col-sm-6">
                      <div className="chart-amount">
                        <p>Upfront</p>
                        <h6>£{allChart?.upfront}</h6>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="chart-amount">
                        <p>Residual</p>
                        <h6>£{allChart?.residual}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </CCol>
            </CRow>
          </div>
        </div>
        {/* <div className="col-lg-4 mb-4">
          <div className="transaction_card p-4">
            <h2>Earning Details</h2>
            <div className="transaction_chart mt-n3">
              <Doughnut options={chartOptions} data={data} />
            </div>

            <div className="row row-cols-3 mt-4">
              <div className="col-lg-6 col-sm-6">
                <div className="chart-amount">
                  <p>Upfront</p>
                  <h6>£{allChart?.upfront}</h6>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="chart-amount">
                  <p>Residual</p>
                  <h6>£{allChart?.residual}</h6>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
