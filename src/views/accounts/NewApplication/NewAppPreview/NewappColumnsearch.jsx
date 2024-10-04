import React, { useEffect, useState } from "react";
import printer from "../../../assets/img/printer.svg";
import list from "../../../assets/img/new-document.svg";

import arrow from "../../../EboardComponents/Custom/Arrow.svg";
import "../Leads/Leads.css";

import { showToast } from "src/utils/ToastHelper";
import axios from "axios";

import {
  CPagination,
  CPaginationItem,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
  CDropdown,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";
import { getTimeFormat } from "src/utils/CommonFunction";
import {
  GetAplicationDetails,
  GetApplicationInput,
  GetApplicationList,
  GetBusinessDetails,
  SetApplicationStatusFalse,
  SetApplicationStatusFalse2,
  SetsignStatusFalse,
} from "./_redux/action/ApplicationAction";
import { useDispatch, useSelector } from "react-redux";
import { SetQuoteStatusFalse } from "../Pricequote/_redux/action/PriceQuoteAction";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import { IoIosAdd } from "react-icons/io";
import {
  GET_APPLICATION_LIST,
  GET_BANK_DETAILS,
  GET_DEBIT_BANK_DETAILS,
} from "./_redux/types/Types";
import Cookies from "js-cookie"; // Import js-cookie
import { Autocomplete, TextField } from "@mui/material";
import { GET_COMPANY_OFFICERS_DETAILS } from "../Leads/_redux/types/Types";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

const NewApplication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(Cookies.get("userData"));
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const isLoadApplication = useSelector(
    (state) => state.applicationInfo.isLoadApplication
  );
  const isLoadBusiness = useSelector(
    (state) => state.applicationInfo.isLoadBusiness
  );
  const applicationList = useSelector(
    (state) => state.applicationInfo.applicationList || []
  );
  //modal
  const [visible, setVisible] = useState(false);
  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  // filter
  const [query, setQuery] = useState("");
  const [queryEx, setQueryEx] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [search, setSearch] = useState({
    client_id: "",
    acquiring_bank: "",
    trading_name: "",
    legal_name: "",
    created_at: "",
    mobile: "",
    submitted_on: "",
    note: "",
    application_type: "",
    application_stage: "",
    partner_manager_name: "",
  });

  useEffect(() => {
    dispatch(SetApplicationStatusFalse());
    dispatch(SetQuoteStatusFalse());
    dispatch(SetsignStatusFalse());
    dispatch(SetApplicationStatusFalse2());
    dispatch({ type: GET_BANK_DETAILS, payload: [] });
    dispatch({ type: GET_DEBIT_BANK_DETAILS, payload: [] });
    dispatch({ type: GET_APPLICATION_LIST, payload: [] });
    dispatch({ type: GET_COMPANY_OFFICERS_DETAILS, payload: [] });
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

  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  // span state
  const [sort, setSort] = useState("ASC");
  const [clientIdSpan, SetClientIdSpan] = useState(true);
  const [legalNameSpan, SetLegalNameSpan] = useState(true);
  const [tradingNameSpan, SetTradingNameSpan] = useState(true);
  const [mobileSpan, setMobileSpan] = useState(true);
  const [createdAtSpan, setCreatedAtSpan] = useState(true);
  const [acquiringBankSpan, setAcquiringBankSpan] = useState(true);
  const [noteSpan, setNoteSpan] = useState(true);
  const [partnerSpan, setPartnerSpan] = useState(true);

  // paggination State
  const [totalData, setTotalData] = useState(0);
  const [total_item, setTotal_item] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);
  const indexOfLastPost = pageCount < pageNumber ? limit : pageNumber * limit;
  const offset = pageCount < pageNumber ? 0 : indexOfLastPost - limit;
  const appType = {
    1: "New Application",
    2: "New Ecom App",
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

  const appStage = {
    0: {
      name: "New Application",
      bg: "btn-success",
    },
    1: {
      name: "Submitted to PS",
      bg: "btn-info",
    },
    2: {
      name: "PS Query",
      bg: "btn-danger",
    },
    3: {
      name: "Waiting to fill up the form",
      bg: "btn-secondary",
    },
    4: {
      name: "Waiting to send for Esign",
      bg: "btn-warning",
    },
    5: {
      name: "Sent for Esign",
      bg: "btn-warning",
    },
    6: {
      name: "Application signed back",
      bg: "btn-success",
    },
    7: {
      name: "Sent to Bank",
      bg: "btn-success",
    },
    8: {
      name: "SUBMISSION ERRORED",
      bg: "bg-danger",
    },
  };
  const btnBg = (data) => {
    if (data === "Sent for Esign") return "#F9B115";
    if (data === "Waiting to fill up the form") return "#9DA5B1";
    if (data === "Waiting to send for Esign") return "#F9B115";
    if (data === "Application signed back") return "#66BB6A";
    if (data === "Sent to Bank") return "#2EB85C";
    if (data === "PS Query") return "#D32F2F";

    if (data === "Submitted to PS") return "#38B6FF";
    if (data === "Additional Location + E Comm") return "#ffc107";
    // if (data === "New App") return "#28a745";
    if (data === "Not Paid") return "#dc3545";
    if (data === "Active") {
      return "#28a745";
    } else if (data === "Inactive") {
      return "#dc3545";
    } else if (data === "Sent to Bank") {
      return "#007bff";
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
  const [sortFieldName, setSortFieldName] = useState("");
  const [showId, setShowId] = useState(null);
  const [searchApp, setSearchApp] = useState({
    legal_name: "",
    trading_name: "",
    client_id: "",
    mobile: "",
    created_at: "",
    partner_manager_name: "",
  });

  const handleChangeInput = (fieldName, value) => {
    setSearchApp((prevState) => ({
      ...prevState, // This spreads the previous state to maintain other field values
      [fieldName]: value, // This updates the field based on the fieldName and value passed
    }));
  };

  const getNewApplications = (url) => {
    axios
      .get(url)
      .then((res) => {
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr?.created_at),
          application_status1:
            curr?.applicaiton_stage === null || curr?.applicaiton_stage === ""
              ? "New Application"
              : appStage[curr?.applicaiton_stage].name,
          // : curr?.created_at?.split('T')[0],
          client_id:
            curr?.client_id === null || curr?.client_id === undefined
              ? ""
              : curr?.client_id,
          note:
            curr?.note === null || curr?.note === undefined ? "" : curr?.note,
          acquiring_bank: aqBank[curr?.acquiring_bank],
          application_type: appType[curr?.application_type],
          submitted_on:
            curr?.submitted_on === null || curr?.submitted_on === undefined
              ? ""
              : getTimeFormat(curr?.submitted_on),
        }));
        setTotal_item(res.data?.data?.count);
        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setApplications(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        if(err.response === undefined){
          showToast("error", "Server error");
        }
        else{
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
  // calling all data
  useEffect(() => {
    getNewApplications(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/application/applications/new/?query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}`
    );
  }, [pageNumber, itemPerPage, sort, sortFieldName]);

  const handleSearchApi = () => {
    // if(query){
    setIsLoading(true);
    getNewApplications(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/application/applications/new/?query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}`
    );
    // }
    // else{
    //   showToast('error','Type text first')
    // }
  };
  const handleSearchApiQuery = () => {
    // if(query){
    setIsLoading(true);
    getNewApplications(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/application/applications/new/?query=${""}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}`
    );
    // }
    // else{
    //   showToast('error','Type text first')
    // }
  };
  // sorting data
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

  const displayData = applications
    // ?.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)))
    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        search?.client_id === "" ||
        search?.application_type === "" ||
        search?.mobile === "" ||
        search?.submitted_on === "" ||
        search?.note === ""
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
        fill.created_at?.toLowerCase().includes(search.created_at.toLowerCase())
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
        fill.application_type
          ?.toLowerCase()
          .includes(search.application_type.toLowerCase())
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
        fill.submitted_on
          ?.toLowerCase()
          .includes(search.submitted_on.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.acquiring_bank
          ?.toLowerCase()
          .includes(search.acquiring_bank.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill?.partner_manager_name
          ?.toLowerCase()
          .includes(search?.partner_manager_name.toLowerCase())
      ) {
        return fill;
      }
    });

  // paggination function
  const handlePaginationPrevious = () => {
    setIsLoading(true);
    getNewApplications(prevUrl);

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
    getNewApplications(nextUrl);
    setPageNumber((prev) => prev + 1);
  };
  const handleChangeCurrentPage = (val) => {
    setIsLoading(true);
    setPageNumber(val);
  };
  const handleApplicationEdit = () => {
    navigate("/application-retrive");
  };
  useEffect(() => {
    if (pageCount !== 0) {
      if (pageCount < pageNumber) {
        setPageNumber(pageCount);
      }
    }
  }, [pageCount]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const AppIndex = () => {
    var index = -1;

    // applicationList?.results?.map((opt) => {
    applicationList?.map((opt) => {
      if (opt.accountid === applicationInput.existing_buss) {
        index = applicationList?.indexOf(opt);
      }
    });

    return index;
  };

  return (
    <>
      <CModal
        backdrop="static"
        alignment="center"
        visible={visible}
        onClose={() => {
          setVisible(false);
          dispatch(SetApplicationStatusFalse());
          dispatch({ type: GET_APPLICATION_LIST, payload: [] });
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CModalHeader>
          <CModalTitle>Additional Outlet</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ textAlign: "left" }}>
          <div>
            <label htmlFor="basic-url">
              Existing Mid<span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className=" my-3">
              <input
                type="text"
                className="form-control "
                required
                name="existing_mid"
                value={applicationInput.existing_mid}
                onChange={(e) => {
                  dispatch(GetApplicationInput("existing_mid", e.target.value));
                  dispatch(
                    GetApplicationList(
                      `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/?query=${e.target.value}`
                      // `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/new/?query=${e.target.value}`
                    )
                  );
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              Existing Business<span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className=" my-3">
              <Autocomplete
                className="my-3"
                size="small"
                options={applicationList || []}
                value={applicationList[AppIndex()] || null}
                getOptionLabel={(option) => option.name.toUpperCase()}
                // getOptionLabel={(option) => option.legal_name.toUpperCase()}
                onChange={(event, newValue) => {
                  dispatch(
                    GetApplicationInput(
                      "existing_buss",
                      newValue === null ? null : newValue.accountid
                      // newValue === null ? null : newValue.id
                    )
                  );
                  if (newValue && newValue.accountid) {
                    dispatch(
                      GetBusinessDetails(
                        `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${newValue.accountid}/`
                      )
                    );
                    // dispatch(GetBusinessDetails(newValue.accountid));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {isLoadApplication ? (
                            <CircularProgress size={24} /> // Render a loader while loading
                          ) : (
                            ""
                            // <Check /> // Render a search icon when not loading
                          )}
                        </InputAdornment>
                      ),
                      style: {
                        backgroundColor: "#fff",
                        borderRadius: "0.375rem",
                        // border: "1px solid #ced4da",
                        fontSize: "1rem",
                        padding: "6px 12px",
                        height: "calc(1.5em + .75rem + 2px)",
                      },
                    }}
                    onChange={(e) => {
                      dispatch(
                        GetApplicationList(
                          `${process.env.REACT_APP_BASE_URL}}api/v1/application/applications/query=${e.target.value}`
                        )
                      );
                    }}
                  />
                )}
              />
            </div>
          </div>
        </CModalBody>
        <CModalFooter className="d-flex">
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton
            className="d-flex gap-1 align-items-center"
            color="primary"
            onClick={() => {
              if (!applicationInput.existing_mid) {
                showToast("error", "Existing mid should not be empty");
                return 0;
              } else if (!applicationInput.existing_buss) {
                showToast("error", "Existing Business should not be empty");
                return 0;
              }
              setVisible(false);
              navigate(`/application-add`);
              dispatch(GetApplicationInput("application_type", 5));
            }}
          >
            Procced{" "}
            {isLoadBusiness && (
              <CircularProgress size={20} color="white" /> // Render a loader while loading
            )}
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            New Application
          </h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end gap-2">
          {userData.customer_type !== "Partner Manager" && (
            <CDropdown className="  me-3 ">
              <CDropdownToggle color="primary">
                <IoIosAdd style={{ fontSize: " 28px" }} />
                Create Application
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  onClick={() => {
                    navigate(`/application-add`);
                    dispatch(GetApplicationInput("application_type", 1));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  New Application
                </CDropdownItem>
                <CDropdownItem
                  onClick={() => {
                    navigate(`/application-add`);
                    dispatch(GetApplicationInput("application_type", 4));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Change of Legel Entity
                </CDropdownItem>
                <CDropdownItem
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setVisible(true);
                    dispatch(GetApplicationInput("application_type", 5));
                  }}
                >
                  Additional Outlets
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          )}{" "}
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
      {/* -----new application table------ */}
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
                      sortingData("partner_manager_name", setPartnerSpan);
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
              <th>
                <div>
                  <p>Application Type</p>
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
                    sortingData("created_at", setCreatedAtSpan);
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
                    sortingData("acquiring_bank", setAcquiringBankSpan);
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
                    onChange={(e) => {
                      const queryParams = new URLSearchParams();
                      queryParams.append("client_id", e.target.value);
                      queryParams.append("limit", "20");
                  
                      handleChangeInput("client_id", e.target.value);
                      getNewApplications(
                        `${
                          process.env.REACT_APP_BASE_URL
                        }api/v1/application/applications/new/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&legal_name=${
                          searchApp.legal_name
                        }&trading_name=${searchApp.trading_name}&mobile=${
                          searchApp.mobile
                        }&created_at=${searchApp.created_at}`
                      );
                    }}
                    value={searchApp.client_id}
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
                      name="partner_manager_name"
                      onChange={(e) => {
                        handleFilterInput(e);
                        // setQuery(e.target.value);
                        const queryParams = new URLSearchParams();
                        queryParams.append(
                          "partner_manager_name",
                          e.target.value
                        );
                        queryParams.append("limit", "20");
                    
                        handleChangeInput("partner_manager_name", e.target.value);
                        getNewApplications(
                          `${
                            process.env.REACT_APP_BASE_URL
                          }api/v1/application/applications/new/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&legal_name=${
                            searchApp.legal_name
                          }&trading_name=${searchApp.trading_name}&mobile=${
                            searchApp.mobile
                          }&created_at=${searchApp.created_at}&client_id=${
                            searchApp.client_id
                          }`
                        );
                      }}
                      value={search["partner_manager_name"]}
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
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
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
                      maxWidth: "140px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="legal_name"
                    onChange={(e) => {
                 
                      // setQuery(e.target.value);
                      const queryParams = new URLSearchParams();
                      queryParams.append("legal_name", e.target.value);
                      queryParams.append("limit", "20");
                 
                      handleChangeInput("legal_name", e.target.value);
                      getNewApplications(
                        `${
                          process.env.REACT_APP_BASE_URL
                        }api/v1/application/applications/new/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&client_id=${
                          searchApp.client_id
                        }&trading_name=${searchApp.trading_name}&mobile=${
                          searchApp.mobile
                        }&created_at=${searchApp.created_at}`
                      );
                    }}
                    value={searchApp.legal_name}
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
                    onChange={(e) => {
                    
                      // setQuery(e.target.value);
                      const queryParams = new URLSearchParams();
                      queryParams.append("trading_name", e.target.value);
                      queryParams.append("limit", "20");
                   
                      handleChangeInput("trading_name", e.target.value);
                      getNewApplications(
                        `${
                          process.env.REACT_APP_BASE_URL
                        }api/v1/application/applications/new/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&legal_name=${
                          searchApp.legal_name
                        }&client_id=${searchApp.client_id}&mobile=${
                          searchApp.mobile
                        }&created_at=${searchApp.created_at}`
                      );
                    }}
                    value={searchApp.trading_name}
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
                    onChange={(e) => {
                  
                      // setQuery(e.target.value);
                      const queryParams = new URLSearchParams();
                      queryParams.append("mobile", e.target.value);
                      queryParams.append("limit", "20");
              
                      handleChangeInput("mobile", e.target.value);
                      getNewApplications(
                        `${
                          process.env.REACT_APP_BASE_URL
                        }api/v1/application/applications/new/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&legal_name=${
                          searchApp.legal_name
                        }&trading_name=${searchApp.trading_name}&client_id=${
                          searchApp.client_id
                        }&created_at=${searchApp.created_at}`
                      );
                    }}
                    value={searchApp.mobile}
                  />
                </div>
              </th>
              {/* submition date */}

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
                    name="created_at"
                    onChange={(e) => {
                      handleFilterInput(e);
                      // setQuery(e.target.value);
                      const queryParams = new URLSearchParams();
                      queryParams.append("created_at", e.target.value);
                      queryParams.append("limit", "20");
                      // handleFilterInput(e);
                      handleChangeInput("created_at", e.target.value);
                      getNewApplications(
                        `${
                          process.env.REACT_APP_BASE_URL
                        }api/v1/application/applications/new/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&legal_name=${
                          searchApp.legal_name
                        }&trading_name=${searchApp.trading_name}&mobile=${
                          searchApp.mobile
                        }&client_id=${searchApp.client_id}`
                      );
                    }}
                    value={searchApp.created_at}
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
            </tr>
          </thead>
          <tbody>
            {displayData?.length === 0 ? (
              <>
                <tr>
                  <td colSpan="12">
                    <div className="not_found">
                      <h4 className="my-4">No Data Found</h4>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {displayData?.map((app) => (
                  <>
                    <tr key={app?.id}>
                      <td>{app?.client_id}</td>
                      {userData.customer_type === "Partner Manager" && (
                        <td>{app?.partner_manager_name}</td>
                      )}
                      <td>{app.application_type}</td>
                      <td>{app?.legal_name}</td>
                      <td>{app?.trading_name}</td>
                      <td>
                        {app?.mobile.startsWith("0")
                          ? app.mobile
                          : 0 + app.mobile}
                      </td>
                      {/* <td>{app?.submitted_on}</td> */}
                      <td>
                        {/* {app?.application_status1} */}
                        {app?.applicaiton_stage !== "" ? (
                          <button
                            className="btn text-white"
                            style={{
                              backgroundColor: `${btnBg(
                                app.application_status1
                              )}`,
                            }}
                          >
                            {app.application_status1}
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{app?.created_at}</td>
                      <td>{app?.acquiring_bank}</td>
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
                                  onClick={() => setShowId(app?.slug)}
                                >
                                  Show More
                                </span>
                              </>
                            </td>
                          ) : (
                            <>
                              {showId === app?.slug ? (
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
                                      onClick={() => setShowId(app?.slug)}
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

                      <td>
                        <div
                          className="d-flex gap-2 align-items-center justify-content-center"
                          style={{ fontSize: "19px" }}
                        >
                          {userData?.customer_type !== "Partner Manager" &&
                            // app.applicaiton_stage !== 5 &&
                            app.applicaiton_stage === 0 &&
                            !app.envelope_id &&
                            app.is_submitted_to_ps === false && (
                              <div
                                onClick={() => {
                                  localStorage.setItem("newAppId", app?.slug);
                                  dispatch(
                                    GetAplicationDetails(
                                      app?.slug,
                                      handleApplicationEdit
                                    )
                                  );
                                }}
                                className="d-flex justify-content-center edit_btn"
                              >
                                <BiEdit />
                              </div>
                            )}

                          <div
                            onClick={() => {
                              localStorage.setItem("newAppId", app?.slug);
                              navigate(`/new-application-preview`);
                            }}
                            className="d-flex justify-content-center view_btn"
                          >
                            <BsEye />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* -------paggination--------- */}
      {total_item !== 0 && (
        <>
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
        </>
      )}
    </>
  );
};

export default NewApplication;
