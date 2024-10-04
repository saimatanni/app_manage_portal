import React, { useState } from "react";

import "../../Leads/LeadsRetrieve/Retrieve.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPricequoteInput,
  GetTerminalProductInput,
  GetEcommerceProductInput,
  GetEposProductInput,
} from "../_redux/action/PriceQuoteAction";
import Cookies from 'js-cookie'; // Import js-cookie

import QuoteCardType from "./QuoteCardType";
import QuoteEcom from "./QuoteEcom";
import QuoteEpos from "./QuoteEpos";
import { CTooltip } from "@coreui/react";
import {
  REMOVE_QUOTE_CARD_TERMINAL_PRODUCT,
  REMOVE_QUOTE_ECOMMERCE_PRODUCT,
  REMOVE_QUOTE_EPOS_PRODUCT,
  SET_QUOTE_ECOMMERCE_PRODUCT,
} from "../_redux/types/Types";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const [ecomService, setEcomService] = useState(priceQuoteInput.ecom_service);
  const [card, setCard] = useState(!priceQuoteInput.card_machine_service);
  const [ecom, setEcom] = useState(!priceQuoteInput.ecom_service);
  const [epos, setEpos] = useState(!priceQuoteInput.epos_service);
  const handleChangeInput = (name, value, e) => {
    dispatch(GetPricequoteInput(name, value, e));
    if (name === "application_type" && value !== 4) {
      dispatch(GetPricequoteInput("cole_from", ""));
    }
    if (name === "card_machine_service") {
      setCard(!card);
      dispatch(GetPricequoteInput("card_machine_service", card));
      if (card === false) {
        for (let i = 0; i < priceQuoteInput?.terminal_products?.length; i++) {
          dispatch(
            GetTerminalProductInput("is_deleted", true, i, "terminal_products")
          );
        }
      }
    }
    if (name === "ecom_service") {
      setEcom(!ecom);
      dispatch(GetPricequoteInput("ecom_service", ecom));

      if (ecom === false) {
        dispatch(GetPricequoteInput("application_type", 1));
        for (let i = 0; i < priceQuoteInput?.ecommerce_products?.length; i++) {
          dispatch(
            GetEcommerceProductInput(
              "is_deleted",
              true,
              i,
              "ecommerce_products"
            )
          );
        }
      } else if (ecom === true) {
        // dispatch({ type: SET_QUOTE_ECOMMERCE_PRODUCT, payload: false });
        dispatch(GetPricequoteInput("application_type", 2));
        dispatch(GetPricequoteInput("card_machine_service", false));
        dispatch(GetPricequoteInput("epos_service", false));
        for (let i = 0; i < priceQuoteInput?.terminal_products?.length; i++) {
          dispatch(
            GetTerminalProductInput("is_deleted", true, i, "terminal_products")
          );
        }
        for (let i = 0; i < priceQuoteInput?.epos_products?.length; i++) {
          dispatch(GetEposProductInput("is_deleted", true, i, "epos_products"));
        }
      }
    }
    if (name === "epos_service") {
      setEpos(!epos);
      dispatch(GetPricequoteInput("epos_service", epos));
      if (epos === false) {
        for (let i = 0; i < priceQuoteInput?.epos_products?.length; i++) {
          dispatch(GetEposProductInput("is_deleted", true, i, "epos_products"));
        }
      }
    }
  };
  // =for empty temporary product--------
  React.useEffect(() => {
    if (priceQuoteInput.application_type === 2) {
      dispatch(GetPricequoteInput("security_bin_check", true));
      dispatch(GetPricequoteInput("security_velocity_check", true));
      dispatch(GetPricequoteInput("security_ip_geo_check", true));
    } else {
      dispatch(GetPricequoteInput("security_bin_check", false));
      dispatch(GetPricequoteInput("security_velocity_check", false));
      dispatch(GetPricequoteInput("security_ip_geo_check", false));
    }
  }, [priceQuoteInput.application_type]);
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (priceQuoteInput.ecom_service === true) {
      dispatch(GetPricequoteInput("application_type", 2));
    } else {
      dispatch(GetPricequoteInput("application_type", 1));
    }
  }, [priceQuoteInput.ecom_service]);

  return (
    <div className="leads">
      <div className="row my-4">
        <div className="col-md-2 mb-3">
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Acquiring Bank <span style={{ color: "#DD2C00" }}>*</span>
          </strong>
        </div>
        <div className="col-md-10">
          <button
            className={`mb-2 ${
              priceQuoteInput.acquiring_bank === 0
                ? "active_basic_btn"
                : "basic_btn"
            }`}
            onClick={() => handleChangeInput("acquiring_bank", 0)}
          >
            Elavon
          </button>
          <CTooltip
            content="Comming soon."
            placement="top"
            trigger={["hover", "focus"]}
          >
            <button
              style={{ opacity: "0.5", cursor: "default" }}
              className={`mb-2 ${
                priceQuoteInput.acquiring_bank === 1 ? "basic_btn" : "basic_btn"
              }`}
              
            >
              First Data
            </button>
          </CTooltip>
          <CTooltip
            content="Comming soon."
            placement="top"
            trigger={["hover", "focus"]}
          >
            <button
              style={{ opacity: "0.5", cursor: "default" }}
              className={`mb-2 ${
                priceQuoteInput.acquiring_bank === 2 ? "basic_btn" : "basic_btn"
              }`}
              
            >
              EmerchantPay
            </button>
          </CTooltip>
          <CTooltip
            content="Comming soon."
            placement="top"
            trigger={["hover", "focus"]}
          >
            <button
              style={{ opacity: "0.5", cursor: "default" }}
              className={`mb-2 ${
                priceQuoteInput.acquiring_bank === 3 ? "basic_btn" : "basic_btn"
              }`}
              
            >
              Worldpay
            </button>
          </CTooltip>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-2 mb-3">
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Application Type <span style={{ color: "#DD2C00" }}>*</span>
          </strong>
        </div>
        <div className="col-md-10 ">
          <button
            className={`mb-2 ${
              priceQuoteInput.application_type === 1 ||
              priceQuoteInput.application_type === 2
                ? "active_basic_btn"
                : "basic_btn"
            }`}
            onClick={() => handleChangeInput("application_type", 1)}
          >
            New Application
          </button>

          
          <button
            // style={{ opacity: "0.5", cursor: "default" }}
            className={`mb-2 ${
              priceQuoteInput.application_type === 4
                ? "active_basic_btn"
                : "basic_btn"
            }`}
            onClick={() => handleChangeInput("application_type", 4)}
          >
            Change of Legel Entity
          </button>
          {/* </CTooltip> */}
          <CTooltip
            content="Comming soon."
            placement="top"
            trigger={["hover", "focus"]}
          >
            <button
              style={{ opacity: "0.5", cursor: "default" }}
              // disabled
              className={`mb-2 ${
                priceQuoteInput.application_type === 5
                  ? "basic_btn"
                  : "basic_btn"
              }`}
              // onClick={() => handleChangeInput("application_type", 5)}
            >
              Additional Outlets
            </button>
          </CTooltip>
          <CTooltip
            content="Comming soon."
            placement="top"
            trigger={["hover", "focus"]}
          >
            <button
              style={{ opacity: "0.5", cursor: "default" }}
              // disabled
              className={`mb-2 ${
                priceQuoteInput.application_type === 5
                  ? "basic_btn"
                  : "basic_btn"
              }`}
              // onClick={() => handleChangeInput("application_type", 5)}
            >
              Multiple Outlets
            </button>
          </CTooltip>
          <CTooltip
            content="Comming soon."
            placement="top"
            trigger={["hover", "focus"]}
          >
            <button
              style={{ opacity: "0.5", cursor: "default" }}
              // disabled
              className={`mb-2 ${
                priceQuoteInput.application_type === 5
                  ? "basic_btn"
                  : "basic_btn"
              }`}
              // onClick={() => handleChangeInput("application_type", 5)}
            >
              Additional Terminal
            </button>
          </CTooltip>
         
        </div>
      </div>
      {priceQuoteInput.application_type === 4 && (
        <div className="row my-4">
          <div className="col-md-2 mb-3">
            <label htmlFor="basic-url">
              Old Mid<span style={{ color: "#DD2C00" }}>*</span>
            </label>
          </div>

          <div className="col-md-8 col-lg-5 col-xxl-4">
            <input
              type="text"
              className="form-control border-end-0"
              required
              name="cole_from"
              value={priceQuoteInput.cole_from}
              onChange={(e) => handleChangeInput("cole_from", e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="row my-4 ">
        <div className="col-md-2">
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Do You Want To Select E-Commerce Or Virtual Terminal
          </strong>
        </div>
        <div className="col-md-10">
          <Switch
            {...label}
            value={priceQuoteInput.ecom_service}
            checked={priceQuoteInput.ecom_service === true ? true : false}
            name="ecom_service"
            onChange={(e) => {
              // handleChangeInput("ecom_service", e.target.checked);
              setEcomService(e.target.checked);
              if (e.target.checked) {
                dispatch(GetPricequoteInput("ecom_service", true));
                dispatch(GetPricequoteInput("application_type", 2));

                dispatch({ type: SET_QUOTE_ECOMMERCE_PRODUCT, payload: false });
                setCard(false);
                setEpos(false);
                // dispatch({ type: SET_ECOMMERCE_PRODUCT, payload: false });

                dispatch(GetPricequoteInput("card_machine_service", false));
                dispatch(GetPricequoteInput("epos_service", false));

                for (
                  let i = 0;
                  i < priceQuoteInput?.epos_products?.length;
                  i++
                ) {
                  if (priceQuoteInput?.epos_products[i]?.id) {
                    dispatch(
                      GetEposProductInput(
                        "is_deleted",
                        true,
                        i,
                        "epos_products"
                      )
                    );
                  } else {
                    dispatch({ type: REMOVE_QUOTE_EPOS_PRODUCT, payload: i });
                  }
                }
                for (
                  let i = 0;
                  i < priceQuoteInput?.terminal_products?.length;
                  i++
                ) {
                  if (priceQuoteInput?.terminal_products[i].id) {
                    dispatch(
                      GetTerminalProductInput(
                        "is_deleted",
                        true,
                        i,
                        "terminal_products"
                      )
                    );
                  } else {
                    dispatch({
                      type: REMOVE_QUOTE_CARD_TERMINAL_PRODUCT,
                      payload: i,
                    });
                  }
                }
              } else {
                setCard(true);
                setEpos(true);
                dispatch(GetPricequoteInput("ecom_service", false));
                dispatch(GetPricequoteInput("application_type", 1));

                for (
                  let i = 0;
                  i < priceQuoteInput?.ecommerce_products?.length;
                  i++
                ) {
                  
                  if (priceQuoteInput?.ecommerce_products[i].id) {
                    dispatch(
                      GetEcommerceProductInput(
                        "is_deleted",
                        true,
                        i,
                        "ecommerce_products"
                      )
                    );
                  } else {
                    dispatch({
                      type: REMOVE_QUOTE_ECOMMERCE_PRODUCT,
                      payload: i,
                    });
                  }
                }
              }
            }}
          />
        </div>
      </div>
      {ecomService === false && (
        <div className="row mb-4">
          <div className="col-md-2 mb-3">
            <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
              Product Type <span style={{ color: "#DD2C00" }}>*</span>
            </strong>
          </div>
          <div className="col-md-10 ">
            <button
              disabled={priceQuoteInput.ecom_service ? true : false}
              style={{ opacity: priceQuoteInput.ecom_service ? 0.5 : 1 }}
              className={`mb-2 ${
                priceQuoteInput.card_machine_service === true
                  ? "active_basic_btn"
                  : "basic_btn"
              }`}
              onClick={() => handleChangeInput("card_machine_service")}
            >
              Card Terminal
            </button>
            
            <button
              disabled={priceQuoteInput.ecom_service ? true : false}
              style={{ opacity: priceQuoteInput.ecom_service ? 0.5 : 1 }}
              className={`mb-2 ${
                priceQuoteInput.epos_service === true
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

      {/* <!-- Card Terminal --> */}
      {priceQuoteInput.card_machine_service === true && (
        <QuoteCardType
          type_name="quote"
          id={priceQuoteInput.id}
          quote_product={priceQuoteInput?.quote_products}
        />
      )}

      {priceQuoteInput.ecom_service === true && (
        <QuoteEcom
          type_name="quote"
          id={priceQuoteInput.id}
          quote_product={priceQuoteInput?.quote_products}
        />
      )}

      {/* <!-- Epos --> */}
      {priceQuoteInput.epos_service === true && (
        <QuoteEpos
          type_name="quote"
          id={priceQuoteInput.id}
          quote_product={priceQuoteInput?.quote_products}
        />
      )}
    </div>
  );
}
