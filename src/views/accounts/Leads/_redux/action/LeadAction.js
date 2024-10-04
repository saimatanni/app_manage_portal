import * as Types from "../types/Types";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import {
  GetPricequoteInput,
  SetPricequoteUpdatedData,
} from "src/views/accounts/Pricequote/_redux/action/PriceQuoteAction";
import {
 
  GetApplicationInput,
} from "src/views/accounts/NewApplication/_redux/action/ApplicationAction";

export const GetCountryList = (api) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/country/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_COUNTRY_LIST,
          payload: res.data.data,
        });

        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const GetUserList = (api) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/`;
  // const url = api;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_USER_LIST,

          payload: res.data.data,
        });

        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const GetLeadsnput = (name, value, e) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_LEADS_INPUT, payload: formData });
};
export const GetLegalInput = (name, value, e) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_LEGAL_INPUT, payload: formData });
};
export const SubmitLeadsInput = (data, toPdf) => (dispatch) => {
  console.log(data.lead_products, "pro");
  // delete data.lead_type;
  const userData = JSON.parse(Cookies.get("userData"));
  data.sales_partner = userData.id;
  data.partner_manager = userData.partner_manager;
  data.user = userData.id;
  data.lead_source = 1;
  for (const product of data.lead_products) {
    if (!product.lead_id) delete product.lead_id;
    if (!product.terminal_provider) delete product.terminal_provider;
    if (!product.price) delete product.price;
    if (!product.getway_provider) delete product.getway_provider;
    if (!product.epos_provider) delete product.epos_provider;
    if (!product.provider) delete product.provider;
  }
  console.log(
    "partner_manager",
    data.partner_manager,
    userData.partner_manager
  );
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.post(url, data)
      .then((res) => {
        if (res.data.status) {
          showToast("success", "Leads create successfully");

          dispatch({ type: Types.AFTER_SUCCESS_LEADS, payload: true });
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        const erroeMsg = JSON.parse(err?.request?.response)?.errors;

        const errorList = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        errorList.map((item, index) => showToast("error", item));
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      });
  } catch (error) {
    showToast("error", "Something went wrong");
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const ExportLeadsInput = (data, toPdf) => (dispatch) => {
  const userData = JSON.parse(Cookies.get("userData"));
  data.sales_partner = userData.id;
  data.partner_manager = userData.partner_manager;
  data.lead_source = 1;
  data.user = userData.id;
  if (data.terminal_provider_pervious === 0) {
    data.terminal_provider_pervious = "";
  }
  if (data.terminal_provider_current === 0) {
    data.terminal_provider_current = "";
  }
  for (const product of data.lead_products) {
    if (!product.lead_id) delete product.lead_id;
    if (!product.terminal_provider) delete product.terminal_provider;
    if (!product.price) delete product.price;
    if (!product.getway_provider) delete product.getway_provider;
    if (!product.epos_provider) delete product.epos_provider;
    if (!product.provider) delete product.provider;
  }
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.post(url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.GET_LEADS_INPUT,
            payload: { name: "client_id", value: res.data.data.client_id },
          });
          showToast("success", "Leads create successfully");

          dispatch({ type: Types.AFTER_SUCCESS_LEADS, payload: true });
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
          toPdf();
        } else {
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
          showToast("error", res.data.errors.date);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
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
    showToast("error", "Something went wrong");
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const UpdateLeads = (data) => (dispatch) => {
  const userData = JSON.parse(Cookies.get("userData"));
  data.sales_partner = userData.id;
  data.partner_manager = userData.partner_manager;
  data.user = userData.id;
  console.log(
    "partner_manager",
    data.partner_manager,
    userData.partner_manager
  );
  delete data.ecommerce_products;
  delete data.terminal_products;
  delete data.epos_products;
  for (const product of data.lead_products) {
    if (
      data.card_machine_service === false &&
      data.epos_service === false &&
      data.ecom_service === false
    ) {
      product.is_deleted = true;
    }
  }
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // var validation = false;

  // if (validation) {
  //   return 0;
  // }

  const formData = new FormData();
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${data.slug}/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.AFTER_SUCCESS_LEADS, payload: true });

          showToast("success", "Leads Update successfully");
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });

        const erroeMsg = JSON.parse(err.request.response).errors;
        const errorList = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        errorList.map((item, index) => showToast("error", item));
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const LeadUpdatedData = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${id}/`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.SET_LEADS_UPDATED,
          payload: res.data.data,
        });
        if (
          res.data.data.legal_type !== "L" &&
          res.data.data.legal_type !== "ST"
        ) {
          dispatch(GetLeadsnput("business_type", "OT"));
        }
        if (res.data.data.mobile.length < 11) {
          dispatch(GetLeadsnput("mobile", "0" + res.data.data.mobile));
        }
        if (res.data.data.telephone && res.data.data.telephone?.length < 11) {
          dispatch(GetLeadsnput("telephone", "0" + res.data.data.telephone));
        }

        dispatch(
          GetLeadsnput(
            "terminal_products",
            res.data.data?.lead_products?.filter(
              (item) => item?.product_type === "card_terminal"
            )
          )
        );
        dispatch(
          GetLeadsnput(
            "ecommerce_products",
            res.data.data?.lead_products?.filter(
              (item) =>
                item?.product_type === "ecom" ||
                item?.product_type === "VT" ||
                item?.product_type === "pay_by_link" ||
                item?.product_type === "ecom_VT"
            )
          )
        );
        dispatch(
          GetLeadsnput(
            "epos_products",
            res.data.data?.lead_products?.filter(
              (item) => item?.product_type === "epos"
            )
          )
        );
      }
    });
  } catch (error) {}
};

