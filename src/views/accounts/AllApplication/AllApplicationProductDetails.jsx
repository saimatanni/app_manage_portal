import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import printer from "../../../assets/img/printer.svg";

import arrow from "../../../EboardComponents/Custom/Arrow.svg";
import "../Leads/Leads.css";

import { useNavigate } from "react-router-dom";

import Loader from "src/utils/Loader";

import { showToast } from "src/utils/ToastHelper";
import ReactPaginate from "react-paginate";
export default function AllApplicationProductDetails() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("ASC");
  const [itemPerPage, setItemPerpage] = useState(10);
  const [newPageCount, SetNewPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // paggination State

  const [total_item, setTotal_item] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  // const [nextUrl, setNextUrl] = useState(null);
  // const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);

  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

  const [search, setSearch] = useState({
    created_on: "",
    updated_on: "",
    line_number: "",
    terminal: "",
    terminal_status: "",
    tracking_id: "",
    connection_type: "",
    terminal_term: "",
    terminal_rental: "",
    tid: "",
  });
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const [applications, setApplications] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  const [createdAtSpan, SetCreatedAtSpan] = useState(true);
  const [updatedAtSpan, SetUpdatedAtSpan] = useState(true);
  const [connectionTypeSpan, setConnectionTypeSpan] = useState(true);
  const [contactLengthSpan, setContactLengthSpan] = useState(true);
  const [terminalModelSpan, setTerminalModelSpan] = useState(true);

  const [lineNumberSpan, setLineNumberSpan] = useState(true);
  const [terminalRentalSpan, setTerminalRentalSpan] = useState(true);

  // ----tanni-------
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem("allAppId");


  const keys = [
    "connection_type",
    "updated_on",
    "created_on",
    "tid",
    "line_number",
    "terminal_status",
    "tracking_id",
    "terminal_term",
    "terminal_rental",
    "terminal",
  ];
  const getNewPreview = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res?.data?.data);
        setQuote(res?.data?.data);
        setIsLoading(true);
        const newData = res?.data?.data?.terminal?.map((curr) => ({
          ...curr,
          // created_at: getTimeFormat(curr?.created_at),
          // acquiring_bank: aqBank[curr?.acquiring_bank],
          ptsave_mid: curr?.ptsave_mid ? curr?.ptsave_mid : "",
          line_number: curr?.[
            "ptsave_lineitemnumber@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_lineitemnumber@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          terminal: curr?.[
            "_ptsave_product_value@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "_ptsave_product_value@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          terminal_status: curr?.[
            "ptsave_terminalstatus@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_terminalstatus@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          tracking_id: curr?.["ptsave_trackingnumbe"]
            ? curr?.["ptsave_trackingnumbe"]
            : "",
          connection_type: curr?.[
            "_ptsave_connectiontype_value@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "_ptsave_connectiontype_value@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          terminal_term: curr?.[
            "_ptsave_terminalterm_value@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "_ptsave_terminalterm_value@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          terminal_rental: curr?.[
            "ptsave_terminalrental@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_terminalrental@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          tid: curr?.["ptsave_tid"] ? curr?.["ptsave_tid"] : "",
          created_on: curr?.[
            "createdon@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.["createdon@OData.Community.Display.V1.FormattedValue"]
            : "",
          updated_on: curr?.[
            "modifiedon@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.["modifiedon@OData.Community.Display.V1.FormattedValue"]
            : "",
        }));
        setApplications(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request?.response)?.message;
        if (
          message === "Invalid token." ||
          JSON.parse(err.request.response).code === 401
        ) {
          showToast("success", "Invalid Token");
          navigate(`/login`);
        }
        console.log(err);
      });
  };
  useEffect(() => {
    const newId = "215834a6-7ef5-ed11-8848-002248c878f5";
    console.log("newId", newId);
    getNewPreview(`${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/`);
  }, [itemPerPage, pageNumber]);
  const displayData2 = applications
    ?.filter((item) =>
      keys.some((key) => {
        const value = item[key]?.toLowerCase();
        const queryLower = query.toLowerCase();
        return value?.includes(queryLower);
      })
    )
    .filter((fill) => {
      if (
        fill.line_number
          ?.toLowerCase()
          .includes(search.line_number.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.terminal?.toLowerCase().includes(search.terminal.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.terminal_status
          ?.toLowerCase()
          .includes(search.terminal_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.tracking_id
          ?.toLowerCase()
          .includes(search.tracking_id.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.connection_type
          ?.toLowerCase()
          .includes(search.connection_type.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.terminal_term
          ?.toLowerCase()
          .includes(search.terminal_term.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.terminal_rental
          ?.toLowerCase()
          .includes(search.terminal_rental.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (fill.tid?.toLowerCase().includes(search.tid.toLowerCase())) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.created_on?.toLowerCase().includes(search.created_on.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.updated_on?.toLowerCase().includes(search.updated_on.toLowerCase())
      ) {
        return fill;
      }
    });
  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);

  useEffect(() => {
    if (pageCount !== 0) {
      if (pageCount < pageNumber) {
        setPageNumber(pageCount);
      }
    }
  }, [pageCount]);
  useEffect(() => {
    // const endOffset = itemOffset + itemPerPage;
    setCurrentItems(applications?.slice(itemOffset, endOffset));
    SetNewPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage, displayData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % applications?.length;
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

  const sortingData = (sortBy, stateSpan) => {
    if (sortBy === "created_on" || sortBy === "updated_on") {
      if (sort === "ASC") {
        const sorted = [...applications].sort((a, b) => {
          const datePartsA = a[sortBy].split(/[/ :]/); // Splitting by '/', space, and ':'
          const datePartsB = b[sortBy].split(/[/ :]/);

          // Extract year, month, day, hour, and minute from the date strings
          const dayA = parseInt(datePartsA[0]);
          const dayB = parseInt(datePartsB[0]);
          const monthA = parseInt(datePartsA[1]) - 1; // Month is zero-indexed
          const monthB = parseInt(datePartsB[1]) - 1;
          const yearA = parseInt(datePartsA[2]);
          const yearB = parseInt(datePartsB[2]);
          const hourA = parseInt(datePartsA[3]);
          const hourB = parseInt(datePartsB[3]);
          const minuteA = parseInt(datePartsA[4]);
          const minuteB = parseInt(datePartsB[4]);

          // Compare year, month, day, hour, and minute
          if (yearA !== yearB) {
            return yearA - yearB;
          }
          if (monthA !== monthB) {
            return monthA - monthB;
          }
          if (dayA !== dayB) {
            return dayA - dayB;
          }
          if (hourA !== hourB) {
            return hourA - hourB;
          }
          return minuteA - minuteB;
        });

        setApplications(sorted);
        setSort("DSC");
        stateSpan(false);
      } else if (sort === "DSC") {
        const sorted = [...applications].sort((a, b) => {
          const datePartsA = a[sortBy].split(/[/ :]/);
          const datePartsB = b[sortBy].split(/[/ :]/);

          const dayA = parseInt(datePartsA[0]);
          const dayB = parseInt(datePartsB[0]);
          const monthA = parseInt(datePartsA[1]) - 1;
          const monthB = parseInt(datePartsB[1]) - 1;
          const yearA = parseInt(datePartsA[2]);
          const yearB = parseInt(datePartsB[2]);
          const hourA = parseInt(datePartsA[3]);
          const hourB = parseInt(datePartsB[3]);
          const minuteA = parseInt(datePartsA[4]);
          const minuteB = parseInt(datePartsB[4]);

          if (yearA !== yearB) {
            return yearB - yearA; // Reverse order for descending sort
          }
          if (monthA !== monthB) {
            return monthB - monthA;
          }
          if (dayA !== dayB) {
            return dayB - dayA;
          }
          if (hourA !== hourB) {
            return hourB - hourA;
          }
          return minuteB - minuteA;
        });

        setApplications(sorted);
        setSort("ASC");
        stateSpan(true);
      }
    } else if (sortBy === "terminal_rental") {
      if (sort === "ASC") {
        const sorted = [...applications].sort((a, b) =>
          a["ptsave_terminalrental"] > b["ptsave_terminalrental"] ? 1 : -1
        );
        setApplications(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...applications].sort((a, b) =>
          a["ptsave_terminalrental"] < b["ptsave_terminalrental"] ? 1 : -1
        );
        setApplications(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else {
      if (sort === "ASC") {
        const sorted = [...applications].sort((a, b) =>
          a[sortBy]?.toLowerCase() > b[sortBy]?.toLowerCase() ? 1 : -1
        );
        setApplications(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...applications].sort((a, b) =>
          a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase() ? 1 : -1
        );
        setApplications(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    }
  };
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6">
          <h2 style={{ color: "#3C4B64" }}>Account Products</h2>
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
          </span>
          <input
            className="top-input"
            type="text"
            placeholder="Type here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <div className="d-flex align-items-center">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Item Per Page :
            </span>
            <select
              value={itemPerPage}
              onChange={(e) => setItemPerpage(e.target.value)}
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
                  className="d-flex px-2 justify-content-center"
                  onClick={() => {
                    sortingData("line_number", setLineNumberSpan);
                  }}
                >
                  <p style={{ textAlign: "center" }}>Line Number</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      lineNumberSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* app type className="d-flex justify-content-between align-content-center" */}
              <th>
                <div
                  className="d-flex px-2 justify-content-center"
                  onClick={() => {
                    sortingData("terminal", setTerminalModelSpan);
                  }}
                >
                  <p>Terminal</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      terminalModelSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* legal name */}
              <th>
                <div className="d-flex justify-content-center align-content-center">
                  <p>Terminal Status</p>
                </div>
              </th>
              {/* trading name */}
              <th>
                <div className="d-flex justify-content-center align-content-center">
                  <p className="ms-4">Tracking ID</p>
                </div>
              </th>
              {/* mMID status */}
              <th>
                <div
                  className="d-flex justify-content-center align-content-center"
                  onClick={() => {
                    sortingData("connection_type", setConnectionTypeSpan);
                  }}
                >
                  <p>Connection Type</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      connectionTypeSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* account status */}
              <th>
                <div
                  className="d-flex justify-content-center align-content-center"
                  onClick={() => {
                    sortingData("terminal_term", setContactLengthSpan);
                  }}
                >
                  <p>Terminal Term</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      contactLengthSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div
                  className="d-flex justify-content-center align-content-center"
                  onClick={() => {
                    sortingData("terminal_rental", setTerminalRentalSpan);
                  }}
                >
                  <p>Terminal Rental</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      terminalRentalSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* PCI/DSS Compliance */}
              <th>
                <div className="d-flex justify-content-center align-content-center">
                  <p>TID</p>
                </div>
              </th>
              <th>
                <div
                  className="d-flex justify-content-center align-content-center"
                  onClick={() => {
                    sortingData("created_on", SetCreatedAtSpan);
                  }}
                >
                  <p>Created On</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      createdAtSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              <th>
                <div
                  className="d-flex justify-content-center align-content-center"
                  onClick={() => {
                    sortingData("updated_on", SetUpdatedAtSpan);
                  }}
                >
                  <p>Updated On</p>
                  <img
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      updatedAtSpan === false ? "rotate" : "rotate-back"
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
                    name="line_number"
                    onChange={handleFilterInput}
                    value={search["line_number"]}
                  />
                </div>
              </th>
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
                    name="terminal"
                    onChange={handleFilterInput}
                    value={search["terminal"]}
                  />
                </div>
              </th>
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
                    name="terminal_status"
                    onChange={handleFilterInput}
                    value={search["terminal_status"]}
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
                    name="tracking_id"
                    onChange={handleFilterInput}
                    value={search["tracking_id"]}
                  />
                </div>
              </th>
              {/* legalname */}
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
                    name="connection_type"
                    onChange={handleFilterInput}
                    value={search["connection_type"]}
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
                    name="terminal_term"
                    onChange={handleFilterInput}
                    value={search["terminal_term"]}
                  />
                </div>
              </th>
              {/* mid stat */}
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
                    name="terminal_rental"
                    onChange={handleFilterInput}
                    value={search["terminal_rental"]}
                  />
                </div>
              </th>
              {/* account date */}
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
                    name="tid"
                    onChange={handleFilterInput}
                    value={search["tid"]}
                  />
                </div>
              </th>
              {/* Leasing Status */}
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
                    name="created_on"
                    onChange={handleFilterInput}
                    value={search["created_on"]}
                  />
                </div>
              </th>
              {/* PCI/DSS Compliance */}
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
                    name="updated_on"
                    onChange={handleFilterInput}
                    value={search["updated_on"]}
                  />
                </div>
              </th>
            </tr>
          </thead>
          {/* <tbody>
           
          </tbody> */}
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
              <>
                {displayData?.map((data) => (
                  <>
                    <tr>
                      <td>{data?.line_number}</td>
                      <td>{data?.terminal}</td>
                      <td>{data?.terminal_status}</td>
                      <td>{data?.tracking_id}</td>
                      <td>{data?.connection_type}</td>
                      <td>{data?.terminal_term}</td>
                      <td>{data?.terminal_rental}</td>

                      <td>{data?.tid}</td>
                      <td>{data?.created_on}</td>
                      <td>{data?.updated_on}</td>
                    </tr>
                  </>
                ))}
              </>
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
          pageCount={newPageCount}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
          forcePage={currentPage}
          // initialSelected={1}
        />
      </div>
    </>
  );
}
