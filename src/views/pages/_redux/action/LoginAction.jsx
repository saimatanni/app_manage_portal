import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "../../../../utils/ToastHelper";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
export const InputTextValue = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.INPUT_LOGIN_VALUE, payload: formData });
};

export const SetSigninStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_LOGIN_FALSE, payload: false });
};
function encodeToken(token) {
  const encodedChars = [];
  for (let i = 0; i < token.length; i++) {
    encodedChars.push(String.fromCharCode(token.charCodeAt(i) + 1));
  }
  console.log("encodedChars.join", encodedChars.join(""));
  return encodedChars.join("");
}
//check token

export const SignInData = (postData) => async (dispatch) => {
  if (postData.email.length === 0) {
    showToast("error", "Email shouldn't be empty !");
    return 0;
  } else if (postData.password.length === 0) {
    showToast("error", "Password shouldn't be empty");
    return 0;
  }

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/login/`;
  dispatch({ type: Types.IS_LOAD_LOGIN, payload: true });
  try {
    await Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          showToast("success", res.data.message);
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
          // document.cookie = `access_token=${
          //   res.data.data.token
          // }; expires=${new Date(
          //   Date.now() + 7 * 24 * 60 * 60 * 1000
          // )}; Secure=${true}; SameSite=Lax`;

          Cookies.set("access_token", encodeToken(res.data.data.token), {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days (adjust as needed)
            secure: true, // Only transmit over HTTPS
            // httpOnly: true, // Cannot be accessed via JavaScript
            sameSite: "Lax", // Control when to send cookies with cross-origin requests});
          });
          // Store other user data as needed
          if (postData.remember === true) {
            Cookies.set("is_ps_remember_me", true, {
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              secure: true, // Only transmit over HTTPS
              // httpOnly: true, // Cannot be accessed via JavaScript
              sameSite: "Lax",
            });
          }
          Cookies.set("is_ps_logged_in", true, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: true, // Only transmit over HTTPS
            // httpOnly: true, // Cannot be accessed via JavaScript
            sameSite: "Lax",
          });
          Cookies.set("userData", JSON.stringify(res.data.data), {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: true, // Only transmit over HTTPS
            // httpOnly: true, // Cannot be accessed via JavaScript
            sameSite: "Lax",
          });

          dispatch({ type: Types.AFTER_LOGIN_DATA, payload: true });
        } else {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        for (let value of Object.values(errorMsg)) {
          showToast("error", value[0]);
          //           }
        }
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        showToast("error", message);
        //           }
      });
  } catch (error) {}
};



