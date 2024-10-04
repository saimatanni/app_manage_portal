import React, { useCallback, useEffect, useState } from "react";
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

import { GET_COMPANY_OFFICERS_DETAILS } from "../Leads/_redux/types/Types";

import { btnBg, aqBank, appStage, appType } from "src/views/common/Dropdown";
import { Form, InputGroup, Spinner } from "react-bootstrap";
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
    (state) => state.applicationInfo.applicationList || {}
  );
  console.log("applicationList", applicationList);
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

  const [pageNumber, setPageNumber] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const limit = itemPerPage;

  const pageCount = Math.ceil(total_item / limit);
  const indexOfLastPost = pageCount < pageNumber ? limit : pageNumber * limit;
  const offset = pageCount < pageNumber ? 0 : indexOfLastPost - limit;

  const [sortFieldName, setSortFieldName] = useState("");
  const [showId, setShowId] = useState(null);
  const getNewApplications = (url) => {
    axios
      .get(url)
      .then((res) => {
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr?.created_at),
          applicaiton_stage:
            curr?.applicaiton_stage === null || curr?.applicaiton_stage === ""
              ? "New Application"
              : appStage[curr?.applicaiton_stage].name,
          app_stage: curr?.applicaiton_stage,
          mobile:
            curr?.mobile & curr?.mobile.startsWith("0")
              ? curr.mobile
              : 0 + curr.mobile,
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
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else if (JSON.parse(err.request.response).code === 401) {
          showToast("success", "Invalid Token");
          navigate("/login");
        } else {
          showToast("error", "something went wrong");
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

  const displayData = applications.filter((app) => {
    // Check if each field is either empty or matches the filter text.
    // Convert both sides to lowercase to ensure case-insensitive comparison.

    return (
      (search.legal_name === "" ||
        app.legal_name
          .toLowerCase()
          .includes(search.legal_name.toLowerCase())) &&
      (search.trading_name === "" ||
        app.trading_name
          .toLowerCase()
          .includes(search.trading_name.toLowerCase())) &&
      (search.created_at === "" ||
        app.created_at
          .toLowerCase()
          .includes(search.created_at.toLowerCase())) &&
      (search.client_id === "" ||
        app.client_id.toLowerCase().includes(search.client_id.toLowerCase())) &&
      (search.application_type === "" ||
        app.application_type
          .toLowerCase()
          .includes(search.application_type.toLowerCase())) &&
      // Uncomment the following line if application_stage should be included in the filter
      // (search.applicaiton_stage === "" ||
      //   app?.applicaiton_stage
      //     .toLowerCase()
      //     .includes(search?.applicaiton_stage.toLowerCase())) &&
      (search.mobile === "" ||
        app.mobile.toLowerCase().includes(search.mobile.toLowerCase())) &&
      (search.submitted_on === "" ||
        app.submitted_on
          .toLowerCase()
          .includes(search.submitted_on.toLowerCase())) &&
      (search.note === "" ||
        app.note.toLowerCase().includes(search.note.toLowerCase())) &&
      (search.acquiring_bank === "" ||
        app.acquiring_bank
          .toLowerCase()
          .includes(search.acquiring_bank.toLowerCase())) &&
      (search.partner_manager_name === "" ||
        app.partner_manager_name
          .toLowerCase()
          .includes(search.partner_manager_name.toLowerCase()))
    );
  });
  // additional location search
  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedGetApplicationList = useCallback(
    debounce((value) => {
      dispatch(
        GetApplicationList(
          `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/?query=${value}`
        )
      );
    }, 500),
    []
  ); // 500ms delay
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

  // const AppIndex = () => {
  //   var index = -1;

  //   applicationList?.map((opt) => {
  //     if (opt.accountid === applicationInput.existing_buss) {
  //       index = applicationList?.indexOf(opt);
  //     }
  //   });

  //   return index;
  // };

  const renderPaginationItems = () => {
    let items = [];
    const ellipsis = <CPaginationItem disabled>...</CPaginationItem>;

    // Always add the first page
    items.push(
      <CPaginationItem
        style={{ cursor: "pointer" }}
        className={`pointer ${1 === pageNumber ? "active" : "paggiItem"}`}
        onClick={() => handleChangeCurrentPage(1)}
      >
        1
      </CPaginationItem>
    );

    // Determine which intermediate pages to show with ellipsis
    let startPage = Math.max(2, pageNumber - 2);
    let endPage = Math.min(pageCount - 1, pageNumber + 2);

    // If there are more than 5 pages, we're adding ellipsis
    if (pageCount > 5) {
      if (startPage > 2) {
        items.push(ellipsis);
      }
      for (let page = startPage; page <= endPage; page++) {
        items.push(
          <CPaginationItem
            style={{ cursor: "pointer" }}
            className={`pointer ${
              page === pageNumber ? "active" : "paggiItem"
            }`}
            onClick={() => handleChangeCurrentPage(page)}
          >
            {page}
          </CPaginationItem>
        );
      }
      if (endPage < pageCount - 1) {
        items.push(ellipsis);
      }
    } else {
      // If not, show all pages
      for (let page = 2; page < pageCount; page++) {
        items.push(
          <CPaginationItem
            style={{ cursor: "pointer" }}
            className={`pointer ${
              page === pageNumber ? "active" : "paggiItem"
            }`}
            onClick={() => handleChangeCurrentPage(page)}
          >
            {page}
          </CPaginationItem>
        );
      }
    }

    // Always add the last page if pageCount is greater than 1
    if (pageCount > 1) {
      items.push(
        <CPaginationItem
          style={{ cursor: "pointer" }}
          className={`pointer ${
            pageCount === pageNumber ? "active" : "paggiItem"
          }`}
          onClick={() => handleChangeCurrentPage(pageCount)}
        >
          {pageCount}
        </CPaginationItem>
      );
    }

    return items;
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
                value={
                  applicationInput.existing_mid || applicationInput.boarding_id
                }
                onChange={(e) => {
                  dispatch(GetApplicationInput("existing_mid", e.target.value));

                  debouncedGetApplicationList(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">
              Existing Business<span style={{ color: "#DD2C00" }}>*</span>
            </label>
            <div className=" my-3">
              <InputGroup className="mb-3">
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => {
                    dispatch(
                      GetApplicationInput("existing_buss", e.target.value)
                    );
                    if (e.target.value) {
                      if (applicationList?.message === "LOCAL") {
                        dispatch(
                          GetAplicationDetails(e.target.value, "add_loc")
                        );
                      } else {
                        dispatch(
                          GetBusinessDetails(
                            `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${e.target.value}/`,
                            "add_loc"
                          )
                        );
                      }
                    }
                  }}
                >
                  <option value="">--</option>
                  {applicationList?.data?.map((option, index) => (
                    <option
                      key={index}
                      value={
                        applicationList?.message === "LOCAL"
                          ? option.slug
                          : option.accountid
                      }
                    >
                      {applicationList?.message === "LOCAL"
                        ? option.legal_name
                        : option.name}
                    </option>
                  ))}
                </Form.Control>
                <InputGroup.Text id="basic-addon2">
                  {isLoadApplication && (
                    <Spinner animation="border" size="sm" />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        </CModalBody>
        <CModalFooter className="d-flex">
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton
            // disabled={isLoadBusiness && true}
            className="d-flex gap-1 align-items-center"
            color="primary"
            onClick={() => {
              if (
                !applicationInput.existing_mid &&
                !applicationInput.boarding_id
              ) {
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
            {/* {isLoadBusiness && (
              <CircularProgress size={20} color="white" /> // Render a loader while loading
            )} */}
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
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
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
                      name="partner_manager_name"
                      onChange={(e) => {
                        handleFilterInput(e);
                        setQuery(e.target.value);
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
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
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
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
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
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["mobile"]}
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
                      setQuery(e.target.value);
                    }}
                    value={search["created_at"]}
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
                        {/* {app?.applicaiton_stage} */}
                        {app?.applicaiton_stage !== "" ? (
                          <button
                            className="btn text-white"
                            style={{
                              backgroundColor: `${btnBg(
                                app.applicaiton_stage
                              )}`,
                            }}
                          >
                            {app.applicaiton_stage}
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
                          {parseInt(userData?.user_role) !== 2 && 
                          // {parseInt(userData?.user_role) !== 2 && app.created_from !== 2 &&
                            // {userData?.customer_type !== "Partner Manager" &&
                           
                            app?.app_stage === 0 &&
                            !app?.envelope_id &&
                            app?.is_submitted_to_ps === false && (
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
        <div className="mt-2 d-flex justify-content-start">
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              disabled={prevUrl === null}
              onClick={handlePaginationPrevious}
              aria-label="Previous"
              style={{
                cursor: `${prevUrl !== null ? "pointer" : "default"}`,
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>

            {renderPaginationItems()}

            <CPaginationItem
              disabled={nextUrl === null}
              onClick={handlePaginationNext}
              aria-label="Next"
              style={{
                cursor: `${nextUrl !== null ? "pointer" : "default"}`,
              }}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </>
  );
};

export default NewApplication;
