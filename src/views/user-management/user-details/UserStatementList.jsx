import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { showToast } from "src/utils/ToastHelper";
import PropTypes from "prop-types";
const UserStatementList = ({ id }) => {
  UserStatementList.propTypes = {
    id: PropTypes.number.isRequired,
  };
  const [invoice, setinvoice] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const getInvoiceList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setinvoice(res?.data?.data);
        console.log("res?.data?.data", res?.data?.data);
      })

      .catch((err) => {
        showToast("error", "Something went wrong");
      });
  };

  useEffect(() => {
    getInvoiceList(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/commission/finance-statement/?limit=${3}&offset=${0}&statement_for=${id}`
    );
  }, []);
  const handleNexteClick = (pageNo) => {
    getInvoiceList(invoice?.next);
  };
  const handlePreviousClick = (pageNo) => {
    getInvoiceList(invoice?.previous);
  };
  console.log("invoice", invoice);
  return (
    <div>
      <div className="product-card">
        <div className="product-card-header">
          <h4>Statement List</h4>
        </div>
        <div className="product-card-body">
          <Table className="product-table" responsive>
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

                {/* <th>File</th>
                <th>Action</th> */}
              </tr>
            </thead>

            {invoice?.results?.length < 1 && (
              <tr>
                <td colSpan="9">
                  <div
                    style={{ background: "#17479d1f" }}
                    className="alert alert-success text-center mt-5 mb-5"
                    role="alert"
                  >
                    Sorry ! No data found.
                  </div>
                </td>
              </tr>
            )}
            <tbody>
              {invoice.results
                ?.slice(0, allDataLoaded ? invoice?.count : 3)
                .map((row) => (
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
                          {row?.category === 1
                            ? "Upfront"
                            : row?.category === 2
                            ? "Residual"
                            : row?.category === 3 && "Clawback"}
                        </Badge>
                      }
                    </td>
                    <td>{row.statement_for_name}</td>
                    {/* <td>{}</td> */}
                    <td>{row.weak_number ? row.weak_number : "--"}</td>
                    <td>{row.residual_month ? row.residual_month : "--"}</td>
                    <td>
                      <select
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
                          row?.statement_status === 0
                            ? "danger"
                            : row?.statement_status === 1
                            ? "success"
                            : "secondary"
                        }`}
                        name=""
                        id=""
                        value={row?.statement_status}
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
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className="load-more-button-container gap-2">
            <p className="m-0">
              Total : <span>{invoice?.count}</span>
            </p>
            <button
              disabled={invoice?.previous ? false : true}
              className={` ${
                invoice?.previous ? "load-more-button" : "disable-button"
              }`}
              onClick={handlePreviousClick}
            >
              Prev
            </button>
            <button
              disabled={invoice?.next ? false : true}
              className={` ${
                invoice?.next ? "load-more-button" : "disable-button"
              }`}
              onClick={handleNexteClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatementList;
