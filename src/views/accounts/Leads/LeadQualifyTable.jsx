import React, { useEffect, useRef, useState } from "react";
import list from "../../../assets/img/list.svg";
import printer from "../../../assets/img/printer.svg";
import { useNavigate } from "react-router-dom";
import "./Leads.css";

import arrow from "../../../EboardComponents/Custom/Arrow.svg";

import axios from "axios";
import { showToast } from "src/utils/ToastHelper";

import { CPagination, CPaginationItem } from "@coreui/react";

import { useReactToPrint } from "react-to-print";
import { getTimeFormat } from "src/utils/CommonFunction";
import {
  SetLeadsStatusFalse,
  SetLeadsTypeStatusFalse,
} from "./_redux/action/LeadAction";
import { useDispatch } from "react-redux";
import Loader from "src/utils/Loader";

import { BsEye } from "react-icons/bs";
import { Button, Modal } from "react-bootstrap";

import Cookies from "js-cookie"; // Import js-cookie
const LeadQualifyTable = () => {
  const cRef = useRef();
  const [queryEx, setQueryEx] = useState("");

  const [currLead, setCurrLead] = useState({});
  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [unChangedLead, setUnchangedLead] = useState([]);
  // initial data and Loader
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);

  const [search, setSearch] = useState({
    client_id: "",
    trading_name: "",
    legal_name: "",
    created_at: "",
    lead_status_name: "",
    lead_stage_name: "",
    mobile: "",
    trading_full_address: "",
    note: "",
    lead_type_name: "",
    callback_date: "",
  });
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(SetLeadsStatusFalse());
    dispatch(SetLeadsTypeStatusFalse());
  }, []);

  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const [showId, setShowId] = useState(null);
  // span state
  const [sort, setSort] = useState("ASC");
  const [sortFieldName, setSortFieldName] = useState("");

  const [tradingNameSpan, SetTradingNameSpan] = useState(true);

  const [mobileSpan, setMobileSpan] = useState(true);
  const [leadStageSpan, setLeadStageSpan] = useState(true);
  const [leadStatusSpan, setLeadStatusSpan] = useState(true);
  const [createdAtSpan, setCreatedAtSpan] = useState(true);
  const [noteSpan, setNoteSpan] = useState(true);

  // paggination State
  const [itemPerPage, setItemPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [total_item, setTotal_item] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);
  const indexOfLastPost = pageCount < pageNumber ? limit : pageNumber * limit;
  const offset = pageCount < pageNumber ? 0 : indexOfLastPost - limit;
  const [pdfData, setPdfData] = useState([]);

  const getNewLeads = (url) => {
    axios
      .get(url)
      .then((res) => {
        // setIsLoading(true)
        setUnchangedLead(res?.data?.data?.results);
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr?.created_at),
          lead_type_name:
            curr?.lead_type === 0
              ? "Hot"
              : curr?.lead_type === 1
              ? "Cold"
              : "Warm",
          client_id: curr?.client_id === null ? "N/A" : curr?.client_id,
          note: !curr?.note ? "" : curr?.note,
          callback_date:
            curr?.callback_date === null
              ? ""
              : getTimeFormat(curr?.callback_date),
        }));
        // console.log('leads', res)
        setTotal_item(res.data?.data?.count);
        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setLeads(newData);
        setIsLoading(false);
        const time = res?.data?.data?.results[0].created_at;
        // console.log(time, 'time')
      })
      .catch((err) => {
        // const message = JSON.parse(err.request?.response)?.message;
        // if (
        //   message === "Invalid token." ||
        //   JSON.parse(err.request.response).code === 401
        // ) {
        //   showToast("success", "Invalid Token");
        //   navigate("/login");
        // } else if (
        //   JSON.parse(err.request.response).code !== 401 ||
        //   JSON.parse(err.request.response).code !== 200 ||
        //   JSON.parse(err.request.response).code !== 201
        // ) {
        //   setLeads([]);
        //   setIsLoading(false);
        // }
        setLeads([]);
        setIsLoading(false);
        console.log(err);
      });
  };
  const getNewLeadsPdf = (url) => {
    axios
      .get(url)
      .then((res) => {
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr?.created_at),
          lead_type_name:
            curr?.lead_type === 0
              ? "Hot"
              : curr?.lead_type === 1
              ? "Cold"
              : "Warm",
          client_id: curr?.client_id === null ? "N/A" : curr?.client_id,
          note: !curr?.note ? "" : curr?.note,
          callback_date:
            curr?.callback_date === null
              ? ""
              : getTimeFormat(curr?.callback_date),
        }));
        setPdfData(newData);
      })
      .catch((err) => {
        // const message = JSON.parse(err.request?.response)?.message;
        // if (
        //   message === "Invalid token." ||
        //   JSON.parse(err.request.response).code === 401
        // ) {
        //   showToast("success", "Invalid Token");
        //   navigate("/login");
        // } else if (
        //   JSON.parse(err.request.response).code !== 401 ||
        //   JSON.parse(err.request.response).code !== 200 ||
        //   JSON.parse(err.request.response).code !== 201
        // ) {
        //   setLeads([]);
        //   setIsLoading(false);
        // }
        setLeads([]);
        setIsLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getNewLeads(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&application_status=0&limit=${limit}&offset=${offset}&is_closed=true`
    );
  }, [pageNumber, itemPerPage, sort, sortFieldName]);
  const handleSearchApi = () => {
    
    setIsLoading(true);
    getNewLeads(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&application_status=0&limit=${limit}&offset=${offset}&is_closed=true`
    );
   
  };
  const handleSearchApiQuery = () => {
    
    setIsLoading(true);
    getNewLeads(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?query=${''}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&application_status=0&limit=${limit}&offset=${offset}&is_closed=true`
    );
   
  };
  useEffect(() => {
    getNewLeadsPdf(
      `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/?application_status=0&limit=${total_item}&is_closed=true`
    );
  }, [total_item]);
  // sorting
  const sortingData = (sortBy, stateSpan) => {
    if (sort === "ASC") {
      setSortFieldName(sortBy);
      setSort("DSC");
      stateSpan(!true);
    } else if (sort === "DSC") {
      setSort("ASC");
      stateSpan(!false);
      setSortFieldName(sortBy);
    }
  };

  const displayData = leads
    // ?.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)))
    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        search?.lead_status_name === "" ||
        search?.lead_stage_name === "" ||
        search?.trading_full_address === "" ||
        search?.mobile === "" ||
        fill?.client_id === null
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
        fill.callback_date
          ?.toLowerCase()
          .includes(search.callback_date.toLowerCase())
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
        fill.trading_name
          ?.toLowerCase()
          .includes(search.trading_name.toLowerCase())
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
        fill.lead_status_name
          ?.toLowerCase()
          .includes(search.lead_status_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.lead_stage_name
          ?.toLowerCase()
          .includes(search.lead_stage_name.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.trading_full_address
          ?.toLowerCase()
          .includes(search.trading_full_address.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (fill.mobile?.toLowerCase().includes(search.mobile.toLowerCase())) {
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
        fill.lead_type_name
          ?.toLowerCase()
          .includes(search.lead_type_name.toLowerCase())
      ) {
        return fill;
      }
    });
  // paggination function
  const handlePaginationPrevious = () => {
    setIsLoading(true);
    getNewLeads(prevUrl);

    setPageNumber((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };
  const handlePaginationNext = () => {
    setIsLoading(true);
    getNewLeads(nextUrl);
    setPageNumber((prev) => prev + 1);
  };
  const handleChangeCurrentPage = (val) => {
    setIsLoading(true);
    setPageNumber(val);
  };

  useEffect(() => {
    if (pageCount !== 0) {
      if (pageCount < pageNumber) {
        setPageNumber(pageCount);
      }
    }
  }, [pageCount]);

  // change status

  // print pdf
  const HandlePrint = useReactToPrint({
    content: () => cRef.current,
    documentTitle: "Converted Leads",
    bodyClass: "dis",
  });

  // loader
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            Leads Converted To Opportunity
          </h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <img
            onClick={HandlePrint}
            style={{ cursor: "pointer" }}
            src={printer}
            width="32"
            alt=""
          />
        </div>
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-6 d-flex align-items-center ">
          <span style={{ color: "#81AAD2" }} className="me-2">
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
            className="btn btn-primary ms-2 btn-sm"
            onClick={handleSearchApi}
          >
            Search
          </button>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <div className="d-flex align-items-center">
            <span style={{ color: "#81AAD2" }} className="me-2">
              Item Per Page :
            </span>{" "}
            {/* <select defaultValue={10} onChange={(e) => setItemPerPage(e.target.value)} className="top-input"> */}
            <select
              defaultValue={itemPerPage}
              onChange={(e) => setItemPerPage(e.target.value)}
              className="top-input"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
      </div>
      {/* -----------Leads Table here----------- */}
      <div className="table-container mt-2">
        <table className="table table-striped table-hover table-bordered">
          <thead style={{ color: "black" }}>
            <tr className="height">
              <th>
                <div
                  onClick={() => {
                    sortingData("trading_name", SetTradingNameSpan);
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
              {/* note Should be Here  */}
              <th style={{ minWidth: "160px", textAlign: "center" }}>
                <div
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("note", setNoteSpan);
                  }}
                >
                  <p>Leads Notes </p>
                  <img
                    className={`${
                      noteSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("lead_stage", setLeadStageSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Lead Stage</p>
                  <img
                    className={`${
                      leadStageSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("lead_status_name", setLeadStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Lead Status</p>
                  <img
                    className={`${
                      leadStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>

              <th>
                <div className="d-flex justify-content-center">
                  <p>Lead Quality</p>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-center">
                  <p>Callback Date</p>
                </div>
              </th>
              <th>
                <div
                  onClick={() => {
                    sortingData("created_at", setCreatedAtSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Created On</p>
                  <img
                    className={`${
                      createdAtSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>

              <th style={{ minWidth: "160px", textAlign: "center" }}>
                <div className="d-flex justify-content-center align-items-center">
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
                      minWidth: "140px",
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="trading_name"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["trading_name"]}
                  />
                </div>
              </th>
              {/* address */}

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
                    name="mobile"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["mobile"]}
                  />
                </div>
              </th>
              {/* note Should be here */}
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "200px",
                      maxWidth: "200px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="note"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["note"]}
                  />
                </div>
              </th>
              {/* lead Stage */}
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
                    name="lead_stage_name"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["lead_stage_name"]}
                  />
                </div>
              </th>
              {/* lead status */}
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
                    name="lead_status_name"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["lead_status_name"]}
                  />
                </div>
              </th>

              <th>
                <div>
                  <input
                    style={{
                      minWidth: "200px",
                      maxWidth: "200px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="lead_type_name"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["lead_type_name"]}
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "200px",
                      maxWidth: "200px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="callback_date"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["callback_date"]}
                  />
                </div>
              </th>
              {/* created at */}
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
                    name="created_at"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["created_at"]}
                  />
                </div>
              </th>

              <th></th>
            </tr>
          </thead>
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
              displayData?.map((lead) => (
                <>
                  <tr key={lead?.client_id}>
                    <td>{lead?.trading_name}</td>
                    <td>
                      {lead?.mobile.startsWith("0")
                        ? lead.mobile
                        : 0 + lead.mobile}
                    </td>
                    {lead?.note?.length > 15 ? (
                      <>
                        {showId === null ? (
                          <td>
                            {lead?.note.slice(0, 15)}...{" "}
                            <>
                              <br />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                onClick={() => setShowId(lead?.id)}
                              >
                                Show More
                              </span>
                            </>
                          </td>
                        ) : (
                          <>
                            {showId === lead?.id ? (
                              <td>
                                {lead?.note}{" "}
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
                                {lead?.note.slice(0, 15)}...{" "}
                                <>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "blue",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setShowId(lead?.id)}
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
                      <td>{lead?.note}</td>
                    )}
                    <td>{lead?.lead_stage_name}</td>
                    <td>{lead?.lead_status_name}</td>
                    <td>{lead?.lead_type_name}</td>
                    <td>{lead?.callback_date}</td>
                    <td>{lead?.created_at}</td>

                    <td>
                      <div
                        className="d-flex gap-2 align-items-center justify-content-center"
                        style={{ fontSize: "19px" }}
                      >
                        <div
                          onClick={() => {
                            localStorage.setItem("leadId", lead?.slug);
                            // localStorage.setItem("leadId", lead?.id);
                            navigate(`/qualified-leads-preview`);
                          }}
                          className="d-flex justify-content-center view_btn"
                        >
                          <BsEye />
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* ------------paggination-------------- */}
      {total_item !== 0 && (
        <div className="mt-2 d-flex justify-content-start">
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              disabled={prevUrl === null}
              onClick={handlePaginationPrevious}
              aria-label="Previous"
              style={{ cursor: `${prevUrl !== null && "pointer"}` }}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            {[...Array(pageCount)].map((elem, index) => (
              <CPaginationItem
                style={{ cursor: "pointer" }}
                className={` pointer ${
                  index + 1 === pageNumber ? "active" : "paggiItem"
                }`}
                key={index}
                onClick={() => handleChangeCurrentPage(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}

            <CPaginationItem
              disabled={nextUrl === null}
              onClick={handlePaginationNext}
              aria-label="Next"
              style={{ cursor: `${nextUrl !== null && "pointer"}` }}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </div>
      )}
      {/* table for pdf  */}
      <div style={{ display: "none" }}>
        <div className="table-container mt-2 dis">
          <table
            ref={cRef}
            className="table table-striped table-hover table-bordered"
          >
            <thead>
              <h6 className="my-2" style={{ minWidth: "200px" }}>
                Leads Converted
              </h6>
            </thead>
            <thead style={{ color: "black" }}>
              <tr className="height">
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Trading Name</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Mobile No</p>
                  </div>
                </th>
                <th className="sp-th">
                  <div className="d-flex justify-content-between align-content-center">
                    <p className="ms-2">Leads Notes</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Lead Stage</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Lead Quality</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Callback Date</p>
                  </div>
                </th>
                <th style={{ minWidth: "120px", maxWidth: "120px" }}>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Created On</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pdfData?.length === 0 ? (
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
                pdfData?.map((lead) => (
                  <>
                    <tr key={lead?.client_id}>
                      <td>{lead?.trading_name}</td>
                      <td>
                        {lead?.mobile.startsWith("0")
                          ? lead.mobile
                          : 0 + lead.mobile}
                      </td>
                      <td>
                        <span>{lead?.note}</span>
                      </td>
                      <td>{lead?.lead_stage_name}</td>
                      <td>{lead?.lead_type_name}</td>
                      <td>{lead?.callback_date}</td>
                      <td>{lead?.created_at}</td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Qualifies Lead
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Leads Notes</h4>
          <p className="mt-3" style={{ overflowX: "hidden" }}>
            {currLead?.note}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeadQualifyTable;
