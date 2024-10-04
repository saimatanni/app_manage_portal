import React from "react";
import webImg from "../../../../assets/img/internet.svg";
import { useDispatch, useSelector } from "react-redux";

import {
  GetEcommerceProductInput,
  GetEposProductInput,
  GetLeadsnput,
  GetTerminalProductInput,
  SetLeadsTypeStatusFalse,
} from "../_redux/action/LeadAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CFormTextarea } from "@coreui/react";
import {
  REMOVE_CARD_TERMINAL_PRODUCT,
  REMOVE_ECOMMERCE_PRODUCT,
  REMOVE_EPOS_PRODUCT,
  SET_CARD_TERMINAL_PRODUCT,
  SET_ECOMMERCE_PRODUCT,
  SET_EPOS_PRODUCT,
} from "../_redux/types/Types";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ServiceInformation() {
  const requiredstyle = {
    color: " #dd2c00",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const afterSuccessLeads = useSelector(
    (state) => state.leadInfo.afterSuccessLeads
  );

  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const [ecomService, setEcomService] = useState(leadInput.ecom_service);
  const [card, setCard] = useState(!leadInput.card_machine_service);
  const [ecom, setEcom] = useState(!leadInput.ecom_service);
  const [epos, setEpos] = useState(!leadInput.epos_service);
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  const handleChangeInput = (name, value, index) => {
    dispatch(GetLeadsnput(name, value, index, "terminal_products"));
    if (name === "card_machine_service") {
      setCard(!card);
      dispatch(GetLeadsnput("card_machine_service", card));
      if (card) {
        dispatch({ type: SET_CARD_TERMINAL_PRODUCT, payload: false });
      } else {
        for (let i = 0; i < leadInput?.terminal_products?.length; i++) {
          dispatch({ type: REMOVE_CARD_TERMINAL_PRODUCT, payload: i });
        }
      }
    }
    if (name === "ecom_service") {
      setEcom(!ecom);
      dispatch(GetLeadsnput("ecom_service", ecom));
      if (ecom) {
        dispatch({ type: SET_ECOMMERCE_PRODUCT, payload: false });
      } else {
        for (let i = 0; i < leadInput?.ecommerce_products?.length; i++) {
          dispatch({ type: REMOVE_ECOMMERCE_PRODUCT, payload: i });
        }
      }
    }
    if (name === "epos_service") {
      setEpos(!epos);
      dispatch(GetLeadsnput("epos_service", epos));
      if (epos) {
        dispatch({ type: SET_EPOS_PRODUCT, payload: false });
      } else {
        for (let i = 0; i < leadInput?.epos_products?.length; i++) {
          dispatch({ type: REMOVE_EPOS_PRODUCT, payload: i });
        }
      }
    }
    if (
      leadInput?.epos_products[0]?.integration_availability === "STAND ALONE"
    ) {
      dispatch(GetEposProductInput("epos_name", "", 0));
    }
    if (leadInput?.epos_products[0]?.product_type === "VT") {
      dispatch(GetEposProductInput("website_url", "", 0));
    }
  };
  useEffect(() => {
    if (afterSuccessLeads === true) {
      // dispatch(SetLeadsStatusFalse());
      dispatch(SetLeadsTypeStatusFalse());
      navigate("/leads");
    }
  }, [afterSuccessLeads]);
  //   =============if unselect any service type===
  React.useEffect(() => {
    if (leadInput.card_machine_service === false) {
      dispatch(GetLeadsnput("integration_availability", "", 0));
      dispatch(GetLeadsnput("epos_name", "", 0));
    }
    if (leadInput.ecom_service === false) {
      dispatch(GetLeadsnput("product_type", "", 0));
      dispatch(GetLeadsnput("website_url", "", 0));
    }
    if (leadInput.epos_service === false) {
      dispatch(GetLeadsnput("epos_option", ""));
    }
  }, [
    leadInput.card_machine_service,
    leadInput.ecom_service,
    leadInput.epos_service,
  ]);
  const handleCardMechine = (value) => {
    dispatch(
      GetTerminalProductInput(
        "has_old_card_provider",
        value,
        0,
        "terminal_products"
      )
    );
    if (value === false) {
      dispatch(GetLeadsnput("ptsave_oldcardprovider", ""));
      dispatch(
        GetTerminalProductInput("previous_acquirer", "", 0, "terminal_products")
      );
    }
  };
  useEffect(() => {
    if (leadInput.terminal_products[0]?.has_old_card_provider === false) {
      dispatch(
        GetTerminalProductInput("previous_acquirer", "", 0, "terminal_products")
      );
    }
  }, [leadInput.terminal_products[0]?.has_old_card_provider]);

  const handleChangeInput2 = (name, value, index) => {
    dispatch(GetTerminalProductInput(name, value, index, "terminal_products"));
  };
  const handleChangeInput3 = (name, value, index) => {
    dispatch(
      GetEcommerceProductInput(name, value, index, "ecommerce_products")
    );
  };
  const handleChangeInput4 = (name, value, index) => {
    dispatch(GetEposProductInput(name, value, index, "epos_products"));
  };

  React.useEffect(() => {
    dispatch(
      GetLeadsnput("lead_products", [
        ...(leadInput?.terminal_products ?? []),
        ...(leadInput?.ecommerce_products ?? []),
        ...(leadInput?.epos_products ?? []),
      ])
    );
  }, [
    leadInput?.terminal_products,
    leadInput?.ecommerce_products,
    leadInput?.epos_products,
  ]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-center my-4">Service Type </h1>
        <div className="row my-4 ">
          <div className="col-md-5">
            <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
              Do You Want To Select E-Commerce Or Virtual Terminal
            </strong>
          </div>
          <div className="col-md-7">
            <Switch
              {...label}
              value={leadInput.ecom_service}
              checked={leadInput.ecom_service === true ? true : false}
              name="ecom_service"
              onChange={(e) => {
                // handleChangeInput("ecom_service", e.target.checked);
                setEcomService(e.target.checked);
                if (e.target.checked) {
                  dispatch(GetLeadsnput("ecom_service", true));
                  dispatch(GetLeadsnput("application_type", 2));

                  setCard(false);
                  setEpos(false);
                  // dispatch({ type: SET_ECOMMERCE_PRODUCT, payload: false });
                  dispatch(GetLeadsnput("card_machine_service", false));
                  dispatch(GetLeadsnput("epos_service", false));
                  for (let i = 0; i < leadInput?.epos_products?.length; i++) {
                    dispatch({ type: REMOVE_EPOS_PRODUCT, payload: i });
                  }
                  for (
                    let i = 0;
                    i < leadInput?.terminal_products?.length;
                    i++
                  ) {
                    dispatch({
                      type: REMOVE_CARD_TERMINAL_PRODUCT,
                      payload: i,
                    });
                  }
                } else {
                  setCard(true);
                  setEpos(true);

                  dispatch(GetLeadsnput("ecom_service", false));
                  dispatch(GetLeadsnput("application_type", 1));
                  for (
                    let i = 0;
                    i < leadInput?.ecommerce_products?.length;
                    i++
                  ) {
                    // dispatch({ type: REMOVE_QUOTE_ECOMMERCE_PRODUCT, payload: i });
                    dispatch({ type: REMOVE_ECOMMERCE_PRODUCT, payload: i });
                  }
                }
              }}
            />
          </div>
        </div>
        {ecomService === false && (
          <div>
            <strong style={{ color: "#3c4b64" }}>
              Please Select Your Service Type:{" "}
              <span style={requiredstyle}> *</span>
            </strong>
            <div className="d-flex  flex-lg-row flex-column py-3 my">
              <button
                className={`my-2 ${
                  leadInput.card_machine_service === true
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput("card_machine_service")}
              >
                Card Machine
              </button>

              <button
                className={`my-2 ${
                  leadInput.epos_service === true
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput("epos_service")}
              >
                E-POS
              </button>
            </div>
          </div>
        )}

        {/* For Card Machine */}
        {leadInput.card_machine_service === true && (
          <div className="card p-4 mt-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong style={{ color: "#3c4b64" }}>
                  Do you currently have a card machine with another provider?
                  <span style={requiredstyle}> *</span>
                </strong>
              </div>
              <div className="col-md-6">
                <div>
                  <button
                    className={` ${
                      leadInput.terminal_products[0]?.has_old_card_provider ===
                      true
                        ? "active_basic_btn"
                        : "basic_btn"
                    }`}
                    onClick={() => handleCardMechine(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={` ${
                      leadInput.terminal_products[0]?.has_old_card_provider ===
                      false
                        ? "active_basic_btn"
                        : "basic_btn"
                    }`}
                    onClick={() => handleCardMechine(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            {leadInput.terminal_products[0]?.has_old_card_provider === true && (
              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="basic-url">
                    Provider Name <span style={requiredstyle}>*</span>
                  </label>
                  <select
                    className="form-select mt-3"
                    aria-label="Default select example"
                    name="ptsave_oldcardprovider"
                    value={leadInput.ptsave_oldcardprovider}
                    onChange={(e) => {
                      handleChangeInput(
                        "ptsave_oldcardprovider",
                        e.target.value
                      );
                      if (e.target.value !== "other") {
                        handleChangeInput2(
                          "previous_acquirer",
                          e.target.value,
                          0
                        );
                      } else {
                        handleChangeInput2("previous_acquirer", "");
                      }
                    }}
                  >
                    <option value={""}>--</option>
                    <option value={"Elavon"}>Elavon</option>
                    <option value={"Worlpay"}>Worlpay</option>
                    <option value={"Viva wallet"}>Viva wallet</option>
                    <option value={"Truest Payment"}>Truest Payment</option>
                    <option value={"other"}>Others</option>
                  </select>
                </div>
              </div>
            )}
            {leadInput?.ptsave_oldcardprovider === "other" && (
              <div>
                <label htmlFor="basic-url">
                  <strong style={{ color: "#3c4b64" }}>Provide Name: </strong>
                  <span style={requiredstyle}> *</span>
                </label>
                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control"
                    name="previous_acquirer"
                    value={leadInput.terminal_products[0]?.previous_acquirer}
                    onChange={(e) => {
                      handleChangeInput2(
                        "previous_acquirer",
                        e.target.value,
                        0
                      );
                    }}
                  />
                </div>
              </div>
            )}
            <strong style={{ color: "#3c4b64" }}>
              Integration Availability: <span style={requiredstyle}> *</span>
            </strong>
            <div className="py-3">
              <button
                className={`my-2 ${
                  leadInput?.terminal_products[0]?.integration_availability ===
                  "INTEGRATED"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() =>
                  handleChangeInput2(
                    "integration_availability",
                    "INTEGRATED",
                    0
                  )
                }
              >
                Integrated
              </button>
              <button
                className={`my-2 ${
                  leadInput?.terminal_products[0]?.integration_availability ===
                  "STAND ALONE"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() =>
                  handleChangeInput2(
                    "integration_availability",
                    "STAND ALONE",
                    0
                  )
                }
              >
                Stand Alone
              </button>
            </div>
            {leadInput?.terminal_products[0]?.integration_availability ===
              "INTEGRATED" && (
              <div>
                <label htmlFor="basic-url">
                  <strong style={{ color: "#3c4b64" }}>
                    Provide EPOS Name:{" "}
                  </strong>
                  <span style={requiredstyle}> *</span>
                </label>
                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control"
                    name="epos_name"
                    value={leadInput.terminal_products[0]?.epos_name}
                    onChange={(e) => {
                      handleChangeInput2("epos_name", e.target.value, 0);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* For Ecom */}
        {leadInput.ecom_service === true && (
          <div className="card p-4 my-5">
            <strong style={{ color: "#3c4b64" }}>
              Service Type : <span style={requiredstyle}> *</span>
            </strong>
            <div className="py-3">
              <button
                className={`my-2 ${
                  leadInput.ecommerce_products[0]?.product_type === "ecom"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput3("product_type", "ecom", 0)}
              >
                E-COM
              </button>
              <button
                className={`my-2 ${
                  leadInput.ecommerce_products[0]?.product_type === "VT"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput3("product_type", "VT", 0)}
              >
                Virtual Terminal
              </button>
              <button
                className={`my-2 ${
                  leadInput?.ecommerce_products[0]?.product_type === "ecom_VT"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput3("product_type", "ecom_VT", 0)}
              >
                Ecom & Virtual Terminal
              </button>
              <button
                className={`my-2 ${
                  leadInput?.ecommerce_products[0]?.product_type ===
                  "pay_by_link"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() =>
                  handleChangeInput3("product_type", "pay_by_link", 0)
                }
              >
                Pay By Link
              </button>
            </div>
            {(leadInput?.ecommerce_products[0]?.product_type === "ecom" ||
              leadInput?.ecommerce_products[0]?.product_type === "ecom_VT" ||
              leadInput?.ecommerce_products[0]?.product_type ===
                "pay_by_link") && (
              <div>
                <label htmlFor="basic-url">
                  <strong style={{ color: "#3c4b64" }}>Website Url : </strong>{" "}
                  {leadInput?.ecommerce_products[0]?.product_type !==
                    "pay_by_link" && <span style={requiredstyle}> *</span>}
                </label>
                <div className="input-group  my-3 ">
                  <input
                    type="text"
                    className={`form-control border-end-0 `}
                    required
                    name="website_url"
                    value={leadInput?.ecommerce_products[0]?.website_url}
                    onChange={(e) => {
                      handleChangeInput3("website_url", e.target.value, 0);
                    }}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                    >
                      <img src={webImg} width="21" alt="" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* For E-pos */}
        {leadInput.epos_service === true && (
          <div className="card p-4 my-5">
            <strong style={{ color: "#3c4b64" }}>
              EPOS Option: <span style={requiredstyle}> *</span>
            </strong>
            <div className="py-3">
              <button
                className={` ${
                  leadInput?.epos_products[0]?.epos_option === "RETAIL"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() => handleChangeInput4("epos_option", "RETAIL", 0)}
              >
                Retails
              </button>
              <button
                className={` ${
                  leadInput?.epos_products[0]?.epos_option === "HOSPITALITY"
                    ? "active_basic_btn"
                    : "basic_btn"
                }`}
                onClick={() =>
                  handleChangeInput4("epos_option", "HOSPITALITY", 0)
                }
              >
                Hospitality
              </button>
            </div>
          </div>
        )}

        <div className="row align-items-center my-3">
          <div className="col-md-2">
            <strong style={{ color: "#3c4b64" }}>
              Lead Quality: <span style={requiredstyle}> *</span>
            </strong>
          </div>
          <div className="d-flex  flex-lg-row flex-column py-3 my">
            <button
              className={`${
                leadInput.lead_type === 0 ? "active_basic_btn" : "basic_btn"
              }`}
              onClick={() => handleChangeInput("lead_type", 0)}
            >
              Hot
            </button>
            <button
              className={`${
                leadInput.lead_type === 1 ? "active_basic_btn" : "basic_btn"
              }`}
              onClick={() => handleChangeInput("lead_type", 1)}
            >
              Cold
            </button>
            <button
              className={`${
                leadInput.lead_type === 2 ? "active_basic_btn" : "basic_btn"
              }`}
              onClick={() => handleChangeInput("lead_type", 2)}
            >
              Warm
            </button>
          </div>
        </div>
        <div className="col-md-12">
          <div>
            <strong style={{ color: "#3c4b64" }}>Lead Note</strong>

            <CFormTextarea
              className=" my-3"
              id="exampleFormControlTextarea1"
              rows={3}
              name="note"
              value={leadInput.note}
              onChange={(e) => handleChangeInput("note", e.target.value)}
            ></CFormTextarea>
          </div>
        </div>
      </div>

      {/* <div className="col-md-1"></div> */}
    </>
  );
}
