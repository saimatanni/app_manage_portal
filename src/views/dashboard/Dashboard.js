import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
import DashboardTop from "./DashboardTop";

import UpfrontCommissionChart from "./UpfrontCommissionChart";
import PriceQuoteChart from "./PriceQuoteChart";
import ResidualChart from "./ResidualChart";
import NewApplicationChart from "./NewApplicationChart";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";


import Loader from "src/utils/Loader";

import AllApplicationChirt from "./AllApplicationChirt";
import DashboardNotification from "./DashboardNotification";
import ApexChart from "./ApexChart";

import { CCol, CRow } from "@coreui/react";


const Dashboard = () => {
  let navigate = useNavigate();
  const [allChart, setAllChart] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  // commission hub

  const getChartData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setAllChart(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
    

        // if (
        //   message === "Invalid token." ||
        //   JSON.parse(err.request.response).code === 401
        // ) {
        //   if (isLoading === true) {
        //     showToast("success", "Invalid Token");
        //   }
        //   navigate("/login");
        // }
      });
  };

  // calling
  useEffect(() => {
    getChartData(`${process.env.REACT_APP_BASE_URL}api/v1/auth/dashboard/`);
  }, []);

  useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    localStorage.removeItem("leadId");
    localStorage.removeItem("activeStep");
    localStorage.removeItem("quoteId");
    localStorage.removeItem("allAppId");
    localStorage.removeItem("cardTurnover");
    localStorage.removeItem("residualName");
    localStorage.removeItem("rentingFromElavon");
    localStorage.removeItem("quote_id");
    localStorage.removeItem("newAppId");
    localStorage.removeItem("residualId");
    localStorage.removeItem("application_id");
    localStorage.removeItem("priceQId");
    localStorage.removeItem("residualNameTrade");
    localStorage.removeItem("atv");
    localStorage.removeItem("appPd");
  }, []);
 
  if (isLoading || allChart === null || !allChart) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div
      // style={{ backgroundColor: "white" }}
      >
     

      
        <CRow>
          <CCol lg="8">
            <DashboardTop allChart={allChart} />
          </CCol>

          
          <CCol lg="4">
            <div className="">
              <DashboardNotification />
            </div>
          </CCol>
          {/* <CCol md='4'></CCol> */}
          <CCol lg="6">
            <div className="mb-4">
              <ApexChart allChart={allChart} />
            </div>
          </CCol>
          <CCol lg="6">
            {/* Price Quote Chart */}
            <div className="mb-4">
              <PriceQuoteChart allChart={allChart} />
            </div>
          </CCol>

          <CCol lg="6">
            {" "}
            <div className="mb-4">
              <NewApplicationChart allChart={allChart} />
            </div>
          </CCol>
          <CCol lg="6">
            {" "}
            <div className="mb-4">
              <AllApplicationChirt allChart={allChart} />
            </div>
          </CCol>

          <CCol lg="6">
            {/* Upfornt Commissin Chart */}
            <div className="mb-4">
              <UpfrontCommissionChart allChart={allChart} />
            </div>
          </CCol>
          <CCol lg="6">
            {/* Residual Chart */}
            <div className="mb-4">
              <ResidualChart allChart={allChart} />
            </div>
          </CCol>
        </CRow>

        {/* apex end */}

        {/* New Application Chart */}

        {/* Clawback Chart */}
      </div>
    </>
  );
};

export default Dashboard;
