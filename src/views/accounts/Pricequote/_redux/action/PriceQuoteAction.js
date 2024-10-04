import { showToast } from "src/utils/ToastHelper";
import * as Types from "../types/Types";

import Axios from "axios";
import { GetAplicationDetails } from "src/views/accounts/NewApplication/_redux/action/ApplicationAction";
export const GetPricequoteInput =
  (name, value, index, quote_owners = undefined, contact = undefined) =>
  (dispatch) => {
    if (quote_owners !== undefined) {
      dispatch({
        type: Types.GET_PRICE_QUOTE_OWNER,
        payload: { name, value, index, contact },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
    };
    dispatch({ type: Types.GET_PRICE_QUOTE_INPUT, payload: formData });

    // if (name === "doc_type") {
    //   let reader = new FileReader();
    //   const file = e.target.files[0];
    //   reader.onloadend = () => {
    //     formData.name = "image_url";
    //     formData.value = reader.result;
    //     dispatch({ type: Types.GET_PRICE_QUOTE_INPUT, payload: formData });
    //   };
    //   reader.readAsDataURL(file);
    // }
  };
export const SetQuoteStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_PRICE_QUOTE_FALSE, payload: false });
};
export const SetQuoteStatusForQualifyFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_FALSE_QUOTE_QUALIFY, payload: false });
};
export const SubmitPriceQuoteInput = (data) => (dispatch) => {
  // delete data.ecommerce_products;
  // delete data.terminal_products;
  // delete data.epos_products;
  data.smtv =
    typeof data.smtv === "string"
      ? parseFloat(data.smtv.replace(/,/g, ""))
      : data.smtv;
  data.annual_turnover =
    typeof data.annual_turnover === "string"
      ? parseFloat(data.annual_turnover.replace(/,/g, ""))
      : data.annual_turnover;
  data.annual_card_turnover =
    typeof data.annual_card_turnover === "string"
      ? parseFloat(data.annual_card_turnover.replace(/,/g, ""))
      : data.annual_card_turnover;
  for (const product of data.quote_products) {
    delete product.application;
    delete product.monthly_price;
    if (product.price === "" || product.price === null) {
      product.price = 0;
    }
    if (product.one_of_cost === "" || product.one_of_cost === null) {
      product.one_of_cost = 0;
    }
  }

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${data.slug}/`;
  dispatch({ type: Types.IS_LOAD_QUOTE, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.AFTER_SUCCESS_PRICE_QUOTE, payload: true });
          // dispatch({ type: Types.SET_PRICEQUOTE_UPDATED, payload: false });
          showToast("success", "Opportunities update  successfully");

          dispatch({ type: Types.IS_LOAD_QUOTE, payload: false });

          // localStorage.setItem("quoteId", res.data.data.id);
          // dispatch(GetLeadtList());
          //
        } else {
          dispatch({ type: Types.IS_LOAD_QUOTE, payload: false });
          showToast("error", res.data.errors.date);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_QUOTE, payload: false });
        const erroeMsg = JSON.parse(err.request.response).errors;
        const errorList = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        errorList.map((item, index) => showToast("error", item));
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_QUOTE, payload: true });
};
export const SetPricequoteUpdatedData = (slug) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${slug}/`;
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.SET_PRICEQUOTE_UPDATED,
            payload: res.data.data,
          });
          if (res.data.data.mobile.length < 11) {
            dispatch(GetPricequoteInput("mobile", "0" + res.data.data.mobile));
          }
          if (res.data.data.telephone && res.data.data.telephone?.length < 11) {
            dispatch(
              GetPricequoteInput("telephone", "0" + res.data.data.telephone)
            );
          }
          dispatch(
            GetPricequoteInput(
              "terminal_products",
              res.data.data?.quote_products?.filter(
                (item) => item?.product_type === "card_terminal"
              )
            )
          );
          dispatch(
            GetPricequoteInput(
              "ecommerce_products",
              res.data.data?.quote_products?.filter(
                (item) =>
                  item?.product_type === "ecom" ||
                  item?.product_type === "VT" ||
                  item?.product_type === "pay_by_link" ||
                  item?.product_type === "ecom_VT"
              )
            )
          );
          dispatch(
            GetPricequoteInput(
              "epos_products",
              res.data.data?.quote_products?.filter(
                (item) => item?.product_type === "epos"
              )
            )
          );
          localStorage.setItem("quote_id", res.data.data.slug);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
      });
  } catch (error) {}
};
export const QualifyApplicationList = (slug) => (dispatch) => {
  // let priceQId = localStorage.getItem("priceQId");
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${slug}/convert/`;
  dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: true });
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          // localStorage.setItem("application_id", res.data.data.id);
          dispatch(GetAplicationDetails(res.data.data.slug));
          dispatch({
            type: Types.GET_QUALIFY_APPLICATION,
            payload: res.data.data.results,
          });
          dispatch({ type: Types.QUOTE_QUALIFY_CHECK, payload: true });
          showToast("success", "Opportunities qualify successfully");

          dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
        if (err.response === undefined) {
          showToast("error", "Internal Server Error");
        } else {
          const erroeMsg = JSON.parse(err.request.response).errors;
          const Msg = JSON.parse(err.request.response).message;

          showToast("error", Msg);
          const dataArray = Object.entries(erroeMsg).map(
            ([key, value]) => `${key}: ${JSON.stringify(value)}`
          );
          dataArray.map((item, index) => showToast("error", item));
        }
        // const erroeMsg = JSON.parse(err.request.response).errors;
        // for (let value of Object.values(erroeMsg)) {
        //   showToast("error", value[0]);
        // }
      });
  } catch (error) {
    const erroeMsg = JSON.parse(error.request.response).errors;
    for (let value of Object.values(erroeMsg)) {
      showToast("error", value[0]);
    }
    dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: true });
};
export const convertApplication = (slug) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${slug}/convert/`;
  dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: true });
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("application_id", res.data.data.slug);
          dispatch({
            type: Types.GET_QUALIFY_APPLICATION,
            payload: res.data.data.results,
          });
          dispatch({ type: Types.QUOTE_QUALIFY_CHECK, payload: true });
          showToast("success", "Opportunities qualify successfully");

          dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
        const erroeMsg = JSON.parse(err.request.response).errors;
        for (let value of Object.values(erroeMsg)) {
          showToast("error", value[0]);
        }
      });
  } catch (error) {
    const erroeMsg = JSON.parse(error.request.response).errors;
    for (let value of Object.values(erroeMsg)) {
      showToast("error", value[0]);
    }
    dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: true });
};

