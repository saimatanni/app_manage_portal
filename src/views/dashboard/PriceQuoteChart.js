import React, { useState } from "react";
import Chart from "react-apexcharts";
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
import { CButton, CButtonGroup, CFormSelect } from "@coreui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
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

export default function PriceQuoteChart({ allChart }) {
  PriceQuoteChart.propTypes = {
    allChart: PropTypes.string.isRequired,
  };
  const [type, setType] = useState("Month");
  const week_quotes_label = allChart
    ? Object?.keys(allChart?.weekly_quotes)
    : [];
  const week_quotes_value = allChart
    ? Object?.values(allChart?.weekly_quotes)
    : [];
  const month_quotes_label = allChart
    ? Object?.keys(allChart?.monthly_quotes)
    : [];
  const month_quotes_value = allChart
    ? Object?.values(allChart?.monthly_quotes)
    : [];
  const year_quotes_label = allChart
    ? Object?.keys(allChart?.yearly_quotes)
    : [];
  const year_quotes_value = allChart
    ? Object?.values(allChart?.yearly_quotes)
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
      colors: ["#2eb85c", "#17479d", "#F9B115", "#61AFFF", "#2EB85C"], // Add more colors as needed
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(week_quotes_label),
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
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Weekly Quote",
        data: week_quotes_value,
      },
    ],
  };
  const apexMonth = {
    options: {
      colors: ["#2eb85c", "#17479d", "#F9B115", "#61AFFF", "#2EB85C"], // Add more colors as needed
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(month_quotes_label),
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
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Monthly Quote",
        data: month_quotes_value,
      },
    ],
  };
  const apexYear = {
    options: {
      colors: ["#2eb85c", "#17479d", "#F9B115", "#61AFFF", "#2EB85C"], // Add more colors as needed
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(year_quotes_label),
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
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Yearly Quote",
        data: year_quotes_value,
      },
    ],
  };
  const displayLabels = {
    Week: 'Weekly',
    Month: 'Monthly',
    Year: 'Yearly',
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
                    <h2>Opportunities</h2>
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
                         {/* {displayLabels[value]} */}
                         {value}
                        </CButton>
                      ))}
                    </CButtonGroup>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="chart  my-4">
                  {/* <Bar
                      options={options}
                      data={
                        type === "Month" ? month : type === "Week" ? week : year
                      }
                    /> */}
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
                    // width="450"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
