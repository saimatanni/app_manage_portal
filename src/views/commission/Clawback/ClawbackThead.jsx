import React from 'react'
import PropTypes from "prop-types";

const ClawbackThead = ({ search, handleFilterInput}) => {
    ClawbackThead.propTypes = {
        search: PropTypes.string,
        handleFilterInput:PropTypes.func
      };
  return (
    <thead className="">
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
                    name="mid_status"
                    onChange={handleFilterInput}
                    value={search["mid_status"]}
                  />
                </div>
              </th>
              {/* mid stat */}
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
                    name="clawback_amount"
                    onChange={handleFilterInput}
                    value={search["clawback_amount"]}
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
                    name="clawbak_status"
                    onChange={handleFilterInput}
                    value={search["clawbak_status"]}
                  />
                </div>
              </th>
              {/* PCI/DSS Compilance */}
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
              {/* PCI/DSS due Date */}
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
                    name="commission_status"
                    onChange={handleFilterInput}
                    value={search["commission_status"]}
                  />
                </div>
              </th>
              {/* PCI/DSS Renewal Date */}
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
                    name="lease_number"
                    onChange={handleFilterInput}
                    value={search["lease_number"]}
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
                    name="clawback_date"
                    onChange={handleFilterInput}
                    value={search["clawback_date"]}
                  />
                </div>
              </th>
            </tr>
          </thead>
  )
}

export default ClawbackThead