import React, { useEffect, useRef, useState } from "react";

import {
  GetCountryList,
  GetIndustryList,
  ExportLeadsInput,
  GetLeadsnput,
} from "../accounts/Leads/_redux/action/LeadAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import NewCostAnalysisPdf from "./NewCostAnalysisPdf";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Cookies from 'js-cookie'; // Import js-cookie
import ExportLeadInfo from "../accounts/Leads/LeadsRetrieve/ExportLeadInfo";
import { showToast } from "src/utils/ToastHelper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const myStyle = {
  background: "#38b6ff",
  color: "white",
  transition: "background-color 0.3s ease-in-out",
  // Add a hover condition
  ":hover": {
    background: "#004aad",
  },
};

export default function ExportLeads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cRef = useRef();
  const Phone_regex = /^(7\d{9}|07\d{9})$/; // regex for valid numbe
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isLoadLeads = useSelector((state) => state.leadInfo.isLoadLeads);
  const leadInput = useSelector((state) => state.leadInfo.leadInput);
  const emailDetails = useSelector((state) => state.commonInfo.emailDetails);
  const afterSuccessLeads = useSelector(
    (state) => state.leadInfo.afterSuccessLeads
  );
  useEffect(() => {
    dispatch(GetIndustryList());
    dispatch(GetCountryList());
  }, []);
  const userData = JSON.parse(Cookies.get("userData"));
  React.useEffect(() => {
    dispatch(GetLeadsnput("sales_partner", userData.id));
    dispatch(GetLeadsnput("partner_manager", userData.partner_manager));
    dispatch(GetLeadsnput("user", userData.id));
    dispatch(GetLeadsnput("lead_source", 1));
  }, []);
  const handleAddLeads = (data, toPdf) => {
    dispatch(
      GetLeadsnput("lead_products", [
        ...(leadInput?.terminal_products ?? []),
        ...(leadInput?.ecommerce_products ?? []),
        ...(leadInput?.epos_products ?? []),
      ])
    );
    dispatch(ExportLeadsInput(data, toPdf));
  };

  React.useEffect(() => {
    if (afterSuccessLeads === true) {
      navigate("/leads");
    }
  }, [afterSuccessLeads]);
  
  const LeadInfoValidation2 = (leadInput, toPdf) => {
    if (leadInput.legal_type.length === 0) {
      showToast("error", "Legal type should not be empty");
      return 0;
    }
    if (leadInput.lead_type.length === 0) {
      showToast("error", "Lead type should not be empty");
      return 0;
    }
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
    if (leadInput.trading_name?.length === 0) {
      showToast("error", "Trading  name should not be empty");
      return 0;
    }
    if (leadInput.lead_type?.length === 0) {
      showToast("error", "Lead type should not be empty");
      return 0;
    }
    if (emailDetails?.message === "Invalid Email Provided") {
      showToast("error", "Enter a valid email");
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

    if (leadInput.legal_postcode?.length === 0) {
      showToast("error", "Legal  postcode should not be empty");
      return 0;
    }
    if (leadInput.legal_address1?.length === 0) {
      showToast("error", "Legal address1 should not be empty");
      return 0;
    }
    if (
      leadInput.legal_country?.length === 0 ||
      leadInput.legal_country === null
    ) {
      showToast("error", "Legal country should not be empty");
      return 0;
    }
    if (leadInput.legal_city?.length === 0) {
      showToast("error", "Legal city should not be empty");
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
    handleAddLeads(leadInput, toPdf);
  };

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
      const actuleHight = finalImgHeight + 21;
      // Apply a 150% zoom effect by increasing the image width and height
      const zoomFactor = 1.5;
      const zoomedWidth = pageWidth * zoomFactor;
      const zoomedHeight = actuleHight * zoomFactor;
      // Add the image to the PDF
      // pdf.addImage(imgData, "JPEG", 0, 0, zoomedWidth, zoomedHeight);
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, actuleHight);

      // Save or download the PDF
      pdf.save("Cost Analysis.pdf");
    });
  };

 
  return (
    <div className="p-lg-4 p-0">
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
        id="pdf-content"
        style={{
          position: "absolute",
          top: "-629px",
          zIndex: -1,
          width: "1240px",
        }}
      >
        <NewCostAnalysisPdf cRef={cRef} />
      </div>

      <ExportLeadInfo />
      <div className="col-md-12 d-flex  justify-content-between mt-3">
        <button
          onClick={() => navigate(`/cost-analysis`)}
          className="basic_btn"
        >
          Back
        </button>
        <button
          style={myStyle}
          onClick={() => LeadInfoValidation2(leadInput, exportAsPDF)}
          //  onClick={exportAsPDF}
          className="basic_btn"
        >
          Save & Export
        </button>
       
      </div>
    </div>
  );
}
