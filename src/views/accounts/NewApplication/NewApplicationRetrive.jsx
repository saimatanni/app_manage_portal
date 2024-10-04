import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewApplicationLeads from "../NewApplicationForm/NewApplicationLeads";
import { useEffect } from "react";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import BusinessDetails from "../NewApplicationForm/BusinessDetails";
import CustomerDetails from "../NewApplicationForm/CustomerDetails";
import BusinessProfile from "../NewApplicationForm/BusinessProfile";
import FinancialInfo from "../NewApplicationForm/FinancialInfo";
import Preview from "../NewApplicationForm/Preview";
import SiteVisit from "../NewApplicationForm/SiteVisit";
import Document from "../NewApplicationForm/Document";

import {
  GetCountryList,
  GetIndustryList,
} from "../Leads/_redux/action/LeadAction";
import {
  SetApplicationStatusFalse2,
  UpdateApplicationInput,
  SubmitNewApplicationInput,
  GetApplicationInput,
  GetAplicationDetails,
} from "./_redux/action/ApplicationAction";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import ApplicationProducts from "../NewApplicationForm/ApplicationProducts";
import AppScheduleOfFees from "../NewApplicationForm/AppScheduleOfFees";

import { showToast } from "src/utils/ToastHelper";
import Swal from "sweetalert2";
import Cookies from "js-cookie"; // Import js-cookie
import { applicationValidation } from "src/utils/CommonFunction";
import { toast } from "react-toastify";

