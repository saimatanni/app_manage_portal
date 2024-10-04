import React from "react";
import pen from "../../../../assets/img/pen.svg";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { GetAllProductList, decodeToken } from "src/views/common/_redux/action/CommonAction";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import { useState } from "react";

import CookieService from "src/services/CookiService";
const ProductPreview = ({ toggleProducts }) => {
  ProductPreview.propTypes = {
    toggleProducts: PropTypes.string.isRequired,
  };
  const dispatch = useDispatch();
  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList
  );
 
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const encodedToken = CookieService.getCookie("access_token");
  const [elavonProduct, setelavonProduct] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/v1/product/product/`, {
      method: "GET",
      headers: {
        authorization: `Token ${decodeToken(encodedToken)}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setelavonProduct(data.data.results));
  }, []);
  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
    // dispatch(
    //   GetPricequoteInput(
    //     "terminal_products",
    //     quote_product?.filter((item) => item?.product_type === "card_terminal")
    //   )
    // );
  }, []);
  const getPdName = (product) => {
    if (allProductList && product) {
      const filter = allProductList?.filter((data) => data?.id === product);
      return filter[0]?.name;
    }
  };
  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="buisness-detail customar-detail w-100 "
    >
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}> Product Details</h4>
        </div>
        <div className="button-box">
          <button className="   custom-btn  flex " onClick={toggleProducts}>
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button>
        </div>
      </div>

      <div className="buissness-data ">
        <div className="" style={{ backgroundColor: "#f5f5f5" }}>
          <div
            className="pt-3"
            style={{ backgroundColor: "#f5f5f5", margin: "0 26px" }}
          >
            <p
              style={{
                borderBottom: "0.4px solid #979797",
                paddingBottom: "12px",
                fontWeight: "bold",
              }}
            >
              Product Details
            </p>
          </div>
          <div className="">
            {/* <ApplicationProducts /> */}
            <div style={{ backgroundColor: "#f5f5f5" }}>
              <div className="px-4">
                <p
                  style={{
                    // borderBottom: "0.4px solid #979797",

                    fontWeight: "bold",
                  }}
                >
                  Card Terminal
                </p>
              </div>
              <div className="mx-0 mx-md-3">
                <div className="table-container mt-2">
                  <table className="table table-striped table-hover table-bordered">
                    <thead style={{ color: "black" }}>
                      <tr className="height">
                        {/* <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Product ID</p>
                      </div>
                    </th> */}
                        {/* app type className="d-flex justify-content-between align-content-center" */}
                        <th>
                          <div className="d-flex  justify-content-center">
                            <p>Product Name</p>
                            {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                          </div>
                        </th>
                        {/* legal name */}
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>Connection Type</p>
                          </div>
                        </th>
                        {/* trading name */}
                        <th>
                          <div className="d-flex justify-content-center">
                            <p className="ms-4">Contract Length</p>
                          </div>
                        </th>
                        {/* mMID status */}
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>Terminal Option</p>
                          </div>
                        </th>
                        {/* mMID status */}
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>Terminal Model</p>
                          </div>
                        </th>
                        {/* account status */}
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>Monthly Price</p>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>Terminal Type</p>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>Quantity</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceQuoteInput?.terminal_products?.length === 0 ? (
                        <>
                          <tr>
                            <td colSpan="11">
                              <div className="not_found">
                                <h4 className="my-4">No Data Found</h4>
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {priceQuoteInput?.terminal_products?.map((data) => (
                            <>
                              {data.is_deleted === false && (
                                <tr>
                                  {/* <td>{data?.id}</td> */}
                                  <td>{getPdName(data?.product)}</td>
                                  <td>{data?.connection_type}</td>
                                  <td>{data?.contact_length}</td>
                                  <td>
                                    {data?.terminal_option === "FT"
                                      ? "Free Terminal"
                                      : data?.terminal_option === "MR"
                                      ? "Monthly Rental"
                                      : data?.terminal_option === "ET"
                                      ? "Elavon Terminal"
                                      : "Outright"}
                                  </td>
                                  <td>{data?.terminal_model}</td>
                                  <td>{data?.monthly_price}</td>
                                  <td>{data?.integration_availability}</td>
                                  <td>{data?.qty}</td>
                                </tr>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#f5f5f5" }}>
              <div className="px-4">
                <p
                  style={{
                    // borderBottom: "0.4px solid #979797",

                    fontWeight: "bold",
                  }}
                >
                  E-Commerce or Virtual terminal
                </p>
              </div>
              <div className="mx-0 mx-md-3">
                <div className="table-container mt-2">
                  <table className="table table-striped table-hover table-bordered">
                    <thead style={{ color: "black" }}>
                      <tr className="height">
                        {/* <th style={{ minWidth: "140px" }}>
                      <div className="d-flex px-2 justify-content-center">
                        <p style={{ textAlign: "end" }}>Product ID</p>
                      </div>
                    </th> */}
                        <th style={{ minWidth: "140px" }}>
                          <div className="d-flex px-2 justify-content-center">
                            <p style={{ textAlign: "end" }}>Service Type</p>
                          </div>
                        </th>
                        {/* app type className="d-flex justify-content-between align-content-center" */}
                        <th>
                          <div className="d-flex px-2 justify-content-center">
                            <p style={{ textAlign: "start" }}>WebSite Url</p>
                            {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                          </div>
                        </th>
                        {/* legal name */}
                        <th>
                          <div className="d-flex justify-content-center">
                            <p>E-com Provider</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceQuoteInput?.ecommerce_products?.length === 0 ? (
                        <>
                          <tr>
                            <td colSpan="11">
                              <div className="not_found">
                                <h4 className="my-4">No Data Found</h4>
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {priceQuoteInput?.ecommerce_products?.map((data) => (
                            <>
                              {data.is_deleted === false && (
                                <tr>
                                  {/* <td>{data?.id}</td> */}
                                  <td>
                                    {" "}
                                    {data?.product_type === "VT"
                                      ? "Virtual terminal"
                                      : data?.product_type === "ecom"
                                      ? " E-Commerce"
                                      : data?.product_type === "ecom_VT"
                                      ? "E-Commerce & Virtual terminal"
                                      : "Pay By Link"}
                                  </td>
                                  <td>
                                    {data?.website_url ? data?.website_url : ""}
                                  </td>
                                  <td>
                                    {data?.getway_provider === 0
                                      ? "CARDSTREAM"
                                      : "OPAYO"}
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#f5f5f5" }}>
              <div className="px-4">
                <p
                  style={{
                    // borderBottom: "0.4px solid #979797",

                    fontWeight: "bold",
                  }}
                >
                  E-POS / Online Ordering / Website
                </p>
              </div>
              <div className="mx-0 mx-md-3">
                <div className="table-container mt-2">
                  <table className="table table-striped table-hover table-bordered">
                    <thead style={{ color: "black" }}>
                      <tr className="height">
                        <th style={{ minWidth: "140px" }}>
                          <div className="d-flex px-2 justify-content-center">
                            <p>Service provider</p>
                          </div>
                        </th>
                        <th style={{ minWidth: "140px" }}>
                          <div className="d-flex px-2 justify-content-center">
                            <p style={{ textAlign: "end" }}>Service Option</p>
                          </div>
                        </th>
                        {/* app type className="d-flex justify-content-between align-content-center" */}
                        <th>
                          <div className="d-flex px-2 justify-content-center">
                            <p>One of Cost</p>
                            {/* <img style={{ marginTop: '-15px', cursor: 'pointer' }} src={arrow} alt="" /> */}
                          </div>
                        </th>
                        {/* trading name */}
                        <th>
                          <div className="d-flex px-2 justify-content-center">
                            <p className="ms-4">Monthly Rental</p>
                          </div>
                        </th>
                        {/* mMID status */}
                        <th>
                          <div className="d-flex px-2 justify-content-center">
                            <p>Contract length</p>
                          </div>
                        </th>
                        {/* account status */}
                        <th>
                          <div className="d-flex px-2 justify-content-center">
                            <p>Service Type</p>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex px-2 justify-content-center">
                            <p>Integrated With </p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceQuoteInput?.epos_products?.length === 0 ? (
                        <>
                          <tr>
                            <td colSpan="11">
                              <div className="not_found">
                                <h4 className="my-4">No Data Found</h4>
                              </div>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {priceQuoteInput?.epos_products?.map((data) => (
                            <>
                              {data.is_deleted === false && (
                                <tr>
                                  <td>{data?.epos_provider}</td>
                                  <td>{data?.service_option}</td>
                                  <td>{data?.one_of_cost}</td>
                                  <td>{data?.monthly_price}</td>
                                  <td>{data?.contact_length}</td>
                                  <td>{data?.epos_option}</td>
                                  <td>{data?.integrated_with}</td>
                                </tr>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------Trading Address----------------------- */}
      </div>
    </div>
  );
};

export default ProductPreview;
