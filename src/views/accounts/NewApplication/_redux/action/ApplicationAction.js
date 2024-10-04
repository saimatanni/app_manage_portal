import * as Types from "../types/Types";

import Axios from "axios";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import { format } from "date-fns-tz";
import { showToast } from "src/utils/ToastHelper";
import { GetCompanyHouseDetails } from "src/views/accounts/Leads/_redux/action/LeadAction";
import { GetPricequoteInput } from "src/views/accounts/Pricequote/_redux/action/PriceQuoteAction";
import Swal from "sweetalert2";
import Cookies from "js-cookie"; // Import js-cookie
export const dateTimeZone = (value) => {
  if (typeof value === "string") {
    return value;
  } else {
    const originalDateString = value; // Original date string in UTC

    const formattedConvertedTime = format(
      originalDateString,
      "yyyy-MM-dd'T'HH:mm:ssXXX"
    );

    const fomDate = formattedConvertedTime.split("T")[0];

    return fomDate;
  }
};
export const UpdateApplicationInputForSigning =
  (data, submit, sign_data) => (dispatch) => {
    if (submit === "submit") {
      data.is_submitted_to_ps = true;
    } else if (submit === "not_submit") {
      data.is_submitted_to_ps = false;
    }
    if (data.incorporated_on) {
      data.incorporated_on = dateTimeZone(data.incorporated_on);
    }
    if (data.dob) {
      data.dob = dateTimeZone(data.dob);
    }
    if (data.s_business_start_date) {
      data.s_business_start_date = dateTimeZone(data.s_business_start_date);
    }
    if (data.current_ownership_since) {
      data.current_ownership_since = dateTimeZone(data.current_ownership_since);
    }
    if (data.s_individual_start_date) {
      data.s_individual_start_date = dateTimeZone(data.s_individual_start_date);
    }
    if (data.s_individual_date) {
      data.s_individual_date = dateTimeZone(data.s_individual_date);
    }

    for (const doc of data.business_owners) {
      doc.owner_issue_date = dateTimeZone(doc.owner_issue_date);
      doc.owner_expiry_date = dateTimeZone(doc.owner_expiry_date);
      // doc.owner_expiry_date = fomDate;

      doc.contact_dob = dateTimeZone(doc.contact_dob);
      if (doc.business_owner_contacts[0].street_line_1) {
        doc.business_owner_contacts[0].street_line_1 =
          doc.business_owner_contacts[0].street_line_1.toUpperCase();
      }
      if (doc.business_owner_contacts[0].city) {
        doc.business_owner_contacts[0].city =
          doc.business_owner_contacts[0].city.toUpperCase();
      }
    }
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
    for (const product of data.application_products) {
      delete product.quote;
      delete product.price;
      if (product.monthly_price === "" || product.monthly_price === null) {
        product.monthly_price = 0;
      }
      if (product.one_of_cost === "" || product.one_of_cost === null) {
        product.one_of_cost = 0;
      }
    }
    for (const doc of data.application_docs) {
      delete doc.pdf_url;
      delete doc.docFile_url;
      delete doc.fileName;
    }
    for (const doc of data.business_owners) {
      delete doc.pdf_url;
      delete doc.docFile_url;
      delete doc.fileName;
    }
    if (parseFloat(data.visa_credit_sr) < 0.65) {
      showToast("error", "Visa Credit rate sho be at least 0.650");
      return 0;
    }
    if (parseFloat(data.master_credit_sr) < 0.65) {
      showToast("error", "Master Credit rate should be at least 0.650");
      return 0;
    }
    if (parseFloat(data.visa_debit_sr) < 0.35) {
      showToast("error", "Visa debit rate should be at least 0.350");
      return 0;
    }
    if (parseFloat(data.master_debit_sr) < 0.38) {
      showToast("error", "Master debit rate should be at least 0.380");
      return 0;
    }
    if (parseFloat(data.visa_v_pay_sr) < 0.35) {
      showToast("error", "Visa v-pay rate should be at least 0.350");
      return 0;
    }
    if (parseFloat(data.uk_maestro_sr) < 0.38) {
      showToast("error", "Maestro domestic rate should be at least 0.380");
      return 0;
    }
    const formData = new FormData();
    formData.append(
      "document",
      data.application_docs.map((a) => a.document)
    );
    formData.append("doc_type", data.doc_type);
    // formData.append("owner", data.owner);
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${data.slug}/`;
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
    try {
      // Axios.put(url, data,formData , {
      Axios.put(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })

        .then((res) => {
          if (res.data.status) {
            dispatch({ type: Types.IS_LOAD_APP, payload: false });
            if (sign_data) {
              dispatch(
                SubmitSiginingRequest(
                  sign_data,
                  res.data.data.id,
                  res.data.data.business_owners[0].owner_email
                )
              );
            }
            if (res.data.data.is_submitted_to_ps) {
              dispatch({
                type: Types.GET_APPLICATION_INPUT,
                payload: { name: "submit", value: true },
              });
            }
            // showToast("success", "New application Updated successfully");

            // dispatch({ type: Types.AFTER_SUCCESS_APPLICATION, payload: true });

            // dispatch({ type: Types.IS_LOAD_APP, payload: false });
            // showToast("error", res.data.errors.date);
          }
        })
        .catch((err) => {
          dispatch({
            type: Types.GET_APPLICATION_INPUT,
            payload: { name: "is_submitted_to_ps", value: false },
          });
          dispatch({ type: Types.IS_LOAD_APP, payload: false });
          if (err.response === undefined) {
            showToast("error", "Internal Server Error");
          } else {
            const erroeMsg = JSON.parse(err.request.response).errors;
            const Msg = JSON.parse(err.request.response).message;

            showToast("error", Msg);
            const dataArray = erroeMsg
              ? Object.entries(erroeMsg).map(
                  ([key, value]) => `${key}: ${JSON.stringify(value)}`
                )
              : [];
            dataArray.map((item, index) => showToast("error", item));
          }
        });
    } catch (error) {
      dispatch({
        type: Types.GET_APPLICATION_INPUT,
        payload: { name: "is_submitted_to_ps", value: false },
      });
      showToast("error", "Something went wrong");
    }
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
  };
export const UpdateApplicationInput =
  (data, submit, sign_data, handleNext) => (dispatch) => {
    data.sales_moto_perc = parseInt(data.sales_moto_perc);
    data.sales_ftf_perc = parseInt(data.sales_ftf_perc);
    data.sales_internet_perc = parseInt(data.sales_internet_perc);
    if (!data.product_per_month_amt) {
      data.product_per_month_amt = "4.50";
    }
    if (!data.non_compliance_per_month) {
      data.non_compliance_per_month = "40.00";
    }
    if (!data.customer_value_per_month) {
      data.customer_value_per_month = "N/A";
    }

    if (submit === "submit") {
      data.is_submitted_to_ps = true;
      for (const business_owner of data.business_owners) {
        if (!business_owner?.owner_id_num) {
          showToast("error", "Owner ID number shouldn't be empty");
          return 0;
        }
      }
    } else if (submit === "not_submit") {
      data.is_submitted_to_ps = false;
    }
    if (data.incorporated_on) {
      data.incorporated_on = dateTimeZone(data.incorporated_on);
    }
    if (data.dob) {
      data.dob = dateTimeZone(data.dob);
    }
    if (data.s_business_start_date) {
      data.s_business_start_date = dateTimeZone(data.s_business_start_date);
    }
    if (data.current_ownership_since) {
      data.current_ownership_since = dateTimeZone(data.current_ownership_since);
    }
    if (data.s_individual_start_date) {
      data.s_individual_start_date = dateTimeZone(data.s_individual_start_date);
    }
    if (data.s_individual_date) {
      data.s_individual_date = dateTimeZone(data.s_individual_date);
    }

    for (const doc of data.business_owners) {
      if (doc.owner_issue_date) {
        doc.owner_issue_date = dateTimeZone(doc.owner_issue_date);
      }
      if (doc.owner_expiry_date) {
        doc.owner_expiry_date = dateTimeZone(doc.owner_expiry_date);
      }

      // doc.owner_expiry_date = fomDate;
      if (doc.contact_dob) {
        doc.contact_dob = dateTimeZone(doc.contact_dob);
      }
      if (doc.business_owner_contacts[0].street_line_1) {
        doc.business_owner_contacts[0].street_line_1 =
          doc.business_owner_contacts[0].street_line_1.toUpperCase();
      }
      if (doc.business_owner_contacts[0].city) {
        doc.business_owner_contacts[0].city =
          doc.business_owner_contacts[0].city.toUpperCase();
      }
    }
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
    for (const product of data.application_products) {
      delete product.quote;
      delete product.price;
      const newTextEcom = "( PAY BY WEB URL )";
      const newTextLink = "( PAY BY LINK )";
      const newTextTerminal = "( PAY BY VIRTUAL TERMINAL )";

      // Check the product_type and set the newTextToAdd accordingly
      let newTextToAdd;

      if (product.product_type === "ecom") {
        newTextToAdd = newTextEcom;
      } else if (product.product_type === "pay_by_link") {
        newTextToAdd = newTextLink;
      } else if (product.product_type === "VT") {
        newTextToAdd = newTextTerminal;
      } else if (product.product_type === "ecom_VT") {
        newTextToAdd = newTextTerminal;
      }

      // Remove the old text associated with the previous type
      if (data.desc_of_service) {
        data.desc_of_service = data.desc_of_service
          .replace(new RegExp(escapeRegExp(newTextEcom), "g"), "")
          .replace(new RegExp(escapeRegExp(newTextLink), "g"), "")
          .replace(new RegExp(escapeRegExp(newTextTerminal), "g"), "");

        // Function to escape regular expression special characters
        function escapeRegExp(text) {
          return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
      }

      if (newTextToAdd) {
        if (!data.desc_of_service.includes(newTextToAdd)) {
          data.desc_of_service += newTextToAdd;
        }
      } else {
        data.desc_of_service = data.desc_of_service + "";
      }
      if (product.monthly_price === "" || product.monthly_price === null) {
        product.monthly_price = 0;
      }
      if (product.one_of_cost === "" || product.one_of_cost === null) {
        product.one_of_cost = 0;
      }
    }
    for (const doc of data.application_docs) {
      delete doc.pdf_url;
      delete doc.docFile_url;
      delete doc.fileName;
    }
    for (const doc of data.business_owners) {
      delete doc.pdf_url;
      delete doc.docFile_url;
      delete doc.fileName;
    }

    const formData = new FormData();
    formData.append(
      "document",
      data.application_docs.map((a) => a.document)
    );
    formData.append("doc_type", data.doc_type);
    // formData.append("owner", data.owner);
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${data.slug}/`;
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
    try {
      // Axios.put(url, data,formData , {
      Axios.put(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })

        .then((res) => {
          if (res.data.status) {
            dispatch({ type: Types.IS_LOAD_APP, payload: false });
            dispatch({
              type: Types.GET_APPLICATION_INPUT,
              payload: {
                name: "is_submitted_to_ps",
                value: res.data.data.is_submitted_to_ps,
              },
            });
            if (handleNext) {
              handleNext();
            }

            if (sign_data) {
              dispatch(
                SubmitSiginingRequest(
                  sign_data,
                  res.data.data.id,
                  res.data.data.business_owners[0].owner_email
                )
              );
            }
            if (res.data.data.is_submitted_to_ps) {
              dispatch({
                type: Types.GET_APPLICATION_INPUT,
                payload: { name: "submit", value: true },
              });
            }
            showToast("success", "New application Updated successfully");

            // localStorage.setItem("app_id", res.data.data.id);
            dispatch({ type: Types.AFTER_SUCCESS_APPLICATION, payload: true });

            // dispatch({ type: Types.IS_LOAD_APP, payload: false });
            // showToast("error", res.data.errors.date);
          }
        })
        .catch((err) => {
          console.log("err.rsponse", err);
          dispatch({
            type: Types.GET_APPLICATION_INPUT,
            payload: { name: "is_submitted_to_ps", value: false },
          });

          dispatch({ type: Types.IS_LOAD_APP, payload: false });
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
        });
    } catch (error) {
      dispatch({
        type: Types.GET_APPLICATION_INPUT,
        payload: { name: "is_submitted_to_ps", value: false },
      });
      showToast("error", "Something went wrong");
    }
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
  };
