import React, { useEffect, useState } from "react";

// import "../../Leads/LeadsRetrieve/Retrieve.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppCardType from "./AppCardType";
import AppEcomProduct from "./AppEcomProduct";
import AppEposProduct from "./AppEposProduct";
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
import {
  GetTerminalProductInput,
  GetEcommerceProductInput,
  GetEposProductInput,
} from "../Pricequote/_redux/action/PriceQuoteAction";
import { CTooltip } from "@coreui/react";
import {
  REMOVE_QUOTE_CARD_TERMINAL_PRODUCT,
  REMOVE_QUOTE_ECOMMERCE_PRODUCT,
  REMOVE_QUOTE_EPOS_PRODUCT,
  SET_QUOTE_ECOMMERCE_PRODUCT,
} from "../Pricequote/_redux/types/Types";
import Switch from "@mui/material/Switch";
import Cookies from "js-cookie"; // Import js-cookie
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function ApplicationProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(Cookies.get("userData"));
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const [ecomService, setEcomService] = useState(applicationInput.ecom_service);
  const [card, setCard] = useState(!applicationInput.card_machine_service);
  const [ecom, setEcom] = useState(!applicationInput.ecom_service);
  const [epos, setEpos] = useState(!applicationInput.epos_service);
  useEffect(() => {
    if (
      applicationInput.application_type !== 4 &&
      applicationInput.ecom_service === true
    ) {
      dispatch(GetApplicationInput("application_type", 2));
    }
  }, [applicationInput.ecom_service]);

  const handleChangeInput = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
    if (name === "card_machine_service") {
      setCard(!card);
      dispatch(GetApplicationInput("card_machine_service", card));
      if (card === false) {
        for (let i = 0; i < priceQuoteInput?.terminal_products?.length; i++) {
          dispatch(
            GetTerminalProductInput("is_deleted", true, i, "terminal_products")
          );
        }
      }
    }
    if (name === "ecom_service") {
      dispatch(GetApplicationInput("ecom_service", ecom));
      setEcom(!ecom);
      if (ecom === false && applicationInput.application_type !== 4) {
        dispatch(GetApplicationInput("application_type", 1));
        for (let i = 0; i < priceQuoteInput?.ecommerce_products?.length; i++) {
          // dispatch({ type: REMOVE_QUOTE_ECOMMERCE_PRODUCT, payload: i });
          dispatch(
            GetEcommerceProductInput(
              "is_deleted",
              true,
              i,
              "ecommerce_products"
            )
          );
        }
      } else if (ecom === true && applicationInput.application_type !== 4) {
        dispatch(GetApplicationInput("application_type", 2));

        dispatch({ type: SET_QUOTE_ECOMMERCE_PRODUCT, payload: false });
        dispatch(GetApplicationInput("card_machine_service", false));
        dispatch(GetApplicationInput("epos_service", false));
        for (let i = 0; i < priceQuoteInput?.epos_products?.length; i++) {
          dispatch(GetEposProductInput("is_deleted", true, i, "epos_products"));
        }
        for (let i = 0; i < priceQuoteInput?.terminal_products?.length; i++) {
          dispatch(
            GetTerminalProductInput("is_deleted", true, i, "terminal_products")
          );
        }
      }
    }
    if (name === "epos_service") {
      setEpos(!epos);
      dispatch(GetApplicationInput("epos_service", epos));
      if (epos === false) {
        for (let i = 0; i < priceQuoteInput?.epos_products?.length; i++) {
          dispatch(GetEposProductInput("is_deleted", true, i, "epos_products"));
        }
      }
    }

    if (
      applicationInput.s_individual_sales_representatives === null ||
      applicationInput.s_individual_sales_representatives === ""
    ) {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          userData.first_name + " " + userData.last_name
        )
      );
    }
  };
  useEffect(() => {
    let activeStep = parseInt(localStorage.getItem("activeStep"));
    if (activeStep !== 9) {
      const handleScroll = () => {
        window.scrollTo(0, 0);
      };

      // Scroll to top when component mounts
      handleScroll();

      // Scroll to top on navigate
      const scrollOnNavigate = () => {
        handleScroll();
      };

      // Attach scrollOnNavigate as a listener to the beforeunload event
      window.addEventListener("beforeunload", scrollOnNavigate);

      // Cleanup the event listener when component unmounts
      return () => {
        window.removeEventListener("beforeunload", scrollOnNavigate);
      };
    }
  }, []);
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    if (!applicationInput.desc_of_service) {
      dispatch(GetApplicationInput("desc_of_service", ""));
    }
    if (
      applicationInput.s_individual_sales_representatives === null ||
      applicationInput.s_individual_sales_representatives === ""
    ) {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          userData.first_name + " " + userData.last_name
        )
      );
    }
  }, []);

  React.useEffect(() => {
    // if (applicationInput.application_type === 2) {
    //   dispatch(GetApplicationInput("security_bin_check", true));
    //   dispatch(GetApplicationInput("security_velocity_check", true));
    //   dispatch(GetApplicationInput("security_ip_geo_check", true));
    // }
    if (applicationInput.ecom_service === true) {
      dispatch(GetApplicationInput("security_bin_check", true));
      dispatch(GetApplicationInput("security_velocity_check", true));
      dispatch(GetApplicationInput("security_ip_geo_check", true));
      dispatch(GetApplicationInput("internet_service_provider", "BT_BUSINESS"));
    }
    if (applicationInput.ecom_service === false) {
      dispatch(GetApplicationInput("security_bin_check", false));
      dispatch(GetApplicationInput("security_velocity_check", false));
      dispatch(GetApplicationInput("security_ip_geo_check", false));
      dispatch(GetApplicationInput("internet_service_provider", ""));
    }
  }, [applicationInput.application_type, applicationInput.ecom_service]);

  React.useEffect(() => {
    // dispatch(
    //   GetApplicationInput("application_products", [
    //     ...(priceQuoteInput?.terminal_products ?? []),
    //     ...(priceQuoteInput?.ecommerce_products[0]?.getway_provider
    //       ? priceQuoteInput?.ecommerce_products
    //       : []),
    //     ...(priceQuoteInput?.epos_products[0]?.epos_provider
    //       ? priceQuoteInput?.epos_products
    //       : []),
    //   ])
    // );
    dispatch(
      GetApplicationInput("application_products", [
        ...(priceQuoteInput?.terminal_products ?? []),
        ...(priceQuoteInput?.ecommerce_products ?? []),
        ...(priceQuoteInput?.epos_products ?? []),
      ])
    );
  }, [
    priceQuoteInput?.terminal_products,
    priceQuoteInput?.ecommerce_products,
    priceQuoteInput?.epos_products,
  ]);

  return (
    <div className="leads">
      <div className="row my-4">
        <div className="col-md-2 mb-3">
          <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
            Acquiring Bank
          </strong>
        </div>
        <div className="col-md-10">
          <button
            className={`mb-2 ${
              applicationInput.acquiring_bank === 0
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
                applicationInput.acquiring_bank === 1
                  ? "basic_btn"
                  : "basic_btn"
              }`}
              // onClick={() => handleChangeInput("acquiring_bank", 1)}
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
                applicationInput.acquiring_bank === 2
                  ? "basic_btn"
                  : "basic_btn"
              }`}
              // onClick={() => handleChangeInput("acquiring_bank", 2)}
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
                applicationInput.acquiring_bank === 3
                  ? "basic_btn"
                  : "basic_btn"
              }`}
              // onClick={() => handleChangeInput("acquiring_bank", 3)}
            >
              Worldpay
            </button>
          </CTooltip>
        </div>
      </div>

      {applicationInput.application_type !== 5 && (
        <div className="row my-4 ">
          <div className="col-md-2">
            <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
              Do You Want To Select E-Commerce Or Virtual Terminal
            </strong>
          </div>
          <div className="col-md-10">
            <Switch
              {...label}
              value={applicationInput.ecom_service}
              checked={applicationInput.ecom_service === true ? true : false}
              name="ecom_service"
              onChange={(e) => {
                // handleChangeInput("ecom_service", e.target.checked);
                setEcomService(e.target.checked);
                if (e.target.checked) {
                  dispatch(GetApplicationInput("ecom_service", true));
                  dispatch(
                    GetApplicationInput(
                      "application_type",
                      applicationInput.application_type !== 4 ? 2 : 4
                    )
                  );
                  setCard(false);
                  setEpos(false);
                  dispatch({
                    type: SET_QUOTE_ECOMMERCE_PRODUCT,
                    payload: false,
                  });
                  dispatch(GetApplicationInput("card_machine_service", false));
                  dispatch(GetApplicationInput("epos_service", false));
                  // dispatch(GetPricequoteInput("terminal_products", []));
                  // dispatch(GetPricequoteInput("epos_products", []));
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
                  // dispatch(GetApplicationInput("card_machine_service", card));
                  // dispatch(GetApplicationInput("epos_service", epos));
                  dispatch(GetApplicationInput("ecom_service", false));
                  dispatch(
                    GetApplicationInput(
                      "application_type",
                      applicationInput.application_type !== 4 ? 1 : 4
                    )
                  );
                  // dispatch(GetPricequoteInput("ecommerce_products", []));
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
      )}

      {applicationInput.ecom_service === false && (
        <div className="row mt-4">
          <div className="col-md-2 mb-3">
            <strong style={{ fontSize: "14px", color: "#3c4b64" }}>
              Product Type
            </strong>
          </div>
          <div className="col-md-10 ">
            <button
              disabled={applicationInput.ecom_service ? true : false}
              style={{ opacity: applicationInput.ecom_service ? 0.5 : 1 }}
              className={`mb-2 ${
                applicationInput.card_machine_service === true
                  ? "active_basic_btn"
                  : "basic_btn"
              }`}
              onClick={() => handleChangeInput("card_machine_service")}
            >
              Card Terminal
            </button>

            <button
              disabled={applicationInput.ecom_service ? true : false}
              style={{ opacity: applicationInput.ecom_service ? 0.5 : 1 }}
              className={`mb-2 ${
                applicationInput.epos_service === true
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
      {applicationInput.card_machine_service === true && (
        <AppCardType
          type_name="application"
          id={applicationInput.id}
          quote_product={applicationInput?.application_products}
        />
      )}

      {applicationInput.ecom_service === true && (
        <AppEcomProduct
          type_name="application"
          id={applicationInput.id}
          quote_product={applicationInput?.application_products}
        />
      )}

      {/* <!-- Epos --> */}
      {applicationInput.epos_service === true && (
        <AppEposProduct
          type_name="application"
          id={applicationInput.id}
          quote_product={applicationInput?.application_products}
        />
      )}
    </div>
  );
}
