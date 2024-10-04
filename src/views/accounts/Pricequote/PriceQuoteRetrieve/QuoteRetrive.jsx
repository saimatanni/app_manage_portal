import React from "react";
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
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import PriceQuoteRetrieveInfo from "./PriceQuoteRetrieveInfo";
import ProductDetails from "./ProductDetails";

import {
  GetCountryList,
  GetIndustryList,
} from "../../Leads/_redux/action/LeadAction";
import {
  GetPricequoteInput,
  SetPricequoteUpdatedData,
  SubmitPriceQuoteInput,
} from "../_redux/action/PriceQuoteAction";
import QuoteScheduleOfFees from "./QuoteScheduleOfFees";

import Cookies from 'js-cookie'; // Import js-cookie
const steps = ["Leads", "Product Details", "Schedule Of Fees"];
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
const QuoteRetrive = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  const aftersuccessQuote = useSelector(
    (state) => state.quoteInfo.aftersuccessQuote
  );
  const isLoadQuote = useSelector((state) => state.quoteInfo.isLoadQuote);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbe
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";


    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(GetIndustryList());
    dispatch(GetCountryList());
  }, []);
  useEffect(() => {
    if (aftersuccessQuote) {
      navigate("/opportunity");
    }
  }, [aftersuccessQuote]);

  
  const userData = JSON.parse(Cookies.get("userData"));
  React.useEffect(() => {
    dispatch(GetPricequoteInput("sales_partner", userData.id));
    dispatch(GetPricequoteInput("partner_manager", userData.partner_manager));
    dispatch(GetPricequoteInput("user", userData.id));
    dispatch(GetPricequoteInput("lead_source", 1));
    const quote_slug =localStorage.getItem("quoteId")
    const quote_id =localStorage.getItem("quote_id")
    if(quote_slug || quote_id){
      dispatch(SetPricequoteUpdatedData(quote_slug));
    }

  }, []);
  const handleAddPricequote = (data) => {
    dispatch(SubmitPriceQuoteInput(data));
  };
  const quoteInfoValidation = () => {
    if (
      priceQuoteInput.first_name?.length === 0 ||
      priceQuoteInput.industry_type?.length === 0 ||
      priceQuoteInput.mcc_code?.length === 0 ||
      priceQuoteInput.last_name?.length === 0 ||
      priceQuoteInput.legal_name?.length === 0 ||
      emailDetails?.message === "Invalid Email Provided" ||
      priceQuoteInput.trading_name?.length === 0 ||
      !Phone_regex.test(priceQuoteInput.mobile) ||
      priceQuoteInput.email?.length === 0 ||
      !regEmail.test(priceQuoteInput.email) ||
      priceQuoteInput.mobile?.length === 0
    ) {
      return false;
    }

    if (
      priceQuoteInput.trading_postcode?.length === 0 ||
      priceQuoteInput.trading_address1?.length === 0 ||
      priceQuoteInput.trading_country?.length === 0 ||
      priceQuoteInput.trading_country === null ||
      priceQuoteInput.trading_city?.length === 0
    ) {
      return false;
    }
    if (
      priceQuoteInput.legal_postcode?.length === 0 ||
      priceQuoteInput.legal_address1?.length === 0 ||
      priceQuoteInput.legal_country?.length === 0 ||
      priceQuoteInput.legal_country === null ||
      priceQuoteInput.legal_city?.length === 0
    ) {
      return false;
    }

    return true;
  };

  const porductvalidation = () => {
    if (
      priceQuoteInput.acquiring_bank?.length === 0 ||
      priceQuoteInput.application_type?.length === 0
    ) {
      return false;
    }
    if (
      priceQuoteInput.application_type === 4 &&
      (priceQuoteInput.cole_from === "" || priceQuoteInput.cole_from === null)
    ) {
      return false;
    }
    if (
      priceQuoteInput.card_machine_service === false &&
      priceQuoteInput.epos_service === false &&
      priceQuoteInput.ecom_service === false
    ) {
      return false;
    }
    if (
      priceQuoteInput.card_machine_service === true &&
      priceQuoteInput.terminal_products.length === 0
    ) {
      return false;
    }
    if (
      priceQuoteInput.ecom_service === true &&
      priceQuoteInput.ecommerce_products.length === 0
    ) {
      return false;
    }
    if (
      priceQuoteInput.epos_service === true &&
      priceQuoteInput.epos_products.length === 0
    ) {
      return false;
    }
    for (const product of priceQuoteInput.terminal_products) {
      if (product.is_deleted === false) {
        if (!product.lead_id) delete product.lead_id;
        if (
          priceQuoteInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.provider === null || product?.provider === "")
        ) {
          return false;
        }
        if (
          priceQuoteInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.terminal_option === null || product?.terminal_option === "")
        ) {
          return false;
        }
        if (
          priceQuoteInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.integration_availability === null ||
            product?.integration_availability === "")
        ) {
          return false;
        }
        if (
          priceQuoteInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          product?.integration_availability === "INTEGRATED" &&
          (product?.epos_name === "" || product?.epos_name === null)
        ) {
          return false;
        }
        if (
          priceQuoteInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.product === "" || product?.product === null)
        ) {
          return false;
        }
        if (priceQuoteInput.card_machine_service === true) {
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
    }
    for (const product of priceQuoteInput.ecommerce_products) {
      if (product.is_deleted === false) {
        if (!product.lead_id) delete product.lead_id;
        // ====ecom product===========
        if (
          priceQuoteInput.ecom_service === true &&
          (product?.product_type === null || product?.product_type === "")
        ) {
          return false;
        }
        if (
          priceQuoteInput.ecom_service === true &&
          (product.product_type === "ecom" ||
            product?.product_type === "VT" ||
            product?.product_type === "ecom_VT" ||
            product?.product_type === "pay_by_link") &&
          (product?.getway_provider === "" || product?.getway_provider === null)
        ) {
          return false;
        }
        if (
          priceQuoteInput.ecom_service === true &&
          (product.product_type === "ecom" ||
            product?.product_type === "ecom_VT") &&
          (product?.website_url === "" || product?.website_url === null)
        ) {
          return false;
        }
      }
    }
    for (const product of priceQuoteInput.epos_products) {
      // =======epos=============
      if (product.is_deleted === false) {
        if (!product.lead_id) delete product.lead_id;
        if (
          priceQuoteInput.epos_service === true &&
          product.product_type === "epos" &&
          (product?.epos_option === null || product?.epos_option === "")
        ) {
          return false;
        }
        if (
          priceQuoteInput.epos_service === true &&
          product.product_type === "epos" &&
          (product?.epos_provider === null || product?.epos_provider === "")
        ) {
          return false;
        }
      }
    }
    return true;
  };

  

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
   
      <div className="container-fluid">
        {isLoadQuote && (
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
              
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {/* <NewLeadTab next={handleNext} /> */}
                  <PriceQuoteRetrieveInfo next={handleNext} />
                </Typography>
              )}
              {activeStep === 1 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <ProductDetails
                  //   next={handleNext}
                  />
                </Typography>
              )}
              {activeStep === 2 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <QuoteScheduleOfFees />
                  {/* <ScheduleOfFees /> */}
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
                {activeStep == 2 ? (
                  <>
                    {isLoadQuote ? (
                      <Button
                        // disabled={ServiceValidationCheck() ? false : true}
                        sx={{ mr: 1 }}
                        // style={ServiceValidationCheck() ? myStyle : btn_disable}
                        // onClick={() => handleAddLeads(priceQuoteInput)}
                      >
                        <div className="d-flex align-items-center justify-content-center gap-2 ">
                          Updating
                          <div
                            className="spinner-border login_loader"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        // disabled={ServiceValidationCheck() ? false : true}
                        sx={{ mr: 1 }}
                        // style={ServiceValidationCheck() ? myStyle : btn_disable}
                        style={myStyle}
                        onClick={() => handleAddPricequote(priceQuoteInput)}
                      >
                        Update
                      </Button>
                    )}
                  </>
                ) : activeStep === 0 ? (
                  <Button
                    // disabled={quoteInfoValidation() ? false : true}
                    onClick={handleNext}
                    // onClick={quoteInfoValidation2}
                    sx={{ mr: 1 }}
                    style={quoteInfoValidation() ? myStyle : myStyle}
                    // style={quoteInfoValidation() ? myStyle : btn_disable}
                  >
                    Next
                  </Button>
                ) : (
                  activeStep === 1 && (
                    <Button
                      // disabled={porductvalidation() ? false : true}
                      onClick={handleNext}
                      // onClick={productValidation2}
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
   
  );
};

export default QuoteRetrive;
