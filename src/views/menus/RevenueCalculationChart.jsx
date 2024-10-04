import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const RevenueCalculationChart = ({
  allCardArray,
  b6DebitCard,
  b7CreditCard,
}) => {
  RevenueCalculationChart.propTypes = {
    allCardArray: PropTypes.string.isRequired,
    b6DebitCard: PropTypes.string.isRequired,
    b7CreditCard: PropTypes.string.isRequired,
  };
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  return (
    <>
      <div className="col-8">
        <ul style={{ listStyle: "none" }}>
          <li style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "-20px",
                top: "8px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#198754",
              }}
            ></span>
            <p className="text-muted">Monthly card Turnover</p>
          </li>
        </ul>
      </div>
      <div className="col-4">
        <p className="fw-bold">£{leadInput.annual_card_turnover || 0.0}</p>
      </div>
      <div className="col-8">
        <ul style={{ listStyle: "none" }}>
          <li style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "-20px",
                top: "8px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#0dcaf0",
              }}
            ></span>
            <p
              className="text-muted"
              //  style={{ width: "180px" }}
            >
              ATV
            </p>
          </li>
        </ul>
      </div>
      <div className="col-4">
        <p className="fw-bold calculator_card_amount">
          £{leadInput.atv || 0.0}
        </p>
      </div>
      <div className="col-8">
        <ul style={{ listStyle: "none" }}>
          <li style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "-20px",
                top: "8px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#bb4ce1",
              }}
            ></span>
            <p
              className="text-muted"
              // style={{ width: "180px" }}
            >
              Visa Debit/Visa V-Pay
            </p>
          </li>
        </ul>
      </div>
      <div className="col-4">
        <p className="fw-bold calculator_card_amount">£{b6DebitCard || 0.0}</p>
      </div>
      <div className="col-8">
        <ul style={{ listStyle: "none" }}>
          <li style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "-20px",
                top: "8px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#125ac5",
              }}
            ></span>
            <p
              className="text-muted"
              // style={{ width: "180px" }}
            >
              Visa Credit/MasterCard Credit
            </p>
          </li>
        </ul>
      </div>
      <div className="col-4">
        <p className="fw-bold calculator_card_amount">
          £{b7CreditCard || 0.0}
        </p>
      </div>
      <div className="col-8">
        <ul style={{ listStyle: "none" }}>
          <li style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "-20px",
                top: "8px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#d56262",
              }}
            ></span>
            <p
              className="text-muted"
              // style={{ width: "180px" }}
            >
              Renting from Elavon
            </p>
          </li>
        </ul>
      </div>
      <div className="col-4">
        <p className="fw-bold calculator_card_amount text-capitalize">
          {leadInput.renting_elavon_terminals}
        </p>
      </div>
      {allCardArray.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="col-8">
              <ul style={{ listStyle: "none" }}>
                <li style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "-20px",
                      top: "8px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#125ac5",
                    }}
                  ></span>
                  <p
                    className="text-muted"
                    // style={{ width: "180px" }}
                  >
                    {item.name}
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-4">
              <p className="fw-bold calculator_card_amount text-capitalize">
                £{item.name_value}
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default RevenueCalculationChart;