export const SubmitNewApplicationInput =
  (data, submit, sign_data, handleNext) => (dispatch) => {
    const userData = JSON.parse(Cookies.get("userData"));
    data.created_from = 1;
    data.user = userData.id;
    data.sales_moto_perc = parseInt(data.sales_moto_perc);
    data.sales_ftf_perc = parseInt(data.sales_ftf_perc);
    data.sales_internet_perc = parseInt(data.sales_internet_perc);
    if (data.applicaiton_stage) {
      delete data.applicaiton_stage;
    }
    if (data.application_status) {
      delete data.application_status;
    }
    if (data.dob) {
      data.dob = new Date(data.dob).toISOString().split("T")[0];
    }
    if (data.incorporated_on) {
      data.incorporated_on = dateTimeZone(data.incorporated_on);
    }
    if (data.dob) {
      data.dob = dateTimeZone(data.dob);
    }
    if (data.s_business_start_date) {
      data.s_business_start_date = dateTimeZone(data.s_business_start_date);
    }
    if (data.current_ownership_since) {
      data.current_ownership_since = dateTimeZone(data.current_ownership_since);
    }
    if (data.s_individual_start_date) {
      data.s_individual_start_date = dateTimeZone(data.s_individual_start_date);
    }
    if (data.s_individual_date) {
      data.s_individual_date = dateTimeZone(data.s_individual_date);
    }

    for (const doc of data.business_owners) {
      if (doc.owner_issue_date) {
        doc.owner_issue_date = dateTimeZone(doc.owner_issue_date);
      }
      if (doc.owner_expiry_date) {
        doc.owner_expiry_date = dateTimeZone(doc.owner_expiry_date);
      }

      // doc.owner_expiry_date = fomDate;
      if (doc.contact_dob) {
        doc.contact_dob = dateTimeZone(doc.contact_dob);
      }
    }
    if (submit === "submit") {
      data.is_submitted_to_ps = true;
    } else if (submit === "not_submit") {
      data.is_submitted_to_ps = false;
    }
    data.application_docs = [];
    for (const doc of data.application_docs) {
      delete doc.pdf_url;
      delete doc.docFile_url;
      delete doc.fileName;
      delete doc.id;
    }

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
    for (const product of data.application_products) {
      delete product.quote;
      delete product.price;
      delete product.id;
      const newTextEcom = "( PAY BY WEB URL )";
      const newTextLink = "( PAY BY LINK )";
      const newTextTerminal = "( PAY BY VIRTUAL TERMINAL )";

      // Check the product_type and set the newTextToAdd accordingly
      let newTextToAdd;

      if (product.product_type === "ecom") {
        newTextToAdd = newTextEcom;
      } else if (product.product_type === "pay_by_link") {
        newTextToAdd = newTextLink;
      } else if (product.product_type === "VT") {
        newTextToAdd = newTextTerminal;
      } else if (product.product_type === "ecom_VT") {
        newTextToAdd = newTextTerminal;
      }

      // Remove the old text associated with the previous type
      data.desc_of_service = data.desc_of_service
        .replace(new RegExp(escapeRegExp(newTextEcom), "g"), "")
        .replace(new RegExp(escapeRegExp(newTextLink), "g"), "")
        .replace(new RegExp(escapeRegExp(newTextTerminal), "g"), "");

      // Function to escape regular expression special characters
      function escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      // Add the new text normally if it doesn't exist
      // if (!data.desc_of_service.includes(newTextToAdd)) {
      //   data.desc_of_service += newTextToAdd;
      // }
      console.log("newTextToAdd", newTextToAdd);
      if (newTextToAdd) {
        if (!data.desc_of_service.includes(newTextToAdd)) {
          data.desc_of_service += newTextToAdd;
        }
      } else {
        data.desc_of_service = data.desc_of_service + "";
      }
      if (product.monthly_price === "" || product.monthly_price === null) {
        product.monthly_price = 0;
      }
      if (product.one_of_cost === "" || product.one_of_cost === null) {
        product.one_of_cost = 0;
      }
    }
    for (const item of data.debit_bank_info) {
      delete item.application;
      delete item.id;
    }

    const formData = new FormData();
    formData.append(
      "document",
      data.application_docs.map((a) => a.document)
    );
    formData.append("doc_type", data.doc_type);
    formData.append("owner", data.owner);
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/add-new-application/`;
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
    try {
      // Axios.put(url, data,formData , {
      Axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })

        .then((res) => {
          if (res.data.status) {
            console.log(sign_data);
            if (sign_data) {
              console.log("sign_data");
              dispatch(
                SubmitSiginingRequest(
                  sign_data,
                  res.data.data.id,
                  res.data.data.business_owners[0].owner_email
                )
              );
            }
            handleNext();
            dispatch({ type: Types.IS_LOAD_APP, payload: false });
            dispatch({
              type: Types.GET_APPLICATION_INPUT,
              payload: { name: "id", value: res.data.data.id },
            });
            if (res.data.data.is_submitted_to_ps) {
              dispatch({
                type: Types.GET_APPLICATION_INPUT,
                payload: { name: "submit", value: true },
              });
            }
            showToast("success", "New application added successfully");

            // localStorage.setItem("newAppId", res.data.data.slug);
            dispatch(GetAplicationDetails(res.data.data.slug));
            dispatch({ type: Types.AFTER_SUCCESS_APPLICATION, payload: true });

            dispatch({ type: Types.IS_LOAD_APP, payload: false });
          }
        })
        .catch((err) => {
          dispatch({
            type: Types.GET_APPLICATION_INPUT,
            payload: { name: "is_submitted_to_ps", value: false },
          });
          dispatch({ type: Types.IS_LOAD_APP, payload: false });
          console.log(err);
          if (err.response === undefined) {
            showToast("error", "Internal Server Error");
          } else {
            const erroeMsg = JSON.parse(err.request.response).errors;
            const Msg = JSON.parse(err.request.response).message;

            // showToast("erroeMsg", erroeMsg);
            const dataArray = Object.entries(erroeMsg).map(
              ([key, value]) => `${key}: ${JSON.stringify(value)}`
            );

            const item = dataArray[0];
            const regex = /data: "(.*?)"/;
            const match = item.match(regex);
            const textPortion = match ? match[1] : "";
            console.log("textPortion", textPortion);
            if (textPortion) {
              Swal.fire({
                title: "Error!",
                text: textPortion,
                icon: "error",
              });
            } else {
              dataArray.map((item, index) => showToast("error", item));
              console.error("No text portion found in dataArray");
            }
          }
        });
    } catch (error) {
      dispatch({
        type: Types.GET_APPLICATION_INPUT,
        payload: { name: "is_submitted_to_ps", value: false },
      });
      showToast("error", "Something went wrong");
    }
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
  };
export const GetApplicationInput =
  (name, value, index, business_owners = undefined, contact = undefined) =>
  (dispatch) => {
    if (business_owners !== undefined) {
      dispatch({
        type: Types.GET_QUOTE_OWNER,
        payload: { name, value, index, contact },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
    };
    dispatch({ type: Types.GET_APPLICATION_INPUT, payload: formData });
  };
export const GetOwnerPdfInput =
  (name, value, index, e, business_owners = undefined) =>
  (dispatch) => {
    // dispatch({ type: Types.GET_DOC_INPUT, payload: formData });
    if (business_owners !== undefined) {
      const formData = {
        name: name,
        value: value,
        index,
      };
      dispatch({
        type: Types.GET_QUOTE_OWNER,
        payload: { name, value, index },
      });

      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };

    dispatch({ type: Types.GET_QUOTE_OWNER, payload: formData });
  };
export const GetOwnerDocInput2 =
  (name, value, index, e, business_owners = undefined) =>
  (dispatch) => {
    // dispatch({ type: Types.GET_DOC_INPUT, payload: formData });
    if (business_owners !== undefined) {
      const formData = {
        name: name,
        value: value,
        index,
      };
      dispatch({
        type: Types.GET_QUOTE_OWNER,
        payload: { name, value, index },
      });
      let reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        formData.name = "document";
        formData.value = reader.result;
        dispatch({ type: Types.GET_QUOTE_OWNER, payload: formData });
      };
      reader.readAsDataURL(file);

      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };

    dispatch({ type: Types.GET_QUOTE_OWNER, payload: formData });
  };
export const GetApplicationBankInput = (name, value, index) => (dispatch) => {
  console.log("fdfn", name, value, index);

  dispatch({
    type: Types.ADD_NEW_BANK,
    payload: { name, value, index },
  });
  return;

  // const formData = {
  //   name: name,
  //   value: value,
  // };
  // dispatch({ type: Types.GET_APPLICATION_INPUT, payload: formData });
};

export const SetApplicationStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_APPLICATION_FALSE, payload: false });
};
export const SetApplicationStatusFalse2 = () => (dispatch) => {
  dispatch({ type: Types.SET_APPLICATION_STATUS_FALSE, payload: false });
};

export const GetAplicationDetails =
  (id, handleApplicationEdit) => (dispatch) => {
    // console.log("handleApplicationEdit", handleApplicationEdit);
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/new-application-details/`;
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
    try {
      Axios.get(url).then((res) => {
        if (res.data.status) {
          // dispatch({ type: Types.IS_LOAD_APP, payload: false
          dispatch({
            // type: Types.GET_APPLICATION_DETAILS,
            type: Types.SET_APPLICATION_UPDATED,
            payload: res.data.data,
          });

          // dispatch(GetApplicationInput("s_individual_sales_representatives", res.data.data.sales_partner_name));

          if (res.data.data.desc_of_service === null) {
            dispatch(GetApplicationInput("desc_of_service", ""));
          }
          if (res.data.data.mobile.length < 11) {
            dispatch(GetApplicationInput("mobile", "0" + res.data.data.mobile));
          }
          if (res.data.data.telephone && res.data.data.telephone?.length < 11) {
            dispatch(
              GetApplicationInput("telephone", "0" + res.data.data.telephone)
            );
          }
          dispatch(
            GetApplicationInput("existing_mid", res.data.data.boarding_id)
          );
          console.log(
            "handleApplicationEdit",
            typeof handleApplicationEdit === "string"
          );
          if (typeof handleApplicationEdit === "function") {
            localStorage.setItem("newAppId", res.data.data.slug);
            handleApplicationEdit();
          }
          if (typeof handleApplicationEdit === "string") {
            dispatch(GetApplicationInput("id", ""));
            dispatch(GetApplicationInput("slug", ""));
            dispatch(GetApplicationInput("is_submitted_to_ps", false));
            dispatch(GetApplicationInput("application_status", 0));
            dispatch(GetApplicationInput("application_stage", 0));
          }

          res.data.data.business_owners.map((item, index) => {
            if (item.owner_phone_no && item.owner_phone_no.length < 11) {
              const contact = undefined;
              dispatch(
                GetApplicationInput(
                  "owner_phone_no",
                  "0" + item.owner_phone_no,
                  index,
                  "business_owners",
                  contact
                )
              );
            }
          });
          dispatch(
            GetPricequoteInput(
              "terminal_products",
              res.data.data?.application_products?.filter(
                (item) => item?.product_type === "card_terminal"
              )
            )
          );
          dispatch(
            GetPricequoteInput(
              "ecommerce_products",
              res.data.data?.application_products?.filter(
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
              res.data.data?.application_products?.filter(
                (item) => item?.product_type === "epos"
              )
            )
          );
          dispatch({ type: Types.IS_LOAD_APP, payload: false });
        }
      });
    } catch (error) {
      dispatch({ type: Types.IS_LOAD_APP, payload: false });
    }
    dispatch({ type: Types.IS_LOAD_APP, payload: true });
  };
export const GetBusinessDetails = (api, add_loc) => (dispatch) => {
  const contact = undefined;
  const url = api;
  // const url = `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/${id}/new-application-details/`;
  dispatch({ type: Types.IS_LOAD_BUSINESS, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          // type: Types.GET_APPLICATION_DETAILS,
          type: Types.SET_BUSINESS_UPDATED,
          payload: res.data.data,
        });

        dispatch(
          GetApplicationInput("legal_name", res.data.data.lead.companyname)
        );
        if (add_loc) {
          dispatch(
            GetCompanyHouseDetails(
              res.data.data.opportunity.ptsave_companyhouseno
            )
          );
        }

        if (
          res.data.data.lead?.telephone3 &&
          res.data.data.lead?.telephone3.length < 11
        ) {
          dispatch(
            GetApplicationInput("mobile", "0" + res.data.data.lead?.telephone3)
          );
        }
        if (
          res.data.data.lead?.telephone2 &&
          res.data.data.lead?.telephone2?.length < 11
        ) {
          dispatch(
            GetApplicationInput(
              "telephone",
              "0" + res.data.data.lead?.telephone2
            )
          );
        }
        if (
          res.data.data.opportunity?.[
            "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
          ] &&
          res.data.data.opportunity?.[
            "ptsave_acquiring_bank@OData.Community.Display.V1.FormattedValue"
          ] === "Elavon"
        ) {
          dispatch(GetApplicationInput("acquiring_bank", 0));
        }
        if (
          res.data.data.opportunity?.[
            "ptsave_oldcardprovider1@OData.Community.Display.V1.FormattedValue"
          ] === "N/A"
        ) {
          dispatch(GetApplicationInput("new_to_card_proccessing", false));
        }
        if (res.data.data.opportunity.ptsave_vat === false) {
          dispatch(GetApplicationInput("vat_enabled", 1));
        }
        if (res.data.data.opportunity.ptsave_legal_type === 1) {
          dispatch(GetApplicationInput("legal_type", "LLP"));
        } else if (res.data.data.opportunity.ptsave_legal_type === 2) {
          dispatch(GetApplicationInput("legal_type", "PART"));
        } else {
          dispatch(GetApplicationInput("legal_type", "ST"));
        }

        dispatch(GetApplicationInput("legal_country", 74));
        dispatch(GetApplicationInput("trading_country", 74));
        const contact1 = "business_owner_contacts";
        dispatch(
          GetApplicationInput(
            "is_deleted",
            false,
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_first_name",
            res.data.data.contact.firstname || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_surname",
            res.data.data.contact.lastname || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_second_name",
            res.data.data.contact.lastname || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "contact_dob",
            res.data.data.contact.birthdate || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_id_num",
            res.data.data.contact.ptsave_idnumber || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_email",
            res.data.data.contact.emailaddress1 || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_phone_no",
            0 + res.data.data.contact.telephone1 || "",
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "ownership_perc",
            0 + res.data.data.contact.ptsave_percentofownership || 100,
            0,
            "business_owners",
            contact
          )
        );
        dispatch(
          GetApplicationInput(
            "zip_code",
            res.data.data.contact.address1_postalcode || "",
            0,
            "business_owners",
            contact1
          )
        );
        dispatch(
          GetApplicationInput(
            "street_line_1",
            res.data.data.contact.address1_line1 || "",
            0,
            "business_owners",
            contact1
          )
        );
        dispatch(
          GetApplicationInput(
            "locality",
            res.data.data.contact.address1_line2 || "",
            0,
            "business_owners",
            contact1
          )
        );
        dispatch(
          GetApplicationInput(
            "city",
            res.data.data.contact.address1_city || "",
            0,
            "business_owners",
            contact1
          )
        );
        dispatch(
          GetApplicationInput(
            "county_code",
            res.data.data.contact.address1_line3 || "",
            0,
            "business_owners",
            contact1
          )
        );
        dispatch(
          GetApplicationInput(
            "country_code",
            74,
            0,
            "business_owners",
            contact1
          )
        );
        dispatch(
          GetApplicationInput(
            "owner_nationality",
            74,
            0,
            "business_owners",
            contact
          )
        );
        // res.data.data.business_owners.map((item, index) => {
        //   if (item.owner_phone_no && item.owner_phone_no.length < 11) {
        //     const contact = undefined;
        //     dispatch(
        //       GetApplicationInput(
        //         "owner_phone_no",
        //         "0" + item.owner_phone_no,
        //         index,
        //         "business_owners",
        //         contact
        //       )
        //     );
        //   }
        // });
        // dispatch(
        //   GetPricequoteInput(
        //     "terminal_products",
        //     res.data.data?.application_products?.filter(
        //       (item) => item?.product_type === "card_terminal"
        //     )
        //   )
        // );
        // dispatch(
        //   GetPricequoteInput(
        //     "ecommerce_products",
        //     res.data.data?.application_products?.filter(
        //       (item) =>
        //         item?.product_type === "ecom" ||
        //         item?.product_type === "VT" ||
        //         item?.product_type === "pay_by_link" ||
        //         item?.product_type === "ecom_VT"
        //     )
        //   )
        // );
        // dispatch(
        //   GetPricequoteInput(
        //     "epos_products",
        //     res.data.data?.application_products?.filter(
        //       (item) => item?.product_type === "epos"
        //     )
        //   )
        // );
        dispatch({ type: Types.IS_LOAD_BUSINESS, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_BUSINESS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_BUSINESS, payload: true });
};

export const GetDocInput =
  (name, value, index, e, application_docs = undefined) =>
  (dispatch) => {
    // dispatch({ type: Types.GET_DOC_INPUT, payload: formData });
    if (application_docs !== undefined) {
      const formData = {
        name: name,
        value: value,
        index,
      };
      dispatch({ type: Types.ADD_NEW_DOC, payload: { name, value, index } });

      // if (name === "document") {
      //   let reader = new FileReader();
      //   const file = e.target.files[0];
      //   reader.onloadend = () => {
      //     formData.name = "document";
      //     formData.value = reader.result;
      //     dispatch({ type: Types.ADD_NEW_DOC, payload: formData });

      //   };
      //   reader.readAsDataURL(file);
      // }
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };

    dispatch({ type: Types.ADD_NEW_DOC, payload: formData });
  };

export const GetPdfInput =
  (name, value, index, e, application_docs = undefined) =>
  (dispatch) => {
    // dispatch({ type: Types.GET_DOC_INPUT, payload: formData });
    if (application_docs !== undefined) {
      const formData = {
        name: name,
        value: value,
        index,
      };
      dispatch({ type: Types.ADD_NEW_DOC, payload: { name, value, index } });

      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };

    dispatch({ type: Types.ADD_NEW_DOC, payload: formData });
  };
export const GetDocInput2 =
  (name, value, index, e, application_docs = undefined) =>
  (dispatch) => {
    // dispatch({ type: Types.GET_DOC_INPUT, payload: formData });
    if (application_docs !== undefined) {
      const formData = {
        name: name,
        value: value,
        index,
      };
      dispatch({ type: Types.ADD_NEW_DOC, payload: { name, value, index } });
      let reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        formData.name = "document";

        formData.value = reader.result;
        dispatch({ type: Types.ADD_NEW_DOC, payload: formData });
      };

      reader.readAsDataURL(file);

      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };

    dispatch({ type: Types.ADD_NEW_DOC, payload: formData });
  };
