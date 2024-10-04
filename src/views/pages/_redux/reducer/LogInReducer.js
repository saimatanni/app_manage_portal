import * as Types from "../types/Types";
const initialState = {
  loginInput: {
    password: "",
    remember: false,
    email: "",
  },
  forgetPasInput: {
    email: "",
  },
  verificationInput: {
    email: "",
    code: "",
    password: "",
    confirm_passwqord: "",
  },
  resendVarificationInput: {
    email: "",
  },
  confirmPassInput: {
    email: "",
    code: "",
    password: "",
    confirm_passwqord: "",
  },
  ChangePassInput: {
    old_password: "",
    password: "",
    confirm_password: "",
  },
  afterSignInData: false,
  loginMessage: "",
  isLoadLogIn: false,
  afterSubmitEmail: false,
  afterSubmitOtp: false,
  afterSubmitPassword: false,
  afterResendVerification: false,
  sidebarShow: true,
};
const LogInReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.IS_SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.payload,
      };
    case Types.INPUT_LOGIN_VALUE:
      const loginInput = { ...state.loginInput };
      loginInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        loginInput: loginInput,
      };
    case Types.IS_LOAD_LOGIN:
      return {
        ...state,
        isLoadLogIn: action.payload,
      };
    case Types.AFTER_LOGIN_DATA:
      return {
        ...state,
        afterSignInData: action.payload,
      };
    case Types.AFTER_FORGET_PASSWORD:
      return {
        ...state,
        afterSubmitEmail: action.payload,
      };
    case Types.SET_LOGIN_FALSE:
      return {
        ...state,
        afterSignInData: action.payload,
        loginInput: initialState.loginInput,
      };
    case Types.LOGIN_MESSAGE:
      return {
        ...state,
        loginMessage: action.payload,
      };

    case Types.GET_FORGET_PASSWORD:
      const forgetPasInput = { ...state.forgetPasInput };
      forgetPasInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        forgetPasInput: forgetPasInput,
      };
    // ================verifiation-------------------
    case Types.GET_VERIFICATION_CHECK:
      const verificationInput = { ...state.verificationInput };
      verificationInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        verificationInput: verificationInput,
      };
    case Types.AFTER_VERIFICATION_CHECK:
      return {
        ...state,
        afterSubmitOtp: action.payload,
      };

    // =======resend varification---------------------
    case Types.GET_RESEND_VERIFICATION_INPUT:
      const resendVarificationInput = { ...state.resendVarificationInput };
      resendVarificationInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        resendVarificationInput: resendVarificationInput,
      };
    case Types.AFTER_RESEND_INPUT:
      return {
        ...state,
        afterResendVerification: action.payload,
      };

    // ================confirm password-------------------
    case Types.GET_CONFIRM_PASS_INPUT:
      const confirmPassInput = { ...state.confirmPassInput };
      confirmPassInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        confirmPassInput: confirmPassInput,
      };
    case Types.GET_CHANGE_PASS_INPUT:
      const ChangePassInput = { ...state.ChangePassInput };
      ChangePassInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        ChangePassInput: ChangePassInput,
      };
    case Types.AFTER_CONFIRM_PASSWORD:
      return {
        ...state,
        afterSubmitPassword: action.payload,
      };
    case Types.SET_CONFIRM_PASS_FALSE:
      return {
        ...state,
        afterSubmitOtp: action.payload,
        afterSubmitEmail: action.payload,
        afterSubmitPassword: action.payload,
        confirmPassInput: initialState.confirmPassInput,
        ChangePassInput: initialState.ChangePassInput,
      };

    case Types.SET_VERIFICATION_FALSE:
      return {
        ...state,
        afterSubmitOtp: action.payload,
        afterSubmitEmail: action.payload,

        afterSubmitPassword: action.payload,
        forgetPasInput: initialState.forgetPasInput,
        confirmPassInput: initialState.confirmPassInput,
        verificationInput: initialState.verificationInput,
      };

    default:
      break;
  }
  return newState;
};
export default LogInReducer;
