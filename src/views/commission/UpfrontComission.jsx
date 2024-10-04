import React, { useEffect, useState } from "react";
import printer from "../../assets/img/printer.svg";
import arrow from "../../EboardComponents/Custom/Arrow.svg";
import "../accounts/Leads/Leads.css";


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


import axios from "axios";


import Loader from "src/utils/Loader";

import { getTimeFormat } from "src/utils/CommonFunction";
import ReactPaginate from "react-paginate";
import Chart from "react-apexcharts";
import { showToast } from "src/utils/ToastHelper";

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



export default function UpfrontComission() {

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(10);

  const [upfronts, setUpfronts] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  const [pageCount, SetPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
 
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const keys = [
    "mid",
    "trading_name",
    "legal_name",
    "created_at",
    "account_status",
    "leasing_status",
    "terminal_override_amount",
    "terminal_amount",
    "commission_status",
    "total_commission",
    "mid_opend",
  ];
  const [search, setSearch] = useState({
    trading_name: "",
    legal_name: "",
    created_at: "",
    mid: "",
    account_status: "",
    leasing_status: "",
    terminal_override_amount: "",
    terminal_amount: "",
    commission_status: "",
    total_commission: "",
    mid_opend: "",
  });

  // sorting San
  const [sort, setSort] = useState("ASC");
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, setTradingNameSpan] = useState(true);
  const [createdAtSpan, SetCreatedAtSpan] = useState(true);
  const [midOpenSpan, SetMidOpenSpan] = useState(true);
  const [midSpan, setMidSpan] = useState(true);
  const [terminalAmountSpan, setTerminalAmountSpan] = useState(true);
  const [commissionStatSpan, setCommitionStatSpan] = useState(true);
  const [totaoCommissionSpan, setTotalCommissionSpan] = useState(true);
  const [terminalOverideSpan, setTerminalOverideSpan] = useState(true);

  const getUpfrontList = (url) => {
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data);
        setCurrentItems([]);
        console.log("res.data.data", res.data.data);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          created_at: !curr["createdon"]
            ? ""
            : getTimeFormat(curr["createdon"]),
          mid: !curr?.ptsave_mid ? "" : curr?.ptsave_mid,
          legal_name: curr?.name ? curr?.name : "",
          trading_name: curr?.ptsave_trading_name
            ? curr?.ptsave_trading_name
            : "",
          account_status: curr[
            "ptsave_back_office_stage@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_back_office_stage@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          leasing_status: curr[
            "ptsave_leasestatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_leasestatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          terminal_override_amount: curr[
            "ptsave_terminalcommissionrollup@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_terminalcommissionrollup@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          terminal_amount: curr["ptsave_terminalcommissionrollup"]?.toFixed(2),
          commission_status: curr[
            "ptsave_commissionstatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_commissionstatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          total_commission: curr[
            "ptsave_totalcomissioncalculated@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr[
                "ptsave_totalcomissioncalculated@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          mid_opend: !curr["createdon"] ? "" : getTimeFormat(curr["createdon"]),
          ptsave_totalcomissioncalculated_base:
            curr?.ptsave_totalcomissioncalculated_base
              ? curr?.ptsave_totalcomissioncalculated_base
              : 0,
        }));
        setUpfronts(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showToast("error", "Something went wrong");
        
      });
  };
  // calling api
  useEffect(() => {
    setIsLoading(true);
    getUpfrontList(
      `${process.env.REACT_APP_BASE_URL}api/v1/commission/upfront-commission/`
    );
  }, [itemPerPage]);

 

  const displayData2 = upfronts
    ?.filter((item) =>
      keys.some((key) => {
        const value = item[key]?.toLowerCase();
        const queryLower = query.toLowerCase();
        return value?.includes(queryLower);
      })
    )
    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        search?.account_status === "" ||
        fill?.mid === null
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.legal_name?.toLowerCase().includes(search.legal_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.trading_name
          ?.toLowerCase()
          .includes(search.trading_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.account_status
          ?.toLowerCase()
          .includes(search.account_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.created_at?.toLowerCase().includes(search.created_at.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.mid_opend?.toLowerCase().includes(search.mid_opend.toLowerCase())
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
        fill.total_commission
          ?.toLowerCase()
          .includes(search.total_commission.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.terminal_override_amount
          ?.toLowerCase()
          .includes(search.terminal_override_amount.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.terminal_amount
          ?.toLowerCase()
          .includes(search.terminal_amount.toLowerCase())
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
      if (fill.mid?.toLowerCase().includes(search.mid.toLowerCase())) {
        return fill;
      }
    });

  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);
  useEffect(() => {
    // const endOffset = itemOffset + itemPerPage;
    setCurrentItems(upfronts?.slice(itemOffset, endOffset));
    SetPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage, displayData2?.length]);
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

  // console.log(upfronts)
  // sorting
  const sortingData = (sortBy, stateSpan) => {
    if (sortBy === "created_at" || sortBy === "mid_opend") {
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
    } else if (sortBy === "total_commission") {
      if (sort === "ASC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a["ptsave_totalcomissioncalculated_base"] >
          b["ptsave_totalcomissioncalculated_base"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a["ptsave_totalcomissioncalculated_base"] <
          b["ptsave_totalcomissioncalculated_base"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "terminal_amount") {
      if (sort === "ASC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a["ptsave_terminalcommissionrollup"] >
          b["ptsave_terminalcommissionrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a["ptsave_terminalcommissionrollup"] <
          b["ptsave_terminalcommissionrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "terminal_override_amount") {
      if (sort === "ASC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a["ptsave_terminalcommissionrollup"] >
          b["ptsave_terminalcommissionrollup"]
            ? 1
            : -1
        );
        setUpfronts(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a["ptsave_terminalcommissionrollup"] <
          b["ptsave_terminalcommissionrollup"]
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

  // console.log(upfronts,'upfront')

  if (isLoading) {
    return <Loader />;
  }
  // chart Function
  const getChartData = () => {
    const currentYear = new Date().getUTCFullYear();
    const filteredArray = upfronts?.filter((obj) => {
      const createdAtYear = new Date(obj?.createdon).getUTCFullYear();
      return createdAtYear === currentYear;
    });
    console.log(filteredArray.map(data => data["total_commission"]),'arr 491')
    const commissionSumArray = Array(12).fill(0);

    filteredArray.forEach((obj) => {
      const createdAt = new Date(obj?.createdon);
      const monthIndex = createdAt.getUTCMonth();
      const commission = Number(obj?.total_commission?.split("£")[1]) || 0;
      commissionSumArray[monthIndex] += commission;
    });
    
    return commissionSumArray;
  };
  
  const apexCommission = {
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
    if (data === "In Arrears") return "#dc3545";
    if (data === "Inactive") return "#dc3545";
    if (data === "Closed") return "#dc3545";
    if (data === "Not Applicable") return "#ffc107";
    if (data === "Paid") return "#28a745";
    if (data === "Not Paid") return "#dc3545";
    if (data === "Active") {
      return "#28a745";
    } else if (data === "Inactive") {
      return "#dc3545";
    } else if (data === "Sent to Bank") {
      return "#007bff";
    } else if (data === "Auto Withdrawn") {
      return "#D32F2F";
    } else if (data === "Query Result") {
      return "#66BB6A";
    } else if (data === "Terminal Ordered") {
      return "#D32F2F";
    } else if (data === "Bank Query") {
      return "#EF5350";
    } else if (data === "Live") {
      return "#28a745";
    } else if (data === "Dispatched") {
      return "#ffc107";
    } else if (data === "Transacting") {
      return "#38B6FF";
    } else if (data === "Approved") {
      return "#28a745";
    } else if (data === "Terminal Delivered") {
      return "#66BB6A";
    } else if (data === "Not Live") {
      return "#FFC107";
    } else if (data === "Not Transacting") {
      return "#EF5350";
    } else if (data === "Declined") {
      return "#dc3545";
    } else if (data === "Closed") {
      return "#dc3545";
    } else if (data === "Fraud Closed") {
      return "#dc3545";
    } else if (data === "Cancelled") {
      return "#EF5350";
    } else return "#28a745";
  };
  // console.log(search?.commission_status,'dd')
  return (
    <div>
      {/* Upfornt Commission Chart */}
      <div>
        <div className="row mb-3">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            {/* <Bar options={options} data={chartData} /> */}
            <Chart
              options={apexCommission?.options}
              series={apexCommission?.series}
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
          <h3 style={{ color: "#3C4B64" }}>Upfront Commission List</h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          {/* <button  className="btn btn-info btn-lg me-3 text-white">Add New Leads</button>{' '} */}
          <img style={{ cursor: "pointer" }} src={printer} width="32" alt="" />
        </div>
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-6 d-flex align-items-center my-2">
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
          <div className="d-flex align-items-center my-2">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Item Per Page :
            </span>{" "}
            <select
              value={itemPerPage}
              onChange={(e) => {
                setItemPerPage(Number(e.target.value));
                // setCurrentPage(1);
              }}
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
                    className={`${
                      midSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* app type className="d-flex justify-content-between align-content-center" */}
              <th>
                <div
                  onClick={() => {
                    sortingData("legal_name", SetLegalNameSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
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
                    sortingData("trading_name", setTradingNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Trading name</p>
                  <img
                    className={`${
                      tradingNameSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* Account Status  */}
              <th>
                <div className="">
                  <p>Account Status</p>

                  {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div className="">
                  <p>Leasing Status</p>
                  {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              {/* Terminal Amount */}
              <th>
                <div
                  onClick={() => {
                    sortingData("terminal_amount", setTerminalAmountSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Terminal Amount</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      terminalAmountSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* Commission Override */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData(
                      "terminal_override_amount",
                      setTerminalOverideSpan
                    );
                  }}
                >
                  <p>Commission Override</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      terminalOverideSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* Total Commission */}
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
                      totaoCommissionSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS due Date */}
              <th>
                <div
                  onClick={() => {
                    sortingData("commission_status", setCommitionStatSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Commission Status</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      commissionStatSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS Renewal Date */}
              <th>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("mid_opend", SetMidOpenSpan);
                  }}
                >
                  <p>Date MID Opened</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      midOpenSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("created_at", SetCreatedAtSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Created On</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      createdAtSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr
              style={{
                borderTop: "2px solid #d8dbe0",
                borderBottom: "2px solid #d8dbe0",
              }}
            >
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "120px",
                      maxWidth: "120px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="mid"
                    onChange={handleFilterInput}
                    value={search["mid"]}
                  />
                </div>
              </th>
              {/* legal name */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "140px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="legal_name"
                    onChange={handleFilterInput}
                    value={search["legal_name"]}
                  />
                </div>
              </th>
              {/* tradingname */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "140px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="trading_name"
                    onChange={handleFilterInput}
                    value={search["trading_name"]}
                  />
                </div>
              </th>
              {/* account status */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="account_status"
                    onChange={handleFilterInput}
                    value={search["account_status"]}
                  />
                </div>
              </th>
              {/* leasing stat */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "110px",
                      maxWidth: "110px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="leasing_status"
                    onChange={handleFilterInput}
                    value={search["leasing_status"]}
                  />
                </div>
              </th>
              {/* terminal amount */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="terminal_amount"
                    onChange={handleFilterInput}
                    value={search["terminal_amount"]}
                  />
                </div>
              </th>
              {/* commison overrade */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "190px",
                      maxWidth: "190px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="terminal_override_amount"
                    onChange={handleFilterInput}
                    value={search["terminal_override_amount"]}
                  />
                </div>
              </th>
              {/* Total commision */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="total_commission"
                    onChange={handleFilterInput}
                    value={search["total_commission"]}
                  />
                </div>
              </th>
              {/* commission_status */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="commission_status"
                    onChange={handleFilterInput}
                    value={search["commission_status"]}
                  />
                </div>
              </th>
              {/* mid_opendate */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="mid_opend"
                    onChange={handleFilterInput}
                    value={search["mid_opend"]}
                  />
                </div>
              </th>
              {/* create on */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="created_at"
                    onChange={handleFilterInput}
                    value={search["created_at"]}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData?.length === 0 ? (
              <>
                <tr>
                  <td colSpan="11">
                    <div className="not_found">
                      <h4 className="my-4">No Data Found</h4>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              displayData?.map((data) => (
             
                  <tr key={data?.id}>
                    <td>{data?.mid}</td>
                    <td>{data?.legal_name}</td>
                    <td>{data?.trading_name}</td>
                    <td>
                      {data?.account_status ? (
                        <button
                          className="btn text-white"
                          style={{
                            backgroundColor: `${btnBg(data?.account_status)}`,
                          }}
                        >
                          {data?.account_status}
                        </button>
                      ) : (
                        ""
                      )}{" "}
                    </td>
                    <td>
                      {data?.leasing_status?.length > 0 && (
                        <button
                          className="btn  text-white"
                          style={{
                            backgroundColor: `${btnBg(data?.leasing_status)}`,
                          }}
                        >
                          {data?.leasing_status}
                        </button>
                      )}
                    </td>
                    <td>£{data?.terminal_amount}</td>
                    <td>{data?.terminal_override_amount}</td>
                    <td> {data?.total_commission}</td>
                    <td>
                      {data?.commission_status && (
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
                      )}{" "}
                    </td>
                    <td>{data?.mid_opend}</td>
                    <td>{data?.created_at}</td>
                  </tr>
              
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* --------paggination------- */}
      {/* <Paggination /> */}
      <div className="mt-3 d-flex justify-content-start">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          containerClassName="pagination-container"
          activeClassName="active"
          disabledClassName="disable"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
          // forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
}
