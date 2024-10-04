import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { process.env.REACT_APP_BASE_URL } from "src/ConstUrl";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {

  GetPostcodeDetails,
} from "../Leads/_redux/action/LeadAction";
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
import Cookies from 'js-cookie'; // Import js-cookie
function ContactPostcode({
  name,
  value,
  details,
  index,
  
  business_owner_contacts,
}) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me =
      Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  ContactPostcode.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    details: PropTypes.string,
    index: PropTypes.string.isRequired,
   
    business_owner_contacts: PropTypes.isRequired,
  };
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const userData = JSON.parse(Cookies.get("userData")) || undefined;
  const token = `Token ${userData.token}`;

  const handleInputChange = (event) => {
    const { value } = event.target;
   
    dispatch(
      GetApplicationInput(
        name,
        value,
        index,
        "business_owners",
        business_owner_contacts
      )
    );
    setInputValue(value.trim());

    if (value === "") {
      setSuggestions([]);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${value}/address-by-postcode/`;
    //   "http://eboard.demo.devsstream.com/api/v1/lead/utility/" +
    //   "rm7" +
    //   "/address-by-postcode/";
    // const token = "Token 26791875807aebdc6ded9c585f18db723dd1c819";

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.Items);
        const Newdata = data.data.Items;

        const newSuggestions = Newdata?.map((suggestion) => suggestion);
        setSuggestions(newSuggestions);
      })
      .catch((error) => console.log(error));
  };

  const handleSuggestionClick = (selectedValue) => {
    setInputValue(selectedValue.Text);
    console.log("selectedValue", selectedValue);
    setSuggestions([]);

    if (selectedValue.Type === "Postcode") {
      findAddress(selectedValue, selectedValue.Id);
    }
    //  if (selectedValue.Type === "Address")
    else {
      setSuggestions([]);
      dispatch(GetPostcodeDetails(selectedValue.Id, details, index));
    }
  };

  const findAddress = (text, container) => {
    console.log("container", container);
    const Text = text.Text + " " + text.Description;
    const Container = container;

    const url = `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/${Text}/address-by-postcode/?container=${Container}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.data.Items.length === 1 &&
          typeof data.data.Items[0].Error !== "undefined"
        ) {
        } else {
          if (data.data.Items.length === 0) {
          } else {
            setSuggestions(data.data.Items);
          }
        }
      });
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
    <div style={{position:"relative"}}>
      <input
        className="form-control border-right-0 my-3"
        type="text"
        name="zip_code"
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
    </div>
  );
}

export default ContactPostcode;
