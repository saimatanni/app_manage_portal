import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import resume from "../../../assets/img/resume.svg";
import pdf from "../../../assets/img/pdf.png";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import {
  SET_NEW_DOC_INPUT,
  DELETE_DOC,
  ADD_NEW_DOC,
} from "../NewApplication/_redux/types/Types";
import {
  GetDocInput,
  GetPdfInput,
  GetDocInput2,

  // SubmitImage,
} from "../NewApplication/_redux/action/ApplicationAction";
import Cookies from "js-cookie"; // Import js-cookie
import {
  PROOF_OF_BANK,
  check_proof_of_application,
  check_proof_of_business,
  check_proof_of_home_add,
  check_proof_of_id,
  check_proof_of_other,
} from "src/views/common/Dropdown";
import { Download, Upload } from "@phosphor-icons/react";

import PreviewPdf from "./PreviewPdf";

import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { SubmitImage2 } from "src/views/common/_redux/action/CommonAction";
import axios from "axios";
export default function Document() {
  const navigate = useNavigate();
  const names = [
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
      label: "PROOF OF HOME ADDRESS",
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

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);
  const [pdfShow, setPdfShow] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (url, pdf_url) => {
    if (url.includes(".pdf")) {
      // if (url.includes(".pdf") || url.includes("data:application/pdf")) {
      window.open(url, "_blank");
    } else {
      setShow(true);
      setPdfFile(url);
      setPdfShow(pdf_url);
    }
  };
  const userData = JSON.parse(Cookies.get("userData"));
  const imageInput = useSelector((state) => state.commonInfo.imageInput);
  const isLoadCommon = useSelector((state) => state.commonInfo.isLoadCommon);
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );

  const handleAddMore = () => {
    dispatch({ type: SET_NEW_DOC_INPUT, payload: false });
  };
  const handleremoveDoc = (i) => {
    dispatch({ type: DELETE_DOC, payload: i });
  };

  const handleremovedocument = (i) => {
    dispatch(GetDocInput("is_deleted", true, i));
  };

  const handleChangeInput = (name, value, index, e) => {
    dispatch(GetDocInput(name, value, index, e, "application_docs"));
    dispatch(GetDocInput("application", applicationInput.id, index));
  };

  const downloadImage = (image_url) => {
    saveAs(image_url, "document_image"); // Put your image url here.
  };
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me = Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
    localStorage.removeItem("sitevisit");
  }, []);
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
  //multiple file upload
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e, i) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles[i] = files[0];
      return updatedFiles;
    });

    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles[i] = files[0];
      return updatedFiles;
    });
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/upload/${id}/`
      );
      // showToast("success", "Information deleted successfully");
      console.log("Category deleted:", response.data);
      // setInfoList((prevCategories) =>
      //   prevCategories.filter((category) => category.id !== id)
      // );
    } catch (error) {
      console.error("Error deleting category:", error);
      // Handle error scenarios here
    }
  };
  const handleRemove = (index, item_index) => {
    const updatedDocs = [...applicationInput.application_docs];

    const updatedItems = updatedDocs[index].document.findIndex((docItem) => {
      return docItem === updatedDocs[index].document[item_index];
    });
    const id = updatedDocs[index].document[updatedItems];

    handleDelete(id);
    // Remove the item from the doc_urls array
    if (updatedItems !== -1) {
      updatedDocs[index].document.splice(updatedItems, 1);
    }

    // Find the index of the item in the doc_urls array
    const itemIndex = updatedDocs[index].doc_urls.findIndex((urlItem) => {
      return urlItem === updatedDocs[index].doc_urls[item_index];
    });

    // Remove the item from the doc_urls array
    if (itemIndex !== -1) {
      updatedDocs[index].doc_urls.splice(itemIndex, 1);
    }

    // Update the state with the updated array
    dispatch({
      type: ADD_NEW_DOC,
      payload: {
        name: "application_docs",
        value: updatedDocs,
      },
    });
  };
  return (
    <div className="leads">
      {isLoadCommon && (
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
      <img src={resume} width="25" alt="" />
      <strong> Document </strong>
      <br />
      <br />

      {applicationInput?.application_docs?.length < 1 && (
        <div className="mb-4">
          <button
            className=" basic_btn"
            // onClick={() => addItem("<UploadersTwo/>")}
            onClick={() => handleAddMore()}
          >
            {/* <img
                  width={14}
                  style={{ marginRight: "14px", marginBottom: "3px" }}
                  height={14}
                  src={addFileIcon}
                  alt=""
                /> */}
            ADD FILE
          </button>
        </div>
      )}
      <div className=" row select_div" style={{ marginBottom: "-15px " }}>
        {applicationInput?.application_docs?.map((doc, i) => {
          return (
            <>
              {doc.is_deleted === false && (
                <div
                  className="col-12 col-md-6 mb-3"
                  key={doc.id}
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      backgroundColor: "rgb(250, 250, 250)",
                      borderRadius: "8px",
                      padding: "40px 15px",
                      margin: "15px 0px",
                      border: "0.5px solid rgb(224, 224, 224)",
                    }}
                  >
                    <div
                      // onClick={() => handleremoveDoc(i)}
                      onClick={() => {
                        doc.id ? handleremovedocument(i) : handleremoveDoc(i);
                      }}
                      className="mt-2"
                      // style={{
                      //   border: "1px solid #FFCDD2",
                      //   width: "24px",
                      //   borderRadius: "50%",
                      // }}
                    >
                      <button
                        style={{ top: "27px", right: "17px" }}
                        className="closeButton"
                      >
                        &#x2716;
                      </button>
                    </div>
                    <div className="row">
                      <div className="form-group col-lg-12">
                        <label htmlFor="exampleInputEmail1">
                          File Name<span style={{ color: "#dd2c00" }}>*</span>
                        </label>
                        <TextField
                          style={{ width: "100%" }}
                          size="small"
                          id="outlined-select-currency"
                          className=" my-3"
                          name="category"
                          select
                          value={doc.category}
                          onChange={(e) =>
                            handleChangeInput("category", e.target.value, i)
                          }
                        >
                          {names.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className="mb-form col-lg-12">
                        {doc.category === "PROOF_OF_ID" ? (
                          <>
                            <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">
                                Document Type
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                className="my-3"
                                style={{ width: "100%" }}
                                size="small"
                                id="outlined-select-currency"
                                select
                                name="doc_type"
                                value={doc.doc_type}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "doc_type",
                                    e.target.value,
                                    i
                                  )
                                }
                                helperText={
                                  doc.doc_type === "PASSPORT"
                                    ? "N.B. Should be visible on all corners with MRZ Number & Signature. Should not be expired"
                                    : doc.doc_type ===
                                      "FULL_PAPER_DRIVING_LICENCE"
                                    ? "N.B. Should be visible on all corners. Should not be expired."
                                    : doc.doc_type ===
                                      "EU_RESIDENCE_CARD_FIVE_YEAR"
                                    ? "N.B. Validity should be at least 5 years."
                                    : doc.doc_type ===
                                        "SPANISH_RESIDENT_CARD" &&
                                      "N.B. This should be validet."
                                }
                              >
                                {check_proof_of_id.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                            <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">
                                Document Contact
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                className="my-3"
                                style={{ width: "100%" }}
                                size="small"
                                id="outlined-select-currency"
                                select
                                name="doc_contact"
                                value={doc.doc_contact}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "doc_contact",
                                    e.target.value,
                                    i
                                  )
                                }
                              >
                                {applicationInput?.business_owners?.map(
                                  (option) =>
                                    option.id && (
                                      <MenuItem
                                        key={option.id}
                                        value={option.id}
                                      >
                                        {option.owner_first_name}{" "}
                                        {option.owner_surname}
                                      </MenuItem>
                                    )
                                )}
                              </TextField>
                            </div>
                            {/* <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">
                                First Name
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                size="small"
                                className=" my-3"
                                id="outlined-select-currency"
                                name="first_name"
                                value={doc.first_name}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "first_name",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div>
                            <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">
                                Last Name
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                size="small"
                                className=" my-3"
                                id="outlined-select-currency"
                                name="sur_name"
                                value={doc.sur_name}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "sur_name",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div>
                            <div className="mb-form ">
                              <label htmlFor="exampleInputEmail1">
                                Document ID
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                size="small"
                                className=" my-3"
                                id="outlined-select-currency"
                                name="document_id"
                                value={doc.document_id}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "document_id",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div> */}
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Issuer ID
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                className="my-3"
                                size="small"
                                id="outlined-select-currency"
                                name="issuer_id"
                                value={doc.issuer_id}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "issuer_id",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div>
                            {/* <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">
                                Issue Date
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                className="my-3"
                                size="small"
                                inputProps={{ max: currentDate }}
                                id="outlined-select-currency"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                name="issue_date"
                                value={doc.issue_date}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "issue_date",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div>
                            <div className="form-group ">
                              <label htmlFor="exampleInputEmail1">
                                Expiry Date
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                className="my-3"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                id="outlined-select-currency"
                                type="date"
                                name="expiry_date"
                                inputProps={{ min: currentDate }}
                                value={doc.expiry_date}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "expiry_date",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Country
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <Autocomplete
                                style={{ width: "100%" }}
                                className="my-3"
                                id="country-select-demo"
                                size="small"
                                options={countryList}
                                onChange={(event, newValue) =>
                                  handleChangeInput(
                                    "country",
                                    newValue === null ? "" : newValue.id,
                                    i
                                  )
                                }
                                // value={ countryList?.[doc.country -1] || null}
                                value={
                                  countryList?.[getTradingcountryIndex(i)] ||
                                  null
                                }
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                  <Box
                                    component="li"
                                    sx={{
                                      "& > img": { mr: 2, flexShrink: 0 },
                                    }}
                                    {...props}
                                  >
                                    <img
                                      loading="lazy"
                                      width="20"
                                      src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                                      srcSet={`https://flagcdn.com/w40/${option.iso2.toLowerCase()}.png 2x`}
                                      alt=""
                                    />
                                    {option.name} ({option.iso2})
                                  </Box>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    name="trading_country"
                                    // value={countryList?.[priceQuoteInput.trading_country] || null}
                                  />
                                )}
                              />
                            </div> */}
                          </>
                        ) : doc.category === "PROOF_OF_BUSINESS" ? (
                          <>
                            <label htmlFor="exampleInputEmail1">
                              Document Type
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <TextField
                              style={{ width: "100%" }}
                              className="my-3"
                              size="small"
                              id="outlined-select-currency"
                              select
                              name="doc_type"
                              value={doc.doc_type}
                              onChange={(e) =>
                                handleChangeInput("doc_type", e.target.value, i)
                              }
                              helperText={
                                doc.doc_type === "BUSINESS_UTILITY_BILL"
                                  ? "N.B. Under the Business Name (Trading Name for Sole Trade/Partnership business and Legal/Trading Name for Limited Company) and Trading address. Documents within 6 months. Should not be any invoice."
                                  : doc.doc_type === "BUSINESS_RATES_BILL"
                                  ? "This should be validate "
                                  : doc.doc_type === "BUSINESS_BANK_STATEMENTS"
                                  ? "This should be validate "
                                  : doc.doc_type === "HMRC_VAT_OR_TAX_DEMAND"
                                  ? "This should be validate "
                                  : doc.doc_type === "MARKET_TRADER_CERTIFICATE"
                                  ? "This should be validate "
                                  : doc.doc_type ===
                                      "BUSINESS_BANKING_COMMUNICATION" &&
                                    "This should be validate "
                              }
                            >
                              {check_proof_of_business.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </>
                        ) : doc.category === "PROOF_OF_BANK" ? (
                          <>
                            <label htmlFor="exampleInputEmail1">
                              Document Type
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <TextField
                              style={{ width: "100%" }}
                              className="my-3"
                              size="small"
                              id="outlined-select-currency"
                              select
                              name="doc_type"
                              value={doc.doc_type}
                              onChange={(e) =>
                                handleChangeInput("doc_type", e.target.value, i)
                              }
                              helperText={
                                doc.doc_type === "BUSINESS_BANK_STATEMENTS"
                                  ? "N.B Should be visible Bank Name, Account Name, Account Number, Sortcode. Documents within 6 months with Date."
                                  : doc.doc_type === "VOIDED_CHEQUE"
                                  ? "N.B. Should be visible Bank Name, Account Name, Account Number & Sortcode. "
                                  : doc.doc_type === "PAYING_IN_SLIP"
                                  ? "N.B. This should be validate "
                                  : doc.doc_type ===
                                    "BUSINESS_BANKING_COMMUNICATION_LETTER"
                                  ? "N.B. This should be validate "
                                  : doc.doc_type ===
                                      "BUSINESS_BANK_WELCOME_LETTER" &&
                                    "N.B. This should be validate "
                              }
                            >
                              {PROOF_OF_BANK.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </>
                        ) : doc.category === "PROOF_OF_ADDRESS" ? (
                          <>
                            <label htmlFor="exampleInputEmail1">
                              Document Type
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <TextField
                              style={{ width: "100%" }}
                              className="my-3"
                              size="small"
                              id="outlined-select-currency"
                              select
                              name="doc_type"
                              value={doc.doc_type}
                              onChange={(e) =>
                                handleChangeInput("doc_type", e.target.value, i)
                              }
                              helperText={
                                doc.doc_type === "FULL_PHOTO_DRIVING_LICENCE"
                                  ? "N.B. Should be visible on all corners. Should not be expired."
                                  : doc.doc_type ===
                                    "PROVISIONAL_PHOTO_DRIVING_LICENCE"
                                  ? "N.B. Should be visible on all corners. Should not be expired. "
                                  : doc.doc_type === "UTILITY_BILL"
                                  ? "N.B.  Under Merchant's Name and Home Address. Documents within 6 months with Date. Should not be any invoice."
                                  : doc.doc_type === "BANK_STATEMENT"
                                  ? "N.B. Under Merchant's Name & Home Address. Documents within 6 months with Date."
                                  : doc.doc_type ===
                                    "COUNCIL_TAX_CORRESPONDENCE"
                                  ? "N.B. This should be validate "
                                  : doc.doc_type === "MORTGAGE_STATEMENT" &&
                                    "N.B. This should be validate "
                              }
                            >
                              {check_proof_of_home_add.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </>
                        ) : doc.category === "APPLICATION_DOCUMENTS" ? (
                          <>
                            <label htmlFor="exampleInputEmail1">
                              Document Type
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <TextField
                              style={{ width: "100%" }}
                              className="my-3"
                              size="small"
                              id="outlined-select-currency"
                              select
                              name="doc_type"
                              value={doc.doc_type}
                              onChange={(e) =>
                                handleChangeInput("doc_type", e.target.value, i)
                              }
                            >
                              {check_proof_of_application.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </>
                        ) : (
                          doc.category === "OTHER" && (
                            <>
                              <label htmlFor="exampleInputEmail1">
                                Document Type
                                <span style={{ color: "#dd2c00" }}>*</span>
                              </label>
                              <TextField
                                style={{ width: "100%" }}
                                className="my-3"
                                size="small"
                                id="outlined-select-currency"
                                select
                                name="doc_type"
                                value={doc.doc_type}
                                onChange={(e) =>
                                  handleChangeInput(
                                    "doc_type",
                                    e.target.value,
                                    i
                                  )
                                }
                              >
                                {check_proof_of_other.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </>
                          )
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="">
                        <div className="">
                          <div
                            className={`file-uploader-mask d-flex justify-content-center align-items-center ${
                              errorMessage ? "error" : ""
                            }`}
                          >
                            {/* <img
                                className="file-uploader-icon"
                                src={upload}
                                alt="Upload-Icon"
                              /> */}
                            <Upload />
                            <h5 className="drag-drop my-3">
                              {" "}
                              Drag & drop file here
                            </h5>
                            <p style={{ color: "red", fontSize: "12px" }}>
                              File format should be image or Pdf
                            </p>
                            <div className="file-input-display">
                              <div className="chooseFile">
                                <p>ChooseFile</p>
                              </div>
                              {/* <p className="subText">Maximum Size: 5 MB</p> */}
                            </div>

                            <input
                              style={{
                                height: "100%",
                                width: "100%",
                                opacity: "0",
                                position: "absolute",
                              }}
                              type="file"
                              accept="image/png, image/gif, image/jpeg, .pdf"
                              name="document"
                              multiple
                              onChange={(e) => {
                                if (doc.category === "") {
                                  Swal.fire({
                                    // title: "Error!",
                                    text: "Please select file name first!",
                                    icon: "error",
                                  });
                                } else {
                                  imageInput.owner = userData.id;
                                  imageInput.doc_type = 0;
                                  imageInput.document = e.target.files;

                                  dispatch(
                                    SubmitImage2(
                                      imageInput,
                                      "application",
                                      i,
                                      doc.category
                                    )
                                  );

                                  handleFileChange(e, i);
                                }
                              }}
                            />
                          </div>

                          <div className="d-flex justify-content-center flex-column align-items-center">
                            {doc.doc_urls && (
                              <small
                                style={{
                                  marginTop: "10px",
                                  position: "relative",
                                  display: "flex",
                                  gap: "20px",
                                }}
                              >
                                {doc?.doc_urls?.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        position: "relative",
                                      }}
                                    >
                                      <img
                                        onClick={() => handleShow(item)}
                                        src={item?.includes("pdf") ? pdf : item}
                                        alt=""
                                        style={{
                                          height: "44px",
                                          width: "44px",
                                          borderRadius: "8px",
                                          // objectFit: "cover",
                                          cursor: "pointer",
                                        }}
                                      />
                                      <div
                                        className="ms-2 remove_img"
                                        style={{
                                          cursor: "pointer",
                                          top: 0,
                                          position: "absolute",
                                          left: "73px",
                                        }}
                                        onClick={() => handleRemove(i, index)}
                                      >
                                        <button
                                          // onClick={() => handleRemoveFile(index)}
                                          style={{
                                            top: "-17px",
                                            right: "26px",
                                          }}
                                          className="closeButton"
                                        >
                                          &#x2716;
                                        </button>
                                        {/* <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="18"
                                          fill="#000000"
                                          viewBox="0 0 256 256"
                                        >
                                          <rect
                                            width="256"
                                            height="256"
                                            fill="none"
                                          ></rect>
                                          <circle
                                            cx="128"
                                            cy="128"
                                            r="96"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="24"
                                          ></circle>
                                          <line
                                            x1="160"
                                            y1="96"
                                            x2="96"
                                            y2="160"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="24"
                                          ></line>
                                          <line
                                            x1="160"
                                            y1="160"
                                            x2="96"
                                            y2="96"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="24"
                                          ></line>
                                        </svg> */}
                                      </div>
                                    </div>
                                  );
                                })}
                              </small>
                            )}
                            <div className="d-flex justify-content-center">
                              {doc.docFile_url &&
                              doc?.docFile_url?.includes("/pdf") ? (
                                <img
                                  onClick={() => handleShow(doc.docFile_url)}
                                  src={pdf}
                                  alt=""
                                  style={{
                                    cursor: "pointer",
                                    height: "44px",
                                    width: "44px",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                doc.docFile_url && (
                                  <img
                                    onClick={() => handleShow(doc.docFile_url)}
                                    style={{
                                      cursor: "pointer",
                                      height: "44px",
                                      width: "44px",
                                      borderRadius: "8px",
                                      objectFit: "cover",
                                    }}
                                    src={doc.docFile_url}
                                    alt=""
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        {errorMessage && (
                          <div
                            style={{
                              color: "red",
                              textAlign: "center",
                              marginTop: "15px",
                            }}
                          >
                            {errorMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <div className="d-flex gap-3 justify-content-center">
                      {selectedFiles.map((file, index) => (
                        <div key={index} style={{ position: "relative" }}>
                          {file.type.includes("image") && (
                            <img
                              onClick={() =>
                                handleShow(URL.createObjectURL(file))
                              }
                              src={URL.createObjectURL(file)}
                              alt="Preview"
                            />
                          )}
                          {file.type === "application/pdf" && (
                            <img
                              onClick={() =>
                                handleShow(
                                  doc.docFile_url,
                                  URL.createObjectURL(file)
                                )
                              }
                              src={pdf}
                              alt=""
                              style={{
                                cursor: "pointer",
                                height: "44px",
                                width: "44px",
                                borderRadius: "8px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                       
                          <button
                            onClick={() => handleRemoveFile(index)}
                            style={{ top: "-20px", right: "-18px" }}
                            className="closeButton"
                          >
                            &#x2716;
                          </button>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              )}
            </>
          );
        })}

        {applicationInput?.application_docs?.length > 0 && (
          <div className="col-md-6 my-3  d-flex align-items-center justify-content-center">
            <button className="basic_btn" onClick={() => handleAddMore()}>
              {/* <img
                  width={14}
                  style={{ marginRight: "14px", marginBottom: "3px" }}
                  height={14}
                  src={addFileIcon}
                  alt=""
                /> */}
              ADD FILE
            </button>
          </div>
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body id="contained-modal-title-vcenter">
          {pdfFile && pdfFile?.includes("data:application/pdf") ? (
            <PreviewPdf pdf={pdfFile} url={pdfShow} />
          ) : (
            <>
              <img
                style={{
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
                src={pdfFile}
                alt=""
              />
              <div
                className="d-flex justify-content-end mt-4"
                onClick={() => downloadImage(pdfFile)}
              >
                <button className="save-btn">
                  <Download />
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
