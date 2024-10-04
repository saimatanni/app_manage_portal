import React, { useEffect, useState } from "react";
import { CCol, CRow } from "@coreui/react";
// Chart js
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

import { useNavigate } from "react-router-dom";
import { showToast } from "src/utils/ToastHelper";
import axios from "axios";
import Loader from "src/utils/Loader";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"; // Import js-cookie
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
    legend: {
      position: "top",
    },
  },
  animation: {
    duration: 200, // Set the animation duration in milliseconds
  },
};

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

export default function ResidualDetails() {
  const id = localStorage.getItem("residualId");
  const legalName = localStorage.getItem("residualName");
  const tradingName = localStorage.getItem("residualNameTrade");
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const navigate = useNavigate();
  const [residual, setResidual] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const getMonthIndex = (monthAbbreviation) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.findIndex((month) => month === monthAbbreviation);
  };

  const dateFormat = (date) => {
    // const date = '202304 Apr'
    const month = getMonthIndex(date?.split(" ")[1]);
    const year = date?.slice(0, 4);
    const day = date?.slice(4, 6);
    const finalMonth = month + 1;
    return `${day}-${finalMonth}-${year}`;
  };

  const getUpfrontList = (url) => {
    axios
      .get(url)
      .then((res) => {
        // console.log()
        const newData = res?.data?.data?.value?.map((curr) => ({
          ...curr,
          date: curr?.ptsave_name,
          total_monthly_turnover: curr[
            "ptsave_actualmonthlytransactionsbyamountrollup@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_actualmonthlytransactionsbyamountrollup@OData.Community.Display.V1.FormattedValue"
              ]
            : "£0.00",
          status: curr["statuscode@OData.Community.Display.V1.FormattedValue"]
            ? curr["statuscode@OData.Community.Display.V1.FormattedValue"]
            : "",
          number_of_tr: curr["ptsave_actualmonthlytransactionsbynooftrrollup"]
            ? curr["ptsave_actualmonthlytransactionsbynooftrrollup"]
            : "",
          create_on: dateFormat(curr?.ptsave_name),
        }));
        setResidual(newData);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else {
          const message = JSON.parse(err.request.response).message;

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
            navigate("/login");
          }
        }
      });
  };
  // calling api
  useEffect(() => {
    getUpfrontList(
      `${process.env.REACT_APP_BASE_URL}api/v1/commission/residual/${id}`
    );
  }, []);
  console.log("resData :>> ", residual);
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me = Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

 

  const getChartData = () => {
    const currentYear = new Date().getUTCFullYear();
    const filteredArray = residual?.filter((obj) => {
      const createdAtYear = new Date(obj?.create_on).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    const commissionSumArray = Array(12).fill(0);

    filteredArray.forEach((obj) => {
      const createdAt = new Date(obj?.create_on);
      const monthIndex = createdAt.getUTCMonth();
      const commission =
        Number(obj?.ptsave_partnerresidualamountcalculated) || 0;
      commissionSumArray[monthIndex] += commission;
    });

    return commissionSumArray;
  };

  // Custom function to get the month index based on the month abbreviation

  console.log(getChartData(), "chart data");

  if (loading) {
    return <Loader />;
  }
  console.log(residual, "data");

  const data = {
    labels,
    datasets: [
      {
        label: "Patrner Residual Amount",
        data: getChartData(),
        backgroundColor: "rgb(56, 182, 255)",
      },
      
    ],
  };
  return (
    <>
      {/* Residual Chart */}
      <div>
        <div className="row mb-3">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Bar options={options} data={data} />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <br />
      <CRow>
        <CCol md="2"></CCol>
        <CCol md="8">
          <div className="text-center">
            <h3>{legalName ? legalName : "Zakaria Islam"}</h3>
            <h4>{tradingName ? tradingName : ""}</h4>
            <d-flex className="gap-3">
              <h6>Mid Number : {priceQuoteInput.mid_number}</h6>
              <h6>Mid Status : {priceQuoteInput.mid_status}</h6>
            </d-flex>
          </div>
        </CCol>
        <CCol md="2"></CCol>
      </CRow>
      <br />
      <CRow>
        <CCol md="1"></CCol>
        <CCol md="10" className="text-center">
          <div className="table-container mt-2">
            <table className="table table-striped table-hover table-bordered">
              <thead style={{ color: "black" }}>
                <tr className="height">
                  <th>
                    <div>
                      <p>Statement Month</p>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex justify-content-between align-content-center">
                      <p>Number Of Transactions</p>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex justify-content-between align-content-center">
                      <p>Total Monthly Turnover</p>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex justify-content-between align-content-center">
                      <p className="ms-4">Comission Status</p>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex justify-content-between align-content-center">
                      <p>Partner Residual</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {residual?.map((data) => (
                  <>
                    <tr key={data}>
                      <td>{data["ptsave_name"] ? data["ptsave_name"] : ""}</td>
                      <td>
                        {data["ptsave_actualmonthlytransactionsbynooftrrollup"]
                          ? data[
                              "ptsave_actualmonthlytransactionsbynooftrrollup"
                            ]
                          : ""}
                      </td>
                      <td>{data?.total_monthly_turnover}</td>
                      <td>
                        {data[
                          "statuscode@OData.Community.Display.V1.FormattedValue"
                        ]
                          ? data[
                              "statuscode@OData.Community.Display.V1.FormattedValue"
                            ]
                          : ""}
                      </td>
                      <td>
                        {
                          data[
                            "ptsave_partnerresidualamountcalculated@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CCol>
        <CCol md="1"></CCol>
      </CRow>
      <div className="row my-3">
        <div className="col-md-12 text-end">
          <button
            className="basic_btn"
            onClick={() => {
              navigate("/residual");
              
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
