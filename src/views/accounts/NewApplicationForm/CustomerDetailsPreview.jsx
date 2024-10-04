import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
export default function CustomerDetailsPreview() {
    const navigate = useNavigate();
    React.useEffect(() => {
        const is_ps_logged_in = Cookies.get('is_ps_logged_in') || 'false'
      
        if (is_ps_logged_in === 'false') {
            // history.push("/my_business");
            navigate('/login')
        }
    }, []);
  return (
   
        <div className="row">
            <div className="col-md-12">
                <div className="card d-flex flex-fill p-4">
                    <div className="preview-header">

                        <h2><span className="preview_point">5</span> Customer Details</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <br/>
                                <div>
                                    <strong>Ownership Type</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                                <div>
                                    <strong>Email</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                                <div>
                                    <strong>Id Number</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>

                            </div>
                            <div className="col-md-3">
                                <br/>
                                <div>
                                    <strong>First Name </strong><input type="text" className="form-control my-3" disabled/>
                                </div>

                                <div>
                                    <strong>Date of Birth</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>

                                <div>
                                    <strong>Issue Date</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <br/>
                                <div>
                                    <strong>Last Name </strong><input type="text" className="form-control my-3" disabled />
                                </div>
                                <div>
                                    <strong>Mobile Number</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                                <div>
                                    <strong>Nationality</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <br/>
                                <div>
                                    <strong>Expiry Date</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                                <div>
                                    <strong>Id Type</strong>
                                    <input type="text" className="form-control my-3" disabled/>
                                </div>
                                <div>
                                    <strong>Role</strong>
                                    <input type="text" className="form-control my-3" disabled/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <h6 className="my-4">Home Address</h6>
                        <hr className="mb-4"/>
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <strong>Post Code</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                                <div>
                                    <strong>County</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Address 1</strong>
                                    <input type="text" className="form-control my-3" disabled />
                                </div>
                                <div>
                                    <strong>Country</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>Address 2</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <strong>City/Town</strong>
                                    <input type="text" className="form-control my-3" disabled  />
                                </div>
                                
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    
  )
}
