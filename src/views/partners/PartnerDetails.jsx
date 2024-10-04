import React, { useEffect, useState } from "react";
import printer from "../../assets/img/printer.svg";
import arrow from "../../EboardComponents/Custom/Arrow.svg";
import "../accounts/Leads/Leads.css";

import axios from "axios";

import Loader from "src/utils/Loader";

import { getTimeFormat } from "src/utils/CommonFunction";
import ReactPaginate from "react-paginate";


import { useNavigate } from "react-router-dom";

import { showToast } from "src/utils/ToastHelper";
import PartnerDetailsChart from "./PartnerDetailsChart";

export default function PartnerDetails() {

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(10);

  const [upfronts, setUpfronts] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  const [pageCount, SetPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const keys = [
    "trading_name",
    "legal_name",
    "created_at",
    "application_stage",
    "application_type",
    "client_id",
  ];
  const [search, setSearch] = useState({
    trading_name: "",
    legal_name: "",
    created_at: "",
    client_id: "",
    application_type: "",
    application_stage: "",
  });

  // sorting San
  const [sort, setSort] = useState("ASC");

  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, setTradingNameSpan] = useState(true);
  const [createdAtSpan, SetCreatedAtSpan] = useState(true);

  const [midSpan, setMidSpan] = useState(true);

  const getPartnerDetails = (url) => {
    axios
      .get(url)
      .then((res) => {
        setCurrentItems([]);

        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          created_at: !curr["createdon"]
            ? ""
            : getTimeFormat(curr["createdon"]),
          client_id: !curr?.name ? "" : curr?.name,
          legal_name: curr?.["ptsave_opportunity_name"]
            ? curr?.["ptsave_opportunity_name"]
            : "",
          trading_name: curr?.ptsave_trading_name
            ? curr?.ptsave_trading_name
            : "",
          application_type: curr?.[
            "ptsave_opportunity_type@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_opportunity_type@OData.Community.Display.V1.FormattedValue"
              ]
            : "",

          contact_id: curr["_primarycontactid_value"],

          application_stage: curr?.[
            "ptsave_portalopportunitystage@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_portalopportunitystage@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
        }));
        setUpfronts(newData);
        setCopiedArray(newData);

        // Group data by month and count applications
        const monthlyCounts = newData.reduce((acc, curr) => {
          const monthYear = new Date(curr.createdon).toLocaleDateString(
            "en-US",
            { month: "long", year: "numeric" }
          );
          acc[monthYear] = (acc[monthYear] || 0) + 1;
          return acc;
        }, {});

        // Convert counts to an array of objects
        const monthlyChartData = Object.entries(monthlyCounts).map(
          ([monthYear, count]) => ({
            monthYear,
            count,
          })
        );

        setMonthlyData(monthlyChartData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response === undefined) {
          showToast("error", "Internal Server Error");
        }
      });
  };

  const contact_id = localStorage.getItem("contact_id");
  // calling api
  useEffect(() => {
    setIsLoading(true);
    getPartnerDetails(
      `${process.env.REACT_APP_BASE_URL}api/v1/application/partners/partner-details/?partner_account_id=${contact_id}`
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
        search?.application_stage === "" ||
        search?.application_type === "" ||
        fill?.client_id === ""
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.client_id?.toLowerCase().includes(search.client_id.toLowerCase())
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
        fill.application_stage
          ?.toLowerCase()
          .includes(search.application_stage.toLowerCase())
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
        fill.application_type?.toLowerCase().includes(search.application_type.toLowerCase())
      ) {
        return fill;
      }
    })

  const endOffset = itemOffset + itemPerPage;
  // const displayData = upfronts?.slice(itemOffset, endOffset);
  
  // useEffect(() => {
  //   setCurrentItems(upfronts?.slice(itemOffset, endOffset));
  //   SetPageCount(Math.ceil(upfronts?.length / itemPerPage));
  // }, [itemOffset, itemPerPage, upfronts?.length]);
  const displayData = displayData2?.slice(itemOffset, endOffset);
  useEffect(() => {

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
  const btnBg = (data) => {
    if (data === "Sent for Esign") return "#F9B115";
    if (data === "Application received") return "#38B6FF";
    if (data === "Waiting to fill up the form") return "#9DA5B1";
    if (data === "Waiting to send for Esign") return "#F9B115";
    if (data === "Application signed back") return "#66BB6A";
    if (data === "Sent to Bank") return "#2EB85C";
    if (data === "PS Query") return "#D32F2F";

    if (data === "Additional Location + E Comm") return "#ffc107";
    // if (data === "New App") return "#28a745";
    if (data === "Not Paid") return "#dc3545";
    if (data === "Active") {
      return "#28a745";
    } else if (data === "Inactive") {
      return "#dc3545";
    } else if (data === "Auto Withdrawn") {
      return "#D32F2F";
    } else if (data === "Additional Location") {
      return "#EF5350";
    } else if (data === "Terminal Ordered") {
      return "#D32F2F";
    } else if (data === "Bank Query") {
      return "#EF5350";
    } else if (data === "Live") {
      return "#28a745";
    } else if (data === "Dispatched") {
      return "#ffc107";
    } else if (data === "New Ecomm App") {
      return "#38b6ff";
    } else if (data === "Approved") {
      return "#28a745";
    } else if (data === "New App") {
      return "#66BB6A";
    } else if (data === "Deactivated") {
      return "lightslategrey";
    } else if (data === "New App") {
      return "blue";
    } else if (data === "Open") {
      return "#28a745";
    } else if (data === "Re-opened") {
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
    } else if (data === "In Arrears") {
      return "#EE8EC1";
    } else if (data === "Default") {
      return "#33B5FF";
    } else if (data === "Multiple Outlet") {
      return "#3D33FF";
    } else return "#28a745";
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Upfornt Commission Chart */}
      <div>
        <div className=" mb-3">
          <div className="container">
            <PartnerDetailsChart monthlyData={monthlyData} />
          </div>
        </div>
      </div>
      {/* UpfrontCommission Table */}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>Partner Details</h3>
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
                    sortingData("client_id", setMidSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                >
                  <p style={{ textAlign: "end" }}>Contact ID</p>
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
              <th>
                <div className="">
                  <p>Application Type</p>
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
                  <p>Account Name</p>
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
                  <p>Trading Name</p>
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
                  <p>Application Stage</p>
                </div>
              </th>
              {/* Leasing Status */}

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
              {/* client id */}
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
                    name="client_id"
                    onChange={handleFilterInput}
                    value={search["client_id"]}
                  />
                </div>
              </th>

                 {/* app type */}
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
                    name="application_type"
                    onChange={handleFilterInput}
                    value={search["application_type"]}
                  />
                </div>
              </th>
            {/* legalname */}
            <th>
                <div>
                  <input
                    style={{
                      minWidth: "140px",
                      // maxWidth: "140px",
                      maxWidth: "100%",
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
              {/* trading name */}
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
                    name="trading_name"
                    onChange={handleFilterInput}
                    value={search["trading_name"]}
                  />
                </div>
              </th>
            {/* new app stage */}
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
                    name="application_stage"
                    onChange={handleFilterInput}
                    value={search["application_stage"]}
                  />
                </div>
              </th>
    {/* create On */}
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
                  <td>{data?.client_id}</td>
                  <td>{data?.application_type}</td>
                  <td>{data?.legal_name}</td>
                  <td>{data?.trading_name}</td>

                  <td>
                    {" "}
                    {data?.application_stage ? (
                      <button
                        className="btn text-white"
                        style={{
                          backgroundColor: `${btnBg(data?.application_stage)}`,
                        }}
                      >
                        {data?.application_stage}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>

                  {/* <td>{data?.mid}</td>
                    <td>{data?.contact_id}</td>
                    <td>{data?.owner_id}</td> */}

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
