import React from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
    // title: {
    //   display: true,
    //   text: "Chart.js Horizontal Bar Chart",
    // },
  },
};

const HorizontalChart = ({name,allChart}) => {
    HorizontalChart.propTypes = {
        name: PropTypes.string.isRequired,
        allChart: PropTypes.string.isRequired,
      };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
       
          {
            label: 'Dataset 2',
            data: [20,20,50,30,10,25,5],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
                    <h2>{name}</h2>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="chart_select_button">
                    <select
                      //   value={type}
                      //   onChange={(e) => setType(e.target.value)}
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
                    <Bar options={options} data={data} />
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
};

export default HorizontalChart;
