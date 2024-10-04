import React, { useState } from "react";
import "chartjs-plugin-datalabels";
import Chart from "react-apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import PropTypes from "prop-types";
import { CButton, CButtonGroup, CFormSelect } from "@coreui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
      pointLabels: {
        display: true,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    datalabels: {
      display: true,
      color: "#d4526e",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // To hide the x-axis gridlines
      },
      ticks: {
        // padding: -32 ,
        fontSize: 12,
      },
    },
    y: {
      grid: {
        display: false, // To hide the y-axis gridlines
      },
      ticks: {
        position: "inside", // Place Y-axis labels inside the graph
      },
    },
  },
};

export default function ApexChart({ allChart }) {
  ApexChart.propTypes = {
    allChart: PropTypes.object.isRequired,
  };

  const [type, setType] = useState("Month");
  const week_lead_label = allChart ? Object?.keys(allChart?.weekly_leads) : [];
  const week_lead_value = allChart
    ? Object?.values(allChart?.weekly_leads)
    : [];
  const month_lead_label = allChart
    ? Object?.keys(allChart?.monthly_leads)
    : [];
  const month_lead_value = allChart
    ? Object?.values(allChart?.monthly_leads)
    : [];
  const year_lead_label = allChart ? Object?.keys(allChart?.yearly_leads) : [];
  const year_lead_value = allChart
    ? Object?.values(allChart?.yearly_leads)
    : [];

  const getName = (array) => {
    const mappedArray = array.map((element) => {
      if (element.includes("_")) {
        const splitArray = element.split("_");
        return splitArray.map((word) => word.toUpperCase()).join(" ");
      }
      return element.toUpperCase();
    });
    return mappedArray;
  };

  const apexWeek = {
    options: {
      colors: [
        "#2eb85c",
        "#17479d",
        "#0cbadd",
        "#61AFFF",
        "#F9B115",
        "#e5616e",
        "#1B998B",
        "#2E294E",
      ], // Add more colors as needed
      // colors: ["rgba(53, 162, 235, 0.5)"],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(week_lead_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
          // colors: ["#2E4284"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Weekly Lead",
        data: week_lead_value,
      },
    ],
  };

  const apexMonth = {
    options: {
      colors: [
        "#2eb85c",
        "#17479d",
        "#0cbadd",
        "#61AFFF",
        "#F9B115",
        "#e5616e",
        "#1B998B",
        "#2E294E",
      ], // Add more colors as needed
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(month_lead_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Monthly Lead",
        data: month_lead_value,
      },
    ],
  };

  const apexYear = {
    options: {
      colors: [
        "#2eb85c",
        "#17479d",
        "#0cbadd",
        "#61AFFF",
        "#F9B115",
        "#e5616e",
        "#1B998B",
        "#2E294E",
      ], // Add more colors as needed
      // colors: ["rgba(53, 162, 235, 0.5)"],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false, // Set this to false to hide the grid
      },

      xaxis: {
        categories: getName(year_lead_label) ? getName(year_lead_label) : [],
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        // textAnchor: "start",
        position: "top",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Yearly Lead",
        data: year_lead_value ? year_lead_value : [],
      },
    ],
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="new_leads_chart p-4">
            <div className="row">
              <div className="col-md-6">
                <div className="chart_title">
                  <h2>New Leads</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="float-end">
                  {/* <CFormSelect
                    style={{ width: "auto" }}
                    aria-label="Default select example "
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={"Month"}>Monthly</option>
                    <option value={"Week"}>Weekly</option>
                    <option value={"Year"}>Yearly</option>
                  </CFormSelect> */}
                  <CButtonGroup size="sm" className="float-end me-3">
                      {["Week", "Month", "Year"].map((value) => (
                        <CButton
                          color="outline-secondary"
                          key={value}
                          className="mx-0"
                          active={value === type}
                          onClick={() => setType(value)}
                        >
                          {value}
                        </CButton>
                      ))}
                    </CButtonGroup>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="chart my-4">
                <Chart
                  options={
                    type === "Month"
                      ? apexMonth.options
                      : type === "Week"
                      ? apexWeek?.options
                      : apexYear?.options
                  }
                  series={
                    type === "Month"
                      ? apexMonth.series
                      : type === "Week"
                      ? apexWeek?.series
                      : apexYear?.series
                  }
                  type="bar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
