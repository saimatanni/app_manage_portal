import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from 'js-cookie'; // Import js-cookie
import PropTypes from 'prop-types'
import { GetPricequoteInput } from "../_redux/action/PriceQuoteAction";
// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import { GetPostcodeDetails } from "../../Leads/_redux/action/LeadAction";

function QuotePostCode({name,value,details}) {
  QuotePostCode.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    details: PropTypes.string,
  }
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const priceQuoteInput = useSelector(
    (state) => state.leadInfo.priceQuoteInput
  );
  const userData = JSON.parse(Cookies.get("userData")) || undefined;
  const token = `Token ${userData.token}`;
  console.log(token);
  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch(GetPricequoteInput(name, value));
    setInputValue(value.trim());

    if (value === "") {
      setSuggestions([]);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${value}/address-by-postcode/`;
   
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.Items)
        const Newdata = data.data.Items

        const newSuggestions = Newdata?.map((suggestion) => suggestion)
        setSuggestions(newSuggestions)
      })
      .catch((error) => console.log(error))
  };

  const handleSuggestionClick = (selectedValue) => {
    setInputValue(selectedValue.Text);
    console.log(selectedValue);
    setSuggestions([]);
    const type = "Postcode";
    if (selectedValue.Type === "Postcode") {
      findAddress(selectedValue, selectedValue.Id);
    } else
    //  if (selectedValue.Type === "Address") 
     {
      setSuggestions([]);
      dispatch(GetPostcodeDetails(selectedValue.Id, details));
    }
  };

  const findAddress = (text, container) => {
    const Text = text.Text + " " + text.Description;
    const Container = container;

    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${Text}/address-by-postcode/?container=${Container}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.data.Items.length === 1 &&
          typeof data.data.Items[0].Error !== 'undefined'
        ) {
        } else {
          if (data.data.Items.length === 0) {
          } else {
            setSuggestions(data.data.Items)
          }
        }
      })
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
    <input
      className="form-control border-right-0"
      type="text"
      value={value}
      onChange={handleInputChange}
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
            {suggestion.Text}
            {suggestion.Description}
          </div>
        ))}
      </div>
    )}
  </>
  );
}

export default QuotePostCode;
