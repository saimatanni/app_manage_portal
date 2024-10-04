import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";

import { showToast } from "src/utils/ToastHelper";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { LeadStatus } from "src/views/common/Dropdown";

const UserLeadList = ({ id }) => {
  UserLeadList.propTypes = {
    id: PropTypes.number.isRequired,
  };

 const navigate=useNavigate()
  const [leadsList, setLeadsList] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const getsetLeadsList = (url) => {
    axios
      .get(url)
      .then((res) => {
        setLeadsList(res?.data?.data);
      })
      .catch((err) => {
        showToast("error", "Something went wrong");
      });
  };
  console.log("leadsList", leadsList);
  useEffect(() => {
    getsetLeadsList(
      `${
        process.env.REACT_APP_BASE_URL
      }api/v1/lead/lead/?limit=${3}&offset=${0}&user=${id}&local=true`
    );
  }, []);
  const handleNexteClick = (pageNo) => {
    getsetLeadsList(leadsList?.next);
  };
  const handlePreviousClick = (pageNo) => {
    getsetLeadsList(leadsList?.previous);
  };
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h4>Lead List</h4>
      </div>
      <div className="product-card-body">
        <Table className="product-table" responsive>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Legal Name</th>
              <th>Trading Name</th>
              <th>Lead Status</th>
              {/* <th style={{ textAlign: "center" }}>Action</th> */}
            </tr>
          </thead>

          {leadsList?.results?.length < 1 && (
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
            {leadsList?.results
              ?.slice(0, allDataLoaded ? leadsList?.count : 3)
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.client_id}</td>
                  <td>{item.legal_name}</td>
                  <td>{item.trading_name}</td>
                  <td>
                    {LeadStatus[item.lead_status] === undefined
                      ? ""
                      : LeadStatus[item.lead_status].toString()}
                  </td>
                  {/* <td
                    align="center"
                    onClick={() => {
                      localStorage.setItem("leadId", item?.slug);
                      navigate(`/leads-preview`);
                    }}
                  >
                    <BsEyeFill className="view_icon" />
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
        {/* {leadsList?.count > 3 && ( */}
        <div className="load-more-button-container gap-2">
          <p>
            Total : <span>{leadsList?.count}</span>
          </p>
          <button
            className={` ${
              leadsList?.previous ? "load-more-button" : "disable-button"
            }`}
            onClick={handlePreviousClick}
          >
            Prev
          </button>
          <button
            className={` ${
              leadsList?.next ? "load-more-button" : "disable-button"
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

export default UserLeadList;
