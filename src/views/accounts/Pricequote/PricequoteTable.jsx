import React, { useEffect, useRef, useState } from "react";
import printer from "../../../assets/img/printer.svg";
import list from "../../../assets/img/tag.svg";
import arrow from "../../../EboardComponents/Custom/Arrow.svg";
import "../Leads/Leads.css";
import "./PriceQuote.css";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { showToast } from "src/utils/ToastHelper";
import axios from "axios";
import { CPagination, CPaginationItem } from "@coreui/react";
import { getTimeFormat } from "src/utils/CommonFunction";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Loader from "src/utils/Loader";
import {
  GetIndustryList,
  SetLeadsStatusFalse,
  SetLeadsTypeStatusFalse,
} from "../Leads/_redux/action/LeadAction";
import { useDispatch, useSelector } from "react-redux";
import {
  SetQuoteStatusFalse,
  convertApplication,
} from "./_redux/action/PriceQuoteAction";
import {
  GetAplicationDetails,
  SetApplicationStatusFalse,
} from "../NewApplication/_redux/action/ApplicationAction";
import Cookies from "js-cookie"; // Import js-cookie
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { GetAllProductList } from "src/views/common/_redux/action/CommonAction";
import Swal from "sweetalert2";
import { IoIosAdd } from "react-icons/io";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";


