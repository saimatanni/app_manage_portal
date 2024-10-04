import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CCol, CRow, CButton } from "@coreui/react";
import calender from "../../../../assets/img/calendar.svg";
import {
  GetLeadsnput,

  SetLeadsQualifyStatusFalse,
  SetafterQualifyStatusFalse,
  UpdateConvertPriceQuote,
} from "../_redux/action/LeadAction";
import Modal from "react-bootstrap/Modal";

import { GetAllProductList } from "src/views/common/_redux/action/CommonAction";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { showToast } from "src/utils/ToastHelper";

import NewCostAnalysisPdf from "src/views/menus/NewCostAnalysisPdf";
import "./Retrieve.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function RetrieveCostAnalysis() {
  const dispatch = useDispatch();
  const userDataCookie = Cookies.get("userData");
  const location = useLocation();
  const [transaction, setTransaction] = useState("");
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const afterSuccessqualify = useSelector(
    (state) => state.leadInfo.afterSuccessqualify
  );

  const allProductList = useSelector(
    (state) => state.commonInfo.allProductList
  );
  // const leadQualify = useSelector((state) => state.leadInfo.leadQualify);
  const userData = JSON.parse(Cookies.get("userData"));
  const isValueLessThanMin = (value, minValue) => {
    return Number(value) < minValue;
  };
  useEffect(() => {
    dispatch(
      GetAllProductList(
        `${process.env.REACT_APP_BASE_URL}api/v1/product/product/`
      )
    );
    // dispatch(GetLeadsnput("annual_card_turnover", ""));
    // dispatch(GetLeadsnput("atv", ""));
  }, []);
  React.useEffect(() => {
    dispatch(
      GetLeadsnput("lead_products", [
        ...(leadInput?.terminal_products ?? []),
        ...(leadInput?.ecommerce_products ?? []),
        ...(leadInput?.epos_products ?? []),
      ])
    );
  }, []);
  React.useEffect(() => {
    if (transaction) {
      if (leadInput.annual_card_turnover && leadInput.atv) {
        dispatch(
          GetLeadsnput(
            "num_of_transaction",
            Math.floor(
              parseFloat(leadInput.annual_card_turnover) /
                parseFloat(leadInput.atv)
            )
          )
        );
        dispatch(
          GetLeadsnput(
            "per_transactional_charge_tr_no",
            Math.floor(
              parseFloat(leadInput.annual_card_turnover) /
                parseFloat(leadInput.atv)
            )
          )
        );
        dispatch(
          GetLeadsnput(
            "authorization_fee_tr_no",
            Math.floor(
              parseFloat(leadInput.annual_card_turnover) /
                parseFloat(leadInput.atv)
            )
          )
        );
      }
    }
  }, [transaction]);
  // const handleChangeInput = (name, value, e) => {
  //   dispatch(GetLeadsnput(name, value, e));
  //   if (value === "") {
  //     dispatch(GetLeadsnput(name, null, e));
  //   }

   
  // };
  const handleChangeInput = (name, value, e) => {
    // First, update the current input field
    let updatedValue = value === "" ? null : value;
    dispatch(GetLeadsnput(name, updatedValue, e));
  
    // Check if the input name ends with '_ts', indicating it's part of the annual turnover calculation
    if (name.endsWith('_ts')) {
      // Convert the input value to a number; treat empty or invalid input as 0
      updatedValue = parseFloat(updatedValue) || 0;
  
      // Assume getCurrentLeadInputState is a function that retrieves the current state of leadInput
      const currentState = leadInput;
  
      // Sum all '_ts' values, including the newly updated value
      const totalSum = Object.keys(currentState)
        .filter(key => key.endsWith('_ts') && key !== name) // Exclude the current '_ts' being updated to avoid old value
        .reduce((sum, key) => sum + (parseFloat(currentState[key]) || 0), updatedValue);
  
      // Update the annual_card_turnover with the new total sum
      // Here, UpdateAnnualCardTurnover could be a separate action or part of your existing action creators
      dispatch(GetLeadsnput("annual_card_turnover",totalSum));
    }
  };
  let visa_devit_cost =
    ((parseFloat(leadInput.visa_debit_cr) || 0) *
      (leadInput.visa_debit_ts || 0)) /
    100;

  let master_devit_cost =
    ((parseFloat(leadInput.mastercard_debit_cr) || 0) *
      leadInput.mastercard_debit_ts || 0) / 100;
  let visa_credit_cost =
    ((parseFloat(leadInput.visa_credit_cr) || 0) * leadInput.visa_credit_ts ||
      0) / 100;

  let master_credit_cost =
    (parseFloat(leadInput.mastercard_credit_cr || 0) *
      leadInput.mastercard_credit_ts || 0) / 100;
  let visa_buss_debit =
    ((parseFloat(leadInput.visa_business_debit_cr) || 0) *
      leadInput.visa_business_debit_ts || 0) / 100;
  let visa_buss_credit =
    ((parseFloat(leadInput.visa_business_credit_cr) || 0) *
      leadInput.visa_business_credit_ts || 0) / 100;
  let master_buss =
    ((parseFloat(leadInput.mastercard_business_cr) || 0) *
      leadInput.mastercard_business_ts || 0) / 100;
  let master_corporet =
    ((parseFloat(leadInput.mastercard_corporate_cr) || 0) *
      leadInput.mastercard_corporate_ts || 0) / 100;
  let non_eee_cc =
    (parseFloat(leadInput.all_non_eea_visa_fee_cr || 0) *
      leadInput.all_non_eea_visa_fee_ts || 0) / 100;
  let non_eea_mastercard_cc =
    (parseFloat(leadInput.all_non_eea_mastercard_fee_cr || 0) *
      leadInput.all_non_eea_mastercard_fee_ts || 0) / 100;
  let amex_card_cc =
    (parseFloat(leadInput.amex_cr || 0) * leadInput.amex_ts || 0) / 100;

  let auth_fee =
    parseFloat(leadInput.authorization_fee_cr || 0) *
    leadInput.authorization_fee_tr_no;

  // ======payment save==================
  let visa_devit_cost_ps =
    ((parseFloat(leadInput.visa_debit_pr) || 0) * leadInput.visa_debit_ts ||
      0) / 100;
  let master_devit_cost_ps =
    ((parseFloat(leadInput.mastercard_debit_pr) || 0) *
      leadInput.mastercard_debit_ts || 0) / 100;
  let visa_credit_cost_ps =
    ((parseFloat(leadInput.visa_credit_pr) || 0) * leadInput.visa_credit_ts ||
      0) / 100;

  let master_credit_cost_ps =
    ((parseFloat(leadInput.mastercard_credit_pr) || 0) *
      leadInput.mastercard_credit_ts || 0) / 100;
  let visa_buss_debit_ps =
    (parseFloat(leadInput.visa_business_debit_pr || 0) *
      leadInput.visa_business_debit_ts || 0) / 100;
  let visa_buss_credit_ps =
    (parseFloat(leadInput.visa_business_credit_pr || 0) *
      leadInput.visa_business_credit_ts || 0) / 100;
  let master_buss_ps =
    (parseFloat(leadInput.mastercard_business_pr || 0) *
      leadInput.mastercard_business_ts || 0) / 100;
  let master_cor_ps =
    (parseFloat(leadInput.mastercard_corporate_pr || 0) *
      leadInput.mastercard_corporate_ts || 0) / 100;
  let non_eee_pc =
    (parseFloat(leadInput.all_non_eea_visa_fee_pr || 0) *
      leadInput.all_non_eea_visa_fee_ts || 0) / 100;
  let non_eea_mastercard_ps =
    (parseFloat(leadInput.all_non_eea_mastercard_fee_pr || 0) *
      leadInput.all_non_eea_mastercard_fee_ts || 0) / 100;
  let amex_card_ps =
    (parseFloat(leadInput.amex_sr || 0) * leadInput.amex_ts || 0) / 100;

  let auth_fee_ps =
    parseFloat(leadInput.authorization_fee_pr || 0) *
    leadInput.authorization_fee_tr_no;
  
  let per_trans_pcharge_cc =
    parseFloat(leadInput.per_transactional_charge_cr || 0) *
    leadInput.per_transactional_charge_tr_no;

  let per_trans_pcharge_pc =
    parseFloat(leadInput.per_transactional_charge_pr || 0) *
    leadInput.per_transactional_charge_tr_no;

  let portal_reporting_cc =
    parseFloat(leadInput.portal_reporting_fee_cr || 0) * 1;
  let portal_reporting_pc =
    parseFloat(leadInput.portal_reporting_fee_pr || 0) * 1;

  let Pci_dss_fee_cc = parseFloat(leadInput.pci_dss_fee_cr || 0) * 1;
  let Pci_dss_fee_pc = parseFloat(leadInput.pci_dss_fee_pr || 0) * 1;

  let terminal_rental_cc =
    parseFloat(leadInput.terminal_rental_fee_cr || 0) *
    parseFloat(leadInput.num_of_terminals || 0) *
    1;
  let terminal_rental_pc =
    parseFloat(leadInput.terminal_rental_fee_pr || 0) *
    parseFloat(leadInput.num_of_terminals || 0) *
    1;
  useEffect(() => {
    dispatch(GetLeadsnput("visa_debit_cc", visa_devit_cost.toFixed(2)));
  }, [visa_devit_cost]);

  useEffect(() => {
    let totalCurrentCost = 0;

    // List of properties to sum
    const propertiesToSum = [
      "visa_debit_cc",
      "visa_credit_cc",
      "mastercard_debit_cc",
      "mastercard_credit_cc",
      "visa_business_debit_cc",
      "visa_business_credit_cc",
      "mastercard_business_cc",
      "card_transaction_fee_cc",

      "per_transactional_charge_cc",
      "portal_reporting_fee_cc",
      "authorization_fee_cc",

      "pci_dss_fee_cc",
      "all_non_eea_visa_fee_cc",
      "all_non_eea_mastercard_fee_cc",

      "terminal_rental_fee_cc",
      "mastercard_corporate_cc",
      "amex_cc",
      // ... Add all other properties here
    ];

    // Loop through the properties and sum their numeric values
    for (const property of propertiesToSum) {
      const propertyValue = parseFloat(leadInput?.[property]) || 0; // Convert to float or default to 0
      totalCurrentCost += propertyValue;
    }

    // Convert the total to a fixed 2-decimal string
    totalCurrentCost = totalCurrentCost.toFixed(2);
    const variables = [
      leadInput?.visa_debit_cc,
      parseFloat(leadInput?.mastercard_debit_cc),
      leadInput?.visa_credit_cc,
      parseFloat(leadInput?.mastercard_credit_cc),
      parseFloat(leadInput?.visa_business_credit_cc),
      parseFloat(leadInput?.visa_business_debit_cc),
      parseFloat(leadInput?.card_transaction_fee_cc),
      parseFloat(leadInput?.authorization_fee_cc),
      parseFloat(leadInput?.portal_reporting_fee_cc),
      parseFloat(leadInput?.per_transactional_charge_cc),
      parseFloat(leadInput?.pci_dss_fee_cc),
      parseFloat(leadInput?.all_non_eea_visa_fee_cc),
      parseFloat(leadInput?.all_non_eea_mastercard_fee_cc),
      parseFloat(leadInput?.terminal_rental_fee_cc),
      parseFloat(leadInput?.mastercard_business_cc),
      parseFloat(leadInput?.mastercard_corporate_cc),
      parseFloat(leadInput?.amex_cc),
    ];
    dispatch(GetLeadsnput("totalCurrentCost", totalCurrentCost));
    const updatedVariables1 = variables.map((variable) => parseFloat(variable));
    dispatch(GetLeadsnput("updatedVariables1", updatedVariables1));
  }, [
    leadInput?.visa_debit_cc,
    leadInput?.visa_credit_cc,
    leadInput?.mastercard_debit_cc,
    leadInput?.mastercard_credit_cc,
    leadInput?.visa_business_debit_cc,
    leadInput?.card_transaction_fee_cc,
    leadInput?.authorization_fee_cc,
    leadInput?.per_transactional_charge_cc,
    leadInput?.portal_reporting_fee_cc,
    leadInput?.pci_dss_fee_cc,
    leadInput?.all_non_eea_visa_fee_cc,
    leadInput?.all_non_eea_mastercard_fee_cc,
    leadInput?.mastercard_corporate_cc,
    leadInput?.terminal_rental_fee_cc,
    leadInput?.visa_business_credit_cc,
    leadInput?.amex_cc,
  ]);

  useEffect(() => {
    let totalPsCost = 0;

    // List of properties to sum
    const propertiesToSum = [
      "visa_debit_pc",
      "visa_credit_pc",
      "mastercard_debit_pc",
      "mastercard_credit_pc",
      "visa_business_debit_pc",
      "visa_business_credit_pc",
      "mastercard_business_pc",
      "card_transaction_fee_pc",

      "per_transactional_charge_pc",
      "portal_reporting_fee_pc",
      "authorization_fee_pc",

      "pci_dss_fee_pc",
      "all_non_eea_visa_fee_pc",
      "all_non_eea_mastercard_fee_pc",

      "terminal_rental_fee_pc",
      "mastercard_corporate_pc",
      "amex_pc",
      // ... Add all other properties here
    ];

    // Loop through the properties and sum their numeric values
    for (const property of propertiesToSum) {
      const propertyValue = parseFloat(leadInput?.[property]) || 0; // Convert to float or default to 0
      totalPsCost += propertyValue;
    }

    // Convert the total to a fixed 2-decimal string
    totalPsCost = totalPsCost.toFixed(2);
    const variable2 = [
      parseFloat(leadInput?.visa_debit_pc),
      parseFloat(leadInput?.visa_credit_pc),
      parseFloat(leadInput?.mastercard_debit_pc),
      parseFloat(leadInput?.mastercard_credit_pc),
      parseFloat(leadInput?.visa_business_debit_pc),
      parseFloat(leadInput?.visa_business_credit_pc),
      parseFloat(leadInput?.card_acceptance_fee_pc),
      parseFloat(leadInput?.card_transaction_fee_pc),
      parseFloat(leadInput?.authorization_fee_pc),
      parseFloat(leadInput?.per_transactional_charge_pc),
      parseFloat(leadInput?.portal_reporting_fee_pc),
      parseFloat(leadInput?.pci_dss_fee_pc),
      parseFloat(leadInput?.terminal_rental_fee_pc),
      parseFloat(leadInput?.all_non_eea_visa_fee_pc),
      parseFloat(leadInput?.mastercard_corporate_pc),
      parseFloat(leadInput?.all_non_eea_mastercard_fee_pc),
      parseFloat(leadInput?.amex_pc),
      leadInput?.visa_business_credit_pc,
    ];
    dispatch(GetLeadsnput("total_pc", totalPsCost));
    const updatedVariables2 = variable2.map((variable) => parseFloat(variable));
    dispatch(GetLeadsnput("updatedVariables2", updatedVariables2));
  }, [
    leadInput?.visa_debit_pc,
    leadInput?.visa_credit_pc,
    leadInput?.mastercard_debit_pc,
    leadInput?.mastercard_credit_pc,
    leadInput?.visa_business_debit_pc,
    leadInput?.card_transaction_fee_pc,
    leadInput?.visa_business_credit_pc,
    leadInput?.card_acceptance_fee_pc,
    leadInput?.authorization_fee_pc,
    leadInput?.per_transactional_charge_pc,
    leadInput?.portal_reporting_fee_pc,
    leadInput?.pci_dss_fee_pc,
    leadInput?.all_non_eea_visa_fee_pc,
    leadInput?.all_non_eea_mastercard_fee_pc,
    leadInput?.terminal_rental_fee_pc,
    leadInput?.visa_business_credit_pc,
    leadInput?.amex_pc,
  ]);

  useEffect(() => {
    const percent =
      ((leadInput.totalCurrentCost - leadInput.total_pc) /
        leadInput.totalCurrentCost) *
        100 !==
      NaN
        ? ((leadInput.totalCurrentCost - leadInput.total_pc) /
            leadInput.totalCurrentCost) *
          100
        : 0;
    // dispatch(GetLeadsnput("totalCurrentCost", totalCurrentCost()));
    // dispatch(GetLeadsnput("total_pc", totalPaymentsaveCost()));
    dispatch(GetLeadsnput("percent", percent.toFixed(2)));
  }, [leadInput.totalCurrentCost, leadInput.total_pc]);

  useEffect(() => {
    //  --------payment save cost---------
    dispatch(GetLeadsnput("visa_debit_pc", visa_devit_cost_ps.toFixed(2)));
    dispatch(
      GetLeadsnput("mastercard_debit_pc", master_devit_cost_ps.toFixed(2))
    );
    dispatch(GetLeadsnput("visa_credit_pc", visa_credit_cost_ps.toFixed(2)));
    dispatch(
      GetLeadsnput("mastercard_credit_pc", master_credit_cost_ps.toFixed(2))
    );
    dispatch(
      GetLeadsnput("visa_business_debit_pc", visa_buss_debit_ps.toFixed(2))
    );

    dispatch(GetLeadsnput("mastercard_corporate_pc", master_cor_ps.toFixed(2)));
    dispatch(GetLeadsnput("mastercard_business_pc", master_buss_ps.toFixed(2)));
    dispatch(
      GetLeadsnput("visa_business_credit_pc", visa_buss_credit_ps.toFixed(2))
    );
    // dispatch(GetLeadsnput("card_acceptance_fee_pc", card_acc_ps.toFixed(2)));
    // dispatch(GetLeadsnput("card_transaction_fee_pc", card_trans_ps.toFixed(2)));
    dispatch(GetLeadsnput("authorization_fee_pc", auth_fee_ps.toFixed(2)));
    dispatch(GetLeadsnput("all_non_eea_visa_fee_pc", non_eee_pc.toFixed(2)));
    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_pc",
        non_eea_mastercard_ps.toFixed(2)
      )
    );
    dispatch(GetLeadsnput("amex_pc", amex_card_ps.toFixed(2)));
    dispatch(GetLeadsnput("Pci_dss_fee_pc", Pci_dss_fee_pc.toFixed(2)));

    //  --------curr cost---------

    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_cc",
        non_eea_mastercard_cc.toFixed(2)
      )
    );
    dispatch(GetLeadsnput("amex_cc", amex_card_cc.toFixed(2)));
    dispatch(GetLeadsnput("mastercard_debit_cc", master_devit_cost.toFixed(2)));
    dispatch(GetLeadsnput("visa_credit_cc", visa_credit_cost.toFixed(2)));
    dispatch(
      GetLeadsnput("mastercard_credit_cc", master_credit_cost.toFixed(2))
    );
    dispatch(
      GetLeadsnput("visa_business_debit_cc", visa_buss_debit.toFixed(2))
    );
    dispatch(
      GetLeadsnput("visa_business_credit_cc", visa_buss_credit.toFixed(2))
    );
    dispatch(GetLeadsnput("mastercard_business_cc", master_buss.toFixed(2)));
    dispatch(GetLeadsnput("all_non_eea_visa_fee_cc", non_eee_cc.toFixed(2)));
    dispatch(
      GetLeadsnput("mastercard_corporate_cc", master_corporet.toFixed(2))
    );
    dispatch(GetLeadsnput("authorization_fee_cc", auth_fee.toFixed(2)));
    dispatch(GetLeadsnput("Pci_dss_fee_cc", Pci_dss_fee_cc.toFixed(2)));
  }, [
    auth_fee,
    ,
    Pci_dss_fee_cc,
    master_corporet,
    master_buss,
    visa_buss_credit,
    visa_buss_debit,
    master_credit_cost,
    visa_credit_cost,
    master_devit_cost,
    auth_fee_ps,
    visa_buss_credit_ps,
    visa_devit_cost_ps,
    master_devit_cost_ps,
    visa_credit_cost_ps,
    master_credit_cost_ps,
    visa_buss_debit_ps,
    master_buss_ps,
    master_cor_ps,
    Pci_dss_fee_pc,
  ]);
  useEffect(() => {
    dispatch(
      GetLeadsnput(
        "per_transactional_charge_cc",
        per_trans_pcharge_cc.toFixed(2)
      )
    );
    dispatch(
      GetLeadsnput(
        "per_transactional_charge_pc",
        per_trans_pcharge_pc.toFixed(2)
      )
    );
    dispatch(
      GetLeadsnput("portal_reporting_fee_cc", portal_reporting_cc.toFixed(2))
    );
    dispatch(
      GetLeadsnput("portal_reporting_fee_pc", portal_reporting_pc.toFixed(2))
    );
    dispatch(GetLeadsnput("pci_dss_fee_cc", Pci_dss_fee_cc.toFixed(2)));
    dispatch(GetLeadsnput("pci_dss_fee_pc", Pci_dss_fee_pc.toFixed(2)));
    dispatch(
      GetLeadsnput("terminal_rental_fee_cc", terminal_rental_cc.toFixed(2))
    );
    dispatch(
      GetLeadsnput("terminal_rental_fee_pc", terminal_rental_pc.toFixed(2))
    );
    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_cc",
        non_eea_mastercard_cc.toFixed(2)
      )
    );
    dispatch(GetLeadsnput("amex_cc", amex_card_cc.toFixed(2)));
    dispatch(
      GetLeadsnput(
        "all_non_eea_mastercard_fee_pc",
        non_eea_mastercard_ps.toFixed(2)
      )
    );
    dispatch(GetLeadsnput("amex_pc", amex_card_ps.toFixed(2)));
    dispatch(GetLeadsnput("all_non_eea_visa_fee_cc", non_eee_cc.toFixed(2)));
    dispatch(GetLeadsnput("all_non_eea_visa_fee_pc", non_eee_pc.toFixed(2)));
  }, [
    per_trans_pcharge_cc,
    per_trans_pcharge_pc,
    portal_reporting_pc,
    portal_reporting_cc,
    Pci_dss_fee_cc,
    Pci_dss_fee_pc,
    terminal_rental_cc,
    terminal_rental_pc,
    non_eee_pc,
    non_eee_cc,
    non_eea_mastercard_ps,
    non_eea_mastercard_cc,
    amex_card_cc,
    amex_card_ps,
  ]);
  let navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";

    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  const leadQualifyCheck = useSelector(
    (state) => state.leadInfo.leadQualifyCheck
  );
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  const handleConvertTopriceQuote = (data, user) => {
    if (emailDetails?.message === "Invalid Email Provided") {
      showToast("error", "Email is not valid");
      return 0;
    }
    dispatch(GetLeadsnput("user", user));

    dispatch(UpdateConvertPriceQuote(data));
  };

  useEffect(() => {
    if (afterSuccessqualify === true) {
      // dispatch(QualifyLeadList());

      dispatch(SetLeadsQualifyStatusFalse());
    }
  }, [afterSuccessqualify]);

  useEffect(() => {
    if (leadQualifyCheck === true) {
      // navigate(`/pricequote`);
      navigate(`/opportunity-retrive`);
      dispatch(SetafterQualifyStatusFalse());
      // dispatch(GetPriceQuoteDetails(priceQuoteInput.lead_qualify_id));
    }
  }, [leadQualifyCheck]);

  // ----revenue calculation--
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getDataForRevineue = () => {
    if (leadInput.atv < 1 || leadInput.annual_card_turnover < 1) {
      showToast("error", "Enter Valid Data");
    }
    //  else if (leadInput.annual_card_turnover * 12 >= 2000000) {
    //   showToast("error", "Enter Valid Data");
    // }
    else {
      showToast("success", "Valid Data Added.");
      navigate("/revenue-calculator");
    }
  };

  const cRef = useRef();

  const handleChangeDebitData = (name, value, e) => {
    if (value === "") {
      dispatch(GetLeadsnput(name, null, e));
    } else {
      dispatch(GetLeadsnput(name, value, e));
    }
    const newValue = parseFloat(value || 0);
    dispatch(
      GetLeadsnput(
        "mastercard_debit_pr",
        parseFloat(newValue + 0.03).toFixed(3)
      )
    );
  };
  const [focused, setFocused] = useState(false);
  const [focusedSign, setFocusedSign] = useState(false);
  // useEffect(() => {
  //   if(location.pathname.includes('cost-analysis')){

  //     dispatch(SetLeadsStatusFalse());
  //   }
  // }, [])

  const exportAsPDF = () => {
    const pdfContent = document.getElementById("pdf-content");

    // Create a new jsPDF instance
    const pdf = new jsPDF({
      orientation: "portrait", // or 'landscape' for landscape orientation
      unit: "mm", // use 'mm' for units in millimeters
      format: "a4", // specify the page format as 'a4'
    });

    // Increase the scale to improve resolution
    const scale = 2; // You can adjust this value as needed

    // Convert the content to an image using html2canvas with a higher scale
    html2canvas(pdfContent, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0); // Convert canvas to JPEG image data

      // Calculate the dimensions to fit the image within the A4 page size
      const pageWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm

      // Adjust the desired height (you can modify this value as needed)
      const desiredHeight = pageHeight - 20; // Subtract 20mm from the page height

      // Calculate the image height to maintain aspect ratio while fitting the desired height
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // Ensure the image height does not exceed the desired height
      const finalImgHeight = Math.min(imgHeight, desiredHeight);
      const actuleHight = finalImgHeight + 20;
      // Apply a 150% zoom effect by increasing the image width and height

      // Add the image to the PDF
      // pdf.addImage(imgData, "JPEG", 0, 0, zoomedWidth, zoomedHeight);
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, actuleHight);

      // Save or download the PDF
      pdf.save("Cost Analysis.pdf");
    });
  };

  return (
    <div className="leads re_cost">
      <div
        id="pdf-content"
        // className="hidden-pdf-content"
        style={{
          position: "absolute",
          top: "-7501px",
          zIndex: -1,
          width: "1240px",
        }}
      >
        <NewCostAnalysisPdf cRef={cRef} />
      </div>
      <CRow>
        <CCol col-12>
          <img src={calender} width="25" alt="" />
          <strong> Cost Analysis </strong> <br />
          <br />
          <div className="row">
            {/* //for small device */}
            <div className="d-xl-none d-block">
              <div className=" row">
                <div className=" col-5 py-2">
                  <p style={{ fontWeight: "600", color: "#3c4b64 !important" }}>
                    Monthly Card Turnover<span style={{ color: "#DD2C00" }}>*</span> :{" "}
                    
                  </p>
                </div>
                <div className=" col-5">
                  <input
                    // style={{ width: "auto" }}
                    type="number"
                    className="form-control "
                    required
                    onWheel={(e) => e.target.blur()}
                    name="annual_card_turnover"
                    value={leadInput.annual_card_turnover}
                    onChange={(e) => {
                      handleChangeInput("annual_card_turnover", e.target.value);
                      setTransaction(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className=" row">
                <div className="col-5 py-2">
                  <p style={{ fontWeight: "600", color: "#3c4b64 !important" }}>
                    ATV <span style={{ color: "#DD2C00" }}>*</span> :
                  </p>
                </div>
                <div className=" col-5">
                  <input
                    // style={{ width: "auto" }}
                    type="number"
                    className="form-control "
                    required
                    onWheel={(e) => e.target.blur()}
                    name="atv"
                    value={leadInput.atv}
                    onChange={(e) => {
                      handleChangeInput("atv", e.target.value);
                      setTransaction(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className=" col-5 py-2">
                  <p style={{ fontWeight: "600", color: "#3c4b64 !important" }}>
                    Num Of Transaction<span style={{ color: "#DD2C00" }}>*</span> :
                 
                  </p>
                </div>
                <div className=" col-5">
                  <input
                    // style={{ width: "auto" }}
                    type="number"
                    className="form-control "
                    required
                    onWheel={(e) => e.target.blur()}
                    name="num_of_transaction"
                    value={leadInput.num_of_transaction}
                    onChange={(e) => {
                      handleChangeInput("num_of_transaction", e.target.value);
                      handleChangeInput(
                        "per_transactional_charge_tr_no",
                        e.target.value
                      );
                      handleChangeInput(
                        "authorization_fee_tr_no",
                        e.target.value
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            {/* //for large device */}
            <div className="d-xl-flex align-items-center gap-3 mb-4 flex-md-row flex-column  d-none">
              <div className="d-flex gap-2 align-items-center">
                <p
                  style={{
                    fontWeight: "600",
                    color: "#3c4b64 !important",
                    marginBottom: 0,
                  }}
                >
                  Monthly Card Turnover<span style={{ color: "#DD2C00" }}>*</span> :{" "}
                  
                </p>
                <input
                  style={{ width: "auto" }}
                  type="number"
                  className="form-control "
                  required
                  onWheel={(e) => e.target.blur()}
                  name="annual_card_turnover"
                  value={leadInput.annual_card_turnover}
                  onChange={(e) => {
                    handleChangeInput("annual_card_turnover", e.target.value);
                    setTransaction(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <p
                  style={{
                    fontWeight: "600",
                    color: "#3c4b64 !important",
                    marginBottom: 0,
                  }}
                >
                  ATV<span style={{ color: "#DD2C00" }}>*</span> : 
                </p>
                <input
                  style={{ width: "auto" }}
                  type="number"
                  className="form-control "
                  required
                  onWheel={(e) => e.target.blur()}
                  name="atv"
                  value={leadInput.atv}
                  onChange={(e) => {
                    handleChangeInput("atv", e.target.value);
                    setTransaction(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <p
                  style={{
                    fontWeight: "600",
                    color: "#3c4b64 !important",
                    marginBottom: 0,
                  }}
                >
                  Num Of Transaction<span style={{ color: "#DD2C00" }}>*</span> :{" "}
                  {/* <span style={{ color: "#DD2C00" }}>*</span> */}
                </p>
                <input
                  style={{ width: "auto" }}
                  type="number"
                  className="form-control "
                  required
                  onWheel={(e) => e.target.blur()}
                  name="num_of_transaction"
                  value={parseInt(leadInput.num_of_transaction)}
                  onChange={(e) => {
                    handleChangeInput("num_of_transaction", e.target.value);
                    handleChangeInput(
                      "per_transactional_charge_tr_no",
                      e.target.value
                    );
                    handleChangeInput(
                      "authorization_fee_tr_no",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table
                className="table table-striped number-center "
                id="myInput"
              >
                <thead>
                  <tr>
                    <th className="col-1">Card Type</th>
                    <th className="col-1">Current Rate</th>
                    <th className="col-1">Paymentsave Rate</th>
                    <th className="col-1" style={{ minWidth: "100px" }}>
                      Monthly Turnover
                    </th>
                    {/* <th className="col-1">Number of Transactions</th> */}
                    <th className="col-1">Current Cost</th>
                    <th className="col-1">Paymentsave Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "600" }}>
                      {" "}
                      VISA Debit (Personal)
                    </td>
                    <td>
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          type="number"
                          className={`form-control px-4 `}
                          // placeholder="%"
                          name="visa_debit_cr"
                          min={0}
                          value={
                            leadInput.visa_debit_cr === 0.0
                              ? ""
                              : leadInput.visa_debit_cr
                          }
                          onWheel={(e) => e.target.blur()}
                          // onFocus={(e) => setFocused(true)}
                          // onBlur={(e) => setFocused(false)}
                          onChange={(e) => {
                            handleChangeInput("visa_debit_cr", e.target.value);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0.35}
                          type="number"
                          className={`form-control px-4 ${
                            isValueLessThanMin(leadInput.visa_debit_pr, 0.35)
                              ? "red-alert"
                              : ""
                          }`}
                          name="visa_debit_pr"
                          
                          value={leadInput.visa_debit_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeDebitData(
                              "visa_debit_pr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`currency-input ${
                          focusedSign ? "focused" : ""
                        }`}
                      >
                        <input
                          min={0}
                          type="number"
                          className="form-control px-4 "
                          // placeholder="£"
                          name="visa_debit_ts"
                          value={parseInt(leadInput.visa_debit_ts)}
                          onWheel={(e) => e.target.blur()}
                          // onFocus={(e) => setFocusedSign(true)}
                          // onBlur={(e) => setFocusedSign(false)}
                          onChange={(e) =>
                            handleChangeInput("visa_debit_ts", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    {/* <td>
                    <input
                      min={0}
                      type="number"
                      name="visa_debit_tr_no"
                      // value={
                      //   parseInt(leadInput.visa_debit_tr_no) === 0
                      //     ? ""
                      //     : parseInt(leadInput.visa_debit_tr_no)
                      // }
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput("visa_debit_tr_no", e.target.value)
                      }
                      className="form-control px-4"
                      disabled
                    />
                  </td> */}
                    <td style={{ background: "#e55353" }}>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          type="text"
                          name="visa_debit_cc"
                         
                          value={visa_devit_cost.toFixed(2)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("visa_debit_cc", e.target.value)
                          }
                          className="form-control px-4"
                          // placeholder="£"
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="text"
                          name="visa_debit_pc"
                          disabled
                          value={visa_devit_cost_ps.toFixed(2)}
                          // value={leadInput.visa_debit_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("visa_debit_pc", e.target.value)
                          }
                          className="form-control px-4"
                          // placeholder="£"
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>Mastercard Debit</td>
                    <td>
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          className="form-control px-4"
                          // placeholder="%"
                          name="mastercard_debit_cr"
                          value={leadInput.mastercard_debit_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_debit_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0.38}
                          type="number"
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.mastercard_debit_pr,
                              0.38
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          name="mastercard_debit_pr"
                          value={leadInput.mastercard_debit_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_debit_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          name="mastercard_debit_ts"
                          value={parseInt(leadInput.mastercard_debit_ts)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_debit_ts",
                              e.target.value
                            )
                          }
                          className="form-control px-4"
                          // placeholder="£"
                        />
                      </div>
                    </td>
                   
                    <td style={{ background: "#e55353" }}>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="text"
                          name="mastercard_debit_cc"
                          // value={leadInput.mastercard_debit_cc}
                          value={master_devit_cost.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_debit_cc",
                              e.target.value
                            )
                          }
                          className="form-control px-4"
                          // placeholder="£"
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="text"
                          className="form-control px-4"
                          // placeholder="£"
                          name="mastercard_debit_pc"
                          value={master_devit_cost_ps.toFixed(2)}
                          disabled
                          // value={leadInput.mastercard_debit_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_debit_pc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }}>
                      VISA Credit (Personal)
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          name="visa_credit_cr"
                          value={leadInput.visa_credit_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("visa_credit_cr", e.target.value)
                          }
                          className={`form-control px-4 ${
                            isValueLessThanMin(leadInput.visa_credit_cr, 0.65)
                              ? "red-alert"
                              : ""
                          }`}
                          // placeholder="%"
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0.65}
                          type="number"
                          className={`form-control px-4 ${
                            isValueLessThanMin(leadInput.visa_credit_pr, 0.65)
                              ? "red-alert"
                              : ""
                          }`}
                          name="visa_credit_pr"
                          value={leadInput.visa_credit_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => {
                            handleChangeInput("visa_credit_pr", e.target.value);
                            handleChangeInput(
                              "mastercard_credit_pr",
                              e.target.value
                            );
                          }}
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          className="form-control px-4"
                          // placeholder="£"
                          name="visa_credit_ts"
                          value={parseInt(leadInput.visa_credit_ts)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("visa_credit_ts", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                   
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="text"
                          className="form-control px-4"
                          // placeholder="£"
                          name="visa_credit_cc"
                          // value={leadInput.visa_credit_cc}
                          value={visa_credit_cost.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("visa_credit_cc", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="text"
                          className="form-control px-4"
                          name="visa_credit_pc"
                          value={visa_credit_cost_ps.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("visa_credit_pc", e.target.value)
                          }
                          // placeholder="£"
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  {/* ----------------------master credit---------------------- */}

                  <tr>
                    <td style={{ fontWeight: "600" }}>Mastercard Credit</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className={`form-control px-4 `}
                          type="number"
                          // placeholder="%"
                          name="mastercard_credit_cr"
                          value={leadInput.mastercard_credit_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_credit_cr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0.65}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.mastercard_credit_pr,
                              0.65
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="mastercard_credit_pr"
                          value={leadInput.mastercard_credit_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_credit_pr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_credit_ts"
                          value={parseInt(leadInput.mastercard_credit_ts)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_credit_ts",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                   
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_credit_cc"
                          // value={leadInput.mastercard_credit_cc}
                          value={master_credit_cost.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_credit_cc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_credit_pc"
                          value={master_credit_cost_ps.toFixed(2)}
                          disabled
                          // onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_credit_pc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>

                  {/* ==========================visa business debit==================== */}
                  <tr>
                    <td style={{ fontWeight: "600" }}>Visa Business Debit</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.visa_business_debit_cr,
                              0
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="visa_business_debit_cr"
                          value={leadInput.visa_business_debit_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_cr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          // readOnly
                          // style={{ cursor: "not-allowed" }}
                          min={1.2}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.visa_business_debit_pr,
                              1.2
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="visa_business_debit_pr"
                          value={leadInput.visa_business_debit_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_pr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="visa_business_debit_ts"
                          value={parseInt(leadInput.visa_business_debit_ts)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_ts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                   
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="visa_business_debit_cc"
                          value={visa_buss_debit.toFixed(2)}
                          disabled
                          // value={leadInput.visa_business_debit_cc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_cc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="visa_business_debit_pc"
                          value={visa_buss_debit_ps.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_debit_pc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  {/* ====================visa business credit============= */}
                  <tr>
                    {/* ------------------------------visa business credit---------------------------- */}
                    <td style={{ fontWeight: "600" }}>Visa Business Credit</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="visa_business_credit_cr"
                          value={leadInput.visa_business_credit_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          readOnly
                          style={{ cursor: "not-allowed" }}
                          min={1.9}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.visa_business_credit_pr,
                              1.9
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="visa_business_credit_pr"
                          value={leadInput.visa_business_credit_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="visa_business_credit_ts"
                          value={leadInput.visa_business_credit_ts}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_ts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="visa_business_credit_cc"
                          value={visa_buss_credit.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_cc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="visa_business_credit_pc"
                          value={visa_buss_credit_ps.toFixed(2)}
                          disabled
                          // value={leadInput.visa_business_credit_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "visa_business_credit_pc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>

                  {/* ===================mastercard================ */}
                  <tr>
                    {/* ------------------------------visa business credit---------------------------- */}
                    <td style={{ fontWeight: "600" }}>Mastercard Business</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="mastercard_business_cr"
                          value={leadInput.mastercard_business_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_business_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          readOnly
                          style={{ cursor: "not-allowed" }}
                          min={1.9}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.mastercard_business_pr,
                              1.9
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="mastercard_business_pr"
                          value={leadInput.mastercard_business_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_business_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_business_ts"
                          value={leadInput.mastercard_business_ts}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_business_ts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                   
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_business_cc"
                          value={master_buss.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_business_cc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_business_pc"
                          value={master_buss_ps.toFixed(2)}
                          disabled
                          // value={leadInput.mastercard_business_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_business_pc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    {/* ------------------------------master Corporate credit---------------------------- */}
                    <td style={{ fontWeight: "600" }}>Mastercard Corporate</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="mastercard_corporate_cr"
                          value={leadInput.mastercard_corporate_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_corporate_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          readOnly
                          style={{ cursor: "not-allowed" }}
                          min={1.9}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.mastercard_corporate_pr,
                              1.9
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="mastercard_corporate_pr"
                          value={leadInput.mastercard_corporate_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_corporate_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_corporate_ts"
                          value={leadInput.mastercard_corporate_ts}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_corporate_ts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="mastercard_corporate_cc"
                          value={master_corporet.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_corporate_cc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                    
                          name="mastercard_corporate_pc"
                          value={master_cor_ps.toFixed(2)}
                          disabled
                     
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "mastercard_corporate_pc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    {/* ------------------------------master Corporate credit---------------------------- */}
                    <td style={{ fontWeight: "600" }}>All Non-EEA Visa</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="all_non_eea_visa_fee_cr"
                          value={leadInput.all_non_eea_visa_fee_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_visa_fee_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          // readOnly
                          // style={{ cursor: "not-allowed" }}
                          min={2.5}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.all_non_eea_visa_fee_pr,
                              2.5
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="all_non_eea_visa_fee_pr"
                          value={leadInput.all_non_eea_visa_fee_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_visa_fee_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="all_non_eea_visa_fee_ts"
                          value={leadInput.all_non_eea_visa_fee_ts}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_visa_fee_ts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                   
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="all_non_eea_visa_fee_cc"
                          value={non_eee_cc.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_visa_fee_cc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="all_non_eea_visa_fee_pc"
                          value={non_eee_pc.toFixed(2)}
                          disabled
                          // value={leadInput.all_non_eea_visa_fee_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_visa_fee_pc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    {/* ------------------------------master all ee non eee mastercard credit---------------------------- */}
                    <td style={{ fontWeight: "600" }}>
                      All Non-EEA Mastercard
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="all_non_eea_mastercard_fee_cr"
                          value={leadInput.all_non_eea_mastercard_fee_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_mastercard_fee_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          // readOnly
                          // style={{ cursor: "not-allowed" }}
                          min={2.5}
                          className={`form-control px-4 ${
                            isValueLessThanMin(
                              leadInput.all_non_eea_mastercard_fee_pr,
                              2.5
                            )
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="all_non_eea_mastercard_fee_pr"
                          value={leadInput.all_non_eea_mastercard_fee_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_mastercard_fee_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="all_non_eea_mastercard_fee_ts"
                          value={leadInput.all_non_eea_mastercard_fee_ts}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_mastercard_fee_ts",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    {/* <td>
                    <input
                      min={0}
                      className="form-control px-4"
                      type="number"
                      placeholder="£"
                      name="all_non_eea_mastercard_fee_tr_no"
                      disabled
                      // value={parseInt(leadInput.all_non_eea_mastercard_fee_tr_no)}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput(
                          "all_non_eea_mastercard_fee_tr_no",
                          e.target.value
                        )
                      }
                    />
                  </td> */}
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="all_non_eea_mastercard_fee_cc"
                          value={non_eea_mastercard_cc.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_mastercard_fee_cc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="all_non_eea_mastercard_fee_pc"
                          value={non_eea_mastercard_ps.toFixed(2)}
                          disabled
                          // value={leadInput.all_non_eea_mastercard_fee_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "all_non_eea_mastercard_fee_pc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    {/* ------------------------------Amex mastercard credit---------------------------- */}
                    <td style={{ fontWeight: "600" }}>AMEX</td>
                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="amex_cr"
                          value={leadInput.amex_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("amex_cr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>

                    <td>
                      {" "}
                      <div
                        className={`parcent-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          // readOnly
                          // style={{ cursor: "not-allowed" }}
                          min={0}
                          className={`form-control px-4 ${
                            isValueLessThanMin(leadInput.amex_sr, 1.9)
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="amex_sr"
                          value={leadInput.amex_sr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("amex_sr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="amex_ts"
                          value={leadInput.amex_ts}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("amex_ts", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                    {/* <td>
                    <input
                      min={0}
                      className="form-control px-4"
                      type="number"
                      placeholder="£"
                      name="amex_tr_no"
                      disabled
                      // value={parseInt(leadInput.amex_tr_no)}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput("amex_tr_no", e.target.value)
                      }
                    />
                  </td> */}
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="amex_cc"
                          value={amex_card_cc.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("amex_cc", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="amex_pc"
                          value={amex_card_ps.toFixed(2)}
                          disabled
                          // value={leadInput.amex_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("amex_pc", e.target.value)
                          }
                        />
                      </div>
                    </td>
                  </tr>

                  {/* ===================auth fee=============== */}
                  <tr>
                    <td style={{ fontWeight: "600" }}> Authorisation Fees</td>
                    <td>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        {" "}
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="authorization_fee_cr"
                          value={leadInput.authorization_fee_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "authorization_fee_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        {" "}
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="authorization_fee_pr"
                          value={leadInput.authorization_fee_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "authorization_fee_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    {/* <td>
                    <input
                      min={0}
                      className="form-control px-4"
                      type="number"
                      placeholder="£"
                      disabled
                      name="authorization_fee_ts"
                      // value={parseInt(leadInput.authorization_fee_ts)}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput(
                          "authorization_fee_ts",
                          e.target.value
                        )
                      }
                    />
                  </td> */}
                    <td>
                      {" "}
                      <p style={{ opacity: "1" }}>No. of Transactions</p>{" "}
                      <div
                        className={`number-input ${focused ? "focused" : ""}`}
                      >
                        {" "}
                        <input
                          min={0}
                          className="form-control "
                          type="number"
                          // placeholder="£"
                          name="authorization_fee_tr_no"
                          value={parseInt(leadInput.authorization_fee_tr_no)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => {
                            handleChangeInput(
                              "per_transactional_charge_tr_no",
                              e.target.value
                            );

                            handleChangeInput(
                              "authorization_fee_tr_no",
                              e.target.value
                            );

                            handleChangeInput(
                              "num_of_transaction",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                    </td>
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        {" "}
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="authorization_fee_cc"
                          value={auth_fee.toFixed(2)}
                          disabled
                          // value={leadInput.authorization_fee_cc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "authorization_fee_cc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        {" "}
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="authorization_fee_pc"
                          value={auth_fee_ps.toFixed(2)}
                          disabled
                          // value={leadInput.authorization_fee_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "authorization_fee_pc",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  {/* ------------------------------per transTransaction ectional charge---------------------------- */}
                  <tr>
                    <td style={{ fontWeight: "600" }}>
                      Per Transaction Charge
                    </td>
                    <td>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="per_transactional_charge_cr"
                          value={leadInput.per_transactional_charge_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "per_transactional_charge_cr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>

                    <td>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="per_transactional_charge_pr"
                          value={leadInput.per_transactional_charge_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "per_transactional_charge_pr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </td>
                    {/* <td>  <p style={{ opacity: "0" }}>No. of Transactions</p>
                    <input
                      min={0}
                      className="form-control px-4"
                      type="number"
                      disabled
                      placeholder="£"
                      name="per_transactional_charge_ts"
                      // value={parseInt(
                      //   leadInput.per_transactional_charge_ts
                      // )}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput(
                          "per_transactional_charge_ts",
                          e.target.value
                        )
                      }
                    />
                  </td> */}
                    <td>
                      {" "}
                      <p style={{ opacity: "1" }}>No. of Transactions</p>{" "}
                      <div
                        className={`number-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control "
                          type="number"
                          // placeholder="£"
                          name="per_transactional_charge_tr_no"
                          value={parseInt(
                            leadInput.per_transactional_charge_tr_no
                          )}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => {
                            handleChangeInput(
                              "per_transactional_charge_tr_no",
                              e.target.value
                            );

                            handleChangeInput(
                              "authorization_fee_tr_no",
                              e.target.value
                            );

                            handleChangeInput(
                              "num_of_transaction",
                              e.target.value
                            );
                          }}
                        />
                      </div>
                    </td>
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          className="form-control px-4"
                          type="number"
                          readOnly
                          // placeholder="£"
                          name="per_transactional_charge_cc"
                          value={leadInput.per_transactional_charge_cc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "per_transactional_charge_cc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <p style={{ opacity: "0" }}>No. of Transactions</p>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="per_transactional_charge_pc"
                          readOnly
                          value={leadInput.per_transactional_charge_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "per_transactional_charge_pc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  {/* -----------------------------portal repoarting--------------------------- */}
                  <tr>
                    <td style={{ fontWeight: "600" }}>Portal Reporting</td>
                    <td>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="portal_reporting_fee_cr"
                          value={leadInput.portal_reporting_fee_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "portal_reporting_fee_cr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>

                    <td>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="%"
                          name="portal_reporting_fee_pr"
                          value={leadInput.portal_reporting_fee_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "portal_reporting_fee_pr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          disabled
                          type="number"
                          // placeholder="Per Month"
                          name="portal_reporting_fee_ts"
                          // value={parseInt(leadInput.portal_reporting_fee_ts)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "portal_reporting_fee_ts",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    {/* <td>
                    <input
                      min={0}
                      className="form-control px-4"
                      type="number"
                      // placeholder="Per Month"
                      disabled
                      name="portal_reporting_fee_tr_no"
                      // value={parseInt(leadInput.portal_reporting_fee_tr_no)}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput(
                          "portal_reporting_fee_tr_no",
                          e.target.value
                        )
                      }
                    />
                  </td> */}
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="portal_reporting_fee_cc"
                          value={leadInput.portal_reporting_fee_cc}
                          // value={card_trans.toFixed(2)}
                          disabled
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "portal_reporting_fee_cc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="portal_reporting_fee_pc"
                          readOnly
                          value={leadInput.portal_reporting_fee_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "portal_reporting_fee_pc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  {/* -----------------------------pci dds fee--------------------------- */}
                  <tr>
                    <td style={{ fontWeight: "600" }}>PCI DSS Fees</td>
                    <td>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className={`form-control px-4 `}
                          type="number"
                          // placeholder="%"
                          name="pci_dss_fee_cr"
                          value={leadInput.pci_dss_fee_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("pci_dss_fee_cr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>

                    <td>
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={4.5}
                          className={`form-control px-4 ${
                            isValueLessThanMin(leadInput.pci_dss_fee_pr, 4.5)
                              ? "red-alert"
                              : ""
                          }`}
                          type="number"
                          // placeholder="%"
                          name="pci_dss_fee_pr"
                          value={parseFloat(leadInput.pci_dss_fee_pr).toFixed(
                            3
                          )}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("pci_dss_fee_pr", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          disabled
                          type="number"
                          // placeholder="Per Month"
                          name="pci_dss_fee_ts"
                          // value={parseInt(leadInput.pci_dss_fee_ts)}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("pci_dss_fee_ts", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                    {/* <td>
                    <input
                      min={0}
                      className="form-control px-4"
                      type="number"
                      // placeholder="Per Month"
                      disabled
                      name="pci_dss_fee_tr_no"
                      // value={parseInt(leadInput.pci_dss_fee_tr_no)}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput("pci_dss_fee_tr_no", e.target.value)
                      }
                    />
                  </td> */}
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          className="form-control px-4"
                          type="number"
                          // placeholder="£"
                          name="pci_dss_fee_cc"
                          readOnly
                          value={leadInput.pci_dss_fee_cc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("pci_dss_fee_cc", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          className="form-control px-4"
                          type="number"
                          disabled
                          name="pci_dss_fee_pc"
                          readOnly
                          value={leadInput.pci_dss_fee_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput("pci_dss_fee_pc", e.target.value)
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "600" }} className="pt-lg-4 pt-0">
                      Terminal Rental{" "}
                    </td>
                    <td>
                      <div className="form-group mb-2">
                        <select
                          className="form-control px-4"
                          name="terminal_provider_pervious"
                          value={leadInput.terminal_provider_pervious}
                          onChange={(e) =>
                            handleChangeInput(
                              "terminal_provider_pervious",
                              e.target.value
                            )
                          }
                          id="exampleSelect"
                        >
                          <option value="" selected>
                            Select Terminal...
                          </option>
                          {allProductList?.map((option) => (
                            <option
                              key={option.id}
                              value={option.id}
                              // title="Select Terminal"
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          className="form-control px-4"
                          // placeholder="£"
                          name="terminal_rental_fee_cr"
                          value={leadInput.terminal_rental_fee_cr}
                          // value={leadInput.terminal_rental_fee_cr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "terminal_rental_fee_cr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      <div className="form-group mb-2">
                        <select
                          className="form-control px-4"
                          name="terminal_provider_current"
                          value={leadInput.terminal_provider_current}
                          onChange={(e) =>
                            handleChangeInput(
                              "terminal_provider_current",
                              e.target.value
                            )
                          }
                          id="exampleSelect"
                        >
                          <option value="" selected>
                            Select Terminal...
                          </option>
                          {allProductList?.map((option) => (
                            <option
                              key={option.id}
                              value={option.id}
                              // title="Select Terminal"
                            >
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>{" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          className="form-control px-4"
                          // placeholder="£"
                          name="terminal_rental_fee_pr"
                          // value={card_trans_ps.toFixed(2)}
                          // disabled
                          value={leadInput.terminal_rental_fee_pr}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "terminal_rental_fee_pr",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td>
                      {/* <!-- <div className="form-group">
                        <select className="form-control px-4" id="exampleSelect">
                          <option value="" selected></option>
                          <option value="">2</option>
                          <option value="">3</option>
                          <option value="">4</option>
                          <option value="">5</option>
                        </select>
                      </div> --> */}
                      {/* <p>Number of Terminals</p> */}{" "}
                      <div
                        className={`parcen-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          min={0}
                          type="number"
                          className="form-control  mt-5"
                          placeholder="Number of Terminals"
                          name="num_of_terminals"
                          // value={card_trans_ps.toFixed(2)}
                          // disabled
                          value={leadInput.num_of_terminals}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "num_of_terminals",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    {/* <td>
                    <p className="mt-5"></p>
                    <input
                      min={0}
                      type="number"
                      className="form-control px-4 mt-5"
                      disabled
                      // placeholder="Per Month"
                      name="terminal_rental_fee_tr_no"
                      // value={leadInput.terminal_rental_fee_tr_no}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) =>
                        handleChangeInput(
                          "terminal_rental_fee_tr_no",
                          e.target.value
                        )
                      }
                    />
                  </td> */}
                    <td style={{ background: "#e55353" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          type="text"
                          className="form-control px-4 mt-5"
                          // placeholder="£"
                          name="terminal_rental_fee_cc"
                          readOnly
                          value={leadInput.terminal_rental_fee_cc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "terminal_rental_fee_cc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                    <td style={{ background: "#198754" }}>
                      {" "}
                      <div
                        className={`currency-input ${focused ? "focused" : ""}`}
                      >
                        <input
                          disabled
                          min={0}
                          type="text"
                          className="form-control px-4 mt-5"
                          // placeholder="£"
                          name="terminal_rental_fee_pc"
                          readOnly
                          value={leadInput.terminal_rental_fee_pc}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) =>
                            handleChangeInput(
                              "terminal_rental_fee_pc",
                              e.target.value
                            )
                          }
                        />{" "}
                      </div>
                    </td>
                  </tr>
                  <tr className="total" style={{ background: "transparent" }}>
                    <td colSpan="4" className="text-end font-weight-bold">
                      TOTAL
                    </td>
                    <td style={{ background: "#e55353" }}>
                      <p
                        style={{
                          color: "#fff",
                          paddingLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        £{leadInput.totalCurrentCost}
                        {/* £ {totalCurrentCost()} */}
                      </p>
                    </td>
                    <td style={{ background: "#198754" }}>
                      <p
                        style={{
                          color: "#fff",
                          paddingLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        £{leadInput.total_pc}
                        {/* £ {totalPaymentsaveCost()} */}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {location.pathname.includes("retrieve-lead") && (
            <div className="d-flex gap-2 justify-content-between flex-lg-row flex-column">
              {
                userDataCookie && JSON.parse(userDataCookie)?.user_role === 8
                ? <></>
                : <CButton
                className="my-3"
                block
                color="info"
                href=""
                onClick={handleShow}
              >
                Revenue Calculation
              </CButton>
              }
             
              {/* <CButton
              className="my-3"
              block
              color="danger"
              // href="/opportunity-pdf"
              target="_blank"
              onClick={() => handleEditLead(leadInput)}
            >
              {" "}
              Generate Quote
            </CButton> */}
              <CButton
                className="my-3"
                block
                color="primary"
                onClick={exportAsPDF}
              >
                {" "}
                Generate PDF
              </CButton>
            
              <CButton
                className="my-3"
                block
                color="success"
                // href="/forms/document"
              >
                Sent Link to Customer
              </CButton>
              <CButton
                className="my-3"
                block
                color="warning"
                onClick={() => {
                  handleConvertTopriceQuote(leadInput, userData.id);

                  // next();
                }}
              >
                Convert to Opportunity
              </CButton>
            </div>
          )}
        </CCol>
      </CRow>

      {/* Modal */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 ">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Monthly Card Turnover
                </label>
                <input
                  value={leadInput.annual_card_turnover}
                  min={0}
                  name="annual_card_turnover"
                  onChange={(e) =>
                    handleChangeInput("annual_card_turnover", e.target.value)
                  }
                  type="number"
                  className="form-control px-4 my-3"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ATV</label>
                <input
                  value={leadInput.atv}
                  min={0}
                  name="atv"
                  onChange={(e) => handleChangeInput("atv", e.target.value)}
                  type="number"
                  className="form-control px-4 my-3"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Renting From Elavon</label>
                <select
                  value={leadInput.renting_elavon_terminals}
                  name="renting_elavon_terminals"
                  onChange={(e) =>
                    handleChangeInput(
                      "renting_elavon_terminals",
                      e.target.value
                    )
                  }
                  id=""
                  className="form-control px-4 my-3"
                >
                  <option value="">--</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <CButton block color="info" onClick={getDataForRevineue}>
            {/* <Button variant="info" onClick={handleClose}> */}
            Submit
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
