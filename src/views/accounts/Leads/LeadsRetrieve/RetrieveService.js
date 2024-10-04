import React, { useState } from "react";


import "./Retrieve.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLeadsnput,
  GetTerminalProductInput,
  GetEposProductInput,
  GetEcommerceProductInput,
} from "../_redux/action/LeadAction";
import RettriveCardTerminal from "./RettriveCardTerminal";
import RetriveEcom from "./RetriveEcom";
import RetriveEpos from "./RetriveEpos";
import { useNavigate } from "react-router-dom";
import {
  REMOVE_CARD_TERMINAL_PRODUCT,
  REMOVE_ECOMMERCE_PRODUCT,
  REMOVE_EPOS_PRODUCT,
  SET_ECOMMERCE_PRODUCT,
} from "../_redux/types/Types";
import Switch from "@mui/material/Switch";
import Cookies from 'js-cookie'; // Import js-cookie
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function RetrieveService() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    // const is_ps_remember_me =
    //   Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const [card, setCard] = useState(!leadInput.card_machine_service);
  const [ecom, setEcom] = useState(!leadInput.ecom_service);
  const [epos, setEpos] = useState(!leadInput.epos_service);

  const handleChangeInput = (name) => {
    if (name === "card_machine_service") {
      setCard(!card);
      dispatch(GetLeadsnput("card_machine_service", card));
      if (card === false) {
        for (let i = 0; i < leadInput?.terminal_products?.length; i++) {
          dispatch(
            GetTerminalProductInput("is_deleted", true, i, "terminal_products")
          );
        }
        // dispatch(GetTerminalProductInput('is_deleted', true, i))
      }
    }
    if (name === "ecom_service") {
      setEcom(!ecom);
      dispatch(GetLeadsnput("ecom_service", ecom));
      if (ecom === false) {
        for (let i = 0; i < leadInput?.ecommerce_products?.length; i++) {
          dispatch(
            GetEcommerceProductInput("is_deleted", true, i, "terminal_products")
          );
        }
        // dispatch(GetTerminalProductInput('is_deleted', true, i))
      }
    }
    if (name === "epos_service") {
      setEpos(!epos);
      dispatch(GetLeadsnput("epos_service", epos));
      if (epos === false) {
        for (let i = 0; i < leadInput?.epos_products?.length; i++) {
          dispatch(
            GetEposProductInput("is_deleted", true, i, "terminal_products")
          );
        }
        // dispatch(GetTerminalProductInput('is_deleted', true, i))
      }
    }
  };

  return (
    <div className="leads">
      <div className="row my-4 ">
        <div className="col-md-3">
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Do You Want To Select E-Commerce Or Virtual Terminal
          </strong>
        </div>
        <div className="col-md-9">
          <Switch
            {...label}
            value={leadInput.ecom_service}
            checked={leadInput.ecom_service === true ? true : false}
            name="ecom_service"
            onChange={(e) => {
              // handleChangeInput("ecom_service", e.target.checked);
              // setEcomService(e.target.checked);
              if (e.target.checked) {
                setCard(false);
                setEpos(false);
                dispatch(GetLeadsnput("ecom_service", true));
                dispatch(GetLeadsnput("application_type", 2));

                dispatch({ type: SET_ECOMMERCE_PRODUCT, payload: false });
                dispatch(GetLeadsnput("card_machine_service", false));
                dispatch(GetLeadsnput("epos_service", false));
                // dispatch(GetLeadsnput("terminal_products", []));
                // dispatch(GetLeadsnput("epos_products", []));
                for (let i = 0; i < leadInput?.epos_products?.length; i++) {
                  if (leadInput?.epos_products[i]?.id) {
                    dispatch(
                      GetEposProductInput(
                        "is_deleted",
                        true,
                        i,
                        "epos_products"
                      )
                    );
                  } else {
                    dispatch({ type: REMOVE_EPOS_PRODUCT, payload: i });
                  }
                }
                for (let i = 0; i < leadInput?.terminal_products?.length; i++) {
                  if (leadInput?.terminal_products[i].id) {
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
                      type: REMOVE_CARD_TERMINAL_PRODUCT,
                      payload: i,
                    });
                  }
                }
              } else {
                setCard(true);
                setEpos(true);
                // dispatch(GetLeadsnput("card_machine_service", card));
                // dispatch(GetLeadsnput("epos_service", epos));
                dispatch(GetLeadsnput("ecom_service", false));
                dispatch(GetLeadsnput("application_type", 1));

                for (
                  let i = 0;
                  i < leadInput?.ecommerce_products?.length;
                  i++
                ) {
                  if (leadInput?.ecommerce_products[i].id) {
                    dispatch(
                      GetEcommerceProductInput(
                        "is_deleted",
                        true,
                        i,
                        "ecommerce_products"
                      )
                    );
                  } else {
                    dispatch({ type: REMOVE_ECOMMERCE_PRODUCT, payload: i });
                  }
                }
              }
            }}
          />
        </div>
      </div>
      {leadInput.ecom_service === false && (
        <div className="row">
          <div className="col-md-3 mb-3">
            <strong>Product Type:</strong>
          </div>
          <div className="col-md-9 ">
            <button
              className={`mb-2 ${
                leadInput.card_machine_service === true
                  ? "active_basic_btn"
                  : "basic_btn"
              }`}
              onClick={() => handleChangeInput("card_machine_service")}
            >
              Card Terminal
            </button>
            {/* <button
            className={`mb-2 ${
              leadInput.ecom_service === true ? "active_basic_btn" : "basic_btn"
            }`}
            onClick={() => handleChangeInput("ecom_service")}
          >
            E-Commerce or Virtual terminal
          </button> */}
            <button
              className={`mb-2 ${
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

      {/* <!-- Card Terminal --> */}
      {leadInput.card_machine_service === true && (
        <RettriveCardTerminal
          type_name="lead_id"
          id={leadInput.id}
          lead_product={leadInput?.lead_products}
          card={card}
        />
      )}
      {/* <!-- E-Commerce or Virtual terminal --> */}
      {leadInput.ecom_service === true && (
        <RetriveEcom
          type_name="lead_id"
          id={leadInput.id}
          lead_product={leadInput?.lead_products}
        />
      )}

      {/* <!-- Epos --> */}
      {leadInput.epos_service === true && (
        <RetriveEpos
          type_name="lead_id"
          id={leadInput.id}
          lead_product={leadInput?.lead_products}
        />
      )}
    </div>
  );
}
