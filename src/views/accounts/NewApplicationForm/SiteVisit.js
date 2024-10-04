import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import resume from "../../../assets/img/resume.svg";
import DatePicker from "react-date-picker";
import Cookies from "js-cookie"; // Import js-cookie
import { GetApplicationInput } from "../NewApplication/_redux/action/ApplicationAction";
export default function SiteVisit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(Cookies.get("userData"));
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const handleChangeInput = (name, value, e) => {
    dispatch(GetApplicationInput(name, value, e));
  };
  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return "";
  };
  useEffect(() => {
    if (!applicationInput.s_squire_meters) {
      dispatch(GetApplicationInput("s_squire_meters", "1000_PLUS"));
    }
  }, []);
  useEffect(() => {
    dispatch(
      GetApplicationInput("application_products", [
        ...(priceQuoteInput?.terminal_products ?? []),
        ...(priceQuoteInput?.ecommerce_products ?? []),
        ...(priceQuoteInput?.epos_products ?? []),
      ])
    );

    if (
      applicationInput.s_individual_sales_representatives === null ||
      applicationInput.s_individual_sales_representatives === ""
    ) {
      dispatch(
        GetApplicationInput(
          "s_individual_sales_representatives",
          userData.first_name + " " + userData.last_name
        )
      );
    }
  }, []);
  
  useEffect(() => {
    if (applicationInput?.s_is_business_open === true) {
      dispatch(GetApplicationInput("s_business_start_date", null));
    }
    if (applicationInput?.s_location_type === "OTHER") {
      dispatch(GetApplicationInput("s_specific_location", "HIGH STREET"));
    }
  }, [applicationInput?.s_is_business_open, applicationInput?.s_location_type]);
  useEffect(() => {
    let activeStep = parseInt(localStorage.getItem("activeStep"));
    if (activeStep !== 9) {
      const handleScroll = () => {
        window.scrollTo(0, 0);
      };

      // Scroll to top when component mounts
      handleScroll();

      // Scroll to top on navigate
      const scrollOnNavigate = () => {
        handleScroll();
      };

      // Attach scrollOnNavigate as a listener to the beforeunload event
      window.addEventListener("beforeunload", scrollOnNavigate);

      // Cleanup the event listener when component unmounts
      return () => {
        window.removeEventListener("beforeunload", scrollOnNavigate);
      };
    }
  }, []);
  return (
    <div className="leads">
      <img src={resume} width="25" alt="" />
      <strong> Site Visit </strong>
      <br />
      <br />
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Trading Name<span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control my-3"
              name="trading_name"
              value={applicationInput.trading_name}
              onChange={(e) => {
                handleChangeInput("trading_name", e.target.value.toUpperCase());
              }}
            />
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Legal Name<span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control my-3"
              name="legal_name"
              value={applicationInput.legal_name}
              onChange={(e) => {
                handleChangeInput("legal_name", e.target.value.toUpperCase());
              }}
            />
          </div>
        </div>
        <hr />
        <div className="row my-3">
          <div className="col-md-4 col-lg-3">
            <p>
              Location Type: <span style={{ color: "#dd2c00" }}>*</span>
            </p>
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="d-flex flex-column flex-lg-row gap-3">
              <Button
                // className="my-2 mx-2"
                onClick={() =>
                  handleChangeInput("s_location_type", "SHOPPING_CENTRE")
                }
                size="small"
                variant={
                  applicationInput.s_location_type === "SHOPPING_CENTRE"
                    ? "contained"
                    : "outlined"
                }
                // variant="outlined"
              >
                Shopping center
              </Button>
              <Button
                // className="my-2 mx-2"
                onClick={() =>
                  handleChangeInput("s_location_type", "OFFICE_BUILDING")
                }
                size="small"
                variant={
                  applicationInput.s_location_type === "OFFICE_BUILDING"
                    ? "contained"
                    : "outlined"
                }
              >
                Office Building
              </Button>

              <Button
                // className="my-2 mx-2"
                onClick={() =>
                  handleChangeInput("s_location_type", "INDUSTRIAL_ESTATE")
                }
                size="small"
                variant={
                  applicationInput.s_location_type === "INDUSTRIAL_ESTATE"
                    ? "contained"
                    : "outlined"
                }
              >
                Industrial Estate
              </Button>
              <Button
                // className="my-2 mx-2"
                onClick={() => handleChangeInput("s_location_type", "HOME")}
                size="small"
                variant={
                  applicationInput.s_location_type === "HOME"
                    ? "contained"
                    : "outlined"
                }
              >
                Home
              </Button>
              <Button
                // className="my-2 mx-2"
                onClick={() => handleChangeInput("s_location_type", "OTHER")}
                size="small"
                variant={
                  applicationInput.s_location_type === "OTHER"
                    ? "contained"
                    : "outlined"
                }
              >
                Other
              </Button>
            </div>
          </div>
        </div>
        {applicationInput.s_location_type === "OTHER" && (
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Specific Location<span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control my-3"
              name="s_specific_location"
              value={applicationInput.s_specific_location}
              onChange={(e) => {
                handleChangeInput("s_specific_location", e.target.value);
              }}
            />
          </div>
        )}
        <hr />
        <div className="row my-3">
          <div className="col-md-4 col-lg-3">
            <p>
              Customer Lives Above The Premises:{" "}
              <span style={{ color: "#dd2c00" }}>*</span>
            </p>
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="d-md-flex gap-3  mb-form">
              <Button
                className="mx-2"
                onClick={() => handleChangeInput("s_customer_lives", 1)}
                size="small"
                variant={
                  applicationInput.s_customer_lives === 1
                    ? "contained"
                    : "outlined"
                }
              >
                Yes
              </Button>
              <Button
                className="mx-2"
                onClick={() => handleChangeInput("s_customer_lives", 2)}
                size="small"
                variant={
                  applicationInput.s_customer_lives === 2
                    ? "contained"
                    : "outlined"
                }
              >
                No
              </Button>
            </div>
          </div>
        </div>
        <hr />

        <div className="row my-3">
          <div className="col-md-4 col-lg-3">
            <p>
              Location Environment: <span style={{ color: "#dd2c00" }}>*</span>
            </p>
          </div>
          <div className="col-8 col-lg-9">
            <div className="d-flex flex-column flex-lg-row gap-3  mb-form">
              <Button
                onClick={() =>
                  handleChangeInput(
                    "s_location_environment",

                    "BUSINESS_DISTRICT"
                  )
                }
                size="small"
                variant={
                  applicationInput.s_location_environment ===
                  "BUSINESS_DISTRICT"
                    ? "contained"
                    : "outlined"
                }
              >
                Business District
              </Button>
              <Button
                onClick={() =>
                  handleChangeInput(
                    "s_location_environment",
                    "INDUSTRIAL_ESTATE"
                  )
                }
                size="small"
                variant={
                  applicationInput.s_location_environment ===
                  "INDUSTRIAL_ESTATE"
                    ? "contained"
                    : "outlined"
                }
              >
                Industrial Estate
              </Button>
              <Button
                onClick={() =>
                  handleChangeInput("s_location_environment", "RESIDENTIAL")
                }
                size="small"
                variant={
                  applicationInput.s_location_environment === "RESIDENTIAL"
                    ? "contained"
                    : "outlined"
                }
              >
                Residential
              </Button>
              <Button
                onClick={() =>
                  handleChangeInput("s_location_environment", "RETAIL")
                }
                size="small"
                variant={
                  applicationInput.s_location_environment === "RETAIL"
                    ? "contained"
                    : "outlined"
                }
              >
                Retail
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <div className="row">
            <div className="col-4 col-lg-3">
              <p>
                {" "}
                Condition of Vicinity{" "}
                <span style={{ color: "#dd2c00" }}>*</span>
              </p>
            </div>
            <div className="col-8 col-lg-9">
              <div className="d-flex flex-column flex-lg-row gap-3">
                <Button
                  onClick={() =>
                    handleChangeInput("s_condition_of_vicinity", "WELL_KEPT")
                  }
                  size="small"
                  variant={
                    applicationInput.s_condition_of_vicinity === "WELL_KEPT"
                      ? "contained"
                      : "outlined"
                  }
                >
                  Well Kept
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_condition_of_vicinity", "REGENERATION")
                  }
                  size="small"
                  variant={
                    applicationInput.s_condition_of_vicinity === "REGENERATION"
                      ? "contained"
                      : "outlined"
                  }
                >
                  Regeneration
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput(
                      "s_condition_of_vicinity",
                      "DETERIORATION"
                    )
                  }
                  size="small"
                  variant={
                    applicationInput.s_condition_of_vicinity === "DETERIORATION"
                      ? "contained"
                      : "outlined"
                  }
                >
                  Deterioration
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <div className="row">
            <div className="col-4 col-lg-3">
              <p>
                {" "}
                Square Metres <span style={{ color: "#dd2c00" }}>*</span>
              </p>
            </div>
            <div className="col-8 col-lg-9">
              <div className="d-flex flex-column flex-lg-row gap-3">
                <Button
                  onClick={() =>
                    handleChangeInput("s_squire_meters", "LESS_THAN_250")
                  }
                  size="small"
                  variant={
                    applicationInput.s_squire_meters === "LESS_THAN_250"
                      ? "contained"
                      : "outlined"
                  }
                >
                  250
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_squire_meters", "251_500")
                  }
                  size="small"
                  variant={
                    applicationInput.s_squire_meters === "251_500"
                      ? "contained"
                      : "outlined"
                  }
                >
                  251-500
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_squire_meters", "501_1000")
                  }
                  size="small"
                  variant={
                    applicationInput.s_squire_meters === "501_1000"
                      ? "contained"
                      : "outlined"
                  }
                >
                  501-1,000
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_squire_meters", "1000_PLUS")
                  }
                  size="small"
                  variant={
                    applicationInput.s_squire_meters === "1000_PLUS"
                      ? "contained"
                      : "outlined"
                  }
                >
                  1,000+
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <div className="row">
            <div className="col-4 col-lg-3">
              <p>
                {" "}
                Premises General Appearance{" "}
                <span style={{ color: "#dd2c00" }}>*</span>
              </p>
            </div>
            <div className="col-8 col-lg-9">
              <div className="d-flex flex-column flex-lg-row gap-3">
                <Button
                  onClick={() =>
                    handleChangeInput("s_general_appearance", "VERY_GOOD")
                  }
                  size="small"
                  variant={
                    applicationInput.s_general_appearance === "VERY_GOOD"
                      ? "contained"
                      : "outlined"
                  }
                >
                  Very Good
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_general_appearance", "SATISFACTORY")
                  }
                  size="small"
                  variant={
                    applicationInput.s_general_appearance === "SATISFACTORY"
                      ? "contained"
                      : "outlined"
                  }
                >
                  Satisfactory
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_general_appearance", "POOR")
                  }
                  size="small"
                  variant={
                    applicationInput.s_general_appearance === "POOR"
                      ? "contained"
                      : "outlined"
                  }
                >
                  Poor
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <div className="row">
            <div className="col-4 col-lg-3">
              <p>
                {" "}
                Premises Ownership <span className="required">*</span>
              </p>
            </div>
            <div className="col-8 col-lg-9">
              <div className="d-sm-flex gap-3">
                <Button
                  className="my-2"
                  onClick={() => handleChangeInput("s_ownership", 1)}
                  size="small"
                  variant={
                    applicationInput.s_ownership === 1
                      ? "contained"
                      : "outlined"
                  }
                >
                  Merchant Owns
                </Button>
                <Button
                  className="my-2"
                  onClick={() => handleChangeInput("s_ownership", 2)}
                  size="small"
                  variant={
                    applicationInput.s_ownership === 2
                      ? "contained"
                      : "outlined"
                  }
                >
                  Merchant Rents
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row ">
          <div className="col-4 col-lg-3">
            <p>
              Is Business Open & Operating <span className="required">*</span>
            </p>
          </div>
          <div className="col-8 col-lg-9">
            <div className="d-sm-flex gap-3">
              <Button
                className="mx-2 my-2"
                onClick={() => handleChangeInput("s_is_business_open", true)}
                size="small"
                variant={
                  applicationInput.s_is_business_open === true
                    ? "contained"
                    : "outlined"
                }
              >
                Yes
              </Button>
              <Button
                className="mx-2 my-2"
                onClick={() => handleChangeInput("s_is_business_open", false)}
                size="small"
                variant={
                  applicationInput.s_is_business_open === false
                    ? "contained"
                    : "outlined"
                }
              >
                No
              </Button>
            </div>
          </div>
        </div>
        {applicationInput.s_is_business_open === false && (
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Start date <span style={{ color: "#dd2c00" }}>*</span>
            </label>
            <DatePicker
              format="dd/MM/yyyy"
              className="form-control  my-3"
              name="s_business_start_date"
              value={applicationInput.s_business_start_date}
              onChange={(date) =>
                handleChangeInput("s_business_start_date", date)
              }
              formatDate={formatDate}
            />
            
          </div>
        )}
        <hr />
        <div className="row ">
          <div className="col-4 col-lg-3">
            <p>
              {" "}
              Sufficient Stock for Purchase Volume{" "}
              <span className="required">*</span>
            </p>
          </div>
          <div className="col-8 col-lg-9">
            <div className="d-sm-flex gap-3">
              <Button
                className="mx-2 my-2"
                onClick={() => handleChangeInput("s_is_sufficient_stock", true)}
                size="small"
                variant={
                  applicationInput.s_is_sufficient_stock === true
                    ? "contained"
                    : "outlined"
                }
              >
                Yes
              </Button>
              <Button
                className="mx-2 my-2"
                onClick={() =>
                  handleChangeInput("s_is_sufficient_stock", false)
                }
                size="small"
                variant={
                  applicationInput.s_is_sufficient_stock === false
                    ? "contained"
                    : "outlined"
                }
              >
                No
              </Button>
            </div>
          </div>
        </div>
        {applicationInput.s_is_sufficient_stock === false && (
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Comment</label>
            <input
              type="text"
              className="form-control my-3"
              name="s_sufficient_stock_comment"
              value={applicationInput.s_sufficient_stock_comment}
              onChange={(e) => {
                handleChangeInput(
                  "s_sufficient_stock_comment",
                  e.target.value.toUpperCase()
                );
              }}
            />
          </div>
        )}
        <hr />

        <div className="row ">
          <div className="col-4 col-lg-3">
            <p>
              {" "}
              Does Stock Reflect Business Type
              <span className="required">*</span>
            </p>
          </div>
          <div className="col-8 col-lg-9">
            <div className="d-sm-flex gap-3">
              <Button
                className="mx-2 my-2"
                onClick={() =>
                  handleChangeInput("s_is_reflect_business_type", true)
                }
                size="small"
                variant={
                  applicationInput.s_is_reflect_business_type === true
                    ? "contained"
                    : "outlined"
                }
              >
                Yes
              </Button>
              <Button
                className="mx-2 my-2"
                onClick={() =>
                  handleChangeInput("s_is_reflect_business_type", false)
                }
                size="small"
                variant={
                  applicationInput.s_is_reflect_business_type === false
                    ? "contained"
                    : "outlined"
                }
              >
                No
              </Button>
            </div>
          </div>
        </div>
        {applicationInput.s_is_reflect_business_type === false && (
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Comment</label>
            <input
              type="text"
              className="form-control my-3"
              name="s_reflect_comment"
              value={applicationInput.s_reflect_comment}
              onChange={(e) => {
                handleChangeInput(
                  "s_reflect_comment",
                  e.target.value.toUpperCase()
                );
              }}
            />
          </div>
        )}
        <hr />
        <div className="row my-3">
          <div className="col-4 col-lg-3">
            <p>
              Are Card Decals Visible?<span className="required">*</span>
            </p>
          </div>
          <div className="col-8 col-lg-9">
            <div className="d-sm-flex gap-3">
              <Button
                className="mx-2 my-2"
                onClick={() =>
                  handleChangeInput("s_is_card_decels_visible", true)
                }
                size="small"
                variant={
                  applicationInput.s_is_card_decels_visible === true
                    ? "contained"
                    : "outlined"
                }
              >
                Yes
              </Button>
              <Button
                className="mx-2 my-2"
                onClick={() =>
                  handleChangeInput("s_is_card_decels_visible", false)
                }
                size="small"
                variant={
                  applicationInput.s_is_card_decels_visible === false
                    ? "contained"
                    : "outlined"
                }
              >
                No
              </Button>
            </div>
          </div>
        </div>
        {applicationInput.s_is_card_decels_visible === false && (
          <div className="row mt-3">
            <div className="col-4 col-lg-3">
              <p>
                {" "}
                Installed at Visit? <span className="required">*</span>
              </p>
            </div>
            <div className="col-8 col-lg-9">
              <div className="d-sm-flex gap-3">
                <Button
                  onClick={() =>
                    handleChangeInput("s_is_installed_at_visit", true)
                  }
                  size="small"
                  variant={
                    applicationInput.s_is_installed_at_visit === true
                      ? "contained"
                      : "outlined"
                  }
                >
                  Yes
                </Button>
                <Button
                  onClick={() =>
                    handleChangeInput("s_is_installed_at_visit", false)
                  }
                  size="small"
                  variant={
                    applicationInput.s_is_installed_at_visit === false
                      ? "contained"
                      : "outlined"
                  }
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
        <hr />
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Sales Representative<span style={{ color: "#dd2c00" }}>*</span>
              </label>
              <input
                type="text"
                // readOnly
                className="form-control my-3"
                name="s_individual_sales_representatives"
                value={applicationInput.s_individual_sales_representatives}
                onChange={(e) => {
                  handleChangeInput(
                    "s_individual_sales_representatives",
                    e.target.value?.toUpperCase()
                  );
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Name of the individual met at the premises
                <span style={{ color: "#dd2c00" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control my-3"
                name="s_name_of_individual"
                value={applicationInput.s_name_of_individual}
                onChange={(e) => {
                  handleChangeInput(
                    "s_name_of_individual",
                    e.target.value.toUpperCase()
                  );
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Date of the site visit
                <span style={{ color: "#dd2c00" }}>*</span>
              </label>
             
              <DatePicker
                format="dd/MM/yyyy"
                className="form-control  my-3"
                name="s_individual_start_date"
                value={applicationInput.s_individual_start_date}
                onChange={(date) =>
                  handleChangeInput("s_individual_start_date", date)
                }
                formatDate={formatDate}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Individual Date<span style={{ color: "#dd2c00" }}>*</span>
              </label>
             
              <DatePicker
                format="dd/MM/yyyy"
                className="form-control  my-3"
                name="s_individual_date"
                value={applicationInput.s_individual_date}
                onChange={(date) =>
                  handleChangeInput("s_individual_date", date)
                }
                formatDate={formatDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
