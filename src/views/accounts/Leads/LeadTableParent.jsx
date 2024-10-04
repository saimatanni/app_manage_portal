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
  LeadUpdatedData,
  SetLeadsStatusFalse,
  SetLeadsTypeStatusFalse,
} from "./_redux/action/LeadAction";
import { useDispatch } from "react-redux";
import Loader from "src/utils/Loader";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { format } from "date-fns-tz";
import DateTimePicker from "react-datetime-picker";
import Cookies from "js-cookie"; // Import js-cookie
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { IoIosAdd } from "react-icons/io";
import { SetApplicationStatusFalse } from "../NewApplication/_redux/action/ApplicationAction";
const LeadTableParent = () => {
  const cRef = useRef();
  const userData = JSON.parse(Cookies.get("userData"));
  const [queryEx, setQueryEx] = useState("");

  const [updatedNote, setUpdatedNote] = useState("");
  const [updateDate, setupdateDate] = useState(new Date());
  const [updateAppointment, setUpdateAppointment] = useState(null);

  const [appointMentState, setAppointMentState] = useState({});
  const [currLead, setCurrLead] = useState({});
  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [unChangedLead, setUnchangedLead] = useState([]);
  // initial data and Loader
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    client_id: "",
    trading_name: "",
    legal_name: "",
    created_at: "",
    lead_status_name: "",
    lead_stage_name: "",
    lead_quality_name: "",
    mobile: "",
    trading_full_address: "",
    note: "",
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
    dispatch(SetApplicationStatusFalse());
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
  const [sortFieldName, setSortFieldName] = useState("");
  const [tradingNameSpan, SetTradingNameSpan] = useState(true);
  const [mobileSpan, setMobileSpan] = useState(true);
  const [leadStageSpan, setLeadStageSpan] = useState(true);
  const [createdAtSpan, setCreatedAtSpan] = useState(true);
  const [callBacktSpan, setCallBacktSpan] = useState(true);
  const [noteSpan, setNoteSpan] = useState(true);
  const [leadStatusSpan, setLeadStatusSpan] = useState(true);

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

  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const timezone = date.getTimezoneOffset() < 0 ? "+" : "-"; // Determine the timezone sign
      const timezoneHours = String(
        Math.floor(Math.abs(date.getTimezoneOffset()) / 60)
      ).padStart(2, "0");
      const timezoneMinutes = String(
        Math.abs(date.getTimezoneOffset()) % 60
      ).padStart(2, "0");

      return `${day} ${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}${timezoneHours}:${timezoneMinutes}`;
    }
    return "";
  };

  const [pdfData, setPdfData] = useState([]);
  const getNewLeads = (url) => {
    axios
      .get(url)
      .then((res) => {
        // setIsLoading(true)
        setUnchangedLead(res?.data?.data?.results);
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          created_at:
            curr?.appointment_date === null ? "" : curr?.appointment_date,
          // : getTimeFormat(curr?.appointment_date),

          client_id: curr?.client_id === null ? "N/A" : curr?.client_id,
          note: !curr?.note ? "" : curr?.note,
          callback_date:
            curr?.callback_date === null ? "" : curr?.callback_date,
          lead_quality_name:
            curr.lead_type === 0
              ? "HOT"
              : curr.lead_type === 1
              ? "COLD"
              : "WARM",
        }));

        setTotal_item(res.data?.data?.count);
        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setLeads(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request?.response)?.message;
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
          setLeads([]);
          setIsLoading(false);
          showToast("error", message);
        }
        console.log(err);
      });
  };

  const getNewLeadsPdf = (url) => {
    axios
      .get(url)
      .then((res) => {
        const newData = res?.data?.data?.results.map((curr) => ({
          ...curr,
          created_at:
            curr?.appointment_date === null ? "" : curr?.appointment_date,
          // : getTimeFormat(curr?.appointment_date),

          client_id: curr?.client_id === null ? "N/A" : curr?.client_id,
          note: !curr?.note ? "" : curr?.note,
          callback_date:
            curr?.callback_date === null ? "" : curr?.callback_date,
          lead_quality_name:
            curr.lead_type === 0
              ? "HOT"
              : curr.lead_type === 1
              ? "COLD"
              : "WARM",
        }));
        setPdfData(newData);
      })
      .catch((err) => {
        const message = JSON.parse(err.request?.response)?.message;
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
          setLeads([]);
          setIsLoading(false);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    getNewLeads(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}&is_closed=false`
    );
  }, [pageNumber, itemPerPage, sort, sortFieldName]);

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

    ?.filter((fill) => {
      if (
        search.legal_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        search?.lead_status_name === "" ||
        search?.lead_stage_name === "" ||
        search?.lead_quality_name === "" ||
        search?.trading_full_address === "" ||
        search?.mobile === "" ||
        fill?.client_id === null ||
        fill?.fill.callback_date === "" ||
        fill?.fill.callback_date === null
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
    // problem
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
        fill.lead_quality_name
          ?.toLowerCase()
          .includes(search.lead_quality_name.toLowerCase())
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
  const changeStatus = (name, value, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${data.slug}/`;
    const getObj = unChangedLead?.filter((unCh) => data?.id === unCh?.id);
    console.log(getObj, "ids");
    console.log(value, "ids 1");
    console.log(name, "ids 2");

    const newObj = {
      ...getObj,
      lead_stage: value,
    };
    const newObj2 = {
      ...getObj,
      lead_status: value,
    };
    const newObj3 = {
      ...getObj,
      note: value,
    };
    const newObj4 = {
      ...getObj,
      lead_type: value,
    };

    axios
      .put(
        url,
        name === "lead_stage"
          ? newObj
          : name === "note"
          ? newObj3
          : name === "lead_type"
          ? newObj4
          : newObj2
      )
      .then((res) => {
        setIsLoading(true);
        if (res.data.status) {
          getNewLeads(
            `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/?query=${query}&application_status=0&limit=${limit}&offset=${offset}&is_closed=false`
          );
          showToast("success", `${name} updated succesfully`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if(err.response=== undefined){
          showToast("error", 'server error');
        }
        else{
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
            setLeads([]);
            setIsLoading(false);
          } 
        }
        
      });
  };

  const changeNote = (name, value, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${data.slug}/`;
    const getObj = unChangedLead?.filter((unCh) => data?.id === unCh?.id);

    const newObj3 = {
      ...getObj,
      note: value,
    };
    axios
      .put(url, newObj3)
      .then((res) => {
        setIsLoading(true);
        if (res.data.status) {
          getNewLeads(
            `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/?query=${query}&application_status=0&limit=${limit}&offset=${offset}&is_closed=false`
          );
          showToast("success", `${name} updated succesfully`);
          setShow(false);
          setDateShow(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if(err.response=== undefined){
          showToast("error", 'server error');
        }
        else{
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
            setLeads([]);
            setIsLoading(false);
          } 
        }
        
      });
  };
  const dateTimeZone = (value) => {
    console.log("value", value, typeof value);
    if (typeof value === "string") {
      return value;
    } else {
      const originalDateString = value; // Original date string in UTC

      const formattedConvertedTime = format(
        originalDateString,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      );

      const fomDate = formattedConvertedTime.split("+")[0] + "+00:00"; //for winter
      // const fomDate = formattedConvertedTime.split("+")[0] + "+01:00"; //for summer

      return fomDate;
    }
  };
  const changeDate = (name, value, data) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${data.slug}/`;
    const getObj = unChangedLead?.filter((unCh) => data?.id === unCh?.id);
    if (name === "appointment_date") {
      const newObj3 = {
        ...getObj,
        appointment_date: dateTimeZone(value),
        // appointment_date: fomDate,
      };
      axios
        .put(url, newObj3)
        .then((res) => {
          setIsLoading(true);
          if (res.data.status) {
            getNewLeads(
              `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/?query=${query}&application_status=0&limit=${limit}&offset=${offset}&is_closed=false`
            );
            showToast("success", `${name} updated succesfully`);

            setAppointment(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response=== undefined){
            showToast("error", 'server error');
          }
          else{
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
              setLeads([]);
              setIsLoading(false);
            } 
          }
          
        });
    } else {
      //call back date

      const newObj3 = {
        ...getObj,
        callback_date: dateTimeZone(value),
        lead_status: 2,
      };
      axios
        .put(url, newObj3)
        .then((res) => {
          setIsLoading(true);
          if (res.data.status) {
            getNewLeads(
              `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/?query=${query}&application_status=0&limit=${limit}&offset=${offset}&is_closed=false`
            );
            showToast("success", `${name} updated succesfully`);

            setDateShow(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response=== undefined){
            showToast("error", 'server error');
          }
          else{
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
              setLeads([]);
              setIsLoading(false);
            } 
          }
          
        });
    }
  };
  // print pdf
  const HandlePrint = useReactToPrint({
    content: () => cRef.current,
    documentTitle: "Leads List",
    bodyClass: "dis",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ---------call back date-
  const [dateShow, setDateShow] = useState(false);
  const [appointment, setAppointment] = useState(false);

  const handleSearchApi = () => {
    // if(query){
    setIsLoading(true);
    getNewLeads(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?query=${query}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}&is_closed=false`
    );
  };
  const handleSearchApiQuery = () => {
    // if(query){
    setIsLoading(true);
    getNewLeads(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?query=${""}&sort_by=${sortFieldName}&asc=${
        sort === "ASC" ? "True" : "False"
      }&limit=${limit}&offset=${offset}&is_closed=false`
    );
  };
  // useEffect(()=>{
  //   handleSearchApiQuery()
  // },[])
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
            New Leads Information
          </h3>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          {
            userData.customer_type !== "Partner Manager" && (
              <button
                onClick={() => navigate("/add-leads")}
                className="btn basic_btn me-3"
                style={{ fontSize: "18px", padding: ".5rem 1rem" }}
              >
                {" "}
                <IoIosAdd style={{ fontSize: " 28px" }} />
                Add New Leads
              </button>
            )
            // {" "}
          }{" "}
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
                <div className="d-flex justify-content-center">
                  <p>Lead Quality</p>
                </div>
              </th>

              <th>
                <div
                  onClick={() => {
                    sortingData("trading_name", SetTradingNameSpan);
                  }}
                  className="d-flex justify-content-center align-content-center"
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
                  className="d-flex justify-content-center align-content-center"
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
                <div
                  className="d-flex justify-content-center gap-2"
                  onClick={() => {
                    sortingData("callback_date", setCallBacktSpan);
                  }}
                >
                  <p>Callback Date</p>
                  <img
                    className={`${
                      callBacktSpan === false ? "rotate" : "rotate-back"
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
                    sortingData("appointment_date", setCreatedAtSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Appointment Date</p>
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
                      minWidth: "200px",
                      maxWidth: "200px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="lead_quality_name"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["lead_quality_name"]}
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
              {/* lead status */}

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
                    name="created_at"
                    onChange={(e) => {
                      handleFilterInput(e);
                      setQuery(e.target.value);
                    }}
                    value={search["created_at"]}
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
                      opacity: "0",
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

              {/* <th>
               
              </th> */}
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
                    {/* <td>{lead?.client_id}</td> */}
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {userData?.customer_type !== "Partner Manager" ? (
                        <select
                          style={{
                            height: "100%",
                            margin: "auto",
                            padding: "3px 17px",
                          }}
                          defaultValue={lead?.lead_type}
                          name=""
                          id=""
                          onChange={(e) =>
                            changeStatus("lead_type", e.target.value, lead)
                          }
                          className="lead-select"
                        >
                          <option>--</option>
                          <option value={0}>Hot </option>
                          <option value={1}>Cold </option>
                          <option value={2}>Warm </option>
                        </select>
                      ) : lead.lead_type === 0 ? (
                        "Hot"
                      ) : lead.lead_type === 1 ? (
                        "Cold"
                      ) : (
                        " warm"
                      )}
                    </td>
                    {/* <td>{lead?.legal_name}</td> */}
                    <td>{lead?.trading_name}</td>
                    {/* <td>{lead?.trading_full_address}</td> */}
                    <td>
                      {lead?.mobile.startsWith("0")
                        ? lead.mobile
                        : 0 + lead.mobile}
                    </td>
                    <td
                      style={{
                        maxWidth: "200px",
                      }}
                    >
                      {userData?.customer_type !== "Partner Manager" ? (
                        <>
                          {lead?.note ? (
                            <div
                              className="full-main "
                              style={{ cursor: "pointer" }}
                            >
                              {/* .length > 20 ? `${lead?.note.slice(0,20)}... `: lead?.note */}
                              <div className="full">
                                <span>
                                  {/* {lead.note} */}
                                  {lead?.note.length > 15
                                    ? `${lead?.note.slice(0, 15)}... `
                                    : lead?.note}
                                </span>

                                <span className="edit-div">
                                  <span
                                    onClick={() => {
                                      setUpdatedNote(
                                        lead?.note ? lead?.note : ""
                                      );
                                      setCurrLead(lead);
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
                                  setUpdatedNote(lead?.note ? lead?.note : "");
                                  setCurrLead(lead);
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
                        lead.note
                      )}
                    </td>
                    <td>
                      {/* {lead?.lead_stage_name} */}
                      {userData?.customer_type !== "Partner Manager" ? (
                        <select
                          style={{ height: "100%", margin: "auto" }}
                          defaultValue={lead?.lead_stage}
                          name=""
                          id=""
                          onChange={(e) =>
                            changeStatus("lead_stage", e.target.value, lead)
                          }
                          className="lead-select"
                        >
                          <option>--</option>
                          <option value={0}>New</option>
                          <option value={1}>No Answer</option>
                          <option value={2}>Made Contact</option>
                          <option value={3}>Lost</option>
                          <option value={4}>Appointment Set</option>
                        </select>
                      ) : (
                        <select
                          style={{ height: "100%", margin: "auto" }}
                          defaultValue={lead?.lead_stage}
                          name=""
                          id=""
                          disabled
                          // onChange={(e) =>
                          //   changeStatus("lead_stage", e.target.value, lead)
                          // }
                          className="lead-select"
                        >
                          <option>--</option>
                          <option value={0}>New</option>
                          <option value={1}>No Answer</option>
                          <option value={2}>Made Contact</option>
                          <option value={3}>Lost</option>
                          <option value={4}>Appointment Set</option>
                        </select>
                      )}
                    </td>
                    <td>{lead?.lead_status_name}</td>
                    <td>
                      {userData?.customer_type !== "Partner Manager" ? (
                        <>
                          {lead?.callback_date ? (
                            <div
                              className="full-main "
                              style={{ cursor: "pointer" }}
                            >
                             
                              <div className="full">
                                <span>
                                
                                  {lead.callback_date
                                    ? getTimeFormat(lead.callback_date)
                                    : ""}
                               
                                </span>
                                <span className="edit-div">
                                  <span
                                    onClick={() => {
                                      setupdateDate(
                                        lead?.callback_date
                                          ? lead?.callback_date
                                          : ""
                                      );

                                      setCurrLead(lead);
                                      setDateShow(true);
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
                                  setupdateDate(
                                    lead?.callback_date
                                      ? lead?.callback_date
                                      : ""
                                  );
                                  setCurrLead(lead);
                                  setDateShow(true);
                                }}
                                className="btn btn-dark btn-sm"
                              >
                                Add Callback Date
                              </button>
                            </div>
                          )}
                        </>
                      ) : lead.callback_date ? (
                        getTimeFormat(lead.callback_date)
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      {userData?.customer_type !== "Partner Manager" ? (
                        <>
                          {lead?.created_at ? (
                            <div
                              className="full-main "
                              style={{ cursor: "pointer" }}
                            >
                              {/* .length > 20 ? `${lead?.note.slice(0,20)}... `: lead?.note */}
                              <div className="full">
                                <span>
                                  {lead?.created_at
                                    ? getTimeFormat(lead.created_at)
                                    : ""}
                                </span>
                                <span className="edit-div">
                                  <span
                                    onClick={() => {
                                      setAppointMentState({
                                        id: lead?.id,
                                        created_at: lead?.created_at
                                          ? lead?.created_at
                                          : "",
                                      });
                                      setUpdateAppointment(
                                        lead?.created_at ? lead?.created_at : ""
                                      );

                                      setCurrLead(lead);
                                      setAppointment(true);
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
                                  setAppointMentState({
                                    id: lead?.id,
                                    created_at: lead?.created_at
                                      ? lead?.created_at
                                      : "",
                                  });
                                  setUpdateAppointment(
                                    lead?.created_at ? lead?.created_at : ""
                                  );
                                  setCurrLead(lead);
                                  setAppointment(true);
                                }}
                                className="btn btn-primary btn-sm"
                              >
                                Add Appointment Date
                              </button>
                            </div>
                          )}
                        </>
                      ) : lead.created_at ? (
                        getTimeFormat(lead.created_at)
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      <div
                        className="d-flex gap-2 align-items-center justify-content-center"
                        style={{ fontSize: "19px" }}
                      >
                        {userData?.customer_type !== "Partner Manager" && (
                          <div
                            onClick={() => {
                              dispatch(LeadUpdatedData(lead?.slug));
                              localStorage.setItem("leadId", lead?.slug);
                              // localStorage.setItem("leadId", lead?.id);
                              navigate(`/retrieve-lead`);
                            }}
                            className="d-flex justify-content-center edit_btn"
                          >
                            <BiEdit />
                          </div>
                        )}

                        <div
                          onClick={() => {
                            localStorage.setItem("leadId", lead?.slug);
                            navigate(`/leads-preview`);
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

      {displayData?.length > 0 && (
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
                New Leads Pdf{" "}
              </h6>
            </thead>
            <thead style={{ color: "black" }}>
              <tr className="height">
                <th>
                  {/* <div className="d-flex justify-content-between align-content-center"> */}
                  <p>Legal Quality</p>
                  {/* </div> */}
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Trading Name</p>
                  </div>
                </th>
                <th className="sp-th">
                  <div className="d-flex justify-content-between align-content-center">
                    <p className="ms-2">Mobile No</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Note</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Lead Notes</p>
                  </div>
                </th>
                <th>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Lead Stage</p>
                  </div>
                </th>
                <th style={{ minWidth: "120px", maxWidth: "120px" }}>
                  <div className="d-flex justify-content-between align-content-center">
                    <p>Callback Date</p>
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
                      <td>
                        {lead.lead_type === 0
                          ? "Hot"
                          : lead.lead_type === 1
                          ? "Cold"
                          : "Warm"}
                      </td>
                      <td>{lead?.trading_name}</td>
                      <td>{lead?.mobile}</td>
                      <td>
                        <span>
                          {lead?.note.length > 15
                            ? `${lead?.note.slice(0, 15)}... `
                            : lead?.note}
                        </span>
                      </td>
                      <td>{lead?.mobile}</td>
                      <td>{lead?.lead_status_name}</td>
                      <td>
                        {lead.callback_date
                          ? getTimeFormat(lead.callback_date)
                          : ""}
                      </td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* note */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Leads Notes</label>
                <div className="mt-2 ">
                  {/* <FloatingLabel controlId="floatingTextarea2"> */}
                  <Form.Control
                    as="textarea"
                    placeholder="write note here"
                    style={{ height: "100px" }}
                    value={updatedNote}
                    onChange={(e) => setUpdatedNote(e.target.value)}
                    className="p-1 "
                  />
                  {/* </FloatingLabel> */}
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
      {/* callback date */}
      <Modal show={dateShow} onHide={() => setDateShow(false)} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Callback Date</label>
                <div className="mt-2 ">
                  <DateTimePicker
                    className="p-1 form-control"
                    locale="en-GB"
                    onChange={(date) => setupdateDate(date)}
                    value={updateDate}
                    formatDate={formatDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="info"
              onClick={() => {
                changeDate("callback_date", updateDate, currLead);
              }}
            >
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* appointment date */}
      <Modal show={appointment} onHide={() => setAppointment(false)} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Appointment Date</label>
                <div className="mt-2 ">
                  <DateTimePicker
                    className="p-1 form-control"
                    locale="en-GB"
                    onChange={(date) => setUpdateAppointment(date)}
                    value={updateAppointment}
                    formatDate={formatDate}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="info"
                onClick={() =>
                  changeDate("appointment_date", updateAppointment, currLead)
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeadTableParent;
