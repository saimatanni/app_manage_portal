import * as Types from "../types/Types";
import * as app from "../../../accounts/NewApplication/_redux/types/Types";

import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";

import CookieService from "src/services/CookiService";

// import { showToast } from "../../../../../../../utils/ToastHelper";
// import { process.env.REACT_APP_BASE_URL } from "../../../../../../../Const";
export const GetAllProductList = (url) => (dispatch) => {
  // const url = `${process.env.REACT_APP_BASE_URL}/api/v1/applications/application-terminal-product/`;
  // const url = `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`;
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_ALL_PRODUCT_LIST,
          payload: res.data.data.results,
        });

        dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
};
export function decodeToken(encodedToken) {
  // const encodedToken = "2bfe7ff988c523d:1d818:g2cbb722gdgcfc9394";
  if (encodedToken) {
    const decodedChars = [];
    for (let i = 0; i < encodedToken.length; i++) {
      decodedChars.push(String.fromCharCode(encodedToken.charCodeAt(i) - 1));
    }

    return decodedChars.join("");
  }

  // return decodedChars.join("");
}
export const SubmitImage2 =
  (data, name, i, category) => async (dispatch, getState) => {
    const urlImg = `${process.env.REACT_APP_BASE_URL}api/v1/auth/upload/`;
    const state = getState(); // Get the current state
    data.document = Array.from(data.document);

    let imageIds = [
      ...state.applicationInfo.applicationInput.application_docs[i].document,
    ];
    let imageUrls = [
      ...state.applicationInfo.applicationInput.application_docs[i].doc_urls,
    ];
    const encodedToken = CookieService.getCookie("access_token");
    const token = decodeToken(encodedToken);
    console.log("token", token);
    // Create an array of promises for uploading each image
    const uploadPromises = data.document.map(async (file) => {
      const originalFileName = file.name;
      const fileExtension = originalFileName.split(".").pop();
      const modifiedFile = new File(
        [file],
        // category.ext,
        `${category}.${fileExtension}`,
        { type: file.type }
      );
      try {
        const formData = new FormData();
        formData.append("document", modifiedFile);
        formData.append("doc_type", data.doc_type);

        dispatch({ type: Types.IS_LOAD_COMMON, payload: true });

        const response = await fetch(urlImg, {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: `Token ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.status) {
            showToast("success", "Image Uploaded successfully");
            const imageId = responseData.data.id;
            imageIds.push(imageId);
            const imageUrl = responseData.data.document_url;
            imageUrls.push(imageUrl);
            dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
          } else {
            showToast("error", responseData.message);
            dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
          }
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        showToast("error", error.message);

        dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
        if (error.response === undefined) {
          showToast("error", "Internal Server Error");
        } else {
          const erroeMsg = JSON.parse(error.request.response).errors;
          const Msg = JSON.parse(error.request.response).message;
          console.log(error, erroeMsg);
          showToast("error", Msg);
          const dataArray = Object.entries(erroeMsg).map(
            ([key, value]) => `${key}: ${JSON.stringify(value)}`
          );
          dataArray.map((item, index) => showToast("error", item));
        }
      }
    });

    // Execute all upload promises
    try {
      await Promise.all(uploadPromises);

      // Dispatch the action with the updated array of image IDs and URLs
      if (name === "application") {
        dispatch({
          type: app.ADD_NEW_DOC,
          payload: {
            name: "document",
            value: imageIds,
            index: i,
          },
        });
        dispatch({
          type: app.ADD_NEW_DOC,
          payload: {
            name: "doc_urls",
            value: imageUrls,
            index: i,
          },
        });
      }
    } catch (error) {
      dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
    }
  };

export const GetEmailVerification = (api, contact) => (dispatch) => {
  //   const url = `${BASE_URL}api/v1/auth/notifications/`;
  const url = api;
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          if (contact === "contact") {
            dispatch({
              type: Types.CONTACT_EMAIL_VERIFICATION_DETAILS,

              payload: res.data.data,
            });
          } else {
            dispatch({
              type: Types.EMAIL_VERIFICATION_DETAILS,

              payload: res.data.data,
            });
          }
          dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
        }
      })
      .catch((err) => {
        const errorMsg = JSON.parse(err.request.response).errors;
        if (contact === "contact") {
          dispatch({
            type: Types.CONTACT_EMAIL_VERIFICATION_DETAILS,

            payload: errorMsg,
          });
          // showToast("error", errorMsg.message);
          // swal(errorMsg.message, {
          //   icon: "error",
          // });
        } else {
          dispatch({
            type: Types.EMAIL_VERIFICATION_DETAILS,

            payload: errorMsg,
          });

          // swal(errorMsg.message, {
          //   icon: "error",
          // });
        }
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
};

export const GetNotificationList = (api) => (dispatch) => {
  const url = api;
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
  try {
    Axios.get(url)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: Types.GET_NOTIFICATION_LIST,

            payload: res.data.data,
          });

          dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
      });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
};
export const GetProfileDetails = () => (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/profile/`;
  // const url = api;
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({
          type: Types.GET_PROFILE_DETAILS,
          payload: res.data.data,
        });

        dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
      } else {
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_COMMON, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_COMMON, payload: true });
};
