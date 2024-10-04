import React, { useState } from "react";
import  "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import PropTypes from "prop-types";

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
      color: 'blue',
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

export default function NewLeadsChart({ allChart }) {
  NewLeadsChart.propTypes = {
    // leadsChart: PropTypes.string.isRequired,
    allChart: PropTypes.object.isRequired,
  };
  const [type, setType] = useState("Year");
  // added
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
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
  const week = {
    labels: getName(week_lead_label),

    datasets: [
      {
        label: "Weekly Lead",
        data: week_lead_value,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        // backgroundColor: '#58508d',
        datalabels: {
          color: 'black'
        },
      },
    ],
  };

  const month = {
    labels: getName(month_lead_label),
    datasets: [
      {
        label: "Monthly Lead",
        data: month_lead_value,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const year = {
    labels: getName(year_lead_label),
    datasets: [
      {
        label: "Yearly Lead",
        data: year_lead_value,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: [20, 20, 50, 30, 10, 25, 5],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
                  <h2>New Leads </h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="chart_select_button">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-control"
                    name=""
                    id=""
                  >
                    <option value={"Month"}>Monthly</option>
                    <option value={"Week"}>Weekly</option>
                    <option value={"Year"}>Yearly</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                <div className="chart my-4">
                  <Bar
                    options={options}
                    data={
                      type === "Month" ? month : type === "Week" ? week : year
                    }
                  />
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
