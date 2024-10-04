import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
export default function BusinessProfilePreview() {
    const navigate = useNavigate();
    React.useEffect(() => {
        const is_ps_logged_in = Cookies.get('is_ps_logged_in') || 'false'
     
        if (is_ps_logged_in === 'false') {
            // history.push("/my_business");
            navigate('/login')
        }
    }, []);
  return (
    <div>
        <div className="row">
            <div className="col-md-12">
                <div className="card d-flex flex-fill p-4">
                    <div className="preview-header">
                        <h2><span className="preview_point">6</span> Business Profile</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <strong>Description of good or service</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                                <div>
                                    <strong>Face to Face</strong>
                                    <input type="text" className="form-control my-3" disabled/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Customer Annual Turnover</strong>
                                    <input type="text" className="form-control my-3" disabled/>
                                </div>

                                <div>
                                    <strong>CNP / Moto</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Annual Card Turnover</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                                <div>
                                    <strong>E-Commerce</strong>
                                    <input type="text" className="form-control my-3" disabled/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Average Transaction  Value</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <strong>Do you take deposite</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Day </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Week </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Month </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <strong>Full payment up front</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Day </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Week </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Month </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <strong>Seasonal Sales</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>January-March </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>April-June </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>July-September </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>October-December </strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
