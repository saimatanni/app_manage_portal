import React from "react";
const initialState = {
  sidebarShow: true,
};
const SidebarReducer = () => {
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case "set":
        return { ...state, ...rest };
      default:
        return state;
    }
    // return changeState
  };
};

export default SidebarReducer;