export const GetDocInput3 =
  (name, value, index, e, application_docs = undefined) =>
  (dispatch) => {
    if (application_docs !== undefined) {
      const files = Array.from(e.target.files);
      const filePromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises)
        .then((fileDataUrls) => {
          const formData = {
            name: name,
            value: fileDataUrls,
            index,
          };
          dispatch({ type: Types.ADD_NEW_DOC, payload: formData });
        })
        .catch((error) => {
          console.error(error);
          dispatch({ type: Types.ADD_NEW_DOC, payload: null });
        });
    } else {
      const formData = {
        name: name,
        value: value,
        index,
      };

      dispatch({ type: Types.ADD_NEW_DOC, payload: formData });
    }
  };
// --// --------------delete------------
export const ApplicationOwnerDelete = (id, a_id) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/applications/application-business-owner/${id}/`;

  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        showToast("success", "Remove contact successfully");
        //   dispatch(GetAplicationDetails(a_id));
        dispatch({ type: Types.IS_APPLICATION_OWNER_DELETED, payload: true });
      }
    });
  } catch (error) {}
};
export const SetFalseObjectDelete = () => (dispatch) => {
  dispatch({ type: Types.IS_APPLICATION_OWNER_DELETED, payload: false });
};

// ===============================vat==============================
export const GetVatList = (name, company_house_no) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/check-vat-id/?legal_name=${name}&company_no=${company_house_no}`;
  dispatch({ type: Types.IS_LOAD_APP, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_VAT_LIST,
          payload: res.data.data,
        });
        console.log(res.data.data, "gfg");
        if (res.data.data) {
          dispatch(GetApplicationInput("tax_id", res.data.data.Number));
        }
        // else{
        //   dispatch(
        //     GetApplicationInput(
        //       "tax_id",
        //      ''
        //     )
        //   );
        // }

        dispatch({ type: Types.IS_LOAD_APP, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_APP, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_APP, payload: true });
};

