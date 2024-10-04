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
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  SetApplicationStatusFalse,
  SetApplicationStatusFalse2,
  SetsignStatusFalse,
} from "../accounts/NewApplication/_redux/action/ApplicationAction";
import { useDispatch } from "react-redux";

import { Badge, Modal } from "react-bootstrap";

import { Button } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import CreateStatement from "./CreateStatement";
import { IoMdAdd } from "react-icons/io";
const CommissionStatement = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // initial data and Loader
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  console.log("applications", applications);
  // filter
  const [query, setQuery] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [searchText, setSearchText] = useState("query=");
  const [invoiceNumber, setInvoiceNumber] = useState("invoice_no=");
  const [userName, setUserName] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [week, setWeek] = useState("");
  const [statement, setStatement] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [transection, setTransection] = React.useState([]);
  const [invoceList, setInvoiceList] = React.useState([]);
  const [category, setCategory] = useState([
    {
      id: 1,
      title: "UpFront",
    },
    {
      id: 2,
      title: "Residual",
    },
    {
      id: 3,
      title: "Clawback",
    },
  ]);
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
  const location = useLocation();
  const getNewApplications = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        // setIsLoading(true)
        console.log(res.data, "new application");
        const newData = res?.data?.data?.results;
        setTotal_item(res.data?.data?.count);

        setTotalData(res.data?.data?.count);
        setNextUrl(res.data?.data?.next);
        setPrevUrl(res.data?.data?.previous);
        setTransection(res.data?.data.data);
        setInvoiceList(newData);
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
    if (location.pathname === "/commission-statement" ? userData.id : "") {
      getNewApplications(
        `${
          process.env.REACT_APP_BASE_URL
        }api/v1/commission/finance-statement/?statement_for=${
          location.pathname === "/commission-statement" ? userData.id : ""
        }&limit=${itemPerPage}&offset=${offset}`
      );
    } else {
      getNewApplications(
        `${
          process.env.REACT_APP_BASE_URL
        }api/v1/commission/finance-statement/?statement_for=${
          location.pathname === "/commission-statement" ? userData.id : ""
        }&limit=${itemPerPage}&offset=${offset}`
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

  //   const getNewApplications = (url) => {
  //     setIsLoading(true);
  //     fetch(url, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Token ${localStorage.getItem("access_token")}`,
  //       },
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`Network response was not ok (status ${res.status})`);
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setTransection(data.data);
  //         setInvoiceList(data.data?.results);
  //         setTotal_item(data?.data?.count);
  //         setTotalData(data?.data?.count);
  //         setNextUrl(data?.data?.next);
  //         setPrevUrl(data?.data?.previous);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         showToast("Error fetching transaction list:", "error");
  //         setIsLoading(false);
  //         // You can handle the error here, such as displaying an error message.
  //       });
  //   };
  // if (isLoading) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   );
  // }

  //edit delete
  const [invoice, setInvoice] = useState({
    id: "",
    document: [],
    invoice_no: null,
    user: "",
    category: "",
    weak_number: null,
    statment_status: null,
    residual_month: null,
    document_urls: [],
    // added by bablu
    title: "",
    statement_for: userData?.id,
    statement_doc: "",
    slug: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClick = async (invoiceId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/finance-statement/${invoiceId}`
      );
      setIsLoading(false);
      showToast("success", "Statement deleted successfully");
      console.log("Category deleted:", response.data);
      getNewApplications(
        `${
          process.env.REACT_APP_BASE_URL
        }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&statement_for=${
          location.pathname === "/commission-statement" ? userData.id : ""
        }`
      );
      // setInvoiceList((prevCategories) =>
      //   prevCategories.filter((invoice) => invoice.id !== invoiceId)
      // );
    } catch (error) {
      showToast("Error deleting category:", "error");
      setIsLoading(false);
    }
    // handleDelete(item.id); // Assuming item has an ID field
  };
  const handleEdit = (item) => {
    setInvoice({
      id: item.id,
      category: item.category,
      user: item.user,
      document: item.document,
      document_urls: item.document_urls,
      residual_month: item.residual_month,
      weak_number: item.weak_number,
      invoice_no: item.invoice_no,
      invoice_status: item.invoice_status,
      title: item.title,
      statement_for: item.statement_for,
      statement_doc: item.statement_doc,
      slug: item.slug,
      statement_for_name: item?.statement_for_name,
    });
  };
  useEffect(() => {
    if (!show) {
      setInvoice({
        id: "",
        document: [],
        invoice_no: "",
        // invoice_status: null,
        user: "",
        category: "",
        weak_number: "",
        statement_for: userData.id,

        residual_month: "",
        document_urls: [],
      });
    }
  }, [show]);
 
  const handleUpdate = async (invoice, newStatus) => {
    setIsLoading(true);
    const newData = new FormData();
    newData.append("statement_status", newStatus);
    newData.append("invoice_no", invoice?.invoice_no);
    newData.append("category", invoice?.category);
    if (invoice?.weak_number) {
      newData.append("weak_number", invoice?.weak_number);
    }
    if (invoice?.residual_month)
      newData.append("residual_month", invoice?.residual_month);

    newData.append("title", invoice?.title);
    newData.append("statement_for", invoice?.statement_for);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/finance-statement/${invoice.slug}/`,
        newData
      );
      console.log("Invoice updated:", response.data);
      showToast("success", "Statement updated successfully");
      getNewApplications(
        `${
          process.env.REACT_APP_BASE_URL
        }api/v1/commission/finance-statement/?limit=20&statement_for=${
          location.pathname === "/commission-statement" ? userData.id : ""
        }`
      );
    } catch (error) {
      console.error("Error updating invoice:", error);
      setIsLoading(false);

      try {
        const errorMsg = JSON.parse(error.request.response).errors;
        const msg = JSON.parse(error.request.response).message;

        showToast("error", msg);

        const dataArray = Object.entries(errorMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );

        dataArray.forEach((item) => showToast("error", item));
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        showToast("error", "An error occurred while processing the response");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading &&
    <Backdrop
    open
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    }
      <div className="row mt-4">
        <div className="col-12 col-md-6">
          <h3 style={{ color: "#3C4B64" }}>
            <img src={list} width="32" className="me-2" alt="" />
            Commission statement
          </h3>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-end">
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={handleShow}
          >
            Create{" "}
          </Button>
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
              queryParams.append("query", e.target.value);
              queryParams.append("limit", limit);
              queryParams.append("offset", offset);

              setSearchText(queryParams.toString());

              const apiUrl = `${
                process.env.REACT_APP_BASE_URL
              }api/v1/commission/finance-statement/?${queryParams.toString()}`;
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
                `${
                  process.env.REACT_APP_BASE_URL
                }api/v1/commission/finance-statement/?${searchText}&statement_for=${
                  location.pathname === "/commission-statement"
                    ? userData.id
                    : ""
                }`
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
          <thead>
            <tr>
              <th style={{ color: "black" }}>Invoice No.</th>
              <th>Statement Title</th>
              <th>Category</th>
              <th>Statement For</th>
              <th>Week No.</th>
              <th>Residual Month</th>
              <th>Status</th>

              <th>Statement Date </th>

              <th>File</th>
              {userData?.user_role === 9 && <th>Action</th>}
            </tr>
          </thead>
          <thead className="Invoice_head_input">
            <th>
              <input
                className="top-input "
                type="text"
                onChange={(e) => {
                  const queryParams = new URLSearchParams();
                  queryParams.append("invoice_no", e.target.value);
                  queryParams.append("limit", "20");
                  setInvoiceNumber(e.target.value);
                  getNewApplications(
                    `${
                      process.env.REACT_APP_BASE_URL
                    }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&user_name=${userName}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&invoice_status=${status}&created_at=${createdAt}&statement_for=${
                      location.pathname === "/commission-statement"
                        ? userData.id
                        : ""
                    }`
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
                  queryParams.append("statement_title", e.target.value);
                  queryParams.append("limit", "20");
                  setStatement(e.target.value);
                  getNewApplications(
                    `${
                      process.env.REACT_APP_BASE_URL
                    }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&user_name=${userName}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&invoice_status=${status}&created_at=${createdAt}&invoice_no=${invoiceNumber}&statement_for=${
                      location.pathname === "/commission-statement"
                        ? userData.id
                        : ""
                    }`
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
                  queryParams.append("category_title", e.target.value);
                  queryParams.append("limit", "20");
                  setCategoryTitle(e.target.value);
                  getNewApplications(
                    `${
                      process.env.REACT_APP_BASE_URL
                    }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&user_name=${userName}&${invoiceNumber}&weak_number=${week}&residual_month=${month}&invoice_status=${status}&created_at=${createdAt}&invoice_no=${invoiceNumber}&statement_title=${statement}&statement_for=${
                      location.pathname === "/commission-statement"
                        ? userData.id
                        : ""
                    }`
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
                  queryParams.append("statement_for_name", e.target.value);
                  queryParams.append("limit", "20");
                  setUserName(e.target.value);
                  getNewApplications(
                    `${
                      process.env.REACT_APP_BASE_URL
                    }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&${invoiceNumber}&category_title=${categoryTitle}&weak_number=${week}&residual_month=${month}&invoice_status=${status}&created_at=${createdAt}&invoice_no=${invoiceNumber}&statement_title=${statement}&statement_for=${
                      location.pathname === "/commission-statement"
                        ? userData.id
                        : ""
                    }`
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
                  queryParams.append("weak_number", e.target.value);
                  queryParams.append("limit", "20");
                  setWeek(e.target.value);
                  getNewApplications(
                    `${
                      process.env.REACT_APP_BASE_URL
                    }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&user_name=${userName}&category_title=${categoryTitle}&residual_month=${month}&invoice_status=${status}&created_at=${createdAt}&invoice_no=${invoiceNumber}&statement_title=${statement}&statement_for=${
                      location.pathname === "/commission-statement"
                        ? userData.id
                        : ""
                    }`
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
                  queryParams.append("residual_month", e.target.value);
                  queryParams.append("limit", "20");
                  setMonth(e.target.value);
                  getNewApplications(
                    `${
                      process.env.REACT_APP_BASE_URL
                    }api/v1/commission/finance-statement/?limit=${itemPerPage}&offset=${offset}&${queryParams.toString()}&user_name=${userName}&category_title=${categoryTitle}&weak_number=${week}&invoice_status=${status}&created_at=${createdAt}&invoice_no=${invoiceNumber}&statement_title=${statement}&statement_for=${
                      location.pathname === "/commission-statement"
                        ? userData.id
                        : ""
                    }`
                  );
                }}
              />
            </th>
            <th></th>
            <th></th>
            <th></th>
            {userData?.user_role === 9 && <th></th>}
          </thead>
          <tbody style={{ borderBottom: "2px solid #dee2e6" }}>
            {invoceList?.length < 1 ? (
              <tr>
                <td colSpan={9}>
                  <div className="not_found">
                    <h4 className="my-4">No Data Found</h4>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {invoceList?.map((row) => (
                  <tr key={row.id}>
                    <td>{row.invoice_number}</td>
                    <td>{row.title}</td>
                    <td>
                      {" "}
                      {
                        <Badge
                          style={{
                            backgroundColor: row?.category === 1 && "#17479D",
                          }}
                          bg={
                            row?.category === 1
                              ? "primary"
                              : row?.category === 2
                              ? "info"
                              : row?.category === 3
                              ? "danger"
                              : "success"
                          }
                        >
                          {/* {row?.category_title} */}
                          {
                            category?.filter(
                              (cat) => cat?.id === row?.category
                            )[0]?.title
                          }
                        </Badge>
                      }
                    </td>
                    <td>{row.statement_for_name}</td>
                    {/* <td>{}</td> */}
                    <td>{row.weak_number ? row.weak_number : "--"}</td>
                    <td>{row.residual_month ? row.residual_month : "--"}</td>
                    <td>
                      <select
                        // disabled
                        style={{
                          color: "white",
                          padding: "4px",
                          outline: "none",
                          borderRadius: "4px",
                          fontSize: "12px",
                          border: "none",
                        }}
                        className={`bg-${
                          row?.statement_status === 0
                            ? "danger"
                            : row?.statement_status === 1
                            ? "success"
                            : "secondary"
                        }`}
                        name=""
                        id=""
                        value={row?.statement_status}
                        onChange={(e) => handleUpdate(row, e.target.value)}
                      >
                        <option value={0}>Not Paid</option>
                        <option value={1}> Paid</option>
                        <option value={2}>Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {row?.created_at && (
                        <span>
                          {`${new Date(row?.created_at).getDate()}/${
                            new Date(row?.created_at).getMonth() + 1
                          }/${new Date(
                            row?.created_at
                          ).getFullYear()} at ${new Date(
                            row?.created_at
                          ).getHours()}:${String(
                            new Date(row?.created_at).getMinutes()
                          )?.padStart(2, "0")}`}
                        </span>
                      )}
                    </td>

                    <td>
                      <Button
                        style={{ background: "#1e2553" }}
                        variant="contained"
                        size="small"
                        title="View"
                        onClick={() =>
                          window.open(row?.statement_doc, "_blank")
                        }
                      >
                        File
                      </Button>
                    </td>
                    {userData?.user_role === 9 && (
                      <td className="d-flex gap-2 justify-content-center">
                        <div className="d-flex justify-content-center edit_btn">
                          <BiEdit
                            className="edit-icon2"
                            onClick={() => {
                              handleEdit(row);
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
                                  handleDeleteClick(row.slug); // Pass the item's unique identifier to the handleDelete function
                                }
                              });
                            }}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {invoice.id ? "Update" : "Create"} Statement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateStatement
            getNewApplications={getNewApplications}
            handleClose={handleClose}
            category={category}
            setInvoice={setInvoice}
            invoice={invoice}
            show={handleShow}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommissionStatement;
