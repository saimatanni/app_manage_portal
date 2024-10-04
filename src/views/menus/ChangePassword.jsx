import React from "react";
import changePasswordImg from "./img/20-User-Interaction.svg";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CRow,

  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { GetChangePassInput, SubmitChangepasswordData } from "../pages/_redux/action/LoginAction";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const ChangePassInput = useSelector(
    (state) => state.loginInfo.ChangePassInput
  );
  const handleChangeInput = (name, value) => {
    dispatch(GetChangePassInput(name, value));
  };
  const handleChangePassword = (data) => {
    dispatch(SubmitChangepasswordData(data));
  };
  return (
    <div>
      <CRow className="justify-content-center align-items-center">
        <CCol md={8} className="align-self-center">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm method="Post">
                  <h1>Password</h1>
                  <p className="text-muted">
                    Edit your account settings and change your password here.
                  </p>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Old Password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="password"
                      className="border-end-0"
                      value={ChangePassInput.old_password}
                      onChange={(e) =>
                        handleChangeInput("old_password", e.target.value)
                      }
                      name="old_password"
                    />
                    <CInputGroupText id="basic-addon1" className="bg-white">
                      {" "}
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="New Password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="password"
                      className="border-end-0"
                      value={ChangePassInput.password}
                      onChange={(e) =>
                        handleChangeInput("password", e.target.value)
                      }
                      name="password"
                    />
                    <CInputGroupText id="basic-addon1" className="bg-white">
                      {" "}
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Re-type New Password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type="password"
                      className="border-end-0"
                      value={ChangePassInput.confirm_password}
                      onChange={(e) =>
                        handleChangeInput("confirm_password", e.target.value)
                      }
                      name="confirm_password"
                    />
                    <CInputGroupText id="basic-addon1" className="bg-white">
                      {" "}
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                  </CInputGroup>
                  <CRow>
                    <CCol col="6" className="text-left">
                      <CButton className="px-4 basic_btn" onClick={() => handleChangePassword(ChangePassInput)}>
                        Change Password
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              style={{ background: "#1e2553" }}
              text-color="white"
              className="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <img src={changePasswordImg} className="img-fluid" alt="" />
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </div>
  );
}
