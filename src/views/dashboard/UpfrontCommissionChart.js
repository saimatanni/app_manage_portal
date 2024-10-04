import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { CButton, CButtonGroup, CFormSelect } from "@coreui/react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: "top",
    //   // position: 'top' as const,
    // },
    datalabels: {
      display: true,
      color: "white",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // To hide the x-axis gridlines
      },
    },
    y: {
      grid: {
        display: false, // To hide the y-axis gridlines
      },
    },
  },
};

export default function UpfrontCommissionChart({ allChart }) {
  UpfrontCommissionChart.propTypes = {
    allChart: PropTypes.object.isRequired,
  };
  const [type, setType] = useState("Week");
  const sortedData2 = allChart?.upfront_chart_data.sort((a, b) => {
    const dateA = new Date(
      a["createdon@OData.Community.Display.V1.FormattedValue"]
        ?.split(" ")[0]
        .split("/")
        .reverse()
        .join("/")
    );
    const dateB = new Date(
      b["createdon@OData.Community.Display.V1.FormattedValue"]
        ?.split(" ")[0]
        .split("/")
        .reverse()
        .join("/")
    );
    return dateA - dateB;
  });

  const getDates = (array) => {
    const datesArray = sortedData2.map(
      (obj) =>
        obj["createdon@OData.Community.Display.V1.FormattedValue"]?.split(
          " "
        )[0]
    );
    console.log(sortedData2, "datesArray");
    return datesArray.slice(-7);
  };

  const getValue = (array) => {
    const datesArray = sortedData2.map((obj) => obj.ptsave_totalcommission);
    return datesArray.slice(-7);
  };

  const apexCommission = {
    options: {
      colors: ["rgba(0, 143, 251, 0.85)"],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getDates(allChart?.upfront_chart_data),
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            orientation: "vertical",
            position: "center", // bottom/center/top
            style: {
              fontSize: ["12px"],
            },
          },
        },
      },
      dataLabels: {
        orientation: "vertical",
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : val;
        },
      },
    },
    series: [
      {
        name: "Total Commission",
        data: getValue(allChart?.upfront_chart_data),
      },
    ],
  };
  const optionsTest = {
    plugins: {
      datalabels: {
        display: true,
        color: "#00BCD4",
        align: "end",
        anchor: "end",
        font: { size: "12", weight: "bold" },
      },
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        // ticks: {
        //   callback: function (value) {
        //     return `£${value}`;
        //   },
        // },
      },
    },
  };
  const finalValue = getValue(allChart?.upfront_chart_data)
  const removZero = finalValue?.map((value) =>
  value === 0 ? "" : value
);
  const dataBar = {
    labels: getDates(allChart?.upfront_chart_data),
    datasets: [
      {
        label: `Upfront Commission`,
        backgroundColor: "#00BCD4",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: removZero,
      },
    ],
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
                    <h2>Upfront Commission</h2>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="float-end">
                    
                    <CButtonGroup size="sm" className="float-end me-3">
                      {["Week"].map((value) => (
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
                  <div className="chart my-4">
                    <Chart
                      options={apexCommission?.options}
                      series={apexCommission?.series}
                      type="bar"
                      // width="450"
                      
                    />
                    {/* <Bar
                      data={dataBar}
                      options={optionsTest}
                      width={100}
                      height={395}
                      plugins={[ChartDataLabels]}
                    /> */}
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
