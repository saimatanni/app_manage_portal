import React from "react";

import { useState } from "react";

import Table from "react-bootstrap/Table";
import { Form,  } from "react-bootstrap";

import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";

import { GetPricequoteInput } from "../_redux/action/PriceQuoteAction";

import { useEffect } from "react";


const ScheduleFeeTable = () => {
  const dispatch = useDispatch();

  const [act, setAct] = useState("");
  const [atv, setAtv] = useState("");
  const [auth, setAuth] = useState("");
  const [mmsc, setMmsc] = useState("");

  // ------------------------api call----------------------
  useEffect(() => {
    if (priceQuoteInput.mmsc === null || priceQuoteInput.mmsc === "") {
      dispatch(GetPricequoteInput("mmsc", 0));
    }
  }, []);
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );

  const handlechangeEntityvalue = (name, value, e) => {
    const sanitizedValue = value?.replace(/,/g, "");

    // Format the input value with commas
    const formattedValue = sanitizedValue?.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    if (name === "auth_fees") {
      setAuth(value);
      dispatch(GetPricequoteInput("auth_fees", value));
    }
    if (name === "mmsc") {
      setMmsc(value);
      dispatch(GetPricequoteInput("mmsc", value));
    }
    if (name === "atv") {
      setAtv(value);
      dispatch(GetPricequoteInput("atv", value));
    }
    if (name === "annual_card_turnover") {
      setAct(formattedValue);
      dispatch(GetPricequoteInput("annual_card_turnover", formattedValue));
    }
  };
  useEffect(() => {
    if (typeof priceQuoteInput.annual_turnover === "string") {
      const sanitizedValue = priceQuoteInput.annual_turnover?.replace(/,/g, "");
      dispatch(
        GetPricequoteInput(
          "annual_turnover",
          sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [priceQuoteInput.annual_turnover]);
  useEffect(() => {
    if (typeof priceQuoteInput.smtv === "string") {
      const sanitizedValue = priceQuoteInput.smtv?.replace(/,/g, "");
      dispatch(
        GetPricequoteInput(
          "smtv",
          sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [priceQuoteInput.smtv]);
  useEffect(() => {
    if (typeof priceQuoteInput.annual_card_turnover === "string") {
      const sanitizedValue = priceQuoteInput.annual_card_turnover.replace(
        /,/g,
        ""
      );
      dispatch(
        GetPricequoteInput(
          "annual_card_turnover",
          sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [priceQuoteInput.annual_card_turnover]);

 

  useEffect(() => {
    // for (const product of priceQuoteInput.application_products) {

    if (priceQuoteInput.annual_card_turnover >= 2000000) {
      dispatch(GetPricequoteInput("parent_entity_code", "52495"));
    } else {
      if (priceQuoteInput.renting_elavon_terminals === true) {
        if (priceQuoteInput.atv < 30) {
          dispatch(GetPricequoteInput("parent_entity_code", "53266"));
        } else if (priceQuoteInput.atv >= 30) {
          dispatch(GetPricequoteInput("parent_entity_code", "53269"));
        }
      } else if (priceQuoteInput.renting_elavon_terminals === false) {
        // if (priceQuoteInput.annual_card_turnover >= 2000000) {
        //   dispatch(GetPricequoteInput("parent_entity_code", "52495"));
        // } else
        if (
          priceQuoteInput.annual_card_turnover >= 500000 &&
          priceQuoteInput.annual_card_turnover < 2000000
        ) {
          if (priceQuoteInput.atv < 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53266"));
          } else if (priceQuoteInput.atv >= 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53269"));
          }
        } else if (
          priceQuoteInput.annual_card_turnover < 500000 &&
          priceQuoteInput.auth_fees <= 0
        ) {
          if (priceQuoteInput.atv < 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53267"));
          } else if (priceQuoteInput.atv >= 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53270"));
          }
        } else if (
          priceQuoteInput.annual_card_turnover < 500000 &&
          priceQuoteInput.auth_fees > 0
        ) {
          if (priceQuoteInput.atv < 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53265"));
          } else if (priceQuoteInput.atv >= 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53268"));
          }
        } else if (priceQuoteInput.auth_fees > 0) {
          if (priceQuoteInput.atv < 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53265"));
          } else if (priceQuoteInput.atv >= 30) {
            dispatch(GetPricequoteInput("parent_entity_code", "53268"));
          }
        }
      }
    }

    if (priceQuoteInput.sales_moto_perc === null) {
      dispatch(GetPricequoteInput("sales_moto_perc", 0));
    }
    if (priceQuoteInput.sales_internet_perc === null) {
      dispatch(GetPricequoteInput("sales_internet_perc", 0));
    }
    if (priceQuoteInput.sales_ftf_perc === null) {
      dispatch(GetPricequoteInput("sales_ftf_perc", 0));
    }
    // }
  }, [atv, mmsc, auth, act]);
 
  return (
    <div className="form-wrapper">
      <div className="d-flex heading px-2 gap-3 align-items-center">
        <svg
          width="24"
          height="28"
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3.33464C9.05448 3.33464 6.66667 5.72245 6.66667 8.66797C6.66667 11.6134 9.05448 14.0013 12 14.0013C14.9455 14.0013 17.3333 11.6134 17.3333 8.66797C17.3333 5.72245 14.9455 3.33464 12 3.33464ZM4 8.66797C4 4.24969 7.58172 0.667969 12 0.667969C16.4183 0.667969 20 4.24969 20 8.66797C20 13.0862 16.4183 16.668 12 16.668C7.58172 16.668 4 13.0862 4 8.66797ZM6.66667 22.0013C4.45753 22.0013 2.66667 23.7921 2.66667 26.0013C2.66667 26.7377 2.06971 27.3346 1.33333 27.3346C0.59696 27.3346 0 26.7377 0 26.0013C0 22.3194 2.98477 19.3346 6.66667 19.3346H17.3333C21.0152 19.3346 24 22.3194 24 26.0013C24 26.7377 23.4031 27.3346 22.6667 27.3346C21.9303 27.3346 21.3333 26.7377 21.3333 26.0013C21.3333 23.7921 19.5425 22.0013 17.3333 22.0013H6.66667Z"
            fill="#0D0D0D"
          />
        </svg>

        <strong>Table </strong>
      </div>

      <div className="mt-4">
        <div className="row">
          <div className="col-12 table-responsive mb-4 ">
            <Table striped className="table-body table-card" id="myInput">
              <tbody>
                <tr>
                  <td>
                    Auth Fees <span className="required">*</span>
                  </td>
                  <td>
                    {" "}
                    <div className="currency-input">
                      <Form.Group controlId="formBasicSelect">
                        <Form.Control
                          type="number"
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          name="auth_fees"
                          value={priceQuoteInput.auth_fees}
                          onChange={(e) => {
                            handlechangeEntityvalue(
                              "auth_fees",
                              e.target.value
                            );
                          }}
                        />
                      </Form.Group>{" "}
                    </div>
                    {/* {item.currentRate} */}
                  </td>
                  <td> </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <div className="mt-4"></div>
    </div>
  );
};

export default ScheduleFeeTable;
