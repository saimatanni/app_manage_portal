export const videoFormats = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm'];
export const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp', 'heic', 'raw'];
export const pptFormats = ["ppt", "pptx"];
export const documentType = [
  {
    label: "PROOF OF ID",
    value: "PROOF_OF_ID",
  },
  {
    label: "PROOF OF BUSINESS",
    value: "PROOF_OF_BUSINESS",
  },
  {
    label: "PROOF OF BANK",
    value: "PROOF_OF_BANK",
  },
  {
    label: "PROOF OF ADDRESS",
    value: "PROOF_OF_ADDRESS",
  },
  {
    label: "APPLICATION DOCUMENTS",
    value: "APPLICATION_DOCUMENTS",
  },
  {
    label: "OTHER",
    value: "OTHER",
  },
];
export const check_proof_of_id = [
  {
    label: "PASSPORT",
    value: "PASSPORT",
  },
  {
    label: "PROVISION DRIVING LICENCE",
    value: "PROVISION_DRIVING_LICENCE",
  },
  {
    label: "FULL UK DRIVING LICENCE",
    value: "FULL_PAPER_DRIVING_LICENCE",
  },

  {
    label: "GOVERNMENT ISSUED ID",
    value: "GOVERNMENT_ISSUED_ID",
  },
  {
    label: "EU RESIDENCE CARD FIVE YEAR",
    value: "EU_RESIDENCE_CARD_FIVE_YEAR",
  },
  {
    label: "SPANISH RESIDENT CARD",
    value: "SPANISH_RESIDENT_CARD",
  },
  {
    label: "KARTA POBYTUT",
    value: "KARTA_POBYTU",
  },
  {
    label: "FIREARMS CERTIFICATE",
    value: "FIREARMS_CERTIFICATE",
  },

  // {
  //   label: "OTHER",
  //   value: "OTHER",
  // },
];

export const check_proof_of_business = [
  {
    label: "BUSINESS BANK STATEMENTS",
    value: "BUSINESS_BANK_STATEMENTS",
  },
  {
    label: "BUSINESS UTILITY BILL",
    value: "BUSINESS_UTILITY_BILL",
  },
  {
    label: "BUSINESS RATES BILL",
    value: "BUSINESS_RATES_BILL",
  },
  {
    label: "BUSINESS BANKING COMMUNICATION",
    value: "BUSINESS_BANKING_COMMUNICATION",
  },
  {
    label: "HMRC VAT OR TAX DEMAND",
    value: "HMRC_VAT_OR_TAX_DEMAND",
  },
  {
    label: "MARKET TRADER CERTIFICATE",
    value: "MARKET_TRADER_CERTIFICATE",
  },
  {
    label: "OTHER",
    value: "OTHER",
  },
];
export const check_proof_of_home_add = [
  {
    label: "COUNCIL TAX CORRESPONDANCE",
    value: "COUNCIL_TAX_CORRESPONDENCE",
  },
  {
    label: " UTILITY BILL",
    value: "UTILITY_BILL",
  },
  {
    label: "MORTGAGE_STATEMENT",
    value: "MORTGAGE_STATEMENT",
  },
  {
    label: "FULL PHOTO DRIVING LICENCE",
    value: "FULL_PHOTO_DRIVING_LICENCE",
  },
  {
    label: "PROVISIONAL PHOTO DRIVING LICENCE",
    value: "PROVISIONAL_PHOTO_DRIVING_LICENCE",
  },
  {
    label: "BANK STATEMENT",
    value: "BANK_STATEMENT",
  },
  {
    label: "OTHER",
    value: "OTHER",
  },
];
export const PROOF_OF_BANK = [
  {
    label: "BUSINESS BANK STATEMENTS",
    value: "BUSINESS_BANK_STATEMENTS",
  },
  {
    label: "PAYING IN SLIP",
    value: "PAYING_IN_SLIP",
  },
  {
    label: "BUSINESS BANKING COMMUNICATION LETTER",
    value: "BUSINESS_BANKING_COMMUNICATION_LETTER",
  },

  {
    label: "VOIDED CHEQUE",
    value: "VOIDED_CHEQUE",
  },
  {
    label: "BUSINESS BANK WELCOME LETTER",
    value: "BUSINESS_BANK_WELCOME_LETTER",
  },
  {
    label: "OTHER",
    value: "OTHER",
  },
];
export const check_proof_of_other = [
  {
    label: " OTHER ",
    value: "OTHER",
  },
];
export const check_proof_of_application = [
  {
    label: "APPLICATION_DOCUMENT ",
    value: "APPLICATION_DOCUMENT",
  },
];
export const entity_code = [
  {
    value: "N/A",
    label: "N/A",
  },
  {
    value: "53265",
    label: "53265",
  },
  {
    value: "53268",
    label: "53268",
  },
  {
    value: "53266",
    label: "53266",
  },
  {
    value: "53269",
    label: "53269",
  },
  {
    value: "53267",
    label: "53267",
  },
  {
    value: "53270",
    label: "53270",
  },
  {
    value: "52495",
    label: "52495",
  },
];

