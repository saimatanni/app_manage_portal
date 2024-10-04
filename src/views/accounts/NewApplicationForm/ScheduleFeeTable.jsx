import React from "react";

import { useState } from "react";

import Table from "react-bootstrap/Table";
import { Form,  } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
import { CButton } from "@coreui/react";
const ScheduleFeeTable = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("£ 0.015");
  const [act, setAct] = useState("");
  const [atv, setAtv] = useState("");
  const [auth, setAuth] = useState("");
  const [mmsc, setMmsc] = useState("");

  // ------------------------api call----------------------
  useEffect(() => {
    if (applicationInput.mmsc === null || applicationInput.mmsc === "") {
      dispatch(GetApplicationInput("mmsc", 0));
    }
  }, []);
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );

  const handlechangeEntityvalue = (name, value, e) => {
    const sanitizedValue = value.replace(/,/g, "");

    // Format the input value with commas
    const formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (name === "auth_fees") {
      setAuth(value);
      dispatch(GetApplicationInput("auth_fees", value));
    }
    if (name === "mmsc") {
      setMmsc(value);
      if (auth > 0) {
        dispatch(GetApplicationInput("mmsc", 15));
      } else {
        dispatch(GetApplicationInput("mmsc", value));
      }
    }
    if (name === "atv") {
      // if(aut)
      setAtv(value);
      dispatch(GetApplicationInput("atv", value));
    }
    if (name === "annual_card_turnover") {
      setAct(formattedValue);
      dispatch(GetApplicationInput("annual_card_turnover", formattedValue));
    }
  };

  const handleChangeInput = (name, value, e) => {
    // dispatch(GetApplicationInput(name, value, e));
    const sanitizedValue = value.replace(/,/g, "");

    // Format the input value with commas in the Indian numbering system
    // const formattedValue = sanitizedValue.replace(
    //   /(\d)(?=(\d\d)+\d$)/g,
    //   '$1,'
    // );
    const formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    dispatch(GetApplicationInput(name, formattedValue, e));
    if (applicationInput.desc_of_service === null) {
      dispatch(GetApplicationInput("desc_of_service", ""));
    }
  };
  const handleChangeatv = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
  };
  useEffect(() => {
    if (typeof applicationInput.annual_turnover === "string") {
      const sanitizedValue = applicationInput.annual_turnover?.replace(
        /,/g,
        ""
      );
      dispatch(
        GetApplicationInput(
          "annual_turnover",
          sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [applicationInput.annual_turnover]);
  useEffect(() => {
    if (typeof applicationInput.smtv === "string") {
      const sanitizedValue = applicationInput.smtv?.replace(/,/g, "");
      dispatch(
        GetApplicationInput(
          "smtv",
          sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [applicationInput.smtv]);
  useEffect(() => {
    if (typeof applicationInput.annual_card_turnover === "string") {
      const sanitizedValue = applicationInput.annual_card_turnover.replace(
        /,/g,
        ""
      );
      dispatch(
        GetApplicationInput(
          "annual_card_turnover",
          sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      );
    }
  }, [applicationInput.annual_card_turnover]);

  const percentage =
    parseInt(applicationInput?.sales_ftf_perc) +
      parseInt(applicationInput?.sales_moto_perc) +
      parseInt(applicationInput?.sales_internet_perc) || 0;
  // const annual_card_turnover = parseFloat(
  //   applicationInput.annual_card_turnover?.replace(/,/g, "")
  // );
  useEffect(() => {
    // for (const product of applicationInput.application_products) {
    if (typeof applicationInput.annual_card_turnover === "string") {
      if (applicationInput.annual_card_turnover?.replace(/,/g, "") >= 2000000) {
        dispatch(GetApplicationInput("parent_entity_code", "52495"));
      } else {
        if (applicationInput.renting_elavon_terminals === true) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53266"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53269"));
          }
        } else if (applicationInput.renting_elavon_terminals === false) {
          // if (annual_card_turnover >= 2000000) {
          //   dispatch(GetApplicationInput("parent_entity_code", "52495"));
          // } else
          if (
            applicationInput.annual_card_turnover?.replace(/,/g, "") >=
              500000 &&
            applicationInput.annual_card_turnover?.replace(/,/g, "") < 2000000
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53266"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53269"));
            }
          } else if (
            applicationInput.annual_card_turnover?.replace(/,/g, "") < 500000 &&
            applicationInput.auth_fees <= 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53267"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53270"));
            }
          } else if (
            applicationInput.annual_card_turnover?.replace(/,/g, "") < 500000 &&
            applicationInput.auth_fees > 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          } else if (applicationInput.auth_fees > 0) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          }
        }
      }
    } else {
      if (applicationInput.annual_card_turnover >= 2000000) {
        dispatch(GetApplicationInput("parent_entity_code", "52495"));
      } else {
        if (applicationInput.renting_elavon_terminals === true) {
          if (applicationInput.atv < 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53266"));
          } else if (applicationInput.atv >= 30) {
            dispatch(GetApplicationInput("parent_entity_code", "53269"));
          }
        } else if (applicationInput.renting_elavon_terminals === false) {
          // if (applicationInput.annual_card_turnover >= 2000000) {
          //   dispatch(GetApplicationInput("parent_entity_code", "52495"));
          // } else
          if (
            applicationInput.annual_card_turnover >= 500000 &&
            applicationInput.annual_card_turnover < 2000000
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53266"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53269"));
            }
          } else if (
            applicationInput.annual_card_turnover < 500000 &&
            applicationInput.auth_fees <= 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53267"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53270"));
            }
          } else if (
            applicationInput.annual_card_turnover < 500000 &&
            applicationInput.auth_fees > 0
          ) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          } else if (applicationInput.auth_fees > 0) {
            if (applicationInput.atv < 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53265"));
            } else if (applicationInput.atv >= 30) {
              dispatch(GetApplicationInput("parent_entity_code", "53268"));
            }
          }
        }
      }
    }

    if (applicationInput.sales_moto_perc === null) {
      dispatch(GetApplicationInput("sales_moto_perc", 0));
    }
    if (applicationInput.sales_internet_perc === null) {
      dispatch(GetApplicationInput("sales_internet_perc", 0));
    }
    if (applicationInput.sales_ftf_perc === null) {
      dispatch(GetApplicationInput("sales_ftf_perc", 0));
    }
    // }
    if (
      applicationInput.auth_fees > 0 ||
      applicationInput.parent_entity_code === "53266" ||
      applicationInput.parent_entity_code === "53268  " ||
      applicationInput.parent_entity_code === "53265 " ||
      applicationInput.parent_entity_code === "53269"
    ) {
      dispatch(GetApplicationInput("mmsc", 15));
    }
    if (applicationInput.application_type === 2) {
      dispatch(GetApplicationInput("sales_internet_perc", 100));
      dispatch(GetApplicationInput("sales_moto_perc", 0));
      dispatch(GetApplicationInput("sales_ftf_perc", 0));
    }
  }, [
    atv,
    mmsc,
    auth,
    act,
    applicationInput.atv,
    applicationInput.renting_elavon_terminals,
    applicationInput.parent_entity_code,
    applicationInput.application_type,
  ]);
  useEffect(() => {
    if (!applicationInput.sales_moto_perc) {
      dispatch(GetApplicationInput("sales_moto_perc", 0));
    }
    if (!applicationInput.sales_internet_perc === null) {
      dispatch(GetApplicationInput("sales_internet_perc", 0));
    }
    if (!applicationInput.sales_ftf_perc === null) {
      dispatch(GetApplicationInput("sales_ftf_perc", 0));
    }
  }, []);

  return (
    <div className="form-wrapper">
      <div className="d-flex heading px-2">
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

        <p>Table </p>
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
                          // placeholder="£"
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          name="auth_fees"
                          value={applicationInput.auth_fees}
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
                {/* <tr>
                  <td>
                    Entity code <span className="required">*</span>
                  </td>
                  <td>
                    <Form.Group controlId="formBasicSelect">
                      <Form.Control
                        type="number"
                        // placeholder="£"
                        min={0}
                        onWheel={(e) => e.target.blur()}
                        name="parent_entity_code"
                        value={applicationInput.parent_entity_code}
                        onChange={(e) => {
                          handleChangeatv("parent_entity_code", e.target.value);
                        }}
                      />
                    </Form.Group>
                
                  </td>
                  <td> </td>
                </tr> */}

                <tr>
                  <td>
                    MMSC <span className="required">*</span>
                  </td>
                  <td>
                    <Form.Group controlId="formBasicSelect">
                      <Form.Select
                        disabled={
                          applicationInput.auth_fees > 0 ||
                          applicationInput.parent_entity_code === "53266" ||
                          applicationInput.parent_entity_code === "53268  " ||
                          applicationInput.parent_entity_code === "53265 " ||
                          applicationInput.parent_entity_code === "53269"
                            ? true
                            : false
                        }
                        name="mmsc"
                        onWheel={(e) => e.target.blur()}
                        value={parseInt(applicationInput.mmsc)}
                        onChange={(e) => {
                          handlechangeEntityvalue("mmsc", e.target.value);
                          // setType2(e.target.value);
                        }}
                      >
                        <option value="">--</option>

                        <option value={0}>£ 0</option>
                        <option value={15}>£ 15</option>
                        <option value={30}>£ 30</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td> </td>
                </tr>

                <tr>
                  <td>
                    Average transaction value{" "}
                    <span className="required">*</span>
                  </td>
                  <td>
                    {" "}
                    <div className="currency-input">
                      <Form.Group controlId="formBasicSelect">
                        <Form.Control
                          min={25}
                          type="number"
                          // placeholder="£"
                          name="atv"
                          onWheel={(e) => e.target.blur()}
                          value={applicationInput.atv}
                          onChange={(e) => {
                            const inputValue = parseFloat(e.target.value);
                            if (inputValue >= 25) {
                              handleChangeatv("atv", inputValue);
                            } else {
                              handleChangeatv("atv", inputValue);
                            }
                          }}
                          // onChange={(e) => {
                          //   handlechangeEntityvalue("atv", e.target.value);
                          // }}
                        />
                      </Form.Group>{" "}
                    </div>
                  </td>
                  <td> </td>
                </tr>
                <tr>
                  <td>
                    Single maximum transaction value{" "}
                    <span className="required">*</span>
                  </td>
                  <td>
                    {" "}
                    <div className="currency-input">
                      <Form.Group controlId="formBasicSelect">
                        <Form.Control
                          // type="number"
                          min={0}
                          // placeholder="£"
                          name="smtv"
                          onWheel={(e) => e.target.blur()}
                          value={applicationInput.smtv}
                          onChange={(e) => {
                            handleChangeInput("smtv", e.target.value);
                          }}
                        />
                      </Form.Group>{" "}
                    </div>
                  </td>
                  <td> </td>
                </tr>
                <tr>
                  <td>
                    Annual Business Turnover <span className="required">*</span>
                  </td>
                  <td>
                    {" "}
                    <div className="currency-input">
                      <Form.Group controlId="formBasicSelect">
                        <Form.Control
                          className={` ${
                            typeof applicationInput.annual_turnover ===
                              "string" &&
                            typeof applicationInput.annual_card_turnover ===
                              "string" &&
                            parseFloat(
                              applicationInput.annual_turnover?.replace(
                                /,/g,
                                ""
                              )
                            ) <
                              parseFloat(
                                applicationInput.annual_card_turnover?.replace(
                                  /,/g,
                                  ""
                                )
                              ) &&
                            applicationInput.annual_turnover !== ""
                              ? "error_input"
                              : ""
                          }`}
                          // type="number"
                          // placeholder="£"
                          min={0}
                          name="annual_turnover"
                          onWheel={(e) => e.target.blur()}
                          value={applicationInput.annual_turnover}
                          onChange={(e) => {
                            handleChangeInput(
                              "annual_turnover",
                              e.target.value
                            );
                          }}
                        />
                      </Form.Group>{" "}
                    </div>
                  </td>
                  <td> </td>
                </tr>
                <tr>
                  <td>
                    Annual Card Turnover<span className="required">*</span>
                  </td>
                  <td>
                    {" "}
                    <div className="currency-input">
                      <Form.Group controlId="formBasicSelect">
                        <Form.Control
                          className={` ${
                            typeof applicationInput.annual_turnover ===
                              "string" &&
                            typeof applicationInput.annual_card_turnover ===
                              "string" &&
                            parseFloat(
                              applicationInput.annual_turnover?.replace(
                                /,/g,
                                ""
                              )
                            ) <
                              parseFloat(
                                applicationInput.annual_card_turnover?.replace(
                                  /,/g,
                                  ""
                                )
                              ) &&
                            applicationInput.annual_card_turnover !== ""
                              ? "error_input"
                              : ""
                          }`}
                          // type="number"
                          // placeholder="£"
                          name="annual_card_turnover"
                          onWheel={(e) => e.target.blur()}
                          value={applicationInput.annual_card_turnover}
                          onChange={(e) => {
                            handlechangeEntityvalue(
                              // handleChangeInput(
                              "annual_card_turnover",
                              e.target.value
                            );
                          }}
                        />
                      </Form.Group>{" "}
                    </div>
                  </td>
                  <td> </td>
                </tr>

                <tr>
                  <td>
                    Card acceptance ratio <span className="required">*</span>
                  </td>
                  <td>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 mb-3">
                        <CButton
                          color="info"
                          className="clear-btn mb-3"
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            // background: "#56CCF2",
                          }}
                        >
                          Face to Face
                        </CButton>
                        <div className="parcent-input">
                          <Form.Group controlId="formBasicSelect">
                            <Form.Control
                              disabled={
                                applicationInput.application_type === 2 && true
                              }
                              type="number"
                              // placeholder="%"
                              name="sales_ftf_perc"
                              onWheel={(e) => e.target.blur()}
                              value={applicationInput.sales_ftf_perc}
                              onChange={(e) => {
                                handleChangeInput(
                                  "sales_ftf_perc",
                                  e.target.value
                                );
                                setType(e.target.value);
                              }}
                            />
                          </Form.Group>{" "}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-3">
                        <CButton
                          color="warning"
                          className="clear-btn mb-3"
                          style={{ width: "100%", fontSize: "14px" }}
                        >
                          CNP/MOTO
                        </CButton>
                        <div className="parcent-input">
                          <Form.Group controlId="formBasicSelect">
                            <Form.Control
                              disabled={
                                applicationInput.application_type === 2 && true
                              }
                              type="number"
                              // placeholder="%"
                              name="sales_moto_perc"
                              onWheel={(e) => e.target.blur()}
                              value={applicationInput.sales_moto_perc}
                              onChange={(e) => {
                                handleChangeInput(
                                  "sales_moto_perc",
                                  e.target.value
                                );
                              }}
                            />
                          </Form.Group>{" "}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-3">
                        <CButton
                          color="danger"
                          className="clear-btn mb-3"
                          style={{ width: "100%", fontSize: "14px" }}
                        >
                          E-Commerce
                        </CButton>
                        <div className="parcent-input">
                          <Form.Group controlId="formBasicSelect">
                            <Form.Control
                              type="number"
                              // placeholder="%"
                              name="sales_internet_perc"
                              onWheel={(e) => e.target.blur()}
                              value={applicationInput.sales_internet_perc}
                              onChange={(e) => {
                                handleChangeInput(
                                  "sales_internet_perc",
                                  e.target.value
                                );
                              }}
                            />
                          </Form.Group>{" "}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="progress-box"
                      style={{ width: 200, height: 200 }}
                    >
                      {percentage === 100 ? (
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          strokeWidth={5}
                          styles={buildStyles({
                            pathColor: "#2E8B57",
                            // pathColor: "#FF3A29",
                            textColor: "#000000",
                            //   trailColor: '#FF3A29',
                            backgroundColor: "#FFE5D3",
                            height: "25px",
                          })}
                        />
                      ) : (
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          strokeWidth={5}
                          styles={buildStyles({
                            pathColor: "#FF3A29",
                            textColor: "#000000",
                            //   trailColor: '#FF3A29',
                            backgroundColor: "#FFE5D3",
                            height: "25px",
                          })}
                        />
                      )}
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Notes for pricing</td>
                  <td>
                    <Form.Group controlId="formBasicSelect">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="sof_notes"
                        value={applicationInput.sof_notes}
                        onChange={(e) => {
                          handleChangeInput("sof_notes", e.target.value);
                        }}
                      />
                    </Form.Group>
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
