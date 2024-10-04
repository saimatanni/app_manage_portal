/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import logo from "../../../assets/img/logo.png";
import easyPay from "../../../assets/img/easy-payment.svg";
import user from "../../../assets/img/user.svg";

import { Modal } from "react-bootstrap";
import head from "../../../assets/img/head 1.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetForgetPassInput,
  SubmitVarificationdData,
  GetVarificationInput,
  SubmitForgetpasswordData,
 
  SetConfirmpassStatusFalse,
} from "../_redux/action/LoginAction";
import { BsArrowLeft } from "react-icons/bs";

const Reset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [largeModal, setLargeModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
 

  //----------- forotp-----------

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOtp, setActiveOtp] = useState(0);
  const [finalOtp, setFinalOtp] = useState(null);
  const [newOtp, setnewOtp] = useState(null);
  const inputRef = useRef();
  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);

    if (!value) setActiveOtp(index - 1);
    else setActiveOtp(index + 1);
    setOtp(newOtp);
    setFinalOtp(newOtp.join());
    setnewOtp(newOtp.join(""));
  };

  
  const handleKeyDown = (event, index) => {
    const { key } = event;

    if (key === "Backspace") {
      event.preventDefault(); // Prevent the default behavior of the Backspace key

      // Remove the value at the current index or the previous index
      const updatedOtp = [...otp];
      const updatedIndex = index > 0 ? index - 1 : 0;
      updatedOtp[updatedIndex] = "";
      setOtp(updatedOtp);

      // Move the activeOtp to the previous input field
      setActiveOtp(updatedIndex);
    }

    console.log(key);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtp]);
  // ---------remove otp=

  const toggleShow = () => {
    setShow(!show);
  };

  const toggleConfirmShow = () => {
    setShow2(!show2);
  };

  // ---------------using redux-----------

  const forgetPasInput = useSelector((state) => state.loginInfo.forgetPasInput);

  const afterSubmitEmail = useSelector(
    (state) => state.loginInfo.afterSubmitEmail
  );
  const verificationInput = useSelector(
    (state) => state.loginInfo.verificationInput
  );
  const afterSubmitOtp = useSelector((state) => state.loginInfo.afterSubmitOtp);
  const handleChangeInput = (name, value) => {
    dispatch(GetForgetPassInput(name, value));
  };

  const handleForgetPassword = (data) => {
    dispatch(SubmitForgetpasswordData(data));
  };
  useEffect(() => {
    dispatch(GetVarificationInput("code", newOtp));
    dispatch(GetVarificationInput("email", forgetPasInput.email));
  }, [newOtp, forgetPasInput.email]);
  // For Modals


  useEffect(() => {
    if (afterSubmitEmail) {
      setLargeModal(true);
    }
  }, [afterSubmitEmail]);
  useEffect(() => {
    if (afterSubmitOtp) {
      Swal.fire({
        title: "Success!",
        text: "Password Reset Successfuly!",
        icon: "success",
      });
      navigate(`/login`);
      dispatch(SetConfirmpassStatusFalse());
      setLargeModal(false);
    }
  }, [afterSubmitOtp]);

  const handleChangeResetInput = (name, value) => {
    dispatch(GetVarificationInput(name, value));

    dispatch(GetVarificationInput("email", forgetPasInput.email));
  };
  const handleSubmitConfirmPass = (data) => {
    if (finalOtp?.length !== 11) {
      Swal.fire({
        title: "Error!",
        text: "Otp Should Be 6 Digit",
        icon: "error",
      });
      return;
    } else if (verificationInput.password?.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "Inter minimum 6 digit password",
        icon: "error",
      });
      return;
    } else if (
      verificationInput.password !== verificationInput.confirm_passwqord
    ) {
      Swal.fire({
        title: "Error!",
        text: "Password Did not match",
        icon: "error",
      });
      return;
    }

    dispatch(SubmitVarificationdData(data));
  };
  return (
    <div className="container-fluid">
      {/* reset  components */}
      <div className="row">
        <div
          className="d-none d-md-block col-md-6 main-color"
          style={{ height: "100vh" }}
        >
          <div className="logo text-center">
            <img src={logo} width="50%" alt="" />
          </div>
          <img src={easyPay} alt="" className="register" width="70%" />
        </div>
        <div className="col-md-6 align-self-center">
          <div className="login-form">
            <h2>Reset Password</h2>
            <h4>Forget Your Password?</h4>
            <p>Please Type Your Email Here....</p>

            {/* <form className="login" onSubmit={handleSubmit} method="post"> */}
            <div>
              <label htmlFor="basic-url">Email</label>
              <div className="input-group mb-3 mt-2">
                <input
                  type="text"
                  className="form-control border-end-0"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={forgetPasInput.email}
                  onChange={(e) => handleChangeInput("email", e.target.value?.toLowerCase())}
                  name="email"
                  placeholder="abc@gmail.com"
                />
                <div className="input-group-append ">
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    style={{ background: "#fff" }}
                  >
                    <img src={user} width="21" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-end">
                {/* <div className="d-flex justify-content-between">
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-info text-white"
                >
                  Back
                </button> */}
                <div className="sgininButton">
                  <button onClick={() => handleForgetPassword(forgetPasInput)}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {/* <a style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
              <BsArrowLeft />
            </a> */}
            {/* </form> */}
          </div>
        </div>
      </div>
      {/* modal components */}
      <div>
        <Modal
          title=""
          size="lg"
          centered
          show={largeModal}
          // onHide={() => handleClose()}
        >
          <div className="my-4">
            <img src={head} className="img-fluid" alt="" />
            <br />
            <br />
            <h2>Authenticate Your Account</h2>
            <p>
              Please confirm your account by entering the authorization code
              sent to
            </p>
            <p>
              <strong>{forgetPasInput.email}</strong>
            </p>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="login">
                <div className="from-row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 mx-auto">
                    <div className="code_div d-flex justify-content-between mt-3">
                      {otp.map((_, index) => (
                        <div key={index} className="mx-1">
                          <input
                            value={otp[index]}
                            ref={index === activeOtp ? inputRef : null}
                            type="text"
                            style={{ textAlign: "center" }}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                </div>
                <div className="form-group mt-4 px-1 px-md-0">
                  <p
                    style={{
                      textAlign: "left",
                      marginBottom: "-4px",
                      fontSize: "semi-bold",
                      // color: "#7B4B64",
                    }}
                  >
                    New Password
                  </p>
                  <div className="input-group mb-3 mt-2">
                    <input
                      type={show ? "text" : "password"}
                      className="form-control border-end-0"
                      id="exampleInputPassword1"
                      placeholder=""
                      value={verificationInput.password}
                      onChange={(e) =>
                        handleChangeResetInput("password", e.target.value)
                      }
                    />
                    <div className="input-group-append ">
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        style={{ background: "#fff" }}
                        onClick={toggleShow}
                      >
                        {show ? (
                          <AiFillEye size={21} color="#768192" />
                        ) : (
                          <AiFillEyeInvisible size={21} color="#768192" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-4 px-1 px-md-0">
                  <p
                    style={{
                      textAlign: "left",
                      marginBottom: "-4px",
                      fontSize: "semi-bold",
                      // color: "#7B4B64",
                    }}
                  >
                    Confirm Password
                  </p>
                  <div className="input-group mb-3 mt-2">
                    <input
                      type={show2 ? "text" : "password"}
                      className="form-control border-end-0"
                      id="exampleInputPassword1"
                      placeholder=""
                      name="confirm_passwqord"
                      value={verificationInput.confirm_passwqord}
                      onChange={(e) =>
                        handleChangeResetInput(
                          "confirm_passwqord",
                          e.target.value
                        )
                      }
                    />
                    <div className="input-group-append ">
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        style={{ background: "#fff" }}
                        onClick={toggleConfirmShow}
                      >
                        {/* <img src={user} width="21" alt="" /> */}
                        {show2 ? (
                          <AiFillEye size={21} color="#768192" />
                        ) : (
                          <AiFillEyeInvisible size={21} color="#768192" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">
                    <div className="signinButton">
                      <button
                        onClick={() =>
                          handleSubmitConfirmPass(verificationInput)
                        }
                        className="reset"
                      >
                        Reset Password
                      </button>
                      {/* <a href="" onClick={handleSubmit}>Sign In</a> */}
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
          <br />
          <div>
            <p>
              It may take a few minutes to receive your code. Havent received it
              ?
              <strong>
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  onClick={() => handleForgetPassword(forgetPasInput)}
                >
                  Resend a new code
                </a>
              </strong>
            </p>
            <div className="d-flex justify-content-start m-2">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                <BsArrowLeft />
                {/* Back */}
              </a>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Reset;
