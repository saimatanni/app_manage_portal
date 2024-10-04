import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { getTimeFormat } from "src/utils/CommonFunction";
import { showToast } from "src/utils/ToastHelper";
import PropTypes from "prop-types";
const UserInvoiceList = ({ id }) => {
  UserInvoiceList.propTypes = {
    id: PropTypes.number.isRequired,
  };
  const [invoice, setinvoice] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const getInvoiceList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setinvoice(res?.data?.data);
      })
      .catch((err) => {
        showToast("error", "Something went wrong");
      });
  };

  useEffect(() => {
    getInvoiceList(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/invoice/invoices/?limit=${3}&offset=${0}&is_read=true&user=${id}`
    );
  }, []);
  const handleNexteClick = (pageNo) => {
    getInvoiceList(invoice?.next);
  };
  const handlePreviousClick = (pageNo) => {
    getInvoiceList(invoice?.previous);
  };
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h4>Invoice List</h4>
      </div>
      <div className="product-card-body">
        <Table className="product-table" responsive>
          <thead>
            <tr>
              <th>Invoice No</th>

              <th>Invoice For</th>
              <th>Description</th>
              {/* <th>Residual Month</th> */}
              <th>Invoice Date</th>
              <th>Invoice</th>
            </tr>
          </thead>

          {invoice?.results?.data?.length < 1 && (
            <tr>
              <td colSpan="12">
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
            {invoice.results?.data
              ?.slice(0, allDataLoaded ? invoice?.count : 3)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.invoice_no}</td>

                  <td>{item.user_name}</td>
                  <td>{item.description ? item.description : "--"}</td>
                  {/* <td>{item.residual_month ? item.residual_month : "--"}</td> */}
                  <td>
                    {item?.created_at && (
                      <span>
                        {`${new Date(item?.created_at).getDate()}/${
                          new Date(item?.created_at).getMonth() + 1
                        }/${new Date(
                          item?.created_at
                        ).getFullYear()} at ${new Date(
                          item?.created_at
                        ).getHours()}:${String(
                          new Date(item?.created_at).getMinutes()
                        )?.padStart(2, "0")}`}
                      </span>
                    )}
                  </td>
                  <td>
                    {item.document_urls &&
                      item.document_urls.map((item, i) => {
                        return (
                          <Button
                            key={i}
                            style={{ background: "#1e2553" }}
                            variant="primary"
                            className="btn-sm mx-1 text-white"
                            title="View"
                            onClick={() => window.open(item, "_blank")}
                          >
                            File
                          </Button>
                        );
                      })}
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
  );
};

export default UserInvoiceList;
