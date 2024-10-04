import axios from "axios";
import React, { useEffect, useState } from "react";
import printer from "../../../assets/img/printer.svg";
import arrow from "../../../EboardComponents/Custom/Arrow.svg";
import "../Leads/Leads.css";

import { useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";
import { showToast } from "src/utils/ToastHelper";
import Cookies from 'js-cookie'; // Import js-cookie
export default function AdditionalProducts() {

  const [query, setQuery] = useState("");

  const [itemPerPage, setItemPerpage] = useState(10);
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

 
  const [search, setSearch] = useState({
    contact_length: "",
    created_at: "",
    updated_at: "",
    connection_type: "",
    terminal_model: "",
    id: "",
  });
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  const [createdAtSpan, SetCreatedAtSpan] = useState(true);
  const [updatedAtSpan, SetUpdatedAtSpan] = useState(true);
  const [connectionTypeSpan, setConnectionTypeSpan] = useState(true);
  const [contactLengthSpan, setContactLengthSpan] = useState(true);
  const [terminalModelSpan, setTerminalModelSpan] = useState(true);
  const [idSpan, setIdSpan] = useState(true);
  
  // ----tanni-------
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem("allAppId");
  
 
  const getNewPreview = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res?.data?.data);
        setQuote(res?.data?.data);
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
    //  const newId= id.replace(/%22/g, "")
    const newId = "215834a6-7ef5-ed11-8848-002248c878f5";
    console.log("newId", newId);
    getNewPreview(`${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/`);
  }, []);
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div>
      <div className="row mt-4">
        <div className="col-12 col-md-6">
          <h2 style={{ color: "#3C4B64" }}>Additional Products</h2>
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
                  // onClick={() => {
                  //   sortingData("id", setIdSpan);
                  // }}
                >
                  <p style={{ textAlign: "center" }}>Line Number</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${idSpan === false ? "rotate" : "rotate-back"}`}
                  />
                </div>
              </th>
              {/* app type className="d-flex justify-content-between align-content-center" */}
              <th>
                <div
                  className="d-flex px-2 justify-content-center"
                  
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
                  // onClick={() => {
                  //   sortingData("connection_type", setConnectionTypeSpan);
                  // }}
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
                <div className="d-flex justify-content-center align-content-center">
                  <p>Terminal Rental</p>
                  {/* <img style={{ marginBottom: '8px', cursor: 'pointer' }} src={arrow} alt="" /> */}
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
                    name="id"
                    onChange={handleFilterInput}
                    value={search["id"]}
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
                    name="terminal_model"
                    onChange={handleFilterInput}
                    value={search["terminal_model"]}
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
                    name="contact_length"
                    onChange={handleFilterInput}
                    value={search["contact_length"]}
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
                    name="created_at"
                    onChange={handleFilterInput}
                    value={search["created_at"]}
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
                    name="updated_at"
                    onChange={handleFilterInput}
                    value={search["updated_at"]}
                  />
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {quote?.additional_terminal?.length === 0 ? (
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
                {quote?.additional_terminal?.map((data) => (
                  <>
                    <tr>
                      <td>
                        {
                          data?.[
                            "ptsave_lineitemnumber@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                      <td>
                        {
                          data?.[
                            "_ptsave_product_value@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                      <td>
                        {
                          data?.[
                            "ptsave_terminalstatus@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                      <td>{data?.["ptsave_trackingnumbe"]}</td>
                      <td>
                        {
                          data?.[
                            "_ptsave_connectiontype_value@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                      <td>
                        {
                          data?.[
                            "_ptsave_terminalterm_value@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                      <td>
                        {
                          data?.[
                            "ptsave_terminalrental@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>

                      <td>{data?.["ptsave_tid"]}</td>
                      <td>
                        {
                          data?.[
                            "createdon@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
                      <td>
                        {
                          data?.[
                            "modifiedon@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </td>
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
    </div>
  );
}
