import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { CButton, CButtonGroup, CFormSelect } from "@coreui/react";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ResidualChart({ allChart }) {
  ResidualChart.propTypes = {
    allChart: PropTypes.object.isRequired,
  };
  const [type, setType] = useState('Month')
  const getChartData = () => {
    const currentYear = new Date().getUTCFullYear();
    const filteredArray = allChart?.residual_chart_data?.filter((obj) => {
      const createdAtYear = new Date(obj?.createdon).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    const commissionSumArray = Array(12).fill(0);
    filteredArray?.forEach((obj) => {
      const createdAt = new Date(obj?.createdon);
      const monthIndex = createdAt.getUTCMonth();
      const commission =
        Number(obj?.ptsave_partnermonthlyresidualamountrollup) || 0;
      commissionSumArray[monthIndex] += commission;
    });

    return commissionSumArray;
  };

  const apexResidual = {
    series: [
      {
        name: "Partner Monthly Residual",
        data: getChartData(),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "blue",
          // color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          // opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     opacityFrom: 0.6,
      //     opacityTo: 0.8,
      //   }},
      title: {
        text: "Partner Monthly Residual",
        align: "center",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: labels,
      },

      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="new_leads_chart p-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="chart_title">
                    <h2>Residual</h2>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="float-end">
                    {/* <CFormSelect
                      style={{ width: "auto", height: "auto" }}
                      aria-label="Default select example "
                    >
                      <option>Monthly</option>
                    </CFormSelect> */}
                    <CButtonGroup size="sm" className="float-end me-3">
                      {[ "Month"].map((value) => (
                      // {["Week", "Month", "Year"].map((value) => (
                        <CButton
                          color="outline-secondary"
                          key={value}
                          className="mx-0"
                          active={value === type}
                          onClick={() => setType(value)}
                        >
                         {/* {displayLabels[value]} */}
                         {value}
                        </CButton>
                      ))}
                    </CButtonGroup>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <div className="chart  my-4">
                    {/* <Line options={options} data={data} />
                     */}
                    <Chart
                      options={apexResidual?.options}
                      series={apexResidual?.series}
                      type="line"
                      // width="450"
                    />
                  </div>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
