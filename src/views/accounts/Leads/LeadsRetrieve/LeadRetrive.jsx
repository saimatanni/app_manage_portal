import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useDispatch, useSelector } from "react-redux";

import RetrieveLeadInfo from "./RetrieveLeadInfo";

import PropTypes from "prop-types";
import RetrieveService from "./RetrieveService";
import RetrieveCostAnalysis from "./RetrieveCostAnalysis";
import {
  GetCountryList,
  GetIndustryList,
  GetLeadsnput,

  LeadUpdatedData,
  SetLeadsStatusFalse,
  UpdateLeads,
} from "../_redux/action/LeadAction";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";


import { Modal } from "react-bootstrap";

import Cookies from 'js-cookie'; // Import js-cookie
const steps = ["Lead Information", "Service", "Cost Analysis"];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#38b6ff 0%,#38b6ff 50%,#38b6ff 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#38b6ff 0%,#38b6ff 50%,#38b6ff 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 5,
    border: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#D9D9D9",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 95deg,#38b6ff 0%,#38b6ff 50%,#38b6ff 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 95deg,#38b6ff 0%,#38b6ff 50%,#38b6ff 100%)",
  }),
}));
const myStyle = {
  background: "#38b6ff",
  color: "white",
  transition: "background-color 0.3s ease-in-out",
  // Add a hover condition
  ":hover": {
    background: "#004aad",
  },
};
// const btn_disable = {
//   background: "#38b6ff",

