import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../../../assets/img/working-remotely.svg";
import imgLogo from "../../../assets/img/logo.png";
import user from "../../../assets/img/user.svg";
import "./style.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  InputTextValue,
  SetConfirmpassStatusFalse,
  SetSigninStatusFalse,
  SignInData,
} from "../_redux/action/LoginAction";
import Cookies from "js-cookie"; // Import js-cookie
const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const loginInput = useSelector((state) => state.loginInfo.loginInput);
  const isLoadLogIn = useSelector((state) => state.loginInfo.isLoadLogIn);
  const afterSignInData = useSelector(
    (state) => state.loginInfo.afterSignInData
  );

  useEffect(() => {
    const isPsLoggedIn = Cookies.get("is_ps_logged_in") || "false"; // Get the value from the cookie

    if (isPsLoggedIn === "true") {
      navigate("/dashboard"); // Conditionally navigate based on the cookie value
    }

    dispatch(SetConfirmpassStatusFalse());
  }, [dispatch, navigate]);
  const handleRemember = () => {
    setRemember(!remember);
    dispatch(InputTextValue("remember", remember));
  };
  const handleChangeTextInput = (name, value) => {
    dispatch(InputTextValue(name, value));
  };
  const handleSignIn = (data) => {
    dispatch(SignInData(data));
  };
  useEffect(() => {
    if (afterSignInData) {
      navigate(`/dashboard`);
    }
    dispatch(SetSigninStatusFalse());
  }, [afterSignInData, dispatch, navigate]);

  const change = () => {
    setShow(!show);
  };
  return (
    <div>
      {/* <div className="container-fluid maxWidth">
        <div className="row">
          <div className="d-none d-md-block col-md-6 main-color maxHeight">
            <img src={img1} alt="" className="w-r login_Img" />
            
            <div className="LoginContainer_waves__2KrLx">
              <div className="LoginContainer_wave__3URrY"></div>
              <div className="LoginContainer_wave__3URrY"></div>
              <div className="LoginContainer_wave__3URrY"></div>
            </div>
          </div>
          <div className="col-md-6 login_right">
            <div className="login-form">
              <div className="text-center top_negative">
                <img
                  src={imgLogo}
                  className="img-fluid "
                  height="auto"
                  width="350"
                  alt=""
                />
              </div>

              <br />
              <br />
              <h4>
                Welcome to <br /> Paymentsave Partner Portal
              </h4>

              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">User Name</label>
                <div className="input-group mb-3 mt-2">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={loginInput.email}
                    onChange={(e) =>
                      handleChangeTextInput(
                        "email",
                        e.target.value.toLowerCase()
                      )
                    }
                    name="email"
                    placeholder="email@gmail.com"
                  />
                  <div className="input-group-append ">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                   
                    >
                      <img src={user} alt="" className="input_icon" />
                     
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputPassword1">Password</label>
                <div className="input-group mb-3 mt-2">
                  <input
                    type={show ? "text" : "password"}
                    className="form-control border-end-0"
                    id="exampleInputPassword1"
                    placeholder="*******"
                    value={loginInput.password}
                    onChange={(e) =>
                      handleChangeTextInput("password", e.target.value)
                    }
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSignIn(loginInput);
                      }
                    }}
                  />
                  <div className="input-group-append ">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                      
                      onClick={change}
                    >
                     
                      {show ? (
                        <AiFillEye size={21} color="#212529" />
                      ) : (
                        <AiFillEyeInvisible size={21} color="#212529" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={loginInput.remember === true ? true : false}
                  onChange={() => handleRemember()}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
                <label
                  className="rememberme_label"
                  htmlFor=""
                  
                  onClick={() => navigate(`/reset`)}
                >
                  <Link className="text-decoration-none" to="/reset">
                    Reset Password
                  </Link>
                </label>
              </div>
              <div className="d-flex mt-4 justify-content-center sgininButton">
            
                {isLoadLogIn ? (
                  <button
                    style={{ padding: "0.7rem 3rem 0.7rem 2rem" }}
                    onClick={() => handleSignIn(loginInput)}
                  >
                    {" "}
                    <div className="d-flex align-items-center justify-content-center gap-2 ">
                      Sign In
                      <div
                        className="spinner-border login_loader"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button onClick={() => handleSignIn(loginInput)}>
                    Sign In
                  </button>
                )}

                
              </div>
             
            </div>
          </div>
        </div>
      </div> */}
      <div className="container-fluid maxWidth">
        <div className="row">
          <div className="d-none d-md-block col-md-6 main-color maxHeight position-relative">
            <div className="d-flex align-items-center justify-content-center vh-100">
              <img src={img1} alt="" className="w-r login_Img" />
              <div className="LoginContainer_waves__2KrLx">
                <div className="LoginContainer_wave__3URrY"></div>
                <div className="LoginContainer_wave__3URrY"></div>
                <div className="LoginContainer_wave__3URrY"></div>
              </div>
            </div>
          </div>
          <div className="col-md-6 login_right d-flex align-items-center justify-content-center">
            <div className="login-form">
              <div className="text-center top_negative">
                <img
                  src={imgLogo}
                  className="img-fluid"
                  height="auto"
                  width="350"
                  alt=""
                />
              </div>
              <br />
              <br />
              <h4>
                Welcome to <br /> Paymentsave Partner Portal
              </h4>
              <div className="form-group mt-4">
                <label>User Name</label>
                <div className="input-group mb-3 mt-2">
                  <input
                    type="text"
                    className="form-control border-end-0"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={loginInput.email}
                    onChange={(e) =>
                      handleChangeTextInput(
                        "email",
                        e.target.value.toLowerCase()
                      )
                    }
                    name="email"
                    placeholder="email@gmail.com"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                      style={{ height: "38px" }}
                    >
                      <img src={user} alt="" className="input_icon" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group mt-4">
                <label>Password</label>
                <div className="input-group mb-3 mt-2">
                  <input
                    type={show ? "text" : "password"}
                    className="form-control border-end-0"
                    id="exampleInputPassword1"
                    placeholder="*******"
                    value={loginInput.password}
                    onChange={(e) =>
                      handleChangeTextInput("password", e.target.value)
                    }
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSignIn(loginInput);
                      }
                    }}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-white"
                      id="basic-addon2"
                      onClick={change}
                      style={{ height: "38px" }}
                    >
                      {show ? (
                        <AiFillEye size={21} color="#212529" />
                      ) : (
                        <AiFillEyeInvisible size={21} color="#212529" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-check mt-3">
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={loginInput.remember === true}
                  onChange={() => handleRemember()}
                />
                <label
                  className="form-check-label"
                  onClick={() => handleRemember()}
                >
                  Remember me
                </label>
                <label
                  className="rememberme_label"
                  onClick={() => navigate(`/reset`)}
                >
                  <Link className="text-decoration-none" to="/reset">
                    Reset Password
                  </Link>
                </label>
              </div>
              <div className="d-flex mt-4 justify-content-center sgininButton">
                {isLoadLogIn ? (
                  <button
                    style={{ padding: "0.7rem 3rem 0.7rem 2rem" }}
                    onClick={() => handleSignIn(loginInput)}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      Sign In
                      <div
                        className="spinner-border login_loader"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button onClick={() => handleSignIn(loginInput)}>
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
