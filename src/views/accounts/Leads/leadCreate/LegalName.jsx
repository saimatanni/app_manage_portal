import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCompanyHouseDetails,
  GetCompanyOfficersDetails,
  GetLeadsnput,
} from "../_redux/action/LeadAction";
import Cookies from "js-cookie"; // Import js-cookie
// import { process.env.REACT_APP_BASE_URL } from 'src/ConstUrl'
import PropTypes from "prop-types";

import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { GetPricequoteInput } from "../../Pricequote/_redux/action/PriceQuoteAction";
import { GetApplicationInput } from "../../NewApplication/_redux/action/ApplicationAction";
function LegalName({ name, value, details }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  LegalName.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    details: PropTypes.string,
  };
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );

  const userData = JSON.parse(Cookies.get("userData")) || undefined;
  const token = `Token ${userData.token}`;
  const handleInputChange3 = (event) => {
    const value = event.target.value;
    if (details === "quote") {
      dispatch(GetPricequoteInput("legal_name", value));
    }
    if (details === "lead") {
      dispatch(GetLeadsnput("legal_name", value));
    }
    if (details === "application") {
      dispatch(GetApplicationInput("legal_name", value));
      // dispatch(GetApplicationInput("contact_full_name", ''))
    }

    setInputValue(value);

    if (value.length > 3) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
    // fetchSuggestions(value);
  };

  const fetchSuggestions = debounce((searchQuery) => {
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${searchQuery}/legal-name-by-number/`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const Newdata = data.data.items;

        const newSuggestions = Newdata?.map((suggestion) => suggestion);
        setSuggestions(newSuggestions);
      })
      .catch((error) => console.log(error));
  }, 500);

  const handleSuggestionClick = (selectedValue) => {
    if (details === "quote") {
      dispatch(GetPricequoteInput("legal_name", selectedValue.title));
    }
    if (details === "lead") {
      dispatch(GetLeadsnput("legal_name", selectedValue.title));
    }
    if (details === "application") {
      dispatch(GetApplicationInput("legal_name", selectedValue.title));
      dispatch(
        GetApplicationInput("company_house_no", selectedValue.company_number)
      );
      dispatch(GetApplicationInput("contact_full_name", ""));
    }
    setSuggestions([]);

    dispatch(GetCompanyHouseDetails(selectedValue.company_number));
    // dispatch(GetCompanyHouseDetails(selectedValue.title))
    dispatch(GetCompanyOfficersDetails(selectedValue.company_number));
  };

  const handleWindowClick = (e) => {
    if (!e.target.closest("#suggestion-list-container")) {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          disabled={applicationInput.application_type === 5 ? true : false}
          className="form-control border-right-0 "
          type="text"
          value={value}
          // onChange={handleInputChange}
          onChange={handleInputChange3}
          // onKeyUp={handleOnChange}
          autoComplete="off"
        />

        {suggestions.length > 0 && (
          <div className="suggestion" id="suggestion-list-container">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion_item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.title}
                {" ("} {`${suggestion.company_status}`}
                {" )"}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LegalName;