const steps = [
  "Leads",
  "Product Details",
  "Schedule of Fees",
  "Business details",
  "Customer details",
  "Business Profile",
  "Financial Information",
  // "Schedule of Fees",

  "Site Visit",
  // "Product Details",
  "Document",

  "Preview",
  // "Sign & Confirm",
];
// step middle border
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
// step middle circle
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
const myStyle2 = {
  background: "blue",
  color: "white",
  marginRight: "8px",
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
const btn_disable2 = {
  background: "blue",
  marginRight: "8px",
  // cursor:""
  color: "white",
  transition: "background-color 0.3s ease-in-out",
  opacity: ".3",
  // Add a hover condition
  ":hover": {
    background: "#004aad",
  },
};
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

const NewApplicationRetrive = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const location = useLocation();
  const userData = JSON.parse(Cookies.get("userData"));
  // const [activeStep, setActiveStep] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(
    localStorage.getItem("activeStep")
      ? parseInt(localStorage.getItem("activeStep"))
      : 0
  );
  useEffect(() => {
    // dispatch(GetApplicationInput("user", userData.id));
    // Save the active step to localStorage when it changes
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep, userData.id]);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const Phone_regex = /^(07\d{9})$/; // regex for valid numbe
  const afterSuccessAplication = useSelector(
    (state) => state.applicationInfo.afterSuccessAplication
  );
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const isLoadApplication = useSelector(
    (state) => state.applicationInfo.isLoadApplication
  );
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const afterSuccessSigning = useSelector(
    (state) => state.applicationInfo.afterSuccessSigning
  );
  const bankDetails = useSelector((state) => state.applicationInfo.bankDetails);
  const debitBankDetails = useSelector(
    (state) => state.applicationInfo.debitBankDetails
  );
  const contactEmailDetails = useSelector(
    (state) => state.commonInfo.contactEmailDetails
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
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
  }, []);
  React.useEffect(() => {
    const newAppId = localStorage.getItem("newAppId");
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    dispatch(GetCountryList());
    dispatch(GetIndustryList());
    if (newAppId) {
      dispatch(GetAplicationDetails(newAppId));
    }
  }, []);

  useEffect(() => {
    const sitevisit = localStorage.getItem("sitevisit");
    if (afterSuccessAplication) {
      if (applicationInput.is_submitted_to_ps === true) {
        navigate(`/new-application`);
      }
      if (applicationInput.slug) {
        dispatch(GetAplicationDetails(applicationInput.slug));
      }

      dispatch(SetApplicationStatusFalse2());

      if (sitevisit !== "undefined" && sitevisit !== null) {
        setActiveStep(8);
      }
    }
  }, [afterSuccessAplication]);

  const handleSubmitAppplication = (data, submit, sitevisit, handleNext) => {
    localStorage.setItem("sitevisit", sitevisit);

    dispatch(GetApplicationInput("sales_partner", userData.id));

    dispatch(GetApplicationInput("partner_manager", userData.partner_manager));
    // dispatch(GetApplicationInput("user", userData.id));
    dispatch(GetApplicationInput("source", userData.id));
    dispatch(GetApplicationInput("lead_source", 1));
    // dispatch(GetApplicationInput("source", 1));

    dispatch(
      GetApplicationInput("application_products", [
        ...(priceQuoteInput?.terminal_products ?? []),
        ...(priceQuoteInput?.ecommerce_products ?? []),
        ...(priceQuoteInput?.epos_products ?? []),
      ])
    );
    dispatch(GetApplicationInput("secured_by_elavon", "SECURED_PCI"));
    dispatch(GetApplicationInput("product_per_month_amt", "4.50"));
    dispatch(GetApplicationInput("non_compliance_per_month", "40.00"));
    dispatch(GetApplicationInput("customer_value_per_month", "N/A"));

    if (
      bankDetails[0]?.StatusInformation === "UnknownSortCode" ||
      bankDetails[0]?.StatusInformation === "InvalidAccountNumber" ||
      debitBankDetails[0]?.StatusInformation === "UnknownSortCode" ||
      debitBankDetails[0]?.StatusInformation === "InvalidAccountNumber"
    ) {
      Swal.fire({
        title: "Error!",
        text: "Sorry, Bank information is not valid",
        icon: "error",
      });
      return 0;
    }
    if (contactEmailDetails?.message === "Invalid Email Provided") {
      Swal.fire({
        title: "Error!",
        text: "Sorry, Contact email is not valid",
        icon: "error",
      });
      return 0;
    }
    if (emailDetails?.message === "Invalid Email Provided") {
      Swal.fire({
        title: "Error!",
        text: "Sorry,Primary email is not valid",
        icon: "error",
      });
      return 0;
    }
    if (data.id) {
      dispatch(UpdateApplicationInput(data, submit, undefined, handleNext));
    } else {
      dispatch(SubmitNewApplicationInput(data, submit, undefined, handleNext));
    }
  };

  // ----------------validation----------------
  const leadInfoValidation = () => {
    if (
      applicationInput.first_name?.length === 0 ||
      applicationInput.last_name?.length === 0 ||
      applicationInput.legal_name?.length === 0 ||
      applicationInput.trading_name?.length === 0 ||
      applicationInput.email?.length === 0 ||
      emailDetails?.message === "Invalid Email Provided" ||
      !regEmail.test(applicationInput.email) ||
      !Phone_regex.test(applicationInput.mobile) ||
      applicationInput.mobile?.length === 0 ||
      (!regEmail.test(applicationInput.secondary_email) &&
        applicationInput.secondary_email !== "" &&
        applicationInput.secondary_email !== null) ||
      (applicationInput.application_type === 4 &&
        (applicationInput.cole_from === "" ||
          applicationInput.cole_from === null))
    ) {
      return false;
    }

    if (
      applicationInput.trading_postcode?.length === 0 ||
      applicationInput.trading_address1?.length === 0 ||
      applicationInput.trading_country?.length === 0 ||
      applicationInput.trading_country === null ||
      applicationInput.trading_city?.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.legal_postcode?.length === 0 ||
      applicationInput.legal_address1?.length === 0 ||
      applicationInput.legal_country?.length === 0 ||
      applicationInput.legal_country === null ||
      applicationInput.legal_city?.length === 0
    ) {
      return false;
    }

    return true;
  };
  const businessDetailsValidation = () => {
    if (
      applicationInput.vat_enabled?.length === 0 ||
      applicationInput.legal_type?.length === 0 ||
      applicationInput.legal_name?.length === 0 ||
      applicationInput.trading_name?.length === 0 ||
      applicationInput.current_ownership_since === "" ||
      applicationInput.current_ownership_since === null ||
      applicationInput.email?.length === 0 ||
      !regEmail.test(applicationInput.email) ||
      !Phone_regex.test(applicationInput.mobile) ||
      applicationInput.mobile?.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.legal_type === "L" ||
      applicationInput.legal_type === "LLP" ||
      applicationInput.legal_type === "PL"
    ) {
      if (
        applicationInput.incorporated_on === "" ||
        applicationInput.incorporated_on === null ||
        applicationInput.company_house_no === "" ||
        applicationInput.company_house_no === null ||
        applicationInput.incorporated_on === null
      ) {
        return false;
      }
    }
    if (applicationInput.vat_enabled === 0) {
      if (applicationInput.tax_id?.length === 0) {
        return false;
      }
    }
    if (applicationInput.new_to_card_proccessing === false) {
      if (applicationInput.previous_acquirer?.length === 0) {
        return false;
      }
    }

    if (
      applicationInput.trading_postcode?.length === 0 ||
      applicationInput.trading_address1?.length === 0 ||
      applicationInput.trading_country?.length === 0 ||
      applicationInput.trading_country === null ||
      applicationInput.trading_city?.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.legal_postcode?.length === 0 ||
      applicationInput.legal_address1?.length === 0 ||
      applicationInput.legal_country?.length === 0 ||
      applicationInput.legal_country === null ||
      applicationInput.legal_city?.length === 0
    ) {
      return false;
    }

    return true;
  };
  const customerDetailsValidation = () => {
    if (applicationInput.business_owners.length > 0) {
      var owner_item_count = applicationInput.business_owners.length;
      var owner_item = 0;

      var Sum = 0;
      for (
        let index = 0;
        index < applicationInput.business_owners.length;
        index++
      ) {
        if (applicationInput.business_owners[index].is_deleted === false) {
          Sum += parseInt(
            applicationInput.business_owners[index].ownership_perc
          );
        } else {
          owner_item = owner_item + 1;
        }
      }
      if (Sum !== 100 && owner_item !== owner_item_count) {
        return false;
      }
    }

    for (const business_owner of applicationInput.business_owners) {
      if (business_owner.is_deleted === false) {
        if (!business_owner?.owner_first_name) {
          return false;
        }
        if (!business_owner?.owner_title) {
          return false;
        }

        if (!business_owner?.owner_issue_date) {
          return false;
        }
        if (!business_owner?.owner_expiry_date) {
          return false;
        }
        if (
          business_owner.owner_issue_date !== "" &&
          business_owner.owner_issue_date !== null &&
          (new Date(business_owner.owner_expiry_date).getFullYear() -
            new Date().getFullYear()) *
            12 +
            (new Date(business_owner.owner_expiry_date).getMonth() -
              new Date().getMonth()) <
            3
        ) {
          return false;
        }
        if (!business_owner?.owner_id_num) {
          return false;
        }

        if (
          applicationInput.legal_type === "PART" &&
          !business_owner?.owner_email &&
          !regEmail.test(business_owner.owner_email)
        ) {
          return false;
        }
        if (
          applicationInput.legal_type === "PART" &&
          business_owner?.is_main_principal === false
        ) {
          return false;
        }
        // if (applicationInput.legal_type === "ST") {
        //   business_owner.is_director = false;

        // }
        if (!business_owner.owner_surname) {
          return false;
        }
        if (!business_owner.contact_dob) {
          return false;
        }
        if (
          business_owner.owner_nationality === "" ||
          business_owner.owner_nationality === null ||
          contactEmailDetails?.message === "Invalid Email Provided"
        ) {
          return false;
        }

        if (
          new Date().getFullYear() -
            new Date(business_owner.contact_dob).getFullYear() <
          10
        ) {
          return false;
        }
        if (
          applicationInput.legal_type === "LLP" ||
          applicationInput.legal_type === "L" ||
          applicationInput.legal_type === "PL"
        ) {
          if (
            parseInt(business_owner.ownership_perc) > 100 &&
            parseInt(business_owner.ownership_perc) < 10
          ) {
            return false;
          }
        }

        if (
          !parseInt(business_owner.owner_phone_no) ||
          !Phone_regex.test(business_owner.owner_phone_no)
        ) {
          return false;
        }
        // if (business_owner.owner_phone_no.length !== 10) {
        //   return false;
        // }
        //  if (!business_owner.business_owner_contacts[0].country_code) {
        //   showToast("error", "Owner Country  shouldn't be empty");
        //return 0
        // }
        if (!business_owner.business_owner_contacts[0]?.zip_code) {
          return false;
        }
        if (
          business_owner.business_owner_contacts[0]?.country_code === "" ||
          business_owner.business_owner_contacts[0]?.country_code === null
        ) {
          return false;
        }
        if (!business_owner.business_owner_contacts[0]?.street_line_1) {
          return false;
        }
        if (!business_owner.business_owner_contacts[0].city) {
          return false;
        }
        if (business_owner.business_owner_contacts[0].zip_code.length < 5) {
          return false;
        }
      }
    }
    return true;
  };
  const sofValidation = () => {
    if (
      applicationInput.annual_turnover?.length === 0 ||
      applicationInput.annual_card_turnover?.length === 0 ||
      applicationInput.atv?.length === 0 ||
      applicationInput?.sales_ftf_perc?.length === 0 ||
      applicationInput.sales_internet_perc?.length === 0 ||
      parseInt(applicationInput.sales_ftf_perc) +
        parseInt(applicationInput.sales_moto_perc) +
        parseInt(applicationInput.sales_internet_perc) !==
        100
    ) {
      return false;
    }
    return true;
  };
  const businessValidation = () => {
    if (
      applicationInput.desc_of_service === "" ||
      applicationInput.desc_of_service === null ||
      applicationInput.annual_turnover?.length === 0 ||
      applicationInput.annual_card_turnover?.length === 0 ||
      applicationInput.atv?.length === 0 ||
      applicationInput?.sales_ftf_perc?.length === 0 ||
      applicationInput.sales_internet_perc?.length === 0 ||
      parseInt(applicationInput.sales_ftf_perc) +
        parseInt(applicationInput.sales_moto_perc) +
        parseInt(applicationInput.sales_internet_perc) !==
        100
    ) {
      return false;
    }
    if (applicationInput.seasonal_sales === true) {
      if (
        applicationInput.jan_to_mar?.length === 0 ||
        applicationInput.apr_to_jun?.length === 0 ||
        applicationInput.jul_to_sep?.length === 0 ||
        applicationInput.oct_to_dec?.length === 0
      ) {
        return false;
      }
    }
    if (applicationInput.take_deposite === 1) {
      if (
        applicationInput.deposit_perc_transaction_value?.length === 0 ||
        applicationInput.deposit_perc_transaction_value?.length === 0
      ) {
        return false;
      }
    }
    if (applicationInput.take_full_payment === true) {
      if (
        applicationInput.advance_supply_full_payment?.length === 0 ||
        applicationInput.perc_annual_upfront_of_turnover?.length === 0
      ) {
        return false;
      }
    }
    return true;
  };
  const financeValidation = () => {
    if (
      applicationInput.bank_name?.length === 0 ||
      applicationInput.bank_account_name?.length === 0 ||
      applicationInput.bank_sort_code?.length === 0 ||
      applicationInput.bank_sort_code?.length !== 6 ||
      applicationInput.bank_account_no?.length !== 8 ||
      applicationInput?.bank_account_no?.length === 0
    ) {
      return false;
    }
    if (
      bankDetails[0]?.StatusInformation === "UnknownSortCode" ||
      bankDetails[0]?.StatusInformation === "InvalidAccountNumber" ||
      debitBankDetails[0]?.StatusInformation === "UnknownSortCode" ||
      debitBankDetails[0]?.StatusInformation === "InvalidAccountNumber"
    ) {
      return false;
    }
    return true;
  };
  const siteVisitValidation = () => {
    if (applicationInput?.s_individual_sales_representatives?.length === 0) {
      return false;
    }
    if (
      applicationInput?.s_name_of_individual === "" ||
      applicationInput?.s_name_of_individual === null ||
      applicationInput?.s_individual_start_date === "" ||
      applicationInput?.s_individual_start_date === null ||
      applicationInput?.s_individual_date === "" ||
      applicationInput?.s_individual_date === null
    ) {
      return false;
    }
    if (applicationInput.s_location_type === "OTHER") {
      if (applicationInput.s_specific_location?.length === 0) {
        return false;
      }
    }
    if (applicationInput.s_is_business_open === false) {
      if (
        applicationInput.s_business_start_date === "" ||
        applicationInput.s_business_start_date === null
      ) {
        return false;
      }
    }
    return true;
  };
  const porductvalidation = () => {
    if (
      priceQuoteInput.terminal_products?.length === 0 &&
      priceQuoteInput.ecommerce_products?.length === 0 &&
      priceQuoteInput.epos_products?.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.acquiring_bank?.length === 0 ||
      applicationInput.application_type?.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.card_machine_service === false &&
      applicationInput.epos_service === false &&
      applicationInput.ecom_service === false
    ) {
      return false;
    }
    if (
      applicationInput.card_machine_service === true &&
      priceQuoteInput.terminal_products.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.ecom_service === true &&
      priceQuoteInput.ecommerce_products.length === 0
    ) {
      return false;
    }
    if (
      applicationInput.epos_service === true &&
      priceQuoteInput.epos_products.length === 0
    ) {
      return false;
    }
    for (const product of priceQuoteInput.terminal_products) {
      if (product.is_deleted === false) {
        if (!product.quote) delete product.quote;

        if (
          applicationInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.provider === null || product?.provider === "")
        ) {
          return false;
        }
        if (
          applicationInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.terminal_option === null || product?.terminal_option === "")
        ) {
          return false;
        }
        if (
          applicationInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.integration_availability === null ||
            product?.integration_availability === "")
        ) {
          return false;
        }
        if (
          applicationInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          product?.integration_availability === "INTEGRATED" &&
          (product?.epos_name === "" || product?.epos_name === null)
        ) {
          return false;
        }
        if (
          applicationInput.card_machine_service === true &&
          product.product_type === "card_terminal" &&
          (product?.product === "" || product?.product === null)
        ) {
          return false;
        }
        if (applicationInput.card_machine_service === true) {
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
        if (!product.quote) delete product.quote;

        // ====ecom product===========
        if (
          applicationInput.ecom_service === true &&
          (product?.product_type === null || product?.product_type === "")
        ) {
          return false;
        }
        if (
          applicationInput.ecom_service === true &&
          (product.product_type === "ecom" ||
            product?.product_type === "VT" ||
            product.product_type === "pay_by_link" ||
            product?.product_type === "ecom_VT") &&
          (product?.getway_provider === "" || product?.getway_provider === null)
        ) {
          return false;
        }
        if (
          applicationInput.ecom_service === true &&
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
        if (!product.quote) delete product.quote;
        // ====ecom product===========
        if (
          applicationInput.epos_service === true &&
          (product?.product_type === null || product?.product_type === "")
        ) {
          return false;
        }
        if (
          applicationInput.epos_service === true &&
          (product.epos_provider === "" ||
            product.epos_provider === null ||
            product.epos_option === "" ||
            product.epos_option === null ||
            product?.integration_availability === "" ||
            product?.integration_availability === null)
        ) {
          return false;
        }
        if (
          applicationInput.epos_service === true &&
          product.integration_availability === "INTEGRATED" &&
          (product?.integrated_with === "" || product?.integrated_with === null)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const documentValidation = () => {
    // if (applicationInput.application_docs?.length < 4) {
    //   return false;
    // }
    for (const document of applicationInput.application_docs) {
      if (document.is_deleted === false) {
        if (document?.document.length === 0) {
          return false;
        }

        if (!document.category) {
          return false;
        }
        if (!document.doc_type) {
          return false;
        }
        if (location.pathname.includes("application-add") === false) {
          if (
            document.category === "PROOF_OF_ID" &&
            (document?.doc_contact === "" || document?.doc_contact === null)
          ) {
            return false;
          }
        } else if (
          document.category === "PROOF_OF_ID" &&
          !document?.issuer_id
        ) {
          return false;
        }
      }
    }
    return true;
  };
  //message toast validation
  const leadInfoValidation2 = () => {
    if (applicationInput.first_name?.length === 0) {
      showToast("error", "First  name should not be empty");
      return 0;
    }
    if (applicationInput.last_name?.length === 0) {
      showToast("error", "Last  name should not be empty");
      return 0;
    }
    if (applicationInput.legal_name?.length === 0) {
      showToast("error", "Legal  name should not be empty");
      return 0;
    }
    if (applicationInput.trading_name?.length === 0) {
      showToast("error", "Trading  name should not be empty");
      return 0;
    }

    if (applicationInput.email?.length === 0) {
      showToast("error", "Email should not be empty");
      return 0;
    }
    if (applicationInput.mobile?.length === 0) {
      showToast("error", "Mobile should not be empty");
      return 0;
    }
    if (!Phone_regex.test(applicationInput.mobile)) {
      showToast("error", "Enter a valid mobile number start with 07");
      return 0;
    }
    if (applicationInput.trading_postcode?.length === 0) {
      showToast("error", "Trading  postcode should not be empty");
      return 0;
    }
    if (applicationInput.trading_address1?.length === 0) {
      showToast("error", "Trading address1 should not be empty");
      return 0;
    }
    if (
      applicationInput.trading_country?.length === 0 ||
      applicationInput.trading_country === null
    ) {
      showToast("error", "Trading country should not be empty");
      return 0;
    }
    if (applicationInput.trading_city?.length === 0) {
      showToast("error", "Trading_city should not be empty");
      return 0;
    }

    if (applicationInput.legal_postcode?.length === 0) {
      showToast("error", "Legal  postcode should not be empty");
      return 0;
    }
    if (applicationInput.legal_address1?.length === 0) {
      showToast("error", "Legal address1 should not be empty");
      return 0;
    }
    if (
      applicationInput.legal_country?.length === 0 ||
      applicationInput.legal_country === null
    ) {
      showToast("error", "Legal country should not be empty");
      return 0;
    }
    if (applicationInput.legal_city?.length === 0) {
      showToast("error", "Legal city should not be empty");
      return 0;
    }

    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );

    // handleNext();
  };
  const productValidation2 = () => {
    if (
      applicationInput.card_machine_service === false &&
      applicationInput.epos_service === false &&
      applicationInput.ecom_service === false
    ) {
      showToast("error", "Product type shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.card_machine_service === true &&
      priceQuoteInput.terminal_products.length === 0
    ) {
      showToast("error", "Terminal product shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.ecom_service === true &&
      priceQuoteInput.ecommerce_products.length === 0
    ) {
      showToast("error", "Ecom product shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.epos_service === true &&
      priceQuoteInput.epos_products.length === 0
    ) {
      showToast("error", "Epos product shouldn't be empty");
      return 0;
    }
    for (const product of priceQuoteInput.terminal_products) {
      if (applicationInput.card_machine_service === true) {
        if (
          product.has_old_card_provider === "" ||
          product.has_old_card_provider === null
        ) {
          showToast("error", "Old provider shouldn't be empty");
          return 0;
        }
        if (product.has_old_card_provider === true) {
          if (
            product.previous_acquirer === "" ||
            product.previous_acquirer === null
          ) {
            showToast("error", "Previous acquirer shouldn't be empty");
            return 0;
          }
        }
      }
      if (
        applicationInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.terminal_provider === null ||
          product?.terminal_provider === "")
      ) {
        showToast("error", "Terminal provider shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.terminal_option === null || product?.terminal_option === "")
      ) {
        showToast("error", "Terminal option shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.integration_availability === null ||
          product?.integration_availability === "")
      ) {
        showToast("error", "Integration availablity  shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        product?.integration_availability === "INTEGRATED" &&
        (product?.epos_name === "" || product?.epos_name === null)
      ) {
        showToast("error", "Epos name  shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.card_machine_service === true &&
        product.product_type === "card_terminal" &&
        (product?.product === "" || product?.product === null)
      ) {
        showToast("error", "Product  shouldn't be empty");
        return 0;
      }
    }
    // ====ecom product===========
    for (const product of priceQuoteInput.ecommerce_products) {
      if (
        applicationInput.ecom_service === true &&
        (product?.product_type === null || product?.product_type === "")
      ) {
        showToast("error", "Service type shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.ecom_service === true &&
        (product.product_type === "ecom" ||
          product?.product_type === "VT" ||
          product?.product_type === "pay_by_link" ||
          product?.product_type === "ecom_VT") &&
        (product?.getway_provider === "" || product?.getway_provider === null)
      ) {
        showToast("error", "Getway provider shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.ecom_service === true &&
        (product.product_type === "ecom" ||
          product?.product_type === "ecom_VT") &&
        (product?.website_url === "" || product?.website_url === null)
      ) {
        showToast("error", "Website url  shouldn't be empty");
        return 0;
      }
    }
    // =======epos=============
    for (const product of priceQuoteInput.epos_products) {
      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.service_option === null || product?.service_option === "")
      ) {
        showToast("error", "Service option shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.epos_option === null || product?.epos_option === "")
      ) {
        showToast("error", "Service type shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.integration_availability === null ||
          product?.integration_availability === "")
      ) {
        showToast("error", "Integration availablity  shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        product?.integration_availability === "INTEGRATED" &&
        (product?.integrated_with === "" || product?.integrated_with === null)
      ) {
        showToast("error", "Integrated_with shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.epos_provider === null || product?.epos_provider === "")
      ) {
        showToast("error", "Epos provider shouldn't be empty");
        return 0;
      }

      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.price === null || product?.price === "")
      ) {
        showToast("error", "Monthly shouldn't be empty");
        return 0;
      }
      if (
        applicationInput.epos_service === true &&
        product.product_type === "epos" &&
        (product?.product_term === null || product?.product_term === "")
      ) {
        showToast("error", "Contract length be empty");
        return 0;
      }
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );
    // handleNext();
  };
  const sofValidation2 = () => {
    const pattern = /^\d+(\.\d{0,4})?$/;

    if (!pattern.test(applicationInput.auth_fees)) {
      showToast(
        "error",
        "Auth fees should be up to 4 digits after the decimal point"
      );
      return 0;
    }
    if (
      applicationInput.annual_turnover?.length === 0
      // ||
      // isNaN(applicationInput.annual_turnover)
    ) {
      showToast("error", "Annual_turnover shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.annual_card_turnover?.length === 0
      // ||
      // isNaN(applicationInput.annual_card_turnover)
    ) {
      showToast("error", "Annual card turnover shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.atv === "" ||
      applicationInput.atv == null ||
      isNaN(applicationInput.atv)
    ) {
      showToast("error", "Atv shouldn't be empty");
      return 0;
    }
    if (applicationInput.mmsc === "" || applicationInput.mmsc === null) {
      showToast("error", "MMSC shouldn't be empty");
      return 0;
    }

    if (
      parseInt(applicationInput.sales_ftf_perc) +
        parseInt(applicationInput.sales_moto_perc) +
        parseInt(applicationInput.sales_internet_perc) !==
      100
    ) {
      showToast("error", "Card acceptence ratio must be 100");
      return 0;
    }
    if (applicationInput.visa_credit_sr === "") {
      showToast("error", "Visa credit secure rate should not be empty");
      return 0;
    }

    if (applicationInput.master_credit_sr.includes === "") {
      showToast("error", "Master credit secure rate should not be empty");
      return 0;
    }

    if (applicationInput.visa_debit_sr === "") {
      showToast("error", "Visa debit secure rate should not be empty");
      return 0;
    }

    if (applicationInput.master_debit_sr === "") {
      showToast("error", "Master debit secure rate should not be empty");
      return 0;
    }
    if (applicationInput.visa_v_pay_sr === "") {
      showToast("error", "Visa v pay secure rate should not be empty");
      return 0;
    }
    if (applicationInput.uk_maestro_sr === "") {
      showToast("error", "Maestro Domestic secure rate should not be empty");
      return 0;
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );
  };
  const businessDetailsValidation2 = () => {
    if (applicationInput.legal_name?.length === 0) {
      showToast("error", "Legal  name should not be empty");
      return 0;
    }
    if (applicationInput.trading_name?.length === 0) {
      showToast("error", "Trading  name should not be empty");
      return 0;
    }
    if (
      applicationInput.legal_type === "LLP" ||
      applicationInput.legal_type === "L" ||
      applicationInput.legal_type === "PL"
    ) {
      if (!applicationInput.company_house_no) {
        showToast("error", "Company house number shouldn't be empty");
        return 0;
      }
      if (!applicationInput.incorporated_on) {
        showToast("error", "Incorporated on shouldn't be empty");
        return 0;
      }
    }
    if (!applicationInput.current_ownership_since) {
      showToast("error", "Date of ownership shouldn't be empty");
      return 0;
    }
    if (applicationInput.email?.length === 0) {
      showToast("error", "Email should not be empty");
      return 0;
    }
    if (!regEmail.test(applicationInput.email)) {
      showToast("error", "Enter a vaild email ");
      return 0;
    }
    if (
      !regEmail.test(applicationInput.secondary_email) &&
      applicationInput.secondary_email !== "" &&
      applicationInput.secondary_email !== null
    ) {
      showToast("error", "Enter a vaild secondery email ");
      return 0;
    }
    if (applicationInput.mobile?.length === 0) {
      showToast("error", "Mobile should not be empty");
      return 0;
    }
    if (!Phone_regex.test(applicationInput.mobile)) {
      showToast("error", "Enter a valid mobile number start with 07");
      return 0;
    }
    if (applicationInput.vat_enabled === 0) {
      if (!applicationInput.tax_id) {
        showToast("error", "Vat number shouldn't be empty");
        return 0;
      }
    }
    if (applicationInput.new_to_card_proccessing === false) {
      if (applicationInput.previous_acquirer?.length === 0) {
        showToast("error", "Old provider shouldn't be empty");
        return 0;
      }
    }
    if (applicationInput.trading_postcode?.length === 0) {
      showToast("error", "Trading  postcode should not be empty");
      return 0;
    }
    if (applicationInput.trading_address1?.length === 0) {
      showToast("error", "Trading address1 should not be empty");
      return 0;
    }
    if (
      applicationInput.trading_country?.length === 0 ||
      applicationInput.trading_country === null
    ) {
      showToast("error", "Trading country should not be empty");
      return 0;
    }
    if (applicationInput.trading_city?.length === 0) {
      showToast("error", "Trading_city should not be empty");
      return 0;
    }

    if (applicationInput.legal_postcode?.length === 0) {
      showToast("error", "Legal  postcode should not be empty");
      return 0;
    }
    if (applicationInput.legal_address1?.length === 0) {
      showToast("error", "Legal address1 should not be empty");
      return 0;
    }
    if (
      applicationInput.legal_country?.length === 0 ||
      applicationInput.legal_country === null
    ) {
      showToast("error", "Legal country should not be empty");
      return 0;
    }
    if (applicationInput.legal_city?.length === 0) {
      showToast("error", "Legal city should not be empty");
      return 0;
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );
  };
  const customerValidation2 = () => {
    var Sum = 0;
    for (
      let index = 0;
      index < applicationInput.business_owners.length;
      index++
    ) {
      if (applicationInput.business_owners[index].is_deleted === false) {
        Sum += parseInt(applicationInput.business_owners[index].ownership_perc);
      }
    }
    if (Sum !== 100) {
      showToast("error", "Total Ownership Percentage must be  100 ");
      return 0;
    }

    if (
      applicationInput.legal_type !== "PART" &&
      !applicationInput.business_owners[0].owner_email
    ) {
      showToast("error", "1st owner email shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.legal_type !== "PART" &&
      !applicationInput.business_owners[0].owner_phone_no
    ) {
      showToast("error", "1st owner phone no shouldn't be empty");
      return 0;
    }
    if (
      applicationInput.legal_type !== "PART" &&
      !Phone_regex.test(applicationInput?.business_owners[0]?.owner_phone_no)
    ) {
      showToast("error", "Invalid Owner phone number");
      return 0;
    }

    if (
      // applicationInput.legal_type !== "PART" &&
      applicationInput.business_owners[0].is_main_principal === false
    ) {
      showToast("error", "1st owner is main principle should be yes");
      return 0;
    }
    for (const business_owner of applicationInput.business_owners) {
      business_owner.owner_second_name = business_owner.owner_surname;
      business_owner.business_owner_contacts[0].email_address =
        business_owner.owner_email;
      if (business_owner.is_deleted === false) {
        if (!business_owner?.owner_first_name) {
          showToast("error", "Owner Frist name shouldn't be empty");
          return 0;
        }
        if (!business_owner?.owner_title) {
          showToast("error", "Owner Title name shouldn't be empty");
          return 0;
        }

        if (!business_owner?.owner_issue_date) {
          showToast("error", "Owner Issue date shouldn't be empty");
          return 0;
        }
        if (!business_owner?.owner_expiry_date) {
          showToast("error", "Owner Expire date shouldn't be empty");
          return 0;
        }
        if (
          (new Date(business_owner.owner_expiry_date).getFullYear() -
            new Date().getFullYear()) *
            12 +
            (new Date(business_owner.owner_expiry_date).getMonth() -
              new Date().getMonth()) <
          3
        ) {
          showToast(
            "error",
            "The minimum gap between current date and expiry date should be 3 months."
          );
          return 0;
        }
        if (!business_owner?.owner_id_num) {
          showToast("error", "Owner ID number shouldn't be empty");
          return 0;
        }

        if (
          applicationInput.legal_type === "PART" &&
          !business_owner?.owner_email
        ) {
          showToast("error", "Owner Email shouldn't be empty");
          return 0;
        }

        if (
          applicationInput.legal_type === "PART" &&
          !parseInt(business_owner.owner_phone_no)
        ) {
          showToast("error", "Owner Phone number shouldn't be empty");
          return 0;
        }
        if (
          business_owner.owner_phone_no &&
          !Phone_regex.test(business_owner.owner_phone_no)
        ) {
          showToast("error", "Invalid Owner phone number");
          return 0;
        }

        if (!business_owner.owner_surname) {
          showToast("error", "Owner Last name shouldn't be empty");
          return 0;
        }
        if (!business_owner.contact_dob) {
          showToast("error", "Owner Date of birth shouldn't be empty");
          return 0;
        }
        if (
          business_owner.owner_nationality === "" ||
          business_owner.owner_nationality === null
        ) {
          showToast("error", "Owner Nationality shouldn't be empty");
          return 0;
        }

        if (
          new Date().getFullYear() -
            new Date(business_owner.contact_dob).getFullYear() <
          10
        ) {
          showToast("error", "Invalid owner DOB");
          return 0;
        }
        if (
          applicationInput.legal_type === "LLP" ||
          applicationInput.legal_type === "L" ||
          applicationInput.legal_type === "PL"
        ) {
          if (
            parseInt(business_owner.ownership_perc) > 100 &&
            parseInt(business_owner.ownership_perc) < 10
          ) {
            showToast(
              "error",
              "Ownership Percentage must less than 100 and greater than 10"
            );
            return 0;
          }
        }
        if (!business_owner.business_owner_contacts[0].zip_code) {
          showToast("error", "Owner Zip code should not be empty");
          return 0;
        }
        if (
          business_owner.business_owner_contacts[0].country_code === "" ||
          business_owner.business_owner_contacts[0].country_code === null
        ) {
          showToast("error", "Owner Country should not be empty");
          return 0;
        }
        if (!business_owner.business_owner_contacts[0].street_line_1) {
          showToast("error", "Owner address1 should not be empty");
          return 0;
        }

        if (!business_owner.business_owner_contacts[0].city) {
          showToast("error", "Owner town/city should not be empty");
          return 0;
        }

        if (business_owner.business_owner_contacts[0].zip_code.length < 5) {
          showToast(
            "error",
            "Please enter at least 5 digit  zip code in owner contact"
          );
          return 0;
        }
      }
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );
  };
  const businessProfileValidation2 = () => {
    if (!applicationInput.desc_of_service) {
      showToast("error", "Description of goods  shouldn't be empty !");
      return 0;
    }
    if (applicationInput.annual_turnover?.length === 0) {
      showToast("error", "Annual_turnover shouldn't be empty");
      return 0;
    }
    if (applicationInput.annual_card_turnover?.length === 0) {
      showToast("error", "Annual card turnover shouldn't be empty");
      return 0;
    }

    if (
      applicationInput.atv === "" ||
      applicationInput.atv === null ||
      isNaN(applicationInput.atv)
    ) {
      showToast("error", "Atv shouldn't be empty");
      return 0;
    }

    if (
      parseInt(applicationInput.sales_ftf_perc) +
        parseInt(applicationInput.sales_moto_perc) +
        parseInt(applicationInput.sales_internet_perc) !==
      100
    ) {
      showToast("error", "Card acceptence ratio must be 100");
      return 0;
    }

    if (applicationInput.take_deposite === 1) {
      if (applicationInput.deposit_perc_transaction_value?.length === 0) {
        showToast("error", "Size of deposit should not be empty");
        return 0;
      }
    }
    if (applicationInput.take_full_payment === true) {
      if (applicationInput.advance_supply_full_payment?.length === 0) {
        showToast(
          "error",
          " Advance of supply is the full payment should not be empty"
        );
        return 0;
      }
      if (applicationInput.perc_annual_upfront_of_turnover?.length === 0) {
        showToast(
          "error",
          " Annual turnover relates to upfront full payments should not be empty"
        );
        return 0;
      }
    }
    if (applicationInput.seasonal_sales === true) {
      if (
        applicationInput.jan_to_mar?.length === 0 ||
        applicationInput.apr_to_jun?.length === 0 ||
        applicationInput.jul_to_sep?.length === 0 ||
        applicationInput.oct_to_dec?.length === 0
      ) {
        showToast("error", "Sales value should not be empty");
        return 0;
      }
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );
  };
  const FinancialInfoValidation2 = () => {
    if (applicationInput.bank_sort_code?.length === 0) {
      showToast("error", "Sort code should not be empty");
      return 0;
    }
    if (applicationInput.bank_account_no?.length === 0) {
      showToast("error", "Account number should not be empty");
      return 0;
    }
    if (applicationInput.bank_account_name?.length === 0) {
      showToast("error", "Account Name should not be empty");
      return 0;
    }
    if (applicationInput.bank_name?.length === 0) {
      showToast("error", "Bank Name should not be empty");
      return 0;
    }
    if (
      bankDetails[0]?.StatusInformation === "UnknownSortCode" ||
      bankDetails[0]?.StatusInformation === "InvalidAccountNumber" ||
      debitBankDetails[0]?.StatusInformation === "UnknownSortCode" ||
      debitBankDetails[0]?.StatusInformation === "InvalidAccountNumber"
    ) {
      showToast("error", "Bank information is not valid");
      return 0;
    }
    if (
      applicationInput.cashback === true &&
      (applicationInput.avg_cashback_amount === null ||
        applicationInput.avg_cashback_amount === "")
    ) {
      showToast("error", "Cash back amount should not be empty");
      return 0;
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      undefined,
      handleNext
    );
  };
  const siteVisitValidation2 = () => {
    if (applicationInput?.s_individual_sales_representatives?.length === 0) {
      showToast("error", "Sales representative name should not be empty");
      return 0;
    }
    if (
      applicationInput?.s_name_of_individual === "" ||
      applicationInput?.s_name_of_individual === null
    ) {
      showToast(
        "error",
        "Name of the individual met at the premises should not be empty"
      );
      return 0;
    }
    if (
      applicationInput?.s_individual_start_date === "" ||
      applicationInput?.s_individual_start_date === null
    ) {
      showToast("error", "Date of the site visit should not be empty");
      return 0;
    }

    if (
      applicationInput?.s_individual_date === "" ||
      applicationInput?.s_individual_date === null
    ) {
      showToast("error", "Individual Date should not be empty");
      return 0;
    }
    if (applicationInput.s_location_type === "OTHER") {
      if (applicationInput.s_specific_location?.length === 0) {
        showToast("error", "Specific Location should not be empty");
        return 0;
      }
    }
    if (applicationInput.s_is_business_open === false) {
      if (
        applicationInput.s_business_start_date === "" ||
        applicationInput.s_business_start_date === null
      ) {
        showToast("error", "Open & Operating Start date should not be empty");
        return 0;
      }
    }
    handleSubmitAppplication(
      applicationInput,
      "not_submit",
      "sitevisit",
      handleNext
    );
  };
  const documentValidation2 = () => {
    for (const document of applicationInput.application_docs) {
      if (document.is_deleted === false) {
        if (!document.category) {
          showToast("error", "File name shouldn't be empty");
          return 0;
        }
        if (!document.doc_type) {
          showToast("error", "Document Type shouldn't be empty");
          return 0;
        }
        if (document?.document.length === 0) {
          showToast("error", "Image/PDF shouldn't be empty");
          return 0;
        }

        if (location.pathname.includes("application-add") === false) {
          if (
            document.category === "PROOF_OF_ID" &&
            (document?.doc_contact === "" || document?.doc_contact === null)
          ) {
            showToast("error", " Contact Name should not be empty");
            return 0;
          }
        } else if (
          document.category === "PROOF_OF_ID" &&
          !document?.issuer_id
        ) {
          showToast("error", "Issuer ID shouldn't be empty");
          return 0;
        }
      }
    }
    handleDocNext();
  };

  const handleDocNext = () => {
    const requiredDocumentTypes = [
      "PROOF_OF_ID",
      "PROOF_OF_BUSINESS",
      "PROOF_OF_BANK",
      "PROOF_OF_ADDRESS",
    ];

    const documentTypes = [];
    let applicationTypeCount = 0;

    // Iterate through each document to gather unique doc_type values
    for (let doc of applicationInput.application_docs) {
      if (!doc.is_deleted) {
        // Additional check for "application type"
        if (doc.category === "APPLICATION_DOCUMENTS") {
          applicationTypeCount += 1;
          // if (doc.document.length > 1) {
          //   applicationDocumentCount += 1;
          // }

          if (applicationTypeCount > 1 || doc.document.length > 1) {
            showToast(
              "error",
              "Application type and application Document  should appear only once."
            );
            return; // Stop further processing if an error is found
          }
        }
      }
      if (!doc.is_deleted && !documentTypes.includes(doc.category)) {
        documentTypes.push(doc.category);
        console.log("applicationInput.application_docs2", doc.category);
      }
    }

    if (
      documentTypes.length >= 4 &&
      requiredDocumentTypes.every((type) => documentTypes.includes(type))
    ) {
      // If there are at least 4 unique document types and they include all the requiredDocumentTypes
      // handleNext();
      handleSubmitAppplication(
        applicationInput,
        "not_submit",
        undefined,
        handleNext
      );
    } else {
      showToast(
        "error",
        "Add at least 4 types of documents (PROOF OF ID, PROOF OF ADDRESS, PROOF OF BANK, & PROOF OF BUSINESS)."
      );
    }
  };

  const handleDocNextValidation = () => {
    const requiredDocumentTypes = [
      "PROOF_OF_ID",
      "PROOF_OF_BUSINESS",
      "PROOF_OF_BANK",
      "PROOF_OF_ADDRESS",
    ];
    const documentTypes = [];
    let applicationTypeCount = 0;

    // Iterate through each document to gather unique doc_type values
    for (let doc of applicationInput.application_docs) {
      if (!doc.is_deleted) {
        // Additional check for "application type"
        if (doc.category === "APPLICATION_DOCUMENTS") {
          applicationTypeCount += 1;
          // if (doc.document.length > 1) {
          //   applicationDocumentCount += 1;
          // }

          if (applicationTypeCount > 1 || doc.document.length > 1) {
            showToast(
              "error",
              "Application type and application Document  should appear only once."
            );
            return; // Stop further processing if an error is found
          }
        }
      }
      if (!doc.is_deleted && !documentTypes.includes(doc.category)) {
        documentTypes.push(doc.category);

        // Additional check for "application type"
        if (doc.category === "APPLICATION_TYPE") {
          applicationTypeCount += 1;
          console.log(
            "applicationTypeCount",
            applicationTypeCount,
            doc.category
          );
          if (applicationTypeCount > 1) {
            showToast("error", "Application type should appear only once.");
            return; // Stop further processing if an error is found
          }
        }
      }
    }

    if (
      documentTypes.length >= 4 &&
      requiredDocumentTypes.every((type) => documentTypes.includes(type))
    ) {
      // If there are at least 4 unique document types and they include all the requiredDocumentTypes
      handleNext();
    } else {
      showToast(
        "error",
        "Add at least 4 types of documents (PROOF OF ID, PROOF OF ADDRESS, PROOF OF BANK, & PROOF OF BUSINESS)."
      );
    }
  };
  React.useEffect(() => {
    if (applicationInput.telephone === null) {
      dispatch(GetApplicationInput("telephone", ""));
    }
  }, []);

  useEffect(() => {
    if (leadInfoValidation()) {
      setActiveStep(0);
    }
    if (leadInfoValidation() && porductvalidation()) {
      setActiveStep(1);
    }
    if (leadInfoValidation() && porductvalidation() && sofValidation()) {
      setActiveStep(2);
    }
    if (
      leadInfoValidation() &&
      porductvalidation() &&
      sofValidation() &&
      businessDetailsValidation()
    ) {
      setActiveStep(3);
    }
    if (
      leadInfoValidation() &&
      porductvalidation() &&
      sofValidation() &&
      businessDetailsValidation() &&
      applicationInput.business_owners?.length > 0 &&
      customerDetailsValidation()
    ) {
      setActiveStep(4);
    }
    if (
      leadInfoValidation() &&
      porductvalidation() &&
      sofValidation() &&
      businessDetailsValidation() &&
      customerDetailsValidation() &&
      businessValidation()
    ) {
      setActiveStep(5);
    }
    if (
      leadInfoValidation() &&
      porductvalidation() &&
      sofValidation() &&
      businessDetailsValidation() &&
      businessValidation() &&
      customerDetailsValidation() &&
      financeValidation()
    ) {
      setActiveStep(6);
    }
    if (
      leadInfoValidation() &&
      porductvalidation() &&
      sofValidation() &&
      businessDetailsValidation() &&
      businessValidation() &&
      financeValidation() &&
      customerDetailsValidation() &&
      siteVisitValidation()
    ) {
      setActiveStep(7);
    }
    if (
      leadInfoValidation() &&
      porductvalidation() &&
      sofValidation() &&
      businessDetailsValidation() &&
      businessValidation() &&
      financeValidation() &&
      siteVisitValidation() &&
      customerDetailsValidation() &&
      handleDocNextValidation() &&
      documentValidation()
    ) {
      setActiveStep(8);
    }
  }, []);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <>
      {isLoadApplication && (
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
                    <StepLabel
                      style={{ cursor: "pointer" }}
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
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {/* <NewLeadTab next={handleNext} /> */}
                  <NewApplicationLeads next={handleNext} />
                </Typography>
              )}
              {activeStep === 1 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <ApplicationProducts />
                  {/* <BusinessDetails /> */}
                </Typography>
              )}
              {activeStep === 2 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <AppScheduleOfFees />
                  {/* <CustomerDetails /> */}
                </Typography>
              )}
              {activeStep === 3 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <BusinessDetails />
                  {/* <BusinessProfile /> */}
                </Typography>
              )}
              {activeStep === 4 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <CustomerDetails />
                  {/* <FinancialInfo /> */}
                </Typography>
              )}
              {activeStep === 5 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <BusinessProfile />
                </Typography>
              )}

              {activeStep === 6 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <FinancialInfo />
                  {/* <SiteVisit /> */}
                </Typography>
              )}
              {activeStep === 7 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <SiteVisit />
                  {/* <NewApplicationProductDetaisl /> */}
                </Typography>
              )}
              {activeStep === 8 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <Document />
                </Typography>
              )}

              {activeStep === 9 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <Preview />
                  {/* <NewApplicationPreview /> */}
                </Typography>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  style={activeStep === 0 ? btn_disable : myStyle}
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === 9 ? (
                  <>
                    <Button
                      className="mr-2"
                      // style={myStyle2}
                      style={
                        afterSuccessSigning ||
                        applicationInput.is_submitted_to_ps ||
                        applicationInput.applicaiton_stage === 5
                          ? btn_disable2
                          : myStyle2
                      }
                      disabled={
                        applicationInput.is_submitted_to_ps ||
                        applicationInput.applicaiton_stage === 5
                          ? true
                          : false
                      }
                      onClick={() => {
                        handleSubmitAppplication(
                          applicationInput,
                          "not_submit"
                        );

                        // handleNext()
                      }}
                      // onClick={handleNext}
                    >
                      {applicationInput.id ? "Update" : "Create"}
                    </Button>
                    {afterSuccessSigning ||
                    applicationInput.is_submitted_to_ps ||
                    applicationInput.applicaiton_stage === 5 ? (
                      <Button
                        style={btn_disable}
                        onClick={() => {
                          applicationValidation(
                            applicationInput,
                            undefined,
                            handleSubmitAppplication,
                            "submit"
                          );
                        }}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        style={myStyle}
                        onClick={() => {
                          applicationValidation(
                            applicationInput,
                            undefined,
                            handleSubmitAppplication,
                            "submit"
                          );
                        }}
                      >
                        Submit
                        {/* {applicationInput.id ? "Submit" : "Create"} */}
                      </Button>
                    )}
                  </>
                ) : activeStep === 8 ? (
                  <Button
                    // disabled={documentValidation() ? false : true}
                    onClick={documentValidation2}
                    // onClick={handleDocNext}
                    // onClick={handleNext}
                    sx={{ mr: 1 }}
                    style={documentValidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "submit" : "Next"}
                  </Button>
                ) : activeStep === 7 ? (
                  <Button
                    onClick={() => {
                      siteVisitValidation2();
                      // handleNext()
                    }}
                    sx={{ mr: 1 }}
                    style={siteVisitValidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "submit" : "Next"}
                  </Button>
                ) : activeStep === 6 ? (
                  <Button
                    // disabled={financeValidation() ? false : true}
                    onClick={FinancialInfoValidation2}
                    sx={{ mr: 1 }}
                    style={financeValidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "submit" : "Next"}
                  </Button>
                ) : activeStep === 5 ? (
                  <Button
                    // disabled={businessValidation() ? false : true}
                    onClick={businessProfileValidation2}
                    sx={{ mr: 1 }}
                    style={businessValidation() ? myStyle : myStyle}
                    // style={businessValidation() ? myStyle : btn_disable}
                  >
                    {activeStep === steps.length - 1 ? "Update" : "Next"}
                  </Button>
                ) : activeStep === 4 ? (
                  <Button
                    // disabled={customerDetailsValidation() ? false : true}
                    onClick={customerValidation2}
                    sx={{ mr: 1 }}
                    style={customerDetailsValidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "Update" : "Next"}
                  </Button>
                ) : activeStep === 3 ? (
                  <Button
                    // disabled={businessDetailsValidation() ? false : true}
                    onClick={businessDetailsValidation2}
                    sx={{ mr: 1 }}
                    style={businessDetailsValidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "Update" : "Next"}
                  </Button>
                ) : activeStep === 2 ? (
                  <Button
                    // disabled={sofValidation() ? false : true}
                    onClick={sofValidation2}
                    sx={{ mr: 1 }}
                    style={sofValidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "Update" : "Next"}
                  </Button>
                ) : activeStep === 1 ? (
                  <Button
                    // disabled={porductvalidation() ? false : true}
                    onClick={productValidation2}
                    sx={{ mr: 1 }}
                    style={porductvalidation() ? myStyle : myStyle}
                  >
                    {activeStep === steps.length - 1 ? "Update" : "Next"}
                  </Button>
                ) : (
                  activeStep === 0 && (
                    <Button
                      // disabled={leadInfoValidation() ? false : true}
                      onClick={leadInfoValidation2}
                      sx={{ mr: 1 }}
                      style={leadInfoValidation() ? myStyle : myStyle}
                      // style={leadInfoValidation() ? myStyle : btn_disable}
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

export default NewApplicationRetrive;
