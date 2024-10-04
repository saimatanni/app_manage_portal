import React from "react";
import * as Types from "../types/Types";
const initialState = {
  allProductList: null,
  emailDetails: [],
  notificationList: [],
  contactEmailDetails: null,
  isLoadCommon: false,
  profileDetails: null,
  imageInput: {
    document: "",
    doc_type: 0,
    owner: "",
  },
};
const CommonReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    // ============================application product====================
    case Types.GET_ALL_PRODUCT_LIST:
      return {
        ...state,
        allProductList: action.payload,
      };
    case Types.IS_LOAD_COMMON:
      return {
        ...state,
        isLoadCommon: action.payload,
      };
      case Types.GET_PROFILE_DETAILS:
        return {
          ...state,
          profileDetails: action.payload,
        };
    case Types.GET_IMAGE_INPUT:
      const imageInput = { ...state.imageInput };
      imageInput[action.payload.name] = action.payload.value;
      return {
        ...state,
        imageInput: imageInput,
      };
    case Types.IS_SUCCESS_IMAGE:
      return {
        ...state,
        isSuccessImage: action.payload,
        imageInput: initialState.imageInput,
      };
    case Types.EMAIL_VERIFICATION_DETAILS:
      return {
        ...state,
        emailDetails: action.payload,
      };
    case Types.CONTACT_EMAIL_VERIFICATION_DETAILS:
      return {
        ...state,
        contactEmailDetails: action.payload,
      };
      case Types.GET_NOTIFICATION_LIST:
        return {
          ...state,
          notificationList: action.payload,
        };
    default:
      break;
  }
  return newState;
};

export default CommonReducer;