// ================================submit bank---------------------------
export const SetsignStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_SIGINING_FALSE, payload: false });
};
export const sendForRequest = (name, value, e) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.SEND_SIGNING_REQUEST, payload: formData });
};

export const SubmitSiginingRequest = (data, id, email) => (dispatch) => {
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  data.application_id = parseInt(id);
  data.application_email = email;

  if (!regEmail.test(data.application_email)) {
    showToast("error", "Enter a vaild email for signing");
    return 0;
  }
  const formData = new FormData();
  formData.append("application_id", data.application_id);
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/application/applications/send_signing/`;
  dispatch({ type: Types.IS_LOAD_SIGN, payload: true });
  try {
    Axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        if (res.data.status) {
          // dispatch(UpdateApplicationInput(app_id, 'submit'));
          dispatch({ type: Types.AFTER_SUCCESS_SIGNING, payload: true });
          dispatch({ type: Types.IS_LOAD_SIGN, payload: false });
          console.log("res.data", res.data.data);
          dispatch({
            type: Types.GET_APPLICATION_INPUT,
            payload: { name: "pdf_url", value: res.data.data },
          });
          dispatch({
            type: Types.SEND_SIGNING_REQUEST,
            payload: { name: "pdf_url", value: res.data.data },
          });
          showToast("success", "Send for sigining successfully!");
          // swal(" Send for sigining successfully!", {
          //   icon: "success",
          // });
        } else {
          dispatch({ type: Types.IS_LOAD_SIGN, payload: false });
          showToast("error", res.message);
          // swal("error", {
          //   icon: "error",
          // });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_SIGN, payload: false });
        dispatch({ type: Types.AFTER_FAILED_SIGNING, payload: true });

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
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_SIGN, payload: false });
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_SIGN, payload: true });
};

export const SubmitBavkInfo = (api, bank) => (dispatch) => {
  const url = api;

  // dispatch({ type: Types.IS_LOAD_APP, payload: true });
  try {
    Axios.get(url)
      // Axios.post(url, data)
      .then(async (res) => {
        if (res.status) {
          console.log(res.data.data.data.Items, "bank");
          if (bank === "debit") {
            dispatch({
              type: Types.GET_DEBIT_BANK_DETAILS,
              payload: res.data.data.data.Items,
            });
            res.data.data.data.Items.map((item) => {
              if (
                item.StatusInformation.includes("OK") ||
                item.StatusInformation === "OK"
              ) {
                dispatch(
                  GetApplicationBankInput("debit_bank_name", item.Bank, 0)
                );
                showToast("succcess", "Bank information verified!");
              } else {
                Swal.fire({
                  title: "Error!",
                  text: item.StatusInformation,
                  icon: "error",
                });
                // dispatch(GetApplicationInput("bank_name", item.Bank))
              }
            });
          } else {
            dispatch({
              type: Types.GET_BANK_DETAILS,
              payload: res.data.data.data.Items,
            });
            res.data.data.data.Items.map((item) => {
              if (
                item.StatusInformation.includes("OK") ||
                item.StatusInformation === "OK"
              ) {
                dispatch(GetApplicationInput("bank_name", item.Bank));
                showToast("succcess", "Bank information verified!");
              } else {
                Swal.fire({
                  title: "Error!",
                  text: item.StatusInformation,
                  icon: "error",
                });
                // dispatch(GetApplicationInput("bank_name", item.Bank))
              }
            });
          }

          // showToast("succcess", "Bank information verified!");
        } else {
          // dispatch({ type: Types.IS_LOAD_APP, payload: false });
          // swal("error", {
          //   icon: "error",
          // });
        }
      })

      .catch((err) => {
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else {
          dispatch({ type: Types.AFTER_SUBMIT_BANK, payload: true });
          const erroeMsg = JSON.parse(err.request.response).message;

          // dispatch({ type: Types.IS_LOAD_APP, payload: false });
          Swal.fire({
            title: "Error!",
            text: erroeMsg,
            icon: "error",
          });
        }
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  // dispatch({ type: Types.IS_LOAD_APP, payload: true });
};

export const GetApplicationList = (api) => (dispatch) => {
  const url = api;

  dispatch({ type: Types.IS_LOAD_APP, payload: true });
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.GET_APPLICATION_LIST,
            payload: res.data,
          });
          console.log("res.data.data", res.data);
          dispatch({ type: Types.IS_LOAD_APP, payload: false });
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          showToast("error", "Server error");
        } else {
          const erroeMsg = JSON.parse(err.request.response).message;

          dispatch({ type: Types.IS_LOAD_APP, payload: false });
          Swal.fire({
            title: "Error!",
            text: erroeMsg,
            icon: "error",
          });
        }
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_APP, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_APP, payload: true });
};
