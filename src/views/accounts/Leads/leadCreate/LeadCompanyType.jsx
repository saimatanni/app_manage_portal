import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLegalInput,
  SetLeadsStatusFalse,
} from "../_redux/action/LeadAction";
import LimitedCompany from "../LeadsForm/LimitedCompany";
import SoleTrade from "../LeadsForm/SoleTrade";
import Partners from "../LeadsForm/Partners";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie
const LeadCompanyType = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();

  const legalTypeInput = useSelector((state) => state.leadInfo.legalTypeInput);

  const handleTypeButtonClick = (value) => {
    if (value === "L") {
      dispatch(GetLegalInput("soleTrade", ""));
      dispatch(GetLegalInput("limited", value));
      dispatch(GetLegalInput("other", ""));

      dispatch(SetLeadsStatusFalse());
    } else if (value === "ST") {
      dispatch(GetLegalInput("soleTrade", value));
      dispatch(GetLegalInput("limited", ""));
      dispatch(GetLegalInput("other", ""));

      dispatch(SetLeadsStatusFalse());
    } else if (value === "OT") {
      dispatch(GetLegalInput("soleTrade", ""));
      dispatch(GetLegalInput("limited", ""));
      dispatch(GetLegalInput("other", value));

      dispatch(SetLeadsStatusFalse());
    }
  };
  return (
    <div style={{ padding: "16px" }}>
      <h1 className="text-center my-4">New Leads Information</h1>
      <strong>Please select your business type:</strong>

      <div className="d-flex gap-2 py-3 flex-lg-row flex-column">
        <button
          className={` ${
            legalTypeInput.limited === "L" ? "active_basic_btn" : "basic_btn"
          }`}
          onClick={() => handleTypeButtonClick("L")}
        >
          Limited Company
        </button>
        <button
          onClick={() => handleTypeButtonClick("ST")}
          className={` ${
            legalTypeInput.soleTrade === "ST" ? "active_basic_btn" : "basic_btn"
          }`}
        >
          Sole Trade
        </button>
        <button
          className={` ${
            legalTypeInput.other === "OT" ? "active_basic_btn" : "basic_btn"
          }`}
          onClick={() => handleTypeButtonClick("OT")}
        >
          Others (e.g. Partnership)
        </button>
      </div>

      <div className="my-3">
        {legalTypeInput.limited === "L" && (
          <>
            <LimitedCompany />
          </>
        )}
        {legalTypeInput.soleTrade === "ST" && (
          <>
            <SoleTrade />
          </>
        )}
        {legalTypeInput.other === "OT" && (
          <>
            <Partners />
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCompanyType;
