import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetCompanyHouseDetails,
  GetCompanyOfficersDetails,
  GetLeadsnput,
 
} from '../_redux/action/LeadAction'

import PropTypes from 'prop-types'
import Cookies from 'js-cookie'; // Import js-cookie
function LegalName({ name, value, details }) {
  LegalName.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    details: PropTypes.string,
  }
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const userData = JSON.parse(Cookies.get('userData')) || undefined
  const token = `Token ${userData.token}`

  const handleInputChange = (event) => {
    const { value } = event.target
    dispatch(GetLeadsnput(name, value))
    setInputValue(value.trim())
    if (value === '') {
      setSuggestions([])
      return
    }
    const url = `${process.env.REACT_APP_BASE_URL}api/v1/auth/country/`
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const Newdata = data.data.items
        console.log(Newdata, 'Newdata')
        const newSuggestions = Newdata?.map((suggestion) => suggestion)
        setSuggestions(newSuggestions)
      })
      .catch((error) => console.log(error))
  }

  const handleSuggestionClick = (selectedValue) => {
    dispatch(GetLeadsnput('legal_name', selectedValue.title))

    setSuggestions([])

    dispatch(GetCompanyHouseDetails(selectedValue.title))
    dispatch(GetCompanyOfficersDetails(selectedValue.company_number))
  }

  const handleWindowClick = (e) => {
    if (!e.target.closest('#suggestion-list-container')) {
      setSuggestions([])
    }
  }
  useEffect(() => {
    window.addEventListener('click', handleWindowClick)

    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [])
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
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default LegalName
