import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosAdd } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie
import {
  SET_QUOTE_EPOS_PRODUCT,
  REMOVE_QUOTE_EPOS_PRODUCT,
} from "../_redux/types/Types";
import {
  GetEposProductInput,

} from "../_redux/action/PriceQuoteAction";
const QuoteEpos = ({ type_name, id, quote_product }) => {
  const navigate = useNavigate();
  QuoteEpos.propTypes = {
    type_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    quote_product: PropTypes.string,
  };
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const dispatch = useDispatch();
  const handleAddMore = () => {
    dispatch({ type: SET_QUOTE_EPOS_PRODUCT, payload: false });
  };
  const handleremoveProduct = (i) => {
    dispatch({ type: REMOVE_QUOTE_EPOS_PRODUCT, payload: i });
  };

  const handleremoveProductTwo = (i) => {
    dispatch(GetEposProductInput("is_deleted", true, i));
  };

  const handleChangeInput = (name, value, index) => {
    dispatch(GetEposProductInput(name, value, index, "epos_products"));
    dispatch(GetEposProductInput("quote", id, index, "epos_products"));
    // dispatch(GetEposProductInput(type_name, id, index, "epos_products"));
  };
  
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div>
              <h3>E-POS</h3>
            </div>
            {priceQuoteInput?.epos_products?.length < 1 && (
              <button
                className="basic_btn my-4"
                onClick={() => handleAddMore()}
              >
                <IoIosAdd style={{ fontSize: " 25px" }} />
                Add Product
              </button>
            )}
          </div>
          {priceQuoteInput?.epos_products?.map((product, i) => {
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
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className=""
                                  >
                                    <strong>
                                      Service Option
                                      <span style={{ color: "#dd2c00" }}> 
                                        *
                                      </span>{" "}
                                      
                                    </strong>
                                  </label>
                                </div>
                                <div className="col-md-12 mt-3">
                                  <button
                                    className={`mb-2 ${
                                      product.service_option === 184090000
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeInput(
                                        "service_option",
                                        184090000,
                                        i
                                      )
                                    }
                                  >
                                    EPOS
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      product.service_option === 184090001
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeInput(
                                        "service_option",
                                        184090001,
                                        i
                                      )
                                    }
                                  >
                                    Online Ordering
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      product.service_option === 184090002
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeInput(
                                        "service_option",
                                        184090002,
                                        i
                                      )
                                    }
                                  >
                                    ECOM Website
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-3">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className=""
                                  >
                                    <strong>
                                      Service Type
                                      <span style={{ color: "#dd2c00" }}> 
                                        *
                                      </span>{" "}
                                    </strong>
                                  </label>
                                </div>
                                <div className="col-md-12 mt-3">
                                  <button
                                    className={`mb-2 ${
                                      product.epos_option === "RETAIL"
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeInput(
                                        "epos_option",
                                        "RETAIL",
                                        i
                                      )
                                    }
                                  >
                                    Retail
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      product.epos_option === "HOSPITALITY"
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeInput(
                                        "epos_option",
                                        "HOSPITALITY",
                                        i
                                      )
                                    }
                                  >
                                    Hospitality
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="row mb-3">
                              <div className="col-md-12">
                                <strong>
                                  Integration Availability:{" "}
                                  <span style={{ color: "#dd2c00" }}> *</span>
                                </strong>
                              </div>
                              <div className="col-md-12 mt-3">
                                <button
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
                                  className={`mb-2 ${
                                    product.integration_availability ===
                                    "STAND ALONE"
                                      ? "active_basic_btn"
                                      : "basic_btn"
                                  }`}
                                  onClick={() =>
                                    handleChangeInput(
                                      "integration_availability",
                                      "STAND ALONE",
                                      i
                                    )
                                  }
                                >
                                  Stand Alone
                                </button>
                              </div>
                            </div>
                          </div>

                          {product.integration_availability ===
                            "INTEGRATED" && (
                            <div className="col-md-12">
                              <div className="form-group">
                                <div>
                                  <label htmlFor="basic-url">
                                    <strong>
                                      Integrated With
                                      <span style={{ color: "#dd2c00" }}>
                                        *
                                      </span>
                                    </strong>
                                  </label>
                                  <div className=" my-3">
                                    <input
                                      type="text"
                                      className="form-control my-3"
                                      name="integrated_with"
                                      value={product.integrated_with}
                                      onChange={(e) => {
                                        handleChangeInput(
                                          "integrated_with",
                                          e.target.value,
                                          i
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="exampleSelect">
                                <strong>
                                  Epos Provider{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </strong>
                              </label>
                              <input
                                type="text"
                                className="form-control my-3"
                                name="epos_provider"
                                value={product.epos_provider}
                                onChange={(e) => {
                                  handleChangeInput(
                                    "epos_provider",
                                    e.target.value,
                                    i
                                  );
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleSelect">
                                <strong>
                                  Contract Length{" "}
                                  {/* <span style={{ color: "#dd2c00" }}>*</span> */}
                                </strong>
                              </label>
                              <select
                                className="form-control my-3"
                                id="exampleFormControlSelect1"
                                name="product_term"
                                value={product.product_term}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "product_term",
                                    e.target.value,
                                    i
                                  )
                                }
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
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                <strong>One Of Cost</strong>
                              </label>
                              <input
                                type="email"
                                className="form-control my-3"
                                name="one_of_cost"
                                value={product.one_of_cost}
                                onChange={(e) => {
                                  handleChangeInput(
                                    "one_of_cost",
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
                                  {/* <span style={{ color: "#dd2c00" }}>*</span> */}
                                </strong>
                              </label>
                              <input
                                type="email"
                                className="form-control my-3"
                                name="price"
                                value={product.price}
                                onChange={(e) =>
                                  handleChangeInput("price", e.target.value, i)
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
          {priceQuoteInput?.epos_products?.length > 0 && (
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
        <hr />
      </div>
    </>
  );
};

export default QuoteEpos;