const PricequoteTable = () => {
  const cRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(Cookies.get("userData"));
  const checkQuoteQualify = useSelector(
    (state) => state.quoteInfo.checkQuoteQualify
  );
  const isLoadQuote = useSelector((state) => state.quoteInfo.isLoadQuote);
  const [updatedNote, setUpdatedNote] = useState("");
  const [currLead, setCurrLead] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [queryEx, setQueryEx] = useState("");
  const [query, setQuery] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [search, setSearch] = useState({
    client_id: "",
    acquiring_bank: "",
    oportunity_type: "",
    oportunity_stage1: "",
    oportunity_status1: "",
    trading_name: "",
    legal_name: "",
    created_at: "",
    note: "",
  });
  // span state
  const [sort, setSort] = useState("ASC");
  const [clientIdSpan, SetClientIdSpan] = useState(true);
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, SetTradingNameSpan] = useState(true);
  const [acquiringBankSpan, setAcquiringBankSpan] = useState(true);
  const [oportunityTypeSpan, setOportunityTypeSpan] = useState(true);
  const [oportunityStageSpan, setOportunityStageSpan] = useState(true);
  const [oportunityStatusSpan, setOportunityStatusSpan] = useState(true);
  const [createdAtSpan, setCreatedAtSpan] = useState(true);
  const [noteSpan, setNoteSpan] = useState(true);
  // paggination State
  const [totalData, setTotalData] = useState(0);
  const [total_item, setTotal_item] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);
  const indexOfLastPost = pageCount < pageNumber ? limit : pageNumber * limit;
  const offset = pageCount < pageNumber ? 0 : indexOfLastPost - limit;
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  // --------convert application-------------
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(SetLeadsStatusFalse());
    dispatch(SetLeadsTypeStatusFalse());
    dispatch(SetQuoteStatusFalse());
    dispatch(SetApplicationStatusFalse());
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
  React.useEffect(() => {
    if (checkQuoteQualify === true) {
      let application_id = localStorage.getItem("application_id");
      dispatch(GetAplicationDetails(application_id));
      navigate(`/application-retrive`);
      dispatch(SetQuoteStatusFalse());
    }
  }, [checkQuoteQualify]);
  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);

  const oportunity = {
    1: "New Application",
    2: "",
    3: "",
    4: "Change of Legal Entity",
    5: "Additional Outlet",
    6: "",
    7: "",
    8: "",
    9: "Multiple Outlets",
  };

  const aqBank = {
    0: "Elavon",
    1: "First Data",
    2: "Emerchantpay",
    3: "Worldpay",
  };

  const oprtunityStage = {
    0: {
      name: "NEW",
      bg: "bg-info",
    },
    1: {
      name: "QUOTED",
      bg: "bg-warning",
    },
    2: {
      name: "Contract Sent",
      bg: "bg-primary",
    },
    3: {
      name: "Contract Returned",
      bg: "bg-danger",
    },
    4: {
      name: "Sent for Processing",
      bg: "bg-light",
    },
    5: {
      name: "Lost",
      bg: "bg-Danger",
    },
  };

  const oprtunityStatus = {
    0: {
      name: "Call Back Arranged",
      bg: "bg-success",
    },
    1: {
      name: "Agreed in Principle",
      bg: "bg-warning",
    },
    2: {
      name: "Awaiting Docs",
      bg: "bg-primary",
    },
    3: {
      name: "Docs Received",
      bg: "bg-danger",
    },
    4: {
      name: "Future Opportunity",
      bg: "bg-light",
    },
    5: {
      name: "Already Signed with Competitor",
      bg: "bg-Danger",
    },
    6: {
      name: "Not Competitive",
      bg: "bg-Danger",
    },
    7: {
      name: "Not Compatible",
      bg: "bg-Danger",
    },
  };

  const [sortFieldName, setSortFieldName] = useState("");
  const [unChangedLead, setUnchangedLead] = useState([]);

  // calling api
  const getNewQuotes = (url) => {
    axios
      .get(url)
      .then((res) => {
        setIsLoading(true);
        setUnchangedLead(res?.data?.data?.results);
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          // created_at: curr?.created_at?.split('T')[0],
          created_at: getTimeFormat(curr?.created_at),
          client_id:
            curr?.client_id === null || curr?.client_id === undefined
              ? " "
              : curr?.client_id,
          oportunity_type: oportunity[curr.application_type],
          acquiring_bank: aqBank[curr?.acquiring_bank],
          oportunity_stage1: oprtunityStage[curr?.opportunity_stage].name,
          oportunity_status1: oprtunityStatus[curr?.opportunity_status].name,
          note: !curr?.note ? "" : curr?.note,
        }));
        setTotal_item(res.data?.data?.count);
        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setQuotes(newData);
        setIsLoading(false);
        console.log(newData);
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
  useEffect(() => {
    getNewQuotes(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/quote/quote/?is_closed=false&query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}`
    );
  }, [pageNumber, itemPerPage, sort, sortFieldName]);
  const handleSearchApi = () => {
    setIsLoading(true);
    getNewQuotes(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/quote/quote/?is_closed=false&query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}`
    );
  };

  const handleSearchApiQuery = () => {
    setIsLoading(true);
    getNewQuotes(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/quote/quote/?is_closed=false&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}`
    );
  };

  const changeStatus = (name, value, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${data.slug}/`;
    const getObj = unChangedLead?.filter((unCh) => data?.id === unCh?.id)[0];

    const newObj = {
      ...getObj,
      quote_docs: [],
      opportunity_stage: value,
    };
    // newObj["opportunity_stage"] = value;

    axios
      .put(url, newObj)
      .then((res) => {
        setIsLoading(true);
        if (res.data.status) {
          getNewQuotes(
            `${
              process.env.REACT_APP_BASE_URL
            }api/v1/quote/quote/?is_closed=false&query=${query}&sort_by=${sortFieldName}&asc=${
              sort === "ASC" ? "True" : "False"
            }&limit=${limit}&offset=${offset}`
          );
          showToast("success", `${name} updated succesfully`);
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else {
          const message = JSON.parse(err.request.response).message;
          const errorMsg = JSON.parse(err.request.response).errors;
          for (let value of Object.values(errorMsg)) {
            showToast("error", value[0]);
          }

          showToast("error", message);

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
            navigate("/login");
          } else if (
            JSON.parse(err.request.response).code !== 401 ||
            JSON.parse(err.request.response).code !== 200 ||
            JSON.parse(err.request.response).code !== 201
          ) {
            setQuotes([]);
            setIsLoading(false);
          }
        }
      });
  };
  const changeStatus2 = (name, value, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${data.slug}/`;
    const getObj = unChangedLead?.filter((unCh) => data?.id === unCh?.id)[0];
    console.log(getObj, "ids");
    console.log(value, "ids 1");
    console.log(name, "ids 2");

    const newObj = {
      ...getObj,
      quote_docs: [],
      opportunity_stage: value,
    };
    // newObj["oportunity_stage"] = value;
    console.log(newObj, "ids3");
    const newObj2 = {
      ...getObj,
      quote_docs: [],
    };
    newObj2["opportunity_status"] = value;
    axios
      .put(url, newObj2)
      .then((res) => {
        setIsLoading(true);
        if (res.data.status) {
          getNewQuotes(
            `${
              process.env.REACT_APP_BASE_URL
            }api/v1/quote/quote/?query=${query}&sort_by=${sortFieldName}&asc=${
              sort === "ASC" ? "True" : "False"
            }&limit=${limit}&offset=${offset}`
          );
          showToast("success", `${name} updated succesfully`);
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else {
          const message = JSON.parse(err.request.response).message;
          const errorMsg = JSON.parse(err.request.response).errors;
          for (let value of Object.values(errorMsg)) {
            showToast("error", value[0]);
          }

          showToast("error", message);

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
            navigate("/login");
          } else if (
            JSON.parse(err.request.response).code !== 401 ||
            JSON.parse(err.request.response).code !== 200 ||
            JSON.parse(err.request.response).code !== 201
          ) {
            setQuotes([]);
            setIsLoading(false);
          }
        }
      });
  };
  const changeNote = (name, value, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${data.slug}/`;
    const getObj = unChangedLead?.filter((unCh) => data?.id === unCh?.id)[0];

    const newObj3 = {
      ...getObj,
      note: value,
    };
    axios
      .put(url, newObj3)
      .then((res) => {
        setIsLoading(true);
        if (res.data.status) {
          getNewQuotes(
            `${
              process.env.REACT_APP_BASE_URL
            }api/v1/quote/quote/?query=${query}&sort_by=${sortFieldName}&asc=${
              sort === "ASC" ? "True" : "False"
            }&limit=${limit}&offset=${offset}`
          );
          showToast("success", `${name} updated succesfully`);
          setShow(false);
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else {
          const message = JSON.parse(err.request.response).message;
          const errorMsg = JSON.parse(err.request.response).errors;
          for (let value of Object.values(errorMsg)) {
            showToast("error", value[0]);
          }

          showToast("error", message);

          if (
            message === "Invalid token." ||
            JSON.parse(err.request.response).code === 401
          ) {
            showToast("success", "Invalid Token");
            navigate("/login");
          } else if (
            JSON.parse(err.request.response).code !== 401 ||
            JSON.parse(err.request.response).code !== 200 ||
            JSON.parse(err.request.response).code !== 201
          ) {
            setQuotes([]);
            setIsLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
    GetIndustryList();
  }, []);

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
  // filtering
  const displayData = quotes
    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        search?.oportunity_status1 === "" ||
        search?.oportunity_stage1 === "" ||
        search?.oportunity_type === "" ||
        search?.mobile === "" ||
        fill?.client_id === null
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
        fill.client_id?.toLowerCase().includes(search.client_id.toLowerCase())
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
        fill.oportunity_type
          ?.toLowerCase()
          .includes(search.oportunity_type.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.oportunity_stage1
          ?.toLowerCase()
          .includes(search.oportunity_stage1.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.oportunity_status1
          ?.toLowerCase()
          .includes(search.oportunity_status1.toLowerCase())
      ) {
        return fill;
      }
    });

  // paggination code
  // paggination function
  const handlePaginationPrevious = () => {
    setIsLoading(true);
    getNewQuotes(prevUrl);

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
    getNewQuotes(nextUrl);
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

  // print pdf
  const HandlePrint = useReactToPrint({
    content: () => cRef.current,
    documentTitle: "Leads List",
    bodyClass: "dis",
  });
  // Loader addad
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {isLoadQuote && (
        <>
          <Loader />
          <Backdrop
            open
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            Opportunities
          </h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          {userData.customer_type !== "Partner Manager" && (
            <button
              onClick={() => Swal.fire("Comming Soon")}
              className="btn basic_btn me-3"
              style={{ fontSize: "18px" }}
            >
              <IoIosAdd style={{ fontSize: " 28px" }} />
              Add Opportunities
            </button>
          )}{" "}
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
        <div className="col-12 col-md-6 d-flex align-items-center  my-2">
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
      {/* -----------Opportunities table-------- */}
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
              <th>
                <div
                  onClick={() => {
                    sortingData("oportunity_type", setOportunityTypeSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Opportunity Type</p>
                  <img
                    className={`${
                      oportunityTypeSpan === false ? "rotate" : "rotate-back"
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
                    sortingData("acquiring_bank", setAcquiringBankSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Acquiring Bank</p>
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
                    sortingData("legal_name", SetLegalNameSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p className="ms-4">Legal Name</p>

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
                    sortingData("oportunity_stage1", setOportunityStageSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Opportunity Stage</p>
                  <img
                    className={`${
                      oportunityStageSpan === false ? "rotate" : "rotate-back"
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
                    sortingData("oportunity_status1", setOportunityStatusSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Opportunity Status</p>
                  <img
                    className={`${
                      oportunityStatusSpan === false ? "rotate" : "rotate-back"
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
                    sortingData("created_at", setCreatedAtSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
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
                  style={{ minWidth: "160px", textAlign: "center" }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                  onClick={() => {
                    sortingData("note", setNoteSpan);
                  }}
                >
                  <p>Opportunity Notes</p>
                  <img
                    className={`${
                      noteSpan === false ? "rotate" : "rotate-back"
                    }`}
                    style={{ marginBottom: "8px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              <th style={{ minWidth: "190px", textAlign: "center" }}>
                <div className="d-flex justify-content-center gap-2 align-items-center">
                  <p style={{ marginBottom: "0px" }}>
                    Convert To New Application
                  </p>
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
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["client_id"]}
                  />
                </div>
              </th>
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
                    name="oportunity_type"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["oportunity_type"]}
                  />
                </div>
              </th>
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
                    name="acquiring_bank"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["acquiring_bank"]}
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "180px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="legal_name"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["legal_name"]}
                  />
                </div>
              </th>
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
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["trading_name"]}
                  />
                </div>
              </th>
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
                    name="oportunity_stage1"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["oportunity_stage1"]}
                  />
                </div>
              </th>
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "180px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="oportunity_status1"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["oportunity_status1"]}
                  />
                </div>
              </th>
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
                    name="note"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["note"]}
                  />
                </div>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {
            // isLoading ? <Table404/> :

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
                displayData?.map((quote) => (
                  <>
                    <tr key={quote?.client_id}>
                      <td>{quote?.client_id}</td>
                      <td>{quote?.oportunity_type}</td>
                      <td>{quote?.acquiring_bank}</td>
                      <td>{quote?.legal_name}</td>
                      <td>{quote?.trading_name}</td>
                      <td>
                        <select
                          name=""
                          id=""
                          value={quote?.opportunity_stage}
                          style={{
                            height: "100%",
                            margin: "auto",
                            padding: "3px 17px",
                          }}
                          className="lead-select"
                          onChange={(e) =>
                            changeStatus(
                              "oportunity_stage",
                              Number(e.target.value),
                              quote
                            )
                          }
                        >
                          <option>Select..</option>
                          <option value={0}>NEW</option>
                          <option value={1}>QUOTED</option>
                          <option value={2}>Contract Sent</option>
                          <option value={3}>Contract Returned</option>
                          <option value={4}>Sent for Processing</option>
                          <option value={5}>Lost</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name=""
                          id=""
                          value={quote?.opportunity_status}
                          style={{
                            height: "100%",
                            margin: "auto",
                            padding: "3px 17px",
                          }}
                          className="lead-select"
                          onChange={(e) =>
                            changeStatus2(
                              "oportunity_status",
                              Number(e.target.value),
                              quote
                            )
                          }
                        >
                          <option>Select..</option>
                          <option value={0}>Call Back Arranged</option>
                          <option value={1}>Agreed in Principle</option>
                          <option value={2}>Awaiting Docs</option>
                          <option value={3}>Docs Received</option>
                          <option value={4}>Future Opportunity</option>
                          <option value={5}>
                            Already Signed with Competitor
                          </option>
                          <option value={6}>Not Competitive</option>
                          <option value={7}>Not Compatible</option>
                        </select>
                      </td>
                      <td>{quote?.created_at}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                        }}
                      >
                        {userData?.customer_type !== "Partner Manager" ? (
                          <>
                            {quote?.note ? (
                              <div
                                className="full-main "
                                style={{ cursor: "pointer" }}
                              >
                                <div className="full">
                                  <span>
                                    {/* {lead.note} */}
                                    {quote?.note.length > 15
                                      ? `${quote?.note.slice(0, 15)}... `
                                      : quote?.note}
                                  </span>

                                  <span className="edit-div">
                                    <span
                                      onClick={() => {
                                        setUpdatedNote(
                                          quote?.note ? quote?.note : ""
                                        );
                                        setCurrLead(quote);
                                        handleShow();
                                      }}
                                      className="sp-2 d-flex justify-content-center edit_btn"
                                    >
                                      <BiEdit />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <button
                                  onClick={() => {
                                    setUpdatedNote(
                                      quote?.note ? quote?.note : ""
                                    );
                                    setCurrLead(quote);
                                    handleShow();
                                  }}
                                  className="btn btn-info btn-sm"
                                >
                                  Add Note
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          quote.note
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-primary "
                          onClick={() => {
                            dispatch(convertApplication(quote.slug));
                          }}
                        >
                          New Application
                        </button>
                      </td>

                      <td>
                        <div
                          className="d-flex gap-2 align-items-center justify-content-center"
                          style={{ fontSize: "19px" }}
                        >
                          {userData?.customer_type !== "Partner Manager" && (
                            <div
                              onClick={() => {
                                localStorage.setItem("quoteId", quote?.slug);

                                navigate(`/opportunity-retrive`);
                              }}
                              className="d-flex justify-content-center edit_btn"
                            >
                              <BiEdit />
                            </div>
                          )}

                          <div
                            onClick={() => {
                              localStorage.setItem("quoteId", quote?.slug);
                              navigate(`/opportunity-preview`);
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
          }
        </table>
      </div>
      {/* ---------paggination----------  */}

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
      {/* pdf table */}
      <div style={{ display: "none" }}>
        <div className="table-container mt-2 dis">
          <table
            ref={cRef}
            className="table table-striped table-hover table-bordered"
          >
            <thead>
              <h6 className="my-2" style={{ minWidth: "200px" }}>
                Opportunities Pdf{" "}
              </h6>
            </thead>
            <thead style={{ color: "black" }}>
              <tr className="height">
                <th style={{ minWidth: "100px" }}>
                  <div>
                    <p style={{ textAlign: "center" }}>Client ID</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Opportunity Type</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Acquiring Bank</p>
                  </div>
                </th>
                <th className="sp-th">
                  <div className="d-flex justify-content-between align-content-center">
                    <p className="ms-2">Legal Name</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Trading Name</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Opportunity Stage</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Opportunity Status</p>
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
                displayData?.map((quote) => (
                  <>
                    <tr key={quote?.client_id}>
                      <td>{quote?.client_id}</td>
                      <td>{quote?.oportunity_type}</td>
                      <td>{quote?.acquiring_bank}</td>
                      <td>{quote?.legal_name}</td>
                      <td>{quote?.trading_name}</td>
                      <td>{quote?.oportunity_stage1}</td>
                      <td>{quote?.oportunity_status1}</td>
                      <td>{quote?.created_at}</td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Opportunity Note</label>
                  <div className="mt-2 ">
                    <FloatingLabel controlId="floatingTextarea2">
                      <Form.Control
                        as="textarea"
                        placeholder="write note here"
                        style={{ height: "100px" }}
                        value={updatedNote}
                        onChange={(e) => setUpdatedNote(e.target.value)}
                        className="p-1 "
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => changeNote("note", updatedNote, currLead)}
            >
              Update
            </Button>
            <Button variant="info" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default PricequoteTable;
