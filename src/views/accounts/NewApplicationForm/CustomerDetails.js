import React from "react";
import { IoIosAdd } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";

import Autocomplete from "@mui/material/Autocomplete";
import { Download, Upload } from "@phosphor-icons/react";
import { TextField } from "@mui/material";
import { saveAs } from "file-saver";
import {
  REMOVE_APPLICATION_OWNER,
  SET_QUOTE_OWNER,
} from "../NewApplication/_redux/types/Types";
import {

  GetApplicationInput,
  


  SetFalseObjectDelete,
} from "../NewApplication/_redux/action/ApplicationAction";
import ContactPostcode from "./ContactPostcode";

import PreviewPdf from "./PreviewPdf";
import DatePicker from "react-date-picker";
import Cookies from 'js-cookie'; // Import js-cookie
import { GetEmailVerification } from "src/views/common/_redux/action/CommonAction";
const CustomerDetails = () => {
  const TitleChoice = [
    {
      value: "",
      label: "--",
    },
    {
      value: "Mr.",
      label: "Mr.",
    },
    {
      value: "Mrs.",
      label: "Mrs.",
    },
    {
      value: "Ms.",
      label: "Ms.",
    },
    {
      value: "Miss.",
      label: "Miss.",
    },
    {
      value: "Sr.",
      label: "Sr.",
    },
    {
      value: "Jr.",
      label: "Jr.",
    },
    {
      value: "Master",
      label: "Master",
    },
  ];
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
 

  const Phone_regex = /^(07\d{9})$/; // regex for valid numbers
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const userData = JSON.parse(Cookies.get("userData"));
  const countryList = useSelector((state) => state.leadInfo.countryList);
 
  const isApplicationOwnerDeleted = useSelector(
    (state) => state.applicationInfo.isApplicationOwnerDeleted
  );

  useEffect(() => {
    if (
      applicationInput?.business_owners?.length > 0 &&
      (applicationInput.legal_type === "L" ||
        applicationInput.legal_type === "PL" ||
        applicationInput.legal_type === "LLP" ||
        applicationInput.legal_type === "ST")
    ) {
      dispatch(
        GetApplicationInput(
          "is_main_principal",
          true,
          0,

          "business_owners",
          "contact"
        )
      );
      dispatch(
        GetApplicationInput(
          "is_responsible_party",
          true,
          0,

          "business_owners",
          "contact"
        )
      );
    } else if (applicationInput.legal_type === "PART") {
      for (
        let index = 0;
        index < applicationInput?.business_owners?.length;
        index++
      ) {
        dispatch(
          GetApplicationInput(
            "is_main_principal",
            true,
            index,

            "business_owners",
            "contact"
          )
        );
      }
      dispatch(
        GetApplicationInput(
          "is_responsible_party",
          true,
          0,

          "business_owners",
          "contact"
        )
      );
    }
  }, []);

  useEffect(() => {
    for (
      let index = 0;
      index < applicationInput.business_owners.length;
      index++
    ) {
      dispatch(
        GetApplicationInput(
          "owner_second_name",
          applicationInput.business_owners[index].owner_surname,
          index,

          "business_owners",
          "contact"
        )
      );
    }
    // dispatch(
    //   GetApplicationInput(
    //     "owner_second_name",
    //     applicationInput.owner_surname,
    //     index,

    //     "business_owners",
    //     "contact"
    //   )
    // );
  }, [
    applicationInput.business_owners[0]?.owner_surname,
    applicationInput.business_owners[1]?.owner_surname,
  ]);
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
  const getTradingcountryIndex = (i) => {
    var index = -1;
    countryList.map((opt) => {
      if (
        parseInt(opt.id) ===
        parseInt(
          applicationInput.business_owners[i]?.business_owner_contacts[0]
            .country_code
        )
      ) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };
  const getNationalityIndex = (i) => {
    var index = -1;
    countryList.map((opt) => {
      if (
        parseInt(opt.id) ===
        parseInt(applicationInput.business_owners[i]?.owner_nationality)
      ) {
        index = countryList.indexOf(opt);
      }
    });
    return index;
  };
  // const handleChangeInput = (name, value, ownerIndex) => {
  //   if (ownerIndex === undefined) {
  //     dispatch(GetApplicationInput(name, value));
  //   }
  //   dispatch(GetApplicationInput(name, value));
  // };
 
  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return "";
  };
  const handleChangeOwnerInput = (name, value, index, contact = undefined) => {
    dispatch(
      GetApplicationInput(name, value, index, "business_owners", contact)
    );
    if (name === "contact_dob" && index === 0) {
      dispatch(GetApplicationInput("dob", value));
    }
    dispatch(
      GetApplicationInput(
        "is_responsible_party",
        true,
        0,

        "business_owners",
        "contact"
      )
    );
    dispatch(
      GetApplicationInput(
        "application",
        applicationInput.id,
        index,
        "business_owners",
        contact
      )
    );
    if (applicationInput.legal_type === "ST") {
      dispatch(
        GetApplicationInput(
          "is_director",
          false,
          index,

          "business_owners",
          contact
        )
      );
    }
    if (
      applicationInput.legal_type === "L" ||
      applicationInput.legal_type === "PL" ||
      applicationInput.legal_type === "LLP" ||
      applicationInput.legal_type === "ST"
    ) {
      if (index === 0) {
        dispatch(
          GetApplicationInput(
            "is_main_principal",
            true,
            index,

            "business_owners",
            contact
          )
        );
      } else {
        dispatch(
          GetApplicationInput(
            "is_main_principal",
            false,
            index,

            "business_owners",
            contact
          )
        );
      }
    } else if (applicationInput.legal_type === "PART") {
      dispatch(
        GetApplicationInput(
          "is_main_principal",
          true,
          index,

          "business_owners",
          contact
        )
      );
    }
    dispatch(
      GetApplicationInput(
        "s_individual_sales_representatives",
        userData.first_name + " " + userData.last_name
      )
    );
  };
  useEffect(() => {
    if (applicationInput.business_owners[0])
      dispatch(
        GetApplicationInput(
          "dob",
          applicationInput.business_owners[0].contact_dob
        )
      );
  }, [applicationInput.business_owners?.length]);

  const handleAddMore = () => {
    dispatch({ type: SET_QUOTE_OWNER, payload: false });
  };
  const handleremoveOwner = (index) => {
    dispatch({ type: REMOVE_APPLICATION_OWNER, payload: index });
  };
  const handleDelete = (index, contact = undefined) => {
    // dispatch(ApplicationOwnerDelete(id, applicationInput.id));
    dispatch(
      GetApplicationInput("is_deleted", true, index, "business_owners", contact)
    );
  };
  useEffect(() => {
    if (isApplicationOwnerDeleted) {
      dispatch(SetFalseObjectDelete());
    }
  }, [isApplicationOwnerDeleted]);

  useEffect(() => {
    if (
      applicationInput.legal_type === "L" ||
      applicationInput.legal_type === "PL" ||
      applicationInput.legal_type === "LLP" ||
      applicationInput.legal_type === "ST"
    ) {
      for (
        let index = 0;
        index < applicationInput?.business_owners?.length;
        index++
      ) {
        if (index === 0) {
          dispatch(
            GetApplicationInput(
              "is_main_principal",
              true,
              index,

              "business_owners",
              "contact"
            )
          );
        } else {
          dispatch(
            GetApplicationInput(
              "is_main_principal",
              false,
              index,

              "business_owners",
              "contact"
            )
          );
        }
      }
    } else if (applicationInput.legal_type === "PART") {
      for (
        let index = 0;
        index < applicationInput?.business_owners?.length;
        index++
      ) {
        dispatch(
          GetApplicationInput(
            "is_main_principal",
            true,
            index,

            "business_owners",
            "contact"
          )
        );
      }
    }
  }, [applicationInput.legal_type]);
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

  // ==document------
  const [show, setShow] = useState(false);
  const [pdfShow, setPdfShow] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  
  const downloadImage = (image_url) => {
    saveAs(image_url, "document_image"); // Put your image url here.
  };
  const handleShow = (url, pdf_url) => {
    console.log("pdf_url", pdf_url);
    if (url.includes(".pdf")) {
      // if (url.includes(".pdf") || url.includes("data:application/pdf")) {
      window.open(url, "_blank");
    } else {
      setShow(true);
      setPdfFile(url);
      setPdfShow(pdf_url);
    }
  };
  //email verification
  const contactEmailDetails = useSelector(
    (state) => state.commonInfo.contactEmailDetails
  );
  useEffect(() => {
    for (
      let index = 0;
      index < applicationInput.business_owners.length;
      index++
    ) {
      if (applicationInput.business_owners[index]?.owner_email?.includes("@")) {
        dispatch(
          GetEmailVerification(
            `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${applicationInput.business_owners[index].owner_email}`,
            "contact"
          )
        );
      }
    }
  }, []);
  return (
    <div className="leads">
      <div className="row p-lg-4 p-0">
        <div className="d-flex justify-content-between  mb-4">
          <div className="d-flex heading ">
            <svg
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3.33464C9.05448 3.33464 6.66667 5.72245 6.66667 8.66797C6.66667 11.6134 9.05448 14.0013 12 14.0013C14.9455 14.0013 17.3333 11.6134 17.3333 8.66797C17.3333 5.72245 14.9455 3.33464 12 3.33464ZM4 8.66797C4 4.24969 7.58172 0.667969 12 0.667969C16.4183 0.667969 20 4.24969 20 8.66797C20 13.0862 16.4183 16.668 12 16.668C7.58172 16.668 4 13.0862 4 8.66797ZM6.66667 22.0013C4.45753 22.0013 2.66667 23.7921 2.66667 26.0013C2.66667 26.7377 2.06971 27.3346 1.33333 27.3346C0.59696 27.3346 0 26.7377 0 26.0013C0 22.3194 2.98477 19.3346 6.66667 19.3346H17.3333C21.0152 19.3346 24 22.3194 24 26.0013C24 26.7377 23.4031 27.3346 22.6667 27.3346C21.9303 27.3346 21.3333 26.7377 21.3333 26.0013C21.3333 23.7921 19.5425 22.0013 17.3333 22.0013H6.66667Z"
                fill="#0D0D0D"
              />
            </svg>
            <p>Contact Details</p>
          </div>

          {applicationInput?.business_owners?.length < 1 && (
            <button
              onClick={handleAddMore}
              className="basic_btn"
              style={{ padding: "6px 20px" }}
            >
              <IoIosAdd style={{ fontSize: " 25px" }} /> ADD
            </button>
          )}
        </div>
        {applicationInput?.business_owners?.map((item, index) => {
          return (
            <>
              {item?.is_deleted === false && (
                <div className="col-md-6 mb-3 " key={item.id}>
                  <div className="card p-4">
                    <div className="inner-box">
                      <div className="d-flex justify-content-between mb-4">
                        <p className="">{index + 1}</p>
                        {item?.id ? (
                          <button
                            className="closeButton"
                            onClick={() => handleDelete(index)}
                          >
                            ✖
                          </button>
                        ) : (
                          <button
                            className="closeButton"
                            onClick={() => handleremoveOwner(index)}
                          >
                            ✖
                          </button>
                        )}
                      </div>
                      <div className="row">
                        <div className=" col-12 col-lg-12  ">
                          <div className="form-group">
                            <label htmlFor="basic-url">
                              Title <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <div className="input-group my-3">
                              <select
                                className="form-select"
                                size="small"
                                id="outlined-select-currency"
                                name="owner_title"
                                value={item.owner_title}
                                onChange={(e) =>
                                  handleChangeOwnerInput(
                                    "owner_title",
                                    e.target.value,
                                    index
                                  )
                                }
                              >
                                {TitleChoice.map((option) => (
                                  <option
                                    className="m-2"
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-6 mb-4 mb-lg-0 ">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              First Name
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control my-3"
                              name="owner_first_name"
                              maxLength={20}
                              value={item.owner_first_name}
                              onChange={(e) =>
                                handleChangeOwnerInput(
                                  "owner_first_name",
                                  e.target.value.toUpperCase(),
                                  index
                                )
                              }
                            />
                          </div>
                          {/* <p className="mb-3">
                            count :{item.owner_first_name?.length}/20{" "}
                          </p> */}
                        </div>
                        <div className="col-12 col-lg-6 ">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Last Name
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control my-3"
                              name="owner_surname"
                              value={item.owner_surname}
                              onChange={(e) =>
                                handleChangeOwnerInput(
                                  "owner_surname",
                                  e.target.value.toUpperCase(),
                                  index
                                )
                              }
                            />
                            {/* <p className="mb-3">
                              count :{item.owner_surname?.length}/20{" "}
                            </p> */}
                          </div>
                        </div>

                        <div className=" col-12 col-lg-12 ">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              DOB<span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            {/* <input
                              className={`form-control my-3 ${
                                new Date().getFullYear() -
                                  new Date(item.contact_dob).getFullYear() <
                                  15 &&
                                item.contact_dob !== "" &&
                                item.contact_dob !== null
                                  ? "error_input"
                                  : ""
                              }`}
                              type="date"
                              name="contact_dob"
                              value={item.contact_dob}
                              onChange={(e) =>
                                handleChangeOwnerInput(
                                  "contact_dob",
                                  e.target.value,
                                  index
                                )
                              }
                            /> */}
                            <DatePicker
                              className={`form-control my-3 ${
                                new Date().getFullYear() -
                                  new Date(item.contact_dob).getFullYear() <
                                  15 &&
                                item.contact_dob !== "" &&
                                item.contact_dob !== null
                                  ? "error_input"
                                  : ""
                              }`}
                              format="dd/MM/yyyy"
                              name="contact_dob"
                              value={item.contact_dob}
                              onChange={(date) =>
                                handleChangeOwnerInput(
                                  "contact_dob",
                                  date,
                                  index
                                )
                              }
                              formatDate={formatDate}
                            />
                            {item.contact_dob !== null &&
                              item.contact_dob !== "" &&
                              new Date().getFullYear() -
                                new Date(item.contact_dob).getFullYear() <
                                10 && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                  DOB must be before{" "}
                                  {new Date().getFullYear() - 15}
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="row align-self-center my-3">
                          <div className="col-md-6">
                            <p>
                              Responsible Party :{" "}
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </p>
                          </div>
                          <div className="col-md-6">
                            <div className="d-sm-flex gap-3">
                              <button
                                className={`${
                                  applicationInput.business_owners[index]
                                    .is_responsible_party === true
                                    ? "active_basic_btn"
                                    : "basic_btn"
                                }`}
                                onClick={() =>
                                  handleChangeOwnerInput(
                                    "is_responsible_party",
                                    true,
                                    index
                                  )
                                }
                              >
                                Yes
                              </button>
                              <button
                                className={` ${
                                  applicationInput.business_owners[index]
                                    .is_responsible_party === false
                                    ? "active_basic_btn"
                                    : "basic_btn"
                                }`}
                                onClick={() =>
                                  handleChangeOwnerInput(
                                    "is_responsible_party",
                                    false,
                                    index
                                  )
                                }
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Owner Email
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className={`form-control my-3${
                                (!regEmail.test(item.owner_email) &&
                                  item.owner_email !== "" &&
                                  item.owner_email !== null) ||
                                contactEmailDetails?.message ===
                                  "Invalid Email Provided"
                                  ? " error_input"
                                  : " "
                              }`}
                              name="owner_email"
                              value={item?.owner_email?.toLowerCase()}
                              onChange={(e) => {
                                handleChangeOwnerInput(
                                  "owner_email",
                                  e.target.value?.toLowerCase(),
                                  index
                                );
                                if (e.target.value?.includes("@")) {
                                  dispatch(
                                    GetEmailVerification(
                                      `${process.env.REACT_APP_BASE_URL}api/v1/lead/utility/verify-email-address/?email=${e.target.value}`,
                                      "contact"
                                    )
                                  );
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Phone Number
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <input
                              type="text"
                              maxLength={11}
                              className={`form-control border-right-0 my-3 ${
                                !Phone_regex.test(item.owner_phone_no) &&
                                item.owner_phone_no !== "" &&
                                item.owner_phone_no !== null
                                  ? "error_input"
                                  : ""
                              }`}
                              name="owner_phone_no"
                              value={item.owner_phone_no}
                              onChange={(e) => {
                                handleChangeOwnerInput(
                                  "owner_phone_no",
                                  e.target.value.replace(/\D/g, ""),
                                  index
                                );
                              }}
                            />
                          </div>
                          {item.owner_phone_no !== null &&
                            item.owner_phone_no !== "" &&
                            !Phone_regex.test(item.owner_phone_no) && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Should be start with 07
                              </p>
                            )}
                        </div>

                        <div className="mb-form col-lg-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              ID Number
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control my-3"
                              name="owner_id_num"
                              value={item.owner_id_num}
                              onChange={(e) => {
                                handleChangeOwnerInput(
                                  "owner_id_num",
                                  e.target.value,
                                  index
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Issue Date
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            {/* <input
                              // const diffInMonths = (item.owner_expiry_date.getFullYear() - item.owner_issue_date.getFullYear()) * 12 + (item.owner_expiry_date.getMonth() - item.owner_issue_date.getMonth());
                              type="date"
                              className={`form-control my-3 ${
                                item.owner_issue_date !== "" &&
                                item.owner_issue_date !== null &&
                                (new Date(
                                  item.owner_expiry_date
                                ).getFullYear() -
                                  new Date(
                                    item.owner_issue_date
                                  ).getFullYear()) *
                                  12 +
                                  (new Date(item.owner_expiry_date).getMonth() -
                                    new Date(
                                      item.owner_issue_date
                                    ).getMonth()) <
                                  3
                                  ? "error_input"
                                  : ""
                              }`}
                              name="owner_issue_date"
                              value={item.owner_issue_date}
                              max={currentDate}
                              onChange={(e) => {
                                handleChangeOwnerInput(
                                  "owner_issue_date",
                                  e.target.value,
                                  index
                                );
                              }}
                            /> */}

                            <DatePicker
                              format="dd/MM/yyyy"
                              className={`form-control my-3 ${
                                item.owner_issue_date !== "" &&
                                item.owner_issue_date !== null &&
                                (new Date(
                                  item.owner_expiry_date
                                ).getFullYear() -
                                  new Date(
                                    item.owner_issue_date
                                  ).getFullYear()) *
                                  12 +
                                  (new Date(item.owner_expiry_date).getMonth() -
                                    new Date(
                                      item.owner_issue_date
                                    ).getMonth()) <
                                  3
                                  ? ""
                                  : // ? "error_input"
                                    ""
                              }`}
                              name="owner_issue_date"
                              value={item.owner_issue_date}
                              maxDate={new Date()}
                              onChange={(date) =>
                                handleChangeOwnerInput(
                                  "owner_issue_date",
                                  date,
                                  index
                                )
                              }
                              formatDate={formatDate}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Expiry Date
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            {/* <input
                              type="date"
                              // className="form-control my-3"
                              className={`form-control my-3 ${
                                item.owner_expiry_date !== "" &&
                                item.owner_expiry_date !== null &&
                                (new Date(
                                  item.owner_expiry_date
                                ).getFullYear() -
                                  new Date(
                                    item.owner_issue_date
                                  ).getFullYear()) *
                                  12 +
                                  (new Date(item.owner_expiry_date).getMonth() -
                                    new Date(
                                      item.owner_issue_date
                                    ).getMonth()) <
                                  3
                                  ? "error_input"
                                  : ""
                              }`}
                              name="owner_expiry_date"
                              min={currentDate}
                              value={item.owner_expiry_date}
                              onChange={(e) => {
                                handleChangeOwnerInput(
                                  "owner_expiry_date",
                                  e.target.value,
                                  index
                                );
                              }}
                            /> */}
                            <DatePicker
                              className={`form-control my-3 ${
                                item.owner_issue_date !== "" &&
                                item.owner_issue_date !== null &&
                                (new Date(
                                  item.owner_expiry_date
                                ).getFullYear() -
                                  new Date().getFullYear()) *
                                  12 +
                                  (new Date(item.owner_expiry_date).getMonth() -
                                    new Date().getMonth()) <
                                  3
                                  ? "error_input"
                                  : ""
                              }`}
                              format="dd/MM/yyyy"
                              name="owner_expiry_date"
                              value={item.owner_expiry_date}
                              // max={currentDate}
                              minDate={new Date()}
                              onChange={(date) =>
                                handleChangeOwnerInput(
                                  "owner_expiry_date",
                                  date,
                                  index
                                )
                              }
                              formatDate={formatDate}
                            />
                          </div>
                          {item.owner_issue_date !== "" &&
                            item.owner_issue_date !== null &&
                            (new Date(item.owner_expiry_date).getFullYear() -
                              new Date().getFullYear()) *
                              12 +
                              (new Date(item.owner_expiry_date).getMonth() -
                                new Date().getMonth()) <
                              3 && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                The minimum gap between current date and expiry
                                date should be 3 months.
                              </p>
                            )}
                        </div>
                        <div className="col-lg-12">
                          <label htmlFor="exampleInputEmail1">
                            Nationality
                            <span style={{ color: "#dd2c00" }}>*</span>
                          </label>
                          <Autocomplete
                            className="my-3"
                            id="country-select-demo"
                            size="small"
                            options={countryList}
                            onChange={(event, newValue) =>
                              handleChangeOwnerInput(
                                "owner_nationality",
                                newValue === null ? null : newValue.id,
                                index
                              )
                            }
                            value={
                              countryList?.[getNationalityIndex(index)] || null
                              // countryList?.[item.owner_nationality - 1] || null
                            }
                            autoHighlight
                            getOptionLabel={(option) => option.nationality}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                {option.nationality} ({option.iso2})
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                                name="owner_nationality"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="inner-box">
                      <div className="row" key={item.id}>
                        <div className="col-12">
                          <div className="my-3">
                            <div className="row align-self-center">
                              <div className="col-6">
                                <label htmlFor="exampleInputEmail1">
                                  Is main principal?
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </label>
                              </div>
                              <div className="col-6">
                                <div className="d-sm-flex gap-3">
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_main_principal === true
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_main_principal",
                                        true,
                                        index
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_main_principal === false
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_main_principal",
                                        false,
                                        index
                                      )
                                    }
                                    size="small"
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="my-3">
                            <div className="row align-self-center">
                              <div className="col-6">
                                <p>
                                  Is beneficial Owner? :{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </p>
                              </div>
                              <div className="col-6">
                                <div className="d-sm-flex gap-3">
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_beneficial_owner === true
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_beneficial_owner",
                                        true,
                                        index
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_beneficial_owner === false
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_beneficial_owner",
                                        false,
                                        index
                                      )
                                    }
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*  */}
                        </div>
                        <div className="col-md-12">
                          <div className="my-3">
                            <div className="row align-self-center">
                              <div className="col-6">
                                <p>
                                  Is signatory? :{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </p>
                              </div>
                              <div className="col-6">
                                <div className="d-sm-flex gap-3">
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_signatory === true
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_signatory",
                                        true,
                                        index
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_signatory === false
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_signatory",
                                        false,
                                        index
                                      )
                                    }
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-md-12">
                          <div className=""></div>
                        </div> */}
                        <div className="my-3">
                          {applicationInput.legal_type === "LLP" ||
                          applicationInput.legal_type === "L" ||
                          applicationInput.legal_type === "PL" ||
                          applicationInput.legal_type === "PART" ? (
                            <></>
                          ) : (
                            <div className="row align-self-center">
                              <div className="col-6">
                                <p>
                                  Is Owner? :{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </p>
                              </div>
                              <div className="col-6">
                                <div className="d-sm-flex gap-3">
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_owner === true
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_owner",
                                        true,
                                        index
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_owner === false
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_owner",
                                        false,
                                        index
                                      )
                                    }
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {applicationInput.legal_type === "PART" ? (
                            <div className="row align-items-center">
                              <div className="col-6">
                                <p>
                                  Is Partnership? :{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </p>
                              </div>
                              <div className="col-6">
                                <div className="d-sm-flex gap-3">
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_partnership === true
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_partnership",
                                        true,
                                        index
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_partnership === false
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_partnership",
                                        false,
                                        index
                                      )
                                    }
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {applicationInput.legal_type !== "ST" && (
                            <div className="row align-self-center">
                              <div className="col-6">
                                <p>
                                  Is director? :{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </p>
                              </div>
                              <div className="col-6">
                                <div className="d-sm-flex gap-3">
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_director === true
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_director",
                                        true,
                                        index
                                      )
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className={`mb-2 ${
                                      applicationInput.business_owners[index]
                                        .is_director === false
                                        ? "active_basic_btn"
                                        : "basic_btn"
                                    }`}
                                    onClick={() =>
                                      handleChangeOwnerInput(
                                        "is_director",
                                        false,
                                        index
                                      )
                                    }
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-12 col-lg-12 mb-form ">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Ownership Parcentage
                              <span style={{ color: "#dd2c00" }}>*</span>
                            </label>
                            <input
                              type="number"
                              max={100}
                              onWheel={(e) => e.target.blur()}
                              className="form-control my-3"
                              name="ownership_perc"
                              value={item.ownership_perc}
                              onChange={(e) => {
                                handleChangeOwnerInput(
                                  "ownership_perc",
                                  e.target.value,
                                  index
                                );
                              }}
                            />
                            {Sum !== 100 && (
                              <p style={{ color: "red", fontSize: "12px" }}>
                                Total percentage must be 100
                              </p>
                            )}
                          </div>
                        </div>

                        {item.business_owner_contacts?.map((contact, i) => {
                          return (
                            <div className="col-12" key={contact.id}>
                              <h5>Private Residential Address</h5>
                              <div className="mb-form mt-4">
                                <label htmlFor="exampleInputEmail1">
                                  Postcode
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </label>
                                <ContactPostcode
                                  name="zip_code"
                                  value={contact.zip_code}
                                  details="app_owner_postcode"
                                  index={index}
                                  business_owner_contacts={
                                    "business_owner_contacts"
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Address 1
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-3"
                                  name="street_line_1"
                                  value={contact.street_line_1}
                                  onChange={(e) => {
                                    handleChangeOwnerInput(
                                      "street_line_1",
                                      e.target.value.toUpperCase(),
                                      index,
                                      "business_owner_contacts"
                                    );
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Address 2
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-3"
                                  name="locality"
                                  value={contact.locality}
                                  onChange={(e) => {
                                    handleChangeOwnerInput(
                                      "locality",
                                      e.target.value.toUpperCase(),
                                      index,
                                      "business_owner_contacts"
                                    );
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  City / Town{" "}
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-3"
                                  name="city"
                                  value={contact.city}
                                  onChange={(e) => {
                                    handleChangeOwnerInput(
                                      "city",
                                      e.target.value.toUpperCase(),
                                      index,
                                      "business_owner_contacts"
                                    );
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  County
                                </label>
                                <input
                                  type="text"
                                  className="form-control my-3"
                                  name="county_code"
                                  value={contact.county_code}
                                  onChange={(e) => {
                                    handleChangeOwnerInput(
                                      "county_code",
                                      e.target.value.toUpperCase(),
                                      index,
                                      "business_owner_contacts"
                                    );
                                  }}
                                />
                              </div>

                              <div className="mb-form">
                                <label htmlFor="exampleInputEmail1">
                                  Country
                                  <span style={{ color: "#dd2c00" }}>*</span>
                                </label>
                                <Autocomplete
                                  className="my-3"
                                  id="country-select-demo"
                                  size="small"
                                  options={countryList}
                                  onChange={(event, newValue) =>
                                    handleChangeOwnerInput(
                                      "country_code",
                                      newValue === null ? "" : newValue.id,
                                      index,
                                      "business_owner_contacts"
                                    )
                                  }
                                  value={
                                    countryList?.[
                                      getTradingcountryIndex(index)
                                    ] || null
                                    // countryList?.[contact.country_code - 1] || null
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
                                      name="country_code"
                                      //
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {applicationInput?.business_owners?.length > 0 && (
          <div className=" col-md-6  my-3 d-flex align-items-center justify-content-center">
            <button
              onClick={handleAddMore}
              className="basic_btn"
              style={{ padding: "6px 20px" }}
            >
              <IoIosAdd style={{ fontSize: " 25px" }} /> ADD
            </button>
          </div>
        )}
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
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
};

export default CustomerDetails;
