import React, { useEffect, useState } from "react";
import printer from "../../assets/img/printer.svg";
import arrow from "../../EboardComponents/Custom/Arrow.svg";
import "../accounts/Leads/Leads.css";
import { useNavigate } from "react-router-dom";
import { getTimeFormat } from "src/utils/CommonFunction";
import axios from "axios";
import { showToast } from "src/utils/ToastHelper";
import Loader from "src/utils/Loader";
import ReactPaginate from "react-paginate";
import "./Commission.css";

export default function CommissionStatement() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [statements, setStatements] = useState([]);
  const [copiedAarray, setCopiedArray] = useState([]);
  const handleFilterInput = (e) => {
    const InputName = e.target.name;
    const Inputval = e.target.value;
    setSearch((previous_values) => {
      return { ...previous_values, [InputName]: Inputval };
    });
  };
  // paggination
  const [pageCount, SetPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const keys = [
    "week_number",
    "commission_statement_number",
    "created_at",
    "total_commission",
    "commission_statement_paymet_status",
  ];
  const [search, setSearch] = useState({
    week_number: "",
    created_at: "",
    total_commission: "",
    commission_statement_number: "",
    commission_statement_paymet_status: "",
  });
  // sorting San
  const [sort, setSort] = useState("ASC");
  const [weekNumberSpan, setWeekNumberSpan] = useState(true);
  const [totalCommissionspan, setTotalCommissionSpan] = useState(true);
  const [commissionStatementNumberSpan, setCommissionStatementNumberSpan] =
    useState(true);
  const [commissionStatusSpan, setCommsissionStatusSpan] = useState(true);
  const [createdAtSpan, SetCreatedAtSpan] = useState(true);

  const getUpfrontList = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data);
        setStatements([]);
        const newData = res?.data?.data?.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr["createdon"]),
          week_number:
            curr["ptsave_weeknumber@OData.Community.Display.V1.FormattedValue"],
          total_commission:
            curr[
              "ptsave_totalcommission@OData.Community.Display.V1.FormattedValue"
            ],
          commission_statement_number: curr["ptsave_name"],
          commission_statement_paymet_status:
            curr["statuscode@OData.Community.Display.V1.FormattedValue"],
        }));
        setStatements(newData);
        setCopiedArray(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
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
  // calling api
  useEffect(() => {
    setIsLoading(true);
    getUpfrontList(
      `${process.env.REACT_APP_BASE_URL}api/v1/commission/commission-statement/`
    );
  }, [itemPerPage]);

  const displayData2 = statements
    ?.filter((item) =>
      keys.some((key) => {
        const value = item[key]?.toLowerCase();
        const queryLower = query.toLowerCase();
        return value?.includes(queryLower);
      })
    )
    ?.filter((fill) => {
      if (
        search.commission_statement_paymet_status === "" ||
        search.commission_statement_number === "" ||
        search.total_commission === "" ||
        search.created_at === "" ||
        search.week_number === "" ||
        fill?.mid === null
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.week_number
          ?.toLowerCase()
          .includes(search.week_number.toLowerCase())
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
        fill.total_commission
          ?.toLowerCase()
          .includes(search.total_commission.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.commission_statement_paymet_status
          ?.toLowerCase()
          .includes(search.commission_statement_paymet_status.toLowerCase())
      ) {
        return fill;
      }
    })
    .filter((fill) => {
      if (
        fill.commission_statement_number
          ?.toLowerCase()
          .includes(search.commission_statement_number.toLowerCase())
      ) {
        return fill;
      }
    });

  const endOffset = itemOffset + itemPerPage;
  const displayData = displayData2?.slice(itemOffset, endOffset);
  // paggination
  useEffect(() => {
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(statements?.slice(itemOffset, endOffset));
    SetPageCount(Math.ceil(displayData2?.length / itemPerPage));
  }, [itemOffset, itemPerPage, displayData2?.length]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % statements?.length;
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
    if (sortBy === "created_at") {
      if (sort === "ASC") {
        // const sorted = [...copiedAarray].sort((a, b) =>
        //   // a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
        //   a[sortBy].toLowerCase() > b[sortBy]? 1 : -1
        // );
        // const sorted = [...copiedAarray].sort((a, b) => {
        //   const dateA = new Date(a[sortBy]);
        //   const dateB = new Date(b[sortBy]);
        //   return dateA - dateB;
        // });

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

        setStatements(sorted);
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
        setStatements(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "total_commission") {
      if (sort === "ASC") {
        const sorted = [...statements].sort((a, b) =>
          a["ptsave_totalcommission"] > b["ptsave_totalcommission"] ? 1 : -1
        );
        setStatements(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...statements].sort((a, b) =>
          a["ptsave_totalcommission"] < b["ptsave_totalcommission"] ? 1 : -1
        );
        setStatements(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else if (sortBy === "week_number") {
      if (sort === "ASC") {
        const sorted = [...statements].sort((a, b) =>
          a["ptsave_weeknumber"] > b["ptsave_weeknumber"] ? 1 : -1
        );
        setStatements(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...statements].sort((a, b) =>
          a["ptsave_weeknumber"] < b["ptsave_weeknumber"] ? 1 : -1
        );
        setStatements(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    } else {
      if (sort === "ASC") {
        const sorted = [...statements].sort((a, b) =>
          a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
        );
        setStatements(sorted);
        setSort("DSC");
        stateSpan(!true);
      } else if (sort === "DSC") {
        const sorted = [...statements].sort((a, b) =>
          a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1
        );
        setStatements(sorted);
        setSort("ASC");
        stateSpan(!false);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  const btnBg = (data) => {
    if (data === "Paid") return "#28a745";
    if (data === "Not Applicable") return "#EF5350";
    if (data === "Pending to Send for Invoice") return "#FFC107";
    if (data === "Send for Invoice") return "#dc3545";
    else return "#28a745";
  };

  const viewCommission = (data) => {
    if (data) {
      localStorage.setItem("commissionData", JSON.stringify(data));
      navigate("/commission-preview");
    }
  };

  return (
    <div>
      {/* Upfornt Commission Chart */}
      <div></div>
      {/* UpfrontCommission Table */}
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>Commission Statement Table</h3>
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
          <div className="d-flex align-items-center">
            <span
              style={{ color: "#212121", fontSize: "14px" }}
              className="me-2"
            >
              Item Per Page :
            </span>{" "}
            <select
              value={itemPerPage}
              onChange={(e) => setItemPerPage(Number(e.target.value))}
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
                    sortingData("week_number", setWeekNumberSpan);
                  }}
                  className="d-flex px-2 justify-content-center gap-2 align-content-center"
                >
                  <p style={{ textAlign: "end" }}>Week number</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      weekNumberSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* app type className="" */}
              <th>
                <div
                  onClick={() => {
                    sortingData(
                      "commission_statement_number",
                      setCommissionStatementNumberSpan
                    );
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Commission statement number</p>
                  <img
                    className={`${
                      commissionStatementNumberSpan === false
                        ? "rotate"
                        : "rotate-back"
                    }`}
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                  />
                </div>
              </th>
              {/* total commission */}
              <th>
                <div
                  onClick={() => {
                    sortingData("total_commission", setTotalCommissionSpan);
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p>Total commission</p>
                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      totalCommissionspan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* trading name */}
              <th>
                <div
                  onClick={() => {
                    sortingData(
                      "commission_statement_paymet_status",
                      setCommsissionStatusSpan
                    );
                  }}
                  className="d-flex justify-content-center gap-2 align-content-center"
                >
                  <p className="ms-4">Commission statement payment status</p>

                  <img
                    style={{ marginTop: "-15px", cursor: "pointer" }}
                    src={arrow}
                    alt=""
                    className={`${
                      commissionStatusSpan === false ? "rotate" : "rotate-back"
                    }`}
                  />
                </div>
              </th>
              {/* mMID status */}
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
              {/* account status */}
              <th>
                <div className="">
                  <p>Commission View</p>
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
                      minWidth: "150px",
                      maxWidth: "150px",
                      height: "30px",
                    }}
                    type="text"
                    className="top-input"
                    name="week_number"
                    onChange={handleFilterInput}
                    value={search["week_number"]}
                  />
                </div>
              </th>
              {/* commission_statement_number */}
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
                    name="commission_statement_number"
                    onChange={handleFilterInput}
                    value={search["commission_statement_number"]}
                  />
                </div>
              </th>
              {/* total_commission */}
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
                    name="total_commission"
                    onChange={handleFilterInput}
                    value={search["total_commission"]}
                  />
                </div>
              </th>
              {/* commission_statement_paymet_status */}
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
                    name="commission_statement_paymet_status"
                    onChange={handleFilterInput}
                    value={search["commission_statement_paymet_status"]}
                  />
                </div>
              </th>
              {/* Creted */}
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
              <th>
                <div>
                  <input
                    style={{
                      minWidth: "180px",
                      maxWidth: "140px",
                      height: "30px",
                      opacity: "0",
                    }}
                    type="text"
                    className="top-input"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData?.length === 0 ? (
              <>
                <tr>
                  <td colSpan="6">
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
                    <tr key={data?.id}>
                      <td>{data?.week_number}</td>
                      <td>{data?.commission_statement_number}</td>
                      <td>{data?.total_commission}</td>
                      <td>
                        {data?.commission_statement_paymet_status === "N/A" ||
                        data?.commission_statement_paymet_status?.length < 1 ? (
                          ""
                        ) : (
                          <button
                            className="btn  text-white"
                            style={{
                              backgroundColor: `${btnBg(
                                data?.commission_statement_paymet_status
                              )}`,
                            }}
                          >
                            {data?.commission_statement_paymet_status}
                          </button>
                        )}
                      </td>

                      <td>{data?.created_at}</td>
                      <td>
                        {/* <a href="/commission-preview">View Details</a> */}
                        <span
                          onClick={() => viewCommission(data)}
                          className="view-detail"
                        >
                          View Details
                        </span>
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
      <div className="mt-3 d-flex justify-content-start">
        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          containerClassName="pagination-container"
          activeClassName="active"
          disabledClassName="disable"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
}
