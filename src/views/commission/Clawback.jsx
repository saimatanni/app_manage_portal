import React, { useEffect, useState } from "react";
import printer from "../../assets/img/printer.svg";

import arrow from "../../EboardComponents/Custom/Arrow.svg";
import "../accounts/Leads/Leads.css";

import Chart from "react-apexcharts";
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


import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "src/utils/ToastHelper";
import Loader from "src/utils/Loader";
import ReactPaginate from "react-paginate";
import ClawbackThead from "./Clawback/ClawbackThead";

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
    
  },animation: {
    duration: 200, // Set the animation duration in milliseconds
  }, scales: {
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


export default function Clawback() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [upfronts, setUpfronts] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  // paggination
  const [pageCount, SetPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const keys = ["mid", "trading_name", "legal_name", "created_at"];
  const [search, setSearch] = useState({
    mid: "",
    legal_name: "",
    trading_name: "",
    mid_status: "",
    leasing_status: "",
    clawback_amount: "",
    clawbak_status: "",
    total_commission: "",
    commission_status: "",
    lease_number: "",
    clawback_date: "",
  });
  // sorting San
  const [sort, setSort] = useState("ASC");
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [midStatusSpan, setMidStatusSpan] = useState(true);
  const [midSpan, setMidSpan] = useState(true);
  const [clawbackAmountSpan, setClawbackAmountSpan] = useState(true);
  const [leasingStatusSpan, setLeasingStatusSpan] = useState(true);
  const [clawbakStatusSpan, setClawbakStatusSpan] = useState(true);
  const [totalCommissionSpan, setTotalCommissionSpan] = useState(true);
  const [commissionStatusSpan, setCommissionStatusSpan] = useState(true);
  const [leaseNumberSpan, setLeaseNumberSpan] = useState(true);
  const [clawbackDateSpan, setClawbackDateSpan] = useState(true);

  const getUpfrontList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setUpfronts([]);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          mid: !curr?.ptsave_mid ? "" : curr?.ptsave_mid,
          legal_name: curr?.name,
          trading_name: curr?.TradingName,
          mid_status: curr[
            "ptsave_status@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr["ptsave_status@OData.Community.Display.V1.FormattedValue"]
            : "",
          leasing_status: curr[
            "ptsave_leasestatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_leasestatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          clawback_amount: curr[
            "ptsave_clawbackamount@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_clawbackamount@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          clawbak_status: curr[
            "ptsave_clawbackstatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_clawbackstatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          total_commission: curr[
            "ptsave_totalcomissioncalculated_base@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_totalcomissioncalculated_base@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          commission_status: curr[
            "ptsave_commissionstatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_commissionstatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          lease_number: curr["ptsave_leaseno"] ? curr["ptsave_leaseno"] : "",
          // clawback_date: curr['clawback_date'],
          clawback_date: curr["ptsave_clawbackdate1"]
            ? curr[
                "ptsave_clawbackdate1@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
        }));
        setUpfronts(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if(err.response === undefined){
          showToast("error", "Server error");
        }else{
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
    setIsLoading(true);
    getUpfrontList(`${process.env.REACT_APP_BASE_URL}api/v1/commission/clawback/`);
  }, [itemPerPage]);

  

  const displayData2 = upfronts
    ?.filter((item) =>
      keys.some((key) => {
        const value = item[key]?.toLowerCase();
        const queryLower = query.toLowerCase();
        return value?.includes(queryLower);
      })
    )
    .filter((fill) => {
      if (
        fill.legal_name?.toLowerCase().includes(search.legal_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (fill.mid?.toLowerCase().includes(search.mid.toLowerCase())) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.mid_status?.toLowerCase().includes(search.mid_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.leasing_status
          ?.toLowerCase()
          .includes(search.leasing_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.total_commission
          ?.toLowerCase()
          .includes(search.total_commission.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.lease_number
          ?.toLowerCase()
          .includes(search.lease_number.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.commission_status
          ?.toLowerCase()
          .includes(search.commission_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.clawbak_status
          ?.toLowerCase()
          .includes(search.clawbak_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.clawback_date
          ?.toLowerCase()
          .includes(search.clawback_date.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.clawback_amount
          ?.toLowerCase()
          .includes(search.clawback_amount.toLowerCase())
      ) {
        return fill;
      }
    });
  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);
  // paggination
  useEffect(() => {
    // const endOffset = itemOffset + itemPerPage;
    setCurrentItems(upfronts?.slice(itemOffset, endOffset));
    SetPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage,displayData2?.length]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % upfronts?.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    const delaySetItemOffset = () => {
      setTimeout(() => {
        setItemOffset(0);
      }, 0);
    };

    delaySetItemOffset();
    return () => {
      clearTimeout(delaySetItemOffset);
    };
  }, [query, search]);
  useEffect(() => {
    handlePageClick({ selected: 0 });
  }, [search, query]);

  // sorting
  const sortingData = (sortBy, stateSpan) => {
    if (sortBy === "clawback_date") {
      if (sort === "ASC") {
        

        const sorted = [...copiedAarray].sort((a, b) => {
          const datePartsA = a[sortBy].split(/[-,:\s]/);
          const datePartsB = b[sortBy].split(/[-,:\s]/);

          // Extract year, month, and day from the date strings
          const yearA = parseInt(datePartsA[2]);
          const yearB = parseInt(datePartsB[2]);
          const monthA = parseInt(datePartsA[1]) - 1; // Month is zero-indexed
          const monthB = parseInt(datePartsB[1]) - 1;
          const dayA = parseInt(datePartsA[0]);
          const dayB = parseInt(datePartsB[0]);

          // Compare year, month, and day
          if (yearA !== yearB) {
            return yearA - yearB;
          }
          if (monthA !== monthB) {
            return monthA - monthB;
          }
          return dayA - dayB;
        });

        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        
        const sorted = [...copiedAarray].sort((a, b) => {
          const dateA = new Date(a[sortBy]);
          const dateB = new Date(b[sortBy]);
          return dateB - dateA;
        });
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "clawback_amount") {
      if (sort === "ASC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_clawbackamount"] > b["ptsave_clawbackamount"] ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_clawbackamount"] < b["ptsave_clawbackamount"] ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "total_commission") {
      if (sort === "ASC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_totalcomissioncalculated_base"] >
          b["ptsave_totalcomissioncalculated_base"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...upfronts].sort((a, b) =>
          a["ptsave_totalcomissioncalculated_base"] <
          b["ptsave_totalcomissioncalculated_base"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else {
      if (sort === "ASC") {
        const sorted = [...upfronts].sort((a, b) =>
          a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...upfronts].sort((a, b) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const getChartData = () => {
    const currentYear = new Date().getUTCFullYear();
    const filteredArray = upfronts?.filter((obj) => {
      const createdAtYear = new Date(obj?.clawback_date).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    const commissionSumArray = Array(12).fill(0);

    filteredArray.forEach((obj) => {
      const createdAt = new Date(obj?.clawback_date);
      const monthIndex = createdAt.getUTCMonth();
      const commission = Number(obj?.total_commission?.split("£")[1]) || 0;
      commissionSumArray[monthIndex] += commission;
    });

    console.log(filteredArray, "clawback");

    return commissionSumArray;
  };

  
  const apexClawback = {
    options: {
      colors: ["rgba(53, 162, 235, 0.5)"],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false, 
      },
      xaxis: {
        categories: labels,
      },
      
      plotOptions: {
        bar: {
          dataLabels: {
            orientation: 'vertical',
            position: 'center' // bottom/center/top
          }
        }
      },
      dataLabels: {
        style: {
          colors: ['#2E4284']
        },
        offsetY: 15, // play with this value
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Total Commission",
        data: getChartData(),
      },
    ],
  };

  const btnBg = (data) => {
    if (data === "Reserve") return "#FFC107";
    if (data === "Fraud Closed") return "#dc3545";
    if (data === "Closed") return "#dc3545";
    if (data === "Deactivated") return "#EF5350";
    if (data === "Re-opened") return "#66BB6A";
    if (data === "Hold") return "#FFC107";
    if (data === "Open") return "#28a745";
    if (data === "Yes") return "#28a745";
    if (data === "No") return "#dc3545";
    if (data === "Not Applicable") return "#ffc107";
    if (data === "Paid") return "#28a745";
    if (data === "Not Paid") return "#dc3545";
    if (data === "In Arrears") {
      return "#EE8EC1";
    }
    if (data === "Default") {
      return "#33B5FF";
    }
    if (data === "Transferred") {
      return "#3D33FF";
    } else return "#28a745";
  };
  return (
    <>
      {/* Clawback Chart */}
      <div>
        <div className="row mb-3">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            {/* <Bar options={options} data={chartData} /> */}
            <Chart
              options={apexClawback?.options}
              series={apexClawback?.series}
              type="bar"
              
              // width="450"
            />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      {/* UpfrontCommission Table */}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>Clawback List</h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          {/* <button  className="btn btn-info btn-lg me-3 text-white">Add New Leads</button>{' '} */}
          <img style={{ cursor: "pointer" }} src={printer} width="32" alt="" />
        </div>
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-6 d-flex align-items-center ">
          <span style={{ color: "#212121", fontSize: "14px" }} className="me-2">
            Filter :
          </span>{" "}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="top-input"
            type="text"
            placeholder="Type here..."
          />
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <div className="d-flex align-items-center">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Item Per Page :
            </span>{" "}
            <select
              value={itemPerPage}
              onChange={(e) => setItemPerPage(Number(e.target.value))}
              className="top-input"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
      </div>
      {/* ---------search and item per page end--------- */}
      {/* ------All Application table------- */}
      <div className="table-container mt-2">
        <table className="table table-striped table-hover table-bordered">
          <thead style={{ color: "black" }}>
            <tr className="height">
              <th style={{ minWidth: "140px" }}>
                <div
                  onClick={() => {
                    sortingData("mid", setMidSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                >
                  <p style={{ textAlign: "end" }}>MID</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      midSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* app type className="" */}
              <th>
                <div
                  onClick={() => {
                    sortingData("legal_name", SetLegalNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Legal Name</p>
                  <img
                    className={`${
                      legalNameSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* legal name */}
              <th>
                <div
                  onClick={() => {
                    sortingData("mid_status", setMidStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>MID Status</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      midStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* trading name */}
              <th>
                <div
                  onClick={() => {
                    sortingData("leasing_status", setLeasingStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p className="ms-4">Leasing Status</p>

                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      leasingStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* mMID status */}
              <th>
                <div
                  onClick={() => {
                    sortingData("clawback_amount", setClawbackAmountSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Clawback Amount</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      clawbackAmountSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* account status */}
              <th>
                <div
                  onClick={() => {
                    sortingData("clawbak_status", setClawbakStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Clawback Status</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      clawbakStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div
                  onClick={() => {
                    sortingData("total_commission", setTotalCommissionSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Total Commission</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      totalCommissionSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS Compliance */}
              <th>
                <div
                  onClick={() => {
                    sortingData("commission_status", setCommissionStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Commission Status</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      commissionStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS due Date */}
              <th>
                <div
                  onClick={() => {
                    sortingData("lease_number", setLeaseNumberSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Lease Number</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      leaseNumberSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS Renewal Date */}
              <th>
                <div
                  onClick={() => {
                    sortingData("clawback_date", setClawbackDateSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Clawback Date</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      clawbackDateSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <ClawbackThead search={search} handleFilterInput={handleFilterInput} />
          <tbody>
            {displayData?.length === 0 ? (
              <>
                <tr>
                  <td colSpan="10">
                    <div className="not_found">
                      <h4 className="my-4">No Data Found</h4>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {displayData?.map((data) => (
              
                    <tr key={data?.id}>
                      <td>{data?.mid}</td>
                      <td>{data?.legal_name}</td>
                      <td>
                        {data?.mid_status?.length > 0 ? (
                          <button
                            className="btn  text-white"
                            style={{
                              backgroundColor: `${btnBg(data?.mid_status)}`,
                            }}
                          >
                            {data?.mid_status}
                          </button>
                        ) : (
                          data?.mid_status
                        )}
                      </td>
                      <td>
                        {data?.leasing_status === "N/A" ||
                        data?.leasing_status?.length < 1 ? (
                          data?.leasing_status
                        ) : (
                          <button
                            style={{
                              backgroundColor: `${btnBg(data?.leasing_status)}`,
                            }}
                            className="btn text-white "
                          >
                            {" "}
                            {data?.leasing_status}
                          </button>
                        )}
                      </td>

                      <td>{data?.clawback_amount}</td>
                      <td>
                        {" "}
                        {data?.clawbak_status !== "" && (
                          <button
                            className="btn text-white"
                            style={{
                              backgroundColor: `${btnBg(data?.clawbak_status)}`,
                            }}
                          >
                            {data?.clawbak_status}
                          </button>
                        )}{" "}
                      </td>
                      <td>{data?.total_commission}</td>
                      <td>
                        {" "}
                        {data?.commission_status ? (
                          <button
                            className="btn text-white"
                            style={{
                              backgroundColor: `${btnBg(
                                data?.commission_status
                              )}`,
                            }}
                          >
                            {data?.commission_status}
                          </button>
                        ) : (
                          <></>
                        )}{" "}
                      </td>
                      <td>{data?.lease_number}</td>
                      <td>{data?.clawback_date}</td>
                    </tr>
               
                ))}
              </>
            )}

           
          </tbody>
        </table>
      </div>
      {/* --------paggination------- */}
      <div className="d-flex justify-content-start">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          containerClassName="pagination-container"
          activeClassName="active"
          disabledClassName="disable"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
}
