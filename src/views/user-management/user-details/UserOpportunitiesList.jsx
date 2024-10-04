import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";

import { showToast } from "src/utils/ToastHelper";
import { OpportunityStatus } from "src/views/common/Dropdown";
import PropTypes from "prop-types";
const UserOpportunitiesList = ({ id }) => {
  UserOpportunitiesList.propTypes = {
    id: PropTypes.number.isRequired,
  };
  const [priceQuoteList, setPriceQuoteList] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const getsetLeadsList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setPriceQuoteList(res?.data?.data);
      })
      .catch((err) => {
        showToast("error", "Something went wrong");
      });
  };
  console.log("leadsList", priceQuoteList);
  useEffect(() => {
    getsetLeadsList(
      `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/?is_closed=false&limit=3&offset=0&user=${id}&local=true`
    );
  }, []);
  const handleNexteClick = (pageNo) => {
    getsetLeadsList(priceQuoteList?.next);
  };
  const handlePreviousClick = (pageNo) => {
    getsetLeadsList(priceQuoteList?.previous);
  };
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h4>Price Quote List</h4>
      </div>
      <div className="product-card-body">
        <Table className="product-table" responsive>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Legal Name</th>
              <th>Trading Name</th>
              <th>Quote Status</th>
              {/* <th style={{ textAlign: "center" }}>Action</th> */}
            </tr>
          </thead>
          {priceQuoteList?.results?.length < 1 && (
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
            {priceQuoteList?.results
              ?.slice(0, allDataLoaded ? priceQuoteList?.count : 3)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.client_id}</td>
                  <td>{item.legal_name}</td>
                  <td>{item.trading_name}</td>
                  <td>
                    {OpportunityStatus[item.opportunity_status] === undefined
                      ? "-"
                      : OpportunityStatus[item.opportunity_status].toString()}
                  </td>
                  {/* <td
                    align="center"
                    // onClick={() => handleView(item)}
                  >
                    <BsEyeFill className="view_icon" />
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
        {/* {priceQuoteList?.count > 3 && ( */}
        <div className="load-more-button-container gap-2">
          <p>
            Total : <span>{priceQuoteList?.count}</span>
          </p>
          <button
            className={` ${
              priceQuoteList?.previous ? "load-more-button" : "disable-button"
            }`}
            onClick={handlePreviousClick}
          >
            Prev
          </button>
          <button
            className={` ${
              priceQuoteList?.next ? "load-more-button" : "disable-button"
            }`}
            onClick={handleNexteClick}
          >
            Next
          </button>
        </div>
        {/* // )} */}
      </div>
    </div>
  );
};

export default UserOpportunitiesList;