export const GetChangePassInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_CHANGE_PASS_INPUT, payload: formData });
};
export const GetForgetPassInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };

  dispatch({ type: Types.GET_FORGET_PASSWORD, payload: formData });
};
export const SubmitChangepasswordData = (postData) => async (dispatch) => {
  if (postData.old_password.length === 0) {
    showToast("error", "Old_password shouldn't be empty");
    return 0;
  }
  if (postData.password.length === 0) {
    showToast("error", "New password shouldn't be empty !");
    return 0;
  }

  if (postData.confirm_password.length === 0) {
    showToast("error", "Confirm_password shouldn't be empty");
    return 0;
  }
  if (postData.confirm_password !== postData.password) {
    showToast("error", "Passwords do not match");
    return 0;
  }
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/change/password/`;
  dispatch({ type: Types.IS_LOAD_LOGIN, payload: true });

  try {
    await Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
          showToast("success", res.data.message);

          dispatch({
            type: Types.GET_CHANGE_PASS_INPUT,
            payload: { name: "password", value: "" },
          });
          dispatch({
            type: Types.GET_CHANGE_PASS_INPUT,
            payload: { name: "old_password", value: "" },
          });
          dispatch({
            type: Types.GET_CHANGE_PASS_INPUT,
            payload: { name: "confirm_password", value: "" },
          });
          dispatch({ type: Types.AFTER_CONFIRM_PASSWORD, payload: true });
        } else {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        console.log("error", err);
        const erroeMsg = JSON.parse(err.request.response).errors;
        const Msg = JSON.parse(err.request.response).message;
       
        if (err.response === undefined) {
          showToast("error", "Internal Server Error");
        } else {
          if (Msg) {
            showToast("error", Msg);
          } else {
            const dataArray = Object.entries(erroeMsg.non_field_errors).map(
              ([key, value]) => `${key}: ${JSON.stringify(value)}`
            );
            dataArray.map((item, index) => showToast("error", item));
          }
        }
      });
  } catch (error) {
    console.log("error", error);
    const Msg = JSON.parse(error);
    // const Msg = JSON.parse(error.request.response).message;
    console.log("error2", Msg);
  }
};
export const SubmitForgetpasswordData = (postData) => async (dispatch) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/forget/password/`;
  dispatch({ type: Types.IS_LOAD_LOGIN, payload: true });

  try {
    await Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
          showToast("success", res.data.message);

          dispatch({ type: Types.AFTER_FORGET_PASSWORD, payload: true });
        } else {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });

        const erroeMsg = JSON.parse(err.request.response).errors;
        for (let value of Object.values(erroeMsg)) {
          Swal.fire({
            title: "Error!",
            text: value[0],
            icon: "error",
          });
        }
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
      });
  } catch (error) {}
};
// ========verification----------------
export const GetVarificationInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_VERIFICATION_CHECK, payload: formData });
};
// export const SetVerificationStatusFalse = () => (dispatch) => {
//   dispatch({ type: Types.SET_VERIFICATION_FALSE, payload: false });
// };
export const SubmitVarificationdData = (postData) => async (dispatch) => {
  // if(postData.email) delete postData.mobile
  // if(postData.mobile) delete postData.email

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/forget/password/confirm/`;
  dispatch({ type: Types.IS_LOAD_LOGIN, payload: true });

  try {
    await Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
          showToast("success", res.data.message);

          dispatch({ type: Types.AFTER_VERIFICATION_CHECK, payload: true });
        } else {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
     
        const erroeMsg = JSON.parse(err.request.response).errors;
        for (let value of Object.values(erroeMsg)) {
          Swal.fire({
            title: "Error!",
            text: value[0],
            icon: "error",
          });
        }
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        // swal(message, {
        //   icon: "error",
        // });
      });
  } catch (error) {}
};
// ========resend verification----------------
export const GetResendVarificationInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_RESEND_VERIFICATION_INPUT, payload: formData });
};
// export const SetVerificationStatusFalse = () => (dispatch) => {
//   dispatch({ type: Types.SET_VERIFICATION_FALSE, payload: false });
// };
export const SubmitResendVarificationdData = (postData) => async (dispatch) => {
  if (postData.email) delete postData.mobile;
  if (postData.mobile) delete postData.email;

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/admin/verification/resend/`;
  dispatch({ type: Types.IS_LOAD_LOGIN, payload: true });

  try {
    await Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
          showToast("success", res.data.message);

          dispatch({ type: Types.AFTER_RESEND_INPUT, payload: true });
        } else {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
     
        // for (let value of Object.values(erroeMsg)) {
        //   // showToast("error", value[0]);
        //   swal(value[0], {
        //     icon: "error",
        //   });
        // }
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        // swal(message, {
        //   icon: "error",
        // });
      });
  } catch (error) {}
};

// ======confirm passowrd====
export const GetConfirmPassInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_CONFIRM_PASS_INPUT, payload: formData });
};
export const SetConfirmpassStatusFalse = () => (dispatch) => {
  dispatch({ type: Types.SET_VERIFICATION_FALSE, payload: false });
};
export const SubmitConfirmpassdData = (postData) => async (dispatch) => {
  if (postData.email) delete postData.mobile;
  if (postData.mobile) delete postData.email;
  if (postData.password === "") {
    showToast("error", "Password shouldn't be empty !");
    return 0;
  }
  if (postData.password.length < 8) {
    showToast("error", "Must be at least 8 characters. !");
    return 0;
  } else if (postData.confirm_password === "") {
    showToast("error", "Confirm Password shouldn't be empty !");
    return 0;
  }
  // else if (postData && postData.confirm_password !== postData.password) {
  //   showToast("error", " Password doesn't match !");
  //   return 0;
  // }

  const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/admin/forget/password/confirm/`;
  dispatch({ type: Types.IS_LOAD_LOGIN, payload: true });

  try {
    await Axios.post(url, postData)
      .then((res) => {
        if (res.data.status) {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
          showToast("success", res.data.message);

          dispatch({ type: Types.AFTER_CONFIRM_PASSWORD, payload: true });
        } else {
          dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
      
        
        dispatch({ type: Types.IS_LOAD_LOGIN, payload: false });
        // swal(message, {
        //   icon: "error",
        // });
      });
  } catch (error) {}
};

