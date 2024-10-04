import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import pdf from "../../assets/img/pdf.png";

import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Cookies from "js-cookie";
import { showToast } from "../../utils/ToastHelper";
import PropTypes from "prop-types";
import { IoMdRemoveCircle } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { useLocation } from "react-router-dom";
const CreateInvoice = ({
  getNewApplications,
  handleClose,

  setInvoice,
  invoice,
  show,
}) => {
  CreateInvoice.propTypes = {
    getNewApplications: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    setInvoice: PropTypes.func.isRequired,
    invoice: PropTypes.object.isRequired,
    show: PropTypes.object.isRequired,
  };

  var userData;
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const userDataCookie = Cookies.get("userData");

  if (userDataCookie) {
    userData = JSON.parse(userDataCookie);
    // Now you can use the parsed userData object
  } else {
    // Handle the case where the cookie is not set or is empty
    // You might want to provide a default value or perform some other action
  }

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the specific field
    setInvoice((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check the conditions and clear specific fields if needed
    if (name === "category") {
      if (value === 2) {
        // Clear 'weak_number' when category is 2
        setInvoice((prevData) => ({
          ...prevData,
          weak_number: "",
        }));
      } else if (value === 1) {
        // Clear 'residual_month' when category is 1
        setInvoice((prevData) => ({
          ...prevData,
          residual_month: "",
        }));
      } else if (value === 3) {
        // Clear 'residual_month' when category is 3
        setInvoice((prevData) => ({
          ...prevData,
          residual_month: "",
          weak_number: "",
        }));
      }
    }
    if (name === "weak_number" && parseInt(value) > 52) {
      setInvoice((prevData) => ({
        ...prevData,
        weak_number: 52,
      }));
    }
  };
  const handleChangeinvoiceFr = (name, value) => {
    setInvoice((prevData) => {
      if (name === "user") {
        return { ...prevData, [name]: value };
      }
      return { ...prevData, [name]: value };
    });
  };
  const uploadImages = async (images) => {
    setIsLoading(true);
    let uploadedImageId = null;
    let uploadedImageUrl = null;

    // Create a FormData object
    const formData = new FormData();
    formData.append("doc_type", 0); // Set the document title
    formData.append("document", images); // Set the document title
    // images.forEach((image, index) => {
    //   formData.append(`document${index}`, image); // Set the file data
    // });
    formData.append("owner", userData.id);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/upload/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Token ${userData.token}`, // Add the token to the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const responseData = await response.json();
      uploadedImageId = responseData.data.id;
      uploadedImageUrl = responseData.data.document_url;
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }

    // Update the invoice's document array with the ID of the last uploaded image
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      document: [uploadedImageId],
      document_urls: [uploadedImageUrl],
    }));
    return uploadedImageId;
  };
  const handleShow = (url) => {
    window.open(url, "_blank");
  };

  const handleRemove = (index) => {
    // Create a copy of the array without the item at the specified index
    const updatedDocumentUrls = invoice.document_urls.filter(
      (item, i) => i !== index
    );
    const updatedDocumentIds = invoice.document.filter(
      (item, i) => i !== index
    );

    // Update the state with the updated array
    setInvoice({
      ...invoice,
      document: updatedDocumentIds,
      document_urls: updatedDocumentUrls,
    });
  };

  const handleSubmit = async (e) => {
    delete invoice.invoice_status;
    // e.preventDefault();

    if (invoice.invoice_no.length === 0) {
      showToast("error", "Invoice no shouldn't be empty");
      return 0;
    }
    if (invoice.user.length === 0) {
      showToast("error", "User no shouldn't be empty");
      return 0;
    }
    if (invoice.document.length === 0) {
      showToast("error", "Document no shouldn't be empty");
      return 0;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/`,
        invoice
      );
      console.log("Category created:", response.data);
      showToast("success", "Invoice Create successfully");
      getNewApplications(
        `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?user=${
          userData.id
        }&limit=${10}&offset=${0}&is_read=true`
      );
      // getinvoiceList(`${BASE_URL}api/v1/invoice/invoices/list/`);
      handleClose();
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating category:", error);
      setIsLoading(false);

      if (error.response) {
        // Server responded with an error status code (4xx, 5xx)
        const erroeMsg = error.response.data.errors;
        const Msg = error.response.data.message;

        showToast("error", Msg);
        const dataArray = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        dataArray.map((item, index) => showToast("error", item));
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        showToast("error", "No response received from server");
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up the request:", error.message);
        showToast("error", "Error setting up the request");
      }
    }
  };
  const handleUpdate = async (data) => {
    // e.preventDefault();

    if (invoice.invoice_no.length === 0) {
      showToast("error", "Invoice no shouldn't be empty");
      return 0;
    }
    if (invoice.user.length === 0) {
      showToast("error", "User no shouldn't be empty");
      return 0;
    }
    if (invoice.document.length === 0) {
      showToast("error", "Document no shouldn't be empty");
      return 0;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/${invoice.id}/`,
        invoice
      );
      console.log("Category created:", response.data);
      showToast("success", "Invoice Update successfully");
      getNewApplications(
        `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?user=${
          userData.id
        }&limit=${10}&offset=${0}&is_read=true`
      );
      // getinvoiceList(`${BASE_URL}api/v1/invoice/invoices/list/`);
      handleClose();
      setIsLoading(false);
    } catch (error) {
      //   setIsLoading(false);
      //   const erroeMsg = JSON.parse(error.request.response).errors;
      //   const Msg = JSON.parse(error.request.response).message;

      //   showToast("error", Msg);
      //   const dataArray = Object.entries(erroeMsg).map(
      //     ([key, value]) => `${key}: ${JSON.stringify(value)}`
      //   );
      //   dataArray.map((item, index) => showToast("error", item));
      // }

      console.error("Error creating category:", error);
      setIsLoading(false);

      if (error.response) {
        // Server responded with an error status code (4xx, 5xx)
        const erroeMsg = error.response.data.errors;
        const Msg = error.response.data.message;

        showToast("error", Msg);
        const dataArray = Object.entries(erroeMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        dataArray.map((item, index) => showToast("error", item));
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        showToast("error", "No response received from server");
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up the request:", error.message);
        showToast("error", "Error setting up the request");
      }
    }
  };
  const location = useLocation();
  const [userList, setUserList] = useState([]);
  const getUserList = (url) => {
    // setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Token ${userData.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok (status ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setUserList(data.data?.results);
      })
      .catch((error) => {
        showToast("Error fetching transaction list:", "error");
        // You can handle the error here, such as displaying an error message.
      });
  };
  useEffect(() => {
    getUserList(`${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?limit=500`);
  }, []);
  const userIndex = () => {
    var index = -1;
    userList?.map((opt) => {
      if (opt.id === invoice.user) {
        index = userList?.indexOf(opt);
      }
    });

    return index;
  };
  return (
    <div>
      {isLoading && (
        <Backdrop
          open
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Invoice No.</Form.Label>
        <Form.Control
          name="invoice_no"
          value={invoice.invoice_no}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {location.pathname === "/user-invoice" && (
        <div className="mb-3">
          <Form.Label>Invoice For</Form.Label>
          <Autocomplete
            id="country-select-demo"
            size="small"
            options={userList}
            autoHighlight
            getOptionLabel={(option) =>
              option.first_name +
              " " +
              option.last_name +
              "(" +
              (option.role === 1
                ? " SP"
                : option.role === 3
                ? " EP"
                : option.role === 4
                ? " OM"
                : option.role === 5
                ? " OE"
                : option.role === 6
                ? " FE"
                : option.role === 0
                ? " LO"
                : option.role === 7
                ? " FM"
                : option.role === 10
                ? " SM"
                : option.role === 9 && " SA") +
              ")"
            }
            value={userList?.[userIndex()] || null}
            onChange={(event, newValue) => {
              if (newValue === null) {
                handleChangeinvoiceFr("user", "");
                getUserList(
                  `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/`
                );
                // User cleared the selection, you may want to handle this case accordingly
              } else {
                handleChangeinvoiceFr("user", newValue.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => {
                  getUserList(
                    `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?name=${e.target.value}`
                  );
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>
      )}

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={invoice.description}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <div className="mb-form">
        <Form.Label>Document</Form.Label>

        <div className="file-uploader-mask d-flex justify-content-center align-items-center">
          <BsUpload />
          <h5 className="drag-drop my-3"> Drag & drop file here</h5>
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
              cursor: "pointer",
            }}
            type="file"
            // accept="image/png, image/gif, image/jpeg, .pdf"
            name="document"
            // multiple
            onChange={(e) => uploadImages(e.target.files[0])}
          />
        </div>
        <div className="d-flex justify-content-center">
          {invoice.document_urls && (
            <small
              style={{
                marginTop: "10px",
                position: "relative",
                display: "flex",
                gap: "20px",
              }}
            >
              {invoice?.document_urls?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      onClick={() => {
                        handleShow(item);
                      }}
                      src={item?.includes("pdf") ? pdf : item}
                      alt=""
                      style={{
                        height: "44px",
                        width: "44px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                    <div
                      className="ms-2 remove_img"
                      style={{
                        cursor: "pointer",
                        top: "-8px",
                        position: "absolute",
                        left: "30px",
                      }}
                      onClick={() => handleRemove(index)}
                    >
                      <IoMdRemoveCircle />
                    </div>
                  </div>
                );
              })}
            </small>
          )}
        </div>
      </div>
      <div className=" mt-4 d-flex justify-content-end">
        <Button
          onClick={() => {
            invoice.id ? handleUpdate(invoice) : handleSubmit();
          }}
        >
          {invoice.id ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default CreateInvoice;