export const perentalEntity = (entity_code, name) => {

  if (entity_code === "52495") {
    if (name === "visa_debit_pr") return 0.20;
    if (name === "visa_credit_pr") return 0.30;
    if (name === "mastercard_debit_pr") return 0.20;
    if (name === "mastercard_credit_pr") return 0.30;
    if (name === "visa_business_credit_pr") return 1.35;
    if (name === "visa_business_debit_pr") return 0.50;
    if (name === "mastercard_business_pr") return 1.3;
    if (name === "mastercard_corporate_pr") return 1.5;
    if (name === "all_non_eea_visa_fee_pr") return 2.1;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.1;

    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
    // if (name === "Visa Purchasing") return 0.35;
    // if (name === "Visa Corporate") return 1.55;
    // if (name === "Mastercard Fleet") return 1.5;
    // if (name === "Visa V-Pay") return 0.35;
    // if (name === "UK Maestro") return 0.35;
    // if (name === "International Maestro") return 0.35;
    // if (name === "Mastercard Purchasing") return 1.5;
    // if (name === "Mastercard Prepaid Commerciale") return 1.3;
  }
  // less 30 & less 50000 && no entity = 67
  else if (entity_code === "53267") {
    if (name === "visa_debit_pr") return 0.349;
    if (name === "visa_credit_pr") return 0.632;
    if (name === "mastercard_debit_pr") return 0.374;
    if (name === "mastercard_credit_pr") return 0.641;

    if (name === "visa_business_credit_pr") return 1.825;
    if (name === "visa_business_debit_pr") return 1.01;

    if (name === "mastercard_business_pr") return 1.793;

    if (name === "mastercard_corporate_pr") return 2.001;

    if (name === "all_non_eea_visa_fee_pr") return 2.558;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.63;

    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
    // if (name === "Visa Purchasing") return 2.261;
    // if (name === "Visa Corporate") return 2.261;
    // if (name === "Mastercard Purchasing") return 1.999;
    // if (name === "Mastercard Fleet") return 2.001;
    // if (name === "Mastercard Prepaid Commerciale") return 1.814;
    // if (name === "Visa V-Pay") return 0.349;
    // if (name === "UK Maestro") return 0.374;
    // if (name === "International Maestro") return 0.435;
  }
  // avobe 30 & less  50000 && no entity =53270
  else if (entity_code === "53270") {
    if (name === "visa_debit_pr") return 0.329;
    if (name === "visa_credit_pr") return 0.632;
    if (name === "mastercard_debit_pr") return 0.354;
    if (name === "mastercard_credit_pr") return 0.641;
    // if (name === "Visa V-Pay") return 0.35;
    // if (name === "UK Maestro") return 0.35;
    // if (name === "International Maestro") return 0.35;
    if (name === "visa_business_credit_pr") return 1.825;
    if (name === "visa_business_debit_pr") return 1.010;
    // if (name === "Visa Purchasing") return 2.261;
    // if (name === "Visa Corporate") return 2.261;
    if (name === "mastercard_business_pr") return 1.793;
    // if (name === "Mastercard Purchasing") return 1.999;
    // if (name === "Mastercard Fleet") return 2.001;
    if (name === "mastercard_corporate_pr") return 2.001;
    // if (name === "Mastercard Prepaid Commerciale") return 1.814;
    if (name === "all_non_eea_visa_fee_pr") return 2.588;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.63;
    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
  }
  // avobe 53266
  else if (entity_code === "53266") {
    if (name === "visa_debit_pr") return 0.299;
    if (name === "visa_credit_pr") return 0.582;
    if (name === "mastercard_debit_pr") return 0.324;
    if (name === "mastercard_credit_pr") return 0.591;
    // if (name === "Visa V-Pay") return 0.299;
    // if (name === "UK Maestro") return 0.324;
    // if (name === "International Maestro") return 0.395;
    if (name === "visa_business_credit_pr") return 1.775;
    if (name === "visa_business_debit_pr") return 0.96;
    // if (name === "Visa Purchasing") return 2.221;
    // if (name === "Visa Corporate") return 2.221;
    if (name === "mastercard_business_pr") return 1.743;
    // if (name === "Mastercard Purchasing") return 1.949;
    // if (name === "Mastercard Fleet") return 1.951;
    if (name === "mastercard_corporate_pr") return 1.951;
    // if (name === "Mastercard Prepaid Commerciale") return 1.764;
    if (name === "all_non_eea_visa_fee_pr") return 2.538;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.58;
    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
  }
  //53269
  else if (entity_code === "53269") {
    if (name === "visa_debit_pr") return 0.279;
    if (name === "visa_credit_pr") return 0.582;
    if (name === "mastercard_debit_pr") return 0.304;
    if (name === "mastercard_credit_pr") return 0.591;
    // if (name === "Visa V-Pay") return 0.35;
    // if (name === "UK Maestro") return 0.35;
    // if (name === "International Maestro") return 0.35;
    if (name === "visa_business_credit_pr") return 1.775;
    if (name === "visa_business_debit_pr") return 0.960;
    // if (name === "Visa Purchasing") return 2.221;
    // if (name === "Visa Corporate") return 2.221;
    if (name === "mastercard_business_pr") return 1.743;
    // if (name === "Mastercard Purchasing") return 1.949;
    // if (name === "Mastercard Fleet") return 1.951;
    if (name === "mastercard_corporate_pr") return 1.951;
    if (name === "Mastercard Prepaid Commerciale") return 1.764;
    if (name === "all_non_eea_visa_fee_pr") return 2.538;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.58;
    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
  }
  //53268
  else if (entity_code === "53268") {
    if (name === "visa_debit_pr") return 0.299;
    if (name === "visa_credit_pr") return 0.602;
    if (name === "mastercard_debit_pr") return 0.324;
    if (name === "mastercard_credit_pr") return 0.611;
    // if (name === "Visa V-Pay") return 0.299;
    // if (name === "UK Maestro") return 0.324;
    // if (name === "International Maestro") return 0.415;
    if (name === "visa_business_credit_pr") return 1.795;
    if (name === "visa_business_debit_pr") return 0.980;
    // if (name === "Visa Purchasing") return 2.231;
    // if (name === "Visa Corporate") return 2.231;
    if (name === "mastercard_business_pr") return 1.763;
    if (name === "Mastercard Purchasing") return 1.969;
    // if (name === "Mastercard Fleet") return 1.971;
    if (name === "mastercard_corporate_pr") return 1.971;
    // if (name === "Mastercard Prepaid Commerciale") return 1.784;
    if (name === "all_non_eea_visa_fee_pr") return 2.558;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.6;
    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
  }

  //53265
  else if (entity_code === "53265") {
    if (name === "visa_debit_pr") return 0.319;
    if (name === "visa_credit_pr") return 0.602;
    if (name === "mastercard_debit_pr") return 0.344;
    if (name === "mastercard_credit_pr") return 0.611;
    // if (name === "Visa V-Pay") return 0.35;
    // if (name === "UK Maestro") return 0.35;
    // if (name === "International Maestro") return 0.35;
    if (name === "visa_business_credit_pr") return 1.795;
    if (name === "visa_business_debit_pr") return 0.980;
    // if (name === "Visa Purchasing") return 2.231;
    // if (name === "Visa Corporate") return 2.231;
    if (name === "mastercard_business_pr") return 1.763;
    // if (name === "Mastercard Purchasing") return 1.969;
    // if (name === "Mastercard Fleet") return 1.971;
    if (name === "mastercard_corporate_pr") return 1.971;
    // if (name === "Mastercard Prepaid Commerciale") return 1.784;
    if (name === "all_non_eea_visa_fee_pr") return 2.558;
    if (name === "all_non_eea_mastercard_fee_pr") return 2.6;
    // if (name === "Diners") return 2.1;
    // if (name === "JCB") return 2.1;
    // if (name === "Union Pay") return 2.1;
  } else {
    // alert('error 160')
    if (name === "visa_debit_pr") return 0;
    if (name === "visa_credit_pr") return 0;
    if (name === "mastercard_debit_pr") return 0;
    if (name === "mastercard_credit_pr") return 0;
    if (name === "Visa V-Pay") return 0;
    if (name === "UK Maestro") return 0;
    if (name === "International Maestro") return 0;
    if (name === "visa_business_credit_pr") return 0;
    if (name === "visa_business_debit_pr") return 0;
    if (name === "Visa Purchasing") return 0;
    if (name === "Visa Corporate") return 0;
    if (name === "mastercard_business_pr") return 0;
    if (name === "Mastercard Purchasing") return 0;
    if (name === "Mastercard Fleet") return 0;
    if (name === "mastercard_corporate_pr") return 0;
    if (name === "Mastercard Prepaid Commerciale") return 0;
    if (name === "all_non_eea_visa_fee_pr") return 0;
    if (name === "all_non_eea_mastercard_fee_pr") return 0;
    if (name === "Diners") return 0;
    if (name === "JCB") return 0;
    if (name === "Union Pay") return 0;
  }
};
export const OpportunityStatus = {
  0: "Call Back Arranged",

  1: "Agreed in Principle",

  2: "Awaiting Docs",

  3: "Docs Received",

  4: "Future Opportunity",

  5: "Already Signed with Competitor",

  6: "Not Competitive",

  7: "Not Compatible",
};
export const appStage = {
  0: {
    name: "New Application",
    bg: "btn-success",
  },
  1: {
    name: "Submitted to PS",
    bg: "btn-info",
  },
  2: {
    name: "PS Query",
    bg: "btn-danger",
  },
  3: {
    name: "Waiting to fill up the form",
    bg: "btn-secondary",
  },
  4: {
    name: "Waiting to send for Esign",
    bg: "btn-warning",
  },
  5: {
    name: "Sent for Esign",
    bg: "btn-warning",
  },
  6: {
    name: "Application signed back",
    bg: "btn-success",
  },
  7: {
    name: "Sent to Bank",
    bg: "btn-success",
  },
  8: {
    name: "SUBMISSION ERRORED",
    bg: "bg-danger",
  },
};

