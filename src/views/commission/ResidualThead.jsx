import React from "react";
import PropTypes from "prop-types";

const ResidualThead = ({ search, handleFilterInput}) => {
  ResidualThead.propTypes = {
    search: PropTypes.string,
    handleFilterInput:PropTypes.func
  };
  return <thead>
  <tr
    style={{
      borderTop: "2px solid #d8dbe0",
      borderBottom: "2px solid #d8dbe0",
    }}
  >
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
          name="mid"
          onChange={handleFilterInput}
          value={search["mid"]}
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
          name="legal_name"
          onChange={handleFilterInput}
          value={search["legal_name"]}
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
          name="trading_name"
          onChange={handleFilterInput}
          value={search["trading_name"]}
        />
      </div>
    </th>
    {/* mid stat */}
    <th>
      <div>
        <input
          style={{
            minWidth: "130px",
            maxWidth: "130px",
            height: "30px",
          }}
          type="text"
          className="top-input"
          name="mid_status"
          onChange={handleFilterInput}
          value={search["mid_status"]}
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
          name="monthly_turnover"
          onChange={handleFilterInput}
          value={search["monthly_turnover"]}
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
          name="number_of_tr"
          onChange={handleFilterInput}
          value={search["number_of_tr"]}
        />
      </div>
    </th>
    {/* PCI/DSS Compilance monthly_residual*/}
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
          name="monthly_residual"
          onChange={handleFilterInput}
          value={search["monthly_residual"]}
        />
      </div>
    </th>

    {/* Partner Manager Residual Amount */}
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
          name="epos_patrner_residual_amount"
          onChange={handleFilterInput}
          value={search["epos_patrner_residual_amount"]}
        />
      </div>
    </th>
    {/* Statemnet Month */}
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
          name="statement_month"
          onChange={handleFilterInput}
          value={search["statement_month"]}
        />
      </div>
    </th>
    {/* Residual Details */}
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
          name="residual_detail"
          onChange={handleFilterInput}
          value={search["residual_detail"]}
        />
      </div>
    </th>
    <th></th>
  </tr>
</thead>;
};

export default ResidualThead;
