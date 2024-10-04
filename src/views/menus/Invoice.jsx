// import '../Leads/Leads.css'
import "../accounts/Leads/Leads.css";
import React, { useEffect, useState } from "react";

import list from "../../assets/img/new-document.svg";

import { showToast } from "src/utils/ToastHelper";
import axios from "axios";

import { CPagination, CPaginationItem } from "@coreui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";
import { getTimeFormat } from "src/utils/CommonFunction";

import {
  SetApplicationStatusFalse,
  SetApplicationStatusFalse2,
  SetsignStatusFalse,
} from "../accounts/NewApplication/_redux/action/ApplicationAction";
import { useDispatch } from "react-redux";

import { Modal } from "react-bootstrap";
import CreateInvoice from "./CreateInvoice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
const Invoice = () => {
  var userData;
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const userDataCookie = Cookies.get("userData");

  if (userDataCookie) {
    userData = JSON.parse(userDataCookie);
    // Now you can use the parsed userData object
  } else {
    // Handle the case where the cookie is not set or is empty
    // You might want to provide a default value or perform some other action
  }
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  // filter
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [searchText, setSearchText] = useState("query=");
  const [invoiceNumber, setInvoiceNumber] = useState("invoice_no=");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [userName, setUserName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [week, setWeek] = useState("");
  const [month, setMonth] = useState("");

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
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setIsLoading(false);

        const newData = res?.data?.data?.results?.data.map((curr) => ({
          ...curr,
          created_at: getTimeFormat(curr?.created_at),
        }));
        setTotal_item(res.data?.data?.count);
        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setApplications(newData);
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
            // navigate("/login");
          }
        }
      });
  };
  // calling all data
  useEffect(() => {
    // if (location.pathname === "/invoice") {
    //   getNewApplications(
    //     `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?limit=${limit}&offset=${offset}&query=${query}&is_read=true`
    //   );
    // } else {
    //   getNewApplications(
    //     `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?limit=${limit}&offset=${offset}&query=${query}&is_read=true`
    //   );
    // }
    if (userData.id) {
      getNewApplications(
        `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?user=${userData.id}&limit=${limit}&offset=${offset}&query=${query}&is_read=true`
      );
    }
  }, [pageNumber, itemPerPage, sort, sortFieldName, location]);
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
  //edit and create
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [invoice, setInvoice] = useState({
  //   id: "",
  //   document: [],
  //   invoice_no: "",
  //   user: userData.id,
  //   category: "",
  //   weak_number: "",
  //   invoice_status: null,
  //   residual_month: "",
  //   document_urls: [],
  //   description: "",
  // });
  // const handleEdit = (item) => {
  //   setInvoice({
  //     id: item.id,
  //     category: item.category,
  //     user: item.user,
  //     document: item.document,
  //     document_urls: item.document_urls,
  //     residual_month: item.residual_month,
  //     weak_number: item.weak_number,
  //     invoice_no: item.invoice_no,
  //     invoice_status: item.invoice_status,
  //     description: item.description,
  //   });
  // };
  // const handleUpdate = async (app, newStatus) => {
  //   const updatedApp = { ...app, invoice_status: parseInt(newStatus) };

  //   try {
  //     const response = await axios.put(
  //       `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/${updatedApp.id}/`,
  //       updatedApp
  //     );
  //     console.log("Invoice updated:", response.data);
  //     showToast("success", "Invoice updated successfully");
  //     getNewApplications(
  //       `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?user=${userData.id}&limit=${limit}&offset=${offset}&query=${query}&is_read=true`
  //     );
  //     // For example, you can update the app object in the state or refetch the data
  //   } catch (error) {
  //     console.error("Error updating invoice:", error);
  //     showToast("error", "Failed to update invoice");
  //   }
  // };
  // const handleDeleteClick = async (invoiceId) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.delete(
  //       `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/${invoiceId}/`
  //     );
  //     setIsLoading(false);
  //     showToast("success", "Invoice deleted successfully");
  //     console.log("Category deleted:", response.data);
  //     getNewApplications(
  //       `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?limit=${limit}&offset=${offset}&query=${query}&is_read=true`
  //     );
  //     // setInvoiceList((prevCategories) =>
  //     //   prevCategories.filter((invoice) => invoice.id !== invoiceId)
  //     // );
  //   } catch (error) {
  //     showToast("Error deleting category:", "error");
  //     setIsLoading(false);
  //   }
  //   // handleDelete(item.id); // Assuming item has an ID field
  // };
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
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
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            Invoice List
          </h3>
        </div>
        {/* {userData.user_role === 8 ||
          (userData.user_role === 9 && (
            <div className="justify-content-end align-items-center d-flex col-12 col-md-6 mt-2">
              <h3 style={{ color: "#3C4B64" }}>
                <Button
                  variant="contained"
                  startIcon={<IoMdAdd />}
                  onClick={() => {
                    handleShow();
                    setInvoice({
                      id: "",
                      document: [],
                      invoice_no: "",

                      user: userData.id,

                      document_urls: [],
                    });
                  }}
                >
                  Create{" "}
                </Button>
              </h3>
            </div>
          ))} */}
      </div>
      <br />
      {/* ---------search and item per page--------- */}
      <div className="row">
        <div className="col-12 col-md-7 d-flex align-items-center my-2">
          <span style={{ color: "#212121", fontSize: "14px" }} className="me-2">
            Filter :
          </span>{" "}
          <input
            value={searchQuery}
            onChange={(e) => {
              const queryParams = new URLSearchParams();
              queryParams.append("query", e.target.value);
              queryParams.append("limit", limit);
              queryParams.append("offset", offset);

              setSearchText(queryParams.toString());
              setSearchQuery(e.target.value);
              const apiUrl = `${
                process.env.REACT_APP_BASE_URL
              }api/v1/invoice/invoices/?user=${
                userData.id
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
                `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?user=${userData.id}&${searchText}`
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
                  <p style={{ textAlign: "end" }}>Invoice No.</p>
                </div>
              </th>

              <th>
                <div>
                  <p>Invoice For</p>
                </div>
              </th>

              <th>
                <div>
                  <p>Status</p>
                </div>
              </th>

              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p className="ms-4">Invoice Date</p>
                </div>
              </th>
              <th>Description</th>
              {/* mobile */}
              <th>
                <div className="d-flex justify-content-center gap-2 align-content-center">
                  <p>Invoice</p>
                </div>
              </th>
              {/* {userData?.user_role === 9 && (
                <th>
                  {" "}
                  <div className="d-flex justify-content-center gap-2 align-content-center">
                    <p>Action</p>
                  </div>
                </th>
              )} */}
            </tr>
          </thead>
          <thead className="Invoice_head_input">
            <tr
              style={{
                borderTop: "2px solid #d8dbe0",
                borderBottom: "2px solid #d8dbe0",
              }}
            >
              <th>
                <input
                  className="top-input "
                  value={searchInvoice}
                  type="text"
                  onChange={(e) => {
                    const queryParams = new URLSearchParams();
                    queryParams.append("invoice_no", e.target.value);

                    setInvoiceNumber(queryParams.toString());
                    setSearchInvoice(e.target.value);
                    getNewApplications(
                      `${
                        process.env.REACT_APP_BASE_URL
                      }api/v1/invoice/invoices?user=${
                        userData.id
                      }&${queryParams.toString()}&user_name=${userName}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&limit=${limit}&offset=${offset}&is_read=true`
                    );
                  }}
                />
              </th>

              <th>
                <input
                  className="top-input "
                  type="text"
                  value={searchUser}
                  onChange={(e) => {
                    const queryParams = new URLSearchParams();
                    queryParams.append("user_name", e.target.value);

                    setSearchUser(e.target.value);
                    setUserName(e.target.value);
                    getNewApplications(
                      `${
                        process.env.REACT_APP_BASE_URL
                      }api/v1/invoice/invoices?${queryParams.toString()}&${invoiceNumber}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&limit=${limit}&offset=${offset}&is_read=true&user=${
                        userData.id
                      }`
                    );
                  }}
                />
              </th>

              <th></th>
              <th></th>
              <th></th>
              <th></th>
              {/* {userData?.user_role === 9 && <th></th>} */}
            </tr>
          </thead>
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
                      <td>{app?.invoice_no}</td>

                      <td>{app.user_name}</td>

                      <td>
                        <select
                          // disabled={
                          //   userData?.user_role === 8 ||
                          //   userData.user_role === 9
                          //     ? false
                          //     : true
                          // }
                          disabled
                          style={{
                            color: "white",
                            padding: "4px",
                            outline: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            border: "none",
                          }}
                          className={`bg-${
                            app?.invoice_status === 0
                              ? "danger"
                              : app?.invoice_status === 1
                              ? "success"
                              : "secondary"
                          }`}
                          name=""
                          id=""
                          value={app?.invoice_status}
                          // onChange={(e) => handleUpdate(app, e.target.value)}
                        >
                          <option value={0}>Not Paid</option>
                          <option value={1}> Paid</option>
                          <option value={2}>Cancelled</option>
                        </select>
                      </td>
                      <td>{app?.created_at}</td>
                      <td style={{ maxWidth: "250px", whiteSpace: "pre-wrap" }}>
                        <div
                          style={{ maxWidth: "100%", wordBreak: "break-word" }}
                        >
                          {app.description}
                        </div>
                      </td>
                      <td>
                        {app.document_urls &&
                          app.document_urls.map((item) => {
                            return (
                              <button
                                key={app.id}
                                style={{ background: "#176c7d" }}
                                className="btn-sm mx-1 btn text-white"
                                title="View"
                                onClick={() => window.open(item, "_blank")}
                              >
                                File
                              </button>
                            );
                          })}
                      </td>
                      {/* {userData?.user_role === 9 && (
                        <td className="d-flex gap-2 justify-content-center">
                          <div className="d-flex justify-content-center edit_btn">
                            <BiEdit
                              className="edit-icon2"
                              onClick={() => {
                                handleEdit(app);
                                setShow(true);
                              }}
                            />
                          </div>
                          <div className="d-flex justify-content-center delete_btn">
                            {" "}
                            <AiFillDelete
                              className="delete-icon2"
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure you want to delete?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Delete",
                                  cancelButtonText: "Cancel",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleDeleteClick(app.id); // Pass the item's unique identifier to the handleDelete function
                                  }
                                });
                              }}
                            />
                          </div>
                        </td>
                      )} */}
                    </tr>
                  </>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* -------paggination--------- */}
      {/* {total_item !== 0 && (
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
      )} */}
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
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{invoice.id ? "Update" : "Create"} Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateInvoice
            getNewApplications={getNewApplications}
            handleClose={handleClose}
            setInvoice={setInvoice}
            invoice={invoice}
            show={handleShow}
          />
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Invoice;
