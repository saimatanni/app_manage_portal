import React, { useEffect, useState } from "react";
import list from "../../assets/img/list.svg";
import logo from "../../assets/psImg/user_logo.png";
import Cookies from "js-cookie";
import { CCol, CRow } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { Camera, Eye, EyeClosed } from "@phosphor-icons/react";
import "./Salesman.css";
import { showToast } from "src/utils/ToastHelper";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { GetCountryList } from "../accounts/Leads/_redux/action/LeadAction";
import Loader from "src/utils/Loader";

const CreateSalesMan = () => {
  var userData;
  const userDataCookie = Cookies.get("userData");
  const userId = localStorage.getItem("userId");

  if (userDataCookie) {
    // If the cookie exists, parse it as JSON
    userData = JSON.parse(userDataCookie);
  } else {
    // Handle the case where the cookie does not exist
    console.log("userData cookie does not exist");
  }
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryList = useSelector((state) => state.leadInfo.countryList);
  const [showPass, setShowPass] = useState(false);
  const [addSalesMan, setAddSalesMan] = useState({
    id: "",
    first_name: "",
    last_name: "",
    residual_percentage: 0,
    upfront_percentage: 0,
    email: "",
    mobile: "",
    image: null,
    image_url: null,
    password: "",
    login_username: "",
    gender: 0,
    sales_agent: userData?.id,
    country: 74,
    role: 10,
    is_active: true,
  });
  const handleChangeInput = (fieldName, value) => {
    setAddSalesMan((prevState) => ({
      ...prevState, // This spreads the previous state to maintain other field values
      [fieldName]: value, // This updates the field based on the fieldName and value passed
    }));
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}api/v1/auth/user/${userId}/`)
        .then((res) => {
          // setIsLoading(true)

          const newData = res?.data?.data;
          setAddSalesMan({
            id: newData.id,
            first_name: newData.first_name,
            last_name: newData.last_name,
            upfront_percentage: newData.upfront_percentage,
            residual_percentage: newData.residual_percentage,
            email: newData.email,
            mobile: newData.mobile,
            image: newData.image || null,
            image_url: newData.image_url || null,
            gender: newData.gender,
            login_username: newData.login_username || "",
            sales_agent: userData?.id,
            country: newData.country,
            role: 10,
            is_active: true,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);

          if (err.response === undefined) {
            showToast("error", "Server error");
          } else {
            const message = JSON.parse(err.request.response).message;
  
            if (
              message === "Invalid token." ||
              JSON.parse(err.request.response).code === 401
            ) {
              showToast("success", "Invalid Token");
              navigate("/login");
            }
          }
        });
    }
    dispatch(GetCountryList());
  }, []);
  const getTradingcountryIndex = () => {
    var index = -1;
    countryList.map((opt) => {
      if (parseInt(opt.id) === parseInt(addSalesMan.country)) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };

  const handleSubmit = async (data) => {
    // Initial form validation
    const requiredFields = ["first_name", "last_name", "email", "password"];
    for (const field of requiredFields) {
      if (!data[field] || data[field].length === 0) {
        showToast("error", `${field.replace("_", " ")} shouldn't be empty`);
        return;
      }
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value != null && value !== "") {
          formData.append(key, value);
        }
      });
      formData.delete("image_url");
      // API call
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Token ${userData.token}`,
          },
        }
      );

      // If the response is not okay, we assume it's a bad request or other HTTP error that resulted in a non-2xx response
      if (!response.ok) {
        // Attempt to parse the response body for error details
        const errorResponse = await response.json();
        console.log("errorResponse", errorResponse); // Assuming the server always returns JSON for errors

        const errors = errorResponse.errors || {};
        const message = errorResponse?.message || "";
        if (message) {
          showToast("error", message);
        }

        if (errors) {
          Object.entries(errors).forEach(([key, value]) => {
            showToast("error", `${key}: ${value.join(", ")}`); // Assuming errors are returned as arrays of messages
          });
        }
        if (errorResponse.code !== 400) {
          Object.entries(errorResponse).forEach(([key, value]) => {
            showToast("error", `${key}: ${value.join(", ")}`); // Assuming errors are returned as arrays of messages
          });
        }

        setIsLoading(false);
        return; // Stop execution as we've handled the error
      }

      // Handling successful response
      const responseData = await response.json();
      console.log("Salesman created:", responseData);
      showToast("success", "Salesman created successfully");
      navigate(`/salesman-list`);
    } catch (error) {
      // This catches network errors, JSON parsing errors, etc.
      console.error("Error creating salesman:", error);
      showToast("error", "Unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    console.log("data.image", data.image);
    if (addSalesMan?.first_name.length === 0) {
      showToast("error", "First name shouldn't be empty");
      return 0;
    }
    if (addSalesMan?.last_name.length === 0) {
      showToast("error", "Last name shouldn't be empty");
      return 0;
    }
    if (addSalesMan?.email.length === 0) {
      showToast("error", "Email shouldn't be empty");
      return 0;
    }
    if (typeof data.image === "string") {
      delete data.image;
    }
    // Initialize FormData
    const formData = new FormData();

    // Append non-empty fields to formData
    Object.entries(data).forEach(([key, value]) => {
      if (value != null && value !== "") {
        formData.append(key, value);
      }
    });

    // Special handling for the image field if it's a string
    // Assuming you want to skip appending the image if it's a string (indicating no change)
    if (typeof data.image === "string") {
      formData.delete("image"); // Make sure not to append the image field if it's just a URL or file path
    }
    formData.delete("image_url");
    setIsLoading(true);
    try {
      // const response = await fetch(
      //   `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/${data.id}/`,
      //   {
      //     method: "PUT",
      //     body: formData, // Send the FormData object as the body
      //     // Don't set Content-Type header, let the browser set it
      //     headers: {
      //       // Add Authorization header with Bearer token
      //       Authorization: `Token ${userData.token}`,
      //     },
      //   }
      // );

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/${data.id}/`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Token ${userData.token}`,
          },
        }
      );

      // If the response is not okay, we assume it's a bad request or other HTTP error that resulted in a non-2xx response
      if (!response.ok) {
        // Attempt to parse the response body for error details
        const errorResponse = await response.json();
        console.log("errorResponse", errorResponse); // Assuming the server always returns JSON for errors
        const errors = errorResponse.errors || {};
        const message = errorResponse?.message || "";
        if (message) {
          showToast("error", message);
        }

        if (errors) {
          Object.entries(errors).forEach(([key, value]) => {
            showToast("error", `${key}: ${value.join(", ")}`); // Assuming errors are returned as arrays of messages
          });
        }
        if (errorResponse.code !== 400) {
          Object.entries(errorResponse).forEach(([key, value]) => {
            showToast("error", `${key}: ${value.join(", ")}`); // Assuming errors are returned as arrays of messages
          });
        }

        setIsLoading(false);
        return; // Stop execution as we've handled the error
      }

      // Handling successful response
      const responseData = await response.json();
      console.log("Salesman created:", responseData);
      showToast("success", "Salesman updated successfully");
      navigate(`/salesman-list`);
    } catch (error) {
      // This catches network errors, JSON parsing errors, etc.
      console.error("Error creating salesman:", error);
      showToast("error", "Unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="leads">
      <img src={list} width="25" alt="" />
      <strong style={{ fontWeight: "700" }}>
        {addSalesMan.id ? "Update" : "Create"} User{" "}
      </strong>
      <br />
      <br />
      <CRow>
        <div className="d-flex justify-content-center">
          <div className="mb-4">
            <div className="profile_image">
              {addSalesMan.image || addSalesMan.image_url ? (
                <img src={addSalesMan.image_url} alt="" />
              ) : (
                <img src={logo} alt="" />
              )}

              <Camera className="image_icon" />
              <input
                id="outlined-basic"
                type="file"
                accept="image/png, image/gif, image/jpeg, .pdf. image/*"
                label="image"
                size="small"
                name="image"
                // value={UserInput.image}
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    handleChangeInput("image", file); // Set the file directly to UserInput.image

                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      handleChangeInput("image_url", reader.result);
                    };
                  }
                }}
              />
            </div>
          </div>
        </div>
        <CCol md="6">
          <div className="my-3">
            <strong htmlFor="basic-url">
              First Name <span style={{ color: "#dd2c00" }}>*</span>
            </strong>
            <input
              type="text"
              className="form-control mt-2 "
              style={{ fontSize: "large" }}
              name="first_name"
              value={addSalesMan.first_name}
              required
              onChange={(e) => handleChangeInput("first_name", e.target.value)}
            />
          </div>
          <div className="my-3">
            <strong htmlFor="basic-url">
              Email <span style={{ color: "#dd2c00" }}>*</span>
            </strong>
            <input
              type="email"
              className="form-control mt-2 "
              style={{ fontSize: "large" }}
              name="email"
              autoComplete="new-email"
              value={addSalesMan.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
            />
          </div>
          <div className="my-3">
            <strong htmlFor="basic-url">Mobile No.</strong>
            <input
              // type="number"
              className="form-control mt-2 "
              style={{ fontSize: "large" }}
              name="mobile"
              maxLength={11}
              value={addSalesMan.mobile}
              required
              onChange={(e) => handleChangeInput("mobile", e.target.value)}
            />
          </div>
        </CCol>
        <CCol md="6">
          <div className="my-3">
            <strong htmlFor="basic-url">
              Last Name <span style={{ color: "#dd2c00" }}>*</span>
            </strong>
            <Form.Control
              type="text"
              className="form-control mt-2"
              style={{ fontSize: "large" }}
              name="last_name"
              value={addSalesMan.last_name}
              required
              onChange={(e) => handleChangeInput("last_name", e.target.value)}
            />
          </div>
          <div className="my-3">
            <strong htmlFor="basic-url">
              Password{" "}
              {addSalesMan.id ? (
                ""
              ) : (
                <span style={{ color: "#dd2c00" }}>*</span>
              )}
            </strong>

            <InputGroup className="mb-3 mt-2 ">
              <Form.Control
                style={{ fontSize: "large" }}
                type={showPass ? "text" : "password"}
                name="user_password_random"
                id="user_password_random"
                autoComplete="new-password"
                value={addSalesMan.password}
                onChange={(e) => handleChangeInput("password", e.target.value)}
              />
              <InputGroup.Text
                id="basic-addon2"
                onClick={() => setShowPass(!showPass)}
              >
                {" "}
                {showPass ? <Eye /> : <EyeClosed />}
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="my-3">
            <strong htmlFor="basic-url">
              Gender <span style={{ color: "#dd2c00" }}>*</span>
            </strong>
            <div key={"6878"} className="mb-3 mt-3">
              <Form.Check
                inline
                label="Male"
                name="gender"
                checked={addSalesMan.gender === 0 && true}
                type="radio"
                value={addSalesMan.gender}
                id={`inline-${"radio"}-1`}
                onChange={(e) => {
                  handleChangeInput("gender", 0);
                }}
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                checked={addSalesMan.gender === 1 && true}
                value={addSalesMan.gender}
                type="radio"
                id={`inline-${"radio"}-1`}
                onChange={(e) => {
                  handleChangeInput("gender", 1);
                }}
              />
              <Form.Check
                inline
                label="Other"
                name="gender"
                checked={addSalesMan.gender === 2 && true}
                value={addSalesMan.gender}
                type="radio"
                id={`inline-${"radio"}-1`}
                onChange={(e) => {
                  handleChangeInput("gender", 2);
                }}
              />
            </div>
          </div>
        </CCol>
        <CCol md="6">
          <div className="my-3">
            <strong htmlFor="basic-url">
              Upfront Percentage £ <span style={{ color: "#dd2c00" }}>*</span>
            </strong>
            <Form.Control
              type="number"
              className="form-control mt-2"
              style={{ fontSize: "large" }}
              name="upfront_percentage  "
              value={addSalesMan.upfront_percentage}
              onChange={(e) =>
                handleChangeInput("upfront_percentage", e.target.value)
              }
            />
          </div>
        </CCol>
        <CCol md="6">
          <div className="my-3">
            <strong htmlFor="basic-url">
              Residual Percentage % <span style={{ color: "#dd2c00" }}>*</span>
            </strong>
            <Form.Control
              type="number"
              className="form-control mt-2"
              style={{ fontSize: "large" }}
              name="residual_percentage  "
              value={addSalesMan.residual_percentage}
              required
              onChange={(e) =>
                handleChangeInput("residual_percentage", e.target.value)
              }
            />
          </div>
        </CCol>
        <CCol md="12">
          <div className="my-3">
            <label htmlFor="basic-url">
              <strong
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#3c4b64",
                }}
              >
                Country <span style={{ color: "#dd2c00" }}>*</span>
              </strong>
            </label>
            <div className=" mt-2">
              <Autocomplete
                size="small"
                options={countryList}
                onChange={(event, newValue) =>
                  handleChangeInput(
                    "country",
                    newValue === null ? null : newValue.id
                  )
                }
                value={countryList?.[getTradingcountryIndex()] || null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        backgroundColor: "#fff",
                        borderRadius: "0.375rem",
                        // border: "1px solid #ced4da",
                        fontSize: "1rem",
                        padding: "5px 12px",
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className=" mt-4 d-flex justify-content-end gap-2">
            <Button variant="info" onClick={() => navigate(`/salesman-list`)}>
              Back
            </Button>
            <Button
              onClick={() => {
                addSalesMan.id
                  ? handleUpdate(addSalesMan)
                  : handleSubmit(addSalesMan);
              }}
            >
              {addSalesMan.id ? "Update" : "Create"}
            </Button>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default CreateSalesMan;