//   color: "white",
//   transition: "background-color 0.3s ease-in-out",
//   opacity: ".5",
//   // Add a hover condition
//   ":hover": {
//     background: "#004aad",
//   },
// };
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  ColorlibStepIcon.propTypes = {
    active: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
    className: PropTypes.string,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    ></ColorlibStepIconRoot>
  );
}
const LeadRetrive = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const isLoadLeads = useSelector((state) => state.leadInfo.isLoadLeads);
  const afterSuccessLeads = useSelector(
    (state) => state.leadInfo.afterSuccessLeads
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
 
  const [activeStep, setActiveStep] = React.useState(
    localStorage.getItem("activeStep")
      ? parseInt(localStorage.getItem("activeStep"))
      : 0
  );

  const [submit, setSubmit] = useState(false);
  const handleEditLead = (data) => {
    dispatch(GetLeadsnput("sales_partner", userData.id));
    dispatch(GetLeadsnput("partner_manager", userData.partner_manager));
    dispatch(GetLeadsnput("user", userData.id));
    dispatch(GetLeadsnput("lead_source", 1));
    if (
      parseFloat(leadInput.visa_debit_pr) < 0.35 ||
      parseFloat(leadInput.mastercard_debit_pr) < 0.38 ||
      parseFloat(leadInput.visa_credit_pr) < 0.65 ||
      parseFloat(leadInput.mastercard_credit_pr) < 0.65 ||
      parseFloat(leadInput.visa_business_debit_pr) < 0.2
    ) {
      setSubmit(true);
    } else {
      dispatch(UpdateLeads(data));
    }
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbe
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  React.useEffect(() => {
    const leadId = localStorage.getItem("leadId");
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(GetIndustryList(1));
    dispatch(GetCountryList());
    dispatch(LeadUpdatedData(leadId));
  }, []);
  const userData = JSON.parse(Cookies.get("userData"));
  React.useEffect(() => {
    dispatch(GetLeadsnput("sales_partner", userData.id));
    dispatch(GetLeadsnput("partner_manager", userData.partner_manager));
    dispatch(GetLeadsnput("user", userData.id));
    dispatch(GetLeadsnput("lead_source", 1));
  }, []);

  const LeadInfoValidation = () => {
    if (
      leadInput.first_name?.length === 0 ||
      leadInput.lead_type === 0 ||
      leadInput.last_name?.length === 0 ||
      leadInput.legal_name?.length === 0 ||
      leadInput.trading_name?.length === 0 ||
      emailDetails?.message === "Invalid Email Provided" ||
      !Phone_regex.test(leadInput.mobile) ||
      (leadInput.email !== null &&
        leadInput.email !== "" &&
        !regEmail.test(leadInput.email)) ||
      leadInput.mobile?.length === 0 ||
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
    if (
      leadInput.legal_postcode?.length === 0 ||
      leadInput.legal_address1?.length === 0 ||
      leadInput.legal_country?.length === 0 ||
      leadInput.legal_country === null ||
      leadInput.legal_city?.length === 0
    ) {
      return false;
    }

    return true;
  };
  
  const porductvalidation = () => {
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
    for (const product of leadInput.terminal_products) {
      if (!product.lead_id) delete product.lead_id;
      if (
        leadInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.terminal_provider === null ||
          product?.terminal_provider === "")
      ) {
        return false;
      }
      if (
        leadInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.terminal_option === null || product?.terminal_option === "")
      ) {
        return false;
      }
      if (
        leadInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.integration_availability === null ||
          product?.integration_availability === "")
      ) {
        return false;
      }
      if (
        leadInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        product?.integration_availability === "INTEGRATED" &&
        (product?.epos_name === "" || product?.epos_name === null)
      ) {
        return false;
      }
      if (
        leadInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.product === "" || product?.product === null)
      ) {
        return false;
      }
      if (leadInput.card_machine_service === true) {
        if (
          product.has_old_card_provider === "" ||
          product.has_old_card_provider === null
        ) {
          return false;
        }
        if (product.has_old_card_provider === true) {
          if (
            product.previous_acquirer === "" ||
            product.previous_acquirer === null
          ) {
            return false;
          }
        }
      }
    }
    for (const product of leadInput.ecommerce_products) {
      if (!product.lead_id) delete product.lead_id;
      // ====ecom product===========
      if (
        leadInput.ecom_service === true &&
        (product?.product_type === null || product?.product_type === "")
      ) {
        return false;
      }
      if (
        leadInput.ecom_service === true &&
        (product.product_type === "ecom" ||
          product?.product_type === "VT" ||
          product?.product_type === "pay_by_link" ||
          product?.product_type === "ecom_VT") &&
        (product?.getway_provider === "" || product?.getway_provider === null)
      ) {
        return false;
      }
      if (
        leadInput.ecom_service === true &&
        (product.product_type === "ecom" ||
          product?.product_type === "ecom_VT") &&
        (product?.website_url === "" || product?.website_url === null)
      ) {
        return false;
      }
    }
    for (const product of leadInput.epos_products) {
      // =======epos=============
      if (!product.lead_id) delete product.lead_id;
      if (
        leadInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.epos_option === null || product?.epos_option === "")
      ) {
        return false;
      }
      if (
        leadInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.epos_provider === null || product?.epos_provider === "")
      ) {
        return false;
      }
      if (
        leadInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.service_option === null || product?.service_option === "")
      ) {
        return false;
      }
      // if (
      //   leadInput.epos_service === true &&
      //   product.product_type === "epos" &&
      //   (product?.price === null || product?.price === "")
      // ) {
      //   return false;
      // }
      if (
        leadInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.integration_availability === null ||
          product?.integration_availability === "")
      ) {
        return false;
      }
      if (
        leadInput.epos_service === true &&
        product.product_type === "epos" &&
        product?.integration_availability === "INTEGRATED" &&
        (product?.integrated_with === null || product?.integrated_with === "")
      ) {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    if (afterSuccessLeads === true) {
      navigate(`/leads`);
      dispatch(SetLeadsStatusFalse());
      setSubmit(false);
    }
  }, [afterSuccessLeads]);

  useEffect(() => {
    if (LeadInfoValidation()) {
      setActiveStep(1);
    }
    if (LeadInfoValidation() && porductvalidation()) {
      setActiveStep(2);
    }
  }, []);
  useEffect(() => {
    // Save the active step to localStorage when it changes
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <>
      <Modal
        show={submit}
        onHide={() => setSubmit(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ color: "#1E2553 ", marginTop: "15px" }}>
          <h4>
            Are you sure, you want to proceed with low rates? Need
            Administrative approval.
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{ background: "red" }}
            className="custom-btn  flex mx-2 "
            onClick={() => setSubmit(false)}
          >
            No
          </button>
          <button
            className="    custom-btn  flex mx-2 "
            onClick={() => {
              dispatch(UpdateLeads(leadInput));
            }}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
      {isLoadLeads && (
        <>
          {/* <Loader /> */}
          <Backdrop
            open
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      <div className="container-fluid">
        <Box>
          <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<ColorlibConnector />}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel style={{cursor:"pointer"}}
                      {...labelProps}
                      StepIconComponent={ColorlibStepIcon}
                      onClick={handleStep(index)}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Stack>
          {activeStep === steps.length ? (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {/* <NewLeadTab next={handleNext} /> */}
                  <RetrieveLeadInfo next={handleNext} />
                </Typography>
              )}
              {activeStep === 1 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <RetrieveService
                  //   next={handleNext}
                  />
                </Typography>
              )}
              {activeStep === 2 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <RetrieveCostAnalysis />
                </Typography>
              )}

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
                  <>
                    <Button
                      // disabled={ServiceValidationCheck() ? false : true}
                      sx={{ mr: 1 }}
                      // style={ServiceValidationCheck() ? myStyle : btn_disable}
                      style={myStyle}
                      onClick={() => handleEditLead(leadInput)}
                    >
                      Update
                    </Button>
                    {/* {isLoadLeads ? (
                      <Button
                       
                        sx={{ mr: 1 }}
                       
                      >
                        <div className="d-flex align-items-center justify-content-center gap-2 ">
                          Updating
                       
                        </div>
                      </Button>
                    ) : (
                      <Button
                        // disabled={ServiceValidationCheck() ? false : true}
                        sx={{ mr: 1 }}
                        // style={ServiceValidationCheck() ? myStyle : btn_disable}
                        style={myStyle}
                        onClick={() => handleEditLead(leadInput)}
                      >
                        Update
                      </Button>
                    )} */}
                  </>
                ) : activeStep === 0 ? (
                  <Button
                    // disabled={LeadInfoValidation() ? false : true}
                    onClick={handleNext}
                    // onClick={LeadInfoValidation2}
                    sx={{ mr: 1 }}
                    style={myStyle}
                    // style={LeadInfoValidation() ? myStyle : btn_disable}
                  >
                    Next
                  </Button>
                ) : (
                  activeStep === 1 && (
                    <Button
                      // disabled={porductvalidation() ? false : true}
                      // onClick={productValidation2}
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      style={porductvalidation() ? myStyle : myStyle}
                    >
                      Next
                    </Button>
                  )
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </>
  );
};

export default LeadRetrive;