export const SubmitConvertApplication = (data) => (dispatch) => {
  // delete data.ecommerce_products;
  // delete data.terminal_products;
  // delete data.epos_products;
  data.smtv =
    typeof data.smtv === "string"
      ? parseFloat(data.smtv.replace(/,/g, ""))
      : data.smtv;
  data.annual_turnover =
    typeof data.annual_turnover === "string"
      ? parseFloat(data.annual_turnover.replace(/,/g, ""))
      : data.annual_turnover;
  data.annual_card_turnover =
    typeof data.annual_card_turnover === "string"
      ? parseFloat(data.annual_card_turnover.replace(/,/g, ""))
      : data.annual_card_turnover;
  const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbe
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var validation = false;
  for (const product of data.quote_products) {
    if (!product.lead_id) delete product.lead_id;
    if (!product.application) delete product.application;
    if (product.is_deleted === false) {
      if (
        data.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.terminal_provider === null ||
          product?.terminal_provider === "")
      ) {
        showToast("error", "Terminal provider shouldn't be empty");
        validation = true;
      }
      if (
        data.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.terminal_option === null || product?.terminal_option === "")
      ) {
        showToast("error", "Terminal option shouldn't be empty");
        validation = true;
      }
      if (
        data.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.integration_availability === null ||
          product?.integration_availability === "")
      ) {
        showToast("error", "Integration availablity  shouldn't be empty");
        validation = true;
      }
      if (
        data.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        product?.integration_availability === "INTEGRATED" &&
        (product?.epos_name === "" || product?.epos_name === null)
      ) {
        showToast("error", "Epos name  shouldn't be empty");
        validation = true;
      }
      if (
        data.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.product === "" || product?.product === null)
      ) {
        showToast("error", "Product  shouldn't be empty");
        validation = true;
      }
      // ====ecom product===========
      if (
        data.ecom_service === true &&
        (product?.product_type === null || product?.product_type === "")
      ) {
        showToast("error", "Terminal provider shouldn't be empty");
        validation = true;
      }
      if (
        data.ecom_service === true &&
        (product.product_type === "ecom" ||
          product?.product_type === "VT" ||
          product?.product_type === "ecom_VT") &&
        (product?.getway_provider === "" || product?.getway_provider === null)
      ) {
        showToast("error", "Getway provider shouldn't be empty");
        validation = true;
      }
      if (
        data.ecom_service === true &&
        (product.product_type === "ecom" ||
          product?.product_type === "ecom_VT") &&
        (product?.website_url === "" || product?.website_url === null)
      ) {
        showToast("error", "Website url  shouldn't be empty");
        validation = true;
      }

      // =======epos=============
      if (
        data.epos_service === true &&
        product.product_type === "epos" &&
        (product?.epos_option === null || product?.epos_option === "")
      ) {
        showToast("error", "Epos option shouldn't be empty");
        validation = true;
      }
      if (
        data.epos_service === true &&
        product.product_type === "epos" &&
        (product?.epos_provider === null || product?.epos_provider === "")
      ) {
        showToast("error", "Epos provider shouldn't be empty");
        validation = true;
      }
      if (
        data.epos_service === true &&
        product.product_type === "card_terminal" &&
        (product?.integration_availability === null ||
          product?.integration_availability === "")
      ) {
        showToast("error", "Integration availablity  shouldn't be empty");
        validation = true;
      }
      if (
        data.epos_service === true &&
        product.product_type === "card_terminal" &&
        product?.integration_availability === "INTEGRATED" &&
        (product?.integrated_with === "" || product?.integrated_with === null)
      ) {
        showToast("error", "Integrated_with  shouldn't be empty");
        validation = true;
      }
      if (
        data.epos_service === true &&
        product.product_type === "epos" &&
        (product?.price === null || product?.price === "")
      ) {
        showToast("error", "Monthly shouldn't be empty");
        validation = true;
      }
      if (
        data.epos_service === true &&
        product.product_type === "epos" &&
        (product?.product_term === null || product?.product_term === "")
      ) {
        showToast("error", "Contact length be empty");
        validation = true;
      }
    }
  }
  if (data?.lead_source === "" || data?.lead_source === null) {
    showToast("error", "Lead source shouldn't be empty");
    validation = true;
    // return 0;
  }
  // if (data.legal_type === "" || data?.legal_type === null) {
  //   showToast("error", "Legal type shouldn't be empty");
  //   validation = true;
  // }
  if (data.legal_name === "" || data?.legal_name === null) {
    showToast("error", "Legal name shouldn't be empty");
    validation = true;
  }

  if (data?.trading_name?.includes("'")) {
    showToast("error", "Trading name including ' is not allowed");
    validation = true;
  }
  if (data.industry_type === "" || data?.industry_type === null) {
    showToast("error", "industry type shouldn't be empty");
    validation = true;
  }
  // if (!data.dob) {
  //   showToast("error", "Date of birth shouldn't be empty");
  //   validation = true;
  // }
  // if (!data.incorporated_on) {
  //   showToast("error", "In Corporated on shouldn't be empty");
  //   validation = true;
  // }
  // if (!data.current_ownership_since) {
  //   showToast("error", " Current Ownership Since shouldn't be empty");
  //   validation = true;
  // }
  // if (new Date().getFullYear() - new Date(data.dob).getFullYear() < 10) {
  //   showToast("error", "Invalid DOB");
  //   validation = true;
  // }
  if (!data.trading_name) {
    showToast("error", "Trading name shouldn't be empty");
    validation = true;
  }
  if (!data.first_name) {
    showToast("error", "Frist name shouldn't be empty");
    validation = true;
  }
  if (!data.last_name) {
    showToast("error", "Last name shouldn't be empty");
    validation = true;
  }
  if (!data.email) {
    showToast("error", "Primary email  shouldn't be empty");
    validation = true;
  }

  if (
    !regEmail.test(data.secondary_email) &&
    data.secondary_email !== "" &&
    data.secondary_email !== null
  ) {
    showToast("error", "Enter a vaild secondery email ");
    validation = true;
  }
  if (data.sales_partner === "") {
    showToast("error", "Sales partner shouldn't be empty!");
    validation = true;
  }
  // if (data.lead_status === "") {
  //   showToast("error", "Lead status  shouldn't be empty!");
  //   validation = true;
  // }
  // if (data.lead_stage === "") {
  //   showToast("error", "Lead stage  shouldn't be empty!");
  //   validation = true;
  // }
  //  if (data.mobile.substring(0, 1) === "0" || data.mobile.length !== 10) {
  if (!Phone_regex.test(data.mobile)) {
    showToast("error", "Mobile number is invalid !");
    validation = true;
  }
  if (data.telephone.length !== 11 && data.telephone !== "") {
    showToast("error", "Telephone number is invalid !");
    validation = true;
  }
  if (data.legal_postcode.length === "") {
    showToast("error", "Trading post code shouldn't be empty !");
    validation = true;
  }
  if (data.legal_postcode.length < 5) {
    showToast(
      "error",
      "Please enter at least 5 digit legal address post code !"
    );
    validation = true;
  }
  if (!data.legal_address1.length) {
    showToast("error", "Legal address1 shouldn't be empty !");
    validation = true;
  }
  if (!data.legal_city.length) {
    showToast("error", "Legal city shouldn't be empty !");
    validation = true;
  }
  if (!data.trading_address1.length) {
    showToast("error", "Trading address1 shouldn't be empty !");
    validation = true;
  }
  if (data.trading_postcode.length === "") {
    showToast("error", "Trading post code shouldn't be empty !");
    validation = true;
  }
  if (data.trading_postcode.length < 5) {
    showToast(
      "error",
      "Please enter at least 5 digit trading address post code!"
    );
    validation = true;
  }
  if (!data.trading_city.length) {
    showToast("error", "Trading city shouldn't be empty!");
    validation = true;
  }

  // if (data.annual_turnover?.length === 0 || isNaN(data.annual_turnover)) {
  //   showToast("error", "Annual_turnover shouldn't be empty");
  //   validation = true;
  // }
  // if (
  //   data.annual_card_turnover?.length === 0 ||
  //   isNaN(data.annual_card_turnover)
  // ) {
  //   showToast("error", "Annual card turnover shouldn't be empty");
  //   validation = true;
  // }

  // if (data.atv === "" || data.atv === null || isNaN(data.atv)) {
  //   showToast("error", "Atv shouldn't be empty");
  //   validation = true;
  // }
  if (data.visa_credit_sr === "" || null) {
    showToast("error", "Visa credit secure rate should not be empty");
    validation = true;
  }

  if (data.master_credit_sr.includes === "" || null) {
    showToast("error", "Master credit secure rate should not be empty");
    validation = true;
  }

  if (data.visa_debit_sr === "" || null) {
    showToast("error", "Visa debit secure rate should not be empty");
    validation = true;
  }

  if (data.master_debit_sr === "" || null) {
    showToast("error", "Master debit secure rate should not be empty");
    validation = true;
  }
  if (data.visa_v_pay_sr === "" || null) {
    showToast("error", "Visa v pay secure rate should not be empty");
    validation = true;
  }
  if (data.uk_maestro_sr === "" || null) {
    showToast("error", "Maestro Domestic secure rate should not be empty");
    validation = true;
  }
  if (
    data.visa_business_credit_sr.includes(".") &&
    data.visa_business_credit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business credit secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_credit_non_sr.includes(".") &&
    data.visa_business_credit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business credit non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_debit_sr.includes(".") &&
    data.visa_business_debit_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business debit secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_business_debit_non_sr.includes(".") &&
    data.visa_business_debit_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa business debit non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_purchasing_sr.includes(".") &&
    data.visa_purchasing_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa purching secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_purchasing_non_sr.includes(".") &&
    data.visa_purchasing_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa purching non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_corporate_sr.includes(".") &&
    data.visa_corporate_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa corporate credit secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.visa_corporate_non_sr.includes(".") &&
    data.visa_corporate_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Visa corporate credit non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_business_sr.includes(".") &&
    data.master_business_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master business  secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_business_non_sr.includes(".") &&
    data.master_business_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master business  non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_purchasing_sr.includes(".") &&
    data.master_purchasing_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master purching secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_purchasing_non_sr.includes(".") &&
    data.master_purchasing_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master purching non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_fleet_sr.includes(".") &&
    data.master_fleet_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master fleet secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_fleet_non_sr.includes(".") &&
    data.master_fleet_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master fleet non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_corporate_sr.includes(".") &&
    data.master_corporate_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master Corporate  secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_corporate_non_sr.includes(".") &&
    data.master_corporate_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master Corporate  non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_pre_commercial_sr.includes(".") &&
    data.master_pre_commercial_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master pre commercial secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.master_pre_commercial_non_sr.includes(".") &&
    data.master_pre_commercial_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Master pre commercial non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_visa_sr.includes(".") &&
    data.non_eea_visa_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE visa secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_visa_non_sr.includes(".") &&
    data.non_eea_visa_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE visa non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_master_sr.includes(".") &&
    data.non_eea_master_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE master  secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }
  if (
    data.non_eea_master_non_sr.includes(".") &&
    data.non_eea_master_non_sr.split(".")[1].length > 3
  ) {
    showToast(
      "error",
      "Non EEE master  non secure rate cann't exceed 2digit after decimal"
    );
    validation = true;
  }

  if (validation) {
    return 0;
  }
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/quote/quote/${data.slug}/`;
  dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
          // showToast("success", "Price Quote qualify successfully");
          dispatch({ type: Types.AFTER_SUCCESS_QUOTE_QUALIFY, payload: true });
          localStorage.setItem("priceQId", res.data.data.slug);
          dispatch({
            type: Types.GET_PRICE_QUOTE_INPUT,
            payload: { name: "app_qualify_id", value: res.data.data.slug },
          });
        } else {
          dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
          showToast("error", res.data.errors);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: false });
        const erroeMsg = JSON.parse(err.request.response).errors;
        const errorList = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        errorList.map((item, index) => showToast("error", item));
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_PRICE_QUOTE, payload: true });
};

//   --product-------
export const GetTerminalProductInput =
  (name, value, index, terminal_products = undefined) =>
  (dispatch) => {
    if (terminal_products !== undefined) {
      dispatch({
        type: Types.GET_QUOTE_CARD_TERMINAL_PRODUCT,
        payload: { name, value, index },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };
    dispatch({
      type: Types.GET_QUOTE_CARD_TERMINAL_PRODUCT,
      payload: formData,
    });
  };
export const GetEcommerceProductInput =
  (name, value, index, ecommerce_products = undefined) =>
  (dispatch) => {
    if (ecommerce_products !== undefined) {
      dispatch({
        type: Types.GET_QUOTE_ECOMMERCE_PRODUCT,
        payload: { name, value, index },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };
    dispatch({ type: Types.GET_QUOTE_ECOMMERCE_PRODUCT, payload: formData });
  };
export const GetEposProductInput =
  (name, value, index, epos_products = undefined) =>
  (dispatch) => {
    if (epos_products !== undefined) {
      dispatch({
        type: Types.GET_QUOTE_EPOS_PRODUCT,
        payload: { name, value, index },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };
    dispatch({ type: Types.GET_QUOTE_EPOS_PRODUCT, payload: formData });
  };