export const LeadStatus = {
  0: "N/A",
  1: "New",
  2: "Call back arranged",
  3: "Future Oppurtunity",
  4: "Basic Info Requested",
  5: "Converted to Opportunity",
  6: "Didn't Make Inquiry",
  7: "Already Signed with Competitor",
  8: "Wrong Details",
  9: "Not Competitive",
  10: "Not Compatible",
};
export const btnBg = (data) => {
  if (data === "Sent for Esign") return "#F9B115";
  if (data === "Waiting to fill up the form") return "#9DA5B1";
  if (data === "Waiting to send for Esign") return "#F9B115";
  if (data === "Application signed back") return "#66BB6A";
  if (data === "Sent to Bank") return "#2EB85C";
  if (data === "PS Query") return "#D32F2F";

  if (data === "Submitted to PS") return "#38B6FF";
  if (data === "Additional Location + E Comm") return "#ffc107";
  // if (data === "New App") return "#28a745";
  if (data === "Not Paid") return "#dc3545";
  if (data === "Active") {
    return "#28a745";
  } else if (data === "Inactive") {
    return "#dc3545";
  } else if (data === "Sent to Bank") {
    return "#007bff";
  } else if (data === "Auto Withdrawn") {
    return "#D32F2F";
  } else if (data === "Additional Location") {
    return "#EF5350";
  } else if (data === "Terminal Ordered") {
    return "#D32F2F";
  } else if (data === "Bank Query") {
    return "#EF5350";
  } else if (data === "Live") {
    return "#28a745";
  } else if (data === "Dispatched") {
    return "#ffc107";
  } else if (data === "New Ecomm App") {
    return "#38b6ff";
  } else if (data === "Approved") {
    return "#28a745";
  } else if (data === "New App") {
    return "#66BB6A";
  } else if (data === "Deactivated") {
    return "lightslategrey";
  } else if (data === "New App") {
    return "blue";
  } else if (data === "Open") {
    return "#28a745";
  } else if (data === "Re-opened") {
    return "#66BB6A";
  } else if (data === "Not Live") {
    return "#FFC107";
  } else if (data === "Not Transacting") {
    return "#EF5350";
  } else if (data === "Declined") {
    return "#dc3545";
  } else if (data === "Closed") {
    return "#dc3545";
  } else if (data === "Fraud Closed") {
    return "#dc3545";
  } else if (data === "Cancelled") {
    return "#EF5350";
  } else if (data === "In Arrears") {
    return "#EE8EC1";
  } else if (data === "Default") {
    return "#33B5FF";
  } else if (data === "Multiple Outlet") {
    return "#3D33FF";
  } else return "#28a745";
};
export const appType = {
  1: "New Application",
  2: "New Ecom App",
  3: "",
  4: "Change of Legal Entity",
  5: "Additional Outlet",
  6: "",
  7: "",
  8: "",
  9: "Multiple Outlets",
};
export const aqBank = {
  0: "Elavon",
  1: "First Data",
  2: "Emerchantpay",
  3: "Worldpay",
};