export const GetCompanyHouseDetails = (legal_name) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${legal_name}/legal-name-by-number/`;
  console.log(legal_name);
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_COMPANY_HOUSE_LIST,
          payload: res.data.data.items,
        });

        res.data.data.items.map((house) => {
          if (house.company_number === legal_name) {
            // if (house.title === legal_name) {
            dispatch({
              type: Types.GET_COMPANY_HOUSE_DETAILS,
              payload: house,
            });
            var firstPart;
            var secondPart;
            var lastSpaceIndex;
            const add_details = house?.address;

            const full_add =
              add_details?.premises +
              "  " +
              (add_details?.address_line_1 ? add_details?.address_line_1 : "") +
              " " +
              (add_details?.address_line_2 ? add_details?.address_line_2 : "");

            if (full_add.length > 40) {
              firstPart = full_add.substring(0, 40);
              lastSpaceIndex = firstPart.lastIndexOf(" ");

              if (lastSpaceIndex !== -1) {
                secondPart = full_add.substring(lastSpaceIndex + 1);
                firstPart = full_add.substring(0, lastSpaceIndex);
              } else {
                secondPart = full_add.substring(40);
                firstPart = full_add.substring(0, 40);
              }
            }
            function calculateEndDate() {
              if (house?.date_of_creation) {
                const endDate = new Date(house?.date_of_creation);
                endDate.setDate(endDate.getDate() + 7);
                const formattedEndDate = endDate.toISOString().split("T")[0];
                return formattedEndDate;
              }
              return null;
            }
            const [year, month, day] = house?.date_of_creation.split("-");
            const newStartDate = new Date(year, month - 1, day);

            dispatch(GetLeadsnput("company_house_no", house?.company_number));
            dispatch(GetLeadsnput("full_add", house?.address_snippet));
            dispatch(GetLeadsnput("incorporated_on", house?.date_of_creation));
            dispatch(
              GetLeadsnput("current_ownership_since", house?.date_of_creation)
            );
            // legal address
            dispatch(
              GetLeadsnput("legal_postcode", house?.address?.postal_code)
            );

            if (firstPart) {
              dispatch(GetLeadsnput("legal_address1", firstPart.toUpperCase()));
            } else {
              dispatch(GetLeadsnput("legal_address1", full_add.toUpperCase()));
            }
            if (secondPart !== undefined) {
              dispatch(
                GetLeadsnput("legal_address2", secondPart.toUpperCase())
              );
            } else {
              dispatch(GetLeadsnput("legal_address2", ""));
            }
            dispatch(
              GetLeadsnput("legal_city", house?.address?.locality.toUpperCase())
            );
            dispatch(GetLeadsnput("legal_county", house?.address?.region));
            // home address
            dispatch(
              GetLeadsnput("home_postcode", house?.address?.postal_code)
            );

            if (firstPart) {
              dispatch(GetLeadsnput("home_address1", firstPart.toUpperCase()));
            } else {
              dispatch(GetLeadsnput("home_address1", full_add.toUpperCase()));
            }
            if (secondPart !== undefined) {
              dispatch(GetLeadsnput("home_address2", secondPart.toUpperCase()));
            } else {
              dispatch(GetLeadsnput("home_address2", ""));
            }
            dispatch(
              GetLeadsnput("home_city", house?.address?.locality.toUpperCase())
            );
            dispatch(GetLeadsnput("home_county", house?.address?.region));
            // =price quote----------
            dispatch(
              GetPricequoteInput("company_house_no", house?.company_number)
            );
            dispatch(
              GetPricequoteInput("incorporated_on", house?.date_of_creation)
            );
            dispatch(
              GetPricequoteInput(
                "current_ownership_since",
                house?.date_of_creation
              )
            );
            dispatch(
              GetPricequoteInput("legal_postcode", house?.address?.postal_code)
            );
            if (secondPart !== undefined) {
              dispatch(GetPricequoteInput("legal_address2", secondPart));
            } else {
              dispatch(GetPricequoteInput("legal_address2", ""));
            }
            if (firstPart) {
              dispatch(
                GetPricequoteInput("legal_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetPricequoteInput("legal_address1", full_add.toUpperCase())
              );
            }
            dispatch(
              GetPricequoteInput(
                "legal_city",
                house?.address?.locality.toUpperCase()
              )
            );
            dispatch(
              GetPricequoteInput("legal_county", house?.address?.region)
            );
            //  =Application----------
            dispatch(
              GetApplicationInput("company_house_no", house?.company_number)
            );
            dispatch(
              GetApplicationInput("incorporated_on", house?.date_of_creation)
            );
            dispatch(
              GetApplicationInput(
                "current_ownership_since",
                house?.date_of_creation
              )
            );
            dispatch(
              GetApplicationInput("legal_postcode", house?.address?.postal_code)
            );
            // dispatch(
            //   GetApplicationInput(
            //     "legal_address1",
            //     house?.address?.premises + " " + house?.address?.address_line_1
            //     // house?.address?.premises.concat(house?.address?.address_line_1)
            //   )
            // );
            if (firstPart) {
              dispatch(
                GetApplicationInput("legal_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetApplicationInput(
                  "legal_address1",
                  full_add
                  // add_details?.premises + " " + add_details?.address_line_1
                )
              );
            }
            if (secondPart !== undefined) {
              dispatch(
                GetApplicationInput("legal_address2", secondPart.toUpperCase())
              );
            } else {
              dispatch(GetApplicationInput("legal_address2", ""));
            }
            dispatch(
              GetApplicationInput(
                "legal_city",
                house?.address?.locality.toUpperCase()
              )
            );
            dispatch(
              GetApplicationInput("legal_county", house?.address?.region)
            );
          }
        });

        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
};

export const GetCompanyOfficersDetails =
  (company_house_no, contact1 = "business_owner_contacts") =>
  (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${company_house_no}/officers-by-company-number/`;
    try {
      Axios.get(url).then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.GET_COMPANY_OFFICERS_DETAILS,
            payload: res.data.data.items,
          });

          const officeDetails = res.data.data.items;
          const contact = undefined;
          officeDetails.map((item, index) => {
            if (!item.resigned_on) {
              console.log(item, "item");
              const name = item.name.split(", ");
              const first_name = name[1].trim().split(" ");
              const full_Name = [first_name[0], ...first_name.slice(1)].join(
                " "
              );
              const last_Name = name[0];
              // Ensure lastName and fullName are 20 characters or less
              const truncatedLastName = last_Name
                .substring(0, 20)
                .toUpperCase();
              const truncatedFullName = full_Name
                .substring(0, 20)
                .toUpperCase();

              // ------------leads----------------------
              dispatch(GetLeadsnput("last_Name", truncatedLastName));
              dispatch(GetLeadsnput("first_name", truncatedFullName));
              dispatch(
                GetApplicationInput(
                  "owner_surname",
                  truncatedLastName,
                  index,
                  "business_owners",
                  contact
                )
              );
              dispatch(
                GetApplicationInput(
                  "owner_second_name",
                  truncatedLastName,
                  index,
                  "business_owners",
                  contact
                )
              );
              dispatch(
                GetApplicationInput(
                  "owner_first_name",
                  truncatedFullName,
                  index,
                  "business_owners",
                  contact
                )
              );
              dispatch(
                GetApplicationInput(
                  "is_deleted",
                  false,
                  index,
                  "business_owners",
                  contact
                )
              );
              //address
              let firstPart = "";
              let secondPart = "";
              let add2 = "";
              var lastSpaceIndex;
              if (item.address?.address_line_2) {
                add2 = item.address?.address_line_2;
              } else {
                add2 = "";
              }
              const full_add =
                item?.address?.premises +
                " " +
                item?.address?.address_line_1 +
                " " +
                add2 +
                " ";

              if (full_add.length > 40) {
                firstPart = full_add.substring(0, 40);
                lastSpaceIndex = firstPart.lastIndexOf(" ");

                if (lastSpaceIndex !== -1) {
                  secondPart = full_add.substring(lastSpaceIndex + 1);
                  firstPart = full_add.substring(0, lastSpaceIndex);
                } else {
                  secondPart = full_add.substring(40);
                  firstPart = full_add.substring(0, 40);
                }
              }
              console.log(
                "add",
                full_add,
                full_add.length,
                firstPart,
                secondPart
              );
              dispatch(
                GetApplicationInput(
                  "zip_code",
                  item.address.postal_code,
                  index,
                  "business_owners",
                  contact1
                )
              );

              if (firstPart) {
                dispatch(
                  GetApplicationInput(
                    "street_line_1",
                    firstPart,
                    index,
                    "business_owners",
                    contact1
                  )
                );
              } else {
                dispatch(
                  GetApplicationInput(
                    "street_line_1",
                    full_add,
                    index,
                    "business_owners",
                    contact1
                  )
                );
              }
              if (secondPart) {
                dispatch(
                  GetApplicationInput(
                    "locality",
                    secondPart,
                    index,
                    "business_owners",
                    contact1
                  )
                );
              } else {
                dispatch(
                  GetApplicationInput(
                    "locality",
                    "",
                    index,
                    "business_owners",
                    contact1
                  )
                );
              }
              dispatch(
                GetApplicationInput(
                  "city",
                  item.address?.locality,
                  index,
                  "business_owners",
                  contact1
                )
              );
              dispatch(
                GetApplicationInput(
                  "county_code",
                  item.address?.region,
                  index,
                  "business_owners",
                  contact1
                )
              );
              dispatch(
                GetApplicationInput(
                  "country_code",
                  74,
                  index,
                  "business_owners",
                  contact1
                )
              );
            }
          });
          // ---------lead -address----------

          const nameParts = res.data.data.items[0]?.name.split(", ");
          const firstNameParts = nameParts[1].trim().split(" ");
          const fullName = [firstNameParts[0], ...firstNameParts.slice(1)].join(
            " "
          );
          const lastName = nameParts[0];
          // Ensure lastName and fullName are 20 characters or less
          const truncatedLastName = lastName.substring(0, 20).toUpperCase();
          const truncatedFullName = fullName.substring(0, 20).toUpperCase();

          // ------------leads----------------------
          dispatch(GetLeadsnput("last_name", truncatedLastName));
          dispatch(GetLeadsnput("first_name", truncatedFullName));
          // ------------leads----------------------

          dispatch(GetPricequoteInput("last_name", truncatedLastName));
          dispatch(GetPricequoteInput("first_name", truncatedFullName));

          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        }
      });
    } catch (error) {
      dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
    }
  };
