import React, { useState } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { CButton, CButtonGroup,  } from "@coreui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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

const AllApplicationChirt = ({ allChart }) => {
  AllApplicationChirt.propTypes = {
    allChart: PropTypes.object.isRequired,
  };

  const [type, setType] = useState("Month");
  const week_applications_label = allChart
    ? Object?.keys(allChart?.weekly_applications)
    : [];
  const week_applications_value = allChart
    ? // ? Object?.values(allChart?.weekly_applications)
      [
        allChart?.weekly_applications.sent_to_bank,
        allChart?.weekly_applications.approved,
        allChart?.weekly_applications.declined,
        allChart?.weekly_applications.live,
        allChart?.weekly_applications.transacting,
        allChart?.weekly_applications.not_transacting,

        // Exclude "application_received", "ps_query", "sent_for_esign", "signed_back",
      ]
    : [];
  const month_applications_label = allChart
    ? Object?.keys(allChart?.monthly_applications)
    : [];

  const month_applications_value = allChart
    ? // ? Object?.values(allChart?.monthly_applications)
      [
        allChart?.monthly_applications.sent_to_bank,
        allChart?.monthly_applications.approved,
        allChart?.monthly_applications.declined,
        allChart?.monthly_applications.live,
        allChart?.monthly_applications.transacting,
        allChart?.monthly_applications.not_transacting,

        // Exclude "application_received", "ps_query", "sent_for_esign", "signed_back",
      ]
    : [];
  const year_applications_label = allChart
    ? Object?.keys(allChart?.yearly_applications)
    : [];
  const year_applications_value = allChart
    ? [
        allChart?.yearly_applications.sent_to_bank,
        allChart?.yearly_applications.approved,
        allChart?.yearly_applications.declined,
        allChart?.yearly_applications.live,
        allChart?.yearly_applications.transacting,
        allChart?.yearly_applications.not_transacting,

        // Exclude "application_received", "ps_query", "sent_for_esign", "signed_back",
      ]
    : [];

  const getName = (array) => {
    const mappedArray = array.map((element) => {
      if (element.includes("_")) {
        const splitArray = element.split("_");
        return splitArray.map((word) => word.toUpperCase()).join(" ");
      }
      return element.toUpperCase();
    });
    // Filter out specific values
    const filteredArray = mappedArray.filter((element) => {
      return ![
        "NEW APPLICATION",
        "APPLICATION RECEIVED",
        "PS QUERY",
        "SIGNED BACK",
        "SENT FOR ESIGN",
      ].includes(element);
    });

    return filteredArray;
    // return mappedArray;
  };

  const apexWeek = {
    options: {
      colors: [
        "#2EB85C",
        "#17479D",
        "#D32F2F",
        "#28a745",
        "#38B6FF",
        "#D32F2F",
        "#dc3545",
        "#28a745",
        "#38b6ff",
        "#EF5350",
      ],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(week_applications_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "end",
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
        name: "Weekly Applications",
        data: week_applications_value,
      },
    ],
  };
  const apexMonth = {
    options: {
      colors: [
        "#2EB85C",
        "#17479D",
        "#D32F2F",
        "#28a745",
        "#38B6FF",
        "#D32F2F",
        "#dc3545",
        "#28a745",
        "#38b6ff",
        "#EF5350",
      ],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(month_applications_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "end",
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
        name: "Monthly Applications",
        data: month_applications_value,
      },
    ],
  };
  const apexYear = {
    options: {
      colors: [
        "#2EB85C",
        "#17479D",
        "#D32F2F",
        "#28a745",
        "#38B6FF",
        "#D32F2F",
        "#dc3545",
        "#28a745",
        "#38b6ff",
        "#EF5350",
      ],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(year_applications_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "end",
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
        name: "Yearly Applications",
        data: year_applications_value,
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
                    <h2>All Application</h2>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="float-end">
                    {/* <CFormSelect
                    style={{ width: "auto",  }}
                    aria-label="Default select example "
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="form-control"
                      name=""
                      id=""
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
                <div className="chart my-4">
                  {/* <Bar
                      options={options}
                      data={
                        type === "Month" ? month : type === "Week" ? week : year
                      }
                      // data={year}
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
};

export default AllApplicationChirt;
