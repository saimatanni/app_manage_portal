import {
  Autocomplete,
  MenuItem,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import pdf from "../../assets/img/pdf.png";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

// import { GetUserList } from "../userManagement/_redux/action/UserAction";
import { showToast } from "../../utils/ToastHelper";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Upload } from "@phosphor-icons/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";

const CreateStatement = ({
  getNewApplications,
  handleClose,

  setInvoice,
  invoice,
  show,
}) => {
  CreateStatement.propTypes = {
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
  // const UserList = useSelector((state) => state.userInfo.UserList);
const location =useLocation()
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [invoiceList, setInvoiceList] = useState([]);
  const [userList, setUserList] = useState([]);
  const getTransectionList = (url) => {
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
        setInvoiceList(data.data?.results?.data);
      })
      .catch((error) => {
        showToast("Error fetching transaction list:", "error");
        // You can handle the error here, such as displaying an error message.
      });
  };
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
    getTransectionList(
      `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?limit=300`
    );
    getUserList(`${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?limit=500`);
    
  }, []);

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

  const handleShow = (url) => {
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    // e.preventDefault(); // Uncomment if needed.

    // Initial validation checks
    if (!invoice.title) {
      showToast("error", "Title shouldn't be empty");
      return 0;
    }
    if (invoice.category.length === 0) {
      showToast("error", "Category shouldn't be empty");
      return 0;
    }
    if (parseInt(invoice.category) === 1 && invoice.weak_number.length === 0) {
      showToast("error", "Week no shouldn't be empty");
      return 0;
    }
    if (
      parseInt(invoice.category) === 2 &&
      invoice.residual_month.length === 0
    ) {
      showToast("error", "Residual month shouldn't be empty");
      return 0;
    }

    setIsLoading(true);

    const newData = new FormData();
    if (invoice?.invoice_no) {
      newData.append("invoice_no", invoice?.invoice_no);
    }
    newData.append("category", invoice?.category);
    newData.append("weak_number", invoice?.weak_number);
    newData.append("residual_month", invoice?.residual_month);
    newData.append("title", invoice?.title);
    if (invoice.statement_for) {
      newData.append("statement_for", invoice?.statement_for);
    }
    if (file) {
      newData.append("statement_doc", file);
    }

    try {
      // Use fetch to post data
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/finance-statement/`,
        {
          method: "POST",
          body: newData,
          headers: {
            Authorization: `Token ${userData?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Category created:", data);
      showToast("success", "Statement Update successfully");
      // Fetch new applications after successful post
      // Ensure getNewApplications is adjusted to use fetch if it currently uses axios.
      getNewApplications(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/finance-statement/?statement_for=${
          location.pathname === "/commission-statement" ? userData.id : ""
        }`
      );
      handleClose();
    } catch (error) {
      console.error("Error creating category:", error);
      // Adjust error handling based on actual error structure
      // This is a basic example, assuming the error response is JSON with a specific structure
      const errorMsg = error.json && (await error.json());
      showToast("error", errorMsg?.message || "An error occurred");
      if (errorMsg?.errors) {
        const dataArray = Object.entries(errorMsg.errors).map(
          ([key, value]) => `${key}: ${value.join(", ")}`
        );
        dataArray.forEach((item) => showToast("error", item));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    // e.preventDefault();
    if (parseInt(data.category) === 1) {
      data.residual_month = '--';
    }
    if (parseInt(data.category) === 2) {
      data.weak_number = '--';
    }
    if (parseInt(data.category) === 3) {
      data.residual_month = '--';
      data.weak_number = '--';
    }
    const newData = new FormData();
    if (invoice.category.length === 0) {
      showToast("error", "Category shouldn't be empty");
      return 0;
    }
    if (parseInt(invoice.category) === 1 && invoice.weak_number.length === 0) {
      showToast("error", "Week no shouldn't be empty");
      return 0;
    }
    if (
      parseInt(invoice.category) === 2 &&
      invoice.residual_month.length === 0
    ) {
      showToast("error", "Residual month shouldn't be empty");
      return 0;
    }
    if (invoice.invoice_no.length === 0) {
      showToast("error", "Invoice no shouldn't be empty");
      return 0;
    }

    setIsLoading(true);
    newData.append("invoice_no", invoice?.invoice_no);
    newData.append("category", invoice?.category);
    newData.append("weak_number", invoice?.weak_number);
    newData.append("residual_month", invoice?.residual_month);
    newData.append("title", invoice?.title);
    newData.append("statement_for", invoice?.statement_for || userData.id);
    if (file) {
      newData.append("statement_doc", file);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/finance-statement/${data.slug}/`,
        {
          method: "PUT",
          body: newData,
          headers: {
            Authorization: `Token ${userData?.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }

      showToast("success", "Statement Update successfully");
      getNewApplications(
        `${process.env.REACT_APP_BASE_URL}api/v1/commission/finance-statement/?statement_for=${
          location.pathname === "/commission-statement" ? userData.id : ""
        }`
      );
      handleClose();
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating category:", error);
      setIsLoading(false);

      // Check if error and error.request exist
      if (error && error.request && error.request.response) {
        // Parse the error response
        const errorMsg = JSON.parse(error.request.response).errors;
        const Msg = JSON.parse(error.request.response).message;

        showToast("error", Msg);
        const dataArray = Object.entries(errorMsg).map(
          ([key, value]) => `${key}: ${JSON.stringify(value)}`
        );
        dataArray.map((item, index) => showToast("error", item));
      } else {
        // If error.response is undefined or null, handle it accordingly
        // Here, you can decide what to do in case the response is undefined or null
        showToast("error", "An unexpected error occurred");
      }
    }
  };

  const statementIndex = () => {
    var index = -1;
    userList?.map((opt) => {
      if (opt.id === invoice.statement_for) {
        index = userList?.indexOf(opt);
      }
    });

    return index;
  };
  const InvoiceIndex2 = () => {
    var index = -1;
    invoiceList?.map((opt) => {
      if (opt.id === invoice.invoice_no) {
        index = invoiceList.indexOf(opt);
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
      <Form.Label>Title</Form.Label>
      <div className="mb-4">
        <Form.Control
          required
          name="title"
          value={invoice.title}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="mb-4">
        <Form.Label>Invoice No.</Form.Label>
        <Autocomplete
          id="country-select-demo"
          size="small"
          options={invoiceList}
          autoHighlight
          getOptionLabel={
            (option) => option.invoice_no
            // (option.role === 1 ? " SP" : option.role === 2 ? " PM" : " EP")
          }
          value={invoiceList?.[InvoiceIndex2()] || null}
          onChange={(event, newValue) => {
            if (newValue === null) {
              // User cleared the selection, you may want to handle this case accordingly
              handleChangeinvoiceFr("invoice_no", "");
              getTransectionList(
                `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?limit=300`
              );
            } else {
              handleChangeinvoiceFr("invoice_no", newValue.id);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                getTransectionList(
                  `${process.env.REACT_APP_BASE_URL}api/v1/invoice/invoices/?limit=300?invoice_no=${e.target.value}`
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

      <div className="mb-4">
        <Form.Label>Category</Form.Label>
        <Form.Select
          size="small"
          required
          id="outlined-select-currency"
          select
          label="Category"
          name="category"
          value={invoice.category}
          onChange={(e) => handleChange(e)}
        >
          <option value={""}>--</option>
          <option value={1}>Upfront</option>
          <option value={2}>Residual</option>
          <option value={3}>Clawback</option>
        </Form.Select>
      </div>
      {parseInt(invoice.category) === 1 ? (
        <div className="mb-4">
          <Form.Label>Week No</Form.Label>
          <Form.Control
            id="outlined-basic"
            type="number"
            // inputProps={{ min: 1, max: 52 }}
            // variant="outlined"
            size="small"
            name="weak_number"
            value={invoice.weak_number}
            onChange={(e) => handleChange(e)}
          />
        </div>
      ) : (
        parseInt(invoice.category) === 2 && (
          <div className="mb-4">
            <Form.Label>Residual Month</Form.Label>
            <Form.Select
              id="outlined-basic"
              size="small"
              name="residual_month"
              select
              value={invoice.residual_month}
              onChange={(e) => handleChange(e)}
            >
              <option value={""}>--</option>
              <option value={"january"}>january</option>
              <option value={"February"}>February</option>
              <option value={"March"}>March</option>
              <option value={"April"}>April</option>
              <option value={"May"}>May</option>
              <option value={"June"}>June</option>
              <option value={"July"}>July</option>
              <option value={"Auguest"}>Auguest</option>
              <option value={"September"}>September</option>
              <option value={"October"}>October</option>
              <option value={"November"}>November</option>
              <option value={"December"}>December</option>
            </Form.Select>
          </div>
        )
      )}
      { location.pathname === "/user-statement" && <div className="mb-4">
        <Form.Label>Statement For</Form.Label>
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
          value={userList?.[statementIndex()] || null}
          onChange={(event, newValue) => {
            if (newValue === null) {
              // User cleared the selection, you may want to handle this case accordingly
              handleChangeinvoiceFr("statement_for", "");
              getUserList(`${process.env.REACT_APP_BASE_URL}api/v1/auth/user/`);
            } else {
              handleChangeinvoiceFr("statement_for", newValue.id);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                // handleChangeInput("legal_name", e.target.value);
                // dispatch(
                getUserList(
                  `${process.env.REACT_APP_BASE_URL}api/v1/auth/user/?name=${e.target.value}`
                );
                // );
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </div>
 }
     
      <div className="mb-form">
        <p>Document</p>
        <div className="file-uploader-mask d-flex justify-content-center align-items-center">
          <Upload />
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
            accept="image/png, image/gif, image/jpeg, .pdf"
            name="document"
            // multiple
            // onChange={(e) => uploadImages(e.target.files[0])}
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
          />
        </div>

        {invoice?.id && file === null ? (
          <div className="d-flex justify-content-center">
            {invoice.statement_doc && (
              <small
                style={{
                  marginTop: "10px",
                  position: "relative",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    onClick={() => {
                      handleShow(invoice.statement_doc);
                    }}
                    src={
                      invoice.statement_doc?.includes("pdf")
                        ? pdf
                        : invoice.statement_doc
                    }
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
                    onClick={() =>
                      setInvoice((prev) => ({ ...prev, statement_doc: null }))
                    }
                  >
                    <IoIosCloseCircleOutline style={{ fontSize: "large" }} />
                  </div>
                </div>
              </small>
            )}
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              {file && (
                <small
                  style={{
                    marginTop: "10px",
                    position: "relative",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      onClick={() => {
                        handleShow(URL.createObjectURL(file));
                      }}
                      src={
                        file && file.name.includes(".pdf")
                          ? pdf
                          : URL.createObjectURL(file)
                      }
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
                      onClick={() => setFile(null)}
                    >
                      <IoIosCloseCircleOutline style={{ fontSize: "large" }} />
                    </div>
                  </div>
                </small>
              )}
            </div>
          </>
        )}
      </div>
      {/* <img src={pdf} alt="bb" /> */}
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

export default CreateStatement;
