import React, { useEffect, useState } from "react";
import printer from "../../../../assets/img/printer.svg";
import list from "../../../../assets/img/dossier.svg";

import arrow from "../../../../EboardComponents/Custom/Arrow.svg";
import "../../Leads/Leads.css";

import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";

import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { showToast } from "src/utils/ToastHelper";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
const SubmittedApplication = () => {
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
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
  const navigate = useNavigate();
  const [showId, setShowId] = useState(null);
  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  // filter
  const [query, setQuery] = useState("");
  const [queryEx, setQueryEx] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [newPageCount, SetNewPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    client_id: "",
    accuring_bank: "",
    trading_name: "",
    legal_name: "",
    created_on: "",
    mobile: "",
    note: "",
    application_type: "",
    application_stage: "",
    submission_date: "",
    partner_manager: "",
  });
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  // span state
  const [sort, setSort] = useState("ASC");
  const userData = JSON.parse(Cookies.get("userData"));
  const [clientIdSpan, SetClientIdSpan] = useState(true);
  const [partnerSpan, setPartnerSpan] = useState(true);
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, SetTradingNameSpan] = useState(true);
  const [mobileSpan, setMobileSpan] = useState(true);
  const [createdAtSpan, setCreatedAtSpan] = useState(true);
  const [acquiringBankSpan, setAcquiringBankSpan] = useState(true);
  const [noteSpan, setNoteSpan] = useState(true);
  const [submittedOnSpan, setsubmittedOnSpan] = useState(true);
  // paggination State

  const [total_item, setTotal_item] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  // const [nextUrl, setNextUrl] = useState(null);
  // const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);
  const indexOfLastPost = pageCount < pageNumber ? limit : pageNumber * limit;
  const offset = pageCount < pageNumber ? 0 : indexOfLastPost - limit;

  const getNewApplications = (url) => {
    axios
      .get(url)
      .then((res) => {
        // setIsLoading(true)
        // console.log(res.data.data, "application");
        setApplications([]);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          // created_at: getTimeFormat(curr?.created_at),
          // acquiring_bank: aqBank[curr?.acquiring_bank],
          client_id: curr?.["name"] ? curr?.["name"] : "",
          // client_id: curr?.["name"],
          partner_manager: curr?.[
            "_ptsave_partner_value@OData.Community.Display.V1.FormattedValue"
            // "_parentaccountid_value@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "_ptsave_partner_value@OData.Community.Display.V1.FormattedValue"
                // "_parentaccountid_value@OData.Community.Display.V1.FormattedValue"
              ]
            : " ",
          application_type: curr?.[
            "ptsave_opportunity_type@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_opportunity_type@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          trading_name: curr?.ptsave_trading_name,
          legal_name: curr?.ptsave_opportunity_name,
          mobile: curr?.["ptsave_phone_no"],
          submission_date: curr?.[
            "createdon@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.["createdon@OData.Community.Display.V1.FormattedValue"]
            : "",
          application_stage: curr?.[
            "ptsave_portalopportunitystage@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_portalopportunitystage@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          created_on: curr?.[
            "createdon@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.["createdon@OData.Community.Display.V1.FormattedValue"]
            : "",
          accuring_bank: curr?.[
            "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          note: curr?.["description"] ? curr?.["description"] : "",
        }));

        setApplications(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response === undefined) {
          showToast("error", "server error");
          return;
        } else {
          const message = JSON.parse(err.request.response).message;

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
          }
        }
      });
  };
  const keys = [
    "client_id",
    "trading_name",
    "legal_name",
    "created_on",
    "application_type",
    "application_stage",
    "note",
    "accuring_bank",
    "submission_date",
    "total_commission",
    "mid_opend",
    "partner_manager",
  ];

  // calling all aData
  useEffect(() => {
    getNewApplications(
      `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/submitted-applications/?query=${query}&limit=${limit}&offset=${offset}`
    );
  }, [pageNumber, itemPerPage]);
  const handleSearchApi = () => {
    // if(query){
    setIsLoading(true);
    getNewApplications(
      `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/submitted-applications/?query=${query}&limit=${limit}&offset=${offset}`
    );
  };
  const handleSearchApiQuery = () => {
    // if(query){
    setIsLoading(true);
    getNewApplications(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/application/applications/submitted-applications/?query=${""}&limit=${limit}&offset=${offset}`
    );
    // }
    // else{
    //   showToast('error','Type text first')
    // }
  };

  // filter
  const displayData2 = applications
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
        search?.created_on === ""
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
        fill.partner_manager
          ?.toLowerCase()
          .includes(search.partner_manager.toLowerCase())
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
        fill.application_type
          ?.toLowerCase()
          .includes(search.application_type.toLowerCase())
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
        fill.created_on?.toLowerCase().includes(search.created_on.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.accuring_bank
          ?.toLowerCase()
          .includes(search.accuring_bank.toLowerCase())
      ) {
        return fill;
      }
    })

    .filter((fill) => {
      if (fill.note?.toLowerCase().includes(search.note.toLowerCase())) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.submission_date
          ?.toLowerCase()
          .includes(search.submission_date.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (fill.mobile?.toLowerCase().includes(search.mobile.toLowerCase())) {
        return fill;
      }
    });

  // sorting
  const sortingData = (sortBy, stateSpan) => {
    if (sortBy === "submission_date" || sortBy === "created_on") {
      if (sort === "ASC") {
        const sorted = [...copiedAarray].sort((a, b) => {
          const datePartsA = a[sortBy].split(/[\/\s:]/);
          const datePartsB = b[sortBy].split(/[\/\s:]/);

          // Extract year, month, day, hour, and minute from the date strings
          const yearA = parseInt(datePartsA[2]);
          const yearB = parseInt(datePartsB[2]);
          const monthA = parseInt(datePartsA[1]) - 1; // Month is zero-indexed
          const monthB = parseInt(datePartsB[1]) - 1;
          const dayA = parseInt(datePartsA[0]);
          const dayB = parseInt(datePartsB[0]);
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
        stateSpan(!true);
      } else if (sort === "DSC") {
        // const sorted = [...copiedAarray].sort((a, b) =>
        //   a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        //   // a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        // );
        const sorted = [...copiedAarray].sort((a, b) => {
          const dateA = new Date(a[sortBy]);
          const dateB = new Date(b[sortBy]);
          return dateB - dateA;
        });
        setApplications(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else {
      if (sort === "ASC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
        );
        setApplications(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...copiedAarray].sort((a, b) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        );
        setApplications(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    }
  };

  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);

  useEffect(() => {
    if (pageCount !== 0) {
      if (pageCount < pageNumber) {
        setPageNumber(pageCount);
      }
    }
  }, [pageCount]);

  // ------------new pagination----------

  useEffect(() => {
    // const endOffset = itemOffset + itemPerPage;
    setCurrentItems(applications?.slice(itemOffset, endOffset));
    SetNewPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage, displayData2?.length]);

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
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
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
  return (
    <div>
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            Submitted Application
          </h3>
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
            value={queryEx}
            onChange={(e) => {
              if (e.target.value === "") {
                handleSearchApiQuery();
              }
              setQuery(e.target.value);
              setQueryEx(e.target.value);
            }}
            className="top-input"
            type="text"
            placeholder="Type Here..."
          />
          <button
            className="btn basic_btn ms-2 btn-sm"
            onClick={handleSearchApi}
          >
            Search
          </button>
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
                    sortingData("client_id", SetClientIdSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                >
                  <p style={{ textAlign: "end" }}>Client ID</p>
                  <img
                    className={`${
                      clientIdSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {userData.customer_type === "Partner Manager" && (
                <th>
                  <div
                    onClick={() => {
                      sortingData("partner_manager", setPartnerSpan);
                    }}
                    className="d-flex justify-content-center gap-2 align-content-center"
                  >
                    <p>Partner</p>
                    <img
                      style={{ marginTop: "-15px", cursor: "pointer" }}
                      src={arrow}
                      alt=""
                      className={`${
                        partnerSpan === false ? "rotate" : "rotate-back"
                      }`}
                    />
                  </div>
                </th>
              )}
              {/* app type className="d-flex justify-content-between align-content-center" */}
              <th>
                <div>
                  <p>Application Type</p>
                  {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              {/* legal name */}
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
              {/* trading name */}
              <th>
                <div
                  onClick={() => {
                    sortingData("trading_name", SetTradingNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p className="ms-4">Trading Name</p>

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
              {/* mobile */}
              <th>
                <div
                  onClick={() => {
                    sortingData("mobile", setMobileSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Mobile No</p>
                  <img
                    className={`${
                      mobileSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* Submission Date */}
              <th>
                <div
                  onClick={() => {
                    sortingData("submission_date", setsubmittedOnSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Submission Date</p>
                  <img
                    className={`${
                      submittedOnSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* new app stage */}
              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p>New Application Stage</p>
                  {/* <img style={{ marginBottom: '8px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                </div>
              </th>
              {/* created on */}
              <th>
                <div
                  onClick={() => {
                    sortingData("created_on", setCreatedAtSpan);
                  }}
                  className="d-flex justify-content-between align-content-center"
                >
                  <p>Created On</p>
                  <img
                    className={`${
                      createdAtSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("accuring_bank", setAcquiringBankSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p> Acquiring Bank</p>
                  <img
                    className={`${
                      acquiringBankSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("note", setNoteSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Application Note</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      noteSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>

              <th style={{ minWidth: "100px", textAlign: "center" }}>
                <div>
                  <p style={{ marginBottom: "0px" }}>Action</p>
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
                    name="client_id"
                    onChange={handleFilterInput}
                    value={search["client_id"]}
                  />
                </div>
              </th>
              {userData.customer_type === "Partner Manager" && (
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
                      name="partner_manager"
                      onChange={handleFilterInput}
                      value={search["partner_manager"]}
                    />
                  </div>
                </th>
              )}
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
              {/* mobile */}
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
                    name="mobile"
                    onChange={handleFilterInput}
                    value={search["mobile"]}
                  />
                </div>
              </th>
              {/* submition date */}
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
                    name="submission_date"
                    onChange={handleFilterInput}
                    value={search["submission_date"]}
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
                      minWidth: "160px",
                      maxWidth: "160px",
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
              {/* acquire */}
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
                    name="accuring_bank"
                    onChange={handleFilterInput}
                    value={search["accuring_bank"]}
                  />
                </div>
              </th>
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
                    name="note"
                    onChange={handleFilterInput}
                    value={search["note"]}
                  />
                </div>
              </th>

              <th>
                {/* <div style={{ opacity: '0' }}>
                  <input type="text" className="top-input" />
                </div> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData?.length === 0 ? (
              <>
                <tr>
                  <td colSpan="14">
                    <div className="not_found">
                      <h4 className="my-4">No Data Found</h4>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {displayData?.map((app) => (
                  <tr key={app?.id}>
                    <td>{app.client_id}</td>
                    {userData.customer_type === "Partner Manager" && (
                      <td>{app?.partner_manager}</td>
                    )}
                    <td>
                      {app?.application_type}
                      {/* {app?.application_type ? (
                          <button
                            className="btn text-white"
                            style={{
                              backgroundColor: `${btnBg(
                                app?.application_type
                              )}`,
                            }}
                          >
                            {app?.application_type}
                          </button>
                        ) : (
                          ""
                        )} */}
                    </td>
                    <td>{app?.legal_name}</td>
                    <td>{app?.trading_name}</td>
                    <td>{app?.mobile}</td>
                    <td>{app?.submission_date}</td>
                    <td>
                      {app?.application_stage ? (
                        <button
                          className="btn text-white"
                          style={{
                            backgroundColor: `${btnBg(app?.application_stage)}`,
                          }}
                        >
                          {app?.application_stage}
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{app?.created_on}</td>

                    <td>{app?.accuring_bank}</td>
                    {app?.note?.length > 15 ? (
                      <>
                        {showId === null ? (
                          <td>
                            {app?.note.slice(0, 15)}...{" "}
                            <>
                              <br />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowId(app?.id)}
                              >
                                Show More
                              </span>
                            </>
                          </td>
                        ) : (
                          <>
                            {showId === app?.id ? (
                              <td>
                                {app?.note}{" "}
                                <>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "blue",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setShowId(null)}
                                  >
                                    Show less
                                  </span>
                                </>
                              </td>
                            ) : (
                              <td>
                                {app?.note.slice(0, 15)}...{" "}
                                <>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "blue",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setShowId(app?.id)}
                                  >
                                    Show More
                                  </span>
                                </>
                              </td>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <td>{app?.note}</td>
                    )}
                    {/* <td>{app?.created_on}</td>
                      <td>{app?.accuring_bank}</td>
                      <td>{app?.["ptsave_terminal_tracking_number"]}</td> */}

                    <td>
                      <div
                        className="d-flex gap-2 align-items-center justify-content-center"
                        style={{ fontSize: "19px" }}
                      >
                        <div
                          onClick={() => {
                            localStorage.setItem(
                              "allAppId",
                              app?.opportunityid
                            );
                            navigate(`/submitted-application-preview`);
                          }}
                          className="d-flex justify-content-center view_btn"
                        >
                          <BsEye />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
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
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
};

export default SubmittedApplication;
