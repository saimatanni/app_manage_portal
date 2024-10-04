import React, { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import { format } from "date-fns-tz";
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
import axios from "axios";
import { showToast } from "src/utils/ToastHelper";

import "./Partner.css";
// import { dateTimeZone2 } from "../accounts/NewApplication/_redux/action/ApplicationAction";
import { CButton, CButtonGroup, CFormSelect } from "@coreui/react";
import DateTimePicker from "react-datetime-picker";
import CircularProgress from "@mui/material/CircularProgress";
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

const PartnerListChart = () => {
  const [partnerChartList, setpartnerChartList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [queryFilter, setQueryFilter] = useState("monthly");
  const [startDate, setstartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getPartnerChartList = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setpartnerChartList(res?.data?.data);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response === undefined) {
          showToast("error", "Internal Server Error");
        }
      });
  };

  useEffect(() => {
    if (queryFilter) {
      getPartnerChartList(
        `${process.env.REACT_APP_BASE_URL}api/v1/application/partners/partner-application-charts/?query_filter=${queryFilter}`
      );
    }
  }, [queryFilter]);
  // Extract account names and counts from the data
  const data = partnerChartList;
  const chartData =
    data?.value?.map((entry) => ({
      x: entry?.account_name,
      y: entry?.Count,
    })) || [];
  // Sort the chartData array based on the count in descending order
  chartData?.sort((a, b) => b.y - a.y);
  const series = [
    {
      name: "Opportunity Count",
      data: chartData,
    },
  ];

  const options = {
    colors: [
      "#38B6FF",
      "#D32F2F",
      "#F9B115",
      "#66BB6A",
      "#775DD0",
      "#28a745",
      "#dc3545",
      "#28a745",
      "#28a745",
      "#EF5350",
    ],
    chart: {
      type: "bar",
      height: 450,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: chartData?.map((entry) => entry?.x),
      // title: {
      //   text: "Opportunity Count",
      // },
      labels: {
        style: {
          fontSize: "15px", // Adjust the font size as needed
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "15px", // Adjust the font size as needed
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        // distributed: true,
      },
    },
  };

  const dateTimeZone2 = (value) => {
    if (typeof value === "string") {
      return value;
    } else {
      const originalDateString = value; // Original date string in UTC

      const formattedConvertedTime = format(
        originalDateString,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
        // "yyyy-MM-dd'T'HH:mm:ssXXX"
      );

      const fomDate = formattedConvertedTime.split("+")[0] + ".000Z";
      // const fomDate = formattedConvertedTime.split("+")[0] + "+01:00";

      return fomDate;
    }
  };
  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const timezone = date.getTimezoneOffset() < 0 ? "+" : "-"; // Determine the timezone sign
      console.log("timezone", timezone);
      const timezoneHours = String(
        Math.floor(Math.abs(date.getTimezoneOffset()) / 60)
      ).padStart(2, "0");
      const timezoneMinutes = String(
        Math.abs(date.getTimezoneOffset()) % 60
      ).padStart(2, "0");
      const date_time = `${day} ${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}${timezoneHours}:${timezoneMinutes}`;
      console.log("date_time", date_time);
      // 2023-11-15T06:45:00.000Z
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
      // return `${day} ${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}${timezoneHours}:${timezoneMinutes}`;
    }
    return "";
  };

  return (
    <>
      <div className="d-md-flex justify-content-between align-items-end">
        {/* <CFormSelect
          style={{ width: "auto" }}
          aria-label="Default select example "
          value={queryFilter}
          onChange={(e) => {
            setQueryFilter(e.target.value);
            setEndDate(null);
            setstartDate(null);
          }}
        >
          <option>Select..</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </CFormSelect> */}
        <CButtonGroup size="sm" className="me-3">
          {["weekly", "monthly", "yearly"].map((value) => (
            <CButton
              color="outline-secondary"
              key={value}
              className="mx-0 text-capitalize"
              active={value === queryFilter}
              onClick={() => {
                setQueryFilter(value);
                setEndDate(null);
                setstartDate(null);
              }}
            >
              {/* {displayLabels[value]} */}
              {value}
            </CButton>
          ))}
        </CButtonGroup>
        <div className="d-flex align-items-end gap-2  justify-content-md-end">
          <div>
            <p className="my-1">Start date</p>
            <DateTimePicker
              format="dd/MM/yyyy"
              className="report_date_picker"
              locale="en-GB"
              name="start_date"
              value={startDate}
              formatDate={formatDate}
              onChange={(date) => {
                setstartDate(date);
              }}
            />
          </div>
          <div>
            <p className="my-1">End date</p>
            <DateTimePicker
              format="dd/MM/yyyy"
              className="report_date_picker"
              locale="en-GB"
              name="start_date"
              value={endDate}
              formatDate={formatDate}
              onChange={(date) => {
                setEndDate(date);
              }}
            />
          </div>
          <CButton
          size="sm"
            color="info"
            variant="outline"
            onClick={() => {
              if (startDate && endDate) {
                getPartnerChartList(
                  `${
                    process.env.REACT_APP_BASE_URL
                  }api/v1/application/partners/partner-application-charts/?date_from=${dateTimeZone2(
                    startDate
                  )}&date_to=${dateTimeZone2(endDate)}`
                );
                setQueryFilter("");
              } else {
                showToast("error", "Select date first !");
              }
            }}
          >
            Search
          </CButton>
          {/* <button
            className="btn btn-info text-white mx-2"
            style={{ height: "fitContent" }}
            onClick={() => {
              if (startDate && endDate) {
                getPartnerChartList(
                  `${
                    process.env.REACT_APP_BASE_URL
                  }api/v1/application/partners/partner-application-charts/?date_from=${dateTimeZone2(
                    startDate
                  )}&date_to=${dateTimeZone2(endDate)}`
                );
                setQueryFilter("");
              } else {
                showToast("error", "Select date first !");
              }
            }}
          >
            Search
          </button> */}
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 mt-4">
          <CircularProgress />
        </div>
      ) : (
        <Chart options={options} series={series} type="bar" height={450} />
      )}
    </>
  );
};

export default PartnerListChart;
