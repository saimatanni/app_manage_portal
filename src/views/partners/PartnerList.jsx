import React, { useEffect, useState } from "react";
import printer from "../../assets/img/printer.svg";
import arrow from "../../EboardComponents/Custom/Arrow.svg";
import "../accounts/Leads/Leads.css";

import axios from "axios";

import Loader from "src/utils/Loader";

import { getTimeFormat } from "src/utils/CommonFunction";
import ReactPaginate from "react-paginate";

import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PartnerListChart from "./PartnerListChart";
import { showToast } from "src/utils/ToastHelper";

export default function UpfrontComission() {
  const navigate = useNavigate();
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
    "contact_name",
    "created_at",
    "role",
    "leasing_status",
    "terminal_override_amount",
    "terminal_amount",
    "commission_status",
    "total_commission",
    "mid_opend",
  ];
  const [search, setSearch] = useState({
    trading_name: "",
    contact_name: "",
    created_at: "",
    mid: "",
    role: "",
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

  const [midSpan, setMidSpan] = useState(true);

  const getUpfrontList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setCurrentItems([]);

        const newData = res?.data?.data?.partner_data?.map((curr) => ({
          ...curr,
          created_at: !curr["createdon"]
            ? ""
            : getTimeFormat(curr["createdon"]),
          mid: !curr?.ptsave_amex_mid_no ? "" : curr?.ptsave_amex_mid_no,
          contact_name: curr?.[
            "_primarycontactid_value@OData.Community.Display.V1.FormattedValue"
          ]
            ? curr?.[
                "_primarycontactid_value@OData.Community.Display.V1.FormattedValue"
              ]
            : "",
          trading_name: curr?.ptsave_partnernumber
            ? curr?.ptsave_partnernumber
            : "",
          role: curr[
            "customertypecode@OData.Community.Display.V1.FormattedValue"
          ],
          residual_percentage:
            curr[
              "ptsave_partnerresidualpercent@OData.Community.Display.V1.FormattedValue"
            ],
          contact_id: curr["_primarycontactid_value"],
          owner_id: curr["_ownerid_value"],
        }));
        setUpfronts(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response === undefined) {
          showToast("error", "Internal Server Error");
        }
      });
  };

  // calling api
  useEffect(() => {
    setIsLoading(true);
    getUpfrontList(
      `${process.env.REACT_APP_BASE_URL}api/v1/application/partners/`
    );
    localStorage.removeItem("contact_id");
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
        search.contact_name === "" ||
        search.trading_name === "" ||
        search?.created_at === "" ||
        search?.role === "" ||
        fill?.mid === null
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.contact_name
          ?.toLowerCase()
          .includes(search.contact_name.toLowerCase())
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
      if (fill.role?.toLowerCase().includes(search.role.toLowerCase())) {
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

  if (isLoading) {
    return <Loader />;
  }

 

  return (
    <div>
      {/* Upfornt Commission Chart */}
      <div>
        <div className=" mb-3">
          <div className="container">
            <PartnerListChart />
          </div>
        </div>
      </div>
      {/* UpfrontCommission Table */}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>Partner List</h3>
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
                  <p style={{ textAlign: "end" }}>Partner ID</p>
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
                    sortingData("contact_name", SetLegalNameSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                >
                  <p> Name</p>
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
                  <p>Contact</p>
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
                  <p>Role</p>
                </div>
              </th>
              {/* Leasing Status */}
              <th>
                <div className="">
                  <p>Residual Percentage</p>
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
              <th>
                <p>Action</p>
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
                    name="contact_name"
                    onChange={handleFilterInput}
                    value={search["contact_name"]}
                  />
                </div>
              </th>
              {/* //mid */}
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
                    name="role"
                    onChange={handleFilterInput}
                    value={search["role"]}
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
              <th></th>
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
                  <td>{data?.trading_name}</td>
                  <td>{data?.contact_name}</td>
                  <td>{data?.emailaddress1}</td>
                  <td>{data?.role}</td>
                  <td>{data?.residual_percentage}</td>
                  {/* <td>{data?.mid}</td>
                    <td>{data?.contact_id}</td>
                    <td>{data?.owner_id}</td> */}

                  <td>{data?.created_at}</td>
                  <td>
                    <button
                      key={data.contact_id}
                      style={{ background: "#176c7d" }}
                      className="btn-sm mx-1 btn text-white"
                      title="View"
                      onClick={() => {navigate(`/partner-details`)
                      localStorage.setItem("contact_id", data.accountid)
                    }}
                    >
                      <BsEye />
                    </button>
                  </td>
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
