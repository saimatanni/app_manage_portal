import React from "react";
import address from "../../../assets/img/address.svg";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import {
  GetAllProductList,
  decodeToken,
} from "src/views/common/_redux/action/CommonAction";
import { GetTerminalProductInput } from "../Pricequote/_redux/action/PriceQuoteAction";
import {
  SET_QUOTE_CARD_TERMINAL_PRODUCT,
  REMOVE_QUOTE_CARD_TERMINAL_PRODUCT,
} from "../Pricequote/_redux/types/Types";
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
import { Autocomplete, TextField } from "@mui/material";

import Cookies from "js-cookie"; // Import js-cookie
import CookieService from "src/services/CookiService";
// import { AiFillHdd } from 'react-icons/ai'
const AppCardType = ({ type_name, id, quote_product }) => {
  AppCardType.propTypes = {
    type_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    quote_product: PropTypes.string,
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      navigate("/login");
    }
  }, []);

  const dispatch = useDispatch();
  const [elavonProduct, setelavonProduct] = useState([]);
  const [hasNonZeroProvider, setHasNonZeroProvider] = useState(false);
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );

  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList || []
  );
  const PartnerIndex = (id) => {
    var index = -1;

    allProductList?.map((opt) => {
      if (opt.id === id) {
        index = allProductList.indexOf(opt);
      }
    });

    return index;
  };
  const elavonIndex = (id) => {
    var index = -1;

    elavonProduct?.map((opt) => {
      if (opt.id === id) {
        index = elavonProduct.indexOf(opt);
      }
    });

    return index;
  };
  const encodedToken = CookieService.getCookie("access_token");

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}api/v1/product/product/?provider=0&crm_product_type=0`,
      {
        method: "GET",
        headers: {
          authorization: `Token ${decodeToken(encodedToken)}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setelavonProduct(data.data.results));
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     getelavonProductList(
  //       `${process.env.REACT_APP_BASE_URL}api/v1/product/product/?provider=0&crm_product_type=0`
  //     )
  //   );
  // }, []);
  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/?provider=1&crm_product_type=0`
      )
    );
  }, []);
  const [terminal, setterminal] = useState(false);
  const handleAddMore = () => {
    dispatch({
      type: SET_QUOTE_CARD_TERMINAL_PRODUCT,
      REMOVE_QUOTE_CARD_TERMINAL_PRODUCT,
      payload: false,
    });
    setterminal(true);
  };
  const handleremoveProduct = (i) => {
    dispatch({ type: REMOVE_QUOTE_CARD_TERMINAL_PRODUCT, payload: i });
  };
  const handleremoveProductTwo = (i) => {
    dispatch(GetTerminalProductInput("is_deleted", true, i));
  };
  const handleChangeInput = (name, value, index) => {
    dispatch(GetTerminalProductInput(name, value, index, "terminal_products"));
    if (name === "provider" && parseInt(value) === 0) {
      dispatch(
        GetTerminalProductInput(
          "contact_length",
          12,
          index,
          "terminal_products"
        )
      );
      dispatch(
        GetTerminalProductInput(
          "terminal_option",
          "ET",
          index,
          "terminal_products"
        )
      );
      dispatch(GetApplicationInput("renting_elavon_terminals", true));
    } else if (name === "provider" && parseInt(value) === 1) {
      dispatch(
        GetTerminalProductInput(
          "contact_length",
          18,
          index,
          "terminal_products"
        )
      );
    }

    if (name === "terminal_option" && value === "ET") {
      dispatch(
        GetTerminalProductInput("provider", 0, index, "terminal_products")
      );
      dispatch(
        GetTerminalProductInput(
          "contact_length",
          12,
          index,
          "terminal_products"
        )
      );
      dispatch(GetApplicationInput("renting_elavon_terminals", true));
    }
    if (name === "product") {
      elavonProduct?.map((item, i) => {
        if (item.id === parseInt(value)) {
          dispatch(
            GetTerminalProductInput(
              "connection_type",
              item?.connection_type[0]?.name,
              index,
              "terminal_products"
            )
          );

          dispatch(
            GetTerminalProductInput(
              "terminal_model",
              item?.model_name,
              index,
              "terminal_products"
            )
          );
          dispatch(
            GetTerminalProductInput(
              "monthly_price",
              item?.price,
              index,
              "terminal_products"
            )
          );
          dispatch(
            GetTerminalProductInput(type_name, id, index, "terminal_products")
          );
        }
      });
    }

    if (name === "provider") {
      const providerValue = priceQuoteInput?.terminal_products[index].provider;
      if (providerValue === 0) {
        setHasNonZeroProvider(false);
      } else {
        setHasNonZeroProvider(true); // At least one provider is not zero
      }
    }
    if (name === "has_old_card_provider" && value === false) {
      dispatch(
        GetTerminalProductInput(
          "previous_acquirer",
          "",
          index,
          "terminal_products"
        )
      );
    }
  };
  // let hasProviderZero = false;

  useEffect(() => {
    let hasProviderZero = false;

    for (
      let index = 0;
      index < priceQuoteInput?.terminal_products.length;
      index++
    ) {
      if (priceQuoteInput?.terminal_products[index].is_deleted === false) {
        if (priceQuoteInput?.terminal_products[index].provider === 0) {
          hasProviderZero = true; // Found a provider with a value of 0
          break; // No need to continue the loop, we already found a zero provider
        }
      }
    }

    dispatch(GetApplicationInput("renting_elavon_terminals", hasProviderZero));
  }, [priceQuoteInput?.terminal_products]);
  useEffect(() => {
    let cardProcess = true;
    let previous_acquirer = "";

    for (
      let index = 0;
      index < priceQuoteInput?.terminal_products.length;
      index++
    ) {
      if (priceQuoteInput?.terminal_products[index].is_deleted === false) {
        if (
          priceQuoteInput?.terminal_products[index].has_old_card_provider ===
          true
        ) {
          cardProcess = false; // Found a provider with a value of 0
          previous_acquirer =
            priceQuoteInput?.terminal_products[index].previous_acquirer;
          break; // No need to continue the loop, we already found a zero provider
        }
      }
    }

    dispatch(GetApplicationInput("new_to_card_proccessing", cardProcess));
    dispatch(GetApplicationInput("previous_acquirer", previous_acquirer));
  }, [priceQuoteInput?.terminal_products]);

  const [selectedContactLength, setSelectedContactLength] = useState("");

  useEffect(() => {
    if (priceQuoteInput?.terminal_products && selectedContactLength !== "") {
      for (
        let index = 0;
        index < priceQuoteInput.terminal_products.length;
        index++
      ) {
        if (parseInt(priceQuoteInput.terminal_products[index].provider) === 1) {
          dispatch(
            GetTerminalProductInput(
              "contact_length",
              selectedContactLength,
              index,
              "terminal_products"
            )
          );
        }
      }
    }
  }, [selectedContactLength, terminal]);

  useEffect(() => {
    for (
      let index = 0;
      index < priceQuoteInput?.terminal_products.length;
      index++
    ) {
      const previousAcquirer =
        priceQuoteInput.terminal_products[index].previous_acquirer;

      if (
        previousAcquirer === "Truest Payment" ||
        previousAcquirer === "Viva wallet" ||
        previousAcquirer === "Worlpay" ||
        previousAcquirer === "Elavon"
      ) {
        dispatch(
          GetTerminalProductInput(
            "ptsave_oldcardprovider",
            previousAcquirer, // Dispatch previous_acquirer to ptsave_oldcardprovider
            index,
            "terminal_products"
          )
        );
      } else {
        dispatch(
          GetTerminalProductInput(
            "ptsave_oldcardprovider",
            "other", // Dispatch "other" to ptsave_oldcardprovider
            index,
            "terminal_products"
          )
        );
      }
    }
  }, [priceQuoteInput?.terminal_products?.length]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <h3>Card Terminal</h3>
            {/* <button className="my-4">Add Product</button> */}
          </div>
          {priceQuoteInput?.terminal_products?.length < 1 && (
            <div className="d-flex justify-content-between heading mb-form mt-4 ">
              <button
                className="fill_add_button basic_btn"
                onClick={() => handleAddMore()}
              >
                <IoIosAdd style={{ fontSize: " 25px" }} />
                ADD PRODUCT
              </button>
            </div>
          )}
        </div>
        <div className="row my-4">
          {priceQuoteInput?.terminal_products?.map((product, i) => {
            return (
              <>
                {product?.is_deleted === false && (
                  <div className="col-md-6 my-3">
                    <div className="card">
                      <button
                        className="closeButton"
                        onClick={() => {
                          product.id
                            ? handleremoveProductTwo(i)
                            : handleremoveProduct(i);
                        }}
                      >
                        &#x2716;
                      </button>

                      <div className="p-3 mt-5">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <strong style={{ color: "#3c4b64" }}>
                              Do you currently have a card machine with another
                              provider?
                              <span style={{ color: "red" }}> *</span>
                            </strong>
                          </div>
                          <div className="col-md-6">
                            <div>
                              <button
                                className={` ${
                                  product?.has_old_card_provider === true
                                    ? "active_basic_btn"
                                    : "basic_btn"
                                }`}
                                onClick={() =>
                                  handleChangeInput(
                                    "has_old_card_provider",
                                    true,
                                    i
                                  )
                                }
                              >
                                Yes
                              </button>
                              <button
                                className={` ${
                                  product?.has_old_card_provider === false
                                    ? "active_basic_btn"
                                    : "basic_btn"
                                }`}
                                onClick={() =>
                                  handleChangeInput(
                                    "has_old_card_provider",
                                    false,
                                    i
                                  )
                                }
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                        {product.has_old_card_provider === true && (
                          <>
                            <div className="row mb-3">
                              <div className="col-md-12">
                                <strong htmlFor="basic-url">
                                  Choose Old Provider{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </strong>
                                <select
                                  className="form-select mt-3"
                                  aria-label="Default select example"
                                  name="ptsave_oldcardprovider"
                                  value={product.ptsave_oldcardprovider}
                                  onChange={(e) => {
                                    handleChangeInput(
                                      "ptsave_oldcardprovider",
                                      e.target.value,
                                      i
                                    );

                                    if (e.target.value !== "other") {
                                      handleChangeInput(
                                        "previous_acquirer",
                                        e.target.value,
                                        i
                                      );
                                    } else {
                                      handleChangeInput(
                                        "previous_acquirer",
                                        "",
                                        i
                                      );
                                    }
                                  }}
                                >
                                  <option value={""}>--</option>
                                  <option value={"Elavon"}>Elavon</option>
                                  <option value={"Worlpay"}>Worlpay</option>
                                  <option value={"Viva wallet"}>
                                    Viva wallet
                                  </option>
                                  <option value={"Truest Payment"}>
                                    Truest Payment
                                  </option>
                                  <option value={"other"}>Others</option>
                                </select>
                              </div>
                            </div>
                            {product.previous_acquirer !== "Elavon" &&
                              product.previous_acquirer !== "Worlpay" &&
                              product.previous_acquirer !== "Viva wallet" &&
                              product.previous_acquirer !== "Truest Payment" &&
                              product.previous_acquirer !== null && (
                                <div>
                                  <label htmlFor="basic-url">
                                    <strong style={{ color: "#3c4b64" }}>
                                      Old Provide Name:{" "}
                                    </strong>
                                    <span style={{ color: "red" }}> *</span>
                                  </label>
                                  <div className="input-group my-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="previous_acquirer"
                                      value={product.previous_acquirer}
                                      onChange={(e) => {
                                        handleChangeInput(
                                          "previous_acquirer",
                                          e.target.value,
                                          i
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                          </>
                        )}

                        <div className="row mb-3">
                          <div className="col-12">
                            <strong>
                              Terminal Option{" "}
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </strong>
                          </div>
                          <div className="col-12 applictionType mt-3">
                            <button
                              className={`mb-2 ${
                                product.terminal_option === "MR"
                                  ? "active_basic_btn"
                                  : "basic_btn"
                              }`}
                              onClick={() =>
                                handleChangeInput("terminal_option", "MR", i)
                              }
                            >
                              Monthly Rental
                            </button>
                            <button
                              className={`mb-2 ${
                                product.terminal_option === "OUTRIGHT"
                                  ? "active_basic_btn"
                                  : "basic_btn"
                              }`}
                              onClick={() =>
                                handleChangeInput(
                                  "terminal_option",
                                  "OUTRIGHT",
                                  i
                                )
                              }
                            >
                              Outright
                            </button>
                            <button
                              className={`mb-2 ${
                                product.terminal_option === "ET"
                                  ? "active_basic_btn"
                                  : "basic_btn"
                              }`}
                              onClick={() =>
                                handleChangeInput("terminal_option", "ET", i)
                              }
                            >
                              Elavon Terminal
                            </button>
                            <button
                              className={`mb-2 ${
                                product.terminal_option === "FT"
                                  ? "active_basic_btn"
                                  : "basic_btn"
                              }`}
                              onClick={() =>
                                handleChangeInput("terminal_option", "FT", i)
                              }
                            >
                              Free Terminal
                            </button>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12 mb-3">
                            <strong>
                              Integration Availability{" "}
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </strong>
                          </div>
                          <div className="col-12">
                            <button 
                            // disabled={product.product=== 27 && true}
                              className={`mb-2 ${
                                product.integration_availability ===
                                "INTEGRATED"
                                  ? "active_basic_btn"
                                  : "basic_btn"
                              }`}
                              onClick={() =>
                                handleChangeInput(
                                  "integration_availability",
                                  "INTEGRATED",
                                  i
                                )
                              }
                            >
                              Integrated
                            </button>
                            <button 
                            // disabled={product.product=== 27 && true}
                              className={`mb-2 ${
                                product.integration_availability ===
                                "STAND ALONE"
                                  ? "active_basic_btn"
                                  : "basic_btn"
                              }`}
                              onClick={() => {
                                handleChangeInput(
                                  "integration_availability",
                                  "STAND ALONE",
                                  i
                                );
                                handleChangeInput("epos_name", "", i);
                              }}
                            >
                              Stand Alone
                            </button>
                          </div>
                        </div>
                        {product.integration_availability === "INTEGRATED" && (
                          <div className="row">
                            <div className="col-md-12 my-3">
                              <div>
                                <label htmlFor="basic-url">
                                  <strong>
                                    Provide EPOS Name{" "}
                                    <span style={{ color: "#dd2c00" }}>*</span>
                                  </strong>
                                </label>
                                <div className="input-group my-3">
                                  <input
                                    type="text"
                                    className="form-control border-end-0"
                                    name="epos_name"
                                    value={product.epos_name}
                                    onChange={(e) => {
                                      handleChangeInput(
                                        "epos_name",
                                        e.target.value,
                                        i
                                      );
                                    }}
                                  />
                                  <div className="input-group-append">
                                    <span
                                      className="input-group-text bg-white"
                                      id="basic-addon2"
                                    >
                                      <img src={address} width="21" alt="" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="row mt-3">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="exampleSelect">
                                <strong>
                                  Card Terminal Provider{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </strong>
                              </label>
                              <select
                                className="form-control my-3"
                                name="provider"
                                value={product.provider}
                                onChange={(e) => {
                                  handleChangeInput(
                                    "provider",
                                    e.target.value,
                                    i
                                  );
                                  setterminal(false);
                                }}
                              >
                                <option value={""}>-- </option>
                                <option value={0}>ELAVON </option>
                                <option value={1}>PAYMENTSAVE </option>
                              </select>
                            </div>
                          </div>
                          {parseInt(product.provider) === 1 ? (
                            <div className="col-md-12">
                              <div className="">
                                <label htmlFor="exampleSelect">
                                  <strong>Select Product</strong>
                                </label>
                                <div className="my-3">
                                  <Autocomplete
                                    size="small"
                                    options={allProductList || []}
                                    value={
                                      allProductList?.[
                                        PartnerIndex(product?.product)
                                      ] || null
                                    }
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) => {
                                      handleChangeInput(
                                        "product",
                                        newValue === null ? null : newValue.id,
                                        i
                                      );
                                      if (newValue) {
                                        dispatch(
                                          GetTerminalProductInput(
                                            "connection_type",
                                            newValue?.connection_type[0]?.name,
                                            i
                                          )
                                        );

                                        dispatch(
                                          GetTerminalProductInput(
                                            "terminal_model",
                                            newValue?.model_name,
                                            i
                                          )
                                        );
                                        dispatch(
                                          GetTerminalProductInput(
                                            "monthly_price",
                                            newValue?.price,
                                            i
                                          )
                                        );
                                        dispatch(
                                          GetTerminalProductInput(
                                            type_name,
                                            id,
                                            i
                                          )
                                        );
                                      }
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        fullWidth
                                        InputProps={{
                                          ...params.InputProps,
                                          style: {
                                            backgroundColor: "#fff",
                                            borderRadius: "0.375rem",
                                            // border: "1px solid #ced4da",
                                            fontSize: "1rem",
                                            padding: "6px 12px",
                                            height:
                                              "calc(1.5em + .75rem + 2px)",
                                          },
                                        }}
                                        onChange={(e) => {
                                          dispatch(
                                            GetAllProductList(
                                              `${process.env.REACT_APP_BASE_URL}api/v1/product/product/?provider=1&crm_product_type=0&query=${e.target.value}`
                                            )
                                          );
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                {/* <select
                                    className="form-control my-3"
                                    id="exampleSelect"
                                    name="product"
                                    value={product?.product}
                                    onChange={(e) => {
                                      allProductList?.map((item, index) => {
                                        if (
                                          item.id === parseInt(e.target.value)
                                        ) {
                                          dispatch(
                                            GetTerminalProductInput(
                                              "connection_type",
                                              item?.connection_type[0]?.name,
                                              i
                                            )
                                          );

                                          dispatch(
                                            GetTerminalProductInput(
                                              "terminal_model",
                                              item?.model_name,
                                              i
                                            )
                                          );
                                          dispatch(
                                            GetTerminalProductInput(
                                              "monthly_price",
                                              item?.price,
                                              i
                                            )
                                          );
                                          dispatch(
                                            GetTerminalProductInput(
                                              type_name,
                                              id,
                                              i
                                            )
                                          );
                                        }
                                      });

                                      handleChangeInput(
                                        "product",
                                        e.target.value,
                                        i
                                      );
                                    }}
                                  >
                                    <option>--</option>
                                    {allProductList?.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                  </select> */}
                              </div>
                            </div>
                          ) : (
                            parseInt(product.provider) === 0 && (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="exampleSelect">
                                    <strong>Select Product</strong>
                                  </label>
                                  <div className="my-3">
                                    <Autocomplete
                                      size="small"
                                      options={elavonProduct || []}
                                      value={
                                        elavonProduct?.[
                                          elavonIndex(product?.product)
                                        ] || null
                                      }
                                      getOptionLabel={(option) => option.name}
                                      onChange={(event, newValue) => {
                                        handleChangeInput(
                                          "product",
                                          newValue === null
                                            ? null
                                            : newValue.id,
                                          i
                                        );
                                        if (newValue) {
                                          dispatch(
                                            GetTerminalProductInput(
                                              "connection_type",
                                              newValue?.connection_type[0]
                                                ?.name,
                                              i
                                            )
                                          );
                                          // if (newValue.id === 27) {
                                          //   dispatch(
                                          //     GetTerminalProductInput(
                                          //       "integration_availability",
                                          //       "STAND ALONE",
                                          //       i
                                          //     )
                                          //   );
                                          //   dispatch(
                                          //     GetTerminalProductInput(
                                          //       "epos_name",
                                          //       "",
                                          //       i
                                          //     )
                                          //   );
                                          // }
                                          dispatch(
                                            GetTerminalProductInput(
                                              "terminal_model",
                                              newValue?.model_name,
                                              i
                                            )
                                          );
                                          dispatch(
                                            GetTerminalProductInput(
                                              "monthly_price",
                                              newValue?.price,
                                              i
                                            )
                                          );
                                          dispatch(
                                            GetTerminalProductInput(
                                              type_name,
                                              id,
                                              i
                                            )
                                          );
                                        }
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          InputProps={{
                                            ...params.InputProps,
                                            style: {
                                              backgroundColor: "#fff",
                                              borderRadius: "0.375rem",
                                              // border: "1px solid #ced4da",
                                              fontSize: "1rem",
                                              padding: "6px 12px",
                                              height:
                                                "calc(1.5em + .75rem + 2px)",
                                            },
                                          }}
                                          // onChange={(e) => {
                                          //   dispatch(
                                          //     getelavonProductList(
                                          //       `${process.env.REACT_APP_BASE_URL}api/v1/product/product/?provider=0&crm_product_type=0`
                                          //     )
                                          //   );
                                          // }}
                                        />
                                      )}
                                    />
                                  </div>
                                  {/* <select
                                      className="form-control my-3"
                                      id="exampleSelect"
                                      name="product"
                                      value={product?.product}
                                      onChange={(e) => {
                                        // allProductList?.map((item, index) => {
                                        //   if (item.id === parseInt(e.target.value)) {
                                        //     dispatch(
                                        //       GetTerminalProductInput(
                                        //         'contact_length',
                                        //         item?.connection_type[0]?.id,
                                        //         i,
                                        //       ),
                                        //     )

                                        //     dispatch(
                                        //       GetTerminalProductInput(
                                        //         'terminal_model',
                                        //         item?.model_name,
                                        //         i,
                                        //       ),
                                        //     )
                                        //     dispatch(
                                        //       GetTerminalProductInput('price', item?.price, i),
                                        //     )
                                        //     dispatch(GetTerminalProductInput(type_name, id, i))
                                        //   }
                                        // })

                                        handleChangeInput(
                                          "product",
                                          e.target.value,
                                          i
                                        );
                                      }}
                                    >
                                      <option>--</option>
                                      {elavonProduct?.map((option) => (
                                        <option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                    </select> */}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleSelect">
                                <strong>
                                  Connection Type{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </strong>
                              </label>
                              <select
                                className="form-control my-3"
                                name="connection_type"
                                value={product.connection_type}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "connection_type",
                                    e.target.value,
                                    i
                                  )
                                }
                                id="exampleSelect"
                              >
                                <option value={""}>--</option>

                                {parseInt(product.provider) === 1 &&
                                  allProductList?.map((option) =>
                                    option.id === parseInt(product.product)
                                      ? option?.connection_type?.map((item) => (
                                          <option
                                            key={item.id}
                                            value={item?.name}
                                          >
                                            {item?.name}
                                          </option>
                                        ))
                                      : null
                                  )}
                                {parseInt(product.provider) === 0 &&
                                  elavonProduct?.map((option) =>
                                    option.id === parseInt(product.product)
                                      ? option.connection_type.map((item) => (
                                          <option
                                            key={item.id}
                                            value={item.name}
                                          >
                                            {item.name}
                                          </option>
                                        ))
                                      : null
                                  )}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleSelect">
                                <strong>Contract Length</strong>
                              </label>
                              <select
                                className="form-control my-3"
                                id="exampleFormControlSelect1"
                                disabled={
                                  parseInt(product.provider) === 0
                                    ? true
                                    : false
                                }
                                name="contact_length"
                                value={product.contact_length}
                                onChange={(e) => {
                                  handleChangeInput(
                                    "contact_length",
                                    e.target.value,
                                    i
                                  );
                                  setSelectedContactLength(e.target.value);
                                }}
                              >
                                <option value={""}>-- Select --</option>

                                <option>0</option>
                                <option>12</option>
                                <option>18</option>
                                <option>24</option>
                                <option>36</option>
                                <option>48</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                <strong>
                                  Terminal Model{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </strong>
                              </label>
                              <input
                                type="email"
                                className="form-control my-3"
                                disabled
                                name="terminal_model"
                                value={
                                  product.terminal_model
                                    ? product.terminal_model
                                    : ""
                                }
                                onChange={(e) => {
                                  handleChangeInput(
                                    "terminal_model",
                                    e.target.value,
                                    i
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                <strong>
                                  Monthly Price{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </strong>
                              </label>
                              <input
                                type="email"
                                className="form-control my-3"
                                name="monthly_price"
                                value={product.monthly_price}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "monthly_price",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                <strong>
                                  Quantity{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </strong>
                              </label>
                              <input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                className="form-control my-3"
                                name="qty"
                                min={1}
                                value={product.qty}
                                onChange={(e) =>
                                  handleChangeInput("qty", e.target.value, i)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}

          {priceQuoteInput?.terminal_products?.length > 0 && (
            <div
              className="col-md-6 d-flex align-items-center justify-content-center"
              style={{ marginBottom: "40px" }}
            >
              <button
                className="fill_add_button basic_btn"
                onClick={() => handleAddMore()}
              >
                <IoIosAdd style={{ fontSize: " 25px" }} />
                ADD PRODUCT
              </button>
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default AppCardType;
