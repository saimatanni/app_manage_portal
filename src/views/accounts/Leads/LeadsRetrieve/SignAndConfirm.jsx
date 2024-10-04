import { CButton, CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import detailIcon from "../../../../assets/img/detail-icon.svg";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  GetApplicationInput,
  SetsignStatusFalse,
  UpdateApplicationInputForSigning,
  sendForRequest,
} from "../../NewApplication/_redux/action/ApplicationAction";
import { useDispatch, useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie"; // Import js-cookie
import Swal from "sweetalert2";
import { applicationValidation } from "src/utils/CommonFunction";
const SignAndConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const afterSuccessSigning = useSelector(
    (state) => state.applicationInfo.afterSuccessSigning
  );
  const afterFailedSigning = useSelector(
    (state) => state.applicationInfo.afterFailedSigning
  );

  const applicationInput = useSelector(
    (state) => state.applicationInfo.applicationInput
  );
  const priceQuoteInput = useSelector(
    (state) => state.quoteInfo.priceQuoteInput
  );
  const isLoadSign = useSelector((state) => state.applicationInfo.isLoadSign);
  const siginingInput = useSelector(
    (state) => state.applicationInfo.siginingInput
  );
  React.useEffect(() => {
    if (afterSuccessSigning) {
      navigate(`/new-application`);

      dispatch(SetsignStatusFalse());
    }
  }, [afterSuccessSigning]);
  React.useEffect(() => {
    if (afterFailedSigning) {
      dispatch(
        UpdateApplicationInputForSigning(applicationInput, "not_submit")
      );
      dispatch(SetsignStatusFalse());
    }
  }, [afterFailedSigning]);
  const [showModal, setShowModal] = useState(false);
  const handleSigingRequest = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    // dispatch(sendForRequest("application_id", applicationInput.id));
    dispatch(
      sendForRequest(
        "application_email",
        applicationInput.business_owners[0].owner_email
      )
    );

    dispatch(GetApplicationInput("sales_partner", userData.id));
    dispatch(GetApplicationInput("partner_manager", userData.partner_manager));
    dispatch(GetApplicationInput("user", userData.id));
    dispatch(
      GetApplicationInput("application_products", [
        ...(priceQuoteInput?.terminal_products ?? []),
        ...(priceQuoteInput?.ecommerce_products ?? []),
        ...(priceQuoteInput?.epos_products ?? []),
      ])
    );
    if (applicationInput.id) {
      dispatch(
        UpdateApplicationInputForSigning(
          applicationInput,
          "submit",
          siginingInput
        )
        // UpdateApplicationInputForSigning(applicationInput, "submit", data)
      );
    }
  };

  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="buisness-detail customar-detail w-100 "
    >
      {isLoadSign && (
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
      <div className="customar-detail-head w-100 fees-box">
        <div className="head-first">
          <img src={detailIcon} alt="" />
          <h4 style={{ color: "white" }}> Sign & Confirm</h4>
        </div>
        <div className="button-box">
          {/* <button className="   custom-btn  flex " onClick={toggleProducts}>
            <img src={pen} style={{ marginRight: "7px" }} alt="" />
            Edit
          </button> */}
        </div>
      </div>
      <div>
        {/*  */}
        <div className="leads">
          <CRow>
            <CCol md="12">
              {/* <img src={user} width="25" alt="" /> {" "}
     
              <strong>Merchant</strong>
              <br />
              <br /> */}

              <div className="form-group">
                <p style={{ fontSize: "18px" }}>
                  Signature :
                  {/* ( Draw to the signature in this input below ) */}
                </p>

                <div className="sign_box mt-3">
                  <CButton
                    // onClick={() => {
                    //   // setShowModal(true);
                    //    handleSigingRequest(siginingInput)
                    // }}
                    onClick={() => {
                      // Show SweetAlert confirmation
                      Swal.fire({
                        title:
                          "Do you want to send this application to e-sign?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, send it!",
                      }).then((result) => {
                        // If the user clicks "Yes, send it!"
                        if (result.isConfirmed) {
                          // You can setShowModal(true) here if needed
                          console.log("tt");
                          applicationValidation(
                            applicationInput,
                            undefined,
                            handleSigingRequest
                          );
                          // handleSigingRequest(siginingInput);
                        }
                      });
                    }}
                  >
                    {" "}
                    Send for Sign <BiSend style={{ marginBottom: "3px" }} />
                  </CButton>
                  {/* )}  */}
                </div>
              </div>

              <br />
              <br />
            </CCol>
          </CRow>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title style={{color:"#1E2553 "}}>
         
            </Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{ color: "#1E2553 ", marginTop: "15px" }}>
          <h4>
            Please use the submit button below and send an email to{" "}
            <a href="mailto:info@paymentsave.co.uk?subject=Reference/Application Number">
              info@paymentsave.co.uk
            </a>{" "}
            with the reference/application number.
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <button
            // style={{ background: "#dc3545" }}
            className="custom-btn  flex mx-2 "
            onClick={() => setShowModal(false)}
          >
            OK
          </button>
          <button
            className="    custom-btn  flex mx-2 "
            onClick={() => {
              handleSigingRequest(siginingInput);
            }}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignAndConfirm;
