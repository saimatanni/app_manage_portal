import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie
export default function BusinessDetailsPreview() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const is_ps_logged_in = Cookies.get("is_ps_logged_in") || "false";
    const is_ps_remember_me =
      Cookies.get("is_ps_remember_me") || "false";
    if (is_ps_logged_in === "false") {
      // history.push("/my_business");
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card d-flex flex-fill p-4">
            <div className="preview-header">
              <h2>
                <span className="preview_point">4</span> Business Details
              </h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <br />
                  <div>
                    <strong>Business Type</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                  <div>
                    <strong>Mobile Number</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <br />
                  <div>
                    <strong>Legal Name </strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>

                  <div>
                    <strong>Email Address</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <br />
                  <div>
                    <strong>Trading Name</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                  <div>
                    <strong>Vat Details</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <br />
                  <div>
                    <strong>CRN / UTR</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                  <div>
                    <strong>New Card process</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <div>
                    <strong>Notes</strong>
                    <textarea
                      className="form-control mt-3"
                      id="exampleFormControlTextarea1"
                      rows="5"
                      disabled
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6"></div>
              </div>

              <h6 className="my-4">Legal Address Information</h6>
              <hr className="mb-4" />
              <div className="row">
                <div className="col-md-3">
                  <div>
                    <strong>Post Code</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>Address 1</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>Address 2</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>City/Town</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>County</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>Country</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
              </div>
              <h6 className="my-4">Trading Address Information</h6>
              <hr className="mb-4" />
              <div className="row">
                <div className="col-md-3">
                  <div>
                    <strong>Post Code</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                  <div>
                    <strong>County</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>Address 1</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                  <div>
                    <strong>Country</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>Address 2</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <strong>City/Town</strong>
                    <input type="text" className="form-control my-3" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
