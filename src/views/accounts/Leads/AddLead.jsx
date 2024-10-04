// import React from 'react'
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";

import { Typography } from "@mui/material";
import LeadCompanyType from "./leadCreate/LeadCompanyType";
import ContactInformation from "./LeadsForm/ContactInformation";
import ServiceInformation from "./LeadsForm/ServiceInformation";
import {
  GetLeadsnput,
  SetLeadsTypeStatusFalse,
  SubmitLeadsInput,
} from "./_redux/action/LeadAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import { showToast } from "src/utils/ToastHelper";
import Cookies from "js-cookie"; // Import js-cookie
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];
const AddLead = () => {
  const dispatch = useDispatch();
  const leadInput = useSelector((state) => state.leadInfo.leadInput);

  const afterSuccessLeads = useSelector(
    (state) => state.leadInfo.afterSuccessLeads
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  const isLoadLeads = useSelector((state) => state.leadInfo.isLoadLeads);
  const legalTypeInput = useSelector((state) => state.leadInfo.legalTypeInput);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed] = React.useState({});
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbeers
  const totalSteps = () => {
    return steps?.length;
  };

  const completedSteps = () => {
    return Object.keys(completed)?.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const myStyle = {
    background: "#38b6ff",
    color: "white",
    transition: "background-color 0.3s ease-in-out",
    // Add a hover condition
    ":hover": {
      background: "#004aad",
    },
  };
  const btn_disable = {
    background: "#38b6ff",

    color: "white",
    transition: "background-color 0.3s ease-in-out",
    opacity: ".5",
    // Add a hover condition
    ":hover": {
      background: "#004aad",
    },
  };

  const userData = JSON.parse(Cookies.get("userData"));
  React.useEffect(() => {
    dispatch(GetLeadsnput("sales_partner", userData.id));
    dispatch(GetLeadsnput("partner_manager", userData.partner_manager));
    dispatch(GetLeadsnput("user", userData.id));
    dispatch(GetLeadsnput("lead_source", 1));
  }, []);

  React.useEffect(() => {
    dispatch(
      GetLeadsnput("lead_products", [
        ...(leadInput?.terminal_products ?? []),
        ...(leadInput?.ecommerce_products ?? []),
        ...(leadInput?.epos_products ?? []),
      ])
    );
  }, [
    leadInput?.terminal_products,
    leadInput?.ecommerce_products,
    leadInput?.epos_products ?? [],
  ]);

  const handleAddLeads = (data) => {
    if (legalTypeInput.limited) {
      dispatch(GetLeadsnput("legal_type", legalTypeInput.limited));
    } else if (legalTypeInput.soleTrade) {
      dispatch(GetLeadsnput("legal_type", legalTypeInput.soleTrade));
    }
    dispatch(GetLeadsnput("sales_partner", userData.id));
    dispatch(GetLeadsnput("partner_manager", userData.partner_manager));
    dispatch(GetLeadsnput("user", userData.id));
    dispatch(GetLeadsnput("lead_source", 1));

    dispatch(SubmitLeadsInput(data));
  };
 
  let navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);

  const limitedValidationCheck = () => {
    if (
      legalTypeInput.limited === "" &&
      legalTypeInput.soleTrade === "" &&
      legalTypeInput.other === ""
    ) {
      return false;
    }

    if (legalTypeInput.limited === "L") {
      if (
        leadInput.legal_name?.length === 0 ||
        leadInput.contact_full_name?.length === 0
      ) {
        return false;
      }
    }
    if (legalTypeInput.other === "OT") {
      if (
        leadInput.industry_type?.length === 0 ||
        leadInput.trading_name?.length === 0 ||
        leadInput.business_type?.length === 0
      ) {
        return false;
      }
      if (
        leadInput.trading_postcode?.length === 0 ||
        leadInput.trading_address1?.length === 0 ||
        leadInput.trading_country?.length === 0 ||
        leadInput.trading_country === null ||
        leadInput.trading_city?.length === 0
      ) {
        return false;
      }
    }
    if (legalTypeInput.soleTrade !== "") {
      if (
        leadInput.industry_type?.length === 0 ||
        leadInput.trading_name?.length === 0
      ) {
        return false;
      }
      if (
        leadInput.trading_postcode?.length === 0 ||
        leadInput.trading_address1?.length === 0 ||
        leadInput.trading_city?.length === 0 ||
        leadInput.trading_country?.length === 0 ||
        leadInput.trading_country === null
      ) {
        return false;
      }
    }

    if (leadInput.site_and_trading_address_same === 1) {
      if (
        leadInput.trading_postcode?.length === 0 ||
        leadInput.trading_address1?.length === 0 ||
        leadInput.trading_country?.length === 0 ||
        leadInput.trading_country === null ||
        leadInput.trading_city?.length === 0
      ) {
        return false;
      }
    }

    return true;
  };

  const ContactValidationCheck = () => {
    if (
      leadInput.first_name?.length === 0 ||
      leadInput.last_name?.length === 0 ||
      leadInput.legal_name?.length === 0 ||
      leadInput.trading_name?.length === 0 ||
      leadInput.trading_name === null ||
      (leadInput.email !== null &&
        leadInput.email !== "" &&
        !regEmail.test(leadInput.email)) ||
      leadInput.mobile?.length === 0 ||
      emailDetails?.message === "Invalid Email Provided" ||
      !Phone_regex.test(leadInput.mobile) ||
      (!regEmail.test(leadInput.secondary_email) &&
        leadInput.secondary_email !== "" &&
        leadInput.secondary_email !== null)
    ) {
      return false;
    }

    if (
      leadInput.trading_postcode?.length === 0 ||
      leadInput.trading_address1?.length === 0 ||
      leadInput.trading_country?.length === 0 ||
      leadInput.trading_country === null ||
      leadInput.trading_city?.length === 0
    ) {
      return false;
    }

    return true;
  };
  const ServiceValidationCheck = () => {
    if (
      leadInput.card_machine_service === false &&
      leadInput.epos_service === false &&
      leadInput.ecom_service === false
    ) {
      return false;
    }
    if (
      leadInput.card_machine_service === true &&
      leadInput.terminal_products.length === 0
    ) {
      return false;
    }
    if (
      leadInput.ecom_service === true &&
      leadInput.ecommerce_products.length === 0
    ) {
      return false;
    }
    if (
      leadInput.epos_service === true &&
      leadInput.epos_products.length === 0
    ) {
      return false;
    }
    if (leadInput.lead_type.length === 0) {
      return false;
    }
    if (leadInput.card_machine_service === true) {
      if (leadInput.terminal_products[0]?.has_old_card_provider === "") {
        return false;
      }
      if (leadInput.terminal_products[0]?.has_old_card_provider === true) {
        if (leadInput.terminal_products[0]?.previous_acquirer === "") {
          return false;
        }
      }
      if (leadInput.terminal_products[0]?.integration_availability === "") {
        return false;
      }
      if (
        leadInput.terminal_products[0]?.integration_availability ===
        "INTEGRATED"
      ) {
        if (
          leadInput?.terminal_products[0]?.epos_name === "" ||
          leadInput?.terminal_products[0]?.epos_name === null
        ) {
          return false;
        }
      }
    }

    if (leadInput.ecom_service === true) {
      if (leadInput.ecommerce_products[0]?.product_type === "") {
        return false;
      }
    }
    if (
      leadInput.ecommerce_products[0]?.product_type === "ecom" ||
      leadInput.ecommerce_products[0]?.product_type === "ecom_VT"
    ) {
      if (leadInput?.ecommerce_products[0]?.website_url === "") {
        return false;
      }
    }

    if (leadInput.epos_service === true) {
      if (leadInput.epos_products[0]?.epos_option === "") {
        return false;
      }
    }
   
    return true;
  };

  //popup validation
  const limitedValidationCheck2 = () => {
    if (
      legalTypeInput.limited === "" &&
      legalTypeInput.soleTrade === "" &&
      legalTypeInput.other === ""
    ) {
      showToast("error", "Legal type shouldn't be empty");
      return 0;
    }

    if (legalTypeInput.limited === "L") {
      if (leadInput.legal_name?.length === 0) {
        showToast("error", "Legal name shouldn't be empty");
        return 0;
      }
      if (leadInput.contact_full_name?.length === 0) {
        showToast("error", "Contact name shouldn't be empty");
        return 0;
      }
    }
    if (legalTypeInput.other === "OT" || legalTypeInput.soleTrade !== "") {
     
      if (!leadInput.trading_name) {
        showToast("error", "Trading_name  shouldn't be empty");
        return 0;
      }
      if (leadInput.industry_type?.length === 0) {
        showToast("error", "Industry_type  shouldn't be empty");
        return 0;
      }

      if (leadInput.trading_postcode?.length === 0) {
        showToast("error", "Trading  postcode should not be empty");
        return 0;
      }
      if (leadInput.trading_address1?.length === 0) {
        showToast("error", "Trading address1 should not be empty");
        return 0;
      }
      if (
        leadInput.trading_country?.length === 0 ||
        leadInput.trading_country === null
      ) {
        showToast("error", "Trading country should not be empty");
        return 0;
      }
      if (leadInput.trading_city?.length === 0) {
        showToast("error", "Trading_city should not be empty");
        return 0;
      }
    }
    

    if (leadInput.site_and_trading_address_same === 1) {
      if (leadInput.trading_postcode?.length === 0) {
        showToast("error", "Trading  postcode should not be empty");
        return 0;
      }
      if (leadInput.trading_address1?.length === 0) {
        showToast("error", "Trading address1 should not be empty");
        return 0;
      }
      if (
        leadInput.trading_country?.length === 0 ||
        leadInput.trading_country === null
      ) {
        showToast("error", "Trading country should not be empty");
        return 0;
      }
      if (leadInput.trading_city?.length === 0) {
        showToast("error", "Trading_city should not be empty");
        return 0;
      }
    }

    handleNext();
  };
  const contactvalidation2 = () => {
    if (leadInput.first_name?.length === 0) {
      showToast("error", "First  name should not be empty");
      return 0;
    }
    if (leadInput.last_name?.length === 0) {
      showToast("error", "Last  name should not be empty");
      return 0;
    }
    if (leadInput.legal_name?.length === 0) {
      showToast("error", "Legal  name should not be empty");
      return 0;
    }
    if (!leadInput.trading_name) {
      showToast("error", "Trading  name should not be empty");
      return 0;
    }

    if (leadInput.mobile?.length === 0) {
      showToast("error", "Mobile should not be empty");
      return 0;
    }
    if (!Phone_regex.test(leadInput.mobile)) {
      showToast("error", "Enter a valid mobile number start with 07");
      return 0;
    }
    if (leadInput.trading_postcode?.length === 0) {
      showToast("error", "Trading  postcode should not be empty");
      return 0;
    }
    if (leadInput.trading_address1?.length === 0) {
      showToast("error", "Trading address1 should not be empty");
      return 0;
    }
    if (
      leadInput.trading_country?.length === 0 ||
      leadInput.trading_country === null
    ) {
      showToast("error", "Trading country should not be empty");
      return 0;
    }
    if (leadInput.trading_city?.length === 0) {
      showToast("error", "Trading_city should not be empty");
      return 0;
    }
    handleNext();
  };
  const servicevalidation2 = () => {
    if (leadInput.lead_type.length === 0) {
      showToast("error", "Lead type should not be empty");
      return 0;
    }
    if (
      leadInput.card_machine_service === false &&
      leadInput.epos_service === false &&
      leadInput.ecom_service === false
    ) {
      showToast("error", "Product type shouldn't be empty");
      return 0;
    }
    if (
      leadInput.card_machine_service === true &&
      leadInput.terminal_products.length === 0
    ) {
      showToast("error", "Terminal product shouldn't be empty");
      return 0;
    }
    if (
      leadInput.ecom_service === true &&
      leadInput.ecommerce_products.length === 0
    ) {
      showToast("error", "Ecom product shouldn't be empty");
      return 0;
    }
    if (
      leadInput.epos_service === true &&
      leadInput.epos_products.length === 0
    ) {
      showToast("error", "Epos product shouldn't be empty");
      return 0;
    }

    if (leadInput.card_machine_service === true) {
      if (leadInput.terminal_products[0]?.has_old_card_provider === "") {
        showToast("error", "Old card provider shouldn't be empty");
        return 0;
      }
      if (leadInput.terminal_products[0]?.has_old_card_provider === true) {
        if (leadInput.terminal_products[0]?.previous_acquirer === "") {
          showToast("error", "Previous_acquirer shouldn't be empty");
          return 0;
        }
      }
      if (leadInput.terminal_products[0]?.integration_availability === "") {
        showToast("error", "Integration_availability shouldn't be empty");
        return 0;
      }
      if (
        leadInput.terminal_products[0]?.integration_availability ===
        "INTEGRATED"
      ) {
        if (
          leadInput?.terminal_products[0]?.epos_name === "" ||
          leadInput?.terminal_products[0]?.epos_name === null
        ) {
          showToast("error", "Epos_name shouldn't be empty");
          return 0;
        }
      }
    }
    if (leadInput.ecom_service === true) {
      if (leadInput.ecommerce_products[0]?.product_type === "") {
        showToast("error", "Product_type shouldn't be empty");
        return 0;
      }
    }
    if (
      leadInput.ecommerce_products[0]?.product_type === "ecom" ||
      leadInput.ecommerce_products[0]?.product_type === "ecom_VT"
    ) {
      if (leadInput?.ecommerce_products[0]?.website_url === "") {
        showToast("error", "Website_url shouldn't be empty");
        return 0;
      }
    }

    if (leadInput.epos_service === true) {
      if (leadInput.epos_products[0]?.epos_option === "") {
        showToast("error", "Epos_option shouldn't be empty");
        return 0;
      }
    }
    handleAddLeads(leadInput);
  };
  React.useEffect(() => {
    if (afterSuccessLeads === true) {
      // dispatch(SetLeadsStatusFalse());
      dispatch(SetLeadsTypeStatusFalse());
      navigate("/leads");
    }
  }, [afterSuccessLeads]);

  return (
    <>
      {isLoadLeads && (
        <>
          <Backdrop
            open
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      <div
        className=""
        // style={{ position: "absolute", opacity: 0, zIndex: -1 }}
      >
        {/* <NewCostAnalysisPdf cRef={cRef} /> */}
      </div>
      <Box
        className="container"
        sx={{
          width: "100%",
          background: "white",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 8px 24px rgba(149,157,165,.2)",
        }}
      >
        <Stepper nonLinear activeStep={activeStep} style={{ display: "none" }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {/* <LeadTab/> */}
                  <LeadCompanyType />
                </Typography>
              )}
              {activeStep === 1 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <ContactInformation />
                </Typography>
              )}
              {activeStep === 2 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <ServiceInformation />
                </Typography>
              )}
              {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography> */}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep !== 0 && (
                  <Button
                    style={myStyle}
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}

                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === 2 ? (
                  <Button
                    // disabled={ServiceValidationCheck() ? false : true}
                    sx={{ mr: 1 }}
                    style={ServiceValidationCheck() ? myStyle : btn_disable}
                    onClick={() => servicevalidation2()}
                  >
                    Create
                  </Button>
                ) : activeStep === 0 ? (
                  <Button
                    // disabled={limitedValidationCheck() ? false : true}
                    // disabled={limitedValidationCheck() ? true : false}
                    onClick={limitedValidationCheck2}
                    sx={{ mr: 1 }}
                    style={limitedValidationCheck() ? myStyle : myStyle}
                    // style={limitedValidationCheck() ? myStyle : btn_disable}
                  >
                    Next
                  </Button>
                ) : (
                  activeStep === 1 && (
                    <Button
                      // disabled={ContactValidationCheck() ? false : true}
                      onClick={contactvalidation2}
                      sx={{ mr: 1 }}
                      style={ContactValidationCheck() ? myStyle : myStyle}
                    >
                      Next
                    </Button>
                  )
                )}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </>
  );
};

export default AddLead;
