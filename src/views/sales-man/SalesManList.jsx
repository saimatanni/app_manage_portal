// import '../Leads/Leads.css'
import "../accounts/Leads/Leads.css";
import React, { useEffect, useState } from "react";

import list from "../../assets/img/new-document.svg";

import axios from "axios";

import { CPagination, CPaginationItem } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";
import { getTimeFormat } from "src/utils/CommonFunction";

import {
  SetApplicationStatusFalse,
  SetApplicationStatusFalse2,
  SetsignStatusFalse,
} from "../accounts/NewApplication/_redux/action/ApplicationAction";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"; // Import js-cookie
import { Badge } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { Trash } from "@phosphor-icons/react";
import Swal from "sweetalert2";

const SalesManList = () => {
  var userData;
  // const userData = JSON.parse(Cookies.get("userData"));
  const userDataCookie = Cookies.get("userData");
  // const userData = JSON.parse(userDataCookie);

  if (userDataCookie) {
    // If the cookie exists, parse it as JSON
    userData = JSON.parse(userDataCookie);
  } else {
    // Handle the case where the cookie does not exist
    console.log("userData cookie does not exist");
  }
  console.log("userDataCookie", userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  const [query, setQuery] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [searchText, setSearchText] = useState("name=");

  useEffect(() => {
    dispatch(SetApplicationStatusFalse());

    dispatch(SetsignStatusFalse());
    dispatch(SetApplicationStatusFalse2());

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

  // span state
  const [sort, setSort] = useState("ASC");

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

  const getNewApplications = (url) => {
    // setIsLoading(true)
    axios
      .get(url)
      .then((res) => {
        // setIsLoading(true)
        console.log(res.data, "new application");
        const newData = res?.data?.data?.results?.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr?.created_at),
        }));
        setTotal_item(res.data?.data?.count);
        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setApplications(newData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        // const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
        // if (
        //   message === "Invalid token." ||
        //   JSON.parse(err.request.response).code === 401
        // ) {
        //   showToast("success", "Invalid Token");
        //   navigate("/login");
        // }
      });
  };
  // calling all data
  useEffect(() => {
    getNewApplications(
      `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?sales_agent=${userData?.id}&limit=${limit}&offset=${offset}&name=${query}`
    );
  }, [pageNumber, itemPerPage, sort, sortFieldName, userData?.id]);
  // sorting data

  //
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
  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the API call to delete
        const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/${data.id}/`;
        fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${userData?.token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Something went wrong");
          })
          .then(() => {
            Swal.fire("Deleted!", "Your salesman has been deleted.", "success");
            getNewApplications(
              `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?sales_agent=${userData?.id}&limit=${limit}&offset=${offset}&name=${query}`
            );
            // Optional: Refresh data or update state here
          })
          .catch((error) => {
            console.error("Delete operation failed:", error);
            Swal.fire(
              "Error!",
              "Failed to delete. Please try again later.",
              "error"
            );
          });
      }
    });
  };
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
            className={`pointer ${page === pageNumber ? "active" : "paggiItem"}`}
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
            className={`pointer ${page === pageNumber ? "active" : "paggiItem"}`}
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
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            User List
          </h3>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <button
            onClick={() => {
              navigate("/create-salesman");
              localStorage.removeItem("userId");
            }}
            className="btn basic_btn me-3"
            style={{ fontSize: "18px", padding: ".5rem 1rem" }}
          >
            {" "}
            <IoIosAdd style={{ fontSize: " 28px" }} />
            Add User
          </button>
        </div>
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-7 d-flex align-items-center my-2">
          <span style={{ color: "#212121", fontSize: "14px" }} className="me-2">
            Filter :
          </span>{" "}
          <input
            // value={search}
            onChange={(e) => {
              const queryParams = new URLSearchParams();
              queryParams.append("name", e.target.value);
              queryParams.append("limit", limit);
              queryParams.append("offset", offset);

              setSearchText(queryParams.toString());

              const apiUrl = `${
                process.env.REACT_APP_BASE_URL
              }api/v1/auth/user/?sales_agent=${
                userData?.id
              }&${queryParams.toString()}`;
              if (!e.target.value) {
                getNewApplications(apiUrl);
              }
            }}
            className="top-input me-2"
            type="text"
            placeholder="Type Here..."
          />
          <button
            style={{ background: "#1E2553" }}
            className="btn text-white "
            onClick={() =>
              getNewApplications(
                `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?sales_agent=${userData?.id}&${searchText}`
              )
            }
          >
            Search
          </button>
        </div>
        <div className="col-12 col-md-5 d-flex justify-content-md-end">
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
                <div className="d-flex px-2 justify-content-center gap-2 align-content-center">
                  <p style={{ textAlign: "end" }}>Name</p>
                </div>
              </th>

              <th>Contact Info</th>

              <th>Role</th>

              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <span className="ms-4">Residual Percentage</span>
                </div>
              </th>
              <th>Upfront Percentage</th>
              <th>Partner</th>
              <th>Contact</th>
              {/* mobile */}
              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          {/* <thead className="Invoice_head_input">
            <tr
              style={{
                borderTop: "2px solid #d8dbe0",
                borderBottom: "2px solid #d8dbe0",
              }}
            >
              <th>
                <input
                  className="top-input "
                  type="text"
                  onChange={(e) => {
                    const queryParams = new URLSearchParams();
                    queryParams.append("invoice_no", e.target.value);

                    setInvoiceNumber(queryParams.toString());
                    getNewApplications(
                      `${
                        process.env.REACT_APP_BASE_URL
                      }api/v1/invoice/invoices?${queryParams.toString()}&user_name=${userName}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&limit=${limit}&offset=${offset}&is_read=true`
                    );
                  }}
                />
              </th>

              <th>
                <input
                  className="top-input "
                  type="text"
                  onChange={(e) => {
                    const queryParams = new URLSearchParams();
                    queryParams.append("user_name", e.target.value);

                    setUserName(e.target.value);
                    getNewApplications(
                      `${
                        process.env.REACT_APP_BASE_URL
                      }api/v1/invoice/invoices?${queryParams.toString()}&${invoiceNumber}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&limit=${limit}&offset=${offset}&is_read=true`
                    );
                  }}
                />
              </th>

              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead> */}
          <tbody>
            {applications?.length === 0 ? (
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
                {applications?.map((app) => (
                  <>
                    <tr key={app?.id}>
                      <td>{app?.first_name + " " + app?.last_name}</td>

                      <td>
                        {app?.mobile} <br />
                        {app?.email}
                      </td>

                      <td>
                        <Badge bg={"success"}>Sales Man</Badge>
                      </td>
                      <td>{app?.residual_percentage}</td>
                      <td style={{ maxWidth: "250px", whiteSpace: "pre-wrap" }}>
                        <div
                          style={{ maxWidth: "100%", wordBreak: "break-word" }}
                        >
                          {app.upfront_percentage}
                        </div>
                      </td>
                      <td style={{ maxWidth: "250px", whiteSpace: "pre-wrap" }}>
                        <div
                          style={{ maxWidth: "100%", wordBreak: "break-word" }}
                        >
                          {app.partner_id}
                        </div>
                      </td>
                      <td style={{ maxWidth: "250px", whiteSpace: "pre-wrap" }}>
                        <div
                          style={{ maxWidth: "100%", wordBreak: "break-word" }}
                        >
                          {app.contact_id}
                        </div>
                      </td>
                      <td>
                        <div
                          className="d-flex gap-2 align-items-center justify-content-center"
                          style={{ fontSize: "19px" }}
                        >
                          <div
                            onClick={() => {
                              localStorage.setItem("userId", app?.id);

                              navigate(`/user-details`);
                            }}
                            className="d-flex justify-content-center view_btn"
                          >
                            <BsEye />
                          </div>
                          <div
                            onClick={() => {
                              localStorage.setItem("userId", app?.id);

                              navigate(`/edit-salesman`);
                            }}
                            className="d-flex justify-content-center edit_btn"
                          >
                            <BiEdit />
                          </div>

                          <div
                            onClick={() => {
                              handleDelete(app);
                            }}
                            className="d-flex justify-content-center delete_btn"
                          >
                            <Trash />
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

            {renderPaginationItems(
             
            )}

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
    </div>
  );
};

export default SalesManList;