export const GetPostCodeList2 = (postCode, text, des) => (dispatch) => {
  let text_des = text + " " + des;

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${text_des}/address-by-postcode/`;

  try {
    Axios.get(url, {
      params: {
        // add the parameters here
        container: postCode,
      },
    }).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_POST_CODE_LIST,
          payload: res.data.data.Items,
        });

        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
};
export const GetPostCodeList = (postCode, text, des) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${postCode}/address-by-postcode/`;
  // const url = `${process.env.REACT_APP_BASE_URL}api/v1/leads/utility/${company_house_no}/legal-name-by-number/`;

  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_POST_CODE_LIST,
          payload: res.data.data.Items,
        });

        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
};
export const GetPostcodeDetails =
  (
    post_code_id,
    name,
    index,
    contact1 = "business_owner_contacts",
    contact = "quote_owner_contacts"
  ) =>
  (dispatch) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${post_code_id}/address-details/`;

    try {
      Axios.get(url).then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.GET_POST_CODE_ADDRESS,
            payload: res.data.data,
          });

         
          let firstPart = "";
          let secondPart = "";
          var lastSpaceIndex;
          const add_details = res.data.data;
          const full_add =
            add_details?.Line1 +
            " " +
            add_details?.Line2 +
            " " +
            add_details?.Line3 +
            " " +
            add_details?.Line4 +
            " " +
            add_details?.Line5;

         
          if (full_add.length > 40) {
            firstPart = full_add.substring(0, 40);
            lastSpaceIndex = firstPart.lastIndexOf(" ");

            if (lastSpaceIndex !== -1) {
              secondPart = full_add.substring(lastSpaceIndex + 1);
              firstPart = full_add.substring(0, lastSpaceIndex);
            } else {
              secondPart = full_add.substring(40);
              firstPart = full_add.substring(0, 40);
            }
          }
          console.log("firstPart", full_add.length, firstPart, secondPart);
          
          // -------------------lead-------------------
          if (name === "lead_legal_postcode") {
            dispatch(
              GetLeadsnput(
                "legal_postcode",
                res.data.data.PostalCode.toUpperCase()
              )
            );
            // dispatch(GetLeadsnput("legal_country", res.data.data.CountryName));
            dispatch(
              GetLeadsnput("legal_city", res.data.data.City.toUpperCase())
            );
            if (firstPart) {
              dispatch(GetLeadsnput("legal_address1", firstPart.toUpperCase()));
            } else {
              dispatch(GetLeadsnput("legal_address1", full_add.toUpperCase()));
            }
            if (secondPart) {
              dispatch(
                GetLeadsnput("legal_address2", secondPart.toUpperCase())
              );
            }
            //  else {
            //   dispatch(GetLeadsnput("legal_address2", add_details.Line3));
            // }
          } else if (name === "lead_trading_postcode") {
            dispatch(
              GetLeadsnput(
                "trading_postcode",
                res.data.data.PostalCode.toUpperCase()
              )
            );
            // dispatch(
            //   GetLeadsnput("trading_country", res.data.data.CountryName)
            // );
            dispatch(
              GetLeadsnput("trading_city", res.data.data.City.toUpperCase())
            );
            if (firstPart) {
              dispatch(
                GetLeadsnput("trading_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetLeadsnput("trading_address1", full_add.toUpperCase())
              );
            }
            if (secondPart) {
              dispatch(
                GetLeadsnput("trading_address2", secondPart.toUpperCase())
              );
            }
          }

          // -------------------quote-------------------
          else if (name === "quote_legal_postcode") {
            dispatch(
              GetPricequoteInput(
                "legal_postcode",
                res.data.data.PostalCode.toUpperCase()
              )
            );
            dispatch(
              GetPricequoteInput("legal_city", res.data.data.City.toUpperCase())
            );
            if (firstPart) {
              dispatch(
                GetPricequoteInput("legal_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetPricequoteInput("legal_address1", full_add.toUpperCase())
              );
            }
            if (secondPart) {
              dispatch(
                GetPricequoteInput("legal_address2", secondPart.toUpperCase())
              );
            }
          } else if (name === "quote_trading_postcode") {
            dispatch(
              GetPricequoteInput(
                "trading_postcode",
                res.data.data.PostalCode.toUpperCase()
              )
            );
            dispatch(
              GetPricequoteInput(
                "trading_city",
                res.data.data.City.toUpperCase()
              )
            );
            if (firstPart) {
              dispatch(
                GetPricequoteInput("trading_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetPricequoteInput("trading_address1", full_add.toUpperCase())
              );
            }
            if (secondPart) {
              dispatch(
                GetPricequoteInput("trading_address2", secondPart.toUpperCase())
              );
            }
          }

          // ==application==
          else if (name === "application_legal_postcode") {
            dispatch(
              GetApplicationInput(
                "legal_postcode",
                res.data.data.PostalCode.toUpperCase()
              )
            );
            dispatch(
              GetApplicationInput(
                "legal_city",
                res.data.data.City.toUpperCase()
              )
            );
            if (firstPart) {
              dispatch(
                GetApplicationInput("legal_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetApplicationInput("legal_address1", full_add.toUpperCase())
              );
            }
            if (secondPart) {
              dispatch(
                GetApplicationInput("legal_address2", secondPart.toUpperCase())
              );
            }
          } else if (name === "application_trading_postcode") {
            dispatch(
              GetApplicationInput(
                "trading_postcode",
                res.data.data.PostalCode.toUpperCase()
              )
            );
            dispatch(
              GetApplicationInput(
                "trading_city",
                res.data.data.City.toUpperCase()
              )
            );
            if (firstPart) {
              dispatch(
                GetApplicationInput("trading_address1", firstPart.toUpperCase())
              );
            } else {
              dispatch(
                GetApplicationInput("trading_address1", full_add.toUpperCase())
              );
            }
            if (secondPart) {
              dispatch(
                GetApplicationInput(
                  "trading_address2",
                  secondPart.toUpperCase()
                )
              );
            }
          }
          // =================owner==============
          else if (name === "app_owner_postcode") {
            dispatch(
              GetApplicationInput(
                "zip_code",
                res.data.data.PostalCode.toUpperCase(),
                index,
                "business_owners",
                contact1
              )
            );
            if (firstPart) {
              dispatch(
                GetApplicationInput(
                  "street_line_1",
                  firstPart.toUpperCase(),
                  index,
                  "business_owners",
                  contact1
                )
              );
            } else {
              dispatch(
                GetApplicationInput(
                  "street_line_1",
                  full_add.toUpperCase(),
                  index,
                  "business_owners",
                  contact1
                )
              );
            }
            if (secondPart) {
              dispatch(
                GetApplicationInput(
                  "locality",
                  secondPart.toUpperCase(),
                  index,
                  "business_owners",
                  contact1
                )
              );
            }

            dispatch(
              GetApplicationInput(
                "city",
                res.data.data.City.toUpperCase(),
                index,
                "business_owners",
                contact1
              )
            );
          } else if (name === "quote_owner_postcode") {
            dispatch(
              GetPricequoteInput(
                "zip_code",
                res.data.data.PostalCode.toUpperCase(),
                index,
                "business_owners",
                contact
              )
            );
            if (firstPart) {
              dispatch(
                GetPricequoteInput(
                  "street_line_1",
                  firstPart.toUpperCase(),
                  index,
                  "business_owners",
                  contact
                )
              );
            } else {
              dispatch(
                GetPricequoteInput(
                  "street_line_1",
                  full_add.toUpperCase(),
                  index,
                  "business_owners",
                  contact
                )
              );
            }
            if (secondPart) {
              dispatch(
                GetPricequoteInput(
                  "locality",
                  secondPart.toUpperCase(),
                  index,
                  "business_owners",
                  contact
                )
              );
            }
            // else {
            //   dispatch(
            //     GetPricequoteInput(
            //       "locality",
            //       res.data.data.Line2,
            //       index,
            //       "business_owners",
            //       contact
            //     )
            //   );
            // }
            dispatch(
              GetPricequoteInput(
                "city",
                res.data.data.City.toUpperCase(),
                index,
                "business_owners",
                contact
              )
            );
          }
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        }
      });
    } catch (error) {
      dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
    }
  };

export const SetLeadsStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_FALSE, payload: false });
};
export const SetLeadsQualifyStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_FALSE_UPDATE_LEADS, payload: false });
};
export const SetafterQualifyStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.LEAD_QUALIFY_CHECK_FALSE, payload: false });
};

export const SetLeadsTypeStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_TYPE_FALSE, payload: false });
};

export const GetIndustryList = (api) => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/industry_type/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_INDUSTRY_LIST,
          payload: res.data.data,
        });

        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
      }
      //   if (!res.ok) {
      //     if ([401, 403].includes(res.status) && auth?.token) {
      //         // auto logout if 401 Unauthorized or 403 Forbidden res returned from api
      //         localStorage.removeItem('accessToken');
      //         // setAuth(null);
      //         history.push('/');
      //     }

      //     const error = (data && data.message) || res.statusText;
      //     // alertActions.error(error);
      //     return Promise.reject(error);
      // }
      else {
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};

export const GetTerminalProductInput =
  (name, value, index, terminal_products = undefined) =>
  (dispatch) => {
    if (terminal_products !== undefined) {
      dispatch({
        type: Types.GET_CARD_TERMINAL_PRODUCT,
        payload: { name, value, index },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };
    dispatch({ type: Types.GET_CARD_TERMINAL_PRODUCT, payload: formData });
  };
export const GetEcommerceProductInput =
  (name, value, index, ecommerce_products = undefined) =>
  (dispatch) => {
    if (ecommerce_products !== undefined) {
      dispatch({
        type: Types.GET_ECOMMERCE_PRODUCT,
        payload: { name, value, index },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };
    dispatch({ type: Types.GET_ECOMMERCE_PRODUCT, payload: formData });
  };
export const GetEposProductInput =
  (name, value, index, epos_products = undefined) =>
  (dispatch) => {
    if (epos_products !== undefined) {
      dispatch({
        type: Types.GET_EPOS_PRODUCT,
        payload: { name, value, index },
      });
      return;
    }
    const formData = {
      name: name,
      value: value,
      index,
    };
    dispatch({ type: Types.GET_EPOS_PRODUCT, payload: formData });
  };

// ---------------------convert quote-------------
export const UpdateConvertPriceQuote = (data, toPdf) => (dispatch) => {
  delete data?.ecommerce_products;
  delete data?.terminal_products;
  delete data?.epos_products;

  
  const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbe
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var validation = false;
  for (const product of data.lead_products) {
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
      // if (data.epos_service === true && product.product_type ==="epos" && (product?.one_of_cost === null || product?.one_of_cost === "" )) {
      //   showToast("error", "One of cost shouldn't be empty");
      //   validation = true;
      // }
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
  if (data.legal_type === "" || data?.legal_type === null) {
    showToast("error", "Legal type shouldn't be empty");
    validation = true;
  }
  if (data.legal_name === "" || data?.legal_name === null) {
    showToast("error", "Legal name shouldn't be empty");
    validation = true;
  }

  if (data?.trading_name?.includes("'")) {
    showToast("error", "Trading name including ' is not allowed");
    validation = true;
  }
  
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
  // if (!data.email) {
  //   showToast("error", "Primary email  shouldn't be empty");
  //   validation = true;
  // }

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

  if (!data.visa_debit_cr) {
    showToast("error", "Visa debit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_debit_cr) < 0) {
    showToast("error", "Visa debit current rate shouldn't be negative !");
    validation = true;
  }
  if (data.visa_debit_pr === null) {
    showToast("error", "Visa debit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_debit_pr) < 0) {
    showToast("error", "Visa debit paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.visa_debit_ts === null) {
    showToast("error", "Visa debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_debit_ts) < 0) {
    showToast("error", "Visa debit total sale shouldn't be negative !");
    validation = true;
  }
  if (!data.mastercard_debit_cr) {
    showToast("error", "Mastercard debit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_debit_cr) < 0) {
    showToast("error", "Mastercard debit current rate shouldn't be negative !");
    validation = true;
  }
  if (!data.mastercard_debit_pr) {
    showToast(
      "error",
      "Mastercard debit paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.mastercard_debit_pr) < 0) {
    showToast(
      "error",
      "Mastercard debit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_debit_ts === null) {
    showToast("error", "Mastercard debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_debit_ts) < 0) {
    showToast("error", "Mastercard debit total sale shouldn't be negative !");
    validation = true;
  }
  if (!data.visa_credit_cr) {
    showToast("error", "Visa credit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_credit_cr) < 0) {
    showToast("error", "Visa credit current rate shouldn't be negative !");
    validation = true;
  }
  if (!data.visa_credit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_credit_pr) < 0) {
    showToast("error", "Visa credit paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.visa_credit_ts === null) {
    showToast("error", "Visa credit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_credit_ts) < 0) {
    showToast("error", "Visa credit total sale shouldn't be negative !");
    validation = true;
  }
  if (!data.visa_business_debit_cr) {
    showToast("error", "Visa business debit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_debit_cr) < 0) {
    showToast(
      "error",
      "Visa business debit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.visa_business_debit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_debit_pr) < 0) {
    showToast(
      "error",
      "Visa business debit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.visa_business_debit_ts === null) {
    showToast("error", "Visa business debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_debit_ts) < 0) {
    showToast(
      "error",
      "Visa business debit total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.visa_business_credit_cr) {
    showToast(
      "error",
      "Visa business credit current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.visa_business_credit_cr) < 0) {
    showToast(
      "error",
      "Visa business credit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.visa_business_credit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_credit_pr) < 0) {
    showToast(
      "error",
      "Visa business credit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.visa_business_credit_ts === null) {
    showToast("error", "Visa business debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_credit_ts) < 0) {
    showToast(
      "error",
      "Visa business credit total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_acceptance_fee_cr === null) {
    showToast("error", "Card acceptence fee current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.card_acceptance_fee_cr) < 0) {
    showToast(
      "error",
      "Card acceptence fee current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_acceptance_fee_pr === null) {
    showToast(
      "error",
      "Card acceptence fee paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.card_acceptance_fee_pr) < 0) {
    showToast(
      "error",
      "Card acceptence fee paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_acceptance_fee_ts === null) {
    showToast("error", "Card acceptence total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.card_acceptance_fee_ts) < 0) {
    showToast(
      "error",
      "Card acceptence fee total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.card_transaction_fee_cr) {
    showToast(
      "error",
      "Card transection fee current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.card_transaction_fee_cr) < 0) {
    showToast(
      "error",
      "Card transection fee current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_transaction_fee_pr === null) {
    showToast(
      "error",
      "Card transection fee paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.card_transaction_fee_pr) < 0) {
    showToast(
      "error",
      "Card transection fee paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_transaction_fee_ts === null) {
    showToast("error", "Card transection total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.card_transaction_fee_ts) < 0) {
    showToast(
      "error",
      "Card transection fee total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.authorization_fee_cr) {
    showToast("error", "Authorization fee current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.authorization_fee_cr) < 0) {
    showToast(
      "error",
      "Authorization fee current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.authorization_fee_pr) {
    showToast(
      "error",
      "Authorization fee paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.authorization_fee_pr) < 0) {
    showToast(
      "error",
      "Authorization fee paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.authorization_fee_tr_no === null) {
    showToast(
      "error",
      "Authorization fee number of transection  shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.authorization_fee_tr_no) < 0) {
    showToast(
      "error",
      "Authorization fee  number of transection  shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_credit_cr === null) {
    showToast("error", "Mastercard credit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_credit_cr) < 0) {
    showToast(
      "error",
      "Mastercard credit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_credit_pr === null) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_credit_pr) < 0) {
    showToast(
      "error",
      "Mastercard credit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_credit_ts === null) {
    showToast("error", "Mastercard credit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_credit_ts) < 0) {
    showToast("error", "Mastercard credit total sale shouldn't be negative !");
    validation = true;
  }
  //new validation add
  if (
    data.mastercard_business_cr === null ||
    data.mastercard_business_cr === ""
  ) {
    showToast("error", "Mastercard business current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_business_cr) < 0) {
    showToast(
      "error",
      "Mastercard business current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_business_pr === null) {
    showToast("error", "Visa business paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_business_pr) < 0) {
    showToast(
      "error",
      "Mastercard business paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_business_ts === null) {
    showToast("error", "Mastercard business total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_business_ts) < 0) {
    showToast(
      "error",
      "Mastercard business total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_corporate_cr === null) {
    showToast(
      "error",
      "Mastercard_corporate current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.mastercard_corporate_cr) < 0) {
    showToast(
      "error",
      "Mastercard_corporate current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_corporate_pr === null) {
    showToast(
      "error",
      "Mastercard_corporate paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.mastercard_corporate_pr) < 0) {
    showToast(
      "error",
      "Mastercard_corporate paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_corporate_ts === null) {
    showToast("error", "Mastercard_corporate total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_corporate_ts) < 0) {
    showToast(
      "error",
      "Mastercard_corporate total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_visa_fee_cr === null) {
    showToast("error", "All_non_eea_visa current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.all_non_eea_visa_fee_cr) < 0) {
    showToast("error", "All_non_eea_visa current rate shouldn't be negative !");
    validation = true;
  }
  if (data.all_non_eea_visa_fee_pr === null) {
    showToast(
      "error",
      "All_non_eea_visa paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_visa_fee_pr) < 0) {
    showToast(
      "error",
      "All_non_eea_visa paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_visa_fee_ts === null) {
    showToast("error", "All_non_eea_visa total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.all_non_eea_visa_fee_ts) < 0) {
    showToast("error", "All_non_eea_visa total sale shouldn't be negative !");
    validation = true;
  }
  if (data.all_non_eea_mastercard_fee_cr === null) {
    showToast(
      "error",
      "all_non_eea_mastercard current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_mastercard_fee_cr) < 0) {
    showToast(
      "error",
      "All_non_eea_mastercard current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_mastercard_fee_pr === null) {
    showToast(
      "error",
      "All_non_eea_mastercard paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_mastercard_fee_pr) < 0) {
    showToast(
      "error",
      "All_non_eea_mastercard paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_mastercard_fee_ts === null) {
    showToast(
      "error",
      "All_non_eea_mastercard total sale shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_mastercard_fee_ts) < 0) {
    showToast(
      "error",
      "All_non_eea_mastercard total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (data.amex_cr === null) {
    showToast("error", "Amex current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.amex_cr) < 0) {
    showToast("error", "Amex current rate shouldn't be negative !");
    validation = true;
  }
  if (data.amex_sr === null) {
    showToast("error", "Amex paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.amex_sr) < 0) {
    showToast("error", "Amex paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.amex_ts === null) {
    showToast("error", "Amex total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.amex_ts) < 0) {
    showToast("error", "Amex total sale shouldn't be negative !");
    validation = true;
  }
  if (data.per_transactional_charge_cr === null) {
    showToast("error", "Per_transactional current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.per_transactional_charge_cr) < 0) {
    showToast(
      "error",
      "Per_transactional current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.per_transactional_charge_pr === null) {
    showToast(
      "error",
      "Per_transactional paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.per_transactional_charge_pr) < 0) {
    showToast(
      "error",
      "Per_transactional paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.per_transactional_charge_tr_no === null) {
    showToast("error", "Per_transactional total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.per_transactional_charge_tr_no) < 0) {
    showToast("error", "Per_transactional total sale shouldn't be negative !");
    validation = true;
  }
  if (data.portal_reporting_fee_cr === null) {
    showToast("error", "Portal reporting current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.portal_reporting_fee_cr) < 0) {
    showToast("error", "Portal reporting current rate shouldn't be negative !");
    validation = true;
  }
  if (data.portal_reporting_fee_pr === null) {
    showToast(
      "error",
      "Portal reporting paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.portal_reporting_fee_pr) < 0) {
    showToast(
      "error",
      "Portal reporting paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.portal_reporting_fee_ts === null) {
    showToast("error", "Portal reporting total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.portal_reporting_fee_ts) < 0) {
    showToast("error", "Portal reporting total sale shouldn't be negative !");
    validation = true;
  }
  if (data.pci_dss_fee_cr === null) {
    showToast("error", "Pci dss current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.pci_dss_fee_cr) < 0) {
    showToast("error", "Pci dss current rate shouldn't be negative !");
    validation = true;
  }
  if (data.pci_dss_fee_pr === null) {
    showToast("error", "Pci dss paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.pci_dss_fee_pr) < 0) {
    showToast("error", "Pci dss paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.pci_dss_fee_ts === null) {
    showToast("error", "Pci dss total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.pci_dss_fee_ts) < 0) {
    showToast("error", "Pci dss total sale shouldn't be negative !");
    validation = true;
  }
  if (data.terminal_rental_fee_cr === null) {
    showToast("error", "Terminal rental current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.terminal_rental_fee_cr) < 0) {
    showToast("error", "Terminal rental current rate shouldn't be negative !");
    validation = true;
  }
  if (data.terminal_rental_fee_pr === null) {
    showToast("error", "Terminal rental paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.terminal_rental_fee_pr) < 0) {
    showToast(
      "error",
      "Terminal rental paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.num_of_terminals === null) {
    showToast("error", "Number of terminal shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.num_of_terminals) < 0) {
    showToast("error", "Number of terminal shouldn't be negative !");
    validation = true;
  }
  // delete data.slug
  if (validation) {
    return 0;
  }

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${data.slug}/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          
          dispatch(QualifyLeadList(res.data.data.slug));
          dispatch({ type: Types.AFTER_SUCCESS_QUALIFY, payload: true });
          // localStorage.setItem("leadId", res.data.data.id);
          dispatch({
            type: Types.GET_LEGAL_INPUT,
            payload: { name: "lead_qualify_id", value: res.data.data.id },
          });

          // dispatch(GetLeadtList());
        } else {
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
          showToast("error", res.data.errors.date);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        const erroeMsg = JSON.parse(err.request.response).errors;
        const errorList = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        errorList.map((item, index) => showToast("error", item));
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const GenerateQuote = (data, toPdf) => (dispatch) => {
  delete data?.ecommerce_products;
  delete data?.terminal_products;
  delete data?.epos_products;

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // var regex = new RegExp(expression);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var validation = false;

  if (data.visa_debit_cr === null || data.visa_debit_cr === "") {
    showToast("error", "Visa debit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_debit_cr) < 0) {
    showToast("error", "Visa debit current rate shouldn't be negative !");
    validation = true;
  }
  if (data.visa_debit_pr === null || data.visa_debit_pr === "") {
    showToast("error", "Visa debit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_debit_pr) < 0) {
    showToast("error", "Visa debit paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.visa_debit_ts === null) {
    showToast("error", "Visa debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_debit_ts) < 0) {
    showToast("error", "Visa debit total sale shouldn't be negative !");
    validation = true;
  }
  if (data.mastercard_debit_cr === null) {
    showToast("error", "Mastercard debit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_debit_cr) < 0) {
    showToast("error", "Mastercard debit current rate shouldn't be negative !");
    validation = true;
  }
  if (data.mastercard_debit_pr === null) {
    showToast(
      "error",
      "Mastercard debit paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.mastercard_debit_pr) < 0) {
    showToast(
      "error",
      "Mastercard debit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_debit_ts === "") {
    showToast("error", "Mastercard debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_debit_ts) < 0) {
    showToast("error", "Mastercard debit total sale shouldn't be negative !");
    validation = true;
  }
  if (!data.visa_credit_cr) {
    showToast("error", "Visa credit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_credit_cr) < 0) {
    showToast("error", "Visa credit current rate shouldn't be negative !");
    validation = true;
  }
  if (!data.visa_credit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_credit_pr) < 0) {
    showToast("error", "Visa credit paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.visa_credit_ts === null) {
    showToast("error", "Visa credit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_credit_ts) < 0) {
    showToast("error", "Visa credit total sale shouldn't be negative !");
    validation = true;
  }
  if (!data.visa_business_debit_cr) {
    showToast("error", "Visa business debit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_debit_cr) < 0) {
    showToast(
      "error",
      "Visa business debit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.visa_business_debit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_debit_pr) < 0) {
    showToast(
      "error",
      "Visa business debit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.visa_business_debit_ts === "") {
    showToast("error", "Visa business debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_debit_ts) < 0) {
    showToast(
      "error",
      "Visa business debit total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.visa_business_credit_cr) {
    showToast(
      "error",
      "Visa business credit current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.visa_business_credit_cr) < 0) {
    showToast(
      "error",
      "Visa business credit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.visa_business_credit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_credit_pr) < 0) {
    showToast(
      "error",
      "Visa business credit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.visa_business_credit_ts === null) {
    showToast("error", "Visa business debit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.visa_business_credit_ts) < 0) {
    showToast(
      "error",
      "Visa business credit total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.card_acceptance_fee_cr) {
    showToast("error", "Card acceptence fee current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.card_acceptance_fee_cr) < 0) {
    showToast(
      "error",
      "Card acceptence fee current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.card_acceptance_fee_pr) {
    showToast(
      "error",
      "Card acceptence fee paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.card_acceptance_fee_pr) < 0) {
    showToast(
      "error",
      "Card acceptence fee paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_acceptance_fee_ts === null) {
    showToast("error", "Card acceptence total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.card_acceptance_fee_ts) < 0) {
    showToast(
      "error",
      "Card acceptence fee total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.card_transaction_fee_cr) {
    showToast(
      "error",
      "Card transection fee current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.card_transaction_fee_cr) < 0) {
    showToast(
      "error",
      "Card transection fee current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.card_transaction_fee_pr) {
    showToast(
      "error",
      "Card transection fee paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.card_transaction_fee_pr) < 0) {
    showToast(
      "error",
      "Card transection fee paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.card_transaction_fee_ts === null) {
    showToast("error", "Card transection total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.card_transaction_fee_ts) < 0) {
    showToast(
      "error",
      "Card transection fee total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.authorization_fee_cr) {
    showToast("error", "Authorization fee current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.authorization_fee_cr) < 0) {
    showToast(
      "error",
      "Authorization fee current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.authorization_fee_pr) {
    showToast(
      "error",
      "Authorization fee paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.authorization_fee_pr) < 0) {
    showToast(
      "error",
      "Authorization fee paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.authorization_fee_tr_no === "") {
    showToast(
      "error",
      "Authorization fee number of transection  shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.authorization_fee_tr_no) < 0) {
    showToast(
      "error",
      "Authorization fee  number of transection  shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.mastercard_credit_cr) {
    showToast("error", "Mastercard credit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_credit_cr) < 0) {
    showToast(
      "error",
      "Mastercard credit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (!data.mastercard_credit_pr) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_credit_pr) < 0) {
    showToast(
      "error",
      "Mastercard credit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_credit_ts === null) {
    showToast("error", "Mastercard credit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_credit_ts) < 0) {
    showToast("error", "Mastercard credit total sale shouldn't be negative !");
    validation = true;
  }
  if (
    data.mastercard_business_cr === null ||
    data.mastercard_business_cr === ""
  ) {
    showToast("error", "Mastercard credit current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_business_cr) < 0) {
    showToast(
      "error",
      "Mastercard credit current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_business_pr === null) {
    showToast("error", "Visa credit paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_business_pr) < 0) {
    showToast(
      "error",
      "Mastercard credit paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_business_ts === null) {
    showToast("error", "Mastercard credit total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_business_ts) < 0) {
    showToast("error", "Mastercard credit total sale shouldn't be negative !");
    validation = true;
  }
  if (data.mastercard_corporate_cr === null) {
    showToast(
      "error",
      "Mastercard_corporate current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.mastercard_corporate_cr) < 0) {
    showToast(
      "error",
      "Mastercard_corporate current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_corporate_pr === null) {
    showToast(
      "error",
      "Mastercard_corporate paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.mastercard_corporate_pr) < 0) {
    showToast(
      "error",
      "Mastercard_corporate paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.mastercard_corporate_ts === null) {
    showToast("error", "Mastercard_corporate total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.mastercard_corporate_ts) < 0) {
    showToast(
      "error",
      "Mastercard_corporate total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_visa_fee_cr === null) {
    showToast("error", "All_non_eea_visa current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.all_non_eea_visa_fee_cr) < 0) {
    showToast("error", "All_non_eea_visa current rate shouldn't be negative !");
    validation = true;
  }
  if (data.all_non_eea_visa_fee_pr === null) {
    showToast(
      "error",
      "All_non_eea_visa paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_visa_fee_pr) < 0) {
    showToast(
      "error",
      "All_non_eea_visa paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_visa_fee_ts === null) {
    showToast("error", "All_non_eea_visa total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.all_non_eea_visa_fee_ts) < 0) {
    showToast("error", "All_non_eea_visa total sale shouldn't be negative !");
    validation = true;
  }
  if (data.all_non_eea_mastercard_fee_cr === null) {
    showToast(
      "error",
      "all_non_eea_mastercard current rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_mastercard_fee_cr) < 0) {
    showToast(
      "error",
      "All_non_eea_mastercard current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_mastercard_fee_pr === null) {
    showToast(
      "error",
      "All_non_eea_mastercard paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_mastercard_fee_pr) < 0) {
    showToast(
      "error",
      "All_non_eea_mastercard paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.all_non_eea_mastercard_fee_ts === null) {
    showToast(
      "error",
      "All_non_eea_mastercard total sale shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.all_non_eea_mastercard_fee_ts) < 0) {
    showToast(
      "error",
      "All_non_eea_mastercard total sale shouldn't be negative !"
    );
    validation = true;
  }
  if (data.amex_cr === null) {
    showToast("error", "Amex current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.amex_cr) < 0) {
    showToast("error", "Amex current rate shouldn't be negative !");
    validation = true;
  }
  if (data.amex_sr === null) {
    showToast("error", "Amex paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.amex_sr) < 0) {
    showToast("error", "Amex paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.amex_ts === null) {
    showToast("error", "Amex total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.amex_ts) < 0) {
    showToast("error", "Amex total sale shouldn't be negative !");
    validation = true;
  }
  if (data.per_transactional_charge_cr === null) {
    showToast("error", "Per_transactional current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.per_transactional_charge_cr) < 0) {
    showToast(
      "error",
      "Per_transactional current rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.per_transactional_charge_pr === null) {
    showToast(
      "error",
      "Per_transactional paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.per_transactional_charge_pr) < 0) {
    showToast(
      "error",
      "Per_transactional paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.per_transactional_charge_tr_no === null) {
    showToast("error", "Per_transactional total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.per_transactional_charge_tr_no) < 0) {
    showToast("error", "Per_transactional total sale shouldn't be negative !");
    validation = true;
  }
  if (data.portal_reporting_fee_cr === null) {
    showToast("error", "Portal reporting current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.portal_reporting_fee_cr) < 0) {
    showToast("error", "Portal reporting current rate shouldn't be negative !");
    validation = true;
  }
  if (data.portal_reporting_fee_pr === null) {
    showToast(
      "error",
      "Portal reporting paymentsave rate shouldn't be empty !"
    );
    validation = true;
  }
  if (parseFloat(data.portal_reporting_fee_pr) < 0) {
    showToast(
      "error",
      "Portal reporting paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.portal_reporting_fee_ts === null) {
    showToast("error", "Portal reporting total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.portal_reporting_fee_ts) < 0) {
    showToast("error", "Portal reporting total sale shouldn't be negative !");
    validation = true;
  }
  if (data.pci_dss_fee_cr === null) {
    showToast("error", "Pci dss current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.pci_dss_fee_cr) < 0) {
    showToast("error", "Pci dss current rate shouldn't be negative !");
    validation = true;
  }
  if (data.pci_dss_fee_pr === null) {
    showToast("error", "Pci dss paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.pci_dss_fee_pr) < 0) {
    showToast("error", "Pci dss paymentsave rate shouldn't be negative !");
    validation = true;
  }
  if (data.pci_dss_fee_ts === null) {
    showToast("error", "Pci dss total sale shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.pci_dss_fee_ts) < 0) {
    showToast("error", "Pci dss total sale shouldn't be negative !");
    validation = true;
  }
  if (data.terminal_rental_fee_cr === null) {
    showToast("error", "Terminal rental current rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.terminal_rental_fee_cr) < 0) {
    showToast("error", "Terminal rental current rate shouldn't be negative !");
    validation = true;
  }
  if (data.terminal_rental_fee_pr === null) {
    showToast("error", "Terminal rental paymentsave rate shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.terminal_rental_fee_pr) < 0) {
    showToast(
      "error",
      "Terminal rental paymentsave rate shouldn't be negative !"
    );
    validation = true;
  }
  if (data.num_of_terminals === null) {
    showToast("error", "Number of terminal shouldn't be empty !");
    validation = true;
  }
  if (parseFloat(data.num_of_terminals) < 0) {
    showToast("error", "Number of terminal shouldn't be negative !");
    validation = true;
  }

  if (validation) {
    return 0;
  }

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${data.slug}/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.GET_LEADS_INPUT,
            payload: { name: "reference_id", value: res.data.data.client_id },
          });
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
          toPdf();
          // showToast("success", "Leads Qualify successfully");
          dispatch(QualifyLeadList(res.data.data.id));
          dispatch({ type: Types.AFTER_SUCCESS_QUALIFY, payload: true });
          // localStorage.setItem("leadId", res.data.data.id);

          dispatch({
            type: Types.GET_LEGAL_INPUT,
            payload: { name: "lead_qualify_id", value: res.data.data.id },
          });

          // dispatch(GetLeadtList());
        } else {
          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
          showToast("error", res.data.errors.date);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        const erroeMsg = JSON.parse(err.request.response).errors;
        const errorList = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        errorList.map((item, index) => showToast("error", item));
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
export const QualifyLeadList = (leadId) => (dispatch) => {
  // let leadId = localStorage.getItem("leadId");
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/lead/${leadId}/qualify/`;
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          dispatch(SetPricequoteUpdatedData(res.data.data.slug));
          localStorage.setItem("quoteId", res.data.data.slug);
          showToast("success", "Leads Qualify successfully");

          dispatch({ type: Types.QUALIFY_STATUS, payload: true });
          dispatch({
            type: Types.GET_QUALIFY_LEAD,
            payload: res.data.data,
          });

          // payload: { name: "qualify_id", value: res.data.data.id },

          dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
        const erroeMsg = JSON.parse(err?.request?.response)?.errors;
        for (let value of Object.values(erroeMsg)) {
          showToast("error", value[0]);
        }
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_LEADS, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_LEADS, payload: true });
};
