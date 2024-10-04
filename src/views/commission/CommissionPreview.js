import React, { useEffect, useState } from "react";
import document from "../../assets/img/new-document.svg";
import checkmar from "../../assets/img/checkmark.svg";
import "./Commission.css";
import { useNavigate } from "react-router-dom";
import Loader from "src/utils/Loader";
import Cookies from 'js-cookie'; // Import js-cookie
import {  onBoarddateFormat } from "src/utils/CommonFunction";
export default function CommissionPreview() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("commissionData"));
  console.log(data, "commission");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timer if the component unmounts or the dependencies change
    return () => clearTimeout(timer);
  }, []);
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
   
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <section className="content">
        <div className="container p-0">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="mb-3">
                <h2>
                  <img src={document} width="24" alt="" /> Commission Statement
                </h2>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card d-flex flex-fill">
                    <div className="preview-header border-bottom-0">
                      <img src={checkmar} alt="" width="17" />{" "}
                      <strong style={{ color: "#fff" }}>
                        Commission Statement
                      </strong>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            <strong>Week number</strong>
                            <p>
                              {" "}
                              {
                                data[
                                  "ptsave_weeknumber@OData.Community.Display.V1.FormattedValue"
                                ]
                              }
                            </p>
                          </div>
                          <div>
                            <strong>Commission statement number</strong>
                            <p> {data?.ptsave_name}</p>
                          </div>
                          <div>
                            <strong>Total commission</strong>
                            <p>
                              {" "}
                              {
                                data[
                                  "ptsave_totalcommission@OData.Community.Display.V1.FormattedValue"
                                ]
                              }{" "}
                            </p>
                          </div>
                          <div>
                            <strong>Commission statement payment status</strong>
                            <p>
                              {" "}
                              {
                                data[
                                  "statuscode@OData.Community.Display.V1.FormattedValue"
                                ]
                              }{" "}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div>
                            <strong>Created On</strong>
                            <p> {onBoarddateFormat(data?.createdon)} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-12 text-end">
              <button
              className="btn btn-primary"
                onClick={() => {
                  navigate("/commission-statement");
                  localStorage.removeItem('commissionData')
                }}
              >
                Back
              </button>
            </div>
          </div>
          {/* <!-- Modal Component --> */}
          <div>
            
          </div>
        </div>
      </section>
    </>
  );
}
