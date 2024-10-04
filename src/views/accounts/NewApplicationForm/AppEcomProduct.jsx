import React from "react";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  REMOVE_QUOTE_ECOMMERCE_PRODUCT,
  SET_QUOTE_ECOMMERCE_PRODUCT,
} from "../Pricequote/_redux/types/Types";
import { GetEcommerceProductInput } from "../Pricequote/_redux/action/PriceQuoteAction";

import Cookies from "js-cookie"; // Import js-cookie
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
const AppEcomProduct = ({ type_name, id, quote_product }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  AppEcomProduct.propTypes = {
    type_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    quote_product: PropTypes.string,
  };
  const dispatch = useDispatch();
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const handleAddMore = () => {
    dispatch({ type: SET_QUOTE_ECOMMERCE_PRODUCT, payload: false });
  };
  const handleremoveProduct = (i) => {
    dispatch({ type: REMOVE_QUOTE_ECOMMERCE_PRODUCT, payload: i });
  };

  const handleremoveProductTwo = (i) => {
    dispatch(GetEcommerceProductInput("is_deleted", true, i));
  };

  const handleChangeInput = (name, value, index) => {
    dispatch(
      GetEcommerceProductInput(name, value, index, "ecommerce_products")
    );
    dispatch(
      GetEcommerceProductInput(type_name, id, index, " ecommerce_products")
    );
    if (
      name === "product_type" &&
      (value === "VT" || value === "pay_by_link")
    ) {
      dispatch(
        GetEcommerceProductInput("website_url", "", index, "ecommerce_products")
      );
    }
    // if (name === "product_type" && (value === "VT" || value === "ecom_VT")) {
    //   dispatch(
    //     GetApplicationInput("desc_of_service", "( PAY BY VIRTUAL TERMINAL )")
    //   );
    // }

    if (name === "product_type" && value === "pay_by_link") {
      dispatch(
        GetEcommerceProductInput(
          "getway_provider",
          1,
          index,
          "ecommerce_products"
        )
      );
      // dispatch(GetApplicationInput("desc_of_service", "( PAY BY LINK )"));
    } else if (name === "product_type" && value === "ecom") {
      dispatch(
        GetEcommerceProductInput(
          "getway_provider",
          0,
          index,
          "ecommerce_products"
        )
      );
      // dispatch(GetApplicationInput("desc_of_service", "( PAY BY WEB URL )"));
    }
  };
  // useEffect(() => {
  //   dispatch(
  //     GetPricequoteInput(
  //       "ecommerce_products",
  //       quote_product?.filter(
  //         (item) =>
  //           item?.product_type === "ecom" ||
  //           item?.product_type === "VT" ||
  //           item?.product_type === "ecom_VT"
  //       )
  //     )
  //   );
  // }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <h3>E-Commerce or Virtual terminal</h3>
            {/* <button className="my-4">Add Product</button> */}
          </div>
          {/* {
            priceQuoteInput?.ecommerce_products?.map((item, index) => {
              return (
                item.is_deleted === true && (
                  <button
                    className="fill_add_button basic_btn"
                    onClick={() => handleAddMore()}
                  >
                    <IoIosAdd style={{ fontSize: " 25px" }} />
                    ADD PRODUCT
                  </button>
                )
              );
            })
           
          } */}
          {!priceQuoteInput?.ecommerce_products ||
            (!priceQuoteInput.ecommerce_products.some(
              (item) => !item.is_deleted
            ) && (
              <button
                className="fill_add_button basic_btn"
                onClick={() => handleAddMore()}
              >
                <IoIosAdd style={{ fontSize: "25px" }} />
                ADD PRODUCT
              </button>
            ))}
          {/* {priceQuoteInput?.ecommerce_products?.length < 1 && (
            <div className="d-flex justify-content-between heading mb-form mt-4 ">
              <button
                className="fill_add_button basic_btn"
                onClick={() => handleAddMore()}
              >
                <IoIosAdd style={{ fontSize: " 25px" }} />
                ADD PRODUCT
              </button>
            </div>
          )} */}
        </div>
        <>
          {priceQuoteInput?.ecommerce_products?.map((product, i) => {
            return (
              <>
                {product.is_deleted === false && (
                  <div className="col-md-6 mb-3">
                    <div className="card">
                      {/* <!-- <div className="card-header"> --> */}
                      <h3></h3>
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
                      {/* <!-- </div> --> */}
                      <div className="card-body mt-4">
                        <div className="row">
                          <div className="col-md-12 my-3">
                            <div className="row mb-3">
                              <div className="col-md-12">
                                <strong>Service Type </strong>
                              </div>
                              <div className="col-12 applictionType mt-3">
                                <button
                                  className={`mb-2 ${
                                    product.product_type === "ecom"
                                      ? "active_basic_btn"
                                      : "basic_btn"
                                  }`}
                                  onClick={() =>
                                    handleChangeInput("product_type", "ecom", i)
                                  }
                                >
                                  E-COM
                                </button>
                                <button
                                  className={`mb-2 ${
                                    product.product_type === "VT"
                                      ? "active_basic_btn"
                                      : "basic_btn"
                                  }`}
                                  onClick={() =>
                                    handleChangeInput("product_type", "VT", i)
                                  }
                                >
                                  Virtual Terminal
                                </button>
                                <button
                                  className={`mb-2 ${
                                    product.product_type === "ecom_VT"
                                      ? "active_basic_btn"
                                      : "basic_btn"
                                  }`}
                                  onClick={() =>
                                    handleChangeInput(
                                      "product_type",
                                      "ecom_VT",
                                      i
                                    )
                                  }
                                >
                                  E-COM & Virtual Terminal
                                </button>
                                <button
                                  className={`mb-2 ${
                                    product.product_type === "pay_by_link"
                                      ? "active_basic_btn"
                                      : "basic_btn"
                                  }`}
                                  onClick={() =>
                                    handleChangeInput(
                                      "product_type",
                                      "pay_by_link",
                                      i
                                    )
                                  }
                                >
                                  Pay By Link
                                </button>
                              </div>
                            </div>
                          </div>
                          {(product.product_type === "ecom" ||
                            product.product_type === "ecom_VT" ||
                            product.product_type === "pay_by_link") && (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  <strong>WebSite URL</strong>{" "}
                                  {product.product_type !== "pay_by_link" && (
                                    <span style={{ color: "#dd2c00" }}>*</span>
                                  )}
                                </label>
                                <input
                                  type="email"
                                  className="form-control my-3"
                                  name="website_url"
                                  value={product.website_url}
                                  onChange={(e) => {
                                    handleChangeInput(
                                      "website_url",
                                      e.target.value,
                                      i
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="exampleSelect">
                                <strong>E-com Provider</strong>
                              </label>
                              <select
                                className="form-control my-3"
                                id="exampleSelect"
                                name="getway_provider"
                                value={product.getway_provider}
                                onChange={(e) => {
                                  handleChangeInput(
                                    "getway_provider",
                                    e.target.value,
                                    i
                                  );
                                  dispatch(
                                    GetApplicationInput(
                                      "payment_service_provider",
                                      parseInt(e.target.value) === 0
                                        ? "CARDSTREAM"
                                        : "OPAYO"
                                    )
                                  );
                                }}
                              >
                                <option value="">-- </option>
                                <option value="0">CARDSTREAM </option>
                                <option value="1">OPAYO </option>
                              </select>
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
        </>
        {/* {priceQuoteInput?.ecommerce_products?.length > 0 && (
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
        )} */}
      </div>
      <hr />
    </>
  );
};

export default AppEcomProduct;
